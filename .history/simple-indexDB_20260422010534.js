const db = await openDB('simple-database', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('test')) {
      db.createObjectStore('test', { keyPath: 'email' });
    }
  }
});