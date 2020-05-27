<template>
  <div class="container">
    <PageheadNoTabs title="Red Hat Learning Plans" :origin="'ISA'" />
    <div v-if="!groupTeam && environment !== 'local'" class="nologin bx--type-body-short-01">
      <div v-if="!usertoken">
        You must login to view this page.
      </div>
      <div v-else>
        You are not authorized to view this page. If you believe this message is in error, please create an access request.
      </div>
    </div>
    <div v-else>
      <cv-tabs aria-label="navigation tab label">
        <cv-tab label="Red Hat Learning Plans">
          <div class="tab-container bx--grid">
            <div class="bx--row">
              <div class="bx--col">
                <div class="bx--row">
                  <div class="bx--col">
                    <cv-tile class="-col-lg-12" style="display:flex;flex-wrap: wrap">
                      <cv-select v-for="(filterItem, index) in filterList" :key="index" :label="filterItem.label" class="-col-lg-2" @change="filterChange">
                        <cv-select-option disabled selected hidden>
                          Choose an option
                        </cv-select-option>
                        <cv-select-option v-for="(optionItem, i) in filterItem.options" :key="i" :value="optionItem.value">
                          {{ optionItem.label }}
                        </cv-select-option>
                      </cv-select>
                    </cv-tile>
                  </div>
                </div>
                <div class="bx--row">
                  <div v-for="(cardItem, index) in cardList" :key="index" class="-col-lg-3">
                    <cv-tile>
                      <span>{{ cardItem.label }}</span>
                      <p class="show-p">
                        {{ cardItem.value }}
                      </p>
                      <span>{{ cardItem.Explanation }}</span>
                    </cv-tile>
                  </div>
                </div>
                <div class="bx--row">
                  <div class="-col-lg-6">
                    <cv-tile>
                      <span>Enrolled in Edvisor</span>
                      <BarHorizontalStacked ref="enrolledInEdvisor" :datasets="enrolledInEdvisorData.rows" :columns="enrolledInEdvisorData.columns" />
                    </cv-tile>
                  </div>
                  <div class="-col-lg-6">
                    <cv-tile>
                      <span>Practitioner activity</span>
                      <BarHorizontalStacked ref="practitionerActivity" :datasets="practitionerActivityData.rows" :columns="practitionerActivityData.columns" />
                    </cv-tile>
                  </div>
                </div>
                <div class="bx--row">
                  <div class="-col-lg-6">
                    <cv-tile>
                      <span>Practitioners Badges</span>
                      <ring ref="practitionersBadges" :datasets="practitionersBadgeData.rows" :columns="practitionersBadgeData.columns" :height="chartHeight" />
                    </cv-tile>
                  </div>
                  <div class="-col-lg-6">
                    <cv-tile>
                      <span>Enrollments by Region</span>
                      <BarHorizontalStacked ref="enrollmentsByRegion" :datasets="enrollmentsByRegionData.rows" :columns="enrollmentsByRegionData.columns" />
                    </cv-tile>
                  </div>
                </div>
                <div class="bx--row">
                  <div class="-col-lg-6">
                    <cv-tile>
                      <span>Certificate Description</span>
                      <BarHorizontalStacked ref="certificateDescription" :datasets="certificateDescriptionData.rows" :columns="certificateDescriptionData.columns" />
                    </cv-tile>
                  </div>
                  <div class="-col-lg-6">
                    <cv-tile>
                      <span>Enrollments by Country</span>
                      <div id="areaChart" style="width: 100%;height:400px;"></div>
                    </cv-tile>
                  </div>
                </div>
                <div class="bx--row">
                  <div class="bx--col">
                    <cv-tile>
                      <span>Data Source</span>
                      <cv-structured-list :condensed="false">
                        <template slot="items">
                          <cv-structured-list-item v-for="(item, index) in sourceList" :key="index">
                            <cv-structured-list-data>{{ item.label }}</cv-structured-list-data>
                            <cv-structured-list-data>{{ item.value }}</cv-structured-list-data>
                          </cv-structured-list-item>
                        </template>
                      </cv-structured-list>
                    </cv-tile>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </cv-tab>
        <cv-tab label="Training Details">
          <div class="tab-container bx--grid">
            <div class="bx--row">
              <div class="bx--col">
                <cv-tile>
                  <span>Practitioner Details</span>
                  <cv-data-table ref="table" :columns="detailData.columns" :data="detailData.data" class="table" />
                </cv-tile>
              </div>
            </div>
          </div>
        </cv-tab>
        <cv-tab label="Activity Details">
          <div class="tab-container bx--grid">
            <div class="bx--row">
              <div class="bx--col">
                <div class="bx--row">
                  <div class="bx--col">
                    <cv-tile class="-col-lg-12" style="display:flex;flex-wrap: wrap">
                      <cv-select v-for="(filterItem, index) in activityFilterList" :key="index" :label="filterItem.label" class="-col-lg-2" @change="filterChange">
                        <cv-select-option disabled selected hidden>
                          Choose an option
                        </cv-select-option>
                        <cv-select-option v-for="(optionItem, i) in filterItem.options" :key="i" :value="optionItem.value">
                          {{ optionItem.label }}
                        </cv-select-option>
                      </cv-select>
                    </cv-tile>
                  </div>
                </div>
                <cv-tile>
                  <span>Practitioner Activity Details</span>
                  <cv-data-table ref="table" :columns="detailData.columns" :data="detailData.data" class="table" />
                </cv-tile>
              </div>
            </div>
          </div>
        </cv-tab>
        <cv-tab label="Certification Details">
          <div class="tab-container bx--grid">
            <div class="bx--row">
              <div class="bx--col">
                <cv-tile>
                  <span>Certification Details</span>
                  <cv-data-table ref="table" :columns="detailData.columns" :data="detailData.data" class="table" />
                </cv-tile>
              </div>
            </div>
          </div>
        </cv-tab>
        <cv-tab label="RH Scorecard">
          <div class="tab-container bx--grid">
            <div class="bx--row">
              <div class="bx--col">
                <div class="bx--row">
                  <div class="bx--col">
                    <div class="bx--col">
                      <cv-tile class="-col-lg-12" style="display:flex;flex-wrap: wrap">
                        <cv-select v-for="(filterItem, index) in RHFilterList" :key="index" :label="filterItem.label" class="-col-lg-2" @change="filterChange">
                          <cv-select-option disabled selected hidden>
                            Choose an option
                          </cv-select-option>
                          <cv-select-option v-for="(optionItem, i) in filterItem.options" :key="i" :value="optionItem.value">
                            {{ optionItem.label }}
                          </cv-select-option>
                        </cv-select>
                      </cv-tile>
                    </div>
                  </div>
                </div>
                <cv-tile>
                  <span>RH Scorecard - Global Scorecard</span>
                  <cv-data-table ref="table" :columns="detailData.columns" :data="detailData.data" class="table" />
                </cv-tile>
              </div>
            </div>
          </div>
        </cv-tab>
        <cv-tab label="CoE Reporting">
          <div class="tab-container bx--grid">
            <div class="bx--row">
              <div class="bx--col">
                <cv-tile>
                  <span>CoE Program</span>
                  <div v-for="(Item, index) in CoEList" :key="index" class="-col-sm-12" style="display:flex;align-items:center">
                    <span>{{ Item.label }}</span>
                    <BulletNew
                        :outervalue="Item.outervalue"
                        :innervalue="Item.innervalue"
                    />
                  </div>
                </cv-tile>
              </div>
              <div class="bx--col">
                <cv-tile>
                  <cv-data-table ref="table" :columns="detailData.columns" :data="detailData.data" class="table" />
                </cv-tile>
              </div>
            </div>
          </div>
        </cv-tab>
      </cv-tabs>
    </div>
  </div>
