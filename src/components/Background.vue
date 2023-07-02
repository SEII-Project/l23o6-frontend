<script>

import {storageLocal} from "~/utils/storage";

export default {
  name:"background",
  data() {
    return{
      darkMode: storageLocal.getItem("mode"),
      fullWidth: document.documentElement.clientWidth,
      fullHeight: document.documentElement.clientHeight,
      darkImgNum: 11,
      darkImgIndex: storageLocal.getItem("darkImgIndex") === null ? 0 : +storageLocal.getItem("darkImgIndex"),
      darkImgUrl: storageLocal.getItem("darkImgUrl") === null ? '/background_dark/0.jpg' : storageLocal.getItem("darkImgUrl"),
      lightImgNum: 9,
      lightImgIndex: storageLocal.getItem("lightImgIndex") === null ? 0 : +storageLocal.getItem("lightImgIndex"),
      lightImgUrl: storageLocal.getItem("lightImgUrl") === null ? 'background_light/0.jpg' : storageLocal.getItem("lightImgUrl"),
      timer: null
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
    startTimer() {
      if(this.timer === null) {
        this.timer = setInterval(() => {
          window.dispatchEvent(new Event('changeImg'));
        }, 5000);
        storageLocal.setItem("carousel", "on");
      }
    },
    endTimer() {
      if(this.timer !== null) {
        window.clearInterval(this.timer);
        storageLocal.setItem("lightImgIndex", String(this.lightImgIndex));
        storageLocal.setItem("lightImgUrl", this.lightImgUrl);
        storageLocal.setItem("darkImgIndex", String(this.darkImgIndex));
        storageLocal.setItem("darkImgUrl", this.darkImgUrl);
        this.timer = null;
        storageLocal.setItem("carousel", "off");
      }
    },
    changeImg() {
      if(this.getMode() === "light") {
        this.lightImgIndex = (this.lightImgIndex + 1) % this.lightImgNum;
        this.lightImgUrl = '/background_light/' + this.lightImgIndex + '.jpg';
        storageLocal.setItem("lightImgIndex", String(this.lightImgIndex));
        storageLocal.setItem("lightImgUrl", this.lightImgUrl);
      }
      else {
        this.darkImgIndex = (this.darkImgIndex + 1) % this.darkImgNum;
        this.darkImgUrl = '/background_dark/' + this.darkImgIndex + '.jpg';
        storageLocal.setItem("darkImgIndex", String(this.darkImgIndex));
        storageLocal.setItem("darkImgUrl", this.darkImgUrl);
      }
    }
  },
  created () {
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('changeMode', this.changeBackground);
    window.addEventListener('changeImg', this.changeImg);
  },
  mounted() {
    if(storageLocal.getItem("carousel") === "on") {
      this.startTimer();
    }
  },
  beforeUnmount() {
    if(this.timer !== null) {
      window.clearInterval(this.timer);
      storageLocal.setItem("lightImgIndex", String(this.lightImgIndex));
      storageLocal.setItem("lightImgUrl", this.lightImgUrl);
      storageLocal.setItem("darkImgIndex", String(this.darkImgIndex));
      storageLocal.setItem("darkImgUrl", this.darkImgUrl);
    }
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('changeMode', this.changeBackground);
    window.removeEventListener('changeImg', this.changeImg);
  }
}
</script>

<template>

  <div v-if="getMode() === 'light'">
    <div class="background_light" :style="{width: fullWidth+'px', height:fullHeight+'px'}">
     <div class="img_box" :style="{width: fullWidth+'px', backgroundImage: 'url(' + this.lightImgUrl + ')'}"></div>
    </div>
  </div>
  <div v-else>
    <div class="background_black" :style="{width: fullWidth+'px', height:fullHeight+'px'}">
      <div class="img_box" :style="{width: fullWidth+'px', backgroundImage: 'url(' + this.darkImgUrl + ')'}"></div>
    </div>
  </div>

  <div style="position: fixed; display: flex; right: 0; bottom: 0">
    <div style="display: flex; width: 20vh; justify-content: end">
      <el-space>
        <el-button type="primary" @click="startTimer" style="margin-bottom: 15%">启用背景轮播</el-button>
        <el-button type="danger" @click="endTimer" style="margin-bottom: 15%">关闭背景轮播</el-button>
      </el-space>
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
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      width: 100%;
      height: 100%;
    }
  }

  .background_black{
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    .img_box {
      transition: 0.7s;
      position: absolute;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      width: 100%;
      height: 100%;
    }
  }
</style>