<template>
  <div id="TeamViewPeers" class="page-body">
    <div class="container">
      <PageheadTabs :title="'Team View'" :tabs="tabs" />
      <main id="maincontent" class="page-content">
        <div v-if="message" class="nologin bx--type-body-short-01">
          {{ message }}
        </div>
        <div v-else>
          <div class="bx--grid">
            {{ mgrID }} // {{ mgrName }} // {{ groupOrg }}
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
                      title of this card
                    </div>
                    <RingChart ref="teamddata" :datasets="teamddata.rows" :columns="teamddata.columns" :height="chartHeight" />
                  </div>
                </div>
              </div>
              <div class="bx--no-gutter-sm -col-lg-4">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile minht26">
                    <div class="bx--type-productive-heading-01 card-title padbot1">
                      JR/Ss
                    </div>
                    <RingChart ref="teamddata" :datasets="ejrsstotals" :columns="piecolumns" :height="chartHeight" />
                  </div>
                </div>
              </div>
              <div class="bx--no-gutter-sm -col-lg-4">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile minht26">
                    <div class="bx--type-productive-heading-01 card-title padbot1">
                      Professions
                    </div>
                    <RingChart ref="teamddata" :datasets="eprofessiontotals" :columns="piecolumns" :height="chartHeight" />
                  </div>
                </div>
              </div>
            </div>
            <div class="bx--row resource-card-group">
              <div class="bx--no-gutter-sm -col-lg-8">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile">
                    <div class="bx--type-productive-heading-01 card-title padbot1">
                      title of this card
                    </div>
                    <BarVertical ref="teamddata" :datasets="teamddata.rows" :columns="teamddata.columns" :height="chartHeight" />
                  </div>
                </div>
              </div>
              <div class="bx--no-gutter-sm -col-lg-8">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile">
                    <div class="bx--type-productive-heading-01 card-title padbot1">
                      title of this card
                    </div>
                    <BarVertical ref="teamddata" :datasets="teamddata.rows" :columns="teamddata.columns" :height="chartHeight" />
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
  import { mapGetters } from 'vuex'
  import axios from 'axios';

  export default {
    name: 'TeamViewPeers',
    props: {
      unique: {
        type: String,
        default: ''
      }
    },
    data: () => ({
      tabs: [
        {
          name: 'My Reports',
          link: '/teamview/reports',
          isActive: false
        },
        {
          name: 'My Peers',
          link: '/teamview/peers',
          isActive: true
        },
        // {
        //   name: 'Classes',
        //   link: 'TeamViewClass',
        //   isActive: false
        // },
        {
          name: 'Badges',
          link: '/teamview/badges',
          isActive: false
        // },
        // {
        //   name: 'Externals',
        //   link: 'TeamViewCert',
        //   isActive: false
        }
      ],
      items: [],
      message: '',
      filterList: {},
      title: '',
      filters: null,
      ejrss: [],
      eprofession: [],
      chartHeight: '320px',
      headcount: null,
      piecolumns: ["datestamp", "data"],
      ejrsstotals: [],
      eprofessiontotals: [],
      teamddata: {
        columns: [ "datestamp", "data"],
        rows: [
          {
            date: "JRS1",
            data: 2
          },
          {
            date: "JRS2",
            data: 1
          },
          {
            date: "JRS3",
            data: 5
          },
          {
            date: "JRS4",
            data: 3
          },
          {
            date: "JRS5",
            data: 9
          },
          {
            date: "JRS6",
            data: 2
          }
        ]
      }
    }),
    computed: mapGetters([
      'userId',
      'environment',
      'shortenv',
      'groupOrg',
      'mgrStatus',
      'mgrID',
      'mgrName'
    ]),
    created() {
      if (!this.mgrStatus) {
        this.tabs = [
          {
            name: 'My Peers',
            link: '/teamview/peers',
            isActive: true
          },
          {
            name: 'Badges',
            link: '/teamview/badges',
            isActive: false
          }
        ]
      };
    },
    mounted() {
      if (this.userId || this.environment === 'local') {
        this.getData();
        // this.filterList = {
        //   region: true,
        //   ciclocation: true,
        //   istss: false,
        //   market: false,
        //   country: true,
        //   businessmodel: false,
        //   jrs: false,
        //   service: true,
        //   servicearea: true,
        //   serviceline: false
        // };
      } else {
        this.message = 'You must log in to view this page.';
      };
    },
    methods: {
      getData() {
        console.log('is Mgr ==', this.mgrStatus, ' & user = ', this.userId, ' & mgr = ', this.mgrID, ' & org=', this.groupOrg);
        axios.get('/employee-profile/teamInfoResolved/' + this.userId).then((response) => {
          this.items = response.data.doc.content.functional.peers;
          this.headcount = this.items.length;
          var manager = response.data.doc.content.functional.leadership[0].uid;
          axios.get('https://site-' + this.shortenv + '-api.domain.net/api/teamview/badges/ZZZ/' + manager).then((response) => {
           this.badges = response.data.data.badgerows;
          });
          axios.get('https://site-' + this.shortenv + '-api.domain.net/api/teamview/employees/ZZZ/' + manager).then((response) => {
            var employees = response.data.data;
            for (var i = 0; i < employees.length; i++) {
              this.ejrss.push(employees[i].JRSS);
              this.eprofession.push(employees[i].PROFESSION);
            };
            this.ejrsstotals = this.pushToArray(this.ejrss);
            this.eprofessiontotals = this.pushToArray(this.eprofession);
          });
        });
      },
      // filterChange(val) {
      //   this.filters = {
      //     region: [],
      //     ciclocation: [],
      //     istss: [],
      //     market: [],
      //     country: [],
      //     businessmodel: [],
      //     jrs: [],
      //     service: [],
      //     servicearea: [],
      //     serviceline: []
      //   };
      //   for (var i = 0; i < val.length; i++) {
      //     if (val[i].query === 'region') {
      //       this.filters.region = val[i].selected;
      //     }
      //     if (val[i].query === 'ciclocation') {
      //       this.filters.ciclocation = val[i].selected;
      //     }
      //     if (val[i].query === 'istss') {
      //       this.filters.istss = val[i].selected;
      //     }
      //     if (val[i].query === 'market') {
      //       this.filters.market = val[i].selected;
      //     }
      //     if (val[i].query === 'country') {
      //       this.filters.country = val[i].selected;
      //     }
      //     if (val[i].query === 'businessmodel') {
      //       this.filters.businessmodel = val[i].selected;
      //     }
      //     if (val[i].query === 'jrs') {
      //       this.filters.jrs = val[i].selected;
      //     }
      //     if (val[i].query === 'service') {
      //       this.filters.service = val[i].selected;
      //     }
      //     if (val[i].query === 'servicearea') {
      //       this.filters.servicearea = val[i].selected;
      //     }
      //     if (val[i].query === 'serviceline') {
      //       this.filters.serviceline = val[i].selected;
      //     }
      //   };
      //   this.getData();
      // },
      pushToArray(arr) {
        var counts = {};
        var result = [];
        for (var i = 0; i < arr.length; i++) {
          counts[arr[i]] = 1 + (counts[arr[i]] || 0);
        }
        for (var j = 0; j < Object.entries(counts).length; j++) {
          var obj = {
            date: Object.entries(counts)[j][0],
            data: Object.entries(counts)[j][1]
          };
          result.push(obj);
        }
        return result;
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
