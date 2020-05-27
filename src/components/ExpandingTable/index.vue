<template>
  <cv-data-table :columns="columns || []" :type="type" :class="{'':columns.length>0,'no-header':columns.length<=0,'card-cell':type=='detail'}">
    <template slot="data">
      <cv-data-table-row v-for="(row, index) in srcData" :key="index">
        <cv-data-table-cell v-if="row.type!='card'" style="width:20%">
          {{ row.category }}
        </cv-data-table-cell>
        <cv-data-table-cell v-if="row.type!='card'" style="width:14%">
          <div> {{ '$  '+(row.investment.toLocaleString()) }}</div>
          <div>{{ "Investment" }}</div>
        </cv-data-table-cell>
        <cv-data-table-cell v-if="row.type!='card'" style="width:14%">
          <div>{{ row.capacity.toLocaleString() }}</div>
          <div>{{ "Capacity" }}</div>
        </cv-data-table-cell>
        <cv-data-table-cell v-if="(row.type=='category') || (row.type=='entry')">
          <ArrowTrend :value="row.signingsRate" :text="(row.signingsRate).toLocaleString('en-US', { style: 'percent' })" />
          <div>{{ row.signingsCount.toLocaleString() }}</div>
        </cv-data-table-cell>

        <cv-data-table-cell v-if="row.type=='detail'">
          <div>{{ row.costPerson.toLocaleString() }}</div>
          <div>{{ "cost/person" }}</div>
        </cv-data-table-cell>

        <cv-data-table-cell v-if="(row.type=='category') || (row.type=='entry')">
          <ArrowTrend :value="row.revenueRate" :text="(row.revenueRate).toLocaleString('en-US', { style: 'percent' })" />
          <div>{{ row.revenueCount.toLocaleString() }}</div>
        </cv-data-table-cell>
        <cv-data-table-cell v-if="(row.type=='category') || (row.type=='entry')">
          <ArrowTrend :value="row.gpRate" :text="(row.gpRate).toLocaleString('en-US', { style: 'percent' })" />
          <div>{{ row.gpCount.toLocaleString() }}</div>
        </cv-data-table-cell>
        <cv-data-table-cell v-if="(row.type=='category') || (row.type=='entry')">
          <ArrowTrend :value="row.marginRate" :text="(row.marginRate).toLocaleString('en-US', { style: 'percent' })" />
          <div>{{ row.marginCount.toLocaleString() }}</div>
        </cv-data-table-cell>

        <cv-data-table-cell v-if="row.type=='card'" class="cardCell">
          <div class="lableDiv">
            {{ row.label }}
          </div>
          <div v-for="(item, valueIndex) in row.value" :key="valueIndex" class="spanDiv">
            <span>{{ item.claimCode }}</span>
            <span>{{ item.claimLabel }}</span>
          </div>
        </cv-data-table-cell>

        <template v-if="row.children" slot="expandedContent">
          <expanding-table
              :ref="row.category"
              :key="index"
              :columns="[]"
              :src-data="row.children"
              :type="row.type"
          />
        </template>
      </cv-data-table-row>
    </template>
  </cv-data-table>
</template>

<script>
export default {
  name: "ExpandingTable",
  props: {
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    type: {
      type: String,
      default() {
        return '';
      }
    },
    srcData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang='scss' scoped>
.bx--expandable-row > td {
  border-left: none;
}
.no-header /deep/ table thead {
  display: none;
}
.bx--data-table
  /deep/
  tr.bx--parent-row:not(.bx--expandable-row)
  + tr[data-child-row] {
  display: none !important;
}
.card-cell /deep/ .bx--data-table tbody {
  display: flex;
  tr{
    width: 100%;
    display: flex;
    height: 100%
  }
}
.cardCell{
  height: 100%;
  width: 100%;
}
.spanDiv{
    margin-top: 0.5rem;
    width: 100%;
    display: flex;
    justify-content: space-around
}
.lableDiv{
    width: 100%;
    display: flex;
    justify-content: center
}
</style>
