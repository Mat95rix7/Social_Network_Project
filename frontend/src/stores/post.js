import { defineStore, storeToRefs } from "pinia";
import axios from 'axios'
axios.defaults.withCredentials = true;

export const usePostsStore = defineStore("posts", {
  state: () => ({
    posts: storeToRefs([]),
  }),

  actions: {
    async setPosts(jwt) {
      await axios(
        {
          method: "GET",
          url: `${import.meta.env.VITE_APP_API_URL}post`,
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${jwt}`,
            }
          })
        .then((res) => {
          // this.posts = res.data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
          return true
        })
        .catch((e) => {
          console.log("error", e);
          return false;
        });
      return true;
    },

    async createPost(jwt, posterId, message) {
      await axios(
        {
          method: "POST",
          url: `${import.meta.env.VITE_APP_API_URL}post`,
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${jwt}`,
          },
          data: JSON.stringify({
            posterId,
            message,
          }),
        }
      )
        .then((r) => console.log(r.data))
        .catch((e) => {
          console.log("error", e);
          return e;
        }); 
    },

    async updatePost(jwt, id, message) {
      const res = await axios(
        `${import.meta.env.VITE_APP_API_URL}post/` + id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // Authorization: "Bearer " + jwt,
          },
          body: JSON.stringify({
            message,
          }),
        }
      )
        .then((r) => r.json())
        .catch((e) => {
          error.value = e.message;
          console.log(e);
        });

      const post = this.posts.find((t) => t.id === id);
      post.title = title;
      post.content = content;
      post.completed = completed;
      post.isContentPrivate = isContentPrivate;
      return "ok";
    },

    async deletePost(jwt, id) {
      const conf = confirm("Voulez-vous vraiment supprimer cette post ?");
      if (!conf) {
        return;
      }
      const res = await axios(
        `${import.meta.env.VITE_APP_API_URL}post/` + id,
        {
          headers: {
            "Content-Type": "application/json", 
            // Authorization: "Bearer " + jwt,
            
          },
          method: "DELETE",
        }
      )
        .then((r) => console.log("suppression reussie !"))
        .catch((e) => { 
          console.log("error", e);
          return e; 
        });
      this.posts = this.posts.filter((p) => p.id !== id);
      return "ok";
    },
  },
  persist: true,
});
