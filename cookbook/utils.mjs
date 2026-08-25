import * as JSxDB from "../jsxdb.mjs";

const preparedb = (name = "test.db") =>
    new Promise(async (resolve, reject) => {
        const db = await JSxDB.init(name, {
            1: {
                user: "@id, firstname, lastname",
            },
        });

        console.log(db)

        try {
            const [store1] = await db.write("user");

            for await (
                const item of [
                    { firstname: "a", lastname: "A" },
                    { firstname: "b", lastname: "B" },
                    { firstname: "c", lastname: "C" },
                ]
            ) {
                store1.add(item);
            }

            resolve(db);
        } catch (ex) {
            reject(ex);
        }
    });

export { preparedb };
