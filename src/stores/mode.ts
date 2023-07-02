import {defineStore} from "pinia";


export const useModeStore = defineStore('mode', {
    state: () => {
        return {
            darkMode: false
        }
    },
    actions: {
        getDarkMode() :boolean {
            return this.darkMode;
        },
        changeMode() {
            this.darkMode = !this.darkMode
        }
    }
})