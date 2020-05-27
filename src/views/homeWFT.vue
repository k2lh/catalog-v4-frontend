<template>
  <!-- eslint-disable -->
  <div id="HomeISA" class="page-body">
    <div class="container">
      <Usernotice />
      <div class="page-header">
        <div class="page-header-overlay">
          <div class="bx--grid bx--grid--condensed">
            <div class="bx--row">
              <div class="bx--col padding-top-2 padding-bottom-1">
                <h2 id="page-title" class="h1 h2-medium h3-small textcolor-white-core">
                  ISA Analytics
                </h2>
              </div>
            </div>
            <div class="bx--row padding-top-1 padding-bottom-3">
              <div class="bx--col">
                <h2 class="page-h2 second-line">
                  Featured Boards
                </h2>
              </div>
              <div v-for="(item, index) in items" v-if="item.section === 'featured'" :key="index" class="bx--col">
                <div class="mlp-tile card card--noborder margin-bottom-0 transition-to-full-opacity">
                    <div class="card__content">
                      <router-link class="" :to="getRoute(item)" title="View this dashboard">
                        <div class="bx--type-expressive-heading-02">
                          {{ item.displayTitle }}
                        </div>
                      </router-link>
                      <div class="bx--tile-content">
                        <p class="bx--type-body-short-02">
                          {{ item.description }}
                        </p>
                      </div>
                    </div>
                    <div class="card__bottom">
                      <p class="padbot1 no-sash">
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

      <main id="maincontent" class="page-content">
        <div class="background background-blue">
          <div class="bx--grid">
            <div class="bx--row padding-top-1">
              <div class="-col-lg-12">
                <p class="bx--type-expressive-heading-04">
                  Don't waste <strong>your time</strong> on spreadsheets. <strong>Work with the dashboard team.</strong>
                </p>
                <p class="bx--type-body-short-01 quoteline">
                  ----, ----, ZZZ IS
                </p>
              </div>
              <div class="-col-lg-4">
                <!-- <p class="bx--type-body-short-01 right-align">
                  Latest major release {{ lastReleaseDate }}.
                </p>
                <p class="bx--type-body-short-01 right-align">
                  Site last updated {{ updated }}.
                </p> -->
                <p class="bx-link bx--type-body-short-01 right-align">
                  <router-link to="/News">
                    See all releases and reviews.
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

        <div class="background background-black newest">
          <div class="bx--grid bx--grid--condensed padding-bottom-2 padding-top-2">
            <div class="bx--row">
              <div class="bx--col">
                <h2 class="page-h2 second-line">
                  Newest Boards
                </h2>
              </div>
              <div v-for="(item, index) in items" v-if="item.section === 'new'" :key="index" class="bx--col">
                <div class="mlp-tile card card--noborder margin-bottom-0 transition-to-full-opacity">
                    <div class="card__content">
                      <router-link class="" :to="getRoute(item)" title="View this dashboard">
                        <div class="bx--type-expressive-heading-02">
                          {{ item.displayTitle }}
                        </div>
                      </router-link>
                      <div class="bx--tile-content">
                        <p class="bx--type-body-short-02">
                          {{ item.description }}
                        </p>
                      </div>
                    </div>
                    <div class="card__bottom">
                      <p class="padbot1 no-sash">
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

        <div class="background background-white">
          <div class="bx--grid">
            <div class="bx--row padtop2">
              <div class="-col-lg-3">
                <h2 class="page-h2 second-line">
                  Current Catalog
                </h2>
              </div>
              <div class="-col-lg-13">
                <div class="bx--row">
                  <div v-for="(item, index) in items" v-if="item.section === 'general' && item.tags.includes('Release')" :key="index" class="bx--no-gutter-sm -col-sm-6 -col-md-3 -col-lg-4">
                    <router-link title="View this dashboard" :to="getRoute(item)" class="resource-card-group">
                      <div class="bx--resource-card">
                        <div class="bx--tile minht12">
                          <div class="bx--type-heading-02">
                            {{ item.displayTitle }}
                          </div>
                          <div class="bx--tile-content bx--type-body-short-01">
                            <p>{{ item.description }}</p>
                          </div>
                          <div class="bx--type-helper-text-01">
                            <p>{{ item.tags[2] }} &#8226; {{ item.tags[3] }} &#8226; {{ item.tags[4] }} &#8226; {{ item.tags[5] }}</p>
                          </div>
                        </div>
                      </div>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="seeTableau" class="background background-blue">
          <div class="bx--grid">
            <div class="bx--row padding-top-2">
              <div class="-col-lg-3">
                <h2 class="page-h2 second-line">
                  Professional Certification Tracking
                </h2>
                <p class="bx--type-helper-text-02 second-line">
                  For tracking professionals who’ve received a badge in an XXX
                  profession.
                </p>
              </div>
              <div class="-col-lg-13">
                <div class="bx--row">
                  <div v-for="(item, index) in items" v-if="item.section === 'plist'" :key="index" class="-col-sm-6 -col-md-3 -col-lg-4 padding-top-1">
                    <router-link class="bx--link bx--type-productive-heading-03" title="View this dashboard" :to=" { name: 'DashFrame', params: { unique: item.uniqueID } }">
                      {{ item.displayTitle }}
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="seeTableau" class="background background-black">
          <div class="bx--grid">
            <div class="bx--row padding-top-2">
              <div class="-col-lg-3">
                <h2 class="page-h2 second-line">
                  Intentional Training Programs
                </h2>
                <p class="bx--type-helper-text-02 second-line">
                  Detail-level tracking of identified, enrolled, and completed
                  upskill and reskill efforts.
                </p>
              </div>
              <div class="-col-lg-13">
                <div class="bx--row">
                  <div v-for="(item, index) in items" v-if="item.section === 'ilist'" :key="index" class="-col-sm-6 -col-md-3 -col-lg-4 padding-top-1">
                    <router-link class="bx--link bx--type-heading-02" title="View this dashboard" :to="getRoute(item)">
                      {{ item.displayTitle }}
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="userId" class="background background-blue">
          <div class="bx--grid">
            <div class="bx--row padding-top-2">
              <div class="-col-lg-3">
                <h2 class="page-h2 second-line">
                  Experimental Dashboards
                </h2>
                <p class="bx--type-helper-text-02 second-line">
                  Exploratory and/or in-development dashboards.
                </p>
              </div>
              <div class="-col-lg-13">
                <div class="bx--row">
                  <div v-for="(item, index) in items" v-if="item.tags.includes('Experimental')" :key="index" class="-col-sm-6 -col-md-3 -col-lg-4 padding-top-1">
                    <router-link class="bx--link bx--type-heading-02" title="View this dashboard" :to="getRoute(item)">
                      {{ item.displayTitle }}
                    </router-link>
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
    name: 'HomeISA',
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
        drafts: [],
        cansee: false,
        lastReleaseDate: null,
        updated: null,
        tableaulicense: false,
        seeTableau: false,
        notLoggedIn: false,
        message: 'Thanks for logging in!'
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
      'baseURL',
      'email'
    ]),
    created() {
      axios.get('https://site-prod-log.domain.net/api/cards/fetch').then((response) => {
        var dataset = response.data;
        // this.lastReleaseDate = response.data.data[0].lastReleaseDate;
        // this.updated = response.data.data[0].updated;
        if (this.shortenv !== 'dev') {
          for (var i = 0; i < dataset.length; i++) {
            if (dataset[i].inProduction && dataset[i].tags[0] === 'ISA') {
              if (dataset[i].tags.includes('Public') || dataset[i].tags.includes('Private + Public')) {
                this.items.push(dataset[i]);
              }
              if (this.userId && dataset[i].tags.includes('Private')) {
                this.items.push(dataset[i]);
              }
            }
          }
        } else {
          for (var i = 0; i < dataset.length; i++) {
            if (dataset[i].tags[0] === 'ISA') {
              this.items.push(dataset[i]);
            }
          }
        }
        this.items = this.items.sort((a, b) => (a.displayTitle > b.displayTitle) ? 1 : -1);
      });
    },
    mounted() {
      if (this.shortenv === 'dev') {
        this.seeTableau = true;
      };
      if (this.environment === 'production') {
        this.logUser();
      };
      if (this.userId || this.shortenv === 'dev') {
        this.seeTableau = true;
      }
    },
    methods: {
      getRoute(item) {
        if (item.useFrame) {
          return { name: 'DashFrame', params: { unique: item.uniqueID, origin: 'ISA' } };
        } else {
          return item.linkurl;
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
            page: 'ISA',
            day: today
          }).then((response) => {
            console.log(response);
          });
        } else {
          axios.post(this.tracking, {
            cnum: this.userId,
            currentUrl: this.$route.path,
            page: 'ISA',
            core: this.groupTeam,
            landk: this.groupAdmins,
            tableau: this.groupDash,
            exec: this.groupExecs,
            org: this.groupOrg,
            day: today
          }).then((response) => {
            console.log(response);
          });
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
      background: #F3F3F3;
      & .page-h2,
      & .bx--type-body-short-01,
      & .bx--type-heading-02 {
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
    min-height: 12rem;
  }

  .bx--type-expressive-heading-02 {
    font-weight: 600;
    font-size: 1.25rem;
    line-height: 1.2;
    letter-spacing: 0.16px;
    padding-bottom: 1rem;
  }
  .page-header {
    min-height: 400px;
    background-image: url(../assets/img/header.jpg);
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
    a {
      color: #FFF;
    }
    a:hover {
      text-decoration: none;
    }
  }

  .mlp-tile {
    background-color: #323232;
    min-height: 13rem;
    a {
      color: #78a9ff;
    }
    a:hover {
      text-decoration: none;
    }
  }
  .bx--tile-content {
    height: 4rem;
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

  .background-white .bx--resource-card .bx--tile {
    outline: 2px solid #F3F3F3;
    background: #FFF;
  }

  a.resource-card-group {
    & .bx--type-code-01,
    & .bx--type-heading-02,
    & .bx--type-body-short-01,
    & .bx--type-helper-text-01 {
      font-style: normal;
      color: #171717;
    }
  }
  a.resource-card-group:hover {
    & .bx--type-code-01,
    & .bx--type-heading-02,
    & .bx--type-body-short-01,
    & .bx--type-helper-text-01 {
      color: #0062ff;
    }
  }

</style>
