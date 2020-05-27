<template>
  <div id="TimeOverviewMain" class="page-body">
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
              <v-table :data="portfolios" class="bx--data-table">
                <thead slot="head" class="bx--data-table thead">
                  <tr class="bx--data-table">
                    <v-th sortKey="investment">
                      Investment
                    </v-th>
                    <v-th sortKey="tssis">
                      Segment
                    </v-th>
                    <v-th sortKey="nps">
                      NPS
                    </v-th>
                    <!-- <v-th sortKey="claimActual">
                      CLAIM
                    </v-th> -->
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
                    <td class="table-column tssis">
                      {{ row.tssis }}
                    </td>
                    <td class="table-column nps">
                      {{ row.nps }}
                    </td>
                    <!-- <td class="table-column claim">
                      <ArrowTrendTable v-if="row.claimPercent" :value="row.claimPercent" :text="(row.claimPercent/100).toLocaleString('en-US', { style: 'percent' })" />
                    </td> -->
                    <td class="table-column capacity">
                      {{ row.capacity | numFormat }}
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
                      ${{ total.investment | numFormat }}
                    </td>
                    <td class="table-column tssis finalrow">
                      {{ total.tssis }}
                    </td>
                    <td class="table-column nps finalrow">
                      {{ total.nps }}
                    </td>
                    <!-- <td class="table-column claim finalrow">
                      <ArrowTrendTable v-if="total.claimPercent" :value="total.claimPercent" :text="(total.claimPercent/100).toLocaleString('en-US', { style: 'percent' })" />
                    </td> -->
                    <td class="table-column capacity finalrow">
                      {{ total.capacity | numFormat }}
                    </td>
                    <td class="table-column portfolio finalrow">
                      {{ total.portfolio }}
                    </td>
                    <td class="table-column signings finalrow">
                      <span v-if="total.signingsCurrent">
                        ${{ total.signingsCurrent | numFormat }}
                      </span>
                      <!-- <ArrowTrendTable v-if="total.signingsPercent" :value="total.signingsPercent" :text="(total.signingsPercent/100).toLocaleString('en-US', { style: 'percent' })" /> -->
                    </td>
                    <td class="table-column revenue finalrow">
                      <span v-if="total.revenueCurrent">
                        ${{ total.revenueCurrent | numFormat }}
                      </span>
                      <!-- <ArrowTrendTable v-if="total.revenuePercent" :value="total.revenuePercent" :text="(total.revenuePercent/100).toLocaleString('en-US', { style: 'percent' })" /> -->
                    </td>
                    <td class="table-column profit finalrow">
                      <span v-if="total.gpCurrent">
                        ${{ total.gpCurrent | numFormat }}
                      </span>
                      <!-- <ArrowTrendTable v-if="total.gpPercent" :value="total.gpPercent" :text="(total.gpPercent/100).toLocaleString('en-US', { style: 'percent' })" /> -->
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
    name: 'TimeOverviewMain',
    data: () => ({
      columns: ['Investment', 'Offering', 'People Trained', 'NPS', 'Signings', 'Revenue', 'GP', 'Details'],
      tabs: [
        {
          name: 'By Offering',
          link: 'TimeOverviewMain',
          isActive: true
        },
        {
          name: 'By Segment',
          link: 'TimeOverviewDrill',
          isActive: false
        }
      ],
      total: {},
      portfolios: [],
      portfolioSorted: [],
      offerings: [],
      message: '',
      selected: 0
    }),
    computed: {
      ...mapGetters([
        'usertoken',
        'groupTeam',
        'groupExecs',
        'groupAdmins',
        'shortenv',
        'environment'
      ])
    },
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
        axios.get('https://site-' + this.shortenv + '-api.domain.net/api/timecontribution/all/portfolios').then((response) => {
          this.portfolios = response.data.data.tables;
          this.total = response.data.data.total;
        });
        axios.get('https://site-' + this.shortenv + '-api.domain.net/api/timecontribution/raw/portfolios').then((response) => {
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
  .nologin {
    color: white;
    margin-left: 2rem;
  }
  .fixed-width {
    width: 21.25rem;
  }

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
  .marbot2 {
    margin-bottom: 2rem;
  }
  .italics {
    font-style: italic;
  }
  .bx--content-switcher {
    height: unset;
    margin-bottom: 1rem;
    .bx--content-switcher-btn {
    outline: 2px solid transparent;
    outline-offset: -2px;
    text-decoration: none;
    border: none;
    background-color: #262626;
    color: #fff;
    }
    .bx--content-switcher-btn.active {
      color: #393939;
      background-color: #f4f4f4;
      z-index: 3;
    }
    .bx--content-switcher-btn:hover {
      background-color: #e5e5e5;
      color: #161616;
      z-index: 3;
    }
    .bx--content-switcher-btn:not(:first-of-type):before {
      background-color: transparent;
    }
  }

  .bx--data-table td.fixed-width[data-v-c314100e]:first-of-type {
    padding-left: 2rem;
  }

  tr.bx--parent-row.bx--expandable-row+tr[data-child-row] td .bx--child-row-inner-container {
    padding: 0 0 0 .75rem;
  }

  .bx--data-table th, .bx--data-table td {
    vertical-align: middle;
  }

// .right-side {
//   text-align: right;
//   span {
//     padding-right: 40%;
//   }
// }

  .table-column {
    vertical-align: middle;
    width: 9%;
    &.invest {
      text-align: right;
      padding: 0 2rem;
      width: 12%;
    }
    &.signings,
    &.revenue,
    &.profit {
      width: 12%;
    }
    &.portfolio {
      width: 18%;
    }
    &.capacity
    &.tssis,
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
