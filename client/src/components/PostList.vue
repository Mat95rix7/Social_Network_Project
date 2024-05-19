<template>
  
  <CreatePost :creatorId="currentUserId"/>
  
  <div class="w-9/12  bg-gray-700  p-2 mx-auto">
    <div class="min-h-[50vh] bg-gray-900 rounded-lg p-2">
      <div v-for="post in postsStore.posts" :key="post._id">
        <div class=" bg-black rounded-lg p-2 m-2 text-lg" :id="post._id">
            <div class="flex justify-between" >
                <h2 class="text-green-500 font-bold" >{{ posterName(post.posterId) }}</h2>
                <p class="text-white text-sm">Posted  {{ $filters.formatDate(post.createdAt) }} {{ $filters.formatHour(post.createdAt) }}  </p>
            </div>
            <p class="text-white break-words text-justify p-2">{{ post.message }}</p>
            <div class="flex">
              <div class="flex w-1/2" >
                <span 
                      class="material-symbols-outlined
                            cursor-pointer text-green-500" 
                      :class="{liked : isLiked(post)}"
                            title="Like the post" 
                            @click="toggleLike(post)" >star</span>
                <span :id="post._id" class="px-3 text-xl text-green-500" title="Number of like">{{ post.likers.length }}</span>
              </div>
              <div class="flex w-1/2 justify-end">
                <span class="material-symbols-outlined 
                      cursor-pointer text-green-500"
                      @click="addPicture()"
                      v-if="checkUser(post.posterId)"
                      title="Inserer une image">image search</span>
                <span id="post._id"
                      class="material-symbols-outlined 
                      cursor-pointer text-green-500 px-5" 
                      v-if="checkUser(post.posterId)"
                      @click="openEditPopup(post)"
                      title="Edit the post">edit</span>
                <span class="material-symbols-outlined 
                      cursor-pointer text-green-500"
                      @click="deletePost(post._id)"
                      v-if="checkUser(post.posterId)"
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
  import { computed, ref } from 'vue';
  import { useUsersStore } from "@/stores/user";
  import { usePostsStore } from "@/stores/post";
  
  import ModifyPost from "@/components/ModifyPost.vue"  
  import CreatePost from '@/components/CreatePost.vue';
  
  const postsStore = usePostsStore();
  const usersStore = useUsersStore();
  
  const currentUser = defineProps(['userId'])
  const currentUserId = currentUser.userId



  const selectedPost = ref(null)
  const filled = ref(false);
  
  function posterName(id){
    for (const user of usersStore.users){
      if (user._id === id){
          return user.username
      }
    } 
  }

  const isAdmin = (id) => {
    for(const user of usersStore.users){
      if(user._id === id){
        return user.isAdmin
      }
    }
  }

  const checkUser = (id) => {
    if (isAdmin(currentUserId) || (currentUserId === id)){
      return true
    } else { 
      return false
    }
  } 

  async function deletePost(id) {
      await postsStore.deletePost(id);
      return;
  } 

  async function addPicture(id) {
      return;
  } 

  const openEditPopup = (post) => {
    selectedPost.value = post
  }

  const closeEditPopup = () => {
    selectedPost.value = false;
  };

  const isLiked = (post) => {
    return post.likers.includes(currentUserId)
  }

  async function toggleLike(post){
    if (!isLiked(post)){
      await postsStore.likePost(currentUserId, post._id);
      filled.value = true
      return;
    } else {
      await postsStore.unlikePost(currentUserId, post._id);
      filled.value = false
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