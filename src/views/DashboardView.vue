<template>
    <main class="h-screen min-h-screen w-screen text-black md:p-4 lg:bg-gradient-to-b from-white from-90% to-black/30">
        <div class="dashboard mt-20 ml-10 mr-10  md:mx-20 p-0  md:p-4">
            <h1 class="text-4xl font-thin text-gray-900/80 mb-14">Dashboard</h1>
            <div class="">
                <h1 class="text-2xl mb-2 ">
                    Landings
                </h1>
                <div class="block w-full overflow-x-auto max-w-xl border">
                    <table class="items-center w-full bg-transparent border-collapse">
                        <thead>
                            <tr>
                                <th
                                    class="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                                    Name</th>

                                <th
                                    class="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-center uppercase border-l-0 border-r-0 whitespace-nowrap">
                                    External Link
                                </th>
                                <th
                                    class="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap min-w-140-px">
                                    Goal
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                            <tr class="text-gray-500">
                                <th
                                    class="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                                    <RouterLink to="dashboard/create">
                                        <span class="underline text-blue-500 font-medium">Create new landing</span>
                                    </RouterLink>
                                </th>
                                <td></td>
                            </tr>
                            <tr v-for="landing in landings" :key="landing._id" class="text-gray-500">
                                <th @click="goLandingAdminView(landing.username, landing.url)"
                                    class="border-t-0 cursor-pointer px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                                    {{ landing.title }}
                                </th>
                                <td class="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                                    <div class="flex items-center justify-center content-center">
                                        <div @click="goToLandingPage(landing.username, landing.url)" class="external-link bg-externalLink bg-center bg-contain bg-no-repeat p-3 cursor-pointer"></div>
                                    </div>
                                </td>
                                <td class="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                                    <div class="flex items-center">
                                        <span class="mr-2 text-xs font-medium">0%</span>
                                        <div class="relative w-full">
                                            <div class="w-full bg-gray-200 rounded-sm h-2">
                                                <div class="bg-cyan-600 h-2 rounded-sm" style="width: 0%"></div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { useUserStore } from '../store/user-store';
import axios from 'axios';

export default {
    name: 'DashboardView',
    data() {
        return {
            landings: [],
        }
    },
    mounted() {
        this.getUserLandings();
    },
    methods: {
        getUserLandings() {
            const userStore = useUserStore();
            const token = localStorage.getItem('userToken');
            const username = userStore.get_account.username;
            axios.post(`http://localhost:3000/landing/get-all`, { username }, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    this.landings = response.data;
                })
                .catch(error => {
                    console.error('Error getting user landings:', error);
                });
        },
        goToLandingPage(username, url) {
            const landingPageUrl = `/${username}/${url}`;
            window.open(landingPageUrl, '_blank');
        },
        goLandingAdminView(username, url) {
            this.$router.push(`/${username}/${url}/admin`);
        }
    }
}
</script>
