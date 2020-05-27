<template>
  <!-- eslint-disable -->
  <div id="HomeManagement" class="page-body">
    <div class="container">
      <div class="page-header">
        <div class="page-header-overlay">
          <div class="bx--grid bx--grid--condensed">
            <div class="bx--row">
              <div class="bx--col padding-top-2 padding-bottom-1">
                <h2 id="page-title" class="h1 h2-medium h3-small textcolor-white-core">
                  project Management Analytics
                </h2>
              </div>
            </div>
            <div class="bx--row padding-top-1 padding-bottom-3">
              <div class="bx--col">
                <h2 class="page-h2 second-line">
                  Featured Boards
                </h2>
              </div>
              <div v-for="(item, index) in items.cards" v-if="item.section == 'feature'" :key="index" class="bx--col">
                <div class="mlp-tile card card--noborder margin-bottom-0 transition-to-full-opacity">
                    <div class="card__content">
                      <router-link class="" :to="getRoute(item)" title="View this dashboard">
                        <div class="bx--type-expressive-heading-02">
                          {{ item.displayTitle }}
                          <span v-if="!item.visibility.anon">*</span>
                        </div>
                      </router-link>
                      <div class="bx--tile-content">
                        <p class="bx--type-body-short-02">
                          {{ item.description }}
                        </p>
                      </div>
                    </div>
                    <div class="card__bottom padding-bottom-0">
                      <p class="padding-top-1 padding-bottom-0 no-sash">
                        <router-link class="bx--type-body-short-02" :to="getRoute(item)" title="View this dashboard">
                            Explore the dashboard
                            <svg width="20px" height="12px" viewBox="0 0 20 16">
                              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="arrow--right" transform="translate(-2.000000, -4.000000)">
                                  <rect id="_Transparent_Rectangle_" x="0" y="0" width="24" height="24" />
                                  <polygon id="Path" fill="#FFFFFF" points="14 4 12.9 5.1 18.9 11.2 2 11.2 2 12.8 18.9 12.8 12.9 18.9 14 20 22 12" />
                                </g>
                              </g>
                            </svg>
                        </router-link>
                      </p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="background background-white">
        <div class="bx--grid bx--grid--condensed">
          <div class="bx--row padding-top-2">
            <div class="bx--col">
              <h2 class="page-h2 second-line">
                Current Catalog
              </h2>
              <p class="bx--type-helper-text-02 second-line">
                An asterisk indicates a tableau license is required to view.
              </p>
            </div>
          </div>
          <div class="bx--row">
            <div v-for="(item, index) in items.cards" v-if="item.section === 'catalog'" :key="index" class="-col-sm-6 -col-md-3 -col-lg-3">
              <div class="bx--tile bx--tile--clickable seamless-vertical">
                <router-link title="View this dashboard" :to="getRoute(item)">
                  <div class="bx--type-heading-02">
                    {{ item.displayTitle }}
                    <span v-if="!item.visibility.anon">*</span>
                  </div>
                  <div class="bx--tile-content bx--type-body-short-01">
                    <p>{{ item.description }}</p>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="background background-blue">
        <div class="bx--grid">
          <div class="bx--row padding-top-2">
            <div class="-col-lg-4">
              <h2 class="page-h2 second-line">
                Additional Reports
              </h2>
              <p class="bx--type-helper-text-02 second-line">
                In this section you will find the available dashboards for CIC Leader, Service Area Leader and GSO's. Click to see a description and the access link.
              </p>
            </div>
            <div class="-col-lg-8">
              <div class="bx--row">
                <div v-for="(item, index) in items.cards" v-if="item.section === 'external'" :key="index" class="-col-sm-12 -col-md-4 -col-lg-4 padding-top-1">
                  <a :href="item.linkurl" class="bx--link bx--type-productive-heading-03" title="View this dashboard">
                    {{ item.displayTitle }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      </main>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import { mapGetters } from 'vuex';

  export default {
    name: 'HomeManagement',
    props: {
      uniqueID: {
        type: String,
        default: ''
      },
      origin: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        isActive: true,
        items: [],
        site: '',
        drafts: []
      };
    },
    computed: mapGetters([
      'usertoken',
      'displayName',
      'groupTeam',
      'groupExecs',
      'groupAdmins',
      'groupDash',
      'groupOrg',
      'userId',
      'environment',
      'shortenv',
      'tracking',
      'baseURL'
    ]),
    created() {
      if (this.environment === 'local') {
        this.site = 'http://localhost:3000';
      };
      // axios.get(this.root + '/open/cards').then((response) => {
      axios.get(this.site + '/api/' + this.shortenv + '/open/cardsManagement').then((response) => {
        this.items = response.data.data[0];
      });
    },
    mounted() {
      if (this.environment === 'production') {
        this.logUser();
      };
    },
    methods: {
      getRoute(item) {
        if (item.dash === 'standalone') {
          return item.linkurl;
        } else {
          return { name: 'DashFrame', params: { unique: item.uniqueID, origin: 'Management' } };
        }
      },
      logUser: function() {
        var d = new Date();
        var month = d.getMonth() + 1;
        var today = d.getFullYear() + '-' + month + '-' + d.getDate();
        if (!this.userId) {
          axios.post(this.tracking, {
            cnum: 'anon',
            currentUrl: this.$route.path,
            page: 'Management',
            day: today
          }).then((response) => {});
        } else {
          axios.post(this.tracking, {
            cnum: this.userId,
            currentUrl: this.$route.path,
            page: 'Management',
            core: this.groupTeam,
            landk: this.groupAdmins,
            exec: this.groupExecs,
            tableau: this.groupDash,
            org: this.groupOrg,
            day: today
          }).then((response) => {});
        }
      }
    }
  };
