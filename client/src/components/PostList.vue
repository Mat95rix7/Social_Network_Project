<template>
  
  <CreatePost :current="User"/>
  
  <div class="w-9/12  bg-gray-700  p-2 mx-auto">
    <div class="min-h-[50vh] bg-gray-900 rounded-lg p-2">
      <div v-for="post in postsStore.posts" :key="post._id">
        <div class=" bg-black rounded-lg p-2 m-2" :id="post._id">
            <div class="flex justify-between" >
              <div class="flex text-left size-8">
                <img :src="getPicture(post.posterId)" alt="Profil Image" class="rounded-[25px]"/>
                <h2 class=" text-3xl text-green-500 font-bold mx-5" >{{ getUserName(post.posterId) }}</h2>
              </div>
                <p class="text-white text-sm">Posted  {{ $filters.formatDate(post.createdAt) }} {{ $filters.formatHour(post.createdAt) }}  </p>
            </div>
            <div class="flex">
              <p class="text-white 	break-words text-xl text-justify p-5 m-5 bg-gray-800 rounded-[10px]" :class="post.picture ? 'w-4/5' : 'w-full'">{{ post.message }}</p>
              <img v-if="post.picture" :src="post.picture" alt="Post Image" class="size-[16vw] p-5 rounded-[30px]">  
            </div>
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
                <span id="post._id"
                      class="material-symbols-outlined 
                      cursor-pointer text-green-500" 
                      v-if="checkUser(post.posterId)"
                      @click="openEditPopup(post)"
                      title="Edit the post">edit</span>
                <span class="material-symbols-outlined 
                      cursor-pointer text-green-500 px-10"
                      @click="deletePost(post._id)"
                      v-if="checkUser(post.posterId)"
                      title="Delete the post">delete</span>
              </div>
              
            </div>
        </div>
      </div>

      <ModifyPost v-if="selectedPost" @close="closeEditPopup" :post="selectedPost" :currentUser="User"/>

    </div>
  </div>
  
</template>

<script setup>
  import { ref } from 'vue';
  import { useUsersStore } from "@/stores/user";
  import { usePostsStore } from "@/stores/post";
  
  import ModifyPost from "@/components/ModifyPost.vue"  
  import CreatePost from '@/components/CreatePost.vue';
  
  const postsStore = usePostsStore();
  const usersStore = useUsersStore();
  
  const User = defineProps(['currentUser'])

  const userId = User.currentUser._id
  const isAdmin = User.currentUser.isAdmin

  const selectedPost = ref(null)
  const filled = ref(false);

  const getUserName = (id) => {
      const user = usersStore.getUserById(id);
      return user ? user.username : 'Unknown User';
    }

    const getPicture = (id) => {
      const user = usersStore.getUserById(id);
      return user ? user.picture : 'Unknown User';
    }


  // const isAdmin = (id) => {
  //     const user = usersStore.getUserById(id)
  //       return user.isAdmin
  //   }

  const checkUser = (id) => {
    if (isAdmin || (userId === id)){
      return true
    } else { 
      return false
    }
  } 

  async function deletePost(id) {
      await postsStore.deletePost(id, isAdmin);
      return;
  } 

  const openEditPopup = (post) => {
    selectedPost.value = post
  }

  const closeEditPopup = () => {
    selectedPost.value = false;
  };

  const isLiked = (post) => {
    return post.likers.includes(userId)
  }

  async function toggleLike(post){
    if (!isLiked(post)){
      await postsStore.likePost(userId, post._id);
      filled.value = true
      return;
    } else {
      await postsStore.unlikePost(userId, post._id);
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