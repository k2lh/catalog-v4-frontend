<template>
  <section class="arrow-vertical">
    <svg class="base-level" viewBox="0 0 15 270">
      <rect
          v-if="filter === 0"
          class="inferredskill"
          :y="inferredskill"
          :width="markerSize"
          :height="markerSize"
          fill="#cf59a3"
      />
      <line
          v-if="filter === 0"
          :y1="badgesandcert"
          :y2="inferredskill + markerSize"
          :stroke-dasharray="badgesandcert * 2"
          :stroke-dashoffset="badgesandcert * 2"
          class="line2"
          x1="7.5"
          x2="7.5"
          stroke="white"
          stroke-width="3"
      />
      <rect
          v-if="filter <= 1"
          class="badgesandcert-marker"
          :y="badgesandcert"
          :width="markerSize"
          :height="markerSize"
          fill="#439164"
      />
      <line
          v-if="filter <= 1"
          :y1="baseskill"
          :y2="badgesandcert + markerSize"
          :stroke-dasharray="badgesandcert * 2"
          :stroke-dashoffset="badgesandcert * 2"
          class="line1"
          x1="7.5"
          x2="7.5"
          stroke="white"
          stroke-width="3"
      />
      <rect
          :y="baseskill"
          width="15"
          height="15"
          fill="#852fe0"
      />
    </svg>
    <span class="title">
      {{ id }}
    </span>
  </section>
</template>

<script>
export default {
  name: 'ArrowVerticalOld',
  props: {
    id: {
      type: String,
      default: ''
    },
    baseskill: {
      type: String,
      default: ''
    },
    badgesandcert: {
      type: String,
      default: ''
    },
    inferredskill: {
      type: String,
      default: ''
    },
    filter: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      markerSize: 15
    }
  }
}
</script>

<style lang="scss">
  .vertical-arrow {
    display: inline-block;
    height: auto;
    min-height: 0;
    margin: 0 auto;
    text-align: center;
    .base-level {
      overflow: visible;
      width: 15px;
      height: auto;
      #arrow {
        overflow: visible;
      }
      .line1 {
        animation: dash 3s linear forwards;
      }
      .line2 {
        animation: dash 3s linear 3s forwards;
      }
      @keyframes dash {
        to {
          stroke-dashoffset: 0;
        }
      }
      .badgesandcert-marker {
        animation: 3s;
        visibility: hidden;
        animation: fadeIn 3s forwards;
      }
      .inferredskill {
        animation: 3s;
        visibility: hidden;
        animation: fadeIn 5s forwards;
      }
      @keyframes fadeIn {
        99% {
          visibility: hidden;
        }
        100% {
          visibility: visible;
        }
      }
    }

    .title {
      display: block;
    }
  }
</style>
