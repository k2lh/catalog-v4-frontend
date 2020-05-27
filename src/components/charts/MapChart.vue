<template>
  <ve-map
      :data="chartData"
      :settings="chartSettings"
      :height="height"
      :width="width"
      :legend-visible="showLabel"
      :extend="extend"
  />
</template>

<script>
export default {
  name: 'MapChart',
  props: {
    height: {
      type: String,
      default() {
        return "300px";
      }
    },
    width: {
      type: String,
      default() {
        return "700px";
      }
    },
    showLabel: {
      type: Boolean
    },
    datasets: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    this.extend = {
      color: ['#5B81F7', '#A5B4ED', '#ED4E90', '#EBA3B9', '#3CAAC0', '#75C3D5', '#7DA837', '#B5E272'],
      legend: {
        textStyle: {
          color: "#fff",
          fontSize: 12
        }
      }
    };
    this.chartSettings = {
      // position: 'world',
      label: false,
      itemStyle: {
        normal: {
          borderColor: "#00f"
        }
      },
      zoom: 1.2,
      positionJsonLink:
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/95368/USA_geo.json",
      position: "USA",
      beforeRegisterMap(json) {
        return json;
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
