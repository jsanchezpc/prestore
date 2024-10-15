<template>
    <main class="h-screen min-h-screen text-black lg:flex md:p-4 lg:bg-gradient-to-b from-white from-90% to-black/30">
        <div class="flex-1 md:content-center justify-items-center ">
            <ImageCarousel :firstImage="images[0]" :images="images"  />
        </div>
        <div class="flex-1 content-center justify-center p-4 ">
            <div class="product-info mb-20">
                <h1 class="text-4xl font-bold text-center">{{ title }}</h1>
                <label for="name" class="block mb-2 text-center text-sm font-medium text-black/80"><span
                        class="text-gray-500">By</span> <span class="cursor-pointer">{{ username }}</span> <span
                        class="w-fit"><img src="./../assets/verified.svg" class="w-4 -ml-1 inline-flex"
                            alt=""></span></label>
                <p @click="showDescription = !showDescription"
                    class="item-description text-justify text-sm sm:px-10 text-gray-500 mb-auto text-ellipsis ">
                    {{ description }}
                </p>
            </div>
            <div
                class="interact fixed bottom-0  right-0 w-full p-4 mx-auto bg-gradient-to-t from-white from-30% to-transparent lg:bg-transparent lg:static lg:bottom-auto lg:right-auto lg:w-1/2 lg:p-0 justify-center">
                <h1 class="lg:block hidden font-bold text-xl text-center text-gray-500/60 mb-4">Did you like it?</h1>
                <RateStar :landingId="landingId" :initialRating="stars" />
            </div>
            <!-- <div class="more-items sm:flex sm:flex-wrap">
                <MoreProducts class="flex-1 justify-center " title="More by travelbags" products="products" />
                <MoreProducts class="flex-1 justify-center " title="For you" products="products" />
            </div> -->
        </div>
    </main>
</template>

<script>
import axios from 'axios'
import MoreProducts from './../components/MoreProducts.vue'
import ImageCarousel from './../components/ImageCarousel.vue'
import RateStar from './../components/RateStar.vue'
import HeartSvg from './../assets/heart.svg'
import ShopSvg from './../assets/shop.svg'
import sadSvg from './../assets/sad.svg'

export default {
    name: 'ProductLayout',
    components: {
        MoreProducts,
        RateStar,
        ImageCarousel
    },
    data() {
        return {
            // showDescription: false,
            heartIcon: HeartSvg,
            shopIcon: ShopSvg,
            sadIcon: sadSvg,
            landingId: '',
            username: '',
            url: '',
            image: '',
            title: '',
            description: '',
            goal: '',
            tag: '',
            images: '',
            stars: 0,
            frontImage: ''
        }
    },
    async created() {
        try {
            const username = this.$route.params.username;
            const url = this.$route.params.url;
            // const token = localStorage.getItem('userToken');
            const response = await axios.get(`http://localhost:3000/landing/get?username=${username}&url=${url}`,
                // {
                //     headers: { Authorization: `Bearer ${token}` }
                // }
            );
            if (response.status === 200) {
                this.landingId = response.data._id;
                this.title = response.data.title;
                this.description = response.data.description;
                this.goal = response.data.goal;
                this.stars = response.data.stars;
                this.tag = response.data.tag;
                this.images = response.data.images;
                this.username = response.data.username;
            }
        } catch (error) {
            console.error('Error getting landing page:', error);
        }
    },
}
</script>
