<template>
  <div class="component simple-bullet" :class="{ first: first === true }">
    <div class="bx--row">
      <div class="bx--no-gutter-sm -col-lg-4 -col-md-1 alignright">
        <div class="bx--productive-heading-01 card-title">
          {{ calcTitle() }}%
        </div>
        <div class="bx--type-expressive-heading-02">
          {{ title }}
        </div>
        <div>
          <a class="bx--type-helper-text-01" @click="toggleExplanation(group, title)">
            {{ question }}?
          </a>
        </div>
      </div>
      <div class="bx--no-gutter-sm -col-lg-10">
        <svg class="bullet" width="100%" height="30" xmlns="http://www.w3.org/2000/svg">
          <rect class="outer" :width="outerLength()" height="30" :fill="outercolor" />
          <rect class="inner" :width="innerLength()" height="15" y="7.5" :fill="innercolor" />
        </svg>
      </div>
      <div class="bx--no-gutter-sm -col-lg-2 -col-md-1">
        <div class="bx--type-body-short-01 trailer">
          {{ innervalue }} / {{ outervalue }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BulletSimple',
  props: {
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
    title: {
      type: String,
      default: ''
    },
    question: {
      type: String,
      default: 'How did we get this number'
    },
    first: {
      type: Boolean,
      default: false
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
    margin: 0.45rem 1rem;
    color: #fff;
  }
  .simple-bullet {
    padding: 3rem 0 2rem;
    &.first {
      padding: 3rem 0 0 0;
    }
  }
  .bx--type-expressive-heading-05.card-title {
    font-size: 3rem;
    margin-top: -1rem;
  }
</style>
