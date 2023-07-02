<script lang="ts" setup>
</script>

<template>
  <el-container>
    <Background></Background>
    <el-header style="position: fixed; width: 100%; z-index: 999">
      <MenuComponent pageIndex="/login" />
    </el-header>
    <el-main style="margin-top: 10vh">
      <el-row justify="center" style="display: flex; align-content: center;height: 80vh;">
        <el-col :span="12" style="display: flex; align-items: center">
          <el-card class="login-card" shadow="hover" header="账号密码登录" style="border: 3px solid #AAAAAA">
            <login-form />
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<style scoped>
.login-card {
  width: 350px;
  height: 230px;
  margin: 0 auto 20vh;
}
</style>