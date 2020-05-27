<template>
  <ve-ring
      :data="chartData"
      :settings="chartSettings"
      :height="height"
      :extend="extend"
      :legend-visible="showLabel"
  />
</template>

<script>
export default {
  name: 'RingChart',
  props: {
    height: {
      type: String,
      default() {
        return "100px";
      }
    },
    showLabel: {
      type: Boolean
    },
    datasets: {
      type: Array,
      default() {
        return []
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
    this.extend = {
      //x轴文本设置
      "xAxis.0.axisLabel.color": "#fff",
      "xAxis.0.axisLabel.align": "center",
      "yAxis.0.axisLabel.color": "#fff",
      color: ['#5B81F7', '#A5B4ED', '#ED4E90', '#EBA3B9', '#3CAAC0', '#75C3D5', '#7DA837', '#B5E272'],
      legend: {
        textStyle: {
          color: "#fff",
          fontSize: 12
        },
        type: 'scroll',
        orient: 'vertical',
        left: 10,
        top: 20,
        bottom: 20
      }
    };
    this.chartSettings = {
      dimension: "datestamp",
      radius: ['40%', '50%'],
      offsetY: 220,
      label: {
          show: false
      }
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
