<template>
  <div :class="{ 'up': isPositive(value), 'down': isNegative(value) }">
    <arrow-up-right v-if="isPositive(value)" />
    <arrow-down-right v-if="isNegative(value)" />
    <span v-if="value === 0">—</span>
    &nbsp;{{ text }}
  </div>
</template>
<script>
import ArrowUpRight from '@carbon/icons-vue/es/arrow--up-right/16'
import ArrowDownRight from '@carbon/icons-vue/es/arrow--down-right/16'

export default {
  name: 'ArrowTrend',
  components: {
    ArrowUpRight,
    ArrowDownRight
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    text: {
      type: String,
      default: ''
    }
  },
  methods: {
    isNegative(value) {
      return value < 0
    },
    isPositive(value) {
      return value > 0
    }
  }
}
</script>
<style lang="scss" scoped>
  .up {
    display: flex;
    align-items: center;
    color: #00B4A0;
    stroke: #00B4A0;
  }
  .down {
    display: flex;
    align-items: center;
    color: #FC4211;
    stroke: #FC4211;
    fill: #FC4211;
  }
  .text-detail {
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0px;
  }
</style>
