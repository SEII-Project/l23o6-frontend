<script setup lang="ts">

var conConfigs = [
  {prop: 'id', label: '车次号'},
  {prop: 'name', label: '列车名'},
  {prop: 'duration', label: '历时'},
  {prop: 'start_station_id', label: '出发站'},
  {prop: 'end_station_id', label: '到达站'},
  {prop: 'departure_time', label: '出发时间'},
  {prop: 'arrival_time', label: '到达时间'},
  {prop: 'ticket_info', label: '余票'},
]

</script>

<template>
  <div>
    <el-row>
      <el-col :span="3" class="el-text">车次号</el-col>
      <el-col :span="3" class="el-text">列车名</el-col>
      <el-col :span="2" class="el-text">历时</el-col>
      <el-col :span="3" class="el-text">出发站</el-col>
      <el-col :span="3" class="el-text">到达站</el-col>
      <el-col :span="3" class="el-text">出发时间</el-col>
      <el-col :span="3" class="el-text">到达时间</el-col>
      <el-col :span="2" class="el-text">余票</el-col>
      <el-col :span="2" class="el-text">详情</el-col>
    </el-row>
    <el-divider></el-divider>
  </div>
</template>


<style scoped>

</style>