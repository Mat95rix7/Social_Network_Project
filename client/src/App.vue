<template>
  <div class="w-full bg-gray-700 p-5" :class="token ? 'h_full' : 'h-screen'">
    <LoginForm v-if="!token"  :show-form="showForm" @close="closeForm"/>
    <div v-if="token">
      <Header :currentUser="currentUser" />
      <PostList :currentUser="currentUser"/>
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

  let token, currentUser
  
  if (document.cookie !=''){
    token = document.cookie.split('=')[1];
    
    const dataStringFromSessionStorage = sessionStorage.getItem('user');
    currentUser = JSON.parse(dataStringFromSessionStorage);
    
    
    postsStore.setPosts()
    usersStore.setUsers()
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


