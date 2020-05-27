<template>
  <ve-bar :data="chartData" :height="height" :extend="extend" :settings="chartSettings" />
</template>
<script>
export default {
  name: 'BarHorizontal',
  props: {
    height: {
      type: String,
      default() {
        return "200px"
      }
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
      "xAxis.0.axisLabel.color": "#fff",
      "xAxis.0.axisLabel.align": "center",
      "yAxis.0.axisLabel.color": "#fff",
      color: ['#5B81F7', '#A5B4ED', '#ED4E90', '#EBA3B9', '#3CAAC0', '#75C3D5', '#7DA837', '#B5E272'],
      legend: {
        show: false,
        textStyle: {
          color: "#fff",
          fontSize: 12
        }
      },
      grid: {
           top: '16px', //默认是80px
           bottom: '16px'
      },
      series: {
         barWidth: 20
      }
    };
    this.chartSettings = {
      metrics: ["data"],
      dataOrder: {
        label: "data",
        order: "desc"
      }
    };
    return {
      // chartComponentsData: this.datasets
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
