<template>
  <ve-pie
      :data="chartData"
      :settings="chartSettings"
      height="350px"
      :extend="extend"
      :legend-visible="showLabel"
  />
</template>

<script>
export default {
  name: 'PieChart',
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
      dimension: 'cost',
      metrics: 'profit'
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
