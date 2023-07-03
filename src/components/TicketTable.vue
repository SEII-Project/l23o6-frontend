<script setup lang="ts">

var conConfigs = [
  {prop: 'trainSerial', label: '车次号'},
  {prop: 'departStation', label: '出发站'},
  {prop: 'arriveStation', label: '到达站'},
  {prop: 'departTime', label: '出发时间'},
  {prop: 'arriveTime', label: '到达时间'},
  {prop: 'Duration', label: '历时'},
  {prop: 'Seat_0', label: '商务、特等座'},
  {prop: 'Seat_1', label: '一等座'},
  {prop: 'Seat_2', label: '二等座'}]

var tableData = [{trainSerial:'G7052',departStation:'北京',arriveStation:'广州',departTime:'00:00',arriveTime:'21:00',Duration:"21h",Seat_0:'12',Seat_1:'有',Seat_2:'无'},
  {trainSerial:'G7058',departStation:'徐州',arriveStation:'乌鲁木齐',departTime:'03:00',arriveTime:'次日02:00',Duration:"23h",Seat_0:'17',Seat_1:'有',Seat_2:'无'}]
</script>

<template>
  <el-table :data="tableData" border>
    <el-table-column aria-colspan="2"
    v-for="{prop ,label} in conConfigs"
    :key="prop"
    :prop="prop"
    :label="label">
    </el-table-column>
  </el-table>
</template>

<style scoped>

</style>