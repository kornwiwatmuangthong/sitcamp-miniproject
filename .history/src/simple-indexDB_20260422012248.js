// @ts-ignore
import { openDB } from "https://cdn.jsdelivr.net/npm/idb@8/+esm";

// Cache the DB promise — opened once, reused everywhere
const dbPromise = openDB("simple-database", 1, {
  upgrade(db) {
     db.createObjectStore("test", { keyPath: "id", autoIncrement: true });
  },
});

const user = { name: "John Doe", age: 20 };

// Reuse the same connection
const db = await dbPromise;
const id = await db.add("test", user);
console.log("Inserted user with id:", id);

const result = await db.get("test", id);
console.log("Fetched:", result);