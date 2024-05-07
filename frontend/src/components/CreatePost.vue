<template>
    <form @submit.prevent="createPost" class="flex-row w-full bg-gray-900 rounded-lg my-5 p-2">
      <textarea v-model="message" type="text"
          class="w-4/5 bg-black m-1 p-2 rounded-lg text-white"
          placeholder="Quoi de neuf ?"></textarea>
      <button type="submit" class="w-1/5 m-1 bg-green-500 text-white rounded-lg">Send</button>
    </form>
  </template>
  
  
  <script setup>
  
  import { useJwtStore } from "../stores/jwt";
  import { usePostsStore } from '../stores/post';
  import { ref } from 'vue'
  
  const jwtStore = useJwtStore();
  const postStore = usePostsStore();

  
  const message = ref("");
  const error = ref("");
  
  const createPost = async () => {
      if (message.value.length === 0) {
        error.value = "Veuillez ecrire un message";
        return;
      }
      if (jwtStore.jwt === null) {
        error.value = "Veuillez vous connecter";
        return;
      }
      const res = await postStore.createPost(
        jwtStore.jwt,
        jwtStore.Id,
        message.value
      );
      message.value = ''
      window.location.reload();
      

      
      if (res !== "ok") {
        error.value = res;
        return;
      }
    };
  </script>
  

  