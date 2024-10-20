<template>
    <div class="relative w-full lg:h-auto overflow-hidden content-start md:content-center md:justify-center">
        <div class="w-full  content-center justify-center  h-fit sm:h-1/2">
            <img :src="currentImage == undefined ? images[0] : currentImage" alt="Imagen principal"
                class="w-full md:rounded-xl lg:max-w-prose mx-auto h-fit sm:h-full object-scale-down" />
        </div>

        <div class="flex justify-center gap-2 my-2 -order-1">
            <div v-for="(image, index) in images" :key="index"
                class="w-24 h-24 rounded-md overflow-hidden cursor-pointer shadow-md shadow-black">
                <img :src="image" class="object-cover w-full h-full" @click="setCurrentImage(image)" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ImageCarousel',
    props: {
        images: {
            type: Array,
            required: true,
        },
        firstImage: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            currentImage: undefined,
        };
    },
    mounted() {
        if (this.firstImage) {
            this.currentImage = this.firstImage;
        } else if (this.images.length > 0) {
            this.currentImage = this.images[0];
        }
    },
    methods: {
        setCurrentImage(image) {
            this.currentImage = image;
        },
    },
};
</script>
