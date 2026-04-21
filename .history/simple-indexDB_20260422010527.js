const db = await openDB('simple-database', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('')) {
      db.createObjectStore('people', { keyPath: 'email' });
    }
  }
});