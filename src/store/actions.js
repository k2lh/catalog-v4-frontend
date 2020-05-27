// import idb from '@/api/indexDB';

export default {
  // async deleteTable(context, table) {
  //   console.log('STORE >> asked to delete ' + table.id);
  //   await idb.deleteTable(table);
  // },
  // async loadTables(context) {
  //   console.log('STORE >> load tables');
  //   context.state.tables = [];
  //   let tables = await idb.getTables();
  //   tables.forEach(s => {
  //     context.state.tables.push(s);
  //   });
  // },
  // async saveTable(context, table) {
  //   console.log('STORE >> save tables');
  //   await idb.saveTable(table);
  // }
};

export const setCurrentView = ({ dispatch }, view) => {
  dispatch('SET_CURRENT_VIEWs', note);
};
