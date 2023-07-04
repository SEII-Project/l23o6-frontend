<script setup lang="ts">
import { h, reactive, ref, watch } from 'vue'
import { Location } from "@element-plus/icons-vue";
import { useStationsStore } from "~/stores/stations";
import { ElNotification } from "element-plus";
import { request } from "~/utils/request";
import { useRouter } from "vue-router";
import { RouteInfo } from '~/utils/interfaces';

const props = defineProps({
  name: String,
  route_id: Number,
  date: String,
  departure_times: Array,
  arrival_times: Array,
  extra_infos: Array,
  train_type: String
})


const router = useRouter()
const stations = useStationsStore()

let train = reactive({
  name: props.name,
  train_type: props.train_type,
  route_id: props.route_id,
  date: props.date,
  departure_times: props.departure_times as Array<string>,
  arrival_times: props.arrival_times as Array<string>,
  extra_infos: props.extra_infos as Array<string>
})
let route = reactive({
  id: 0,
  name: '',
  station_ids: []
})
let routes = ref([] as RouteInfo[])

let index = 0;
let dep_range_min = new Date(0, 0, 0)
let dep_range_max = new Date(0, 0, 0)
let arr_range_min = new Date(9999, 12, 30)
let arr_range_max = new Date(9999, 12, 30)
let previous = new Date(0, 0, 0)
let after = new Date(9999, 12, 30)


const setTarget = (num: Number) => {
  if(index != num) console.log("index from " + index + " to " + num);
  index = num;
  getRange();
}
const getRange = () => {
  let i;
  previous = train.date ? new Date(train.date) : new Date(0, 0, 0)
  after = new Date(9999, 12, 30)
  for (i = 0; i < route.station_ids.length; i++) {
    if (i < index) {
      if (train.arrival_times && train.arrival_times[i]) {
        let arrival_time = new Date(train.arrival_times[i]);
        previous = previous.getTime() > arrival_time.getTime() ? previous : arrival_time;
      }
      if (train.departure_times && train.departure_times[i]) {
        let departure_time = new Date(train.departure_times[i]);
        previous = previous.getTime() > departure_time.getTime() ? previous : departure_time;
      }
    } else if (i > index) {
      if (train.arrival_times && train.arrival_times[i]) {
        let arrival_time = new Date(train.arrival_times[i]);
        after = after.getTime() < arrival_time.getTime() ? after : arrival_time;
      }
      if (train.departure_times && train.departure_times[i]) {
        let departure_time = new Date(train.departure_times[i]);
        after = after.getTime() < departure_time.getTime() ? after : departure_time;
      }
    }
  }
  if(index != 0 && train.arrival_times && train.arrival_times[index]) dep_range_min = new Date(train.arrival_times[index]);
  else dep_range_min = previous;
  dep_range_max = after;
  if(index != route.station_ids.length - 1 && train.departure_times && train.departure_times[index]) arr_range_max = new Date(train.departure_times[index]);
  else arr_range_max = after;
  arr_range_min = previous;
}

const check = () => {
  let i;
  for(i = 1; i < route.station_ids.length; ++i) {
    let empty = new Date(0, 0, 0);
    let dep = train.departure_times && train.departure_times[i] ? new Date(train.departure_times[i]) : empty;
    let arr = train.arrival_times && train.arrival_times[i] ? new Date(train.arrival_times[i]) : empty;
    let pre_dep = train.arrival_times && train.arrival_times[i - 1] ? new Date(train.departure_times[i - 1]) : empty;
    console.log(dep.getTime() + " " + arr.getTime() + " " + pre_dep.getTime())
    if((dep.getTime() < arr.getTime() && dep.getTime() != empty.getTime()) || (arr.getTime() < pre_dep.getTime() && arr.getTime() != empty.getTime())) {
      ElNotification( {
        message: '请检查各个站点的到点/开点是否有序！',
        type: 'error'
      })
      return false;
    }
  }
  return true;
}

const disabledDateOnDep = (time: Date) => {
  getRange();
  return time.getTime() + 86400000 <= dep_range_min.getTime() || time.getTime() > dep_range_max.getTime();
}

const disabledDateOnArr = (time: Date) => {
  getRange();
  return time.getTime() + 86400000 <= arr_range_min.getTime() || time.getTime() > arr_range_max.getTime();
}

