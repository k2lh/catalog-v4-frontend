<template>
  <div id="Traffic" class="page-body">
    <div class="container">
      <PageheadNoTabs :title="'Traffic'" :origin="'ISA'" />
      <main id="maincontent" class="page-content">
        <div v-if="message" class="nologin bx--type-body-short-01">
          {{ message }}
        </div>
        <div v-else>
          <div class="bx--grid">
            <div class="bx--row">
              <div class="bx--col bx--grid--condensed">
                <p class="bx--type-expressive-heading-02 marbot2">
                  Unique Visitors
                </p>
                <p class="bx--type-expressive-heading-03">
                  <!-- {{ totals.uniquev | numFormat }} -->
                  (something)
                </p>
              </div>
              <div class="bx--col bx--grid--condensed">
                <p class="bx--type-expressive-heading-02 marbot2">
                  Pages Visited
                </p>
                <p class="bx--type-expressive-heading-03">
                  <!-- {{ totals.pages | numFormat }} -->
                  (something)
                </p>
              </div>
              <div class="bx--col bx--grid--condensed">
                <p class="bx--type-expressive-heading-02 marbot2">
                  AAA
                </p>
                <p class="bx--type-expressive-heading-03">
                  (something)
                </p>
                <p class="bx--type-expressive-heading-02">
                  (something)
                </p>
              </div>
              <div class="bx--col bx--grid--condensed">
                <p class="bx--type-expressive-heading-02 marbot2">
                  BBB
                </p>
                <p class="bx--type-expressive-heading-03">
                  (something)
                </p>
                <p class="bx--type-expressive-heading-02">
                  (something)
                </p>
              </div>
              <div class="bx--col bx--grid--condensed">
                <p class="bx--type-expressive-heading-02 marbot2">
                  CCC
                </p>
                <p class="bx--type-expressive-heading-03">
                  (something)
                </p>
                <p class="bx--type-expressive-heading-02">
                  (something)
                </p>
              </div>
              <div class="bx--col bx--grid--condensed">
                <p class="bx--type-expressive-heading-02 marbot2">
                  DDD
                </p>
                <p class="bx--type-expressive-heading-03">
                  (something)
                </p>
                <p class="bx--type-expressive-heading-02">
                  (something)
                </p>
              </div>
            </div>
            <div class="bx--row">
              <div class="bx--col">
                <div class="card">
                  <div class="bx--type-productive-heading-01 card-title padbot1">
                    title of this card
                  </div>
                  {{ items }}
                  <!-- <BarVerticalStacked :datasets="barVerticalStackedRows" :columns="barVerticalStackedColumns" /> -->
                  <!-- <BarVertical ref="data" :datasets="data.rows" :columns="data.columns" :height="chartHeight" /> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        {{ items }}
      </main>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import axios from 'axios';

  export default {
    name: 'Traffic',
    props: {
      unique: {
        type: String,
        default: ''
      }
    },
    data: () => ({
      items: [],
      message: '',
      title: '',
      site: '',
      barVerticalStackedColumns: [],
      barVerticalStackedRows: []
    }),
    computed: mapGetters([
      'usertoken',
      'groupTeam',
      'groupExecs',
      'groupAdmins',
      'environment'
    ]),
    created() {
      if (this.environment === 'local') {
        this.site = 'http://localhost:3000';
      };
    },
    mounted() {
      this.getData();
    },
    methods: {
      getData() {
        axios.get('https://site-prod-log.domain.net/api/events/dates').then((response) => {
          this.items = response.data.slice(1);
          // this.items.
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
