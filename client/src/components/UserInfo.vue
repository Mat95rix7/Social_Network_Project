<template>
    <div v-if="show" class="modal">
      <div class="modal-content rounded-3xl">
        <span class="close" @click="$emit('close')">&times;</span>
        <h2 class="text-green-500 text-center text-lg">Edit User Information</h2>
        <form class="w-4/5 flex mx-auto my-3" @submit.prevent="updateUser">
          <div class="w-full p-3 flex justify-center">
              <label for="image" class="flex content-center">
                <span class="material-symbols-outlined cursor-pointer 
                  text-green-500 rounded-[20px]" title="Changer votre image de profil">
                  <img :src="previewImage ? previewImage : picture" alt="Image Preview" class="size-[5vw] rounded-[25px]"/>
                </span>
              </label>
              <input type="file" @change="onChange" id="image" accept="image/*" style="display: none;">
          </div>
          <div class="flex flex-row m-2 bg-black rounded-lg">
            <label for="username" class="text-green-500 w-1/3 m-2 p-2 text-lg">Username:</label>
            <span type="text" class="bg-gray-400 text-black w-2/3 m-2 p-2 rounded-lg text-lg">{{ username }}</span>
          </div>
          <div class="flex flex-row m-2 bg-black rounded-lg">
            <label for="email" class="text-green-500 w-1/3 m-2 p-2 text-lg">Email:</label>
            <span type="email" class="bg-gray-400 text-black w-2/3 m-2 p-2 rounded-lg text-lg"> {{ email }}</span>
          </div>  
          <div class="flex m-2 bg-black rounded-lg">
            <span class="text-green-500 w-1/3 m-2 p-2 text-lg">Post Likés :</span>
            <span class="bg-gray-400 text-black w-2/3 m-2 p-2 rounded-lg text-lg">{{currentUser.User.likes.length}}</span>
          </div>
          <button type="submit" class="mt-10 m-2 p-2 bg-green-500 text-white text-lg text-center rounded-lg">Save Changes</button>
        </form>
      </div>
    </div>



  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useUsersStore } from "@/stores/user";
  const usersStore = useUsersStore();
  const emit  = defineEmits(['close'])
  const currentUser = defineProps(['User'])
  
  const show = true
  let previewImage = ''

  const username = currentUser.User.username
  const email = currentUser.User.email
  const picture = ref(currentUser.User.picture)
  // console.log(currentUser)

  const formData = new FormData()
  const user = {
    'username' : username
  }
  const onChange = (event) => {
      const file = event.target.files[0]
      formData.append('image', file)
      previewImage = URL.createObjectURL(file)
    }
  
    const updateUser = () => {
      formData.append('user', JSON.stringify(user))
      usersStore.updateUser(currentUser.User._id, formData)
      location.reload()
      emit('close')
      return
    }

  
  </script>
  
  <style scoped>
  .modal {
    display: flex;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
    justify-content: center;
    align-items: center;
  }

  .modal-content {
    background-color: #171e27;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 60%;
  }

  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  </style>
  