</script>

<style scoped lang='scss'>

  .bx--type-heading-02.bx--link {
    color: #0062ff;
  }
  .bx--type-body-short-01 {
    color: #fff;
    margin-top: .75rem;
    &.listoflinks {
      margin-top: 0;
    }
  }

  .background {
    &.background-white {
      .page-h2,
      .bx--type-body-short-01,
      .bx--type-heading-02 {
        color: #333;
      }
      a {
        text-decoration: none;
        color: #6EA6FF;
      }
      a:hover {
        text-decoration: none;
        color: blue;
      }
    }
  }

  .highlights {
    .bx--tile {
      &.bx--tile--clickable {
        min-height: 14rem;
      }
    }
  }

  .fixed {
    position: fixed;
    z-index: 9;
  }

  .page-content {
    padding-top: 0rem;
    padding-bottom: 0rem;
  }

  .testamonials {
    margin-top: 3rem;
  }

  .bx--tile {
    min-height: 11rem;
  }

  .bx--type-expressive-heading-02 {
    color: #FFF;
    font-weight: 600;
      font-size: 1.25rem;
      line-height: 1.2;
      letter-spacing: 0.16px;
      padding-bottom: 1rem;
  }
  .page-header {
    min-height: 400px;
    background-image: url(../assets/img/management.jpg);
    border-bottom: 1px solid #3d3d3d;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    .page-h2.second-line {
      color: #FFF;
    }
  }

  .page-header-overlay {
      min-height: 400px;
      max-width: none!important;
      background: linear-gradient(to right,rgba(0,0,0,.6) 0,rgba(0,0,0,.6) 40%,rgba(0,0,0,.2) 75%,rgba(0,0,0,.2) 100%);
      filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#99000000',endColorstr='#33000000',GradientType=1);
      overflow: hidden;
  }

  .listoflinks {
    margin-bottom: 1rem;
  }

  .right-align {
    text-align: right;
  }

  .mlp-tile {
    background-color: #323232;
    min-height: 15rem;
    a,
    a:hover {
      text-decoration: none;
    }
  }
  a.bx--tile:hover {
      border-color: #3d70b2;
  }

  .padding-top-tiny {
    padding-top: 10px!important;
  }

  .bx--link {
    font-size: 1rem;
  }
  .background.background-black.newest {
    padding-bottom: 0!important;
  }

  .card__bottom {
    padding: 0 0 0 20px;
  }
</style>
