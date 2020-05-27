<template>
  <div id="TeamViewCerts" class="page-body g90">
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
              <div class="-col-lg-6">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile">
                    <div class="bx--type-productive-heading-01 card-title padbot1">
                      Certifications, by frequency (across entire team)
                    </div>
                    <cv-slider v-model="minQuantity" :label="'Minimum threshold'" :min="'1'" :max="maxQuantity" :value="minQuantity" :step="'1'" :step-multiplier="'1'" :min-label="'1'" :max-label="maxQuantity" @change="changeQuantity" />
                    <BarHorizontal ref="namesTotal" :datasets="namesTotal" :columns="columns" :height="'1218px'" class="padtop1" />
                  </div>
                </div>
              </div>
              <div class="-col-lg-10">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile">
                    <div class="bx--grid">
                      <div class="bx--row resource-card-group">
                        <div class="-col-lg-8">
                          <cv-form class="searchthis">
                            <cv-text-input v-model="search" placeholder="Enter text to filter table" />
                          </cv-form>
                        </div>
                        <div class="-col-lg-8">
                          <cv-slider v-model="certConf" :label="'Minimum confidence'" :min="'10'" :max="'100'" :value="'0'" :step="'1'" :step-multiplier="'1'" :min-label="'10'" :max-label="'100'" @change="filteredItems" />
                        </div>
                      </div>
                    </div>
                    <v-table :data="filteredItems" class="bx--data-table martop2">
                      <thead slot="head" class="bx--data-table thead">
                        <tr class="bx--data-table">
                          <v-th v-if="mgrStatus" sortKey="cnum" class="table-column employee">
                            Name
                          </v-th>
                          <v-th sortKey="certName" class="table-column certName">
                            Certification
                          </v-th>
                          <v-th sortKey="profCertGroup" class="table-column narrow">
                            Vendor
                          </v-th>
                          <v-th sortKey="source" class="table-column narrow">
                            Source
                          </v-th>
                          <v-th sortKey="completion" class="table-column narrow">
                            Date
                          </v-th>
                          <v-th sortKey="evidence" class="table-column narrow">
                            Evidence
                          </v-th>
                          <v-th sortKey="confidence" class="table-column narrow">
                            Confidence
                          </v-th>
                        </tr>
                      </thead>
                      <tbody slot="body" slot-scope="{displayData}">
                        <tr v-for="(row, index) in displayData" :key="index">
                          <td v-if="mgrStatus" class="table-column employee">
                            {{ row.employee }}
                          </td>
                          <td class="table-column certName">
                            {{ row.certName }}
                          </td>
                          <td class="table-column vendor">
                            {{ row.vendor }}
                          </td>
                          <td class="table-column source">
                            {{ row.source }}
                          </td>
                          <td class="table-column completion">
                            {{ row.completion }}
                          </td>
                          <td class="table-column evidence">
                            {{ row.evidence }}
                          </td>
                          <td class="table-column confidence">
                            {{ row.confidence }}%
                          </td>
                        </tr>
                      </tbody>
                    </v-table>
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
  import {
    CvForm,
    CvTextInput,
    CvSlider
  } from '@carbon/vue/src';
  import { mapGetters } from 'vuex'
  import axios from 'axios';

  export default {
    name: 'TeamViewCerts',
    components: {
      CvForm,
      CvTextInput,
      CvSlider
    },
    data: () => ({
      tabs: [
        {
          name: 'Summary',
          link: '/teamview/summary',
          isActive: false
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
          isActive: true
        }
      ],
      items: [],
      search: '',
      message: '',
      mgruid: null,
      manager: null,
      minQuantity: '1',
      maxQuantity: '50',
      certTable: [],
      namesAll: [],
      namesTotal: [],
      certConf: '0',
      columns: ["datestamp", "data"]
    }),
    computed: {
      ...mapGetters([
        'userId',
        'groupTeam',
        'environment',
        'shortenv',
        'mgrStatus',
        'mgrID',
        'mgrName'
      ]),
      filteredItems() {
        return this.certTable.filter(item => {
          if (this.search && (this.certConf === '0')) {
            if (item.employee.toLowerCase().includes(this.search.toLowerCase()) || item.certName.toLowerCase().includes(this.search.toLowerCase())) {
              return item;
            }
          } else if (!this.search && (this.certConf !== '0')) {
            if (item.confidence >= this.certConf) {
              return item;
            }
          } else {
            if ((item.employee.toLowerCase().includes(this.search.toLowerCase()) || item.certName.toLowerCase().includes(this.search.toLowerCase())) && (item.confidence >= this.certConf)) {
              return item;
            }
          }
        })
      }
    },
    created() {
      console.log('userId =', this.userId, '/ shortenv =', this.shortenv, '/ groupTeam =', this.groupTeam, '/ environment =', this.environment, '/ status =', this.mgrStatus, '/ mgruid =', this.mgrID, '/ manager =', this.mgrName);
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
          this.maxQuantity = response.data.doc.content.functional.reports.length.toString();
          axios.get('https://site-' + this.shortenv + '-api.domain.net/api/teamview/certs/ZZZ/' + this.manager).then((response) => {
            this.certConf = '75';
            this.certTable = response.data.data.tablerows;
            this.namesAll = response.data.data.certNames;
            this.namesTotal = this.countMost(this.namesAll, this.minQuantity);
            if (this.shortenv === 'dev') {
              this.replaceNames();
            };
          });
        });
      },
      countMost(arr, val) {
        var counts = {};
        var result = [];
        for (var i = 0; i < arr.length; i++) {
          counts[arr[i]] = 1 + (counts[arr[i]] || 0);
        }
        for (var j = 0; j < Object.entries(counts).length; j++) {
          if (Object.entries(counts)[j][1] >= val) {
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
        }
        return result;
      },
      changeQuantity() {
        this.namesTotal = this.countMost(this.namesAll, this.minQuantity);
      },
      replaceNames() {
        var realnames = [...new Set(this.certTable.map(cert => cert.employee))];
        for (var i = 0; i < this.certTable.length; i++) {
          var a = realnames.indexOf(this.certTable[i].employee);
          this.certTable[i].employee = 'Employee #' + (a+1);
        }
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
  table.bx--data-table.scrollable {
    width: 100%;
    border-collapse: collapse;
    border: 0;
  }
  .scrollable thead.bx--data-table.thead {
    display: table;
    width: calc(100% - 17px);
  }
  .scrollable tbody.scrollbody {
    display: block;
    max-height: 1200px;
    overflow-y: scroll;
  }
  .scrollable .bx--data-table th {
    vertical-align: middle;
    word-break: break-word;
    white-space: unset;
    border: 0;
  }
  .scrollable .bx--data-table td {
    vertical-align: middle;
    word-break: break-word;
    white-space: unset;
  }
  .scrollable tbody.scrollbody tr {
    display: table;
    width: 100%;
    box-sizing: border-box;
  }
  .scrollable tbody.scrollbody td {
    border-collapse: collapse;
  }

  .table-column {
    width: 12%;
    &.badgeName {
      width: 25%;
    }
  }

  /deep/ .bx--text-input__field-wrapper {
    width: 100%;
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
