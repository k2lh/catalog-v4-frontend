<template>
  <section class="bx--resource-card bx--resource-card--dark">
    <div class="bx--tile" :class="'minht' + height">
      <div class="bx--type-productive-heading-01 card-title">
        {{ title }}
      </div>
      <div class="bx--type-productive-heading-05 padtop4">
        <span v-if="value">{{ value | numFormat }}</span>
        <span v-if="words">{{ words }}</span>
      </div>
      <div class="bx--type-body-short-01">
        {{ text }}
      </div>
      <a v-if="question" class="bx--type-helper-text-01" @click="toggleExplanation(group)">
        {{ question }}
      </a>
    </div>
  </section>
</template>

<script>
export default {
  name: 'BanCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 10
    },
    text: {
      type: String,
      default: ''
    },
    value: {
      type: Number,
      default: 0
    },
    words: {
      type: String,
      default: ''
    },
    question: {
      type: String,
      default: 'How did we get this number'
    },
    columns: {
      type: Number,
      default: 3
    },
    toggleExplanation: {
      type: Function,
      default: () => {}
    },
    group: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      json: null
    }
  }
}
</script>

<style scoped lang='scss'>

</style>
