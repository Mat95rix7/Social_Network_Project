<template>
    <div class="w-9/12 bg-gray-700  px-2 mx-auto">
      <form @submit.prevent="createPost" class="flex-row w-full bg-gray-900 rounded-lg my-5 p-2">
        <textarea v-model="message" type="text" name="newPost"
            class="w-4/5 bg-black m-1 p-2 rounded-lg text-white"
            placeholder="Quoi de neuf ?"></textarea>
        <button type="submit" class="w-1/5 m-1 bg-green-500 text-white rounded-lg">Send</button>
      </form>
    </div>
  </template>
    
  <script setup>
  import { ref } from 'vue'

  import { usePostsStore } from '@/stores/post'
  const postsStore = usePostsStore()
  
  const user = defineProps(['creatorId'])
  const userId = user.creatorId
  const message = ref('');
  
  async function createPost() {
      await postsStore.createPost(userId, message.value)
      message.value = '';
    }
  </script>
  

  