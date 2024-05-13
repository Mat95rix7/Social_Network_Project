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
          this.posts = res.data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
          return true
        })
        .catch((e) => {
          console.log("error", e);
          return false;
        });
      return true;
    },

    async createPost(posterId, message) {
      const r = await axios(
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
      .then((res) => this.posts.push(JSON.stringify(res.data)))
      .catch((e) => {
        console.log("error", e);
        return e;
      });
  },

    // async updatePost(jwt, id, message) {
    //   const res = await axios(
    //     `${import.meta.env.VITE_APP_API_URL}post/` + id,
    //     {
    //       method: "PUT",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         message,
    //       }),
    //     }
    //   )
    //     .then((r) => r.json())
    //     .catch((e) => {
    //       error.value = e.message;
    //       console.log(e);
    //     });

    //   const post = this.posts.find((t) => t.id === id);
    //   post.title = title;
    //   post.content = content;
    //   post.completed = completed;
    //   post.isContentPrivate = isContentPrivate;
    //   return "ok";
    // },

    async deletePost(id) {
      const conf = confirm("Voulez-vous vraiment supprimer cette post ?");
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
      .then((r) => console.log("suppression reussie !"))
      .catch((e) => { 
        console.log("error", e);
        return e; 
      });
      this.posts = this.posts.filter(p => p._id !== id);
      return "ok";
    },

  async likePost(jwt, posterId, id) { 
    await axios(
      {
        method: "PATCH",
        url: `${import.meta.env.VITE_APP_API_URL}post/like/` + id,
        headers: {
          "Content-Type": "application/json", 
          // Authorization: "Bearer " + jwt,
        },
        data: JSON.stringify({id : posterId})     
      })
      .then((r) => console.log(r))
      .catch((e) => { 
        console.log("error", e);
        return e; 
      });
    // this.posts = this.posts.filter((p) => p.id !== id);
    return "ok";
  },

  async unlikePost(jwt, posterId, id) { 
    await axios(
      {
        method: "PATCH",
        url: `${import.meta.env.VITE_APP_API_URL}post/unlike/` + id,
        headers: {
          "Content-Type": "application/json", 
          // Authorization: "Bearer " + jwt,
        },
        data: JSON.stringify({id : posterId})     
      })
      .then((r) => console.log(r))
      .catch((e) => { 
        console.log("error", e);
        return e; 
      });
    // this.posts = this.posts.filter((p) => p.id !== id);
    return "ok";
  }

},

  persist: true,
});
