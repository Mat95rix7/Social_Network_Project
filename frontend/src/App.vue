<template>
  <div class="w-full bg-gray-700 p-5" :class="token ? 'h_full' : 'h-screen'">
    <LoginForm v-if="!token"  :show-form="showForm" @close="closeForm"/>
    <div v-if="token">
      <Header :username="username"/>
      <PostList :posterId="posterId"/>
      <Footer />
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { useUsersStore } from "@/stores/user";
  import { usePostsStore } from "@/stores/post";
  
  import LoginForm from '@/components/LoginForm.vue'
  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'
  import PostList from '@/components/PostList.vue'
  
  
  const usersStore = useUsersStore();
  const postsStore = usePostsStore();
  
  const showForm = ref(true)

  let token, username, posterId
  postsStore.setPosts();
  usersStore.setUsers();

  if (document.cookie !=''){
    token = document.cookie.split('=')[1];
    const dataStringFromLocalStorage = localStorage.getItem('user');
    const dataFromLocalStorage = JSON.parse(dataStringFromLocalStorage);
    username = dataFromLocalStorage.username
    posterId = dataFromLocalStorage.posterId
  } 

  
   
  const closeForm = () => {
    showForm.value = false
  }


</script>
<style>
* {
  font-family: roboto;
}
</style>


