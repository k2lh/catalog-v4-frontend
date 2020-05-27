<template>
  <div id="TC2Offering" class="page-body">
    <div class="container">
      <PageheadTabs :title="'Time Contribution to the Business, All Segments'" :tabs="tabs" :origin="'ISA'" />
      <main id="maincontent" class="page-content">
        <div v-if="message" class="nologin bx--type-body-short-01">
          {{ message }}
        </div>
        <div v-else>
          <div class="bx--grid">
            <div class="bx--row">
              <div class="-col-md-2 padtop2">
                <ul>
                  <li v-for="(item, index) in items" :key="index">
                    <p class="bx--type-body-short-02">
                      {{ item.name }}
                    </p>
                    <ul>
                      <li v-for="(offering, oindex) in items[index].children" :key="oindex">
                        <p class="bx--type-body-short-02">
                          {{ offering.name }}
                        </p>
                        <ul>
                          <li v-for="(segment, sindex) in items[index].children[oindex].children" :key="sindex">
                            <p class="bx--type-body-short-02" :class="{ duplicate: segment.duplicate }">
                              {{ segment.segment }}
                            </p>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div class="-col-md-1"></div>
              <div class="-col-md-5">
                <v-table :data="flat" class="bx--data-table">
                  <thead slot="head" class="bx--data-table thead">
                    <tr class="bx--data-table">
                      <v-th sortKey="portfolio">
                        Portfolio
                      </v-th>
                      <v-th sortKey="offering">
                        Offering
                      </v-th>
                      <v-th sortKey="segment">
                        Segment
                      </v-th>
                    </tr>
                  </thead>
                  <tbody slot="body" slot-scope="{displayData}">
                    <tr v-for="row in displayData" :key="row.id" :class="{ duplicate2: row.duplicate }">
                      <td class="table-column category">
                        {{ row.portfolio }}
                      </td>
                      <td class="table-column category">
                        {{ row.offering }}
                      </td>
                      <td class="table-column category">
                        {{ row.segment }}
                      </td>
                    </tr>
                  </tbody>
                </v-table>
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
    name: 'TC3Segments',
    data: () => ({
      columns: ['Item'],
      tabs: [
        {
          name: 'Portfolios',
          link: 'TC2Portfolio',
          isActive: false
        },
        {
          name: 'Segments',
          link: 'TC2Segments',
          isActive: false
        },
        {
          name: 'Hierarchy',
          link: 'TC2Hierarchy',
          isActive: true
        }
      ],
      items: [],
      site: '',
      flat: [],
      message: '',
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
    },
    methods: {
      getData() {
        axios.get(this.site + '/api/' + this.shortenv + '/open/tree').then((response) => {
          this.items = response.data;
        });
        axios.get(this.site + '/api/' + this.shortenv + '/open/flat').then((response) => {
          this.flat = response.data;
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .duplicate {
    background-color: #5c5a5a;
  }
  .bx--type-body-short-02 {
    line-height: 2;
  }
  .duplicate2 td {
    background-color:#5c5a5a;
  }
</style>
