<template>
    <router-view></router-view>
</template>

<script>
import { useUserStore } from '../store/user-store';
import axios from 'axios';
export default {
    name: 'ProductLayout',
    async created() {
        try {
            const userId = localStorage.getItem('userId');
            const token = localStorage.getItem('userToken');
            const response = await axios.get("http://localhost:3000/account/sync", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    userId: userId
                }
            });

            if (response.status === 200) {
                await useUserStore().setAccount(response.data.user.user);
            }
        } catch (error) {
            console.error("Error sincronizando el token: ", error);
            localStorage.removeItem("userToken");
            localStorage.removeItem("userId");
        }
    },
}
</script>