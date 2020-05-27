<template>
  <ve-histogram
      :data="chartData"
      :settings="chartSettings"
      :height="height"
      :extend="extend"
  />
</template>

<script>
export default {
  name: 'BarVerticalStacked',
  props: {
    height: {
      type: String,
      default() {
        return "200px"
      }
    },
    datasets: {
      type: Object,
      default() {
        return {}
      }
    },
    chartSettings: {
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
      color: ['#5B81F7', '#A5B4ED', '#ED4E90', '#EBA3B9', '#3CAAC0', '#75C3D5', '#7DA837', '#B5E272'],
      legend: {
        show: true,
        textStyle: {
          color: '#fff',
          fontSize: 12
        },
        orient: 'vertical',
        left: 10,
        top: 20,
        bottom: 20
      },
      toolbox: {
        feature: {
          magicType: {
            type: ['stack']
          }
        }
      },
      series: {
         barWidth: 10
      }
    };
    // this.chartSettings = {
    //     metrics: [],
    //     stack: []
    // }
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
