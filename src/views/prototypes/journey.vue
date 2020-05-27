<template>
  <div class="container">
    <PageheadNoTabs title="Journey to Cloud Leader dashboard" :origin="'ISA'" />
    <cv-tabs aria-label="navigation tab label">
      <cv-tab label="Journey to Cloud Leaderboard">
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
                  <div>
                    <cv-tile>
                      <p>Employee Count</p>
                      <div class="tile-count">
                        104,790
                      </div>
                    </cv-tile>
                  </div>
                </div>
                <div class="bx--col">
                  <div>
                    <cv-tile>
                      <p>Employee Count</p>
                      <div class="tile-count">
                        104,790
                      </div>
                    </cv-tile>
                  </div>
                </div>
              </div>
            </div>
            <div class="-col-lg-8">
              <div class="bx--row">
                <div class="bx--col">
                  <cv-tile>
                    <p>Plan Enrollments by Month</p>
                    <bar-horizontal ref="planTitle" class="claims-horizontal-bar" :datasets="courseCompleteData.rows" :columns="courseCompleteData.columns" :height="chartHeight" />
                  </cv-tile>
                </div>
              </div>
            </div>
          </div>
          <div class="bx--row">
            <div class="-col-sm-2">
              <cv-tile style="height: 100%">
                <p>% Course Completed</p>
                <cv-data-table ref="table" :columns="detailData.columns" :data="detailData.data" class="table" />
              </cv-tile>
            </div>
            <div class="-col-sm-2">
              <cv-tile style="height: 100%">
                <p>% Course Completed</p>
                <cv-data-table ref="table" :columns="detailData.columns" :data="detailData.data" class="table" />
              </cv-tile>
            </div>
          </div>
          <div class="bx--row" style="margin-top:1rem">
            <div class="bx--col">
              <cv-tile style="height: 100%">
                <p>Completions Rates</p>
                <BarVertical ref="completionRatesData" :datasets="completionRatesData.rows" :columns="completionRatesData.columns" :height="chartHeight" />
              </cv-tile>
            </div>
          </div>
        </div>
      </cv-tab>
      <cv-tab label="Completions Download View">
        <div class="tab-container bx--grid">
          <div class="bx--row">
            <div class="-col-lg-2">
              <cv-tile style="height: 100%">
                <p>FILTER BY manager Name</p>
                <cv-search v-model="modelValue" :label="label" style="margin-top:1rem" @input="onInput" />
                <cv-tile>
                  <p>Data Source</p>
                  <cv-structured-list :condensed="false">
                    <template slot="items">
                      <cv-structured-list-item v-for="(item, index) in sourceList" :key="index">
                        <cv-structured-list-data>{{ item.label }}</cv-structured-list-data>
                        <cv-structured-list-data>{{ item.value | ThousandPartitionFilter }}</cv-structured-list-data>
                      </cv-structured-list-item>
                    </template>
                  </cv-structured-list>
                </cv-tile>
              </cv-tile>
            </div>
            <div class="-col-lg-10">
              <div class="bx--row">
                <div class="-col-lg-10">
                  <horizontal-filter :filter-list="filterList" @updateFilter="loadData" />
                </div>
              </div>
              <div class="bx--row">
                <div class="-col-lg-10">
                  <cv-tile style="height: 100%">
                    <p>Couese Completions Download View</p>
                    <cv-data-table ref="table" :columns="detailData.columns" :data="detailData.data" class="table" />
                  </cv-tile>
                </div>
              </div>
            </div>
          </div>
        </div>
      </cv-tab>
      <cv-tab label="Managers Download View">
        <div class="tab-container bx--grid">
          <div class="bx--row">
            <div class="-col-lg-2">
              <cv-tile style="height: 100%">
                <p>FILTER BY manager Name</p>
                <cv-search v-model="modelValue" :label="label" style="margin-top:1rem" @input="onInput" />
                <cv-tile>
                  <p>Data Source</p>
                  <cv-structured-list :condensed="false">
                    <template slot="items">
                      <cv-structured-list-item v-for="(item, index) in sourceList" :key="index">
                        <cv-structured-list-data>{{ item.label }}</cv-structured-list-data>
                        <cv-structured-list-data>{{ item.value | ThousandPartitionFilter }}</cv-structured-list-data>
                      </cv-structured-list-item>
                    </template>
                  </cv-structured-list>
                </cv-tile>
              </cv-tile>
            </div>
            <div class="-col-lg-10">
              <div class="bx--row">
                <div class="-col-lg-10">
                  <horizontal-filter :filter-list="filterList" @updateFilter="loadData" />
                </div>
              </div>
              <div class="bx--row">
                <div class="-col-lg-10">
                  <cv-tile style="height:100%">
                    <p>Managers Download View</p>
                    <cv-data-table ref="table" :columns="detailData.columns" :data="detailData.data" class="table" />
                  </cv-tile>
                </div>
              </div>
            </div>
          </div>
        </div>
      </cv-tab>
      <cv-tab label="Journey to Cloud Leaderboard">
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
                  <div>
                    <cv-tile>
                      <p>Employee Count</p>
                      <div class="tile-count">
                        104,790
                      </div>
                    </cv-tile>
                  </div>
                </div>
                <div class="bx--col">
                  <div>
                    <cv-tile>
                      <p>Completed All Courses</p>
                      <div class="tile-count">
                        765
                      </div>
                    </cv-tile>
                  </div>
                </div>
              </div>
            </div>
            <div class="-col-lg-8">
              <div class="bx--row">
                <div class="bx--col">
                  <cv-tile>
                    <p>% Completed by Course ZZZ - IS + TSS</p>
                    <cv-data-table ref="table" :columns="detailData.columns" :data="detailData.data" class="table" />
                  </cv-tile>
                </div>
              </div>
            </div>
          </div>
          <div class="bx--row">
            <div class="-col-sm-2">
              <cv-tile style="height:100%">
                <p>% Completed by Region</p>
                <bar-horizontal ref="CompletedByRegion" class="claims-horizontal-bar" :datasets="courseCompleteData.rows" :columns="courseCompleteData.columns" :height="chartHeight" />
              </cv-tile>
            </div>
            <div class="-col-sm-2">
              <cv-tile style="height:100%">
                <p>% Completed by Region (Table)</p>
                <cv-data-table ref="table" :columns="detailData.columns" :data="detailData.data" class="table" />
              </cv-tile>
            </div>
          </div>
        </div>
      </cv-tab>
      <cv-tab label="Course Information">
        <div class="tab-container bx--grid">
          <div class="bx--row">
            <div class="bx--col">
              <cv-tile>
                <p>Detail 1</p>
              </cv-tile>
            </div>
          </div>
          <div class="bx--row">
            <div class="bx--col">
              <cv-tile>
                <p>Detail 2</p>
              </cv-tile>
            </div>
          </div>
        </div>
      </cv-tab>
    </cv-tabs>
  </div>
