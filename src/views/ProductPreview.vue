<template>
    <main class="h-auto min-h-screen text-black lg:flex md:p-4 lg:bg-gradient-to-b from-white from-90% to-black/30">
        <div class="flex-1 md:content-center justify-items-center">
            <ImageCarousel :firstImage="images[0]" :images="images" />
        </div>
        <div class="flex-1 content-center justify-center p-4">
            <div class="product-info mb-20">
                <h1 class="text-4xl font-bold text-center">{{ title }}</h1>
                <label for="name" class="block mb-2 text-center text-sm font-medium text-black/80">
                    <span class="text-gray-500">By{{ ' ' }}</span>
                    <span class="cursor-pointer">{{ username + ' ' }}</span>
                    <span class="w-fit">
                        <img src="./../assets/verified.svg" class="w-4 -ml-1 inline-flex" alt="Verified">
                    </span>
                </label>
                <p @click="showDescription = !showDescription"
                    class="item-description text-justify text-sm sm:px-10 text-gray-500 mb-auto text-ellipsis">
                    {{ description }}
                </p>
            </div>
            <div
                class="interact fixed bottom-0 right-0 w-full p-4 mx-auto bg-gradient-to-t from-white from-30% to-transparent lg:bg-transparent lg:static lg:bottom-auto lg:right-auto lg:w-1/2 lg:p-0 justify-center">
                <div v-if="isSubscribed === false" class="subscribe flex justify-center content-center">
                    <button @click="displaySubPopup()"
                        class="bg-blue-600 w-full lg:w-fit px-4 py-2 rounded-md shadow-md lg:shadow-none shadow-black text-white text-sm font-medium hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        Get notified
                    </button>
                    <SubscribePopup v-if="showSubPopup === true" :isSub="isSubscribed" :title="title"
                        :username="username" @subscribe="subscribeToLanding" @close="closeSubPopup()" />
                </div>
                <div v-else class="subscribe flex justify-center content-center">
                    <button @click="displaySubPopup()"
                        class="bg-red-600 w-full lg:w-fit px-4 py-2 rounded-md shadow-md lg:shadow-none shadow-black text-white text-sm font-medium hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        Unsuscribe
                    </button>
                    <!-- HAZ QUE SE DESUSCRIBAAAAAAAAAAAAAAAAAN -->
                    <SubscribePopup v-if="showSubPopup === true" :isSub="isSubscribed" :title="title"
                        :username="username" @unsubscribe="unsubscribeToLanding" @close="closeSubPopup()" />
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import axios from 'axios'
import { useUserStore } from './../store/user-store'
import MoreProducts from './../components/MoreProducts.vue'
import ImageCarousel from './../components/ImageCarousel.vue'
import SubscribePopup from '../components/SubscribePopup.vue'
import HeartSvg from './../assets/heart.svg'
import ShopSvg from './../assets/shop.svg'
import sadSvg from './../assets/sad.svg'



export default {
    name: 'ProductLayout',
    components: {
        MoreProducts,
        ImageCarousel,
        SubscribePopup
    },
    data() {
        return {
            heartIcon: HeartSvg,
            shopIcon: ShopSvg,
            sadIcon: sadSvg,
            landingId: '',
            username: '',
            url: '',
            image: '',
            title: '',
            description: '',
            tag: '',
            images: [],
            frontImage: '',
            showSubPopup: false,
            isSubscribed: false
        }
    },
    async created() {
        try {
            const { username, url } = this.$route.params;
            const response = await axios.get(`http://localhost:3000/landing/get?username=${username}&url=${url}`);

            if (response.status === 200) {
                const { _id, title, description, tag, images, username, subscribers } = response.data;
                this.landingId = _id;
                this.title = title;
                this.description = description;
                this.tag = tag;
                this.images = images;
                this.username = username;

                const user = useUserStore().get_account;
                if (user) {
                    this.isSubscribed = await subscribers.some(subscriber => subscriber === user.email);
                }
                console.log('You are already suscribed here.', this.isSubscribed);
            }
        } catch (error) {
            console.error('Error getting landing page:', error);
        }
    },
    methods: {
        displaySubPopup() {
            this.showSubPopup = true;
        },
        closeSubPopup() {
            this.showSubPopup = false;
        },
        async subscribeToLanding() {
            try {
                const email = useUserStore().get_account.email;
                const token = localStorage.getItem('userToken');
                const landingId = this.landingId;
                const response = await axios.post(`http://localhost:3000/landing/subscribe`, {
                    landingId,
                    email,
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.status === 200) {
                    this.showSubPopup = false;
                    this.isSubscribed = true;
                }
            } catch (error) {
                console.error('Error subscribing to landing with account:', error);
                // this.$router.push("/account/login");
            }
        },
        async unsubscribeToLanding() {
            try {
                const landingId = this.landingId;
                const email = useUserStore().get_account.email;
                const token = localStorage.getItem('userToken');

                const response = await axios.delete('http://localhost:3000/landing/unsubscribe', {
                    data: {
                        landingId,
                        email,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    this.showSubPopup = false;
                    this.isSubscribed = false;
                }
            } catch (error) {
                console.error('Error unsubscribing from landing with account:', error);
                // this.$router.push("/account/login");
            }
        }

    }
}
</script>