const getRoutes = () => {
  request({
    url: `/admin/route`,
    method: 'GET'
  }).then((res) => {
    routes.value = res.data.data
  }).catch((error) => {
    if (error.response?.data.code == 100003) {
      router.push('/login')
    }
    ElNotification({
      offset: 70,
      title: 'getRoutes错误(trainManage)',
      message: h('error', { style: 'color: teal' }, error.response?.data.msg),
    })
    console.log(error)
  })
  console.log("end")
}

getRoutes()

const getRoute = () => {
  if (train.route_id === undefined) return
  request({
    url: `/admin/route/${train.route_id}`,
    method: 'GET'
  }).then((res) => {
    route.id = res.data.data.id
    route.name = res.data.data.name
    route.station_ids = res.data.data.station_ids
  }).catch((error) => {
    if (error.response?.data.code == 100003) {
      router.push('/login')
    }
    ElNotification({
      offset: 70,
      title: 'getRoute错误(trainManage)',
      message: h('error', { style: 'color: teal' }, error.response?.data.msg),
    })
    console.log(error)
  })
}

watch(() => train.route_id, () => {
  train.departure_times = []
  train.arrival_times = []
  train.extra_infos = []
  getRoute()
})
getRoute()

</script>

<template>
  <div>
    <el-row>
      <el-col :span="7">
        <el-form-item>
          <template #label>
            <el-text tag="b" type="primary">
              车次名
            </el-text>
          </template>
          <el-input v-model="train.name" />
        </el-form-item>
      </el-col>
      <el-col :span="7" :offset="1">
        <el-form-item style="display: flex">
          <template #label>
            <el-text tag="b" type="primary">
              车型
            </el-text>
          </template>
          <el-select v-model="train.train_type" style="display: flex; flex-grow: 1">
            <el-option v-for="type in ['高铁', '普通列车']" :key="type" :label="type" :value="type" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8" :offset="1">
        <el-form-item style="display: flex">
          <template #label>
            <el-text tag="b" type="primary">
              日期
            </el-text>
          </template>
          <el-date-picker v-model="train.date" value-format="YYYY-MM-DD" :clearable="false"
            style="display: flex; flex-grow: 1" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-form-item>
          <template #label>
            <el-text tag="b" type="primary">
              路线名
            </el-text>
          </template>
          <el-select v-model="train.route_id" style="width: 100%">
            <el-option v-for="singleRoute in routes" :key="singleRoute.id" :label="singleRoute.name"
              :value="singleRoute.id" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <div v-for="(station, index) in route.station_ids" :key="station">
      <el-card style="margin-bottom: 0.25%" shadow="hover" class="container">
        <div style="display: flex; align-items: center;">
          <el-icon class="handle" size="large">
            <Location />
          </el-icon>
          <strong style="margin-left: 5%; margin-right: 5%">
            {{ index + 1 }}
            {{setTarget(index)}}
          </strong>
          <div style="width: 80%">
            {{ stations.idToName[station] }}
          </div>

          <el-date-picker style="width: 50%; margin-right: 1%" :disabled="index === 0" @focus="setTarget(index)"
            @change="() => { if (index === route.station_ids.length - 1) { train.departure_times[index] = train.arrival_times[index] } }"
            v-model="train.arrival_times[index]" type="datetime" placeholder="到点" format="YY/MM/DD HH:mm" :disabled-date="disabledDateOnArr" />

          <el-date-picker style="width: 50%" :disabled="index === route.station_ids.length - 1" @focus="setTarget(index)"
            @change="() => { if (index === 0) { train.arrival_times[0] = train.departure_times[0] } }"
            v-model="train.departure_times[index]" type="datetime" placeholder="开点" format="YY/MM/DD HH:mm" :disabled-date="disabledDateOnDep" />
        </div>
      </el-card>
    </div>

    <el-button @click="() => { if (check()) {$emit('formSubmitted', train) } }" style="margin-top: 2vh" type="primary">
      确认
    </el-button>


    <!--        <pre>-->
    <!--          {{ train.arrival_times }}-->
    <!--          {{train.departure_times }}-->
    <!--        </pre>-->
  </div>
</template>

<style scoped>
.change {
  visibility: hidden
}

.container:hover .change {
  visibility: visible
}
</style>
