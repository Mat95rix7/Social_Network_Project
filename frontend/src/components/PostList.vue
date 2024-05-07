<template>
  <div class="w-9/12 bg-gray-700  p-2 mx-auto">
    <CreatePost />
    <div class=" bg-gray-900 rounded-lg p-2">
      <div v-for="post in postsStore.posts" :key="post.id">
        <div class=" bg-black rounded-lg p-2 m-2 text-lg" :id="post.id">
            <div class="flex justify-between" >
                <h2 class="text-green-500 font-bold" >{{ posterName(post.posterId) }}</h2>
                <p class="text-white text-sm">Posted  {{ $filters.formatDate(post.updatedAt) }} {{ $filters.formatHour(post.updatedAt) }}  </p>
            </div>
            <p class="text-white text-justify p-2">{{ post.message }}</p>
            <div class="flex">
              <div class="flex w-1/2">
                <span class="material-symbols-outlined cursor-pointer text-green-500" title="Like the post">favorite</span>
                <span class=" px-3" title="Number of like">s</span>
              </div>
              <div class="flex w-1/2 justify-end">
                <span class="material-symbols-outlined 
                      cursor-pointer text-green-500 px-5" 
                      @click="openEditPopup()"
                      v-if="post.posterId == jwtStore.posterId"
                      title="Edit the post">edit</span>
                      <span class="material-symbols-outlined 
                      cursor-pointer text-green-500"
                      @click="deletePost(post._id)"
                      v-if="post.posterId == jwtStore.posterId"
                      title="Delete the post">delete</span>
              </div>
              <ModifyPost v-if="isEditPopupOpen" :id="myPost._id" @edit="updatePost" @close="closeEditPopup" />
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  // import { ref, defineEmits } from 'vue';
  import { useJwtStore } from "../stores/jwt";
  import { useUsersStore } from "../stores/user";
  import { usePostsStore } from "../stores/post";
  
  import CreatePost from "./CreatePost.vue";
  import ModifyPost from "./ModifyPost.vue"

  
  const jwtStore = useJwtStore();
  const postsStore = usePostsStore();
  const usersStore = useUsersStore();

  const posterName = (id) => {
    for(let user of usersStore.users){
      if (user._id === id){
        return user.username
      }
    }
  }
  

  
  async function deletePost(id) {
      const res = await postsStore.deletePost(jwtStore.jwt, id);
      if (res !== "ok") {
        alert(res);
      }
      window.location.reload();
      return;
}  




// const props = defineProps(['myPost']);
// const isEditPopupOpen = ref(false);
// const { emit } = defineEmits(['updatePost', 'closeEditPopup']);

// const openEditPopup = () => {
//   isEditPopupOpen.value = true;
// };

// const closeEditPopup = () => {
//   isEditPopupOpen.value = false;
// };

// const updatePost = (newPost) => {
//   console.log('Nouvelles valeurs du post :', newPost);
// };

</script>

<style>
.material-symbols-outlined {
  font-variation-settings:
  'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 40
}
</style>