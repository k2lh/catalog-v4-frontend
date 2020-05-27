<template>
  <div class="container">
    <PageheadSimple title="Table Demo" />
    <expanding-table :columns="columns" :orders="orders" :src-data="srcData" />
  </div>
</template>

<script>
import ExpandingTable from '@/components/ExpandingTable'
  export default {
    name:'',
    components: { ExpandingTable },
    data () {
      return {
        columns: ['', '', '', 'Signings', 'Revenue', 'GP', 'Margin'],
        orders: ['category', 'investment', 'capacity', 'signingsRate', 'revenueRate', 'gpRate', 'marginRate' ],
        srcData: [{
          category: 'MultiCloud Services',
          investment: 26013773,
          capacity: 6012,
          signingsRate: 0.29,
          signingsCount: 5549,
          revenueRate: 0.08,
          revenueCount: 2171,
          gpRate: 0.03,
          gpCount:1630,
          marginRate: 0.4,
          marginCount: -2,
          children: []
        }]
      };
    }
  }

</script>
<style lang='scss' scoped>

</style>
