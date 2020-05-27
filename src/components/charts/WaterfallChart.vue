<template>
  <ve-waterfall
      :data="chartData"
      :settings="chartSettings"
      :extend="extend"
      height="300px"
      :legend-visible="showLabel"
  />
</template>

<script>
export default {
  name: 'WaterfallChart',
  props: {
    showLabel: {
      type: Boolean
    },
    datasets: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    this.extend = {
      //x轴文本设置
      'xAxis.0.axisLabel.color': '#fff',
      'xAxis.0.axisLabel.align': 'center',
      'yAxis.0.axisLabel.color': '#fff',
      color: ['#5B81F7', '#A5B4ED', '#ED4E90', '#EBA3B9', '#3CAAC0', '#75C3D5', '#7DA837', '#B5E272'],
      legend: {
        textStyle: {
          color: '#fff',
          fontSize: 12
        }
      }
    };
    this.chartSettings = {
      totalNum: 24,
      totalName: 'timeAll',
      remainName: 'timeRemain'
    };
    return {
      chartComponentsData: this.datasets
    };
  },
  computed: {
    chartData: function() {
      return this.chartComponentsData || [];
    }
  }
};
</script>
