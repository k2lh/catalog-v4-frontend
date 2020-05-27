<template>
  <div id="app">
    <global-header />
    <router-view />
    <global-footer />
  </div>
</template>

<script>
  import globalHeader from '@/components/global-header/global-header';
  import globalFooter from '@/components/global-footer/global-footer';
  // import axios from 'axios';

  export default {
    name: 'App',
    components: {
      globalHeader,
      globalFooter
    },
    data() {
      return {
        items: [
          'Pagehead/PageheadShort.vue',
          'Pagehead/PageheadNoTabs.vue',
          'Pagehead/PageheadWithTabs.vue'
        ],
        response: null
      };
    },
    beforeMount() {
      if (this.$session.exists() === true) {
        this.session = this.$session.id();
      } else {
        this.$session.start();
      }
    },
    methods: {
      updateComponent(ddItem) {
        this.activePrototype = ddItem.value;
      }
    }
  };
</script>

<style lang='scss' scoped>
  @import '@carbon/themes/scss/themes';
  @include carbon--theme($carbon--theme--g90);
  // @import 'carbon-components/scss/globals/scss/styles.scss';
  @import "./assets/carbon-components.css";
  // @import "./assets/carbon-customize.css";
  @import "./assets/main.css";
</style>
