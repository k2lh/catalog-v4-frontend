<template>
  <div id="TeamViewReports" class="page-body">
    <div class="container">
      <Usernotice />
      <PageheadTabs :title="'Team View'" :tabs="tabs" :origin="'ISA'" />
      <main id="maincontent" class="page-content">
        <div v-if="message" class="nologin bx--type-body-short-01">
          {{ message }}
        </div>
        <div v-else>
          <div v-if="shortenv === 'dev'" class="bx--grid">
            <div class="bx--row">
              <div class="-col-lg-16">
                <cv-text-input v-model="mgruid" placeholder="manager CNUM" />
                <cv-button :kind="'tertiary'" :label="'Click for demo'" @click="newManager">
                  Submit
                </cv-button>
              </div>
            </div>
          </div>
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
                    :words="displayName"
                    :question="''"
                    :height="13"
                />
              </div>
              <div class="bx--no-gutter-sm -col-lg-4">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile minht26">
                    <div class="bx--type-productive-heading-01 card-title">
                      Headcount per Profession
                    </div>
                    <RingChart ref="eprofession" :datasets="eprofession" :columns="columns" :height="chartHeight" />
                  </div>
                </div>
              </div>
              <div class="bx--no-gutter-sm -col-lg-4">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile minht26">
                    <div class="bx--type-productive-heading-01 card-title">
                      Headcount per JR/S
                    </div>
                    <RingChart ref="ejrss" :datasets="ejrss" :columns="columns" :height="chartHeight" />
                  </div>
                </div>
              </div>
              <div class="bx--no-gutter-sm -col-lg-4">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile minht26">
                    <div class="bx--type-productive-heading-01 card-title padbot2">
                      Headcount per Band
                    </div>
                    <BarVertical ref="teamddata" :datasets="eband" :columns="columns" :height="'300px'" />
                  </div>
                </div>
              </div>
            </div>
            <div class="bx--row resource-card-group">
              <div class="bx--no-gutter-sm -col-lg-4">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile minht24">
                    <div class="bx--type-productive-heading-01 card-title padbot1">
                      Team Badges, past 3 years
                    </div>
                    <div v-if="badgedata">
                      {{ badgedata }}
                    </div>
                    <div v-else>
                      <BarVertical ref="badgePast" :datasets="badgePast" :columns="columns" :height="'300px'" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="bx--no-gutter-sm -col-lg-8">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile minht24">
                    <div class="bx--type-productive-heading-01 card-title padbot1">
                      Team Badges in 2020, by month
                    </div>
                    <div v-if="badgedata">
                      {{ badgedata }}
                    </div>
                    <div v-else>
                      <BarVertical ref="badgeRecent" :datasets="badgeRecent" :columns="columns" :height="'300px'" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="bx--no-gutter-sm -col-lg-4">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile minht24">
                    <div class="bx--type-productive-heading-01 card-title padbot1">
                      Who's Who, by badge
                    </div>
                    [ coming soon ]
                  </div>
                </div>
              </div>
            </div>
            <div class="bx--row resource-card-group">
              <div class="bx--no-gutter-sm -col-lg-4">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile minht24">
                    <div class="bx--type-productive-heading-01 card-title padbot1">
                      Team Learning Activities, past 3 years
                    </div>
                    <div v-if="classdata">
                      {{ classdata }}
                    </div>
                    <div v-else>
                      <BarVertical ref="classPast" :datasets="classPast" :columns="columns" :height="'300px'" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="bx--no-gutter-sm -col-lg-8">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile minht24">
                    <div class="bx--type-productive-heading-01 card-title padbot1">
                      Team Learning Activities in 2020, by month
                    </div>
                    <div v-if="classdata">
                      {{ classdata }}
                    </div>
                    <div v-else>
                      <BarVertical ref="classRecent" :datasets="classRecent" :columns="columns" :height="'300px'" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="bx--no-gutter-sm -col-lg-4">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile minht24">
                    <div class="bx--type-productive-heading-01 card-title padbot1">
                      Who's Who, by class
                    </div>
                    [ coming soon ]
                  </div>
                </div>
              </div>
            </div>
            <div class="bx--row resource-card-group">
              <div class="bx--no-gutter-sm -col-lg-6">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile minht24">
                    <div class="bx--type-productive-heading-01 card-title padbot1">
                      Team Certifications, by title
                    </div>
                    <BarHorizontal ref="certNames" :datasets="certNames" :columns="columns" :height="'500px'" />
                  </div>
                </div>
              </div>
              <div class="bx--no-gutter-sm -col-lg-6">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile minht24">
                    <div class="bx--type-productive-heading-01 card-title padbot1">
                      Team Certifications, by vendor
                    </div>
                    <BarHorizontal ref="certVendors" :datasets="certVendors" :columns="columns" :height="'500px'" />
                  </div>
                </div>
              </div>
              <div class="bx--no-gutter-sm -col-lg-4">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile minht24">
                    <div class="bx--type-productive-heading-01 card-title padbot1">
                      Who's Who, by cert
                    </div>
                    [ coming soon ]
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
    name: 'TeamViewReports',
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
          name: 'Learning',
          link: '/teamview/learning',
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
      manager: null,
      mgruid: null,
      reports: [],
      eband: [],
      ejrss: [],
      eprofession: [],
      classPast: [],
      classRecent: {},
      classdata: null,
      badgePast: [],
      badgeRecent: {},
      badgedata: null,
      certVendors: [],
      certNames: [],
      chartHeight: '306px',
      headcount: null,
      columns: ["datestamp", "data"]
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
    mounted() {
      if (this.environment === 'dev' || this.environment === 'local') {
        this.getData();
        this.manager = this.mgruid;
      } else if (this.userId) {
        if (this.mgrStatus) {
          this.manager = this.userId;
          this.getData();
        } else {
          this.message = 'Sorry, you must have direct reports in BluePages to view this page.';
        }
      } else {
        this.message = 'You must log in to view this page.';
      };
    },
    methods: {
      getData() {
        axios.get('https://w3-services1.w3-969.ibm.com/myw3/unified-profile/v1/docs/instances/teamInfoResolved/' + this.manager).then((response) => {
          this.minQuantity = '1';
          this.items = response.data.doc.content.functional.reports;
          this.headcount = this.items.length;
          axios.get('https://site-' + this.shortenv + '-api.domain.net/api/teamview/summary/ZZZ/' + this.manager).then((response) => {
            this.eband = this.countAll(response.data.data.eband);
            this.eregion = this.countAll(response.data.data.eregion);
            this.eserline = this.countAll(response.data.data.eserline);
            this.ejrss = this.countAll(response.data.data.ejrss);
            this.eprofession = this.countAll(response.data.data.eprofession);
          });
          axios.get('https://site-' + this.shortenv + '-api.domain.net/api/teamview/badges/ZZZ/' + this.manager).then((response) => {
            this.badgePast = response.data.data.badgePast.sort((a, b) => (a.datestamp > b.datestamp) ? 1 : -1);
            this.badgeRecent = response.data.data.badgeRecent.rows;
            if (this.badgePast[0] === null) {
              this.badgedata = 'Sorry, there are no logged badges in this time range.';
            }
          });
          axios.get('https://site-' + this.shortenv + '-api.domain.net/api/teamview/certs/ZZZ/' + this.manager).then((response) => {
            this.certVendors = this.countAll(response.data.data.certVendors);
            this.certNames = this.countAll(response.data.data.certNames);
          });
          axios.get('https://site-' + this.shortenv + '-api.domain.net/api/teamview/learning/ZZZ/' + this.manager).then((response) => {
            this.classPast = response.data.data.classPast.sort((a, b) => (a.datestamp > b.datestamp) ? 1 : -1);
            this.classRecent = response.data.data.classRecent.rows;
            if (this.classPast[0] === null) {
              this.classdata = 'Sorry, there are no logged classes in this time range.';
            }
          });
        });
      },
      countAll(arr) {
        var counts = {};
        var result = [];
        arr.sort();
        for (var i = 0; i < arr.length; i++) {
          counts[arr[i]] = 1 + (counts[arr[i]] || 0);
        }
        for (var j = 0; j < Object.entries(counts).length; j++) {
          var dateTmp = Object.entries(counts)[j][0];
          if (dateTmp.length > 56) {
            dateTmp = dateTmp.slice(0, 55) + '...';
          }
          var obj = {
            datestamp: dateTmp,
            data: Object.entries(counts)[j][1]
          };
          result.push(obj);
        }
        result.push(result.shift());
        return result;
      },
      newManager() {
        console.log(this.mgruid);
        this.manager = this.mgruid;
        this.getData();
      }
    }
  }
</script>

<style lang="scss" scoped>

  /deep/ .bx--text-input__field-wrapper {
    margin: 0 0 1rem 0;
  }

  /deep/ .cv-text-input.bx--form-item {
    display: inline-block;
    & .bx--text-input__field-wrapper {
      width: 100%;
    }
  }

  /deep/ .bx--btn--tertiary {
    background-color: transparent;
    border: 1px solid #FFF;
    color: #FFF;
    min-height: 2.5rem;
    padding: calc(.675rem - 3px) 60px calc(.675rem - 3px) 12px;
  }
</style>
