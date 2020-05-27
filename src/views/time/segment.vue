<template>
  <div id="TimeSeg" class="page-body">
    <div class="container">
      <PageheadNoTabs :title="'Time Contribution to the Business Breakdown, by segment'" :origin="'ISA'" />
      <main id="maincontent" class="page-content">
        <div v-if="message" class="nologin bx--type-body-short-01">
          {{ message }}
        </div>
        <div v-else>
          <div class="bx--grid">
            <div class="bx--row">
              <div class="bx--type-expressive-heading-03 padbot1">
                <router-link :to="{ name: 'TimePfolio', params: { unique: uniqueID } }">
                  <svg width="16px" height="14px" viewBox="0 0 16 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g id="arrow--left" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <path id="arrow" d="M9,10.9528066 L12.9049041,6.86267697 L14.3578275,8.23709091 L8.001373,15 L1.63544405,8.2376617 L3.08728668,6.86210618 L7,10.9539724 L7,-1 L9,-1 L9,10.9528066 Z" fill="#000000" fill-rule="nonzero" transform="translate(7.996636, 7.000000) rotate(90.000000) translate(-7.996636, -7.000000)" />
                    </g>
                  </svg>
                </router-link>
                {{ title }} Totals
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
                  People Trained
                </p>
                <p class="bx--type-expressive-heading-03">
                  {{ totals.capacity | numFormat }}
                </p>
              </div>
              <div class="bx--col bx--grid--condensed">
                <p class="bx--type-expressive-heading-02 marbot2">
                  CLAIMs
                </p>
                <p class="bx--type-expressive-heading-03">
                  <ArrowTrend v-if="totals.claimPercent" :value="totals.claimPercent" :text="(totals.claimPercent/100).toLocaleString('en-US', { style: 'percent' })" />
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
                  <ArrowTrend v-if="totals.signingsPercent" :value="totals.signingsPercent" :text="(totals.signingsPercent/100).toLocaleString('en-US', { style: 'percent' })" />
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
                  <ArrowTrend v-if="totals.revenuePercent" :value="totals.revenuePercent" :text="(totals.revenuePercent/100).toLocaleString('en-US', { style: 'percent' })" />
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
                  <ArrowTrend v-if="totals.gpPercent" :value="totals.gpPercent" :text="(totals.gpPercent/100).toLocaleString('en-US', { style: 'percent' })" />
                  <span v-if="!totals.gpPercent">0%</span>
                </p>
                <p class="bx--type-expressive-heading-02">
                  {{ totals.gpCurrent | numFormat }}
                </p>
              </div>
            </div>
            <div class="bx--row">
              <div class="bx--type-expressive-heading-03 padbot1 padtop2">
                All Segments in {{ title }}
              </div>
            </div>
            <div class="bx--row">
              <v-table :data="segments" class="bx--data-table">
                <thead slot="head" class="bx--data-table thead">
                  <tr class="bx--data-table">
                    <th colspan="5" class="bordered"></th>
                    <th colspan="4" class="centered bordered">
                      Mapped
                    </th>
                    <th colspan="4" class="centered bordered">
                      Not Mapped
                    </th>
                    <th></th>
                  </tr>
                  <tr class="bx--data-table">
                    <v-th sortKey="segment">
                      Segment
                    </v-th>
                    <v-th sortKey="investment">
                      Investment
                    </v-th>
                    <v-th sortKey="capacity">
                      People Trained
                    </v-th>
                    <v-th sortKey="cost">
                      Cost/person
                    </v-th>
                    <v-th sortKey="nps" class="bordered">
                      NPS
                    </v-th>
                    <v-th sortKey="mapCount">
                      Count
                    </v-th>
                    <v-th sortKey="mapAvgBefore">
                      Avg Hrs, before
                    </v-th>
                    <v-th sortKey="mapChange">
                      Change
                    </v-th>
                    <v-th sortKey="mapAvgAfter" class="bordered">
                      Avg Hrs, after
                    </v-th>
                    <v-th sortKey="notmapCount">
                      Count
                    </v-th>
                    <v-th sortKey="notmapAvgBefore">
                      Avg Hrs, before
                    </v-th>
                    <v-th sortKey="notmapChange">
                      Change
                    </v-th>
                    <v-th sortKey="notmapAvgAfter" class="bordered">
                      Avg Hrs, after
                    </v-th>
                    <th></th>
                  </tr>
                </thead>
                <tbody slot="body" slot-scope="{displayData}">
                  <tr v-for="row in displayData" :key="row.id">
                    <td class="table-column category">
                      {{ row.segment }}
                      <div class="bx--type-helper-text-01">
                        {{ row.offering }}
                      </div>
                    </td>
                    <td class="table-column wider">
                      {{ formattedInvestment(row.investment) }}
                    </td>
                    <td class="table-column wider">
                      {{ row.capacity | numFormat }}
                    </td>
                    <td class="table-column wider">
                      ${{ row.cost | numFormat }}
                    </td>
                    <td class="table-column wider bordered">
                      {{ row.nps }}
                    </td>
                    <td class="table-column middle">
                      {{ row.mapCount }}
                    </td>
                    <td class="table-column middle">
                      {{ row.mapAvgBefore }}
                    </td>
                    <td class="table-column middle">
                      <ArrowTrendTable v-if="row.mapChange" :value="row.mapChange" :text="(row.mapChange).toLocaleString('en-US', { style: 'percent' })" />
                    </td>
                    <td class="table-column middle bordered">
                      {{ row.mapAvgAfter }}
                    </td>
                    <td class="table-column middle">
                      {{ row.notmapCount }}
                    </td>
                    <td class="table-column middle">
                      {{ row.notmapAvgBefore }}
                    </td>
                    <td class="table-column middle">
                      <ArrowTrendTable v-if="row.notmapChange" :value="row.notmapChange" :text="(row.notmapChange).toLocaleString('en-US', { style: 'percent' })" />
                    </td>
                    <td class="table-column middle bordered">
                      {{ row.notmapAvgAfter }}
                    </td>
                    <td class="table-column details centered">
                      <!-- <router-link :to="{ name: 'TC2Segment', params: { unique: row.sname, title: row.segment } }">
                        <svg width="16px" height="14px" viewBox="0 0 16 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                          <g id="arrow--right" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <path id="arrow" d="M9,10.9528066 L12.9049041,6.86267697 L14.3578275,8.23709091 L8.001373,15 L1.63544405,8.2376617 L3.08728668,6.86210618 L7,10.9539724 L7,-1 L9,-1 L9,10.9528066 Z" fill="#000000" fill-rule="nonzero" transform="translate(7.996636, 7.000000) rotate(-90.000000) translate(-7.996636, -7.000000)" />
                          </g>
                        </svg>
                      </router-link> -->
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
    name: 'TimeSeg',
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
      totals: [],
      segments: [],
      message: '',
      uniqueID: '',
      title: '',
      maps: {}
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
        axios.get('https://site-' + this.shortenv + '-api.domain.net/api/timecontribution/offerings/' + this.uniqueID).then((response) => {
          this.totals = response.data.data;
          this.title = this.totals.portfolio;
        });
        axios.get('https://site-' + this.shortenv + '-api.domain.net/api/timecontribution/segments-maps').then((response) => {
          this.maps = response.data.data;
          axios.get('https://site-' + this.shortenv + '-api.domain.net/api/timecontribution/segments/' + this.uniqueID).then((response) => {
            this.segments = response.data.data;
          });
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

</style>
