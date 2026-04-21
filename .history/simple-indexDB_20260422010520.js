const db = await openDB('simple-database', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('people')) {
      db.createObjectStore('people', { keyPath: 'email' });
    }
  }
});