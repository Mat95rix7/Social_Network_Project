import { defineStore, storeToRefs } from "pinia";
import axios from 'axios'
axios.defaults.withCredentials = true;

export const usePostsStore = defineStore("posts", {
  state: () => ({
    posts: storeToRefs([]),
  }),

  actions: {
    async setPosts() {
      await axios(
        {
          method: "GET",
          url: `${import.meta.env.VITE_APP_API_URL}post`,
          headers: {
            "Content-Type": "application/json",
            }
          })
        .then((res) => {
            this.posts = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        })
        .catch((e) => {
          console.log("error", e);
        });
    },

    async createPost(posterId, message) {
      await axios(
            {
              method: "POST",
              url: `${import.meta.env.VITE_APP_API_URL}post`,
              headers: {
                "Content-Type": "application/json",
              },
              data: JSON.stringify({
                    posterId,
                    message
                  }),
            }
        )
      .then((res) => {
        this.posts.push(res.data)
        this.posts = this.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        console.log("Post crée avec succès")
        return
        
      })
      .catch((e) => {
        console.log("error", e);
        return e;
      });
    },

    async updatePost(id, message) {
      await axios(
        {
          method: "PUT",
          url : `${import.meta.env.VITE_APP_API_URL}post/` + id,
          headers: {
            "Content-Type": "application/json",
            },
          data: JSON.stringify({
            message,
          }),
        }
      )
        .then((r) => {
          const post = this.posts.find((p) => p._id === id);
          post.message = message;
          console.log("Modification effectuée avec succès")
        })
        .catch((e) => {
          console.log(e);
        });
    },

    async deletePost(id) {
      const conf = confirm("Voulez-vous vraiment supprimer ce post ?");
      if (!conf) {
        return;
      }
      await axios(
        {
          method: "DELETE",
          url : `${import.meta.env.VITE_APP_API_URL}post/` + id,
          headers: {
                "Content-Type": "application/json",
              },
        }
      )
      .then((r) => {
        this.posts = this.posts.filter(p => p._id !== id);
        console.log("suppression reussie !")
      })
      .catch((e) => { 
        console.log("error", e);
        return e; 
      });
    },

    async likePost(posterId, id) { 
      await axios(
        {
          method: "PATCH",
          url: `${import.meta.env.VITE_APP_API_URL}post/like/` + id,
          headers: {
            "Content-Type": "application/json", 
          },
          data: JSON.stringify({id : posterId})     
        })
        .then((r) => {
          const post = this.posts.find((p) => p._id === id);
          post.likers.push(posterId);
          console.log("le post est bien liké")
        })
        .catch((e) => { 
          console.log("error", e);
          return e; 
        });
    },

    async unlikePost(posterId, id) { 
      await axios(
        {
          method: "PATCH",
          url: `${import.meta.env.VITE_APP_API_URL}post/unlike/` + id,
          headers: {
            "Content-Type": "application/json", 
          },
          data: JSON.stringify({id : posterId})     
        })
        .then((r) => {
          const post = this.posts.find((p) => p._id === id);
          post.likers = post.likers.filter((p) => p != posterId)
          console.log("le post est bien disliké")
        })
        .catch((e) => { 
          console.log("error", e);
          return e; 
        });
    }
},
  persist: true,
});