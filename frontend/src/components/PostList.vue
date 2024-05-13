<template>
  <div class="w-9/12 bg-gray-700  p-2 mx-auto">
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
                <span :key="post.id" class="
                            material-symbols-outlined
                            cursor-pointer text-green-500" :class="{liked : filled}"
                            title="Like the post" 
                            @click="toggleLike(post.id)" 
                            >star</span>
                <span :key="post.id" class="px-3 text-xl text-green-500" title="Number of like">{{ count }}</span>
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
  import { ref } from 'vue';
  import { useJwtStore } from "../stores/jwt";
  import { useUsersStore } from "../stores/user";
  import { usePostsStore } from "../stores/post";
  
  import ModifyPost from "./ModifyPost.vue"

  
  const jwtStore = useJwtStore();
  const postsStore = usePostsStore();
  const usersStore = useUsersStore();

  let componentKey = ref()

  const posterName = (id) => {
    for(let user of usersStore.users){
      if (user._id === id){
        return user.username
      }
    }
  }

  const { id, isLiked, countLike} = defineProps({
  id: Number,
  isLiked: Boolean,
  CountLike: Number
});

  const filled = ref(isLiked);
  const count = ref(countLike);

  async function toggleLike(id) { 
    filled.value = !filled.value;
    count.value++
    console.log(filled, count)

  

    
  
    // async function likePost(id) {
    //   const res = await postsStore.likePost(jwtStore.jwt, jwtStore.Id, id);
    //   console.log(jwtStore.jwt, jwtStore.Id, id)
    //   console.log(res)
    //   if (res !== "ok") {
    //     alert(res);
    //   }
    //   // window.location.reload();
    //   return;
    // }

    // async function unlikePost(id) {
    //   const res = await postsStore.likePost(jwtStore.jwt, jwtStore.Id, id);
    //   console.log(jwtStore.jwt, jwtStore.Id, id)
    //   console.log(res)
    //   if (res !== "ok") {
    //     alert(res);
    //   }
    //   // window.location.reload();
    //   return;
    // }

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


async function deletePost(id) {
      const res = await postsStore.deletePost(jwtStore.jwt, id);
      if (res !== "ok") {
        alert(res);
      }
      return;
} 
</script>

<style scoped>
.material-symbols-outlined.liked {
  font-variation-settings:
  'FILL' 1,
  'wght' 400,
  'GRAD' 0,
  'opsz' 24
}
</style>