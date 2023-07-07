<script>

import {storageLocal} from "~/utils/storage";

export default {
  name:"background",
  data() {
    return{
      darkMode: storageLocal.getItem("mode"),
      fullWidth: document.documentElement.clientWidth,
      fullHeight: document.documentElement.clientHeight,
    }
  },
  methods: {
    async changeBackground() {
      if(this.darkMode === "dark") this.darkMode = "light";
      else this.darkMode = "dark";
      storageLocal.setItem("mode", this.darkMode);
    },
    getMode() {
      return this.darkMode;
    },
    handleResize() {
      this.fullWidth = document.documentElement.clientWidth;
      this.fullHeight = document.documentElement.clientHeight;
    },
  },
  created () {
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('changeMode', this.changeBackground);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('changeMode', this.changeBackground);
  }
}
</script>

<template>
  <div v-if="getMode() === 'light'">
    <div class="background_light" :style="{width: fullWidth+'px', height:fullHeight+'px'}">
     <div class="img_box"></div>
    </div>
  </div>
  <div v-else>
    <div class="background_dark" :style="{width: fullWidth+'px', height:fullHeight+'px'}">
      <div class="img_box"></div>
    </div>
  </div>

</template>

<style lang="scss" scoped>

  .background_light{
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    .img_box {
      transition: 0.7s;
      position: absolute;
      background-image: url("/landscape_light/0.jpg");
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      width: 100%;
      height: 100%;
    }
  }

  .background_dark{
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    .img_box {
      transition: 0.7s;
      position: absolute;
      background-image: url("/landscape_dark/0.jpg");
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      width: 100%;
      height: 100%;
    }
  }
</style>