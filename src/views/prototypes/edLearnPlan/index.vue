<template>
  <div class="container">
    <PageheadNoTabs title="Edvisor Learning Plan Summary dashboard" :origin="'ISA'" />
    <cv-tabs aria-label="navigation tab label">
      <cv-tab label="Edvisor Learning Plan Summary">
        <div class="tab-container bx--grid">
          <div class="bx--row">
            <div class="bx--col">
              <horizontal-filter :filter-list="filterList" @updateFilter="loadData" />
            </div>
          </div>
          <div class="bx--row">
            <div class="-col-lg-4">
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
                          <cv-structured-list-data>{{ item.value }}</cv-structured-list-data>
                        </cv-structured-list-item>
                      </template>
                    </cv-structured-list>
                  </cv-tile>
                </div>
              </div>
            </div>
            <div class="-col-lg-8">
              <div class="bx--row">
                <div class="bx--col">
                  <cv-tile>
                    <span>Plan Enrollments by Month</span>
                    <line-chart ref="planByMonth" :datasets="planByMonth" />
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
                    <bar-horizontal ref="planData" :datasets="planData.rows" :columns="planData.columns" :height="chartHeight" />
                  </cv-tile>
                </div>
              </div>
              <div class="bx--row">
                <div class="bx--col">
                  <cv-tile>
                    <span>Enrollments by Plan Title</span>
                    <bar-horizontal ref="planTitle" class="claims-horizontal-bar" :datasets="planData.rows" :columns="planData.columns" :height="chartHeight" />
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
</template>

<script>
  import { getPlansByMonth, getPlansByRegion, getDetailData } from "@/api/EdvisorPlan";
  import PageheadNoTabs from '@/components/pagehead/PageheadTabs';
  import HorizontalFilter from "@/components/HorizontalFilter";
  import axios from 'axios';
  export default {
    name: "",
    components: { PageheadNoTabs, HorizontalFilter },
    data() {
      return {
        chartHeight:"400px",
        filterList: [],
        planByMonth: {data: [], columns:[]},
        planData: {data: [], columns:[]},
        detailData: {data: [], columns:[]},
        filters: {
          year: 2020,
          plan: '2020 Plans',
          category: 'Big Data'
        },
        sourceList: [{
          label: 'EDVISOR',
          value: '2020/01/01'
        },{
          label: 'PROM',
          value: '2020/01/01'
        }]
      };
    },
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
      loadData(filter) {
        this.loadPlans(filter)
      },
      loadPlanByMonth() {
        getPlansByMonth().then(res => {
          this.planByMonth = res.data.data
        })
      },
      loadPlans(filter) {
        getPlansByRegion().then(res => {
          this.planData = res.data.data
        })
      },
      loadFilters() {
        axios.post(process.env.ROOT_API + '/open/filters', {fields: ['yearEnrolled', 'planTitle', 'ISTSS', 'cicLocation', 'country', 'region', 'market']}).then(res => {
          this.filterList = res.data
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
        let myChart = this.$echarts.init(document.getElementById("areaChart"));
        let option = {
          series: [{
          type: 'treemap',
          data: [{
              name: 'nodeA',            // First tree
              value: 10,
              children: [{
                  name: 'nodeAa',       // First leaf of first tree
                  value: 4
              }, {
                  name: 'nodeAb',       // Second leaf of first tree
                  value: 6
              }]
            }, {
              name: 'nodeB',            // Second tree
              value: 20,
              children: [{
                  name: 'nodeBa',       // Son of first tree
                  value: 20,
                  children: [{
                      name: 'nodeBa1',  // Granson of first tree
                      value: 20
                  }]
              }]
            }]
          }]
        };
        myChart.setOption(option);
      }
    }
  };
</script>
