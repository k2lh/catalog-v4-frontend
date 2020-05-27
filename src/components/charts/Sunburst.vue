<template>
<v-chart :options="sunburst"/>
</template>

<style>
/**
 * The default size is 600px×400px, for responsive charts
 * you may need to set percentage values as follows (also
 * don't forget to provide a size for the container).
 */
.echarts {
  width: 100%;
  height: 100%;
}
</style>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'

export default {
  components: {
    'v-chart': ECharts
  },
  data () {
    let data = []

    for (let i = 0; i <= 360; i++) {
        let t = i / 180 * Math.PI
        let r = Math.sin(2 * t) * Math.cos(2 * t)
        data.push([r, i])
    }

    return {
      sunburst: {
        legend: {
          data: ['line']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        series: {
            radius: ['15%', '80%'],
            type: 'sunburst',
            sort: null,
            highlightPolicy: 'ancestor',
            data: data,
            label: {
              rotate: 0
            },
            levels: [],
            itemStyle: {
              color: '#ddd',
              borderWidth: 2
            }
        },
        animationDuration: 2000
      }
    }
  }
}
</script>
