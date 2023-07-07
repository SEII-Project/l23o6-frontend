<script>
import {storageLocal} from "~/utils/storage";

export default {
  name: "indexBackground",
  data() {
    return {
      darkMode: storageLocal.getItem("mode") === null ? "light" : storageLocal.getItem("mode"),
      fullWidth: document.documentElement.clientWidth,
      fullHeight: document.documentElement.clientHeight,
      darkImgNum: 6,
      darkImgIndex: 0,
      darkImgUrl: '/landscape_dark/0.jpg',
      lightImgNum: 7,
      lightImgIndex: 0,
      lightImgUrl: '/landscape_light/0.jpg',
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
        this.timer = window.setInterval(() => {
          window.dispatchEvent(new Event('changeImg'));
        }, 5000);
      }
    },
    changeImg() {
      if(this.getMode() === "light") {
        this.lightImgIndex = (this.lightImgIndex + 1) % this.lightImgNum;
        this.lightImgUrl = '/landscape_light/' + this.lightImgIndex + '.jpg';
      }
      else {
        this.darkImgIndex = (this.darkImgIndex + 1) % this.darkImgNum;
        this.darkImgUrl = '/landscape_dark/' + this.darkImgIndex + '.jpg';
      }
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('changeMode', this.changeBackground);
    window.addEventListener('changeImg', this.changeImg);
  },
  mounted() {
    this.startTimer();
    console.error(this.darkMode)
    // this.startTimer();
  },
  beforeUnmount() {
    window.clearInterval(this.timer);
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
    <div class="background_dark" :style="{width: fullWidth+'px', height:fullHeight+'px'}">
      <div class="img_box" :style="{width: fullWidth+'px', backgroundImage: 'url(' + this.darkImgUrl + ')'}"></div>
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

.background_dark{
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