<template>
  <main class="h-screen min-h-screen w-screen text-black md:p-4 bg-blue-500">
    <div class="login mt-14 mx-2  md:mx-20 p-0  md:p-4">
      <div class="mt-4 bg-white w-fit md:w-fit mx-auto justify-center content-center rounded-md p-6 md:p-10 shadow-lg">
        <h1 class="text-center weight-bold text-2xl mb-4 text-gray-900/80">
          Let's get started
        </h1>
        <div class="mt-4 flex flex-col justify-center">
          <label for="id-username"
            class="block mx-auto text-left w-full md:w-96 mb-0 text-sm font-medium text-black/80">
            Username
          </label>
          <input
            class="mt-0 mb-4 block w-full md:w-96 mx-auto px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
            type="text" id="id-username" v-model="username" placeholder="landing" />
          <label for="id-email" class="block mx-auto text-left w-full md:w-96 mb-0 text-sm font-medium text-black/80">
            Email
          </label>
          <input
            class="mt-0 mb-4 block w-full md:w-96 mx-auto px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
            type="email" id="id-email" v-model="email" placeholder="example@example.com" />
          <label for="id-password"
            class="block mx-auto text-left w-full md:w-96 mb-0 text-sm font-medium text-black/80">
            Password
          </label>
          <input
            class="mt-0 mb-4 block w-full md:w-96 mx-auto px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
            type="password" id="id-password" v-model="password" placeholder="Your secret password" />
          <span class="text-gray-800/60 my-4 p-10 bg-blue-300/20 w-full md:w-96 rounded-lg">
            By clicking on continue, you agree to the MVIPI Terms and the Privacy
            Policy.
          </span>
          <div class="create-btn mb-4 cursor-pointer bg-blue-600 hover:bg-blue-400 p-3 w-full md:w-96 mx-auto rounded"
            @click="createAccount">
            <h1 class="text-white text-xl text-center font-bold">
              Agree & Join
            </h1>
          </div>
          <hr />
          <span class="text-center my-4 text-gray-500 bg-orange-300/20 w-full md:w-96 rounded-lg p-2">
            Already on MVIPI?
            <RouterLink to="/account/login" class="text-blue-400 font-bold">
              Sign in
            </RouterLink>
          </span>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { RouterLink } from 'vue-router';
import { useUserStore } from '../store/user-store';

export default {
  name: 'CreateAccountView',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      systemLanguage: '',
    };
  },
  created() {
    this.systemLanguage = navigator.language || navigator.userLanguage;
  },
  methods: {
    async createAccount() {
      if (!this.username || !this.email || !this.password) {
        alert('Please fill in all the fields.');
        return;
      }

      const userData = {
        username: this.username,
        email: this.email,
        password: this.password,
        language: this.systemLanguage,
      };

      try {
        const userStore = useUserStore();
        await userStore.createAccount(userData);

        if (userStore.get_token && userStore.get_account) {
          this.$router.push('/'); 
        } else {
          alert('Error creating the account. Please try again.');
        }
      } catch (error) {
        console.error('Account creation failed:', error);
        alert('An unexpected error occurred. Please try again.');
      }
    }

  },
};
</script>