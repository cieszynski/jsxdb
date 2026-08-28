// MIT License

// Copyright (c) 2026 Stephan Cieszynski


/**
 * @module JSxDB
 * @author Stephan Cieszynski
 */
export default JSxDB;



/**
 * Find all lowercase and uppercase combinations 
 * of a string called from ingnoreCase
 * @function
 * @param {String} permutable
 * @returns {String[]}
 */
const permutation = (permutable) => {
    const arr = [];

    const permute = (str, tmp = "") => {
        if (str.length == 0) {
            arr.push(tmp);
        } else {
            permute(str.substring(1), tmp + str[0].toLowerCase());
            if (isNaN(str[0])) {
                permute(str.substring(1), tmp + str[0].toUpperCase());
            }
        }
    };

    permute(permutable);

    // sort from ABC -> abc
    return arr.sort();
};

/**
 * @function
 * @param  {...String} keyRangeParams
 * @returns {IDBKeyRange}
 */
const prepare = (...keyRangeParams) => {
    const [operator, data] = keyRangeParams;

    if (data) {
        switch (operator) {
            case ">":
                return JSxDB.gt(data);
            case ">=":
                return JSxDB.ge(data);
            case "<":
                return JSxDB.lt(data);
            case "<=":
                return JSxDB.le(data);
            case "=":
                return JSxDB.eq(data);
        }
    }

    return operator;
};

/**
 * @class
 * @hideconstructor
 */
class Query {
    #reverse = false;
    #and = true;
    #or = true;
    #limit = 0;
    #args;

    /**
     * 
     * @param {*} indexName 
     * @param  {...any} keyRangeParams 
     */
    constructor(indexName, ...keyRangeParams) {
        this.#args = [indexName, prepare(...keyRangeParams)];
    }

    /**
     * @function
     * @returns {this}
     */
    reverse = () => {
        this.#reverse = true;
        return this;
    };

    /**
     * @function
     * @param {Integer} int
     * @returns {this}
     */
    limit(int) {
        this.#limit = int > 0 ? int : 0;
        return this;
    }

    /**
     * @function
     * @returns {Promise}
     */
    query = () => {
        switch (true) {
            case !!this.#and:
                return this.execute_and(
                    "query",
                    this.#reverse,
                    this.#limit,
                    ...this.#args,
                );
            case !!this.#or:
                return this.execute_or(
                    "query",
                    this.#reverse,
                    this.#limit,
                    ...this.#args,
                );
        }
    };

    /**
     * @function
     * @returns {Promise}
     */
    delete = () => {
        switch (true) {
            case !!this.#and:
                return this.execute_and(
                    "delete",
                    this.#reverse,
                    this.#limit,
                    ...this.#args,
                );
            case !!this.#or:
                return this.execute_or(
                    "delete",
                    this.#reverse,
                    this.#limit,
                    ...this.#args,
                );
        }
    };

    /**
     * @function
     * @returns {Promise}
     */
    update = (obj) => {
        switch (true) {
            case !!this.#and:
                return this.execute_and(
                    "update",
                    this.#reverse,
                    this.#limit,
                    ...this.#args.concat(obj),
                );
            case !!this.#or:
                return this.execute_or(
                    "update",
                    this.#reverse,
                    this.#limit,
                    ...this.#args.concat(obj),
                );
        }
    };

    /**
     * @function
     * @param {String} indexName
     * @param  {...String} keyRangeParams
     * @returns {this}
     */
    and = (indexName, ...keyRangeParams) => {
        if (this.#or !== true) {
            throw new Error("mixin and/or query");
        }

        this.#args.push(indexName, prepare(...keyRangeParams));

        // at now, only 'and' is allowed
        this.#or = undefined;
        return this;
    };

    /**
     * @function
     * @param {String} indexName
     * @param  {...String} keyRangeParams
     * @returns {this}
     */
    or = (indexName, ...keyRangeParams) => {
        if (this.#or !== true) {
            throw new Error("mixin and/or query");
        }

        this.#args.push(indexName, prepare(...keyRangeParams));

        // at now, only 'or' is allowed
        this.#and = undefined;
        return this;
    };
}

/**
 * @class
 * @hideconstructor
 */
class Store {
    #store;

    /**
     * @param {IDBObjectStore} store
     */
    constructor(store) {
        this.#store = store;
    }

    /**
     * @kind member
     * @type {Boolean}
     * @readonly
     */
    get autoincrement() {
        return this.#store.autoIncrement;
    }

