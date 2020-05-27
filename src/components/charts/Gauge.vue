<template>
  <ve-gauge
      :data="chartData"
      :settings="chartSettings"
      :height="height"
  />
</template>

<script>
export default {
  name: 'Gauge',
  props: {
    datasets: {
      type: Array,
      default() {
        return []
      }
    },
    height: {
      type: String,
      default() {
        return "100px";
      }
    },
    columns: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    this.chartSettings = {
      dimension: datestamp
    };
    return {
      chartComponentsData: {
        columns: this.columns,
        rows: this.datasets
      }
    };
  },
  computed: {
    chartData: function() {
      let chartComponentsData = {
        columns: this.columns,
        rows: this.datasets
      }
      return chartComponentsData || {};
    }
  }
};
</script>
