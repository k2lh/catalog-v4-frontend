// import Pagehead from './pagehead';
//
// const components = [
//   pagehead
// ];

export default {
  install(Vue, options) {
    if (typeof options === 'undefined') {
      components.forEach(c => Vue.component(c.name, c));
    } else {
      if (!(options instanceof Array)) {
        throw new TypeError('options must be an array');
      }
      components.forEach((c) => {
        if (options.indexOf(c.name) !== -1) {
          Vue.component(c.name, c);
        }
      });
    }
  },
};

// export {
//   Pagehead
// };
