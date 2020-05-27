<template>
  <div id="TimePfolio" class="page-body">
    <div class="container">
      <PageheadNoTabs :title="'Time Contribution to the Business Breakdown, by portfolio'" :origin="'ISA'" />
      <main id="maincontent" class="page-content">
        <div v-if="message" class="nologin bx--type-body-short-01">
          {{ message }}
        </div>
        <div v-else>
          <div class="bx--grid">
            <div class="bx--row">
              <div class="bx--type-expressive-heading-03 padbot1">
                <router-link :to="{ name: 'TimeAll', params: { unique: uniqueID } }">
                  <svg width="16px" height="14px" viewBox="0 0 16 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g id="arrow--left" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <path id="arrow" d="M9,10.9528066 L12.9049041,6.86267697 L14.3578275,8.23709091 L8.001373,15 L1.63544405,8.2376617 L3.08728668,6.86210618 L7,10.9539724 L7,-1 L9,-1 L9,10.9528066 Z" fill="#000000" fill-rule="nonzero" transform="translate(7.996636, 7.000000) rotate(90.000000) translate(-7.996636, -7.000000)" />
                    </g>
                  </svg>
                </router-link>
                Totals for {{ title }}
              </div>
            </div>
            <div class="bx--row">
              <div class="bx--col bx--grid--condensed">
                <p class="bx--type-expressive-heading-02 marbot2">
                  Investment
                </p>
                <p class="bx--type-expressive-heading-03">
                  {{ formattedInvestment(totals.investment) }}
                </p>
              </div>
              <div class="bx--col bx--grid--condensed">
                <p class="bx--type-expressive-heading-02 marbot2">
                  People Trained (cost-only)
                </p>
                <p class="bx--type-expressive-heading-03">
                  {{ totals.capacity | numFormat }}
                </p>
              </div>
              <div class="bx--col bx--grid--condensed">
                <p class="bx--type-expressive-heading-02 marbot2">
                  CLAIM
                </p>
                <p class="bx--type-expressive-heading-03">
                  <ArrowTrend v-if="totals.claimPercent !== 0" :value="totals.claimPercent" :text="(totals.claimPercent/100).toLocaleString('en-US', { style: 'percent' })" />
                  <span v-if="totals.claimPercent === 0">0%</span>
                </p>
                <p class="bx--type-expressive-heading-02">
                  {{ totals.claimActual | numFormat }}
                </p>
              </div>
              <div class="bx--col bx--grid--condensed">
                <p class="bx--type-expressive-heading-02 marbot2">
                  Signings
                </p>
                <p class="bx--type-expressive-heading-03">
                  <ArrowTrend :value="totals.signingsPercent" :text="(totals.signingsPercent/100).toLocaleString('en-US', { style: 'percent' })" />
                  <span v-if="!totals.signingsPercent">0%</span>
                </p>
                <p class="bx--type-expressive-heading-02">
                  {{ totals.signingsCurrent | numFormat }}
                </p>
              </div>
              <div class="bx--col bx--grid--condensed">
                <p class="bx--type-expressive-heading-02 marbot2">
                  Revenue
                </p>
                <p class="bx--type-expressive-heading-03">
                  <ArrowTrend :value="totals.revenuePercent" :text="(totals.revenuePercent/100).toLocaleString('en-US', { style: 'percent' })" />
                  <span v-if="!totals.revenuePercent">0%</span>
                </p>
                <p class="bx--type-expressive-heading-02">
                  {{ totals.revenueCurrent | numFormat }}
                </p>
              </div>
              <div class="bx--col bx--grid--condensed">
                <p class="bx--type-expressive-heading-02 marbot2">
                  GP/Margin
                </p>
                <p class="bx--type-expressive-heading-03">
                  <ArrowTrend :value="totals.gpPercent" :text="(totals.gpPercent/100).toLocaleString('en-US', { style: 'percent' })" />
                  <span v-if="!totals.gpPercent">0%</span>
                </p>
                <p class="bx--type-expressive-heading-02">
                  {{ totals.gpCurrent | numFormat }}
                </p>
              </div>
            </div>
            <div class="bx--row">
              <div class="bx--type-expressive-heading-03 padbot1 padtop2">
                {{ title }}, breakdown
              </div>
            </div>
            <div class="bx--row">
              <v-table :data="offerings" class="bx--data-table">
                <thead slot="head" class="bx--data-table thead">
                  <tr class="bx--data-table">
                    <v-th sortKey="offering">
                      Offering
                    </v-th>
                    <v-th sortKey="investment">
                      Investment
                    </v-th>
                    <v-th sortKey="capacity">
                      People Trained
                    </v-th>
                    <v-th sortKey="nps">
                      NPS
                    </v-th>
                    <v-th sortKey="claim">
                      CLAIM
                    </v-th>
                    <v-th sortKey="signings">
                      Signings
                    </v-th>
                    <v-th sortKey="revenue">
                      Revenue
                    </v-th>
                    <v-th sortKey="gp">
                      Gross Profit
                    </v-th>
                    <th>
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody slot="body" slot-scope="{displayData}">
                  <tr v-for="row in displayData" :key="row.id">
                    <td>
                      {{ row.offering }}
                    </td>
                    <td>
                      {{ formattedInvestment(row.investment) }}
                    </td>
                    <td>
                      {{ row.capacity | numFormat }}
                    </td>
                    <td>
                      {{ row.nps }}
                    </td>
                    <td>
                      <ArrowTrendTable v-if="row.claimPercent" :value="row.claimPercent" :text="(row.claimPercent/100).toLocaleString('en-US', { style: 'percent' })" />
                      <div>{{ row.claimActual | numFormat }}</div>
                    </td>
                    <td>
                      <ArrowTrendTable v-if="item.signingsPercent" :value="item.signingsPercent" :text="(item.signingsPercent/100).toLocaleString('en-US', { style: 'percent' })" />
                      <div>{{ item.signingsCurrent | numFormat }}</div>
                    </td>
                    <td>
                      <ArrowTrendTable v-if="item.revenuePercent" :value="item.revenuePercent" :text="(item.revenuePercent/100).toLocaleString('en-US', { style: 'percent' })" />
                      <div>{{ item.revenueCurrent | numFormat }}</div>
                    </td>
                    <td>
                      <ArrowTrendTable v-if="item.gpPercent" :value="item.gpPercent" :text="(item.gpPercent/100).toLocaleString('en-US', { style: 'percent' })" />
                      <div>{{ item.gpCurrent | numFormat }}</div>
                    </td>
                    <td class="table-column details">
                      <router-link :to="{ name: 'TimeOffer', params: { unique: row.oname } }">
                        <svg width="16px" height="14px" viewBox="0 0 16 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                          <g id="arrow--right" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <path id="arrow" d="M9,10.9528066 L12.9049041,6.86267697 L14.3578275,8.23709091 L8.001373,15 L1.63544405,8.2376617 L3.08728668,6.86210618 L7,10.9539724 L7,-1 L9,-1 L9,10.9528066 Z" fill="#000000" fill-rule="nonzero" transform="translate(7.996636, 7.000000) rotate(-90.000000) translate(-7.996636, -7.000000)" />
                          </g>
                        </svg>
                      </router-link>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import axios from 'axios';

  export default {
    name: 'TimePfolio',
    props: {
      unique: {
        type: String,
        default: ''
      }
    },
    data: () => ({
      tabs: [
        {
          name: 'Breakdowns',
          link: '../TimeAll',
          isActive: true
        },
        {
          name: 'Hierarchy',
          link: '../TC2Hierarchy',
          isActive: false
        }
      ],
      totals: {},
      portfolios: [],
      offerings: [],
      message: '',
      title: 'placeholder'
    }),
    computed: mapGetters([
      'usertoken',
      'groupTeam',
      'groupExecs',
      'shortenv',
      'groupAdmins',
      'environment'
    ]),
    created() {
      if ((this.unique === '') || (this.unique === 'undefined')) {
        this.uniqueID = this.getUnique();
      } else {
        this.uniqueID = this.unique;
      };
      console.log(this.uniqueID);
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
      getUnique: function() {
        var res = this.$route.path.split('/');
        var uniqueID = res[3];
        return uniqueID;
      },
      getData() {
        axios.get('https://site-' + this.shortenv + '-api.domain.net/api/timecontribution/raw/offerings').then((response) => {
        });

        axios.get('https://site-' + this.shortenv + '-api.domain.net/api/timecontribution/portfolios/' + this.uniqueID).then((response) => {
          this.totals = response.data.data.tables;
          this.title = this.totals.portfolio;
        });
        axios.get('https://site-' + this.shortenv + '-api.domain.net/api/timecontribution/offerings/' + this.uniqueID).then((response) => {
          this.offerings = response.data.data;
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
      }
    }
  }
</script>

<style lang="scss" scoped>
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

  .table-column {
    width: 10%;
    &.category {
      width: 23%;
    }
    &.invest {
      width: 13%;
    }
    &.details {
      width: 3%;
    }
    &.table-expanded {
      width: 9%;
      &.category {
        width: 21%;
      }
      &.invest {
        width: 11%;
      }
      &.details {
        width: 4%;
      }
    }
  }

</style>
