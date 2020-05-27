<template>
  <ve-pie
      :data="chartData"
      height="350px"
      :extend="extend"
  />
</template>

<script>
export default {
  name: 'PiePercent',
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
    this.showLabel = false;
    this.extend = {
      //x轴文本设置
      'xAxis.0.axisLabel.color': '#fff',
      'xAxis.0.axisLabel.align': 'center',
      'yAxis.0.axisLabel.color': '#fff',
      color: ['#5B81F7', '#fff'],
      legend: {
        show: false,
        textStyle: {
          color: '#fff',
          fontSize: 12
        }
      }
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
