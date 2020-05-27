<template>
  <!-- eslint-disable -->
  <div id="FutureHome" class="page-body g90">
    <div class="container">
      <Usernotice />
      <div class="page-header">
        <div class="bx--grid">
          <div class="bx--row">
            <div class="bx--col">
              <div class="col-medium-12-6 col-12-6">
                <h1 class="h1 textcolor-white-core padding-bottom-0 padding-top-3" id="pagetitle-h1">
                  Talent Transformation Analytics
                </h1>
                <p class="h4 light textcolor-white-core padding-top-1 padding-bottom-1 shortpar">
                  Explore an extensive portfolio of analytic dashboards for SAA, project Management, project Transformation, and AII.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main id="maincontent" class="page-content">

        <div class="background background-blue">
          <div class="bx--grid">
            <div class="bx--row padding-top-2">
              <div class="-col-lg-3">
                <div class="bx--type-productive-heading-03 padtop1">
                  Featured Dashboards
                </div>
                <p class="bx--type-body-long-01 second-line padtop1">
                  New and featured dashboards across all platforms.
                </p>
              </div>
              <div class="-col-lg-13">
                <div class="bx--row quickboxes">
                  <div v-for="(item, index) in items" v-if="item.section === 'featured' || item.section === 'new'" :key="index" class="-col-sm-6 -col-md-3 -col-lg-4 padding-top-1 quickbox">
                    <router-link class="bx--link bx--type-productive-heading-02" title="View this dashboard" :to=" { name: 'DashFrame', params: { unique: item.uniqueID } }">
                      {{ item.displayTitle }}
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="background background-white bannerstripe">
          <div class="bx--grid">
            <div class="bx--row padding-top-1">
              <div class="-col-lg-12">
                <p class="bx--type-expressive-heading-03">
                  "Don't waste <strong>your time</strong> on spreadsheets. <strong>Work with the dashboard team.</strong>"
                </p>
                <p class="bx--type-body-short-02">
                  Scott Berentsen, Global Red Hat Enablement, ZZZ Infrastructure Services
                </p>
              </div>
              <div class="-col-lg-4">
                <p class="bx-link bx--type-body-short-02 right-align">
                  <router-link to="/admin/requests">
                    Submit a request.
                  </router-link>
                </p>
                <p class="bx-link bx--type-body-short-02 right-align">
                  <router-link to="/News">
                    See all releases and reviews.
                  </router-link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="background background-black">
          <div class="bx--grid bx--grid--condensed">
            <div class="bx--row padtop2">
              <div class="-col-lg-3">
                <div class="bx--type-productive-heading-02 padbot1">
                  Business groups
                </div>
                <cv-radio-group :vertical="'vertical'">
                  <cv-radio-button name="'All groups'" v-model="filterList.fgroup" label="All groups" checked="checked" value="" />
                  <cv-radio-button name="'Corporate'" v-model="filterList.fgroup" label="Corporate" value="Corp" />
                  <cv-radio-button name="'Business'" v-model="filterList.fgroup" label="Business" value="NNN" />
                  <cv-radio-button name="'Technologies'" v-model="filterList.fgroup" label="Technologies" value="ZZZ" />
                </cv-radio-group>

                <div class="bx--type-productive-heading-02 padbot1 padtop2">
                  Programs & initiatives
                </div>
                <cv-radio-group :vertical="'vertical'">
                  <cv-radio-button name="'All programs'" v-model="filterList.fprog" label="All programs" checked="checked" value="" />
                  <cv-radio-button name="'Academy'" v-model="filterList.fprog" label="Academy" value="AIS" />
                  <cv-radio-button name="'project Management'" v-model="filterList.fprog" label="project Management" value="Management" />
                  <cv-radio-button name="'project Transformation'" v-model="filterList.fprog" label="project Transformation" value="ISA" />
                </cv-radio-group>

                <div class="bx--type-productive-heading-02 padbot1 padtop2">
                  Specific audiences
                </div>
                <cv-radio-group :vertical="'vertical'">
                  <cv-radio-button name="'All audiences'" v-model="filterList.faudience" label="All audiences" checked="checked" value="" />
                  <cv-radio-button name="'Admins'" v-model="filterList.faudience" label="Admins" value="Admins" />
                  <cv-radio-button name="'Employees'" v-model="filterList.faudience" label="Employees" value="Employees" />
                  <cv-radio-button name="'Executives'" v-model="filterList.faudience" label="Executives" value="Executives" />
                  <cv-radio-button name="'Managers'" v-model="filterList.faudience" label="Managers" value="Managers" />
                </cv-radio-group>

                <div class="bx--type-productive-heading-02 padbot1 padtop2">
                  Permissions level
                </div>
                <cv-radio-group :vertical="'vertical'">
                  <cv-radio-button name="'All permissions'" v-model="filterList.fperms" label="All permissions" checked="checked" value="" />
                  <cv-radio-button name="'Private'" v-model="filterList.fperms" label="Private (limited users)" value="Private" />
                  <cv-radio-button name="'Public'" v-model="filterList.fperms" label="Public (all users)" value="Public" />
                  <cv-radio-button name="'Private + Public'" v-model="filterList.fperms" label="Private + Public versions" value="Private + Public" />
                </cv-radio-group>

                <div class="bx--type-productive-heading-02 padbot1 padtop2">
                  Dashboard types
                </div>
                <cv-radio-group :vertical="'vertical'">
                  <cv-radio-button name="'All types'" v-model="filterList.fdash" label="All types" checked="checked" value="" />
                  <cv-radio-button name="'Tableau'" v-model="filterList.fdash" label="Tableau" value="Tableau" />
                  <cv-radio-button name="'Cognos'" v-model="filterList.fdash" label="Cognos" value="Cognos" />
                  <cv-radio-button name="'Standalone'" v-model="filterList.fdash" label="Standalone" value="Standalone" />
                  <cv-radio-button name="'Other'" v-model="filterList.fdash" label="Other" value="Other" />
                </cv-radio-group>

                <div class="bx--type-productive-heading-02 padbot1 padtop2">
                  Release levels
                </div>
                <cv-radio-group :vertical="'vertical'">
                  <cv-radio-button name="'All levels'" v-model="filterList.flevel" label="All levels" checked="checked" value="" />
                  <cv-radio-button name="'Release'" v-model="filterList.flevel" label="Release" value="Release" />
                  <cv-radio-button name="'Experimental'" v-model="filterList.flevel" label="Experimental" value="Experimental" />
                  <div v-if="shortenv !== 'prod'">
                    <cv-radio-button name="'Prototype'" v-model="filterList.flevel" label="Prototype" value="Prototype" />
                  </div>
                </cv-radio-group>
              </div>
              <div class="-col-lg-13">
                <div class="bx--row">
                  <div v-for="(item, index) in filteredItems" v-if="item.inCatalog && item.environment.includes(shortenv)" :key="index" class="bx--no-gutter-sm -col-sm-6 -col-md-3 -col-lg-4">
                    <router-link title="View this dashboard" :to="getRoute(item)" class="resource-card-group">
                      <div class="bx--resource-card">
                        <div class="bx--tile">
                          <div class="bx--type-productive-heading-02">
                            {{ item.displayTitle }}
                          </div>
                          <div class="bx--tile-content bx--type-body-short-01 martop0">
                            {{ item.tags[0] }} &#8226; {{ item.tags[1] }} &#8226; {{ item.tags[2] }}
                          </div>
                          <div class="bx--tile-content bx--type-body-short-01 tile-description">
                            {{ item.description }}
                          </div>
                          <div class="bx--tile-content bx--type-body-short-01">
                            {{ item.tags[3] }} &#8226; {{ item.tags[4] }} &#8226; {{ item.tags[5] }}
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

        <div class="background background-blue">
          <div class="bx--grid">
            <div class="bx--row padding-top-2">
              <div class="-col-lg-3">
                <div class="bx--type-productive-heading-03 padtop1">
                  Management Service Area Collections
                </div>
                <p class="bx--type-body-long-01 second-line padtop1">
                  These links lead to pages containing a collection of Service Area reports.
                </p>
              </div>
              <div class="-col-lg-13">
                <div class="bx--row quickboxes">
                  <div v-for="(item, index) in items" v-if="item.section === 'salist'" :key="index" class="-col-sm-6 -col-md-3 -col-lg-4 padding-top-1 quickbox">
                    <router-link class="bx--link bx--type-body-long-01" title="View this dashboard" :to=" { name: 'DashFrame', params: { unique: item.uniqueID } }">
                      {{ item.displayTitle }}
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="background background-black">
          <div class="bx--grid">
            <div class="bx--row padding-top-2">
              <div class="-col-lg-3">
                <div class="bx--type-productive-heading-03 padtop1">
                  Professional Certification Tracking
                </div>
                <p class="bx--type-body-long-01 second-line padtop1">
                  For tracking professionals who’ve received a badge in an XXX
                  profession. These require a tableau license.
                </p>
              </div>
              <div class="-col-lg-13">
                <div class="bx--row quickboxes">
                  <div v-for="(item, index) in items" v-if="item.section === 'plist'" :key="index" class="-col-sm-6 -col-md-3 -col-lg-4 padding-top-1 quickbox">
                    <router-link class="bx--link bx--type-body-long-01" title="View this dashboard" :to=" { name: 'DashFrame', params: { unique: item.uniqueID } }">
                      {{ item.displayTitle }}
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="background background-blue">
          <div class="bx--grid">
            <div class="bx--row padding-top-2">
              <div class="-col-lg-3">
                <div class="bx--type-productive-heading-03 padtop1">
                  Intentional Training Programs
                </div>
                <p class="bx--type-body-long-01 second-line padtop1">
                  Detail-level tracking of identified, enrolled, and completed
                  upskill and reskill efforts. These require a tableau license.
                </p>
              </div>
              <div class="-col-lg-13">
                <div class="bx--row quickboxes">
                  <div v-for="(item, index) in items" v-if="item.section === 'ilist'" :key="index" class="-col-sm-6 -col-md-3 -col-lg-4 padding-top-1 quickbox">
                    <router-link class="bx--link bx--type-body-long-01" title="View this dashboard" :to="getRoute(item)">
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
    name: 'FutureHome',
    props: {
      uniqueID: {
        type: String,
        default: ''
      },
      origin: {
        type: String,
        default: ''
      },
      checked: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        isActive: true,
        items: [],
        site: '',
        drafts: [],
        cansee: false,
        newCatalog: [],
        lastReleaseDate: null,
        updated: null,
        tableaulicense: false,
        seeTableau: false,
        notLoggedIn: false,
        selections: [],
        filterList: {
          flevel: '',
          faudience: '',
          fgroup: '',
          fprog: '',
          fperms: '',
          fdash: ''
        },
        message: 'Thanks for logging in!'
      };
    },
    computed: {
      ... mapGetters([
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
      filteredItems() {
        let that = this;
        if (!that.filterList.flevel && !that.filterList.faudience && !that.filterList.fgroup && !that.filterList.fprog && !that.filterList.fperms && !that.filterList.fdash) {
          that.$cookie.set('flevel', '');
          that.$cookie.set('faudience', '');
          that.$cookie.set('fgroup', '');
          that.$cookie.set('fprog', '');
          that.$cookie.set('fperms', '');
          that.$cookie.set('fdash', '');
          return that.items
        } else {
          that.selections = [];
          console.log(that.filterList);
          if (that.filterList.flevel !== '') {
            console.log('flevel contents YES');
            that.selections.push(that.filterList.flevel);
            that.$cookie.set('flevel', that.filterList.flevel);
          } else {
            console.log('flevel contents NO');
            that.$cookie.set('flevel', '');
          }
          if (that.filterList.faudience !== '') {
            console.log('faudience contents YES');
            that.selections.push(that.filterList.faudience);
            that.$cookie.set('faudience', that.filterList.faudience);
          } else {
            console.log('faudience contents NO');
            that.$cookie.set('faudience', '');
          }
          if (that.filterList.fgroup !== '') {
            console.log('fgroup contents YES');
            that.$cookie.set('fgroup', that.filterList.fgroup);
            that.selections.push(that.filterList.fgroup);
          } else {
            console.log('fgroup contents NO');
            that.$cookie.set('fgroup', '');
          }
          if (that.filterList.fprog) {
            console.log('fprog contents YES');
            that.selections.push(that.filterList.fprog);
            that.$cookie.set('fprog', that.filterList.fprog);
          } else {
            console.log('fprog contents NO');
            that.$cookie.set('fprog', '');
          }
          if (that.filterList.fperms) {
            console.log('fperms contents YES');
            that.selections.push(that.filterList.fperms);
            that.$cookie.set('fperms', that.filterList.fperms);
          } else {
            console.log('fperms contents NO');
            that.$cookie.set('fperms', '');
          }
          if (that.filterList.fdash) {
            console.log('fdash contents YES');
            that.selections.push(that.filterList.fdash);
            that.$cookie.set('fdash', that.filterList.fdash);
          } else {
            console.log('fdash contents NO');
            that.$cookie.set('fdash', '');
          }
          return that.items.filter(item => {
            var isSuperset = that.selections.every(function (val) {
              return item.tags.indexOf(val) >= 0;
            });
            if (isSuperset) {
              return item;
            }
          });
        }
      }
    },
    created() {
      if (this.environment !== 'production') {
        if (this.environment === 'local') {
          this.site = 'http://localhost:3000';
        };
      };
      this.filterList.flevel = this.$cookie.get('flevel');
      this.filterList.faudience = this.$cookie.get('faudience');
      this.filterList.fgroup = this.$cookie.get('fgroup');
      this.filterList.fprog = this.$cookie.get('fprog');
      this.filterList.fperms = this.$cookie.get('fperms');
      this.filterList.fdash = this.$cookie.get('fdash');
      axios.get('https://site-prod-log.domain.net/api/cards/fetch').then((response) => {
        this.items = response.data.sort((a, b) => (a.displayTitle > b.displayTitle) ? 1 : -1);
      });
    },
    mounted() {
      if (this.environment === 'production') {
        this.logUser();
      };
    },
    methods: {
      getRoute(item) {
        if (item.isTableau === false) {
          return item.linkurl;
        } else {
          return { name: 'DashFrame', params: { unique: item.uniqueID, origin: '' } };
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
            page: 'home',
            day: today
          }).then((response) => {
            console.log(response);
          });
        } else {
          axios.post(this.tracking, {
            cnum: this.userId,
            currentUrl: this.$route.path,
            page: 'home',
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
  }
  .bx--type-heading-02.doubleht {
    height: 3rem;
  }
  .fixed {
    position: fixed;
    z-index: 9;
  }
  .page-content {
    padding-top: 0rem;
    padding-bottom: 0rem;
  }

  .page-header {
    background-image: url(../assets/img/header.jpg);
    border-bottom: 1px solid #3d3d3d;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    color: #fff;
    height: 15rem;
    display: block;
  }

  p.shortpar {
    width: 50rem;
  }

  .right-align {
    text-align: right;
  }

  .padding-top-tiny {
    padding-top: 10px!important;
  }

  .bx--link {
    font-size: .95rem;
    &.bx--type-productive-heading-02 {
      font-weight: 400;
      font-size: 1.25rem;
      line-height: 22px;
      letter-spacing: 0px;
    }
  }

  .background.background-black.newest {
    padding-bottom: 0!important;
  }

  .bx--resource-card .bx--tile {
    outline: 2px solid #323232;
    background: #282828;
    & .bx--type-productive-heading-02 {
      color: #78a9ff;
    }
  }

  .bx--tile {
    min-height: 14rem;
  }

  .tile-description {
    display: block;
    min-height: 3.5rem;
  }

  .bx--resource-card .bx--tile:hover {
    background: #0545b8;
    color: #FFF;
      & .bx--type-body-short-01,
      & .bx--type-heading-02,
      & .bx--type-productive-heading-02 {
        color: #FFF;
      }
  }

  .homeicon {
    position: relative;
    top: 6px;
  }

  a.resource-card-group .bx--type-code-01,
  a.resource-card-group:hover .bx--type-code-01 {
    color: #171717;
  }

  /deep/ .bx--radio-button-group {
    align-items: baseline;
  }

  .second-line {
    color: #f3f3f3;
  }
  .bx--row.quickboxes {
    & .quickbox {
      padding: 0 0 1rem 1rem;
    }
    & .quickbox:hover {
      background: #0545b8;
      color: #FFF;
      & a:hover {
        color: #FFF;
      }
    }
  }
  .background.bannerstripe {
    padding-bottom: 20px !important;
    & .bx--type-body-short-01 {
      margin-top: 0;
    }
    & a:hover {
      text-decoration: underline;
    }
  }
</style>
