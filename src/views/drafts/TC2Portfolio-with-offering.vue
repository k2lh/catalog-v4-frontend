<template>
  <div id="TC2Portfolio" class="page-body">
    <div class="container">
      <PageheadNoTabs :title="title" :origin="'ISA'" />
      <main id="maincontent" class="page-content">
        <div v-if="message" class="nologin bx--type-body-short-01">
          {{ message }}
        </div>
        <div v-else>
          <div class="bx--grid">
            <div class="bx--row">
              <div class="bx--type-expressive-heading-03 padbot1">
                Portfolios, total
              </div>
              {{ totals1 }}
            </div>
            <div class="bx--row">
              <div class="bx--col bx--grid--condensed">
                <p class="bx--type-expressive-heading-02 marbot2 italics">
                  Investment
                </p>
                <p class="bx--type-expressive-heading-03 italics">
                  {{ formattedInvestment(totals.investment) }}
                </p>
              </div>
              <div class="bx--col bx--grid--condensed">
                <p class="bx--type-expressive-heading-02 marbot2 italics">
                  People Trained
                </p>
                <p class="bx--type-expressive-heading-03 italics">
                  {{ totals.capacity }}
                </p>
              </div>
              <div class="bx--col bx--grid--condensed">
                <p class="bx--type-expressive-heading-02 marbot2 italics">
                  NPS
                </p>
                <p class="bx--type-expressive-heading-02 italics">
                  {{ totals.nps }}
                </p>
              </div>
              <div class="bx--col bx--grid--condensed">
                <p class="bx--type-expressive-heading-02 marbot2 italics">
                  CLAIMs
                </p>
                <p class="bx--type-expressive-heading-03 italics">
                  <ArrowTrend v-if="totals.claimPercent !== 0" :value="totals.claimPercent" :text="(totals.claimPercent).toLocaleString('en-US', { style: 'percent' })" />
                  <span v-if="totals.claimPercent === 0">0%</span>
                </p>
                <p class="bx--type-expressive-heading-02">
                  {{ totals.claimActual }}
                </p>
              </div>
              <div class="bx--col bx--grid--condensed">
                <p class="bx--type-expressive-heading-02 marbot2">
                  Signings
                </p>
                <p class="bx--type-expressive-heading-03">
                  <ArrowTrend :value="totals.signingsPercent" :text="(totals.signingsPercent).toLocaleString('en-US', { style: 'percent' })" />
                  <span v-if="!totals.signingsPercent">0%</span>
                </p>
                <p class="bx--type-expressive-heading-02">
                  {{ totals.signingsCurrent }}
                </p>
              </div>
              <div class="bx--col bx--grid--condensed">
                <p class="bx--type-expressive-heading-02 marbot2">
                  Revenue
                </p>
                <p class="bx--type-expressive-heading-03">
                  <ArrowTrend :value="totals.revenuePercent" :text="(totals.revenuePercent).toLocaleString('en-US', { style: 'percent' })" />
                  <span v-if="!totals.revenuePercent">0%</span>
                </p>
                <p class="bx--type-expressive-heading-02">
                  {{ totals.revenueCurrent }}
                </p>
              </div>
              <div class="bx--col bx--grid--condensed">
                <p class="bx--type-expressive-heading-02 marbot2">
                  Revenue
                </p>
                <p class="bx--type-expressive-heading-03">
                  <ArrowTrend :value="totals.gpPercent" :text="(totals.gpPercent).toLocaleString('en-US', { style: 'percent' })" />
                  <span v-if="!totals.gpPercent">0%</span>
                </p>
                <p class="bx--type-expressive-heading-02">
                  {{ totals.gpCurrent }}
                </p>
              </div>
            </div>
            <div class="bx--row">
              <div class="bx--type-expressive-heading-03 padbot1 padtop2">
                Portfolios, breakdown
              </div>
            </div>
            <div class="bx--row">
              <div class="cv-content-switcher bx--content-switcher">
                <button type="button" class="cv-content-switcher-button bx--content-switcher-btn" :class="{ 'active': selected === 0 }" @click="say(0)">
                  <span class="bx--content-switcher__label">
                    All Data
                  </span>
                </button>
                <button type="button" class="cv-content-switcher-button bx--content-switcher-btn" :class="{ 'active': selected === 1 }" @click="say(1)">
                  <span class="bx--content-switcher__label">
                    Practictioner Data
                  </span>
                </button>
                <button type="button" class="cv-content-switcher-button bx--content-switcher-btn" :class="{ 'active': selected === 2 }" @click="say(2)">
                  <span class="bx--content-switcher__label">
                    Seller Data
                  </span>
                </button>
              </div>
            </div>
            <div class="bx--row">
              <div class="bx--col">
                <cv-data-table :has-expand-all="false" :columns="columns">
                  <template slot="data">
                    <cv-data-table-row v-for="(item, index) in portfolios" :key="index">
                      <cv-data-table-cell>
                        {{ item.portfolio }}
                      </cv-data-table-cell>
                      <cv-data-table-cell class=" italics">
                        {{ formattedInvestment(item.investment) }}
                      </cv-data-table-cell>
                      <cv-data-table-cell class=" italics">
                        {{ item.capacity }}
                      </cv-data-table-cell>
                      <cv-data-table-cell class=" italics">
                        {{ item.nps }}
                      </cv-data-table-cell>
                      <cv-data-table-cell class=" italics">
                        <ArrowTrend :value="item.claimPercent" :text="(item.claimPercent).toLocaleString('en-US', { style: 'percent' })" />
                        <div>{{ item.claimActual }}</div>
                      </cv-data-table-cell>
                      <cv-data-table-cell>
                        <div v-if="item.signingsPercent">
                          <ArrowTrend :value="item.signingsPercent" :text="(item.signingsPercent).toLocaleString('en-US', { style: 'percent' })" />
                          <div>{{ item.signingsActual }}</div>
                        </div>
                      </cv-data-table-cell>
                      <cv-data-table-cell>
                        <div v-if="item.revenuePercent">
                          <ArrowTrend :value="item.revenuePercent" :text="(item.revenuePercent).toLocaleString('en-US', { style: 'percent' })" />
                          <div>{{ item.revenueActual }}</div>
                        </div>
                      </cv-data-table-cell>
                      <cv-data-table-cell>
                        <div v-if="item.gpPercent">
                          <ArrowTrend :value="item.gpPercent" :text="(item.gpPercent).toLocaleString('en-US', { style: 'percent' })" />
                          <div>{{ item.gpActual }}</div>
                        </div>
                      </cv-data-table-cell>
                      <cv-data-table-cell class="see-details" />
                      <template slot="expandedContent">
                        <div class="bx--child-row-inner-container">
                          <div class="cv-data-table" style="width: 100%;">
                            <div class="bx--data-table-container">
                              <table class="bx--data-table">
                                <tbody class="no-head">
                                  <tr v-for="(offer, offerIndex) in offerings[item.portfolioid]" :key="offerIndex" class="cv-data-table-row-inner cv-data-table-row">
                                    <td class="fixed-width">
                                      {{ offer.offering }}
                                    </td>
                                    <td class=" italics">
                                      {{ formattedInvestment(offer.investment) }}
                                    </td>
                                    <td class=" italics">
                                      {{ offer.capacity }}
                                    </td>
                                    <td class=" italics">
                                      {{ offer.nps }}
                                    </td>
                                    <td class=" italics">
                                      <ArrowTrend :value="offer.claimPercent" :text="(offer.claimPercent).toLocaleString('en-US', { style: 'percent' })" />
                                      <div>{{ offer.claimActual }}</div>
                                    </td>
                                    <td>
                                      <div v-if="offer.signingsPercent">
                                        <ArrowTrend :value="offer.signingsPercent" :text="(offer.signingsPercent).toLocaleString('en-US', { style: 'percent' })" />
                                        <div>{{ offer.signingsActual }}</div>
                                      </div>
                                    </td>
                                    <td>
                                      <div v-if="offer.revenuePercent">
                                        <ArrowTrend :value="offer.revenuePercent" :text="(offer.revenuePercent).toLocaleString('en-US', { style: 'percent' })" />
                                        <div>{{ offer.revenueActual }}</div>
                                      </div>
                                    </td>
                                    <td>
                                      <div v-if="offer.gpPercent">
                                        <ArrowTrend :value="offer.gpPercent" :text="(offer.gpPercent).toLocaleString('en-US', { style: 'percent' })" />
                                        <div>{{ offer.gpActual }}</div>
                                      </div>
                                    </td>
                                    <td class="see-details">
                                      <router-link :to="{ name: 'TC2Offering', params: { unique: offer.offeringid, title: offer.offering } }">
                                        <svg width="16px" height="14px" viewBox="0 0 16 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                          <g id="arrow--right" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <path id="arrow" d="M9,10.9528066 L12.9049041,6.86267697 L14.3578275,8.23709091 L8.001373,15 L1.63544405,8.2376617 L3.08728668,6.86210618 L7,10.9539724 L7,-1 L9,-1 L9,10.9528066 Z" fill="#000000" fill-rule="nonzero" transform="translate(7.996636, 7.000000) rotate(-90.000000) translate(-7.996636, -7.000000)" />
                                          </g>
                                        </svg>
                                      </router-link>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </template>
                    </cv-data-table-row>
                  </template>
                </cv-data-table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
  import { CvDataTable, CvDataTableRow, CvContentSwitcher } from '@carbon/vue/src'
  import { mapGetters } from 'vuex'
  import axios from 'axios';

  export default {
    name: 'TC2Portfolio',
    props: {
      title: {
        type: String,
        default: 'Time Contribution to the Business, by Portfolio'
      },
      offeringid: {
        type: String,
        default: ''
      },
      portfolioid: {
        type: String,
        default: ''
      }
    },
    data: () => ({
      columns: ['Portfolio', '-Investment-', '-People Trained-', '-NPS-', 'CLAIMs', 'Signings', 'Revenue', 'GP', 'Details'],
      headers: ['-Investment-', '-People Trained-', '-NPS-', 'CLAIMs', 'Signings', 'Revenue', 'GP'],
      totals1: {},
      totals2: {},
      totals: {},
      portfolios1: [],
      portfolios2: [],
      portfolios: [],
      message: '',
      selected: 0,
      offerings: {
        ZZZmulticloudservices: [],
        traditionalservices: [],
        ibmlogoservices: [],
        multivendorservices: []
      },
      unified: [],
      merged: {}
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
      if (this.groupTeam || this.environment === 'local') {
        this.getTotals();
        this.getOfferings();
      } else if (!this.usertoken) {
        this.message = 'You must log in to view this page.';
      } else {
        this.message = 'You are not authorized to view this page. If you believe this message is in error, please create an access request.'
      };
    },
    methods: {
      getTotals() {
        axios.get('https://site-' + this.shortenv + '-api.domain.net/api/timecontribution/portfolios-raw').then((response) => {
          // this.totals = response.data.data.totals;
          this.portfolios = response.data.data.tables;
        });
      },
      getOfferings() {
        axios.get('https://site-' + this.shortenv + '-api.domain.net/api/timecontribution/all/segments').then((response) => {
        });
        // axios.get('https://site-' + this.shortenv + '-api.domain.net/api/timecontribution/offerings-raw').then((response) => {
        //   this.offerings = response.data.data;
        // });
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

<style scoped>
  .fixed-width {
    width: 21.25rem;
  }
  .bx--data-table td.fixed-width:first-of-type {
    padding-left: 2.5rem;
  }
  .tbody.no-head thead {
    display: none;
  }
  .see-details {
    width: 2rem;
  }
  path {
    stroke: #0062FF;
    fill: #0062FF;
  }
  tbody.no-head td {
      vertical-align: middle;
  }
  .bx--content-switcher {
    height: unset;
    margin-bottom: 1rem;
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
    .italics {
      font-style: italic;
      font-weight: 300;
    }
</style>
