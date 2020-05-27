<template>
  <div>
    <ve-histogram :data="chartData" :height="height" :extend="extend" />
  </div>
</template>

<script>
export default {
  name: 'BarAndLine',
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
      //x轴文本设置
      'xAxis.0.axisLabel.color': '#fff', //x轴文本颜色
      'xAxis.0.axisLabel.align': 'center', //x轴文本字体位置
      'yAxis.0.axisLabel.color': '#fff', //y轴文本改变颜色
      color: ['#5B81F7', '#A5B4ED', '#ED4E90', '#EBA3B9', '#3CAAC0', '#75C3D5', '#7DA837', '#B5E272'],
      legend: {
        show: true,
        textStyle: {
          color: '#fff',
          fontSize: 12
        },
        data: ['Team Average', 'Your data']
      },
      xAxis: [
        {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '水量',
          min: 0,
          max: 80,
          interval: 10,
          axisLabel: {
            formatter: '{value} ml'
          }
        }
      ],
      grid: {
        top: '16px', //默认是80px
        bottom: '16px'
      },
      series: [
        {
          name: '蒸发量',
          type: 'bar',
          barWidth: 20,
          data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 35.6, 62.2, 32.6, 20.0, 6.4, 3.3]
        },
        {
          name: '平均温度',
          type: 'line',
          data: [20.0, 27.2, 39.3, 47.5, 36.3, 50.2, 60.3, 53.4, 63.0, 16.5, 12.0, 6.2]
        }
      ]
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
