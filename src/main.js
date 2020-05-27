import Vue from 'vue';
import { mapGetters } from 'vuex';
import app from './app';
import router from './router';
import { store } from './store/store';
import VueSession from 'vue-session';
import axios from 'axios';
import 'babel-polyfill';
import vueMoment from 'vue-moment';
import VueCookie from 'vue-cookie';
import VueTruncate from 'vue-truncate-filter';
import numeral from 'numeral';
import vSelect from 'vue-select';
import VCharts from 'v-charts';
import numFormat from 'vue-filter-number-format';
// import VueIdb from 'vue-idb'
import Datepicker from 'vuejs-datepicker';

import echarts from "echarts";
Vue.prototype.$echarts = echarts;
import SmartTable from 'vuejs-smart-table'

import CarbonComponentsVue from '@carbon/vue/src/index';
import '@/filters/index.js';
import '@/assets/background.scss';

window.bus = new Vue({});

Vue.use(CarbonComponentsVue);
Vue.use(VueSession);
Vue.use(vueMoment);
Vue.use(VueCookie);
Vue.use(VueTruncate);
Vue.use(VCharts);
Vue.use(SmartTable);

Vue.component('datepicker', Datepicker)
Vue.component('v-select', vSelect);
// Vue.use(VueIdb);
// export default new VueIdb({
//   database: 'test',
//   schemas: [
//     { tests: 'id, data, created_at, updated_at' },
//     { bigs: 'id, data, created_at, updated_at' }
//   ]
// });

Vue.component('PageheadNoTabs', () => import('./components/pagehead/PageheadNoTabs.vue'));
Vue.component('PageheadTabs', () => import('./components/pagehead/PageheadTabs.vue'));
Vue.component('PageheadShort', () => import('./components/pagehead/PageheadShort.vue'));
Vue.component('Usernotice', () => import('./components/pagehead/Usernotice.vue'));
Vue.component('ArrowTrend', () => import('./components/charts/ArrowTrend.vue'));
Vue.component('ArrowTrendTable', () => import('./components/charts/ArrowTrendTable.vue'));
Vue.component('ArrowVertical', () => import('./components/charts/ArrowVertical.vue'));
Vue.component('BanCard', () => import('./components/charts/BanCard.vue'));
Vue.component('BarAndLine', () => import('./components/charts/BarAndLine.vue'));
Vue.component('BarHorizontal', () => import('./components/charts/BarHorizontal.vue'));
Vue.component('BarHorizontalStacked', () => import('./components/charts/BarHorizontalStacked.vue'));
Vue.component('BarVertical', () => import('./components/charts/BarVertical.vue'));
Vue.component('BarVerticalStacked', () => import('./components/charts/BarVerticalStacked.vue'));
Vue.component('BarVerticalStackedOld', () => import('./components/charts/BarVerticalStackedOld.vue'));
Vue.component('BulletNew', () => import('./components/charts/BulletNew.vue'));
Vue.component('BulletSimple', () => import('./components/charts/BulletSimple.vue'));
Vue.component('Gauge', () => import('./components/charts/Gauge.vue'));
Vue.component('LineChart', () => import('./components/charts/LineChart.vue'));
Vue.component('MapChart', () => import('./components/charts/MapChart.vue'));
Vue.component('PieChart', () => import('./components/charts/PieChart.vue'));
Vue.component('PiePercent', () => import('./components/charts/PiePercent.vue'));
Vue.component('RingChart', () => import('./components/charts/RingChart.vue'));
Vue.component('RingPercent', () => import('./components/charts/RingPercent.vue'));
Vue.component('WaterfallChart', () => import('./components/charts/WaterfallChart.vue'));

Vue.component('HorizontalFilter', () => import('./components/HorizontalFilter.vue'));

Vue.component('bugout', () => import('./components/forms/bugout.vue'));
Vue.component('cogacc', () => import('./components/forms/cogacc.vue'));
Vue.component('consult', () => import('./components/forms/consult.vue'));
Vue.component('dbacc', () => import('./components/forms/dbacc.vue'));
Vue.component('dashhelp', () => import('./components/forms/dashhelp.vue'));
Vue.component('dashreq', () => import('./components/forms/dashreq.vue'));
Vue.component('onerep', () => import('./components/forms/onerep.vue'));
Vue.component('recrep', () => import('./components/forms/recrep.vue'));
Vue.component('repacc', () => import('./components/forms/repacc.vue'));
Vue.component('rephelp', () => import('./components/forms/rephelp.vue'));
Vue.component('tabacc', () => import('./components/forms/tabacc.vue'));
Vue.component('wrkrep', () => import('./components/forms/wrkrep.vue'));

Vue.config.productionTip = false;

