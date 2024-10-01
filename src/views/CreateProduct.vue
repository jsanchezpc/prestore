<template>
    <main class="h-screen min-h-screen w-screen text-black lg:bg-gradient-to-b from-white from-90% to-black/30">
        <div class="new-mvp mt-20 ml-10 mr-10  md:mx-20 p-0  md:p-4">
            <div class="bg-gradient-to-l from-gray-900 to-black p-4 rounded-md shadow-lg">
                <h1 class="text-md font-light text-slate-100/80">Dashboard /</h1>
                <h1 class="text-xl md:text-4xl font-medium text-slate-100">Create a new landing page</h1>
            </div>
            <div class="landing-form mt-14">
                <label for="id-name">Title</label>
                <input v-model="title"
                    class="mt-0 mb-10 block w-full md:w-96 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                    type="text" id="id-name" placeholder="Name your landing page">

                <label for="goal">Goal (1 or greater)</label>
                <input v-model="goal"
                    class="mt-0 mb-10 block w-full md:w-96 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                    type="number" id="goal" placeholder="Likes needed to reach goal" min="1">

                <label for="id-tag">Tag</label>
                <input v-model="tag"
                    class="mt-0 mb-10 block w-full md:w-96 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                    type="text" id="id-tag" placeholder="Choose a Tag">

                <label for="id-description">Description</label>
                <textarea v-model="description"
                    class="mt-1 mb-5 block w-full md:w-96 lg:w-1/2 rounded-md border-gray-300 shadow-sm focus:border-gray-300/90 focus:ring focus:ring-gray-200/10 focus:ring-opacity-50"
                    id="id-description" placeholder="Describe your idea/product/project..."></textarea>
                <span>Add media</span>
                <div class="flex content-center mt-2">
                    <UploadWidget @imagesUploaded="handleImages" />
                    <div class="justify-center content-center" v-if="images.length">
                        <ul class="flex gap-2 mb-4 content-center justify-center">
                            <div v-for="image in images" :key="image"
                                class="w-16 h-16  cursor-pointer bg-center bg-contain bg-no-repeat rounded-lg "
                                :style="{ backgroundImage: `url(${image})` }">
                            </div>
                        </ul>
                    </div>
                </div>

                <div class="create-btn cursor-pointer bg-blue-500 p-3 w-full md:w-96 rounded-full"
                    @click="createLandingPage">
                    <h1 class="text-white text-xl text-center font-bold">Create</h1>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import UploadWidget from '../components/UploadWidget.vue';
import AddSvg from '../assets/add.svg'

export default {
    name: 'CreateProduct',
    components: {
        UploadWidget,
    },
    data() {
        return {
            addIcon: AddSvg,
            title: '',
            goal: 1,
            tag: '',
            description: '',
            images: [],
        }
    },
    methods: {
        handleImages(uploadedImages) {
            this.images = uploadedImages;
        },
        createLandingPage() {
            // Aquí agregar la lógica para crear la landing page
            console.log({
                title: this.title,
                goal: this.goal,
                tag: this.tag,
                description: this.description,
                images: this.images
            });
        }
    }
}
</script>
