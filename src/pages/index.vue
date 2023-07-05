<script lang="ts" setup>

</script>


<template>
  <el-container>
    <Background></Background>
    <el-header style="position: fixed; width: 100%; z-index: 999">
      <MenuComponentTop pageIndex="/" />
      <MenuComponentSecond pageIndex="/" />
    </el-header>
    <el-main style="margin-top: 10vh">
      <el-row justify="center" style="display: flex; align-content: center; height: 80vh">
        <el-col :span="12" style="display: flex; align-items: center">
          <el-card class="search-ticket-card" shadow="hover" header="车票查询" style="border: 3px solid #AAAAAA">
            <SearchTicketForm :inline="false" @formUpdated="() => { $router.push('/search#query'); }"></SearchTicketForm>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<style scoped>
.search-ticket-card {
  width: 500px;
  height: 300px;
  margin: 0 auto 20vh;
}
</style>

