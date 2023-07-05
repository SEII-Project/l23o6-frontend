<script lang="ts" setup>
import { useUserStore } from "~/stores/user";
import { request } from "~/utils/request";
import { AxiosError, AxiosResponse } from "axios";
import { ElNotification } from "element-plus";
import { h } from "vue";
import { useRouter } from "vue-router";

defineProps<{
  pageIndex: string
}>()

const router = useRouter()
const user = useUserStore()

const menuSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
}

const logout = () => {
  request({
    url: '/session',
    method: 'DELETE'
  }).then((response: AxiosResponse<any>) => {
    ElNotification({
      offset: 70,
      title: '登出成功',
      message: h('info', { style: 'color: teal' }, response.data.msg),
    })
    user.$reset()
    router.push('/')
  }).catch((error: AxiosError<any>) => {
    console.log(error)
    ElNotification({
      offset: 70,
      title: 'logout错误',
      message: h('error', { style: 'color: teal' }, error.response?.data.msg),
    })
  });
}

</script>

<template>
  <el-menu :default-active="pageIndex" mode="horizontal" class="el-menu-demo" @select="menuSelect" :router=true
           :ellipsis="false" background-color="#1E90FF" text-color="#FFFFFF" active-text-color="#FFFFFF">
    <el-menu-item index="/search">车票购买</el-menu-item>
    <el-menu-item index="/station" v-if="user.userType === '管理员'">车站管理</el-menu-item>
    <el-menu-item index="/route" v-if="user.userType === '管理员'">路线管理</el-menu-item>
    <el-menu-item index="/train" v-if="user.userType === '管理员'">车次管理</el-menu-item>
  </el-menu>
</template>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>