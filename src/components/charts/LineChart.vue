<template>
  <ve-line
      :data="chartData"
      :height="height"
      :extend="extend"
      :legend-visible="showLabel"
  />
</template>

<script>
export default {
  name: 'LineChart',
  props: {
    height: {
      type: String,
      default() {
        return "200px"
      }
    },
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
      'xAxis.0.axisLabel.color': '#fff', //x series text color
      'xAxis.0.axisLabel.align': 'center', //x series text position
      'yAxis.0.axisLabel.color': '#fff', //y series text color
      // series: {
      //   colors: '#0062FF' //bar background color
      color: ['#5B81F7', '#A5B4ED', '#ED4E90', '#EBA3B9', '#3CAAC0', '#75C3D5', '#7DA837', '#B5E272'],
      legend: {
        textStyle: {
          color: '#fff',
          fontSize: 12
        },
        orient: 'vertical',
        left: 10,
        top: 20,
        bottom: 20
      },
      grid: {
        left: '30%'
      }
    };
    return {
    };
  },
  computed: {
    chartData: function() {
      return this.datasets || {};
    }
  }
};
</script>
