import JSxDB from "http://127.0.0.1:8081/jsxdb.mjs";

const database_handler = async (database, request) => {
    const { method } = request;

    const body = { status: 405 };
    const headers = {
        "Content-Type": "application/json",
    };

    try {
        switch (method) {
            case "GET": {
                const db = await JSxDB.open(database);
                body.stores = db.storenames;
                body.status = 200;

                db.close();
                break;
            }

            case "DELETE": {
                const databases = (await JSxDB.databases())
                    .map((item) => item.name);

                if (databases.includes(database)) {
                    body.deleted = await JSxDB.remove(database);
                    body.status = 200;
                } else {
                    body.status = 404;
                }
                break;
            }
        }
    } catch (error) {
        body.error = error.message;
        body.status = 500;
    }

    return new Response(JSON.stringify(body), {
        status: body.status,
        headers: headers,
    });
};

const default_handler = async (request) => {
    const { method } = request;

    const body = { status: 405 };
    const headers = {
        "Content-Type": "application/json",
    };

    try {
        switch (method) {
            case "GET": {
                body.databases = await JSxDB.databases();
                body.status = 200;
                break;
            }

            case "POST": {
                const { name, schema } = await request.json();
                const db = await JSxDB.init(name, schema);

                body.status = 201;
                body.location =
                    headers.location =
                        new URL(name, location.href);

                db.close();
                break;
            }
        }
    } catch (error) {
        body.error = error.message;
        body.status = 500;
    }
    
    return new Response(JSON.stringify(body), {
        status: body.status,
        headers: headers,
    });
};

const fetchHandler = async (event) => {
    console.debug("A", event.request);

    const pattern = new URLPattern({
        pathname: "/jsxdb/{:database}?{/:store}?{/:item}?",
    });

    if (!pattern.test(event.request.url)) {
        return fetch(event.request);
    }

    const { database, store, item } = pattern.exec(event.request.url)
        .pathname.groups;

    const handler = async () => {
        switch (true) {
            case !!database:
                return database_handler(database, event.request);

            default:
                return default_handler(event.request);
        }
    };

    event.respondWith(handler());
};

export default {
    fetchHandler,
};
