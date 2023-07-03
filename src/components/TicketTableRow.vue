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
  <div>
    <el-row>
      <el-col :span="3" class="el-text">{{ name }}</el-col>
      <el-col :span="3" class="el-text">{{ name }}</el-col>
      <el-col :span="2" class="el-text">{{ calDuration(departure_time ?? -1, arrival_time ?? -1) }}</el-col>
      <el-col :span="3" class="el-text">{{ stations.idToName[start_station_id ?? -1] }}</el-col>
      <el-col :span="3" class="el-text">{{ stations.idToName[end_station_id ?? -1] }}</el-col>
      <el-col :span="3" class="el-text">{{ parseDate(departure_time) }}</el-col>
      <el-col :span="3" class="el-text">{{ parseDate(arrival_time) }}</el-col>
      <el-col :span="2" class="el-text" v-for="ticket in ticket_info" :label="ticket.type">{{ ticket.count }}</el-col>
      <el-col :span="2" class="el-text">
        <div style="display: flex; justify-content: flex-end; margin-top: 3vh;">
          <el-button @click="drawer = true">
            详情
          </el-button>
          <el-button type="primary" @click="handleOrder">
            购买
          </el-button>
        </div>
      </el-col>
    </el-row>
    <el-divider></el-divider>
  </div>

  <el-drawer v-model="drawer" direction="rtl" size="50%" destroy-on-close>
    <TrainDetail :trainId="id" />
  </el-drawer>

  <el-dialog v-model="dialog" title="Tips" width="50%" draggable destroy-on-close>
    <OrderForm v-bind="props"></OrderForm>
  </el-dialog>
</template>

<style scoped></style>