<template>
  <div class="component simple-bullet" :class="{ first: first === true }">
    <div class="bx--row">
      <div class="bx--no-gutter-sm -col-lg-4 -col-md-2 alignright">
        <div class="bx--type-productive-heading-01 card-title">
          {{ title }}
        </div>
        <div class="bx--type-body-short-01 trailer">
          {{ calcTitle() }}%
        </div>
      </div>
      <div class="bx--no-gutter-sm -col-lg-8 -col-md-6">
        <svg class="bullet" width="100%" height="30" xmlns="http://www.w3.org/2000/svg">
          <rect class="outer" :width="outerLength()" height="30" :fill="outercolor" />
          <rect class="inner" :width="innerLength()" height="15" y="7.5" :fill="innercolor" />
        </svg>
      </div>
      <div class="bx--no-gutter-sm -col-lg-4 -col-md-2">
        <div class="bx--type-body-short-01 trailer final">
          {{ innervalue | numFormat }} / {{ outervalue | numFormat }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BulletNew',
  props: {
    title: {
      type: String,
      default: ''
    },
    outervalue: {
      type: Number,
      default: 0
    },
    innervalue: {
      type: Number,
      default: 0
    },
    outercolor: {
      type: String,
      default: '#A5B4ED'
    },
    innercolor: {
      type: String,
      default: '#5B81F7'
    },
    question: {
      type: String,
      default: 'How did we get this number?'
    },
    first: {
      type: Boolean,
      default: false
    },
    group: {
      type: Object,
      default: () => {}
    }
  },
  computed: {

  },
  methods: {
    calcTitle() {
      if (this.outervalue) {
        var result = Math.round((this.innervalue / this.outervalue) * 100);
        return result;
      }
    },
    outerLength() {
      const calc = Math.round(this.innervalue ? (this.outervalue / this.innervalue) * 100 : 0)
      return this.outervalue > this.innervalue ? '100%' : `${calc === Infinity ? 0 : calc}%`
    },
    innerLength() {
      const calc = Math.round(this.outervalue ? (this.innervalue / this.outervalue) * 100 : 0);
      return this.innervalue > this.outervalue ? '100%' : `${calc === Infinity ? 0 : calc}%`;
    }
  }
}
</script>

<style lang="scss" scoped>
  .trailer {
    white-space: nowrap;
    margin: 0 1rem;
    &.final {
      position: relative;
      top: 20%;
    }
  }
  .simple-bullet {
    padding: 1rem 1rem 2rem 1rem;
    &:last-of-type {
      padding: 1rem 1rem 1.5rem 1rem;
    }
  }
  .card-title {
    font-weight: 600;
    margin: 0 1rem 0 0;
  }
</style>
