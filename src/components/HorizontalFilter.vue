<template>
  <div class="bx--grid filter-bar-container">
    <div class="filter-bar-interior">
      <div class="bx--row">
        <div class="-col-lg-16 filter-bar-header">
          <div role="list">
            <span v-if="tags.length < 1" class="no-filters">
              No filters applied. Click the icon at far right to view and apply filters.
            </span>
            <span v-else>
              Filters applied: <cv-tag v-for="(tag, index) in tags" :key="index" kind="filter" :label="tag.label" @remove="onRemoveTag(tag)" />
            </span>
          </div>
          <div class="toggle-container" :class="background" @click="showMenu=!showMenu">
            <SettingsAdjust16 aria-label="Settings Adjust" class="filter-toggle" />
          </div>
        </div>
      </div>
      <div v-show="showMenu" class="bx--row filter-bar-body" :class="background">
        <div v-if="filterList.istss && filters.istss" class="-col-lg-3 -col-md-2">
          <cv-select v-model="filteristss" class="horizontal--form-item" :label="'IS/TSS'" :class="background">
            <option selected value="">
              Select one
            </option>
            <cv-select-option v-for="(option, index) in filters.istss.options" :key="index" :value="option.value" :class="background">
              {{ option.label }}
            </cv-select-option>
          </cv-select>
        </div>

        <div v-if="filterList.ciclocation && filters.ciclocation" class="-col-lg-3 -col-md-2">
          <cv-multi-select v-model="filterciclocation" class="horizontal--form-item" :theme="'light'" :title="'CIC Locations'" :label="'CIC Locations'" :filterable="false" :options="filters.ciclocation.options" />
        </div>

        <div v-if="filterList.market && filters.market" class="-col-lg-4 -col-md-4 -col-sm-2">
          <cv-multi-select v-model="filtermarket" class="horizontal--form-item" :theme="'light'" :title="'Markets'" :label="'Markets'" :filterable="false" :options="filters.market.options" />
        </div>

        <div v-if="filterList.country && filters.country" class="-col-lg-3 -col-md-2">
          <cv-multi-select v-model="filtercountry" class="horizontal--form-item" :title="'Countries'" :label="'Countries'" :filterable="false" :options="filters.country.options" />
        </div>

        <div v-if="filterList.region && filters.region" class="-col-lg-3 -col-md-2">
          <cv-multi-select v-model="filterregion" class="horizontal--form-item" :title="'Regions'" :label="'Regions'" :filterable="false" :options="filters.region.options" />
        </div>

        <div v-if="filterList.service && filters.service" class="-col-lg-5 -col-md-5 -col-sm-3">
          <cv-multi-select v-model="filterservice" class="horizontal--form-item" :title="'Services'" :label="'Services'" :filterable="false" :options="filters.service.options" />
        </div>

        <div v-if="filterList.servicearea && filters.servicearea" class="-col-lg-6 -col-md-6 -col-sm-4">
          <cv-multi-select v-model="filterservicearea" class="horizontal--form-item" :title="'Service Areas'" :label="'Service Areas'" :filterable="false" :options="filters.servicearea.options" />
        </div>

        <div v-if="filterList.serviceline && filters.serviceline" class="-col-lg-5 -col-md-5 -col-sm-3">
          <cv-multi-select v-model="filterserviceline" class="horizontal--form-item" :title="'Service Lines'" :label="'Service Lines'" :filterable="false" :options="filters.serviceline.options" />
        </div>

        <div v-if="filterList.jrs && filters.jrs" class="-col-lg-5 -col-md-5 -col-sm-3">
          <cv-multi-select v-model="filterjrs" class="horizontal--form-item" :title="'JRS/S'" :label="'JRS/S'" :filterable="false" :options="filters.jrs.options" />
        </div>

        <div v-if="filterList.businessmodel && filters.businessmodel" class="-col-lg-3 -col-md-2">
          <cv-multi-select v-model="filterbusinessmodel" class="horizontal--form-item" :title="'Business Model'" :label="'Business Model'" :filterable="false" :options="filters.businessmodel.options" />
        </div>

        <div class="-col-lg-16 filter-bar-footer">
          <cv-button kind="tertiary" :size="'small'" @click="resetFilter">
            Reset all filters
          </cv-button>
          <cv-button kind="primary" :size="'small'" @click="applyFilter">
            Apply filters
          </cv-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { CvSelect, CvSelectOption, CvMultiSelect } from '@carbon/vue/src'
  import SettingsAdjust16 from '@carbon/icons-vue/es/settings--adjust/16';
  import axios from 'axios';
  export default {
    name: 'HorizontalFilter',
    components: { SettingsAdjust16 },
    props:{
      filterList: {
        type: Object,
        default() {
          return {}
        }
      },
      background: {
        type: String,
        default: ''
      },
      value: {
        type: String,
        default: ''
      },
      options: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data () {
      return {
        showMenu: false,
        selected: {},
        tags: [],
        site: '',
        filters: [],
        filterregion: [],
        filteristss: '',
        filterservice: [],
        filterciclocation: [],
        filtermarket: [],
        filtercountry: [],
        filterbusinessmodel: [],
        filterjrs: [],
        filterservicearea: [],
        filterserviceline: []
      };
    },
    created() {
      if (this.environment === 'local') {
        this.site = 'http://localhost:3000';
      };
    },
    mounted() {
      axios.get(this.site + '/api/open/filters').then((response) => {
        this.filters = response.data.data;
      });
    },
    methods: {
      onRemoveTag(tag) {
        if (tag.type === 'one') {
          this[tag.source] = '';
        } else {
          this[tag.source] = [];
        }
        this.applyFilter();
      },
      applyFilter() {
        this.tags = [];
        if (this.filteristss) {
          this.tags.push(this.createTag('IS/TSS', 'filteristss', 'one', this.filteristss, 'istss'));
        };
        if (this.filterciclocation.length > 0) {
          this.tags.push(this.createTag('CIC Locations', 'filterciclocation', 'many', this.filterciclocation, 'ciclocation'));
        };
        if (this.filtermarket.length > 0) {
          this.tags.push(this.createTag('Markets', 'filtermarket', 'many', this.filtermarket, 'market'));
        };
        if (this.filtercountry.length > 0) {
          this.tags.push(this.createTag('Countries', 'filtercountry', 'many', this.filtercountry, 'country'));
        };
        if (this.filterregion.length > 0) {
          this.tags.push(this.createTag('Regions', 'filterregion', 'many', this.filterregion, 'region'));
        };
        if (this.filterservice.length > 0) {
          this.tags.push(this.createTag('Services', 'filterservice', 'many', this.filterservice, 'service'));
        };
        if (this.filterservicearea.length > 0) {
          this.tags.push(this.createTag('Service Areas', 'filterservicearea', 'many', this.filterservicearea, 'servicearea'));
        };
        if (this.filterserviceline.length > 0) {
          this.tags.push(this.createTag('Service Lines', 'filterserviceline', 'many', this.filterserviceline, 'serviceline'));
        };
        if (this.filterjrs.length > 0) {
          this.tags.push(this.createTag('JRS/S', 'filterjrs', 'many', this.filterjrs, 'jrs'));
        };
        if (this.filterbusinessmodel.length > 0) {
          this.tags.push(this.createTag('Business Models', 'filterbusinessmodel', 'many', this.filterbusinessmodel, 'businessmodel'));
        };
        this.$emit('updatef', this.tags);
      },
      resetFilter() {
        this.filters = {};
        this.tags = [];
      },
      createTag(name, source, type, selected, query) {
        var obj = {
          label: name,
          source: source,
          type: type,
          selected: selected,
          query: query
        };
        return obj;
      }
    }
  }
</script>

<style lang='scss' scoped>
  .horizontal--form-item {
    margin-bottom: 1rem;
    &.bx--form-item {
      margin-right: 1rem;
      & /deep/ .bx--tag {
        &:not(:last-of-type) {
          margin-right: .625rem;
        }
      }
    }
    & /deep/ .bx--checkbox-label:before {
      border: 1px solid #171717;
    }
  }

  .bx--label {
    color: #FFF;
  }

  .filter-bar-container {
    margin-bottom: 1rem;
    .filter-bar-interior {
      margin-left: 0;
      margin-right: 0;
    }
  }
  .filter-bar-header {
    display: flex;
    justify-content: space-between;
    padding: 0;
    .no-filters {
      line-height: 2rem;
      margin: .25rem;
    }
    & /deep/ .bx--tag--filter {
      background-color: #fff;
      color: #171717;
    }
    & /deep/ .bx--tag--filter>svg {
      fill: #000;
    }
    & /deep/ .bx--tag--filter>svg:hover {
      fill: #FFF;
    }
  }
  .toggle-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    width: 3rem;
    background: #333;
    cursor: pointer;
  }
  .filter-toggle {
    fill: #fff;
    background: #333;
  }

  .bx--row.filter-bar-body {
    padding: 1rem;
    background: #333;
  }

  .filter-bar-footer {
    display: flex;
    justify-content: flex-end;
  }
  button:not(:last-of-type) {
    margin-right: .75rem;
  }

  svg.filter-toggle {
    fill: white;
  }
</style>
