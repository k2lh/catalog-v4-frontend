<template>
  <ve-bar
      :data="chartData"
      :settings="chartSettings"
      :extend="extend"
  />
</template>

<script>
export default {
  name: 'BarHorizontalStacked',
  props: {
    datasets: {
      type: Object,
      default() {
        return {};
      }
    },
    columns: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    this.extend = {
      //x轴文本设置
      "xAxis.0.axisLabel.color": "#fff", //x轴文本颜色
      "xAxis.0.axisLabel.align": "center", //x轴文本字体位置
      "yAxis.0.axisLabel.color": "#fff", //y轴文本改变颜色
      color: ['#5B81F7', '#A5B4ED', '#ED4E90', '#EBA3B9', '#3CAAC0', '#75C3D5', '#7DA837', '#B5E272'],
      legend: {
        show: false,
        textStyle: {
          color: "#fff",
          fontSize: 12
        }
      },
      series: {
        barWidth: 10
      }
    };
    this.chartSettings = {
      stack: {
        xxx: ["band6", "band7"]
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
      };
      return chartComponentsData || {};
    }
  }
};
</script>
