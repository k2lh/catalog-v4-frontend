import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  { path: '/', name: 'HomeISA', component:() => import('@/views/homeISA') },
  { path: '/homeISA', name: 'HomeISA', component:() => import('@/views/homeISA') },
  { path: '/HomeManagement', name: 'HomeManagement', component:() => import('@/views/HomeManagement') },
  { path: '/News', name: 'News', component:() => import('@/views/News') },
  { path: '/frame/:unique', name: 'DashFrame', component:() => import('@/views/frame'), props: true },
  // standalone (non-tableau) dashboards
  { path: '/a2targets', name: 'Actuals2Targets', component:() => import('@/views/a2targets') },
  { path: '/ontologyX', name: 'OntologyV2', component: ()=> import ('@/views/ontologyX') },
  { path: '/time/overview', name: 'TimeOverviewMain', component:() => import('@/views/time/overview') },
  { path: '/time/drilldown', name: 'TimeOverviewDrill', component:() => import('@/views/time/drilldown') },
  { path: '/future', name: 'FutureHome', component:() => import('@/views/future') },
  { path: '/admin/cards', name: 'Cards', component:() => import('@/views/admin/cards') },
  { path: '/admin/requests', name: 'Requests', component:() => import('@/views/admin/requests') },

  { path: '/capacity/estimate', name: 'CapacityEstimate', component:() => import('@/views/capacity/estimate') },
  { path: '/capacity/need', name: 'CapacityNeed', component:() => import('@/views/capacity/need') },
  { path: '/cognitive/ttds', name: 'CognitiveTTDS', component:() => import('@/views/cognitive/ttds') },
  { path: '/cognitive/ttsre', name: 'CognitiveTTSRE', component:() => import('@/views/cognitive/ttsre') },

  { path: '/prototypes/accounts', name: 'AccountsSA', component:() => import('@/views/prototypes/accounts') },
  { path: '/prototypes/edvisor', name: 'EdvisorPlan', component:() => import('@/views/prototypes/edvisor') },
  { path: '/prototypes/executive', name: 'ExecutiveSA', component:() => import('@/views/prototypes/executive') },
  { path: '/prototypes/journey', name: 'JourneyCL', component:() => import('@/views/prototypes/journey') },
  { path: '/prototypes/ontology', name: 'OntologyV1', component:() => import('@/views/prototypes/ontology') },
  { path: '/prototypes/redhat', name: 'RedHatPlan', component:() => import('@/views/prototypes/redhat') },
  { path: '/prototypes/services', name: 'ServicesAR', component:() => import('@/views/prototypes/services') },
  // { path: '/prototypes/traffic', name: 'Traffic', component:() => import('@/views/prototypes/traffic') },        

  { path: '/teamview/badges', name: 'TeamViewBadges', component:() => import('@/views/teamview/badges') },
  { path: '/teamview/certs', name: 'TeamViewCerts', component:() => import('@/views/teamview/certs') },
  { path: '/teamview/learning', name: 'TeamViewLearning', component:() => import('@/views/teamview/learning') },
  { path: '/teamview/summary', name: 'TeamViewSummary', component:() => import('@/views/teamview/summary') },
  { path: '/teamview/individual', name: 'TeamViewIndividual', component:() => import('@/views/teamview/individual') },

  { path: '/time/all', name: 'TimeAll', component:() => import('@/views/time/all') },
  { path: '/time/hierarchy', name: 'TC2Hierarchy', component:() => import('@/views/time/hierarchy') },
  { path: '/time/offering/:unique', name: 'TimeOffer', component:() => import('@/views/time/offering'), props: true },
  { path: '/time/portfolio/:unique', name: 'TimePfolio', component:() => import('@/views/time/portfolio'), props: true },
  { path: '/time/segment/:unique', name: 'TimeSeg', component:() => import('@/views/time/segment'), props: true },

  // keep this last
  { path: '*', name: 'NotFound', component:() => import('@/views/404') }
];

// environment-flagged routes
console.log('NODE_ENV', process.env.NODE_ENV)
if (process.env.NODE_ENV !== 'production') {

}

const router = new Router({
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
  mode: 'history',
  historyApiFallback: true
})

export default router