</template>

<script>
  import { getCourseCompleteData, getDetailData,getCompletionRates} from "@/api/JourneyCL";
  import PageheadNoTabs from '@/components/pagehead/PageheadTabs';
  import HorizontalFilter from "@/components/HorizontalFilter";
  import axios from 'axios';
  export default {
    name: "",
    components: { PageheadNoTabs, HorizontalFilter },
    data() {
      return {
        modelValue:"",
        label:"",
        chartHeight:'400px',
        filterList: [],
        planByMonth: {data: [], columns:[]},
        courseCompleteData: {data: [], columns:[]},
        detailData: {data: [], columns:[]},
        completionRatesData: {data: [], columns:[]},
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
      this.loadCourseComplete()
      this.loadDetailData()
      this.loadCompletionRates()
    },
    methods: {
      loadData(filter) {
        this.loadCourseComplete(filter)
      },
      onInput(value){
          console.log(value)
      },
      loadCourseComplete(filter) {
        getCourseCompleteData().then(res => {
          this.courseCompleteData = res.data.data
        })
      },
      loadCompletionRates() {
          getCompletionRates().then(res => {
            this.completionRatesData = res.data.data
          })
        },
      loadFilters() {
        axios.post(process.env.ROOT_API + '/open/filters', {fields: ['yearEnrolled', 'planTitle', 'ISTSS', 'cicLocation', 'country', 'region', 'market']}).then(res => {
          console.log(res.data)
          this.filterList = res.data
        })
      },
      filterChange() {
        console.log(this.filters);
      },
      loadDetailData() {
        getDetailData().then(res => {
          this.detailData = res.data.data
        })
      }
    }
  };
</script>

<style scoped lang='scss'>

.table{
    margin-top: 2rem
}
</style>
