<template>
  <div class="container">
    <PageheadNoTabs title="Edvisor Learning Plan Summary dashboard" :origin="'ISA'" />
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
        <cv-tab label="Edvisor Learning Plan Summary">
          <div class="tab-container bx--grid">
            <div class="bx--row">
              <div class="-col-lg-3">
                <div class="bx--row">
                  <div class="bx--col">
                    <cv-tile>
                      <span>Total Unique Employee</span>
                      <div class="tile-count">
                        47,044
                      </div>
                    </cv-tile>
                  </div>
                </div>
                <div class="bx--row">
                  <div class="bx--col">
                    <cv-tile>
                      <span>Filters</span>
                      <cv-select v-for="(filterItem, index) in filterList" :key="index" :label="filterItem.label" @change="filterChange">
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
                  <div class="bx--col">
                    <cv-tile>
                      <span>Data Source</span>
                      <cv-structured-list :condensed="false">
                        <template slot="items">
                          <cv-structured-list-item v-for="(item, index) in sourceList" :key="index">
                            <cv-structured-list-data>{{ item.label }}</cv-structured-list-data>
                            <cv-structured-list-data>{{ item.value | ThousandPartitionFilter }}</cv-structured-list-data>
                          </cv-structured-list-item>
                        </template>
                      </cv-structured-list>
                    </cv-tile>
                  </div>
                </div>
              </div>
              <div class="-col-lg-9">
                <div class="bx--row">
                  <div class="bx--col">
                    <cv-tile>
                      <span>Plan Enrollments by Month</span>
                      <LineChart ref="planByMonth" :datasets="planByMonth" />
                    </cv-tile>
                  </div>
                </div>
                <div class="bx--row">
                  <div class="-col-lg-6">
                    <cv-tile>
                      <span>People Enrolled by Country</span>
                      <div id="areaChart" style="width: 100%;height:400px;"></div>
                    </cv-tile>
                  </div>
                  <div class="-col-lg-6">
                    <cv-tile>
                      <span># of Plans Enrolled by Region</span>
                      <BarHorizontal ref="planData" :datasets="planData.rows" :columns="planData.columns" :height="chartHeight" />
                    </cv-tile>
                  </div>
                </div>
                <div class="bx--row">
                  <div class="bx--col">
                    <cv-tile>
                      <span>Enrollments by Plan Title</span>
                      <BarHorizontal ref="planTitle" class="claims-horizontal-bar" :datasets="planData.rows" :columns="planData.columns" :height="chartHeight" />
                    </cv-tile>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </cv-tab>
        <cv-tab label="Edvisor Learning Plan Summary">
          <div class="tab-container bx--grid">
            <div class="bx--row">
              <div class="bx--col">
                <cv-data-table ref="table" :columns="detailData.columns" :data="detailData.data" />
              </div>
            </div>
          </div>
        </cv-tab>
      </cv-tabs>
    </div>
  </div>
</template>

<script>
  import { getPlansByMonth, getPlansByRegion, getDetailData } from '@/api/EdvisorPlan';
  import { mapGetters } from 'vuex';

  export default {
    name: 'EdvisorPlan',
    data() {
      return {
        chartHeight:"400px",
        filterList: [],
        planByMonth: {data: [], columns:[]},
        planData: {data: [], columns:[]},
        detailData: {data: [], columns:[]},
        filters: {},
        sourceList: []
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
      this.loadFilters()
      this.loadPlans()
      this.loadPlanByMonth(),
      this.loadDetailData()
    },
    mounted() {
      this.$nextTick(() => {
        this.drawChart()
      })
    },
    methods: {
      loadPlanByMonth() {
        getPlansByMonth().then(res => {
          this.planByMonth = res.data.data
        })
      },
      loadPlans() {
        getPlansByRegion().then(res => {
          this.planData = res.data.data
        })
      },
      loadFilters() {
        getFilterList().then(res => {
          this.filterList = res.data.data
        })
      },
      filterChange() {
        // console.log(this.filters);
      },
      loadDetailData() {
        getDetailData().then(res => {
          this.detailData = res.data.data
        })
      },
      drawChart() {
        // Init echart instance based on the rendered dom element
        let myChart = this.$echarts.init(document.getElementById('areaChart'));
        let option = {
          series: [{
          type: 'treemap',
          data: []
          }]
        };
        myChart.setOption(option);
      }
    }
  };
</script>
