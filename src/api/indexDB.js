const dbName = 'tabledb';
const osName = 'tables';
const dbVersion = 1;
let DB;

export default {
  async getDb() {
    return new Promise((resolve, reject) => {
      if(DB) {
        console.log('...... has DB');
        return resolve(DB);
      }
      console.log('OPENING DB', DB);
      let request = window.indexedDB.open(dbName, dbVersion);
      request.onerror = e => {
        console.log('/api/indexDB >> Error opening db', e);
        reject('Error');
      };
      request.onsuccess = e => {
        console.log('/api/indexDB >> success', e.target.result);
        DB = e.target.result;
        resolve(DB);
      };
      request.onupgradeneeded = e => {
        console.log('/api/indexDB >> onupgradeneeded');
        let db = e.target.result;
        db.createObjectStore(osName, { autoIncrement: true, keyPath: 'id' });
      };
    });
  },
  async deleteTable(table) {
    console.log('/api/indexDB >> deleteTable');
    let db = await this.getDb();
    return new Promise(resolve => {
      let trans = db.transaction([osName],'readwrite');
      trans.oncomplete = () => {
        resolve();
      };
      let store = trans.objectStore(osName);
      store.delete(table.id);
    });
  },
  async getTables() {
    console.log('/api/indexDB >> getTables');
    let db = await this.getDb();
    return new Promise(resolve => {
      let trans = db.transaction([osName],'readonly');
      trans.oncomplete = () => {
        resolve(tables);
      };
      let store = trans.objectStore(osName);
      let tables = [];
      store.openCursor().onsuccess = e => {
        let cursor = e.target.result;
        if (cursor) {
          tables.push(cursor.value)
          cursor.continue();
        }
      };
    });
  },
  async saveTable(table, name) {
    console.log('/api/indexDB >> saveTable / name = ', name);
    let db = await this.getDb();
    return new Promise(resolve => {
      let trans = db.transaction([osName],'readwrite');
      trans.oncomplete = () => {
        resolve();
      };
      let store = trans.objectStore(osName);
      store.put(table);
    });
  }
}
