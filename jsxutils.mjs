// if itemid is a number ...
//const id = /[0-9]+/.test(itemid) ? parseInt(itemid) : itemid;

/**
 * 
 * @param {String} value 
 * @returns {Integer|String}
 */
const intOrString = (value) => /[0-9]+/.test(value) ? parseInt(value) : value;

/**
 * 
 * @param {String} url 
 * @returns {QueryObject}
 */
const parseSearchParams = (url) => {
    const { searchParams } = new URL(url);

    const REGEX =
        /(?<op>eq|le|ge|lt|gt|bt|sw)\((?<dat1>\p{L}+)(?:,\s*(?<dat2>\p{L}+))?\)/u;

    const queryobj = { query: [] };

    for (const [key, value] of searchParams.entries()) {
        switch (key) {
            case "limit":
                queryobj.limit = parseInt(value);
                continue;
            case "reverse":
                queryobj.reverse = /1|true/.test(value);
                continue;
            case "or":
                queryobj.or = /1|true/.test(value);
                continue;
            default:
                const { op, dat1, dat2 } = REGEX.exec(value)
                    ?.groups ?? {};
                queryobj.query.push({
                    key: key,
                    op: op,
                    value: [dat1, dat2]
                        // dat2 may be undefined
                        .filter((dat) => dat !== undefined)
                        // ensure integers stay integers
                        .map((dat) => intOrString(dat)),
                });
        }
    }

    return queryobj;
};

export default {
    intOrString,
    parseSearchParams,
};
