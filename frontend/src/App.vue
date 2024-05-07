<template>
  <div class="w-full bg-gray-700 p-5" :class="token ? 'h_full' : 'h-screen'">
    <LoginForm v-if="!token" :show-form="showFormLog" @close="closeFormLog"/>
    <div v-if="token">
      <Header v-if="token" @login="showLog" @register="showReg"/>
      <RegisterForm :show-form="showFormReg" @close="closeFormReg" />
      <PostList />
      <Footer />
    </div>
  </div>
</template>

<script setup>
  import { useUsersStore } from "./stores/user";
  import { usePostsStore } from "./stores/post";
  import { useJwtStore } from "./stores/jwt";

  import { ref } from 'vue'
  import Header from './components/Header.vue'
  import Footer from './components/Footer.vue'
  import PostList from './components/PostList.vue'
  import LoginForm from './components/LoginForm.vue'
  import RegisterForm from './components/RegisterForm.vue'


  
  const jwtStore = useJwtStore();
  const usersStore = useUsersStore();
  const postsStore = usePostsStore();

  let token
  if (document.cookie !=''){
    token = document.cookie.split('=')[1];
    const dataStringFromLocalStorage = localStorage.getItem('user');
    const dataFromLocalStorage = JSON.parse(dataStringFromLocalStorage);
    const username = dataFromLocalStorage.username
    const posterId = dataFromLocalStorage.posterId
    jwtStore.setJwt(token, username, posterId)
  } 
  postsStore.setPosts();
  usersStore.setUsers();

  
  const showFormLog = ref(true);
  const showFormReg = ref(false); 
  const showLog = () => {
    showFormLog.value = true;
  };
  const showReg = () => {
    showFormReg.value = true;
  };

  const closeFormLog = () => {
    showFormLog.value = false;
  };

  const closeFormReg = () => {
    showFormReg.value = false;
  };

</script>


