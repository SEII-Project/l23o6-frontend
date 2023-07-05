<script setup lang="ts">
import { h, onMounted, reactive, ref } from "vue";
import { request } from "~/utils/request";
import { ElNotification } from "element-plus";
import { useSearchStore } from "~/stores/search";
import { useRoute } from 'vue-router'

const route = useRoute();
const search = useSearchStore();

let trains = reactive({
  data: [],
  res: []
})
let loading = ref(false)
let empty = ref(false)

onMounted(() => {
  if (route.hash == "#query") {
    submit()
  }
})

let tick1 = false;
let tick2 = false;

const updateTrains = () => {
  if(tick1 ^ tick2) {
    if(tick1) {
      let i;
      let cnt = 0;
      trains.res = [];
      for(i = 0; i < trains.data.length; ++i) {
        if(trains.data[i].train_type == 'HIGH_SPEED') trains.res[cnt++] = trains.data[i];
      }
    }
    else {
      let i;
      let cnt = 0;
      trains.res = [];
      for(i = 0; i < trains.data.length; ++i) {
        if(trains.data[i].train_type == 'NORMAL_SPEED') trains.res[cnt++] = trains.data[i];
      }
    }
  }
  else trains.res = trains.data;
}

const Tick1 = () => {
  tick1 = !tick1;
  updateTrains();
}

const Tick2 = () => {
  tick2 = !tick2;
  updateTrains();
}

const submit = () => {
  loading.value = true
  const r = request({
    url: '/train',
    method: 'GET',
    params: {
      start_station_id: search.start_station_id,
      end_station_id: search.end_station_id,
      date: search.date
    }
  })

  r.then((res) => {
    trains.data = res.data.data
    updateTrains()
    console.log("submit")
    empty.value = trains.res.length === 0;
  }).catch((error) => {
    console.log(error)
    ElNotification({
      offset: 70,
      title: 'search错误',
      message: h('error', { style: 'color: teal' }, error.response?.data.msg),
    })
  }).finally(() => {
    loading.value = false
  })
}

</script>

<template>
  <el-container>
    <Background></Background>
    <el-header style="position: fixed; width: 100%; z-index: 999">
      <MenuComponentTop pageIndex="/search" />
      <MenuComponentSecond pageIndex="/search" />
    </el-header>
    <el-main v-loading="loading" style="height: 90vh;margin-top: 12vh">

      <div style="display: flex; justify-content: center; margin-bottom: 5vh">
        <el-card shadow="hover" style="width: 84%;  border: 3px solid #AAAAAA">
          <SearchTicketForm :inline="true" @formUpdated="submit" style="display: flex; justify-content: center" />
          <el-row style="justify-content: center">
            <el-text style="font-size: large">车次类型：</el-text>
            <el-checkbox style="zoom: 130%" @change="Tick1" label="高铁" />
            <el-checkbox style="zoom: 130%" @change="Tick2" label="普通列车"/>
          </el-row>
        </el-card>
      </div>
      <div style="display: flex; justify-content: center; height: 50vh">
        <el-scrollbar height="100%">
          <el-card shadow="hover" style="border: 3px solid #AAAAAA; width: 80vh">
            <el-empty v-if="empty" description=" "/>
            <train-description v-for="train in trains.res"  v-bind="train" />
          </el-card>
        </el-scrollbar>
      </div>
    </el-main>
  </el-container>
</template>

<style scoped></style>