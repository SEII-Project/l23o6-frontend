<script>

import {storageLocal} from "~/utils/storage";

export default {
  name:"icon",
  data(){
    return{
      darkMode:storageLocal.getItem("mode"),
      lightIconUrl:"public/icon_light.png",
      darkIconUrl:"public/icon_dark.png"
    }
  },
  methods: {
    getMode(){
      return this.darkMode;
    },

    changeIcon() {
      if(this.getMode() === "light") {
        this.lightImgIndex = (this.lightImgIndex + 1) % this.lightImgNum;
        this.lightImgUrl = '/background_light/' + this.lightImgIndex + '.jpg';
      }
      else {
        this.darkImgIndex = (this.darkImgIndex + 1) % this.darkImgNum;
        this.darkImgUrl = '/background_dark/' + this.darkImgIndex + '.jpg';
      }
    }
  },

}
</script>

<template>
  <div v-if="getMode() === 'light'">
    <img src="public/icon_light.png">
  </div>
  <div v-else>
    <img src="public/icon_dark.png">
  </div>
</template>

<style scoped>

</style>