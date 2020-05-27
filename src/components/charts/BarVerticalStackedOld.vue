<script>
import { Bar } from 'vue-chartjs'
import 'chartjs-plugin-datalabels'
const colors = ['#5B81F7', '#A5B4ED', '#ED4E90', '#EBA3B9', '#3CAAC0', '#75C3D5', '#7DA837', '#B5E272']
export default {
  name: 'BarVerticalStackedOld',
  extends: Bar,
  props: {
    datasets: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    chartData() {
      return {
        labels: null,
        datasets: this.datasets && this.datasets.map((d, index) => {
          return {
            ...d,
            datalabels: {
              labels: {
                value: {
                  font: {
                    weight: 'bold'
                  }
                }
              }
            },
            backgroundColor: colors[index]
          }
        })
      }
    },
    options() {
      return {
        align: 'center',
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        events: [],
        plugins: {
          datalabels: {
            color: 'white',
            formatter: function(value, context) {
              return `${context.dataset.label} - ${value}`
            }
          }
        },
        scales: {
          xAxes: [{
            stacked: true,
            display: false
          }],
          yAxes: [{
            stacked: true,
            display: false
          }]
        }
      }
    }
  },
  watch: {
    datasets() {
      this.update()
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  },
  methods: {
    update() {
      this.$nextTick(() => {
        this.$data._chart.clear()
        this.renderChart(this.chartData, this.options)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
