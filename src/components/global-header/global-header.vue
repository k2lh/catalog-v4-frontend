<template>
  <cv-header aria-label="Carbon header">
    <cv-skip-to-content href="#main-content">
      Skip to content
    </cv-skip-to-content>
    <cv-header-name href="/" prefix="XXX">
      Talent Transformation Analytics
    </cv-header-name>
    <div class="global-header__nav" role="navigation">
      <ul class="bx--global-header__menu main-menu">
        <li v-for="(link, index) in links" :key="index" class="nav-list__item" role="presentation" @click.capture="selectLink(link)">
          <router-link class="nav-list__link" :to="link.url">
            {{ link.label }}
          </router-link>
        </li>
      </ul>
    </div>
    <template slot="header-global">
      <global-navigation />
    </template>
  </cv-header>
</template>

<script>
  import globalNavigation from './global-navigation';
  import navigationLinks from './navigation-links.js'
  import {mapGetters} from 'vuex';

  export default {
    name: 'GlobalHeader',
    components: {
      globalNavigation
    },
    props: {
      links: {
        type: Array,
        default: () => navigationLinks
      }
    },
    data() {
      return {
        help: false
      };
    },
    computed: mapGetters([
      'usertoken',
      'displayName'
    ])
  };
</script>

<style lang='scss' scoped>
  ol li+li, ul li+li {
    padding-top: 0;
  }
  li.nav-list__item {
    float: left;
    padding: 0 0 0 1rem;
  }
  a.nav-list__link {
    padding: 1rem;
    color: #FFF;
  }

  .notice {
    padding-top: 20px !important;
    padding-bottom: 10px !important;
    margin-top: 60px;
    &.notLoggedIn {
      background-color: #f1c21b;
      color: #000;
    }
  }
</style>
