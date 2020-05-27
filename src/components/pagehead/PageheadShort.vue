<template>
  <div class="page-header">
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
    name: 'PageheadShort',
    props: {
      title: {
        type: String,
        default: ''
      },
      tabs: {
        type: Array,
        default() {
          return []
        }
      },
      origin: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        initialSelected: 0
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
            site: this.environment,
            day: today
          }).then((response) => {});
        } else {
          axios.post(this.tracking, {
            cnum: this.userId,
            currentUrl: this.$route.path,
            page: this.title,
            core: this.groupTeam,
            landk: this.groupAdmins,
            exec: this.groupExecs,
            tableau: this.groupDash,
            site: this.environment,
            org: this.groupOrg,
            day: today
          }).then((response) => {});
        }
      },
      isSelected: function(val) {
        this.$emit('updatet', val);
      }
    }
  };
</script>

<style lang='scss' scoped>
  .page-header {
    height: 6rem;
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
  .bx--tabs {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      font-family: inherit;
      vertical-align: initial;
      font-size: .875rem;
      font-weight: 400;
      line-height: 1.125rem;
      letter-spacing: .16px;
      color: #161616;
      height: auto;
      width: 100%;
      position: relative;
      min-height: unset;
  }
  .bx--tabs *, .bx--tabs :after, .bx--tabs :before {
      box-sizing: inherit;
  }
  .bx--tabs-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 3rem 0 1rem;
    height: 2.5rem;
    cursor: pointer;
    color: #f4f4f4;
    outline: 2px solid transparent;
    border-bottom: #8d8d8d;
    background-color: #161616;
    width: fit-content;
    float: left;
}

.bx--tabs-trigger-text {
    text-decoration: none;
    padding-top: 2px;
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.bx--tabs-trigger-text, .bx--tabs-trigger-text:hover {
    color: #FFF;
}
.bx--tabs-trigger.active {
    color: #161616;
    font-size: .875rem;
    font-weight: 600;
    line-height: 1.125rem;
    letter-spacing: .16px;
    border-bottom: 3px solid #0f62fe;
}

  .bx--tabs {
    min-height: unset;
  }

  /deep/ button.cv-content-switcher-button.bx--tabs-trigger.bx--content-switcher-btn {
      position: relative;
      top: -.5rem;
      color: #fff;
  }
</style>