    /**
     * @kind member
     * @type {Array.<String>}
     * @readonly
     */
    get indexnames() {
        return Array.from(this.#store.indexNames);
    }

    /**
     * @kind member
     * @type {String}
     * @readonly
     */
    get keypath() {
        return this.#store.keyPath;
    }

    /**
     * @kind member
     * @type {String}
     * @readonly
     */
    get name() {
        return this.#store.name;
    }

    // called from execute_and, execute_or
    #execute_cursor_query = (cursor) => Promise.resolve(cursor.value);

    // called from execute_and, execute_or
    #execute_cursor_update = (cursor, obj) =>
        new Promise((resolve) => {
            cursor
                .update(Object.assign(cursor.value, obj))
                .onsuccess = (event) => {
                    resolve(event.target.source.value);
                };
        });

    // called from execute_and, execute_or
    #execute_cursor_delete = (cursor) =>
        new Promise((resolve) => {
            cursor
                .delete()
                // onsuccess result is always 'undefined', so
                // return the deleted record
                .onsuccess = (event) => {
                    resolve(event.target.source.value);
                };
        });

    #execute_and = (verb, reverse = false, limit = 0, ...args) =>
        new Promise((resolve, reject) => {
            const promises = [];

            // if we update the indexeddb, at this point
            // there are odd number of arguments
            const obj = /^(update)/.test(verb) ? args.pop() : undefined;

            // from here on, always an even number of arguments
            const indexName = args.shift();
            const keyRange = args.shift();

            const request = this.#store
                .index(indexName)
                .openCursor(keyRange, reverse ? "prev" : "next");
            request.onsuccess = (event) => {
                const cursor = event.target.result;

                if (cursor && (!(limit && promises.length >= limit))) {
                    // check more conditions,
                    // to fullfill, every condition must passed
                    for (let n = 0; n < args.length; n += 2) {
                        const indexName = args.shift();
                        const keyRange = args.shift();

                        if (!keyRange.includes(cursor.value[indexName])) {
                            cursor.continue();
                            return;
                        }
                    }

                    switch (verb) {
                        case "query":
                            promises.push(this.#execute_cursor_query(cursor));
                            break;
                        case "update":
                            promises.push(
                                this.#execute_cursor_update(cursor, obj),
                            );
                            break;
                        case "delete":
                            promises.push(this.#execute_cursor_delete(cursor));
                            break;
                        default:
                            console.error("unknown verb ", verb);
                    }

                    cursor.continue();
                } else Promise.all(promises).then((result) => resolve(result));
            };
        });

    #execute_or = (verb, reverse = false, limit = 0, ...args) =>
        new Promise((resolve, reject) => {
            const promises = [];

            // if we update the indexeddb, at this point
            // there are odd number of arguments
            const obj = /^(update)$/.test(verb) ? args.pop() : undefined;

            // from here on, always an even number of arguments

            // helper to observe when the last turn
            // of the while-loop finished
            const counter = ((count, keypath) => {
                return {
                    decr() {
                        if (--count === 0) {
                            Promise.all(promises)
                                .then((a) =>
                                    Array.from(
                                        new Map(
                                            a.map((i) => [i[keypath], i]),
                                        ).values(),
                                    )
                                )
                                .then((a) =>
                                    resolve(a.slice(0, limit || a.length))
                                );
                        }
                    },
                };
            })(args.length / 2, this.keypath);

            while (args.length) {
                const indexName = args.shift();
                const keyRange = args.shift();

                const request = this.#store
                    .index(indexName)
                    .openCursor(keyRange, reverse ? "prev" : "next");
                request.onsuccess = (event) => {
                    const cursor = event.target.result;

                    if (cursor) {
                        switch (verb) {
                            case "query":
                                promises.push(
                                    this.#execute_cursor_query(cursor),
                                );
                                break;
                            case "update":
                                promises.push(
                                    this.#execute_cursor_update(cursor, obj),
                                );
                                break;
                            case "delete":
                                promises.push(
                                    this.#execute_cursor_delete(cursor),
                                );
                                break;
                            default:
                                console.error("unknown verb ", verb);
                        }

                        cursor.continue();
                    } else counter.decr();
                };
            }
        });

    // called by add, clear, cout, delete,
    // get, getAll, getAllKeys, getKey, put
    #execute = (verb, ...args) =>
        new Promise((resolve, reject) => {
            this.#store.transaction.onerror = (event) =>
                reject(event.target.error);
            this.#store[verb](...args).onsuccess = (event) =>
                resolve(event.target.result);
        });

    /**
     * @function
     */
    abort = () => this.#store.transaction.abort();

    /**
     * @function
     * @param {Object} obj
     * @param {Key} [key]
     * @returns {Promise}
     */
    add = (obj, key) => this.#execute("add", obj, key);

    /**
     * @function
     * @returns {Promise}
     */
    clear = () => this.#execute("clear");

    /**
     * @function
     */
    commit = () => this.#store.transaction.commit();

    /**
     * @function
     * @param {KeyOrKeyRange} keyOrKeyRange
     * @returns {Promise}
     */
    count = (keyOrKeyRange) => this.#execute("count", keyOrKeyRange);

    /**
     * @function
     * @param {KeyOrKeyRange} keyOrKeyRange
     * @returns {Promise}
     */
    delete = (keyOrKeyRange) => this.#execute("delete", keyOrKeyRange);

    /**
     * @function
     * @param {KeyOrKeyRange} keyOrKeyRange
     * @returns {Promise}
     */
    get = (keyOrKeyRange) => this.#execute("get", keyOrKeyRange);

    /**
     * @function
     * @param {KeyOrKeyRange} keyOrKeyRange
     * @param {Integer} limit
     * @returns {Promise}
     */
    getAll = (keyOrKeyRange, limit) => this.#execute("getAll", keyOrKeyRange, limit);

    /**
     * @function
     * @param {IDBKeyRange} keyRange
     * @param {Integer} limit
     * @returns {Promise}
     */
    getAllKeys = (keyRange, limit) =>
        this.#execute("getAllKeys", keyRange, limit);

    /**
     * @function
     * @param {Options} options
     * @returns {Promise}
     */
    getAllRecords = (options) => this.#execute("getAllRecords", options);

    /**
     * @function
     * @param {KeyOrKeyRange} keyOrKeyRange
     * @returns {Promise}
     */
    getKey = (keyOrKeyRange) => this.#execute("getKey", keyOrKeyRange);

    /**
     * @function
     * @param {Object} obj
     * @param {Key} key
     * @returns {Promise}
     */
    put = (obj, key) => this.#execute("put", obj, key);

    /**
     * @function
     * @param {String} indexName
     * @param  {...String} keyRangeParams
     * @returns {Query}
     */
    where = (indexName, ...keyRangeParams) => {
        return Object.assign(new Query(indexName, ...keyRangeParams), {
            execute_and: this.#execute_and,
            execute_or: this.#execute_or,
        });
    };

    /**
     * @function
     * @param {String} indexName
     * @param {String} str
     * @param {Boolean} [startsWith=false]
     * @returns {Promise}
     */
    ignoreCase = (indexName, str, startsWith = false) =>
        new Promise((resolve) => {
            const permutations = permutation(str);
            const result = [];

            const request = this.#store
                .index(indexName)
                .openCursor();
            request.onsuccess = (event) => {
                const cursor = event.target.result;

                if (cursor) {
                    let n = 0;
                    const value = cursor.value[indexName];
                    const length = startsWith
                        ? permutations[0].length
                        : value.length;

                    // find cursor.value[indexName] > permutation
                    while (value.substring(0, length) > permutations[n]) {
                        // there are no more permutations
                        if (++n >= permutations.length) {
                            resolve(result);
                            return;
                        }
                    }

                    if (
                        (startsWith && value.indexOf(permutations[n]) === 0) ||
                        value === permutations[n]
                    ) {
                        result.push(cursor.value);
                        cursor.continue();
                    } else {
                        cursor.continue(permutations[n]);
                    }
                } else {
                    resolve(result);
                }
            };
        });
}

/**
 * @class
 * @hideconstructor
 */
class Database {
    #db;

    /**
     * @constructor
     * @param {Database}
     */
    constructor(db) {
        this.#db = db;
    }

    /**
     * @kind member
     * @type {String}
     * @readonly
     */
    get name() {
        return this.#db.name;
    }

    /**
     * @kind member
     * @type {Array.<String>}
     * @readonly
     */
    get storenames() {
        return Array.from(this.#db.objectStoreNames);
    }

    /**
     * @kind member
     * @type {Integer}
     * @readonly
     */
    get version() {
        return this.#db.version;
    }

    /**
     * @private
     * @function
     * @param {Boolean} readonly
     * @param  {...String} storeNames
     * @returns {Promise}
     */
    #readwrite = (readonly = false, ...storeNames) => {
        const request = this.#db.transaction(
            storeNames,
            readonly ? "readonly" : "readwrite",
        );

        return Promise.resolve(storeNames.map((storeName) => {
            return new Store(request.objectStore(storeName));
        }));
    };

    /**
     * @function
     * @param  {...String} storeNames One or more store names, separeted by comma
     * @returns {Store[]} Array of stores
     */
    read = (...storeNames) => this.#readwrite(true, ...storeNames);

    /**
     * @function
     * @param  {...String} storeNames
     * @returns {Store[]} Array of stores
     */
    write = (...storeNames) => this.#readwrite(false, ...storeNames);

    /**
     * @function
     */
    close = () => this.#db.close();
}

/**
 * @function
 * @param {IDBDatabase} db
 * @param {Integer} oldVersion
 * @param {Integer} newVersion
 * @param {Object} scheme
 */
const onupgradeneeded = (db, oldVersion, newVersion, scheme) => {
    for (let version = oldVersion + 1; version <= newVersion; version++) {
        Object.entries(scheme[version]).forEach(([storeName, definition]) => {
            const [keypath, ...indexes] = definition.split(/\s*(?:,)\s*/);

            // helper function to handle the different
            // types of keypaths in stores and indexes
            const prepareKeyPath = (keypath) => {
                return keypath
                    .replace(/[\*\!\@]/, "")
                    .split(/\+/)
                    // at this point keypath is an array
                    .reduce((prev, cur, idx) => {
                        switch (idx) {
                            case 0:
                                // keypath is keyPath:
                                return cur;
                            case 1:
                                // keypath is compound key
                                return [prev, cur];
                            default:
                                return [...prev, cur];
                        }
                    });
            };

            const store = db.createObjectStore(storeName, {
                // if keyPath.length is 0 set keyPath
                // to undefined (out-of-line keys)
                keyPath: prepareKeyPath(keypath) || undefined,
                autoIncrement: /^[\@]/.test(keypath),
            });

            indexes.forEach((indexName) => {
                store.createIndex(
                    indexName.replace(/[\*!]/, ""),
                    prepareKeyPath(indexName),
                    {
                        multiEntry: /^\*/.test(indexName),
                        unique: /^\!/.test(indexName),
                    },
                );

                console.debug(`'${storeName}': index '${indexName}' created`);
            });
        });
    }
};

/**
 *
 */
const JSxDB = {
    /**
     * @kind member
     * @type {Promise}
     */
    get databases() {
        return indexedDB.databases();
    },

    /**
     * @function
     * @param {String} name bla
     * @param {Object} scheme
     * @returns {Promise}
     */
    init: (name, scheme) =>
        new Promise((resolve, reject) => {
            if (!scheme || (typeof scheme !== "object")) {
                return reject(
                    new DOMException(
                        `'${name}': no valid scheme found`,
                        "NotFoundError",
                    ),
                );
            }

            if (typeof scheme !== "object") {
                return reject(
                    new DOMException(
                        `'${name}': invalid scheme found`,
                        "TypeError",
                    ),
                );
            }

            const ordered = Object.keys(scheme).sort((a, b) =>
                parseFloat(a) - parseFloat(b)
            );

            // open the latest version or start an upgrade
            const request = indexedDB.open(name, ordered.at(-1));

            request.onerror = () => reject(request.error);
            request.onblocked = () => reject(request.error);
            request.onsuccess = () => resolve(new Database(request.result));
            request.onupgradeneeded = (event) =>
                onupgradeneeded(
                    event.target.result,
                    event.oldVersion,
                    event.newVersion,
                    scheme,
                );
        }),

    /**
     * @function
     * @param {String} name
     * @returns {Promise}
     */
    open: (name) =>
        new Promise(async (resolve, reject) => {
            if (!(await JSxDB.databases).some((db) => db.name === name)) {
                reject(
                    new DOMException(`'${name}' not found`, "NotFoundError"),
                );
            } else {
                const request = indexedDB.open(name);
                request.onerror = () => reject(request.error);
                request.onblocked = () => reject(request.error);
                request.onsuccess = () => resolve(new Database(request.result));
            }
        }),

    /**
     * @function
     * @param {String} name
     * @returns {Promise}
     */
    remove: (name) =>
        new Promise(async (resolve, reject) => {
            const request = indexedDB.deleteDatabase(name);
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(name);
        }),

    /**
     * @function
     * @param {Key} z
     * @returns {IDBKeyRange}
     */
    eq: (z) => IDBKeyRange.only(z),

    /**
     * @param {*} x
     * @returns {IDBKeyRange}
     */
    le: (x) => IDBKeyRange.upperBound(x),

    /**
     * @param {*} x
     * @returns {IDBKeyRange}
     */
    lt: (x) => IDBKeyRange.upperBound(x, true),

    /**
     * @param {*} y
     * @returns {IDBKeyRange}
     */
    ge: (y) => IDBKeyRange.lowerBound(y),

    /**
     * @param {*} y
     * @returns {IDBKeyRange}
     */
    gt: (y) => IDBKeyRange.lowerBound(y, true),

    /**
     * @param {*} x
     * @param {*} y
     * @param {*} bx
     * @param {*} by
     * @returns {IDBKeyRange}
     */
    between: (x, y, bx, by) => IDBKeyRange.bound(x, y, bx, by),

    /**
     * @param {*} s
     * @returns {IDBKeyRange}
     */
    startsWith: (s) => IDBKeyRange.bound(s, s + "\uffff", true, true),
};


