<template>
  <div class="w-full h-full bg-gray-700 p-5">
    <LoginForm v-if="!token" :show-form="showFormLog" @close="closeFormLog"/>
    <Header v-if="token" @login="showLog" @register="showReg"/>
    <!-- <RegisterForm :show-form="showFormReg" @close="closeFormReg" /> -->
    <PostList />
    <Footer />
    
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

  // const cookies = document.cookie;
  // const cookiesArray = cookies.split('; ');

  // cookiesArray.forEach(cookie => {
  //   const [name, value] = cookie.split('=');
  //   if (name.trim() === 'Mycookie') {
  //       console.log('Mycookie:', decodeURIComponent(value));
  //   }
  // })

  const token = document.cookie.split('=')[1];
  console.log(token);
  
  const dataStringFromLocalStorage = localStorage.getItem('user');
  const dataFromLocalStorage = JSON.parse(dataStringFromLocalStorage);
  const username = dataFromLocalStorage.username
  const posterId = dataFromLocalStorage.posterId
 
  jwtStore.setJwt(token, username, posterId)
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


