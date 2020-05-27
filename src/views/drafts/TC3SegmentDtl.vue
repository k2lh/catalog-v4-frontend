<template>
  <div id="TC3SegmentDtl" class="page-body">
    <div class="container">
      <PageheadNoTabs :title="title" :origin="'ISA'" />
      <main id="maincontent" class="page-content">
        <div v-if="message" class="nologin bx--type-body-short-01">
          {{ message }}
        </div>
        <div v-else>
          <div class="bx--grid">
            <div class="bx--row">
              <div class="bx--col">
                <cv-data-table :has-expand-all="true" :columns="columns">
                  <template slot="data">
                    <cv-data-table-row v-for="(item, index) in segments" :key="index">
                      <cv-data-table-cell>
                        {{ item.mapped }}
                      </cv-data-table-cell>
                      <cv-data-table-cell>
                        {{ item.name }}
                      </cv-data-table-cell>
                      <cv-data-table-cell>
                        {{ item.count }}
                      </cv-data-table-cell>
                      <cv-data-table-cell>
                        {{ item.before }}
                      </cv-data-table-cell>
                      <cv-data-table-cell>
                        <ArrowTrend :value="item.change" :text="(item.change).toLocaleString('en-US', { style: 'percent' })" />
                      </cv-data-table-cell>
                      <cv-data-table-cell>
                        {{ item.after }}
                      </cv-data-table-cell>
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
  import { CvDataTable, CvDataTableRow } from '@carbon/vue/src'
  import { mapGetters } from 'vuex'
  import axios from 'axios';

  export default {
    name: 'TC3SegmentDtl',
    props: {
      title: {
        type: String,
        default: 'Time Contribution, by Segment (detail)'
      },
      unique: {
        type: String,
        default: ''
      }
    },
    data: () => ({
      columns: ['', '', 'Count', 'Avg Hrs, before', 'Change', 'Avg Hrs, after'],
      segments: {},
      message: ''
    }),
    computed: mapGetters([
      'usertoken',
      'shortenv',
      'groupTeam',
      'groupExecs',
      'groupAdmins',
      'environment'
    ]),
    mounted() {
      if (this.groupTeam || this.environment === 'local') {
        this.getData();
      } else if (!this.usertoken) {
        this.message = 'You must log in to view this page.';
      } else {
        this.message = 'You are not authorized to view this page. If you believe this message is in error, please create an access request.'
      };
    },
    methods: {
      getData() {
        axios.get('https://site-' + this.shortenv + '-api.domain.net/api/roisegmentdetail').then((response) => {
          this.segments = response.data.data;
        });
      }
    }
  }
</script>

<style>

</style>
