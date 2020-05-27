<template>
  <div id="Actuals2Targets" class="page-body">
    <div class="container">
      <PageheadNoTabs :title="title" :origin="'ISA'" />
      <main id="maincontent" class="page-content">
        <div class="bx--grid">
          <div class="bx--row">
            <cv-select v-model="yearFilter" class="year-filter" :label="'Select Year'" @change="fetchData">
              <cv-select-option value="">
                Current
              </cv-select-option>
              <cv-select-option value="2019">
                2019
              </cv-select-option>
            </cv-select>
          </div>
          <!-- SUMMARY TOTALS TITLE -->
          <div class="bx--row">
            <div class="bx--col">
              <div class="bx--type-productive-heading-03">
                Summary Totals
              </div>
              <p class="bx--type-helper-text-02 second-line">
                Summary totals are calculated from unique employees. Although one person may be enrolled in multiple programs, these totals will only count each person once.
              </p>
            </div>
          </div>
        </div>
        <!-- SUMMARY TOTALS CARDS -->
        <div class="bx--grid bx--grid--condensed">
          <div class="bx--row">
            <div class="bx--no-gutter-sm bx--col">
              <BanCard
                  :title="getTotal(tableDataCopy, 'upskillEnrolled').displayName"
                  :value="getTotal(tableDataCopy, 'upskillEnrolled').value"
                  :toggle-explanation="toggleSummaryExplanation"
                  :question="''"
                  :height="13"
              />
            </div>
            <div class="bx--no-gutter-sm bx--col">
              <BanCard
                  :title="getTotal(tableDataCopy, 'upskillCompleted').displayName"
                  :value="getTotal(tableDataCopy, 'upskillCompleted').value"
                  :toggle-explanation="toggleSummaryExplanation"
                  :question="''"
                  :height="13"
              />
            </div>
            <div class="bx--no-gutter-sm bx--col">
              <BanCard
                  :title="getTotal(tableDataCopy, 'reskillEnrolled').displayName"
                  :value="getTotal(tableDataCopy, 'reskillEnrolled').value"
                  :toggle-explanation="toggleSummaryExplanation"
                  :question="''"
                  :height="13"
              />
            </div>
            <div class="bx--no-gutter-sm bx--col">
              <BanCard
                  :title="getTotal(tableDataCopy, 'reskillCompleted').displayName"
                  :value="getTotal(tableDataCopy, 'reskillCompleted').value"
                  :toggle-explanation="toggleSummaryExplanation"
                  :question="''"
                  :height="13"
              />
            </div>
            <div class="bx--no-gutter-sm bx--col">
              <BanCard
                  :title="getTotal(tableDataCopy, 'totalInProgress').displayName"
                  :value="getTotal(tableDataCopy, 'totalInProgress').value"
                  :toggle-explanation="toggleSummaryExplanation"
                  :question="''"
                  :height="13"
              />
            </div>
          </div>
        </div>
        <!-- BEGIN THE GROUP LOOP -->
        <div v-for="(group, index) in groups" :key="index">
          <!-- GROUP SECTIONS TITLE -->
          <div class="bx--grid">
            <div class="bx--row">
              <div class="bx--col">
                <div class="bx--type-productive-heading-03 padtop2 padbot1">
                  {{ group.group }} Programs
                </div>
                <p v-if="group.showGroupExplanation" class="bx--type-helper-text-02 second-line">
                  {{ group.group }} totals are calculated from unique employees. Although one person may be enrolled in multiple programs, these totals will only count each person once.
                </p>
              </div>
            </div>
          </div>
          <!-- GROUP TOTALS BAN CARDS -->
          <div class="bx--grid bx--grid--condensed">
            <div class="bx--row">
              <div class="bx--no-gutter-sm bx--col">
                <BanCard
                    :title="getTotal(group, 'upskillEnrolled').displayName"
                    :value="getTotal(group, 'upskillEnrolled').value"
                    :group="group"
                    :toggle-explanation="toggleGroupExplanation"
                    :question="''"
                    :height="13"
                />
              </div>
              <div class="bx--no-gutter-sm bx--col">
                <BanCard
                    :title="getTotal(group, 'upskillCompleted').displayName"
                    :value="getTotal(group, 'upskillCompleted').value"
                    :group="group"
                    :toggle-explanation="toggleGroupExplanation"
                    :question="''"
                    :height="13"
                />
              </div>
              <div class="bx--no-gutter-sm bx--col">
                <BanCard
                    :title="getTotal(group, 'reskillEnrolled').displayName"
                    :value="getTotal(group, 'reskillEnrolled').value"
                    :group="group"
                    :toggle-explanation="toggleGroupExplanation"
                    :question="''"
                    :height="13"
                />
              </div>
              <div class="bx--no-gutter-sm bx--col">
                <BanCard
                    :title="getTotal(group, 'reskillCompleted').displayName"
                    :value="getTotal(group, 'reskillCompleted').value"
                    :group="group"
                    :toggle-explanation="toggleGroupExplanation"
                    :question="''"
                    :height="13"
                />
              </div>
              <div class="bx--no-gutter-sm bx--col">
                <BanCard
                    :title="getTotal(group, 'totalInProgress').displayName"
                    :value="getTotal(group, 'totalInProgress').value"
                    :columns="4"
                    :group="group"
                    :toggle-explanation="toggleGroupExplanation"
                    :question="''"
                    :height="13"
                />
              </div>
            </div>
            <!-- GROUP SELECTION BULLET CHARTS -->
            <div class="bx--row resource-card-group">
              <div class="bx--col">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile">
                    <div class="bx--type-productive-heading-01 card-title">
                      {{ getRow(group, group.selectedRow).SEGMENT_NAME }} {{ getRow(group, group.selectedRow).EFFORT }} Effort
                    </div>
                    <BulletNew
                        :title="'Enrolled'"
                        :outervalue="Number.parseInt(getRow(group, group.selectedRow).TARGET)"
                        :innervalue="Number.parseInt(getRow(group, group.selectedRow).VALIDATED_ENROLLED)"
                        :first="true"
                    />
                    <BulletNew
                        :title="'Completed'"
                        :outervalue="Number.parseInt(getRow(group, group.selectedRow).TARGET)"
                        :innervalue="Number.parseInt(getRow(group, group.selectedRow).VALIDATED_COMPLETED)"
                        :first="false"
                    />
                    <div v-show="group.showBulletExplanation" class="explanation">
                      <p v-if="group.selectedBulletExplanation === 'ENROLLED'">
                        For {{ getRow(group, group.selectedRow).SEGMENT_NAME }},
                        <em>Enrolled</em> is defined as enrolled in a curated learning plan built by the Services
                        Academy team.
                      </p>
                      <p v-if="group.selectedBulletExplanation === 'COMPLETED'">
                        For {{ getRow(group, group.selectedRow).SEGMENT_NAME }},
                        <em>Completed</em> is defined as completed a curated learning plan within the year.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- GROUP TABLE LIST -->
            <div class="bx--row">
              <cv-data-table :has-expand-all="true" :columns="columns">
                <template slot="data">
                  <cv-data-table-row v-for="(item, rowIndex) in group.rows" :key="rowIndex" :value="`${rowIndex}`">
                    <cv-data-table-cell>
                      <cv-radio-button :value="rowIndex.toString()" :checked="rowIndex === (group.selectedRow || 0)" @click="$set(group, 'selectedRow', rowIndex)" />
                    </cv-data-table-cell>
                    <cv-data-table-cell>
                      {{ item.SEGMENT_NAME }}
                    </cv-data-table-cell>
                    <cv-data-table-cell>
                      {{ item.EFFORT }}
                    </cv-data-table-cell>
                    <cv-data-table-cell>
                      {{ item.VALIDATED_INPROGRESS | ThousandPartitionFilter }}
                    </cv-data-table-cell>
                    <cv-data-table-cell>
                      {{ item.VALIDATED_COMPLETED | ThousandPartitionFilter }}
                    </cv-data-table-cell>
                    <cv-data-table-cell>
                      {{ item.VALIDATED_ENROLLED | ThousandPartitionFilter }}
                    </cv-data-table-cell>
                  </cv-data-table-row>
                </template>
              </cv-data-table>
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
    CvRadioButton,
    CvSelect,
    CvSelectOption
  } from '@carbon/vue/src';
  import moment from 'moment';
  import { mapGetters } from 'vuex';
  import axios from 'axios';

  export default {
    name: 'Actuals2Targets',
    components: {
      CvDataTable,
      CvDataTableRow,
      CvDataTableCell,
      CvRadioButton,
      CvSelect,
      CvSelectOption
    },
    props: {
      title: {
        type: String,
        default: 'Actuals To Targets'
      }
    },
    data() {
      return {
        yearFilter: '',
        showSummaryExplanation: false,
        tableTotalObjectData: {},
        columns: [
          '',
          'Program',
          'Effort',
          'In Progress',
          'Completed',
          'Total'
        ],
        totalData: [],
        tableData: [],
        tableDataCopy: []
      };
    },
    computed: {
      ...mapGetters([
        'usertoken',
        'groupTeam',
        'groupExecs',
        'groupAdmins',
        'groupDash',
        'groupOrg',
        'environment'
      ]),
      groups() {
        return this.tableDataCopy && this.tableDataCopy.groups || [];
      }
    },
    created() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        const filters = this.yearFilter ? `?year=${this.yearFilter}` : '';
        const response = await axios.get(`https://site-` + this.environment + `-api.domain.net/api/targets-model${filters}`);
        this.tableData = response.data.data;
        this.fetchTotal();
      },
       async fetchTotal() {
        const filters = this.yearFilter ? `?year=${this.yearFilter}` : '';
        const response = await axios.get(`https://site-` + this.environment + `-api.domain.net/api/targets/totals${filters}`);
        this.totalData = response.data.data;
        let totalSum = this.totalData.find(x => {
          return x.CATEGORY === 'SUMMARY TOTAL'
        })
        this.tableData.totals = {
                "upskillEnrolled": {
                  "displayName": "Total Upskill Enrolled",
                  "value": totalSum.TOTAL_UPSKILL_ENROLLED
                },
                "reskillEnrolled": {
                  "displayName": "Total Reskill Enrolled",
                  "value": totalSum.TOTAL_RESKILL_ENROLLED
                },
                "upskillCompleted": {
                  "displayName": "Total Upskill Completed",
                  "value": totalSum.TOTAL_UPSKILL_COMPLETED
                },
                "reskillCompleted": {
                  "displayName": "Total Reskill Completed",
                  "value": totalSum.TOTAL_RESKILL_COMPLETED
                },
                "totalInProgress": {
                  "displayName": "Total in Progress, by unique employees",
                  "value": totalSum.TOTAL_UPSKILL_INPROGRESS + totalSum.TOTAL_RESKILL_INPROGRESS
                }
              }
        this.refreshTotal()
      },
      refreshTotal() {
        this.tableData.groups.forEach(element => {
          this.totalData.forEach(ele => {
            if (element.group === ele.CATEGORY) {
              element.totals = {
                "upskillEnrolled": {
                  "displayName": "Total Upskill Enrolled",
                  "value": ele.TOTAL_UPSKILL_ENROLLED
                },
                "reskillEnrolled": {
                  "displayName": "Total Reskill Enrolled",
                  "value": ele.TOTAL_RESKILL_ENROLLED
                },
                "upskillCompleted": {
                  "displayName": "Total Upskill Completed",
                  "value": ele.TOTAL_UPSKILL_COMPLETED
                },
                "reskillCompleted": {
                  "displayName": "Total Reskill Completed",
                  "value": ele.TOTAL_RESKILL_COMPLETED
                },
                "totalInProgress": {
                  "displayName": "Total in Progress, by unique employees",
                  "value": ele.TOTAL_UPSKILL_INPROGRESS + ele.TOTAL_RESKILL_INPROGRESS
                }
              }
            }
          });
        });
        this.tableDataCopy=this.tableData
      },
      toggleBulletExplanation(group, type) {
        this.$set(group, 'showBulletExplanation',
          group.showBulletExplanation && type !== group.selectedBulletExplanation
            ? group.showBulletExplanation
            : !group.showBulletExplanation);
        this.$set(group, 'selectedBulletExplanation', type);
      },
      toggleSummaryExplanation() {
        this.showSummaryExplanation = !this.showSummaryExplanation;
      },
      toggleGroupExplanation(group) {
        this.$set(group, 'showGroupExplanation', !group.showGroupExplanation);
      },
      sum(field, effort) {
        return this.tableData
          .filter(t => t.EFFORT === effort)
          .map(element => element[field])
          .reduce((a, b) => a + b, 0);
      },
      getTotal(table, property) {
        // this method is used to eliminate 'undefined' errors when referencing the dataTable's Totals section
        return table && table.totals && table.totals[property] || {};
      },
      getRow(group, row) {
        // this method is used to eliminate 'undefined' errors when referencing the dataTable's Groups section
        const currentRow = row || 0;
        return group && group.rows[currentRow] || {};
      }
    },
    config: {
      'datestamp': moment().startOf('isoweek').format('YYYY-MM-DD'),
      highlightedSegment: 'MultiCloud - Red Hat',
      groupOrder: []
    }
  };

</script>

<style scoped lang='scss'>
  .year-filter {
    align-items: flex-end;
    margin-right: 0;
  }
</style>
