<template>
  <div id="TimeOverviewDrill" class="page-body">
    <div class="container">
      <PageheadTabs :title="'Time Contribution to the Business (overview)'" :tabs="tabs" :origin="'ISA'" />
      <main id="maincontent" class="page-content">
        <div v-if="message" class="nologin bx--type-body-short-01">
          {{ message }}
        </div>
        <div v-else>
          <div class="bx--grid">
            <div class="bx--row">
              <div class="bx--type-expressive-heading-02 padbot1">
                This table shows 2019 YTD data.
              </div>
            </div>
            <div class="bx--row">
              <v-table :data="segments" class="bx--data-table">
                <thead slot="head" class="bx--data-table thead">
                  <tr class="bx--data-table">
                    <v-th sortKey="investment" defaultSort="desc">
                      Investment
                    </v-th>
                    <v-th sortKey="segment">
                      Segment
                    </v-th>
                    <v-th sortKey="nps">
                      NPS
                    </v-th>
                    <v-th sortKey="capacity">
                      Capacity
                    </v-th>
                    <v-th sortKey="portfolio">
                      Offerings
                    </v-th>
                    <v-th sortKey="signingsPercent">
                      Signings
                    </v-th>
                    <v-th sortKey="revenuePercent">
                      Revenue
                    </v-th>
                    <v-th sortKey="gpPercent">
                      Gross Profit
                    </v-th>
                  </tr>
                </thead>
                <tbody slot="body" slot-scope="{displayData}">
                  <tr v-for="row in displayData" :key="row.id">
                    <td class="table-column invest">
                      ${{ row.investment | numFormat }}
                    </td>
                    <td class="table-column segment">
                      {{ row.segment }}
                    </td>
                    <td class="table-column nps">
                      {{ row.nps }}
                    </td>
                    <td class="table-column capacity">
                      <span v-if="row.capacity">
                        {{ row.capacity | numFormat }}
                      </span>
                    </td>
                    <td class="table-column portfolio">
                      {{ row.portfolio }}
                    </td>
                    <td class="table-column signings">
                      <ArrowTrendTable v-if="row.signingsPercent" :value="row.signingsPercent" :text="(row.signingsPercent/100).toLocaleString('en-US', { style: 'percent' })" />
                    </td>
                    <td class="table-column revenue">
                      <ArrowTrendTable v-if="row.revenuePercent" :value="row.revenuePercent" :text="(row.revenuePercent/100).toLocaleString('en-US', { style: 'percent' })" />
                    </td>
                    <td class="table-column profit">
                      <ArrowTrendTable v-if="row.gpPercent" :value="row.gpPercent" :text="(row.gpPercent/100).toLocaleString('en-US', { style: 'percent' })" />
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </div>
            <div class="bx--row">
              <table class="bx--data-table">
                <tbody>
                  <tr>
                    <td class="table-column invest finalrow">
                      ${{ totalmain.investment | numFormat }}
                    </td>
                    <td class="table-column segment finalrow">
                      {{ totalmain.tssis }}
                    </td>
                    <td class="table-column nps finalrow">
                      {{ totalmain.nps }}
                    </td>
                    <td class="table-column capacity finalrow">
                      <span v-if="totalmain.capacity">
                        {{ totalmain.capacity | numFormat }}
                      </span>
                    </td>
                    <td class="table-column portfolio finalrow">
                      {{ totalmain.portfolio }}
                    </td>
                    <td class="table-column signings finalrow">
                      <!-- {{ formattedInvestment(totalmain.signingsCurrent) }} -->
                    </td>
                    <td class="table-column revenue finalrow">
                      <!-- {{ formattedInvestment(totalmain.revenueCurrent) }} -->
                    </td>
                    <td class="table-column profit finalrow">
                      <!-- {{ formattedInvestment(totalmain.gpCurrent) }} -->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- ADDITIONAL TABLE -->
            <div class="bx--row padtop2">
              <table class="bx--data-table">
                <tbody>
                  <tr v-for="(item, index) in additional" :key="index">
                    <td class="table-column invest">
                      ${{ item.investment | numFormat }}
                    </td>
                    <td class="table-column segment">
                      {{ item.segment }}
                    </td>
                    <td class="table-column nps">
                      {{ item.nps }}
                    </td>
                    <td class="table-column capacity">
                      <span v-if="item.capacity">
                        {{ item.capacity | numFormat }}
                      </span>
                    </td>
                    <td class="table-column portfolio">
                      <!-- {{ item.portfolio }} -->
                    </td>
                    <td class="table-column signings">
                      <ArrowTrendTable v-if="item.signingsPercent" :value="item.signingsPercent" :text="(item.signingsPercent/100).toLocaleString('en-US', { style: 'percent' })" />
                    </td>
                    <td class="table-column revenue">
                      <ArrowTrendTable v-if="item.revenuePercent" :value="item.revenuePercent" :text="(item.revenuePercent/100).toLocaleString('en-US', { style: 'percent' })" />
                    </td>
                    <td class="table-column profit">
                      <ArrowTrendTable v-if="item.gpPercent" :value="item.gpPercent" :text="(item.gpPercent/100).toLocaleString('en-US', { style: 'percent' })" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="bx--row">
              <table class="bx--data-table">
                <tbody>
                  <tr>
                    <td class="table-column invest finalrow">
                      ${{ totalextra.investment | numFormat }}
                    </td>
                    <td class="table-column segment finalrow">
                      {{ totalextra.tssis }}
                    </td>
                    <td class="table-column nps finalrow">
                      {{ totalextra.nps }}
                    </td>
                    <td class="table-column capacity finalrow">
                      <span v-if="totalextra.capacity">
                        {{ totalextra.capacity | numFormat }}
                      </span>
                    </td>
                    <td class="table-column portfolio finalrow">
                      {{ totalextra.portfolio }}
                    </td>
                    <td class="table-column signings finalrow">
                      <!-- {{ formattedInvestment(totalextra.signingsCurrent) }} -->
                    </td>
                    <td class="table-column revenue finalrow">
                      <!-- {{ formattedInvestment(totalextra.revenueCurrent) }} -->
                    </td>
                    <td class="table-column profit finalrow">
                      <!-- {{ formattedInvestment(totalextra.gpCurrent) }} -->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="bx--row padtop2">
              <table class="bx--data-table">
                <tbody>
                  <tr>
                    <td class="table-column invest finalrow">
                      ${{ totalall.investment | numFormat }}
                    </td>
                    <td class="table-column segment finalrow">
                      {{ totalall.tssis }}
                    </td>
                    <td class="table-column nps finalrow">
                      {{ totalall.nps }}
                    </td>
                    <td class="table-column capacity finalrow">
                      <span v-if="totalall.capacity">
                        {{ totalall.capacity | numFormat }}
                      </span>
                    </td>
                    <td class="table-column portfolio finalrow">
                      {{ totalall.portfolio }}
                    </td>
                    <td class="table-column signings finalrow">
                      <!-- {{ formattedInvestment(totalall.signingsCurrent) }} -->
                    </td>
                    <td class="table-column revenue finalrow">
                      <!-- {{ formattedInvestment(totalall.revenueCurrent) }} -->
                    </td>
                    <td class="table-column profit finalrow">
                      <!-- {{ formattedInvestment(totalall.gpCurrent) }} -->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
  import { CvContentSwitcher } from '@carbon/vue/src'
  import { mapGetters } from 'vuex'
  import axios from 'axios';

  export default {
    name: 'TimeOverviewDrill',
    props: {
      unique: {
        type: String,
        default: ''
      }
    },
    data: () => ({
      columns: ['Investment', 'Segment', 'People Trained', 'Cost/person', 'NPS', 'Signings', 'Revenue', 'GP', 'Details'],
      tabs: [
        {
          name: 'By Offering',
          link: 'TimeOverviewMain',
          isActive: false
        },
        {
          name: 'By Segment',
          link: 'TimeOverviewDrill',
          isActive: true
        }
      ],
      totalall: {},
      totalmain: {},
      totalextra: {},
      segments: [],
      additional: [],
      chartHeight: '300px',
      message: '',
      selected: 0,
      title: ''
    }),
    computed: mapGetters([
      'usertoken',
      'groupTeam',
      'groupExecs',
      'groupAdmins',
      'shortenv',
      'environment'
    ]),
    mounted() {
      if (this.groupTeam || this.groupAdmins || this.environment === 'local') {
        this.getData();
      } else if (!this.usertoken) {
        this.message = 'You must log in to view this page.';
      } else {
        this.message = 'You are not authorized to view this page. If you believe this message is in error, please create an access request.'
      };
    },
    methods: {
      getData() {
        axios.get('https://site-' + this.shortenv + '-api.domain.net/api/timecontribution/all/segments').then((response) => {
          this.totalall = response.data.data[0].totals.all;
          this.totalmain = response.data.data[0].totals.main;
          this.totalextra = response.data.data[0].totals.extra;
          this.segments = response.data.data[0].tables.main;
          this.additional = response.data.data[0].tables.extra;
        });
        axios.get('https://site-' + this.shortenv + '-api.domain.net/api/timecontribution/raw/segments').then((response) => {
        });
      },
      formattedInvestment(value) {
        return `${(value / 1000).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} K`
      },
      npsScore(before, after) {
        return before !== 0 && after !== 0 ? (after/before)-1 : 0
      },
      toggleSummaryExplanation() {
        this.showSummaryExplanation = !this.showSummaryExplanation;
      },
      say(value) {
        this.selected = value;
        if (this.groupTeam || this.environment === 'local') {
          if (value === 2) {
            this.getTablesSell();
          } else if (value === 1) {
            this.getTablesPractice();
          } else {
            this.getOfferings();
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  path {
    stroke: #0062FF;
    fill: #0062FF;
  }
  .bx--col.bx--grid--condensed {
      border: 1px solid red;
      padding: 1rem;
      margin: 0 2px 1rem 2px;
      color: #fff;
      background-color: #333 !important;
      width: 100%;
      box-shadow: 0 1px 2px 0 rgba(0,0,0,0.1);
      border-color: #171717;
      border-style: solid;
      border-width: 1px;
  }
  .table-column {
    vertical-align: middle;
    width: 9%;
    &.invest {
      text-align: right;
      padding: 0 2rem;
    }
    &.invest,
    &.signings,
    &.revenue,
    &.profit {
      width: 11%;
    }
    &.segment,
    &.portfolio {
      width: 14%;
    }
    &.capacity
    &.nps,
    &.claim {
    }
    &.finalrow {
      font-weight: 600;
      font-size: 110%;
      border-top: 3px double;
    }
  }
</style>
