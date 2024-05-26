import { defineStore, storeToRefs } from "pinia";
import axios  from 'axios'
axios.defaults.withCredentials = true;

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: [],
    currentUser: null,
  }),

  getters: {
    getUserById: (state) => {
      return (id) => state.users.find(user => user._id === id)
    },
    // getCurrentUser :() => this.currentUser = state.currentUser
  },

  actions: {
    async setUser(id) {
      await axios(
        {
          method: "GET",
          url: `${import.meta.env.VITE_APP_API_URL}user/`+ id,
          headers: {
            "Content-Type": "application/json",
            }
        })
      .then((res) => {
        this.currentUser = res.data;
      })
      .catch((e) => {
        console.log("error", e);
      });
    },

    async setUsers() {
      await axios(
        {
          method: "GET",
          url: `${import.meta.env.VITE_APP_API_URL}user`,
          headers: {
            "Content-Type": "application/json",
            }
        })
      .then((res) => {
        this.users = res.data;
      })
      .catch((e) => {
        console.log("error", e);
      });
    },

    async login(email, password){
      let responseAxios
      await axios(
        {
          method : 'POST',
          url : `${import.meta.env.VITE_APP_API_URL}user/login`,
          data : {
            email: email.value,
            password: password.value,
          },
      })
      .then((res) => {
          console.log('Utilisateur connecté avec succès');
          responseAxios = res;
          sessionStorage.setItem('user', JSON.stringify(res.data.user));

      })
      .catch(er => responseAxios = er.response)
      return responseAxios
    },

    async register(username, email, password){
      let responseAxios
      await axios(
        {
          method : 'POST',
          url : `${import.meta.env.VITE_APP_API_URL}user/signup`,
          data : {
            username: username.value,
            email: email.value,
            password: password.value,
          },
        })
      .then((res) => responseAxios = res)
      .catch(er => responseAxios = er.response)
      return responseAxios
    },

    async logout() {
      await axios(
        {
          method: "GET",
          url: `${import.meta.env.VITE_APP_API_URL}user/logout`,
          headers: {
            "Content-Type": "application/json",
          }
      })
      .then((res) => {
        console.log("Déconnection réussie")
        localStorage.setItem('user','');
        document.cookie = 'MyCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        location.reload();
      })
      .catch((e) => console.log(e));
    },

    updateUser(id, formData) {
      axios(
        {
          method: "PUT",
          url : `${import.meta.env.VITE_APP_API_URL}user/` + id,
          data : formData
      })
        .then((r) => {
          const data = JSON.parse(sessionStorage.user)
          data.picture = r.data
          sessionStorage.setItem('user', JSON.stringify(data))  
        })
        .catch((e) => {
          console.log(e);
          return false;
        });
      alert("L'utilisateur a bien été modifié.");
      return true;
    },

    // async deleteUser(jwt, id) {
    //   const conf = confirm(
    //     "Êtes vous sûr de vouloir supprimer cet utilisateur ?"
    //   );
    //   if (!conf) {
    //     return;
    //   }
    //   const res = await fetch(`${import.meta.env.VITE_APP_API_URL}user/${id}`, {
    //     method: "DELETE",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${jwt}`,
    //     },
    //   })
    //     .then((r) => r.json())
    //     .catch((e) => {
    //       console.log("error", e);
    //       return e;
    //     });
    //   if (res.statusCode !== 200) {
    //     if (res.body.error === "Invalid token") {
    //       return alert("Vous n'êtes pas autorisé à supprimer un utilisateur.");
    //     }
    //     if (res.body.error === "Expired token") {
    //       return alert("Votre session a expiré, veuillez vous reconnecter.");
    //     } else {
    //       return alert(
    //         "Une erreur est survenue lors de la suppression de l'utilisateur."
    //       );
    //     }
    //   }
    //   //filtrer le tableau des users présent en cookie permet d'éviter un nouvel appel à l'API
    //   this.users = this.users.filter((user) => user.id !== id);
    //   return alert("L'utilisateur a bien été supprimé.");
    // },
  },
  persist: true,
});
