<template>
  <div class="modal">
    <form class="space" id="post" @submit.prevent="updatePost">
      <div class="flex flex-row justify-between">
        <h3 class="text-green-500 text-2xl">Modifier le Post</h3>
        <span class="material-symbols-outlined text-green-500 cursor-pointer flex justify-end" @click="$emit('close')">Close</span>
      </div>
      <textarea name="message" class="inputStyle textStyle" type="text" v-model="contentInput"></textarea>
      <div class="flex flex-row mx-auto">
          <div class="w-2/5 ml-8 flex justify-center">
            <label for="image" class="content-center"></label>
            <input type="file" @change="onChange" id="image" accept="image/*"/>
          </div>
          <button type="submit" class="inputSubmit w-2/5" >Valider les modifications</button>
      </div>  
    </form>
  </div>
</template>
  
  <script setup>

    import { ref } from 'vue';
    import { usePostsStore } from "@/stores/post";
    const postsStore = usePostsStore();
    
    const emit  = defineEmits(['close'])
    const myPost = defineProps(['post','currentUser'])
    const myUser = myPost.currentUser.currentUser
    
    const idPost = ref(myPost.post._id)
    const contentInput = ref(myPost.post.message)
    const role = myUser.isAdmin
    
    const formData = new FormData()
    
    const onChange = (event) => {
      const file = event.target.files[0]
      formData.append('image', file)
    }

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
    margin: 1vw auto;
    /* display: block; */
    width: 95%;
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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

  </style>
  