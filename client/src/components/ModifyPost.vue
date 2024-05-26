<template>
  <div class="modal">
    <div class="popup">
      <form class="space" id="post" @submit.prevent="updatePost">
        <span class="material-symbols-outlined text-green-500 cursor-pointer flex justify-end" @click="$emit('close')">
            Close
          </span>
        <h3 class="text-green-500 text-2xl">Modifier le Post</h3>
        <div class="input">
          <textarea
            name="message"
            class="inputStyle textStyle"
            type="text"
            v-model="contentInput">
          </textarea>
        </div>
        <div class="flex flex-row">
            <div class="w-1/2 flex justify-center">
              <label for="image" class="content-center">
                <span class="material-symbols-outlined cursor-pointer 
                  text-green-500" title="Ajouter une image">image</span>
              </label>
              <input type="file" @change="onFileChange" id="image" accept="image/*" style="display: none;">
            </div>
            <button class="inputStyle inputSubmit" type="submit">Valider les modifications</button>
        </div>  
      </form>
    </div>
  </div>
  </template>
  
  <script setup>
    import { ref } from 'vue';
    import { usePostsStore } from "@/stores/post";
    import { useUsersStore } from "@/stores/user";
    const postsStore = usePostsStore();
    const usersStore = useUsersStore();

    const emit  = defineEmits(['close'])
    const myPost = defineProps(['post','currentUser'])
    const myUser = myPost.currentUser.currentUser
    
    const idPost = ref(myPost.post._id)
    const contentInput = ref(myPost.post.message)
    const userId = ref(myUser._id)
    const role = myUser.isAdmin
        
    const formData = new FormData()
    
    const onFileChange = (event) => {
      console.log('Hello')
      const file = event.target.files[0]
      formData.append('image', file)
    }

    // const role = (id) => {
    //   const user = usersStore.getUserById(id)
    //   return user.isAdmin
    // }

    const updatePost = () => {
      myPost.post.message = contentInput
      formData.append('post', JSON.stringify(myPost.post))
      formData.append('role', role)
      postsStore.updatePost(idPost.value, formData)
      emit('close')
      return
    }

  </script>
  
  <style>
  form {
    height: fit-content;
    width: fit-content;
    background-color: #111827;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
  }
  .space {
    padding: 20px;
    display: flex;
  }
  
  .inputStyle {
    border-radius: 8px;
    text-align: center;
    background-color: #374151;
    color: white;
    margin: 1vw;
    display: block;
    width: 30vw;
    padding: 0.4rem;
  }
  .textStyle{
    height: 15vw;
    text-align: justify;
  }
  
  .inputSubmit {
    width: 15vw;
    margin: auto;
    cursor: pointer;
    display: block;
    background-color: #4CAF50;
    color: white;
    font-weight: 600;
    border-radius: 5px;
    padding: 0.3em 0;
  }
  
  .inputSubmit:hover {
    background-color: #388E3C;
  }
  
  h3 {
    text-align: center;
  }

  .modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Arrière-plan semi-transparent pour assombrir le contenu en dessous */
  display: flex;
  justify-content: center;
  align-items: center;
}

  </style>
  