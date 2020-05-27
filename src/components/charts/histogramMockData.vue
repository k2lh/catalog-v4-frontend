<template>
  <ve-histogram :data="chartData" height="300px" :extend="extend"></ve-histogram>
</template>

<script>
export default {
  name: 'BarChart',
  props: ["datasets", "showLabel"],
  computed: {
    chartData: function() {
      return this.chartComponentsData || [];
    }
  },
  data() {
    this.extend = {
      "xAxis.0.axisLabel.color": "#fff",
      "xAxis.0.axisLabel.align": "center",
      "yAxis.0.axisLabel.color": "#fff",
      color: ["#8A3FFC", "#20D5D2", "#EB4B86", "#6CCAFF", "#760A3A", "#D0B0FF"],
      legend: {
        textStyle: {
          color: "#fff",
          fontSize: 12
        }
      }
    };
    return {
      chartComponentsData: this.datasets
    };
  }
};
</script>
