<template>
    <div class="popup">
      <form class="space" @submit.prevent="updatePost">
        <h3>Modifier le Post</h3>
        <div class="input">
          <textarea
            name="message"
            class="inputStyle textStyle"
            type="text"
            v-model="editedPost.message">
          </textarea>
        </div>
        <button class="inputStyle inputSubmit"
          type="submit">Valider la modification</button>
      </form>
      <span class="error" v-if="error !== ''">{{ error }}</span>
    </div>
  </template>
  
  <script setup>
      import { ref, toRefs, defineEmits } from 'vue';

      const props = toRefs(props);
      const editedPost = ref({ content: props.myPost.message });

      const { emit } = defineEmits(['edit', 'close']);

      const updatePost = () => {
        emit('edit', editedPost.value);
        emit('close');
      };

  // import { ref } from "vue";
  // import { useJwtStore } from "../stores/jwt";
  // import { usePostsStore } from "../stores/post";
  
  // const { id, posterId, message, isSelected} = defineProps({
  //   id: Number,
  //   posterId: Number,
  //   message: String,
  //   isSelected: Boolean
  // });
  
  // const postsStore = usePostsStore();
  // const jwtStore = useJwtStore();
  
  
  // const contentInput = ref(message);
  // const error = ref("");
  
  // const emit = defineEmits(["close"]);
  
  // const updatePost = async () => {
  //   const res = await postsStore.updatePost(
  //     jwtStore.jwt,
  //     id,
  //     contentInput.value,
  //   );
  //   if (res !== "ok") {
  //     error.value = res;
  //     return;
  //   }
  //   emit("close");
  // };
  // const endPostEdit = () => {
  //   updatePost();
  //   postsStore.posts.sort((a, b) => {
  //     if (a.completed < b.completed) {
  //       return 1;
  //     }
  //     if (a.completed > b.completed) {
  //       return -1;
  //     }
  //     return 0;
  //   });
  //   for (let currentTask of taskStore.tasks){
  //       currentTask.isSelected = false
  //   }
  // };
  </script>
  
  <style>
  form {
    height: fit-content;
    width: fit-content;
    background-color: #262636;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
  }
  .error {
    text-align: center;
    color: #ee2020;
  }
  label {
    display: block;
    text-align: left;
  }
  
  .label {
    margin: 0 1.5rem;
  }
  .check {
    cursor: pointer;
  }
  
  .checkboxInput {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }
  .space {
    padding: 20px;
    display: flex;
  }
  
  .inputStyle {
    border-radius: 8px;
    text-align: center;
    background-color: #37374b;
    color: white;
    margin: 1em;
    display: block;
    width: 45vw;
    padding: 0.4rem;
    border: 1px solid #2c2c3b;
  }
  .textStyle{
    height: 15vw;
    text-align: justify;
  }
  
  .inputSubmit {
    cursor: pointer;
    display: block;
    background-color: #8c9cff;
    color: white;
    font-weight: 600;
    border: 1px solid #8c9cff;
    border-radius: 5px;
    padding: 0.3em 0;
  }
  
  .inputSubmit:hover {
    background-color: #6665d2;
    border: 1px solid #6665d2;
  }
  
  h3 {
    text-align: center;
  }
  </style>
  