Vue.filter('formatPercent', function (value) {
  return numeral(value).format('0.0%'); // displaying other groupings/separators is possible, look at the docs
});
Vue.filter('formatNumber', function (value) {
  return numeral(value).format('0,0'); // displaying other groupings/separators is possible, look at the docs
});

Vue.filter('numFormat', numFormat(numeral));

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  axios,
  components: {
    app
  },
  data() {
    return {
      user: null,
      usertoken: null
    };
  },
  computed: mapGetters([
    'baseURL'
  ]),
  mounted() {
    console.log('run mounted');
    var environment = '';
    var shortenv = '';
    if (window.location.href.includes('localhost')) {
      environment = 'local';
      shortenv = 'dev';
    } else if (window.location.href.includes('dev')) {
      environment = 'dev';
      shortenv = environment;
    } else if (window.location.href.includes('staging')) {
      environment = 'staging';
      shortenv = environment;
    } else {
      environment = 'prod';
      shortenv = environment;
    };
    this.$store.commit('setEnvironment', environment);
    this.$store.commit('setShortenv', shortenv);
    var res = window.location.href.split('/');
    let baseURL = 'https://' + res[2] + '/';
    this.$store.commit('setbaseURL', baseURL);
    this.$store.commit('setTracking', 'https://site-prod-log.domain.net/api/events');
    if (this.$cookie.get('showNote') === null) {
      this.$cookie.set('showNote', true);
      this.$store.commit('setShowNote', this.$cookie.get('showNote'));
    } else {
      this.$store.commit('setShowNote', this.$cookie.get('showNote'));
    };
    if (this.$cookie.get('token') !== null) {
      this.getOrg();
      this.$store.commit('setUserToken', this.$cookie.get('token'));
      this.$store.commit('setEmail', this.$cookie.get('email'));
      this.$store.commit('setGroupTeam', this.getBoolean(this.$cookie.get('groupTeam')));
      this.$store.commit('setGroupExecs', this.getBoolean(this.$cookie.get('groupExecs')));
      this.$store.commit('setGroupAdmins', this.getBoolean(this.$cookie.get('groupAdmins')));
      this.$store.commit('setGroupDash', this.getBoolean(this.$cookie.get('groupDash')));
      this.$store.commit('setGroupOrg', this.$cookie.get('groupOrg'));
      this.$store.commit('setMgrStatus', this.getBoolean(this.$cookie.get('mgrStatus')));
      this.$store.commit('setMgrCNUM', this.$cookie.get('mgrID'));
      this.$store.commit('setMgrName', this.$cookie.get('mgrName'));
      this.$store.commit('setDisplayName', this.$cookie.get('displayName'));
      this.$store.commit('setUserId', this.$cookie.get('userid'));
      // if (window.location.href.includes('dev')) {
      //   this.$store.commit('setMgrStatus', true);
      //   this.$store.commit('setMgrCNUM', '806948897');
      //   this.$store.commit('setMgrName', '(Manager Name)');
      //   this.$store.commit('setDisplayName', '(My Name)');
      //   this.$store.commit('setUserId', '5G9002897');
      // };
    } else {
      console.log('no usertoken');
      if (window.location.href.includes('localhost')) {
        this.$store.commit('setGroupTeam', true);
        this.$store.commit('setGroupExecs', false);
        this.$store.commit('setGroupAdmins', false);
        this.$store.commit('setGroupDash', false);
        this.$store.commit('setGroupOrg', 'ZZZ');
        this.$store.commit('setMgrStatus', true);
        this.$store.commit('setMgrCNUM', '806948897');
        this.$store.commit('setMgrName', '(Manager Name)');
        this.$store.commit('setDisplayName', '(My Name)');
        this.$store.commit('setUserId', '082067649');
      } else {
        this.$store.commit('setUserToken', null);
        this.$store.commit('setGroupTeam', false);
        this.$store.commit('setGroupExecs', false);
        this.$store.commit('setGroupAdmins', false);
        this.$store.commit('setGroupDash', false);
        this.$store.commit('setGroupOrg', null);
      }
    }
  },
  methods: {
    getOrg() {
      axios.get('https://w3-services1.w3-969.ibm.com/myw3/unified-profile/v1/docs/instances/master?userId=' + this.$cookie.get('userid')).then((response) => {
        this.$cookie.set('mgrStatus', response.data.content.identity_info.employeeType.isManager);
        this.$cookie.set('mgrName', response.data.content.identity_info.functionalManager.nameDisplay);
        this.$cookie.set('groupOrg', response.data.content.identity_info.org.group);
        this.$cookie.set('mgrID', response.data.content.identity_info.functionalManager.uid);
      });
    },
    getBoolean(val) {
      if (val === 'true') {
        return true;
      } else {
        return false;
      }
    }
  },
  template: '<app/>'
});

// register
