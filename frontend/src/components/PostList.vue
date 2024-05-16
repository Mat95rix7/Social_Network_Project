<template>
  <CreatePost :posterId="posterId"/>
  
  <div class="w-9/12 bg-gray-700  p-2 mx-auto">
    <div class=" bg-gray-900 rounded-lg p-2">
      <div v-for="post in postsStore.posts" :key="post._id">
        <div class=" bg-black rounded-lg p-2 m-2 text-lg" :id="post._id">
            <div class="flex justify-between" >
                <h2 class="text-green-500 font-bold" >{{ posterName(post.posterId) }}</h2>
                <p class="text-white text-sm">Posted  {{ $filters.formatDate(post.updatedAt) }} {{ $filters.formatHour(post.updatedAt) }}  </p>
            </div>
            <p class="text-white text-justify p-2">{{ post.message }}</p>
            <div class="flex">
              <div class="flex w-1/2">
                <span 
                      class="material-symbols-outlined
                            cursor-pointer text-green-500" 
                      :class="{liked : isLiked(post)}"
                            title="Like the post" 
                            @click="toggleLike(post)" 
                            >star</span>
                <span :id="post._id" class="px-3 text-xl text-green-500" title="Number of like">{{ post.likers.length }}</span>
              </div>
              <div class="flex w-1/2 justify-end">
                <span id="post._id"
                      class="material-symbols-outlined 
                      cursor-pointer text-green-500 px-5" 
                      v-if="(post.posterId == posterId.posterId) || (post.username = 'Mat95rix7')"
                      @click="openEditPopup(post)"
                      title="Edit the post">edit</span>
                      <span class="material-symbols-outlined 
                      cursor-pointer text-green-500"
                      @click="deletePost(post._id)"
                      v-if="(post.posterId == posterId.posterId) || (post.username = 'Mat95rix7')"
                      title="Delete the post">delete</span>
              </div>
              
            </div>
        </div>
      </div>
      <ModifyPost v-if="selectedPost" @close="closeEditPopup" :post="selectedPost"/>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { useUsersStore } from "@/stores/user";
  import { usePostsStore } from "@/stores/post";
  
  import ModifyPost from "@/components/ModifyPost.vue"  
import CreatePost from './CreatePost.vue';
  
  const postsStore = usePostsStore();
  const usersStore = useUsersStore();

  const posterId = defineProps(['posterId'])
  const userId = posterId.posterId
  
  const selectedPost = ref(null)
  
  const posterName = (id) => {
    for(const user of usersStore.users){
      if (user._id === id){
        return user.username
      }
    }
  }

async function deletePost(id) {
    await postsStore.deletePost(id);
    return;
} 

const openEditPopup = (post) => {
  selectedPost.value = post
}

const closeEditPopup = () => {
  selectedPost.value = false;
};

const filled = ref(false);

const isLiked = (post) => {
  return post.likers.includes(userId)
}

async function toggleLike(post){
    if (!isLiked(post)){
      await postsStore.likePost(userId, post._id);
      filled.value = true
      // location.reload()
      return;
    } else {
      await postsStore.unlikePost(userId, post._id);
      filled.value = false
      // location.reload()
      return;
    }
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