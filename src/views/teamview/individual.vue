<template>
  <div id="TeamViewIndividual" class="page-body">
    <div class="container">
      <Usernotice />
      <PageheadTabs :title="'Team View'" :tabs="tabs" :origin="'ISA'" />
      <main id="maincontent" class="page-content">
        <div v-if="message" class="nologin bx--type-body-short-01">
          {{ message }}
        </div>
        <div v-else>
          <!-- *** ADD OPTION IN DEV TO SELECT MANAGER UID -->
          <div class="bx--grid">
            <div class="bx--row resource-card-group">
              <div class="bx--no-gutter-sm -col-lg-4">
                <BanCard
                    :title="'Headcount'"
                    :value="headcount"
                    :question="''"
                    :height="13"
                />
                <BanCard
                    :title="'Team Manager'"
                    :words="mgrName"
                    :question="''"
                    :height="13"
                />
              </div>
              <div class="bx--no-gutter-sm -col-lg-4">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile minht26">
                    <div class="bx--type-productive-heading-01 card-title padbot1">
                      Professions
                    </div>
                    <RingChart ref="eprofession" :datasets="eprofession" :columns="columns" :height="chartHeight" />
                  </div>
                </div>
              </div>
              <div class="bx--no-gutter-sm -col-lg-4">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile minht26">
                    <div class="bx--type-productive-heading-01 card-title padbot1">
                      JR/Ss
                    </div>
                    <RingChart ref="ejrss" :datasets="ejrss" :columns="columns" :height="chartHeight" />
                  </div>
                </div>
              </div>
              <div class="bx--no-gutter-sm -col-lg-4">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile minht26">
                    <div class="bx--type-productive-heading-01 card-title padbot1">
                      TBD
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bx--row resource-card-group">
              <div class="bx--no-gutter-sm -col-lg-6">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile">
                    <div class="bx--type-productive-heading-01 card-title padbot1">
                      Team Badge Average, past 5 years
                    </div>
                    <BarVertical ref="badgeyears" :datasets="badgeyears" :columns="columns" :height="'300px'" />
                  </div>
                </div>
              </div>
              <div class="bx--no-gutter-sm -col-lg-6">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile">
                    <div class="bx--type-productive-heading-01 card-title padbot1">
                      Team Badge Average, 2020
                    </div>
                    <LineChart ref="badgeRecent" :datasets="badgeRecent" :height="'300px'" />
                  </div>
                </div>
              </div>
              <div class="bx--no-gutter-sm -col-lg-4">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile">
                    <div class="bx--type-productive-heading-01 card-title padbot1">
                      Most Common Team Badges (that you don't have)
                    </div>
                    [ list ]
                  </div>
                </div>
              </div>
            </div>
            <div class="bx--row resource-card-group">
              <div class="bx--no-gutter-sm -col-lg-6">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile">
                    <div class="bx--type-productive-heading-01 card-title padbot1">
                      Team Learning Average, past 5 years
                    </div>
                    <BarVertical ref="learnyears" :datasets="learnyears" :columns="columns" :height="'300px'" />
                  </div>
                </div>
              </div>
              <div class="bx--no-gutter-sm -col-lg-6">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile">
                    <div class="bx--type-productive-heading-01 card-title padbot1">
                      Team Learning Average, 2020
                    </div>
                    <!-- *** ADD FAKE DATA FOR TEAM CLASS TIMES -->
                    <LineChart ref="learnRecent" :datasets="learnRecent" :height="'300px'" />
                  </div>
                </div>
              </div>
              <div class="bx--no-gutter-sm -col-lg-4">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile">
                    <div class="bx--type-productive-heading-01 card-title padbot1">
                      Most Common Team Classes (that you haven't taken)
                    </div>
                    [ list ]
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
  import { CvSlider } from '@carbon/vue/src';
  import { mapGetters } from 'vuex';
  import axios from 'axios';

  export default {
    name: 'TeamViewIndividual',
    data: () => ({
      tabs: [
        {
          name: 'Summary',
          link: '/teamview/summary',
          isActive: true
        },
        {
          name: 'Badges',
          link: '/teamview/badges',
          isActive: false
        },
        {
          name: 'Certifications',
          link: '/teamview/certs',
          isActive: false
        }
      ],
      items: [],
      message: '',
      badgehist: [],
      ejrss: [],
      eprofession: [],
      learnyears: [],
      learnRecent: {},
      badgeyears: [],
      badgeRecent: {},
      chartHeight: '338px',
      headcount: null,
      columns: ["datestamp", "data"],
      badgeRecentSettings: {},
      learnRecentSettings: {}
    }),
    computed: {
      ...mapGetters([
        'displayName',
        'userId',
        'groupTeam',
        'shortenv',
        'environment',
        'groupOrg',
        'mgrStatus',
        'mgrID',
        'mgrName'
      ])
    },
    created() {
      console.log('userId =', this.userId, '/ self =', this.displayName, '/ shortenv =', this.shortenv, '/ groupOrg =', this.groupOrg, '/ groupTeam =', this.groupTeam, '/ environment =', this.environment, '/ status =', this.mgrStatus, '/ mgruid =', this.mgrID, '/ manager =', this.mgrName);
    },
    mounted() {
      if (this.userId || this.environment === 'local') {
        this.getData();
      } else {
        this.message = 'You must log in to view this page.';
      };
    },
    methods: {
      getData() {
        axios.get('https://w3-services1.w3-969.ibm.com/myw3/unified-profile/v1/docs/instances/teamInfoResolved/' + this.userId).then((response) => {
          this.minQuantity = '1';
          this.items = response.data.doc.content.functional.peers;
          this.headcount = this.items.length + 1;
          axios.get('https://site-' + this.shortenv + '-api.domain.net/api/teamview/summary/individual/ZZZ/' + this.mgrID + '/' + this.userId).then((response) => {
            this.ejrss = this.countAll(response.data.data.ejrss);
            this.eprofession = this.countAll(response.data.data.eprofession);
          });
          axios.get('https://site-' + this.shortenv + '-api.domain.net/api/teamview/badges/individual/ZZZ/' + this.mgrID + '/' + this.userId).then((response) => {
            this.badgeyears = response.data.data.badgeyears.sort((a, b) => (a.date > b.date) ? 1 : -1);
            this.badgeRecent = {
              columns: [
                "datestamp",
                "data"
              ],
              rows: []
            };
            this.badgeRecentSettings = {
              stack: {
                'stack': []
              }
            };
          });
          axios.get('https://site-' + this.shortenv + '-api.domain.net/api/teamview/learning/individual/ZZZ/' + this.mgrID + '/' + this.userId).then((response) => {
            this.learnyears = response.data.data.classPast.sort((a, b) => (a.date > b.date) ? 1 : -1);
            this.learnRecent = {
              columns: [],
              rows: []
            };
            console.log(this.learnRecent);
            this.learnRecentSettings = {
              metrics: [],
              stack: { 'stack': [] }
            };
          });

          // axios.get('https://site-' + this.shortenv + '-api.domain.net/api/teamview/certs/ZZZ/' + this.userId).then((response) => {
          //   console.log(this.certempl);
          //   this.certpercent = (response.data.data.certempl.length / this.headcount) * 100;
          // });
        });
      }
    }
  }
</script>

<style lang="scss" scoped>

  /deep/ .bx--text-input__field-wrapper {
    width: 25%;
    margin: 0 0 1rem 0;
  }
  /deep/ .bx--slider__track {
    background: #6d6b6b;
  }
  /deep/ .bx--slider__track:before {
    background: transparent;
  }
  /deep/ .bx--slider__filled-track {
    background: #FFF;
  }
  /deep/ .bx--slider__thumb,
  /deep/ .bx--slider__thumb.bx--slider__thumb--clicked {
    background: #FFF;
  }
  /deep/ .bx--slider__range-label {
    color: #EEE;
  }
</style>
