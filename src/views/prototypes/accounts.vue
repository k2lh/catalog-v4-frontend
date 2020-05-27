<template>
  <div id="AccountsSA" class="page-body">
    <div class="container">
      <PageheadNoTabs title="Accounts" :origin="'ISA'" />
      <main id="maincontent" class="page-content">
        <div v-if="message" class="nologin bx--type-body-short-01">
          {{ message }}
        </div>
        <div v-else>
          <div class="tab-container">
            <div class="bx--row">
              <div class="-col-lg-3">
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
                  <div v-for="(cardItem, index) in cardList" :key="index" class="-col-lg-4">
                    <cv-tile>
                      <span>{{ cardItem.label }}</span>
                      <p class="show-p">
                        {{ cardItem.value }}
                      </p>
                    </cv-tile>
                  </div>
                </div>
                <div class="bx--row">
                  <div class="-col-lg-6">
                    <cv-tile>
                      <span>Billiable Hours Trend</span>
                      <BarVertical ref="hoursTrendData" :datasets="hoursTrendData.rows" :columns="hoursTrendData.columns" :height="chartHeight" />
                    </cv-tile>
                  </div>
                  <div class="-col-lg-6">
                    <cv-tile>
                      <span>Billiable Hrs by Svc Name LV30</span>
                      <div id="areaChart" style="width: 100%;height:400px;"></div>
                    </cv-tile>
                  </div>
                </div>
                <div class="bx--row">
                  <div class="bx--col">
                    <cv-tile>
                      <span>Top 10 Badges</span>
                      <BarHorizontalStacked ref="topBadges" :datasets="topBadgesData.rows" :columns="topBadgesData.columns" />
                    </cv-tile>
                  </div>
                </div>
                <div class="bx--row">
                  <div class="bx--col">
                    <cv-tile>
                      <span>Top 10 External Certifications found in CVs</span>
                      <p style="margin-top:1rem">
                        VENDOE
                      </p>
                      <BarHorizontalStacked ref="topCertifications" :datasets="certificationData.rows" :columns="certificationData.columns" />
                    </cv-tile>
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
  import { getTopBadges, getHoursTrend, getTopCertifications } from '@/api/AccountsSA';
  import { mapGetters } from 'vuex';

  export default {
    name: 'AccountsSA',
    data() {
      return {
        filterList: [],
        message: '',
        chartHeight:'400px',
        hoursTrendData: {data: [], columns:[]},
        topBadgesData: {data: [], columns:[]},
        certificationData: {data: [], columns:[]},
        sourceList: [],
        cardList:[]
      };
    },
    computed: mapGetters([
      'usertoken',
      'groupTeam',
      'groupExecs',
      'groupAdmins',
      'groupDash',
      'groupOrg',
      'environment'
    ]),
    created() {
      if (this.groupTeam || this.environment === 'local') {
        this.loadFilters();
        this.loadHoursTrend();
        this.loadTopBadges();
        this.loadTopCertifications();
      } else if (!this.usertoken) {
        this.message = 'You must log in to view this page.';
      } else {
        this.message = 'You are not authorized to view this page. If you believe this message is in error, please create an access request.'
      };

    },
    mounted() {
      this.$nextTick(() => {
        this.drawChart()
      });
    },
    methods: {
      loadTopBadges() {
        getTopBadges().then(res => {
          this.topBadgesData = res.data.data
        })
      },
      loadHoursTrend() {
        getHoursTrend().then(res => {
          this.hoursTrendData = res.data.data
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
      loadTopCertifications() {
        getTopCertifications().then(res => {
          this.certificationData = res.data.data
        })
      },
      drawChart() {
        // Init echart instance based on the rendered dom element
        let myChart = this.$echarts.init(document.getElementById('areaChart'));
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

<style scoped lang='scss'>
  .show-p{
    font-size: 2rem;
    margin: 5rem 0 1rem 1rem
  }
  .tab-container {
    background: transparent;
  }
</style>
