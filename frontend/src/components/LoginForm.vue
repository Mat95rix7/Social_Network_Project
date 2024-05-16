<template>
  <div>
    <transition name="fade">
      <div class="modal-mask" v-if="showForm" />
    </transition>
    <transition name="pop">
      <form v-if="showForm" @submit.prevent="login">
        <h2 class="text-green-500">Connexion</h2>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="Votre email"
            v-model="email"
            @keyup="handleChange"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            placeholder="Votre mot de passe"
            v-model="password"
            @keyup="handleChange"
          />
        </div>
        <input type="submit" value="Connexion" />
        <p class="text-white">Vous n'avez pas de compte ? 
          <span class="text-green-500 cursor-pointer"  v-if="!showRegisterForm" @click="showFormReg()">Inscrivez-vous</span>
          <RegisterForm :show-form="showRegisterForm"  @close="showFormReg"/>
        </p>
        <span class="error" v-if="error !== ''">{{ error }}</span>
      </form>  
    </transition>
  </div>
  
</template>

<script setup>

import { ref } from "vue";
import RegisterForm from "@/components/RegisterForm.vue";

import { useUsersStore } from "@/stores/user";
const usersStore = useUsersStore();

const emit = defineEmits(['close']);

defineProps({
  showForm: {
    type: Boolean,
    default: false,
  }
});

const email = ref("");
const password = ref("");
const error = ref("");

const showRegisterForm = ref(false);

const showFormReg = () =>{
  showRegisterForm.value = !showRegisterForm.value
}

const login = async () => {
    if (email.value.length === 0 || password.value.length === 0) {
      error.value = "Veuillez remplir tous les champs";
      return;
    }
    const res = await usersStore.login(email, password)
    if ( res.status === 200 ) {
        alert("Votre connexion est réussie");
        emit('close')
        // location.reload()
      } else {
          if(res.data.email != '' ){
            error.value = res.data.email
          } else {
            error.value = res.data.password
          }
        }
  }

const handleChange = () => {
  error.value = "";
};

</script>

<style scoped>
.modal-mask {
  content: "";
  position: absolute;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 998;
  background: #000000;
  opacity: 0.6;
}

.error {
  color: #eb353a;
}

form {
  position: absolute;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  text-align: center;
  width: 50vw;
  height: fit-content;
  max-width: 35em;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  background: #171e27;
  z-index: 999;
  transform: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

label {
  color: white;
  display: block;
  padding-bottom: 0.2em;
  margin: 1em;
}

input {
  background-color: #444444;
  padding: 0.5em 1em;
  border: none;
  border-radius: 8px;
  color: white;
}

input[type="submit"] {
  background-color: #22c55e;
  font-weight: bold;
  border: none;
  cursor: pointer;
  margin : 2rem;
}

input[type="submit"]:hover {
  background-color: rgb(3, 104, 40);
}

button {
  border: none;
  background-color: transparent;
  align-self: flex-end;
  cursor: pointer;
  color: white;
}
</style>
