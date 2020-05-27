<template>
  <div id="News" class="page-body">
    <div class="container">
      <main id="maincontent" class="page-content">
        <div class="bx--grid fullbleed">
          <div class="bx--row">
            <div class="-col-lg-10">
              <div class="inset-box">
                <h2 class="page-h2 second-line">
                  Release History
                </h2>
                <div v-for="(update, index) in releases" :key="index">
                  <h3 class="productive-heading-02">
                    {{ update.date }}
                  </h3>
                  <ul class="bx--list--unordered addtop">
                    <li v-for="(item, index2) in update.list_updates" :key="index2" class="bx--list__item">
                      {{ item }}
                    </li>
                    <li v-for="(item, index3) in update.text_updates" :key="index3" class="bx--list__item">
                      {{ item }}
                    </li>
                    <li class="bx--list__item notes">
                      {{ update.notes[0] }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="-col-lg-6">
              <div class="background background-blue inset-box">
                <h2 class="page-h2 second-line">
                  All Reviews
                </h2>
                <div v-for="(entry, index) in reviews" :key="index" class="testamonials">
                  <p class="bx--list__item bx--type-body-short-02">
                    {{ entry.review }}
                  </p>
                  <p class="bx--type-body-short-01">
                    {{ entry.author }}
                  </p>
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
  import axios from 'axios';
  import { mapGetters } from 'vuex';

  export default {
    name: "News",
    data() {
      return {
        reviews: [],
        releases: [],
        site: ''
      };
    },
    computed: mapGetters([
      'usertoken',
      'displayName',
      'userId',
      'environment',
      'shortenv',
      'tracking',
      'baseURL'
    ]),
    created() {
      if (this.environment === 'local') {
        this.site = 'http://localhost:3000';
      }
      axios.get(this.site + '/api/' + this.shortenv + '/open/reviews').then((response) => {
        this.reviews = response.data.data;
      });
      axios.get(this.site + '/api/' + this.shortenv + '/open/releases').then((response) => {
        this.releases = response.data.data;
      });
    }
  };
</script>

<style scoped lang='scss'>
  .background {
    padding-bottom: 60px !important;
    padding-top: 0;
    &.background-blue {
      background-color: #061f80;
      border-bottom: 1px solid #000;
    }
    &.background-black {
      background-color: #171717;
      border-bottom: 1px solid #000;
    }
  }

  .page-content {
    padding-top: 0rem;
    padding-bottom: 0rem;
  }

  .testamonials {
    margin-top: 3rem;
  }

  .page-h2,
  .bx--type-body-short-01,
  .bx--type-heading-02,
  .bx--list__item,
  .bx--type-body-short-02 {
      color: #FFF;
  }
  .bx--type-heading-02 {
    font-size: 1.2rem;
  }
  .bx--type-body-short-01 {
    font-size: .95rem;
    line-height: 1.4rem;
  }

  .inset-box {
    padding: 2rem;
  }
  .quoteline {
    font-size: 0.9rem;
    padding-top: 1rem;
  }

  .bx--list__item {
    line-height: 1.4;
    &.notes {
      font-style: italic;
    }
  }
  .bx--list__item:before {
      content: unset;
  }
</style>
