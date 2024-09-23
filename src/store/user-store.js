import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        token: null
    }),
    getters: {
        get_user: (state) => state.user,
        get_token: (state) => state.token
    },
    actions: {
        async findUser(id) {
            try {
                const response = await axios.post(`${process.env.VUE_APP_API_URL}/checkUser`, {
                    _id: id
                });
                this.user = response.data.user;
                this.token = response.data.token;
                localStorage.setItem('user', JSON.stringify(response.data.user))
                localStorage.setItem('token', response.data.token)
            }
             catch (error) {
                console.error(error);
                localStorage.clear()
            }
        },
        update_user(new_user) {
            this.user = new_user
        },
        remove_user() {
            this.user = null
            localStorage.clear()
        },
        update_token(new_token) {
            this.token = new_token
        },
        remove_token() {
            this.token = null
        }
    }
})