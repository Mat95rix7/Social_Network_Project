<template>
  <div>
    <transition name="fade">
      <div class="modal-mask" v-if="showForm" />
    </transition>
    <transition name="pop">
      <form v-if="showForm" @submit.prevent="register">
        <button type="button">
          <span class="material-symbols-outlined" @click="$emit('close')">
            Close
          </span>
        </button>
        <h2 class="text-green-500">Inscription</h2>
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="username"
            class="form-control"
            id="username"
            placeholder="Votre username"
            v-model="username"
            @keyup="handleChange"
          />
        </div>
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
        <div class="form-group">
          <label for="password">Confirm Password</label>
          <input
            type="password"
            class="form-control"
            placeholder="Votre mot de passe"
            v-model="confirmPassword"
            @keyup="handleChange"
          />
        </div>
        <input type="submit" value="Inscription" />
        <span class="error" v-if="error !== ''">{{ error }}</span>
      </form>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUsersStore } from "@/stores/user";
const usersStore = useUsersStore();

const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const error = ref("");
const emit = defineEmits(["close"]);

defineProps({
  showForm: {
    type: Boolean,
    default: false,
  },
});

const closeFormReg = () => {
  showForm.value = false;
};


const register =  async () => {
  if (username.value.length === 0 || 
      email.value.length === 0 || 
      password.value.length === 0 ||
      confirmPassword.value.length === 0) {
      error.value = "Veuillez remplir tous les champs";
      return;
    }  
  if (password.value !== confirmPassword.value){
    error.value = "Les mots de passes doivent être identiques";
    return;
  }
  const res = await usersStore.register(username, email, password)
      if ( res.status === 201 ){
        alert("Votre inscription est réussie");
        emit("close");
      } else {
            if(res.data.password != '' ){
              error.value = res.data.password
            } else { 
              if (res.data.username != ''){
                  error.value = res.data.username
                } else {
                  error.value = res.data.email
              }
            }
      } 
};

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
