<script setup lang="ts">
import { useUserStore } from "~/stores/user";
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter()
const user = useUserStore()

let index = ref(1)

const menuSelect = (key) => {
  index.value = key
  console.log(key);
}

</script>

<template>
  <el-container>
    <Background></Background>
    <el-header style="position: fixed; width: 100%; z-index: 999">
      <MenuComponentTop pageIndex="/user" />
      <MenuComponentSecond pageIndex="/user" />
    </el-header>
    <el-container style="display: flex; align-items: center; height: 60vh">
      <el-aside width=auto>
        <el-card shadow="hover" style="border: 3px solid #AAAAAA; border-left: 0">
          <el-menu default-active="1" class="el-menu-vertical-demo"
                   style="display: flex; flex-direction: column; justify-content: center; border: 0" @select="menuSelect">
            <el-menu-item index="1">
              <strong>
                个人信息
              </strong>
            </el-menu-item>
            <el-menu-item index="2">
              <strong>
                订单信息
              </strong>
            </el-menu-item>
          </el-menu>
        </el-card>
      </el-aside>
      <el-main>
        <div style="display: flex; justify-content: center" v-if="index == 1">
          <el-card shadow="hover" style="margin-top: 40vh; border: 3px solid #AAAAAA">
            <el-text size="large" type="primary" style="display: flex;justify-content: center">
              <h1>个人信息</h1>
            </el-text>
            <br />
            <UserInfoComponent style="width: 35vh; margin: 0 auto" />
          </el-card>
        </div>
        <div style="margin-top: 50vh; display: flex; justify-content: center; height: 80vh" v-else>
          <el-scrollbar style="height: 80%; ">
            <el-card shadow="hover" style="width: 650px; border: 3px solid #AAAAAA">
              <el-text size="large" type="primary" style="display: flex;justify-content: center">
                <h1>订单</h1>
              </el-text>
              <UserOrders />
           </el-card>
          </el-scrollbar>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>

</style>