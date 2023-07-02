<script>

import axios from "axios";
import {storageLocal} from "~/utils/storage";

export default {
  data() {
    return {
      text: storageLocal.getItem("hitokoto") === null ? '这是什么？按钮，按一下。' : storageLocal.getItem("hitokoto")
    }
  },
  methods: {
    refreshHitokoto() {
      axios.get('https://v1.hitokoto.cn')
          .then(({ data }) => {
            this.text = data.hitokoto;
            storageLocal.setItem("hitokoto", this.text);
          })
          .catch(console.error)
    },
    refresh() {
      window.dispatchEvent(new Event('hitokoto'));
    }
  },
  created() {
    window.addEventListener('hitokoto', this.refreshHitokoto);
  },
  beforeUnmount() {
    storageLocal.setItem("hitokoto", this.text);
    window.removeEventListener('hitokoto', this.refreshHitokoto);
  }
}

</script>

<template>
  <div style="position: fixed ; display: flex; bottom: 20px">
      <el-card shadow="hover" style="display: flex; width: auto; border: 3px solid #AAAAAA">
        <el-button type="primary" @click="refresh">一言</el-button>
        <el-text size="large">&emsp;{{this.text}}</el-text>
      </el-card>
  </div>

</template>

<style scoped>

</style>