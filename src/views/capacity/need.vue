<template>
  <div id="CapacityNeed" class="page-body">
    <div class="container">
      <PageheadNoTabs :title="'Capacity Need'" :origin="'ISA'" />
      <main id="maincontent" class="page-content">
        <div v-if="message" class="nologin bx--type-body-short-01">
          {{ message }}
        </div>
        <div v-else class="">
          <horizontal-filter :filter-list="filterList" background="light" @updatef="filterChange" />
          <div class="bx--grid">
            <div class="bx--row">
              <div class="-col-lg-3 -col-md-1">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile">
                    <p class="bx--type-expressive-heading-02 marbot2">
                      Estimated Need, worst-case
                    </p>
                    <p class="bx--type-expressive-heading-05 padtop6" :class="{positive: estimate.worst > 0, negative: estimate.worst < 0}">
                      {{ estimate.worst | numFormat }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="-col-lg-3 -col-md-1">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile">
                    <p class="bx--type-expressive-heading-02 marbot2">
                      Estimated Need, projected
                    </p>
                    <p class="bx--type-expressive-heading-05 padtop6" :class="{positive: estimate.projected > 0, negative: estimate.projected < 0}">
                      {{ estimate.projected | numFormat }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="-col-lg-3 -col-md-1">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile">
                    <p class="bx--type-expressive-heading-02 marbot2">
                      Estimated Need, best-case
                    </p>
                    <p class="bx--type-expressive-heading-05 padtop6" :class="{positive: estimate.best > 0, negative: estimate.best < 0}">
                      {{ estimate.best | numFormat }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="-col-lg-7 -col-md-3">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile">
                    <div class="bx--row">
                      <div class="bx--col header-style firstcolumn">
                        Region
                      </div>
                      <div class="bx--col header-style">
                        worst-case
                      </div>
                      <div class="bx--col header-style">
                        projected
                      </div>
                      <div class="bx--col header-style">
                        best-case
                      </div>
                    </div>
                    <div v-for="(item, rowIndex) in items" :key="rowIndex" :value="`${rowIndex}`">
                      <div class="bx--row tablebody">
                        <div class="bx--col">
                          {{ item.label }}
                        </div>
                        <div class="bx--col" :class="{positive: item.worst > 0, negative: item.worst < 0}">
                          {{ item.worst | numFormat }}
                        </div>
                        <div class="bx--col" :class="{positive: item.projected > 0, negative: item.projected < 0}">
                          {{ item.projected | numFormat }}
                        </div>
                        <div class="bx--col" :class="{positive: item.best > 0, negative: item.best < 0}">
                          {{ item.best | numFormat }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bx--row">
              <div class="bx--col">
                <div class="bx--resource-card bx--resource-card--dark">
                  <div class="bx--tile">
                    <div class="bx--type-productive-heading-01 card-title padbot1">
                      title of this card
                    </div>
                    <!-- <BarHorizontal ref="teamddata" :datasets="teamddata.rows" :columns="teamddata.columns" :height="chartHeight" /> -->
                  </div>
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
  import HorizontalFilter from "@/components/HorizontalFilter";
  import { mapGetters } from 'vuex';
  import { CvSelect, CvSelectOption } from '@carbon/vue/src'
  import axios from 'axios';

  export default {
    name: 'CapacityNeed',
    components: { HorizontalFilter },
    props: {
      unique: {
        type: String,
        default: ''
      },
      tags: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data: () => ({
      filterList: {},
      message: '',
      site: '',
      title: '',
      estimate: {},
      items: []
    }),
    computed: mapGetters([
      'usertoken',
      'groupTeam',
      'groupAdmins',
      'environment'
    ]),
    created() {
      if ((this.unique === '') || (this.unique === 'undefined')) {
        this.uniqueID = this.getUnique();
      } else {
        this.uniqueID = this.unique;
      };
      if (this.environment === 'local') {
        this.site = 'http://localhost:3000';
      };
    },
    mounted() {
      if (this.groupTeam || this.groupAdmins || this.environment === 'local') {
        this.getData();
        this.filterList = {
          region: true,
          ciclocation: true,
          istss: true,
          market: true,
          country: true,
          service: true,
          businessmodel: true,
          jrs: true,
          servicearea: true,
          serviceline: true
        };
      } else if (!this.usertoken) {
        this.message = 'You must log in to view this page.';
      } else {
        this.message = 'You are not authorized to view this page. If you believe this message is in error, please create an access request.'
      };
    },
    methods: {
      getData() {
        // axios.get('../static/tree.json').then((response) => {
        //   this.items = response.data;
        // });
        // axios.get('../static/flat.json').then((response) => {
        //   this.flat = response.data;
        // });
      },
      getUnique: function() {
        var res = this.$route.path.split('/');
        var uniqueID = res[2];
        return uniqueID;
      },
      filterChange(val) {
        console.log('filterChange', val);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .card {
    padding: 1rem;
    color: #171717;
    background-color: #F3F3F3 !important;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.1);
    border-color: #EEE;
    border-style: solid;
    border-width: 0px;
    min-height: 17rem;
    &.col-bx--grid--condensed {
      margin: 0 2px 1rem 2px;
    }
    .bx--type-expressive-heading-02,
    .bx--type-expressive-heading-05,
    .bx--type-helper-text-01 {
      color: #171717;
      &.negative {
        color: red;
      }
      &.positive {
        color: green;
      }
    }
  }

  .header-style {
    padding-bottom: .5rem;
    border-bottom: 1px solid #565656;
  }
  .tablebody {
    padding: .5rem 0;
    border-top: 1px solid #565656;
  }

  .horizontal--form-item {
    display: inline-block;
    margin-bottom: 1rem;
    &.bx--form-item {
      margin-right: 1rem;
      & /deep/ select {
        background: transparent;
        color: #171717;
        border-bottom: 1px solid #8c8c8c;
      }
    }
    & /deep/ .bx--select__arrow {
        fill: #DFE3E6;
      }
    & /deep/ .bx--tag {
      background-color: #DCDCDC;
      color: #171717;
    }
  }
</style>
