import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    account: null,
    token: "",
    error: null,
  }),

  getters: {
    get_account: (state) => state.account,
    get_token: (state) => state.token,
  },
  actions: {
    setAccount(account) {
      console.log('account: ', account);
      this.$patch({ account });
      localStorage.setItem("userId", account._id);
    },
    setToken(token) {
      console.log(token);
      this.token = token;
      localStorage.setItem("userToken", token);
    },
    async createAccount(userData) {
      try {
        const response = await axios.post(
          "http://localhost:3000/account/create",
          userData
        );
        this.setAccount(response.data.user);
        this.setToken(response.data.token);
      } catch (error) {
        console.error(error);
        this.error =
          error.response?.data?.message || "Error al crear la cuenta"; // Manejo del error
      }
    },
    async signIn(userData) {
      try {
        const response = await axios.post(
          "http://localhost:3000/account/login",
          userData
        );
        this.setAccount(response.data.user);
        this.setToken(response.data.token);
      } catch (error) {
        console.error(error);
        this.error =
          error.response?.data?.message || "Error al iniciar sesión"; // Manejo del error
      }
    },
    async logout() {
      try {
        await axios.post("http://localhost:3000/account/logout");
        this.setAccount(null);
        this.setToken(null);
        localStorage.removeItem("userToken");
      } catch (error) {
        console.error(error);
      }
    },
  },
});
