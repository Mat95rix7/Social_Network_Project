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
        <input type="submit" value="Inscription" />
        <span class="error" v-if="error !== ''">{{ error }}</span>
      </form>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";

const username = ref("");
const email = ref("");
const password = ref("");
const error = ref("");
const emit = defineEmits(["close"]);

defineProps({
  showForm: {
    type: Boolean,
    default: false,
  },
});


const register =  async () => {
  
    if (username.value.length === 0 || email.value.length === 0 || password.value.length === 0) {
      error.value = "Veuillez remplir tous les champs";
      return;
    }
  
  const data = {
        username: username.value,
        email: email.value,
        password: password.value,
      }
  const res = await fetch(`${import.meta.env.VITE_APP_API_URL}user/signup`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            
            })
           
    .then((r) => r.json())
    .then(data => {console.log('Succès :', data)})
    .catch((e) => {
      error.value = e.message;
      console.log(e.message);
    });
    console.log(res)
  if (res.status === 200) {
    // jwtStore.setJwt(res.body.token);
    alert("Votre inscription est réussie");
    await navigateTo("/");
    emit("close");
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
