<template>
  <div class="container">
    <PageheadNoTabs title="Cognitive Talent Tapper - DS" :origin="'ISA'" />
    <div v-if="message" class="nologin bx--type-body-short-01">
      {{ message }}
    </div>
    <div v-else>
      <cv-tabs aria-label="navigation tab label">
        <cv-tab label="Data Science Dashboard by Manager">
          <div class="tab-container bx--grid">
            <div class="bx--row">
              <div class="bx--col">
                <horizontal-filter :filter-list="filterList" background="dark" @updateFilter="loadData" />
              </div>
            </div>
            <div class="bx--row">
              <div class="-col-lg-5">
                <div class="bx--row">
                  <div class="bx--col">
                    <div>
                      <cv-tile>
                        <p>Counts</p>
                        <cv-data-table
                            ref="table"
                            :columns="countsData.columns"
                            :data="countsData.data"
                            class="table"
                        />
                      </cv-tile>
                    </div>
                  </div>
                  <div class="bx--col">
                    <div>
                      <cv-tile>
                        <p>Region/Country</p>
                        <cv-data-table
                            ref="table"
                            :columns="regionData.columns"
                            :data="regionData.data"
                            class="table"
                        />
                      </cv-tile>
                    </div>
                  </div>
                </div>
              </div>
              <div class="-col-lg-7">
                <div class="bx--row">
                  <div class="bx--col">
                    <div>
                      <cv-tile>
                        <p>Skill Distribution by Manager</p>
                        <cv-data-table
                            ref="table"
                            :columns="skillDistributionData.columns"
                            :data="skillDistributionData.data"
                            class="table"
                        />
                      </cv-tile>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bx--row">
              <div class="-col-lg-5">
                <div class="bx--row">
                  <div class="bx--col">
                    <cv-tile>
                      <p>Skill Counts</p>
                      <cv-data-table
                          ref="table"
                          :columns="skillCountsData.columns"
                          :data="skillCountsData.data"
                          class="table"
                          style="width: 100%;height:400px;overflow-y: auto;"
                      />
                    </cv-tile>
                  </div>
                </div>
              </div>
              <div class="-col-lg-7">
                <div class="bx--row">
                  <div class="bx--col">
                    <cv-tile>
                      <p>Skill Distribution</p>
                      <div id="areaChart" style="width: 100%;height:400px;margin-top:2rem"></div>
                    </cv-tile>
                  </div>
                </div>
              </div>
            </div>
            <div class="bx--row">
              <div class="bx--col">
                <cv-tile>
                  <div class="-col-sm-2">
                    <p>Data Source</p>
                    <cv-structured-list :condensed="false">
                      <template slot="items">
                        <cv-structured-list-item v-for="(item, index) in sourceList" :key="index">
                          <cv-structured-list-data>{{ item.label }}</cv-structured-list-data>
                          <cv-structured-list-data>{{ item.value | ThousandPartitionFilter }}</cv-structured-list-data>
                        </cv-structured-list-item>
                      </template>
                    </cv-structured-list>
                  </div>
                </cv-tile>
              </div>
            </div>
          </div>
        </cv-tab>
        <cv-tab label="Detail View">
          <div class="tab-container bx--grid">
            <div class="bx--row">
              <div class="bx--col">
                <horizontal-filter :filter-list="filterList" @updateFilter="loadData" />
              </div>
            </div>
            <div class="bx--row">
              <div class="bx--col">
                <cv-tile>
                  <p>Detail</p>
                  <cv-data-table
                      ref="table"
                      :columns="detailData.columns"
                      :data="detailData.data"
                      class="table"
                  />
                </cv-tile>
              </div>
            </div>
          </div>
        </cv-tab>
        <cv-tab label="Evidence View">
          <div class="tab-container bx--grid">
            <div class="bx--row">
              <div class="bx--col">
                <horizontal-filter :filter-list="filterList" @updateFilter="loadData" />
              </div>
            </div>
            <div class="bx--row">
              <div class="bx--col">
                <cv-tile>
                  <p>Evidence</p>
                  <cv-data-table
                      ref="table"
                      :columns="detailData.columns"
                      :data="detailData.data"
                      class="table"
                  />
                </cv-tile>
              </div>
            </div>
          </div>
        </cv-tab>
        <cv-tab label="People by Skill Selection">
          <div class="tab-container bx--grid">
            <div class="bx--row">
              <div class="bx--col">
                <horizontal-filter :filter-list="filterList" @updateFilter="loadData" />
              </div>
            </div>
            <div class="bx--row">
              <div class="bx--col">
                <cv-tile>
                  <p>Skills Selection for All</p>
                  <cv-data-table
                      ref="table"
                      :columns="detailData.columns"
                      :data="detailData.data"
                      class="table"
                  />
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
  import {
    getCountsData,
    getDetailData,
    getRegionData,
    getSkillCountsData,
    getSkillDistributionData
  } from "@/api/CognitiveTTDS";
  import PageheadNoTabs from "@/components/pagehead/PageheadTabs";
  import HorizontalFilter from "@/components/HorizontalFilter";
  import axios from "axios";
  import { mapGetters } from "vuex";
  export default {
    name: "CognitiveTTDS",
    components: { PageheadNoTabs, HorizontalFilter },
    data() {
      return {
        filterList: [],
        site: '',
        message: '',
        skillCountsData: { data: [], columns: [] },
        skillDistributionData: { data: [], columns: [] },
        countsData: { data: [], columns: [] },
        detailData: { data: [], columns: [] },
        regionData: { data: [], columns: [] },
        sourceList: [
          {
            label: "EDVISOR",
            value: "2020/01/01"
          },
          {
            label: "PROM",
            value: "2020/01/01"
          }
        ]
      };
    },
    computed: mapGetters([
      'usertoken',
      'groupTeam',
      'groupAdmins',
      'environment'
    ]),
    created() {
      if (this.environment === 'local') {
        this.site = 'http://localhost:3000';
      };
    },

    mounted() {
      this.$nextTick(() => {
        this.drawChart();
      });
      if (this.groupTeam || this.groupAdmins || this.environment === 'local') {
        this.loadFilters();
        this.loadCounts();
        this.loadDetailData();
        this.loadRegion();
        this.loadSkillCounts();
        this.loadSkillDistribution();
      } else if (!this.usertoken) {
        this.message = 'You must log in to view this page.';
      } else {
        this.message = 'You are not authorized to view this page. If you believe this message is in error, please create an access request.'
      };
    },
    methods: {
      loadData(filter) {
        this.loadCounts();
      },
      loadCounts() {
        getCountsData().then(res => {
          this.countsData = res.data.data;
        });
      },
      loadSkillCounts(filter) {
        getSkillCountsData().then(res => {
          this.skillCountsData = res.data.data;
        });
      },
      loadSkillDistribution(filter) {
        getSkillDistributionData().then(res => {
          this.skillDistributionData = res.data.data;
        });
      },
      loadRegion() {
        getRegionData().then(res => {
          this.regionData = res.data.data;
        });
      },
      loadFilters() {
        axios.get(this.site + '/api/open/filters').then((response) => {
            this.filterList.push(response.data.data.yearEnrolled);
            this.filterList.push(response.data.data.planTitle);
            this.filterList.push(response.data.data.istss);
            this.filterList.push(response.data.data.ciclocation);
            this.filterList.push(response.data.data.country);
            this.filterList.push(response.data.data.region);
            this.filterList.push(response.data.data.market);
          });
      },
      filterChange() {
        // console.log(this.filters);
      },
      loadDetailData() {
        getDetailData().then(res => {
          this.detailData = res.data.data;
        });
      },
      drawChart() {
        // Init echart instance based on the rendered dom element
        let myChart = this.$echarts.init(document.getElementById("areaChart"));
        let option = {
          series: [
            {
              type: "treemap",
              data: [
                {
                  name: "nodeA", // First tree
                  value: 10,
                  children: [
                    {
                      name: "nodeAa", // First leaf of first tree
                      value: 4
                    },
                    {
                      name: "nodeAb", // Second leaf of first tree
                      value: 6
                    }
                  ]
                },
                {
                  name: "nodeB", // Second tree
                  value: 20,
                  children: [
                    {
                      name: "nodeBa", // Son of first tree
                      value: 20,
                      children: [
                        {
                          name: "nodeBa1", // Granson of first tree
                          value: 20
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        };
        myChart.setOption(option);
      }
    }
  };
</script>

<style scoped lang='scss'>
  .table {
    margin-top: 2rem;
  }
</style>
