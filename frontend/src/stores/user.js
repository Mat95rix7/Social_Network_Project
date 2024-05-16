import { defineStore, storeToRefs } from "pinia";
import axios  from 'axios'
// axios.defaults.withCredentials = true;

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: storeToRefs([]),
  }),
  actions: {
    
    async setUsers() {
      await axios({
        method: "GET",
        url: `${import.meta.env.VITE_APP_API_URL}user`,
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${jwt}`,
          }
        })
        .then((res) => {
          this.users = res.data;
          return true
        })
        .catch((e) => {
          console.log("error", e);
          return false;
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
        }
      )
      .then((res) => {
          console.log('Utilisateur connecté avec succès');
          responseAxios = res;
          const token = res.data.user.token;
          const username = res.data.user.username;
          const posterId = res.data.user._id;
          const userData = {'username': username, 'posterId': posterId};
          const dataString = JSON.stringify(userData);
          localStorage.setItem('user', dataString);
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
        }
      )
      .then((res) => responseAxios = res)
      .catch(er => responseAxios = er.response)
      
      return responseAxios
    },

    async logout() {
      await axios({
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
          window.location.reload();
          return true
        })
        .catch((e) => {
          return false;
        });
     },


    // async addUser(jwt, name, role, password, discordId, twitchId) {
    //   const res = await fetch(`${import.meta.env.VITE_APP_API_URL}user`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${jwt}`,
    //     },
    //     body: JSON.stringify({
    //       username,
    //       email,
    //       password,
    //       likers
    //     }),
    //   })
    //     .then((r) => r.json())
    //     .catch((e) => {
    //       console.log("error", e);
    //       return e;
    //     });
    //   if (res.statusCode !== 200) {
    //     if (res.body.error === "Invalid token") {
    //       return alert("Vous n'êtes pas autorisé à créer un utilisateur.");
    //     }
    //     if (res.body.error === "Expired token") {
    //       return alert("Votre session a expiré, veuillez vous reconnecter.");
    //     } else {
    //       return alert(
    //         "Une erreur est survenue lors de la création de l'utilisateur."
    //       );
    //     }
    //   }
    //   return true;
    // },

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

    // async updateUser(jwt, id, username, email, password) {
    //   const res = await fetch(`${import.meta.env.VITE_APP_API_URL}user/${id}`, {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${jwt}`,
    //     },
    //     body: JSON.stringify({
    //       username,
    //       email,
    //       password,
    //     }),
    //   })
    //     .then((r) => r.json())
    //     .catch((e) => {
    //       console.log("error", e);
    //       return false;
    //     });
    //   if (res.statusCode !== 200) {
    //     console.log("error", res.body.error);
    //     if (res.body.error === "Invalid token") {
    //       alert("Vous n'êtes pas autorisé à modifier un utilisateur.");
    //       return false;
    //     }
    //     if (res.body.error === "Expired token") {
    //       alert("Votre session a expiré, veuillez vous reconnecter.");
    //       return false;
    //     }
    //     alert(
    //       "Une erreur est survenue lors de la modification de l'utilisateur."
    //     );
    //     return false;
    //   }
    //   alert("L'utilisateur a bien été modifié.");
    //   return true;
    // },
  },
  persist: true,
});
