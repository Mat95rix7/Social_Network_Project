<template>
  <div class="w-full bg-gray-700 p-5" :class="token ? 'h_full' : 'h-screen'">
    <LoginForm v-if="!token" :show-form="showForm"/>
    <div v-else>
      <Header :username="username"/>
      <CreatePost :posterId="posterId"/>
      <PostList :posterId="posterId"/>
      <Footer />
    </div>
  </div>
</template>

<script setup>
  import { useUsersStore } from "@/stores/user";
  import { usePostsStore } from "@/stores/post";
  import { useJwtStore } from "@/stores/jwt";

  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'
  import PostList from '@/components/PostList.vue'
  import LoginForm from '@/components/LoginForm.vue'
  import CreatePost from "@/components/CreatePost.vue";
  
  const jwtStore = useJwtStore();
  const usersStore = useUsersStore();
  const postsStore = usePostsStore();

  let token, username, posterId
  if (document.cookie !=''){
    token = document.cookie.split('=')[1];
    const dataStringFromLocalStorage = localStorage.getItem('user');
    const dataFromLocalStorage = JSON.parse(dataStringFromLocalStorage);
    username = dataFromLocalStorage.username
    posterId = dataFromLocalStorage.posterId
    jwtStore.setJwt(token, username, posterId)
    postsStore.setPosts();
    usersStore.setUsers();
  } 
  
  const showForm = true 


</script>
<style>
* {
  font-family: roboto;
}
</style>


