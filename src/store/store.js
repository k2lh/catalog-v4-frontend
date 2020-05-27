import actions from './actions';
import nav from './modules/nav';
import tabs from './modules/tabs';
import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    environment: 'production',
    shortenv: 'prod',
    baseURL: null,
    tracking: 'https://site-prod-log.domain.net/api/events',
    usertoken: null,
    displayName: null,
    userId: null,
    email: null,
    groupTeam: null,
    groupExecs: null,
    groupAdmins: null,
    groupDash: null,
    groupOrg: null,
    mgrStatus: false,
    mgrID: null,
    mgrName: null,
    showNote: true,
    tables: []
  },
  modules: {
    nav,
    tabs
  },
  mutations: {
    setEnvironment: (state, page) => {
      state.environment = page;
    },
    setShortenv: (state, page) => {
      state.shortenv = page;
    },
    setbaseURL: (state, page) => {
      state.baseURL = page;
    },
    setTracking: (state, value) => {
      state.tracking = value;
    },
    setUserToken: (state, value) => {
      state.usertoken = value;
    },
    setDisplayName: (state, value) => {
      state.displayName = value;
    },
    setUserId: (state, value) => {
      state.userId = value;
    },
    setEmail: (state, value) => {
      state.email = value;
    },
    setGroupTeam: (state, value) => {
      state.groupTeam = value;
    },
    setGroupExecs: (state, value) => {
      state.groupExecs = value;
    },
    setGroupAdmins: (state, value) => {
      state.groupAdmins = value;
    },
    setGroupDash: (state, value) => {
      state.groupDash = value;
    },
    setGroupOrg: (state, value) => {
      state.groupOrg = value;
    },
    setMgrStatus: (state, value) => {
      state.mgrStatus = value;
    },
    setMgrCNUM: (state, value) => {
      state.mgrID = value;
    },
    setMgrName: (state, value) => {
      state.mgrName = value;
    },
    setShowNote: (state, value) => {
      state.showNote = value;
    }
  },
  getters: {
    environment: state => state.environment,
    shortenv: state => state.shortenv,
    baseURL: state => state.baseURL,
    tracking: state => state.tracking,
    usertoken: state => state.usertoken,
    displayName: state => state.displayName,
    userId: state => state.userId,
    email: state => state.email,
    groupTeam: state => state.groupTeam,
    groupExecs: state => state.groupExecs,
    groupAdmins: state => state.groupAdmins,
    groupDash: state => state.groupDash,
    groupOrg: state => state.groupOrg,
    mgrStatus: state => state.mgrStatus,
    mgrID: state => state.mgrID,
    mgrName: state => state.mgrName,
    showNote: state => state.showNote
  },
  actions
});
