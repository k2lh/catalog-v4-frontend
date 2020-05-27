<template>
  <div id="CapacityEstimate" class="page-body">
    <div class="container">
      <PageheadNoTabs :title="'Capacity Estimates'" :origin="'ISA'" />
      <main id="maincontent" class="page-content">
        <div v-if="message" class="nologin bx--type-body-short-01">
          {{ message }}
        </div>
        <div v-else class="">
          <div class="bx--grid">
            <!-- <div class="bx--row">
              <cv-toggle :key="toggle1" :value="toggle1" @change="actionChange">
                <template v-if="useTextLeft" slot="text-left">
                  <span class="toggle-text">Hide Adjusted</span>
                </template>
                <template v-if="useTextRight" slot="text-right">
                  <span class="toggle-text">Show Adjusted</span>
                </template>
              </cv-toggle>
            </div> -->
            <div class="bx--row">
              <div class="-col-lg-4 header-style firstcolumn">
                JRS
              </div>
              <div class="-col-lg-2 header-style">
                NOW
              </div>
              <div class="-col-lg-2 header-style">
                30 days
              </div>
              <div class="-col-lg-2 header-style">
                60 days
              </div>
              <div class="-col-lg-2 header-style">
                90 days
              </div>
            </div>
            <div v-for="(item, rowIndex) in items" :key="rowIndex" :value="`${rowIndex}`">
              <div class="bx--row tablebody">
                <div class="-col-lg-4">
                  <div class="radiobutton">
                    <cv-radio-button v-model="activeName" :value="rowIndex.toString()" :checked="rowIndex === items.selectedRow" @click="$set(items, 'selectedRow', rowIndex); getRow(rowIndex)" />
                  </div>
                  {{ item.jrsname }}
                </div>
                <div class="-col-lg-2" :class="{positive: (items[rowIndex].values[0].have - items[rowIndex].values[0].need) > 0, negative: (items[rowIndex].values[0].have - items[rowIndex].values[0].need) < 0}">
                  {{ items[rowIndex].values[0].have - items[rowIndex].values[0].need | numFormat }}
                </div>
                <div class="-col-lg-2" :class="{positive: (items[rowIndex].values[1].have - items[rowIndex].values[1].need) > 0, negative: (items[rowIndex].values[1].have - items[rowIndex].values[1].need) < 0}">
                  {{ items[rowIndex].values[1].have - items[rowIndex].values[1].need | numFormat }}
                </div>
                <div class="-col-lg-2" :class="{positive: (items[rowIndex].values[2].have - items[rowIndex].values[2].need) > 0, negative: (items[rowIndex].values[2].have - items[rowIndex].values[2].need) < 0}">
                  {{ items[rowIndex].values[2].have - items[rowIndex].values[2].need | numFormat }}
                </div>
                <div class="-col-lg-2" :class="{positive: (items[rowIndex].values[3].have - items[rowIndex].values[3].need) > 0, negative: (items[rowIndex].values[3].have - items[rowIndex].values[3].need) < 0}">
                  {{ items[rowIndex].values[3].have - items[rowIndex].values[3].need | numFormat }}
                </div>
              </div>
              <div v-if="rowIndex === items.selectedRow" class="bx--row tableinset">
                <div class="bx--col">
                  <div class="bx--type-body-short-01 padtop1">
                    Estimated completions:
                    <strong>Borrow</strong> = {{ item.borrowDays }} days, ${{ item.borrowCost | numFormat }}/person.
                    <strong>Buy</strong> = {{ item.buyDays }} days, ${{ item.buyCost | numFormat }}/person.
                    <strong>Build</strong> = {{ item.buildDays }} days, ${{ item.buildCost | numFormat }}/person.
                    Output timeframe is based on estimated completion.
                  </div>
                  <section class="bx--structured-list">
                    <div class="bx--structured-list-thead">
                      <div class="bx--structured-list-row bx--structured-list-row--header-row">
                        <div v-for="(header, headerindex) in headers" :key="headerindex" class="bx--structured-list-th">
                          {{ header }}
                        </div>
                      </div>
                    </div>
                    <div class="bx--structured-list-tbody">
                      <div v-for="(row, rowInd) in chartData.rows" :key="rowInd" class="bx--structured-list-row">
                        <div class="bx--structured-list-td bx--structured-list-content--nowrap">
                          {{ row.timeframe }}
                        </div>
                        <div class="bx--structured-list-td bx--structured-list-content--nowrap">
                          {{ row.need | numFormat }}
                        </div>
                        <div class="bx--structured-list-td bx--structured-list-content--nowrap">
                          {{ row.have | numFormat }}
                        </div>
                        <div class="bx--structured-list-td bx--structured-list-content--nowrap">
                          <div class="bx--form-item">
                            <input v-model="row.brwTmp" type="text" class="bx--text-input" @change="updBorrow(items.selectedRow, rowIndex, row.brwTmp, row.buyTmp, row.bldTmp)">
                          </div>
                        </div>
                        <div class="bx--structured-list-td bx--structured-list-content--nowrap">
                          <div class="bx--form-item">
                            <input v-model="row.buyTmp" type="text" class="bx--text-input" @change="updBuy(items.selectedRow, rowIndex, row.brwTmp, row.buyTmp, row.bldTmp)">
                          </div>
                        </div>
                        <div class="bx--structured-list-td bx--structured-list-content--nowrap">
                          <div class="bx--form-item">
                            <input v-model="row.bldTmp" type="text" class="bx--text-input" @change="updBuild(items.selectedRow, rowIndex, row.brwTmp, row.buyTmp, row.bldTmp)">
                          </div>
                        </div>
                        <div class="bx--structured-list-td bx--structured-list-content--nowrap">
                          {{ row.output | numFormat }}
                        </div>
                        <div class="bx--structured-list-td bx--structured-list-content--nowrap">
                          ${{ row.cost | numFormat }}
                        </div>
                        <div class="bx--structured-list-td bx--structured-list-content--nowrap">
                          {{ row.tally | numFormat }}
                        </div>
                        <div class="bx--structured-list-td bx--structured-list-content--nowrap" :class="{positive: row.adjusted > 0, negative: row.adjusted < 0}">
                          {{ row.adjusted | numFormat }}
                        </div>
                      </div>
                    </div>
                  </section>
                  <ve-histogram ref="chart-{{ rowIndex.toString() }}" :data="chartData.rows" :settings="chartSettings" />
                  {{ chartData }}
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
  import { CvRadioButton, CvToggle } from '@carbon/vue/src'
  import { mapGetters } from 'vuex'
  import axios from 'axios';

  export default {
    name: 'CapacityEstimate',
    props: {
      unique: {
        type: String,
        default: ''
      },
      useTextLeft: {
        type: Boolean,
        default: true
      },
      useTextRight: {
        type: Boolean,
        default: true
      }
    },
    data() {
      this.chartSettings = {
        metrics: ['have', 'borrow', 'buy', 'build', 'need'],
        stack: { 'capacity': ['have', 'borrow', 'buy', 'build'] },
        showLine: ['need'],
        toggle1: false
      }
      return {
        columns: ['JRS', 'NOW', '30 days', '60 days', '90 days'],
        headers: ['', 'Need', 'Have', 'Borrow', 'Buy', 'Build', 'Increase', 'Cost', 'Tally', 'Offset'],
        message: '',
        title: '',
        site: '',
        activeName: null,
        items: [],
        chartData: {
          columns: ['timeframe', 'need', 'have', 'brwTmp', 'buyTmp', 'bldTmp', 'borrow', 'buy', 'build', 'output', 'cost', 'tally', 'adjusted'],
          rows: []
        }
      }
    },
    computed: mapGetters([
      'usertoken',
      'groupTeam',
      'groupExecs',
      'groupAdmins',
      'groupDash',
      'groupOrg',
      'environment',
      'shortenv',
      'baseURL'
    ]),
    watch: {
      activeName(val) {
        this.$nextTick(() => {
          this.drawChart();
        });
      }
    },
    created() {
      if (this.environment === 'local') {
        this.site = 'http://localhost:3000';
      };
    },
    mounted() {
      if (this.groupTeam || this.groupAdmins || this.environment === 'local') {
        this.getData();
      } else if (!this.usertoken) {
        this.message = 'You must log in to view this page.';
      } else {
        this.message = 'You are not authorized to view this page. If you believe this message is in error, please create an access request.'
      };
      this.$nextTick(() => {
        this.drawChart()
      });
    },
    methods: {
      getData() {
        axios.get(this.site + '/api/' + this.shortenv + '/open/estimates').then((response) => {
          this.items = response.data.data;
        });
      },
      updBorrow(i, j, brwTmp, buyTmp, bldTmp) {
        var m = 0;
        var days = this.items[i].borrowDays;
        if (days < 30) {
          m = j;
          this.chartData.rows[j].borrow = brwTmp;
          this.getOutput(i, j, m, brwTmp, buyTmp, bldTmp, 'borrow');
        } else if (days > 29 && days < 60) {
          m = j + 1;
          this.chartData.rows[m].borrow = brwTmp;
          this.getOutput(i, j, m, brwTmp, buyTmp, bldTmp, 'borrow');
        } else if (days > 59 && days < 90) {
          m = j + 2;
          this.chartData.rows[m].borrow = brwTmp;
          this.getOutput(i, j, m, brwTmp, buyTmp, bldTmp, 'borrow');
        } else {
          m = j + 3;
          this.chartData.rows[m].borrow = brwTmp;
          this.getOutput(i, j, m, brwTmp, buyTmp, bldTmp, 'borrow');
        }
      },
      updBuy(i, j, brwTmp, buyTmp, bldTmp) {
        var m = 0;
        var days = this.items[i].buyDays;
        if (days < 30) {
          m = j;
          this.chartData.rows[j].buy = buyTmp;
          this.getOutput(i, j, m, brwTmp, buyTmp, bldTmp, 'buy');
        } else if (days > 29 && days < 60) {
          m = j + 1;
          this.chartData.rows[m].buy = buyTmp;
          this.getOutput(i, j, m, brwTmp, buyTmp, bldTmp, 'buy');
        } else if (days > 59 && days < 90) {
          m = j + 2;
          this.chartData.rows[m].buy = buyTmp;
          this.getOutput(i, j, m, brwTmp, buyTmp, bldTmp, 'buy');
        } else {
          m = j + 3;
          this.chartData.rows[m].buy = buyTmp;
          this.getOutput(i, j, m, brwTmp, buyTmp, bldTmp, 'buy');
        }
      },
      updBuild(i, j, brwTmp, buyTmp, bldTmp) {
        var m = 0;
        var days = this.items[i].buildDays;
        if (days < 30) {
          m = j;
          this.chartData.rows[j].build = bldTmp;
          this.getOutput(i, j, m, brwTmp, buyTmp, bldTmp, 'build');
        } else if (days > 29 && days < 60) {
          m = j + 1;
          this.chartData.rows[m].build = bldTmp;
          this.getOutput(i, j, m, brwTmp, buyTmp, bldTmp, 'build');
        } else if (days > 59 && days < 90) {
          m = j + 2;
          this.chartData.rows[m].build = bldTmp;
          this.getOutput(i, j, m, brwTmp, buyTmp, bldTmp, 'build');
        } else {
          m = j + 3;
          this.chartData.rows[m].build = bldTmp;
          this.getOutput(i, j, m, brwTmp, buyTmp, bldTmp, 'build');
        }
      },
      getOutput(i, j, m, brwTmp, buyTmp, bldTmp, val) {
        this.chartData.rows[m].output = +this.chartData.rows[m].borrow + +this.chartData.rows[m].buy + +this.chartData.rows[m].build;
        var total1 = brwTmp * +this.items[i].borrowCost;
        var total2 = buyTmp * +this.items[i].buyCost;
        var total3 = bldTmp * +this.items[i].buildCost;
        this.chartData.rows[j].cost = total1 + total2 + total3;
        for (var n = 0; n < this.chartData.rows.length; n++) {
          if (n < 1) {
            this.chartData.rows[n].tally = this.chartData.rows[n].output + this.chartData.rows[n].have;
          } else {
            this.chartData.rows[n].tally = this.chartData.rows[n].output + this.chartData.rows[n-1].tally;
          }
          this.chartData.rows[n].adjusted = this.chartData.rows[n].tally - this.chartData.rows[n].need;
        }
        this.$refs[`chart-${i}`].echarts.resize();
        // this.chartData.rows[m].tally = (this.chartData.rows[m].have - this.chartData.rows[m].need) + this.chartData.rows[m].output;
      },
      getRow(val) {
        axios.get(this.site + '/api/' + this.shortenv + '/open/estimates/' + val).then((response) => {
          this.chartData.rows = response.data.data;
          this.$nextTick(() => {
            this.drawChart();
          });
        });
      },
      actionChange(val) {
        console.log('action change', val);
      },
      drawChart() {
        // Init echart instance based on the rendered dom element
        let myChart = this.$echarts.init(document.getElementById('areaChart'));
        // let option = {
        //   series: [{
        //     type: 'treemap',
        //     data: []
        //   }]
        // };
        myChart.setOption();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .header-style {
    padding: .5rem 0;
    border-bottom: 1px solid #565656;
    &.firstcolumn {
      padding: 0 0 0 2%;
    }
  }
  .tablebody {
    padding: .5rem 0;
    border-top: 1px solid #565656;
  }
  .radiobutton {
    width: 8%;
    float: left;
  }
  .tableinset {
    padding: 1rem 0;
    margin: 0 0 0 4%;
    .bx--structured-list {
      margin-bottom: 1rem;
    }
  }
  .bx--form-item {
    max-width: 5rem;
  }
  .bx--structured-list-td {
    width: 10%;
  }

  .toggle-text {
    float: left;
    width: 10rem;
  }
</style>
