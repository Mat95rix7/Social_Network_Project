import { defineStore, storeToRefs } from "pinia";
import axios from 'axios'
axios.defaults.withCredentials = true;

export const useJwtStore = defineStore("jwt", {
  state: () => ({
    jwt: storeToRefs(null),
  }),
  getters: {
    getJwt(state) {
      return state.username;
    },
    Id(state){
      return state.posterId;
    },
  },
  actions: {
    setJwt(jwt, username, posterId) {
      this.jwt = jwt;
      this.username = username;
      this.posterId = posterId;
    },
    
    async logout() {
      await axios({
        method: "GET",
        url: `${import.meta.env.VITE_APP_API_URL}user/logout`,
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${jwt}`,
          }
        })
        .then((res) => {
          this.jwt = null;
          localStorage.setItem('user','');
          document.cookie = 'MyCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          window.location.reload();
          return true
        })
        .catch((e) => {
          console.log("error", e);
          return false;
        });
     
      
    },
  },
  persist: true,
});
