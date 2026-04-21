// @ts-ignore
import { openDB } from "https://cdn.jsdelivr.net/npm/idb@8/+esm";

const DB_NAME = "simple-database";
const DB_VERSION = 1;
const STORE_NAME = "test";

/** Initialize the database */
async function init() {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
      }
    },
  });
  return db;
}

/** Add a record */
async function addRecord(data) {
  const db = await init();
  const id = await db.add(STORE_NAME, data);
  console.log("Added record with id:", id);
  return id;
}

/** Get a record by ID */
async function getRecord(id) {
  const db = await init();
  return await db.get(STORE_NAME, id);
}

/** Get all records */
async function getAllRecords() {
  const db = await init();
  return await db.getAll(STORE_NAME);
}

/** Update a record */
async function updateRecord(data) {
  const db = await init();
  await db.put(STORE_NAME, data); // data must include the `id` key
  console.log("Updated record:", data.id);
}

/** Delete a record by ID */
async function deleteRecord(id) {
  const db = await init();
  await db.delete(STORE_NAME, id);
  console.log("Deleted record:", id);
}

// --- Usage ---
const user = { name: "John Doe", age: 20 };

const id = await addRecord(user);
console.log(await getRecord(id));       // { id: 1, name: "John Doe", age: 20 }
console.log(await getAllRecords());     // [{ id: 1, ... }]

await updateRecord({ id, name: "Jane Doe", age: 25 });
console.log(await getRecord(id));       // { id: 1, name: "Jane Doe", age: 25 }

await deleteRecord(id);
console.log(await getAllRecords());  