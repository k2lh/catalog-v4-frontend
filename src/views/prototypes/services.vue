<template>
  <div class="container">
    <PageheadNoTabs title="Services Academy Roadshow" :origin="'ISA'" />
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
        <cv-tab label="Location Breakdown">
          <div class="tab-container bx--grid">
            <div class="bx--row">
              <div class="-col-sm-4">
                <div class="bx--row">
                  <div class="-col-sm-4">
                    <cv-tile class="-col-sm-4" style="display:flex;flex-wrap: wrap">
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
                        {{ cardItem.value | ThousandPartitionFilter }}
                      </p>
                      <span>{{ cardItem.Explanation }}</span>
                    </cv-tile>
                  </div>
                </div>
                <div class="bx--row">
                  <div class="-col-sm-2">
                    <cv-tile>
                      <span>Total Profession Certification - YTD</span>
                      <BarHorizontal ref="professionCertification" :datasets="professionCertification.rows" :columns="professionCertification.columns" :height="chartHeight" />
                    </cv-tile>
                  </div>
                  <div class="-col-sm-2">
                    <cv-tile>
                      <span>Top 15 Badges Earned -YTD</span>
                      <div id="areaChart" style="width: 100%;height:800px;"></div>
                    </cv-tile>
                  </div>
                </div>
                <div class="bx--row">
                  <div class="-col-sm-4">
                    <cv-tile>
                      <span>Top Services Academy Intentionally Trained YTD</span>
                      <BarVertical ref="topServicesAcademy" :datasets="topServicesAcademy.rows" :columns="topServicesAcademy.columns" />
                    </cv-tile>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </cv-tab>
        <cv-tab label="Job Role Word Cloud">
          <div class="tab-container bx--grid">
            <div class="bx--row">
              <div class="bx--col">
                <cv-tile>
                  <span>Your Roles</span>
                  <div class="-col-lg-12" style="display:flex;justify-content:center">
                    <div id="roleChart" style="width: 1800px;height:100%"></div>
                  </div>
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
import { getFilterList,getProfessionCertifications,getTopServicesAcademy,getDrawAreaChart,getDrawWordCloudChart} from "@/api/ServicesAR";
import { mapGetters } from 'vuex';
export default {
  name: 'ServicesAR',
  data() {
    return {
      filterList: [],
      chartHeight:'800px',
      professionCertification: {data: [], columns:[]},
      topServicesAcademy: {data: [], columns:[]},
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
    this.loadProfessionCertification(),
    this.loadTopServicesAcademy()
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.drawAreaChart()
    // })
    getDrawAreaChart().then(data => {
      this.drawAreaChart(data.drawData);
    });
    getDrawWordCloudChart().then(data => {
      this.drawWordCloudChart(data.wordCloudData);
    });

  },
  methods: {

    loadFilters() {
      getFilterList().then(res => {
        this.filterList = res.data.data
      })
    },
    loadProfessionCertification() {
      getProfessionCertifications().then(res => {
        this.professionCertification = res.data.data;
        console.log(this.professionCertification);
      })
    },
    loadTopServicesAcademy() {
      getTopServicesAcademy().then(res => {
        this.topServicesAcademy = res.data.data
      })
    },

    filterChange() {
      console.log(this.filters);
    },
    drawAreaChart(data) {
      // Init echart instance based on the rendered dom element
      let myChart = this.$echarts.init(document.getElementById("areaChart"));
      let option = {
        series: [{
        type: 'treemap',
        data
        // data: [{
        //     name: 'nodeA',            // First tree
        //     value: 10,
        //     children: [{
        //         name: 'nodeAa',       // First leaf of first tree
        //         value: 4
        //     }, {
        //         name: 'nodeAb',       // Second leaf of first tree
        //         value: 6
        //     }]
        //   }, {
        //     name: 'nodeB',            // Second tree
        //     value: 20,
        //     children: [{
        //         name: 'nodeBa',       // Son of first tree
        //         value: 20,
        //         children: [{
        //             name: 'nodeBa1',  // Granson of first tree
        //             value: 20
        //         }]
        //     }]
        //   }]
        }]
      };
      myChart.setOption(option);
    },
    drawWordCloudChart(data){
      let wordCloudChart = this.$echarts.init(document.getElementById("roleChart"));
      let wordCloudOption = {
        tooltip: {
        show: true
        },
        series: [{
            type: "wordCloud",
            gridSize:30,
            // shape:'diamond',
            sizeRange: [10, 80],
            rotationRange: [0, 0],
            shape: 'circle',
            textStyle: {
                normal: {
                    color: function() {
                        return 'rgb(' + [
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160)
                        ].join(',') + ')';
                    }
                },
                emphasis: {
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            data
            }]
          };
          wordCloudChart.setOption(wordCloudOption);
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
