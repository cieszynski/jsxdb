import JSxDB from "http://127.0.0.1:8081/jsxdb.mjs";

const PATTERN = new URLPattern({
    pathname: "/jsxdb/{:dbname}?{/:storename}?{/:itemid}?{/:subpath}*",
});

const fetchHandler = async (event) => {
    event.respondWith(
        (async (request) => {
            const { url, method, headers, body } = request;

            if (!PATTERN.test(url)) {
                return fetch(request);
            }

            const { dbname, storename, itemid, subpath } = PATTERN.exec(url)
                .pathname.groups;

            const response = {
                self: url,
                status: 405,
                headers: {
                    "Content-Type": "application/json",
                },
            };

            try {
                if (!dbname) {
                    switch (method) {
                        case "GET":
                            response.databases = await JSxDB.databases();
                            response.status = 200;
                            break;
                    }
                } else {
                    const db = await JSxDB.open(dbname)
                        .catch((error) => error);

                    if (db instanceof Error) {
                        throw db;
                    }

                    if (!storename) {
                        switch (method) {
                            case "GET":
                                Object.assign(response, {
                                    name: db.name,
                                    version: db.version,
                                    stores: db.storenames,
                                    status: 200,
                                });
                                break;
                        }
                        db.close();
                    } else {
                        const [store] =
                            ["PUT", "POST", "PATCH", "DELETE"].includes(method)
                                ? await db.write(storename)
                                    .catch((error) => error)
                                : await db.read(storename)
                                    .catch((error) => error);

                        if (store instanceof Error) {
                            db.close();
                            throw store;
                        }

                        if (!itemid) {
                            switch (method) {
                                case "GET":
                                    Object.assign(response, {
                                        name: store.name,
                                        keyPath: store.keyPath,
                                        indexNames: store.indexNames,
                                        count: await store.count(),
                                        status: 200,
                                    });
                                    break;
                            }
                            db.close();
                        } else {
                            // if itemid is a number ...
                            const id = /[0-9]+/.test(itemid)
                                ? parseInt(itemid)
                                : itemid;

                            const item = await store.get(id)
                                .catch((error) => error);

                            if (item instanceof Error) {
                                db.close();
                                throw item;
                            }

                            if (!subpath) {
                                switch (method) {
                                    case "GET":
                                        Object.assign(response, {
                                            result: item,
                                            status: 200,
                                        });
                                        break;
                                }
                                db.close();
                            } else {
                                switch (method) {
                                    case "GET":
                                        response.result =
                                            subpath.split("/").reduce(
                                                (prev, curr) => {
                                                    return prev[curr];
                                                },
                                                item,
                                            ) ?? null;
                                        response.status = response.result
                                            ? 200
                                            : 404;
                                        break;
                                    case "PATCH":
                                        //TODO
                                        break;
                                }
                            }
                        }
                    }
                }
            } catch (e) {
                console.error(e);
            } finally {
                return new Response(JSON.stringify(response), {
                    status: response.status,
                    headers: response.headers,
                });
            }
        })(event.request),
    );
};

export default {
    fetchHandler,
};
