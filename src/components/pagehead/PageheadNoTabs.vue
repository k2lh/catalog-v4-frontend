<template>
  <div class="page-header rainbow">
    <div class="bx--grid pushed">
      <div class="bx--row">
        <div class="-col-lg-16">
          <router-link :to="'/home' + origin" class="bx--breadcrumb" role="link">
            <svg width="12" height="10" viewBox="0 0 16 14">
              <path d="M4.044 8.003l4.09 3.905-1.374 1.453-6.763-6.356L6.759.639 8.135 2.09 4.043 6.003h11.954v2H4.044z" />
            </svg>
            <span>
              All Dashboards
            </span>
          </router-link>
          <div class="page-header__title bx--type-productive-heading-05">
            {{ title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {mapGetters} from 'vuex';

  export default {
    name: 'PageheadNoTabs',
    props: {
      title: {
        type: String,
        default: ''
      },
      origin: {
        type: String,
        default: ''
      }
    },
    computed: mapGetters([
      'usertoken',
      'groupTeam',
      'groupExecs',
      'groupAdmins',
      'groupDash',
      'groupOrg',
      'userId',
      'tracking',
      'environment',
      'baseURL'
    ]),
    mounted() {
      if (this.environment === 'production') {
        this.logUser();
      };
    },
    methods: {
      logUser: function() {
        var d = new Date();
        var month = d.getMonth() + 1;
        var today = d.getFullYear() + '-' + month + '-' + d.getDate();
        if (!this.userId) {
          axios.post(this.tracking, {
            cnum: 'anon',
            currentUrl: this.$route.path,
            page: this.title,
            day: today
          }).then((response) => {});
        } else {
          axios.post(this.tracking, {
            cnum: this.userId,
            currentUrl: this.$route.path,
            page: this.title,
            core: this.groupTeam,
            exec: this.groupExecs,
            landk: this.groupAdmins,
            tableau: this.groupDash,
            org: this.groupOrg,
            day: today
          }).then((response) => {});
        }
      }
    }
  };
</script>

<style lang='scss' scoped>
  .page-header.rainbow {
    height: 10rem;
    background-image: url(rainbow.svg);
    background-repeat: repeat-y;
    background-position-x: 95%;
    background-position-y: center;
    border-bottom: 1px solid #3D3D3D;
  }
  .bx--breadcrumb {
    color: #fff;
    text-decoration: none;
    span {
      padding-left: .5rem;
    }
    svg {
      fill: white;
      position: relative;
      top: .25rem;
    }
  }
</style>
