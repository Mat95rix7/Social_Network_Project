<template>
    <div class="w-9/12 mx-auto">
        <div class="flex  bg-gray-900 rounded-lg text-lg italic text-white p-5 m-2">
            <img class="w-9" src="../assets/reseau.png" alt="MySocialNetwork">
            <span class="w-5/6 px-5 "><span class="text-green-500">Star</span> Your Social Network</span>
            <span class="text-center cursor-pointer" v-if="!token" @click="$emit('login')">Login</span>
            <span class="text-right mx-2 text-green-500" v-if="token">{{ username }}</span>
            <span class="text-right mx-2 cursor-pointer" v-if="token" @click.prevent="jwtStore.logout(),$emit('login')">Logout</span>
        </div>
        <div class="bg-gray-700  p-2 mx-auto">
            <div class="text-3xl italic bg-gray-900 p-5 rounded-lg text-white">Hello 
                <span class="text-green-500">{{ username }}</span>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { useUsersStore } from "../stores/user";
    import { useJwtStore } from "../stores/jwt";
    const jwtStore = useJwtStore();
    const token = document.cookie.split('=')[1]
    const username = localStorage.getItem('username');
    console.log(username)

    // const usersStore = useUsersStore();

    
  


</script>