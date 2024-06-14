<template>
    <div class="w-9/12 bg-gray-700  px-2 mx-auto">
      <form @submit.prevent="createPost" class="flex-row w-full bg-gray-900 rounded-lg my-5 p-2">
        <textarea v-model="contentInput" type="text" name="newPost"
            class="w-4/5 bg-gray-700 m-2 p-2 rounded-lg text-white min-h-48"
            placeholder="Quoi de neuf ?"></textarea>
          <div class="flex flex-col w-1/5">
            <div class="h-1/2 flex justify-center content-center">
              <label for="image" class="content-center">
                <span class="material-symbols-outlined cursor-pointer 
                  text-green-500" title="Ajouter une image">image</span>
              </label>
              <input type="file" @change="onFileChange" id="image" accept="image/*" style="display: none;">
            </div>
          <button type="submit" class="h-1/2 m-1 bg-green-500 text-white rounded-lg">Send</button>
        </div>
      </form>
    </div>
  </template>
    
  <script setup>
  import { ref } from 'vue'
  import { usePostsStore } from '@/stores/post'
  const postsStore = usePostsStore()
  
  const user = defineProps(['current'])
  const ourUser = user.current.currentUser
  const userId = ourUser._id
  const contentInput = ref('');
  let file



  const onFileChange = (event) => {
      file = event.target.files[0]
      return file
    }
  
  async function createPost() {
      const formData = new FormData()
      if (contentInput.value === ''){
        alert("Veuillez saisir un message")
      } else {
        // post.message = contentInput.value
        formData.append('posterId', userId)
        formData.append('message', contentInput.value)
        // formData.append('post', JSON.stringify(post))
        if(file) {
          formData.append('image', file)
        }
        await postsStore.createPost(formData)
        contentInput.value = '';
        file = null
        return
      }
    }
  </script>
  

  