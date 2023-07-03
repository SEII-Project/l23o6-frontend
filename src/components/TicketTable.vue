<script setup lang="ts">

import { PropType, ref } from "vue";
import { useStationsStore } from "~/stores/stations";
import { calDuration, parseDate } from "~/utils/date";
import { useUserStore } from "~/stores/user";
import { useRouter } from "vue-router";
import { TicketInfo } from "~/utils/interfaces";

const props = defineProps({
  id: Number,
  name: String,
  start_station_id: Number,
  end_station_id: Number,
  departure_time: Number,
  arrival_time: Number,
  ticket_info: Array as PropType<TicketInfo[]>
})

const router = useRouter()
const user = useUserStore()
const stations = useStationsStore()

let drawer = ref(false)
let dialog = ref(false)

const handleOrder = () => {
  dialog.value = true
  if (user.name === '') {
    router.push('/login')
  }
}


</script>

<template>
  <el-table border>
    <el-table-column prop="id" label="车次号" aria-colspan="2">
      <template slot-scope="scope">
        {{ name }}
      </template>
    </el-table-column>
    <el-table-column prop="name" label="列车名" aria-colspan="2">
      <template slot-scope="scope">
        {{ name }}
      </template>
    </el-table-column>
    <el-table-column prop="duration" label="历时" aria-colspan="2">
      <template slot-scope="scope">
        {{ calDuration(departure_time ?? -1, arrival_time ?? -1) }}
      </template>
    </el-table-column>
    <el-table-column prop="start_station_id" label="出发站" aria-colspan="2">
      <template slot-scope="scope">
        {{ stations.idToName[start_station_id ?? -1] }}
      </template>
    </el-table-column>
    <el-table-column prop="end_station_id" label="到达站" aria-colspan="2">
      <template slot-scope="scope">
        {{ stations.idToName[end_station_id ?? -1] }}
      </template>
    </el-table-column>
    <el-table-column prop="departure_time" label="出发时间" aria-colspan="2">
      <template slot-scope="scope">
        {{ parseDate(departure_time) }}
      </template>
    </el-table-column>
    <el-table-column prop="arrival_time" label="到达时间" aria-colspan="2">
      <template slot-scope="scope">
        {{ parseDate(arrival_time) }}
      </template>
    </el-table-column>
    <el-table-column v-for="ticket in ticket_info" prop="ticket_info" label="余票" aria-colspan="2">
      <template slot-scope="scope">
        {{ ticket.count }}
      </template>
    </el-table-column>
    <el-table-column aria-colspan="6">
      <div style="display: flex; justify-content: flex-end;">
        <el-button @click="drawer = true">
          详情
        </el-button>
        <el-button type="primary" @click="handleOrder">
          购买
        </el-button>
      </div>
    </el-table-column>
  </el-table>

  <el-drawer v-model="drawer" direction="rtl" size="50%" destroy-on-close>
    <TrainDetail :trainId="id" />
  </el-drawer>

  <el-dialog v-model="dialog" title="Tips" width="50%" draggable destroy-on-close>
    <OrderForm v-bind="props"></OrderForm>
  </el-dialog>
</template>

<style scoped>

</style>