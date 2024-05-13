<template>
    <div class="w-9/12 bg-gray-700  px-2 mx-auto">
      <form @submit.prevent="createPost" class="flex-row w-full bg-gray-900 rounded-lg my-5 p-2">
        <textarea v-model="message" type="text"
            class="w-4/5 bg-black m-1 p-2 rounded-lg text-white"
            placeholder="Quoi de neuf ?"></textarea>
        <button type="submit" class="w-1/5 m-1 bg-green-500 text-white rounded-lg">Send</button>
      </form>
    </div>
  </template>
    
  <script setup>
  import { usePostsStore } from '@/stores/post'
  import { ref } from 'vue'

  const postsStore = usePostsStore()
  const props = defineProps(["posterId"])
  const message = ref('');
  
  const createPost = async () => {
      const res = await postsStore.createPost(props.posterId, message.value)
      message.value = '';
    }
  </script>
  

  