</template>

<script>
  import { getPractitionersBadges, getPractitionerActivity, getEnrolledInEdvisor,getEnrollmentsByRegion,getCertificateDescription,getFilterList,getDetailData,getTabFilterList,getRHFilterList} from "@/api/RedHatPlan";
  import { mapGetters } from 'vuex';

  export default {
    name: 'RedHatPlan',
    data() {
      return {
        filterList: [],
        RHFilterList: [],
        activityFilterList: [],
        CoEList: [],
        chartHeight:'400px',
        practitionerActivityData: {data: [], columns:[]},
        certificateDescriptionData: {data: [], columns:[]},
        enrollmentsByRegionData: {data: [], columns:[]},
        practitionersBadgeData: {data: [], columns:[]},
        enrolledInEdvisorData: {data: [], columns:[]},
        detailData: {data: [], columns:[]},
        sourceList: [],
        cardList:[]
      };
    },
    computed: mapGetters([
      'usertoken',
      'groupTeam',
      'groupExecs',
      'groupAdmins',
      'environment'
    ]),
    created() {
      this.loadFilters(),
      this.loadTabFilters(),
      this.loadRHFilters(),
      this.loadPractitionerActivity(),
      this.loadPractitionersBadges(),
      this.loadEnrolledInEdvisor(),
      this.loadEnrollmentsByRegion(),
      this.loadCertificateDescription(),
      this.loadDetailData()
    },
    mounted() {
      this.$nextTick(() => {
        this.drawChart()
      })
    },
    methods: {
      loadPractitionersBadges() {
        getPractitionersBadges().then(res => {
          this.practitionersBadgeData = res.data.data
        })
      },
      loadCertificateDescription() {
        getCertificateDescription().then(res => {
          this.certificateDescriptionData = res.data.data
        })
      },
      loadPractitionerActivity() {
        getPractitionerActivity().then(res => {
          this.practitionerActivityData = res.data.data
        })
      },
      loadEnrollmentsByRegion() {
        getEnrollmentsByRegion().then(res => {
          this.enrollmentsByRegionData = res.data.data
        })
      },
      loadFilters() {
        getFilterList().then(res => {
          this.filterList = res.data.data
        })
      },
      loadTabFilters() {
        getTabFilterList().then(res => {
          this.activityFilterList = res.data.data
        })
      },
      loadRHFilters() {
        getRHFilterList().then(res => {
          this.RHFilterList = res.data.data
        })
      },
      loadEnrolledInEdvisor() {
        getEnrolledInEdvisor().then(res => {
          this.enrolledInEdvisorData = res.data.data
        })
      },
      loadDetailData() {
        getDetailData().then(res => {
          this.detailData = res.data.data
        })
      },
      filterChange() {
        console.log(this.filters);
      },
      drawChart() {
        // Init echart instance based on the rendered dom element
        let myChart = this.$echarts.init(document.getElementById("areaChart"));
        let option = {
          series: [{
          type: 'treemap',
          data: []
              }]
            }]
          }]
        };
        myChart.setOption(option);
      }
    }
  };
</script>

<style scoped lang='scss'>
  .show-p{
    font-size: 2rem;
    margin: 5rem 0 1rem 1rem
  }
  .table{
    margin-top: 2rem
  }
</style>
