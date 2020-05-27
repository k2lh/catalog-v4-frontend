<template>
  <div id="ExecutiveSA" class="page-body">
    <div class="container">
      <PageheadNoTabs :title="'Executive Summary'" :origin="'ISA'" />
      <main id="maincontent" class="page-content dark-theme">
        <div v-if="message" class="nologin bx--type-body-short-01">
          {{ message }}
        </div>
        <div v-else class="">
          <horizontal-filter :filter-list="filterList" @updatef="filterChange" />
          <div class="bx--grid">
            <div class="bx--row resource-card-group">
              <div class="bx--no-gutter-sm -col-lg-8">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile minht23">
                    <div class="bx--type-expressive-heading-02 marbot2">
                      Key metrics
                    </div>
                    <BulletNew :title="'Trained'" :outervalue="metrics.HEADCOUNT" :innervalue="metrics.TOTAL_COMPLETED" />
                    <BulletNew :title="'Upskill, completed'" :outervalue="metrics.HEADCOUNT" :innervalue="metrics.UPSKILL_COMPLETED" />
                    <BulletNew :title="'Reskill, completed'" :outervalue="metrics.HEADCOUNT" :innervalue="metrics.RESKILL_COMPLETED" />
                  </div>
                </div>
              </div>
              <div class="bx--no-gutter-sm -col-lg-8">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile minht23">
                    <h2 class="bx--type-expressive-heading-02 marbot1">
                      Intentional Programs
                    </h2>
                    <cv-structured-list :condensed="true">
                      <template slot="headings">
                        <cv-structured-list-heading class="first">
                          Program
                        </cv-structured-list-heading>
                        <cv-structured-list-heading>
                          Reskill, in progress
                        </cv-structured-list-heading>
                        <cv-structured-list-heading>
                          Upskill, in progress
                        </cv-structured-list-heading>
                        <cv-structured-list-heading>
                          Reskill, completed
                        </cv-structured-list-heading>
                        <cv-structured-list-heading>
                          Upskill, completed
                        </cv-structured-list-heading>
                      </template>
                      <template slot="items">
                        <cv-structured-list-item v-for="(inprog, index) in inprograms" :key="index">
                          <cv-structured-list-data class="bordered">
                            {{ inprog.name }}
                          </cv-structured-list-data>
                          <cv-structured-list-data class="alignright">
                            {{ inprog.reip | numFormat }}
                          </cv-structured-list-data>
                          <cv-structured-list-data class="alignright bordered">
                            {{ inprog.upip | numFormat }}
                          </cv-structured-list-data>
                          <cv-structured-list-data class="alignright">
                            {{ inprog.recom | numFormat }}
                          </cv-structured-list-data>
                          <cv-structured-list-data class="alignright">
                            {{ inprog.upcom | numFormat }}
                          </cv-structured-list-data>
                        </cv-structured-list-item>
                        <cv-structured-list-item class="grandtotal">
                          <cv-structured-list-data class="bordered">
                            {{ intotals.name }}
                          </cv-structured-list-data>
                          <cv-structured-list-data class="alignright">
                            {{ intotals.reip | numFormat }}
                          </cv-structured-list-data>
                          <cv-structured-list-data class="alignright bordered">
                            {{ intotals.upip | numFormat }}
                          </cv-structured-list-data>
                          <cv-structured-list-data class="alignright">
                            {{ intotals.recom | numFormat }}
                          </cv-structured-list-data>
                          <cv-structured-list-data class="alignright">
                            {{ intotals.upcom | numFormat }}
                          </cv-structured-list-data>
                        </cv-structured-list-item>
                      </template>
                    </cv-structured-list>
                  </div>
                </div>
              </div>
            </div>
            <div class="bx--row resource-card-group">
              <!-- <div class="bx--no-gutter-sm -col-lg-8 -col-md-4">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile">
                    <h2 class="bx--type-expressive-heading-02 marbot2">
                      Total Profession Badges Earned By Quarter
                    </h2>
                    <BarVertical :datasets="earnedBadgedata" :columns="earnedBadgeColumns" style="margin-top:2rem" />
                  </div>
                </div>
              </div>
              <div class="bx--no-gutter-sm -col-md-4 -col-sm-2">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile">
                    <h2 class="bx--type-expressive-heading-02 marbot2">
                      Total Vendor Certificates By Quarter
                    </h2>
                    <BarVertical :datasets="totalVendorData" :columns="totalVendorColumns" style="margin-top:2rem" />
                  </div>
                </div>
              </div> -->
            </div>

            <div class="bx--row">
              <!-- <div class="bx--no-gutter-sm -col-md-4 -col-sm-2">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile">
                    <h2 class="bx--type-expressive-heading-02 marbot2">
                      Profession Badges*
                    </h2>
                    <h3 class="bx--type-body-short-01">
                      These are employees with a profession badge, independent of the profession base on their JR/S.
                    </h3>
                    <cv-data-table class="dataTable" :has-expand-all="true" :columns="testColumns" :data="testData">
                      <template slot="data"></template>
                    </cv-data-table>
                  </div>
                </div>
              </div>
              <div class="bx--no-gutter-sm -col-md-4 -col-sm-2">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile">
                    <h2 class="bx--type-expressive-heading-02 marbot2">
                      Vendor Certificates
                    </h2>
                    <cv-data-table class="dataTable" :has-expand-all="true" :columns="testColumns" :data="testData">
                      <template slot="data"></template>
                    </cv-data-table>
                  </div>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
  import {
    CvDataTable,
    CvDataTableRow,
    CvDataTableCell,
    CvRadioButton
  } from '@carbon/vue/src';
  import moment from 'moment';
  import { mapGetters } from 'vuex';
  import axios from 'axios';
  // import BarVertical from '@/components/charts/BarVertical';

  export default {
    name: 'ExecutiveSA',
    data() {
      return {
        filterList: {},
        message: '',
        title: '',
        filters: null,
        inprograms: [],
        intotals: {},
        metrics: {},
        testData: [],
        testColumns: [],
        earnedBadgedata: [
            {
              year: 2018,
              quantity: 20
            },
            {
              year: 2019,
              quantity: 30
            }
        ],
        earnedBadgeColumns: ['year','quantity'],
        totalVendorData: [
          {
            quarter: '1',
            quantity: 234
          },
          {
            quarter: '2',
            quantity: 223
          },
          {
            quarter: '3',
            quantity: 822
          },
          {
            quarter: '4',
            quantity: 765
          },
          {
            quarter: 'Total',
            quantity: 231
          }
        ],
        totalVendorColumns: ['quarter','quantity']
      };
    },
    computed: mapGetters([
      'usertoken',
      'groupTeam',
      'groupExecs',
      'shortenv',
      'groupAdmins',
      'environment'
    ]),
    created() {
      if (this.environment === 'local') {
        this.site = 'http://localhost:3000';
      };
    },
    mounted() {
      if (this.groupTeam || this.groupAdmins || this.environment === 'local') {
        this.getData();
        this.filterList = {
          region: true,
          ciclocation: true,
          istss: true,
          market: true,
          country: true,
          businessmodel: true,
          jrs: false,
          service: true,
          servicearea: true,
          serviceline: false
        };
      } else if (!this.usertoken) {
        this.message = 'You must log in to view this page.';
      } else {
        this.message = 'You are not authorized to view this page. If you believe this message is in error, please create an access request.'
      };
    },
    methods: {
      getData() {
        console.log(this.filters);
        axios.post('https://site-' + this.shortenv + '-api.domain.net/api/executive/intentional', {
          body: this.filters
        }).then((response) => {
          this.inprograms = response.data.data.table;
          this.intotals = response.data.data.total;
        });
        axios.post('https://site-' + this.shortenv + '-api.domain.net/api/executive/metrics', {
          body: this.filters
        }).then((response) => {
          this.metrics = response.data.data[0];
        });
      },
      filterChange(val) {
        this.filters = {
          region: [],
          ciclocation: [],
          istss: [],
          market: [],
          country: [],
          businessmodel: [],
          jrs: [],
          service: [],
          servicearea: [],
          serviceline: []
        };
        for (var i = 0; i < val.length; i++) {
          if (val[i].query === 'region') {
            this.filters.region = val[i].selected;
          }
          if (val[i].query === 'ciclocation') {
            this.filters.ciclocation = val[i].selected;
          }
          if (val[i].query === 'istss') {
            this.filters.istss = val[i].selected;
          }
          if (val[i].query === 'market') {
            this.filters.market = val[i].selected;
          }
          if (val[i].query === 'country') {
            this.filters.country = val[i].selected;
          }
          if (val[i].query === 'businessmodel') {
            this.filters.businessmodel = val[i].selected;
          }
          if (val[i].query === 'jrs') {
            this.filters.jrs = val[i].selected;
          }
          if (val[i].query === 'service') {
            this.filters.service = val[i].selected;
          }
          if (val[i].query === 'servicearea') {
            this.filters.servicearea = val[i].selected;
          }
          if (val[i].query === 'serviceline') {
            this.filters.serviceline = val[i].selected;
          }
        };
        this.getData();
      }
    }
  };
</script>

<style scoped lang='scss'>
  .dataSource{
    width: 100%;
    padding: 0.5rem;
    display: flex;
    justify-content: space-between
  }
  .dataTable {
    margin-top: 1rem;
    padding: 1rem;
    background-color: transparent;
    border-bottom: 0px;
    height: 300px;
    display: flex;
    overflow: auto;
  }
  .page-content>div>div:nth-child(2) h3 {
    margin-top: unset;
  }
  .card.nopadbot {
    margin-bottom: 0;
  }
  .cv-structured-list-heading.bx--structured-list-th.first {
    width: 25%;
  }
</style>
