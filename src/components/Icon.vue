<script>

import {storageLocal} from "~/utils/storage";

export default {
  name:"icon",
  data(){
    return{
      darkMode:storageLocal.getItem("mode"),
    }
  },
  methods: {
    async changeIcon() {
      if(this.darkMode === "dark") this.darkMode = "light";
      else this.darkMode = "dark";
      storageLocal.setItem("mode", this.darkMode);
    },
    getMode(){
      return this.darkMode;
    },
  },
  created () {
    window.addEventListener('changeMode', this.changeIcon);
  },
  beforeUnmount() {
    window.removeEventListener('changeMode', this.changeIcon);
  }

}
</script>

<template>
  <div v-if="getMode() === 'light'">
    <img src="icon_light.png">
  </div>
  <div v-else>
    <img src="icon_dark.png">
  </div>
</template>

<style scoped>

</style>