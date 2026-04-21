import { openDB } from "https://cdn.jsdelivr.net/npm/idb@8/+esm";

const user = {
  name: "John Doe",
  age: 20,
};

async function init() {
  const db = await openDB("ssn", 1, {
    /**
     *
     * @param {any} db
     */
    upgrade(db) {
      if (!db.objectStoreNames.contains("test")) {
        db.createObjectStore("test", { autoIncrement: true, keyPath: "id"});
      }
    },
  });
  return db
}
init()