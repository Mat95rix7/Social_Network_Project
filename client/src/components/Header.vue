<template>
    <div class="w-9/12 mx-auto">
        <div class="flex  bg-gray-900 rounded-lg text-lg italic text-white p-5 m-2">
            <img class="w-9" src="@/assets/star.png" alt="MySocialNetwork">
            <span class="w-5/6 px-5 text-2xl"><span class="text-green-500">Star</span> Your Social Network</span>
            <!-- <img :src="User.picture" alt="Profil_Image" class="w-2 text-right mx-2 rounded"> -->
            <!-- <span class="text-right mx-2 text-green-500 cursor-pointer" @click="showPopup">{{ User.username }}</span> -->
            <span class="text-right mx-2 cursor-pointer" @click.prevent="usersStore.logout()">Logout</span>
        </div>
        <div class="bg-gray-700  p-2 mx-auto">
            <div class="text-3xl italic bg-gray-900 p-5 rounded-lg text-white">Hello 
                <!-- <span class="text-green-500">{{ username }}</span> -->
            </div>
        </div>
        <div>
            <UserInfo v-if="show" :ourUser="currentUserId" @close="show = false" />
        </div>
    </div>
</template>
<script setup>
    import { ref } from 'vue'
    import UserInfo from "@/components/UserInfo.vue"
    import { useUsersStore } from "@/stores/user";
    const usersStore = useUsersStore();
    
    const user = defineProps(['username', 'userId'])
    const show = ref(false)
    const currentUserId = user.userId
    // const User = usersStore.getUserById(currentUserId)
    const User = usersStore.currentUser
    // const username = User.username
    // const picture = User.picture
    console.log(usersStore.currentUser)
    
    const showPopup = () => {
        show.value = true;
      }
</script>  