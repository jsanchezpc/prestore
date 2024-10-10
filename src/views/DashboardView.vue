<template>
    <main class="h-screen min-h-screen w-screen text-black md:p-4 lg:bg-gradient-to-b from-white from-90% to-black/30">
        <div class="dashboard mt-20 ml-10 mr-10  md:mx-20 p-0  md:p-4">
            <h1 class="text-4xl font-thin text-gray-900/80 mb-14">Dashboard</h1>
            <div class="w-full">
                <h1 class="text-2xl mb-2 ">
                    Landings
                </h1>
                <div class="block w-full overflow-x-auto max-w-5xl border">
                    <table class="items-center w-full bg-transparent border-collapse">
                        <thead>
                            <tr>
                                <th
                                    class="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                                    Name</th>

                                <th
                                    class="hidden md:block px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-center uppercase border-l-0 border-r-0 whitespace-nowrap">
                                    External Link/Copy
                                </th>
                                <th
                                    class="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap min-w-140-px">
                                    Edit/Delete
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
                                    class="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-2 text-left">
                                    <RouterLink to="dashboard/create">
                                        <span class="underline text-blue-500 font-medium">Create new landing</span>
                                    </RouterLink>
                                </th>
                                <td></td>
                            </tr>
                            <tr v-for="landing in landings" :key="landing._id" class="text-gray-500">
                                <th @click="goLandingAdminView(landing.username, landing.url)"
                                    class="border-t-0 cursor-pointer px-4 align-middle text-sm font-normal whitespace-nowrap p-2 text-left">
                                    {{ landing.title }}
                                </th>
                                <td class="border-t-0 px-2 align-middle text-xs whitespace-nowrap p-2">
                                    <div class="flex items-center justify-center content-center">
                                        <div @click="goToLandingPage(landing.username, landing.url)"
                                            class="external-link bg-externalLink bg-center bg-contain bg-no-repeat p-3 cursor-pointer">
                                        </div>
                                        <div @click="copyLandingURL(landing.username, landing.url)"
                                            class="copy-link bg-clipboard bg-center bg-contain bg-no-repeat p-2.5 cursor-pointer">
                                        </div>
                                    </div>
                                </td>
                                <td class="flex gap-2 border-t-0 px-4 align-middle text-xs whitespace-nowrap p-2">
                                    <div @click="editLanding(landing._id)"
                                        class="bg-edit bg-center bg-contain bg-no-repeat p-3 cursor-pointer"></div>
                                    <EditLandingPopup v-if="editPopup === true" :landing="landing"
                                        @confirmChanges="updateLanding" @close="closePopup(1)" />
                                    <div @click="trash()"
                                        class="bg-trash bg-center bg-contain bg-no-repeat p-3 cursor-pointer"></div>
                                    <DeletePopup :title="landing.title" v-if="trashPopup === true"
                                        @deleteLanding="deleteLanding(landing._id)" @close="closePopup(0)" />
                                </td>
                                <td class="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-2">
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
import EditLandingPopup from './../components/EditLandingPopup.vue';
import DeletePopup from './../components/DeletePopup.vue';
import axios from 'axios';

export default {
    name: 'DashboardView',
    components: {
        EditLandingPopup,
        DeletePopup
    },
    data() {
        return {
            landings: [],
            editPopup: false,
            trashPopup: false,
        }
    },
    mounted() {
        this.getUserLandings();
    },
    methods: {
        getUserLandings() {
            this.landings = [];
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
        updateLanding(params) {
            const userStore = useUserStore();
            const token = localStorage.getItem('userToken');
            const userId = userStore.get_account._id;
            const { landing_id, newLandingData } = params;

            axios.put(`http://localhost:3000/landing/edit/${landing_id}`, {
                userId,
                newLandingData                
            }, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    this.closePopup(0);
                    this.getUserLandings();
                })
                .catch(error => {
                    console.error('Error updating landing page:', error);
                });
        },
        goToLandingPage(username, url) {
            const landingPageUrl = `/${username}/${url}`;
            window.open(landingPageUrl, '_blank');
        },
        goLandingAdminView(username, url) {
            this.$router.push(`/${username}/${url}/admin`);
        },
        editLanding(landing_id) {
            this.editPopup = true;
        },
        trash() {
            this.trashPopup = true;
        },
        closePopup(type) {
            console.log(type);
            if (type === 1) {
                this.editPopup = false;
            } else if (type === 0) {
                this.trashPopup = false;
            }
        },
        deleteLanding(landing_id) {
            const userStore = useUserStore();
            const token = localStorage.getItem('userToken');
            const userId = userStore.get_account._id;

            axios.delete(`http://localhost:3000/landing/delete/${landing_id}`, {
                data: { userId },
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    this.closePopup(0);
                    this.getUserLandings();
                })
                .catch(error => {
                    console.error('Error deleting landing page:', error);
                });
        },
        copyLandingURL(username, url) {
            const landingURL = `http://localhost:5173/${username}/${url}`;
            navigator.clipboard.writeText(landingURL)
                .then(() => {
                    // alert('URL copied to clipboard!');
                })
                .catch(err => {
                    console.error('Failed to copy URL:', err);
                });
        }
    }
}
</script>
