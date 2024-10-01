<template>
    <main class="h-auto min-h-screen w-screen text-black lg:bg-gradient-to-b from-white from-90% to-black/30">
        <div class="new-mvp mt-20 ml-10 mr-10 md:mx-20 p-0 md:p-4">
            <div class="bg-gradient-to-l from-gray-900 to-black p-4 rounded-md shadow-lg">
                <h1 class="text-md font-light text-slate-100/80">Dashboard /</h1>
                <h1 class="text-xl md:text-4xl font-medium text-slate-100">Create a new landing page</h1>
            </div>
            <div class="landing-form mt-14 flex flex-wrap gap-4">
                <div class="grow">
                    <label for="id-name">Title</label>
                    <input v-model="title"
                        class="mt-0 mb-5 block w-full md:w-96 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                        type="text" id="id-name" placeholder="Name your landing page">
                    <label for="id-description">Description</label>
                    <textarea v-model="description"
                        class="mt-1 mb-5 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-300/90 focus:ring focus:ring-gray-200/10 focus:ring-opacity-50"
                        id="id-description" placeholder="Describe your idea/product/project..."></textarea>
                    <span>Add media (5 max.)</span>
                    <!-- <h1 class="text-4xl">AÑADE EL BOTONCITO DE ELIMINAR LAS FOTOS (CUANDO SE SUBAN Y SE VEAN AQUI) Y HAZ TAMBIEN QUE SE ELIMINEN DE CLOUDINARY</h1> -->
                    <div class="flex content-center mt-2">
                        <UploadWidget v-if="images.length < 5" @imagesUploaded="handleImages" />
                        <!-- <h1 class="text-4xl">AÑADE EL BOTONCITO DE ELIMINAR LAS FOTOS (CUANDO SE SUBAN Y SE VEAN AQUI) Y HAZ TAMBIEN QUE SE ELIMINEN DE CLOUDINARY</h1> -->
                        <div class="justify-center content-center" v-if="images.length">
                            <ul class="flex flex-wrap gap-2 mb-4 content-center justify-left ">
                                <div v-for="image in images" :key="image"
                                    class="relative border-solid border-2 border-gray-900/20 w-16 h-16 content-top cursor-pointer bg-center bg-contain bg-no-repeat rounded-lg"
                                    :style="{ backgroundImage: `url(${image})` }">

                                    <div class="absolute -right-2 -top-2 bg-deleteImage bg-center bg-contain bg-no-repeat p-3 z-20 hover:shadow-2xl shadow-black bg-white rounded-full w-8 h-8 cursor-pointer"
                                        @click="removeImage(image)"></div>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="grow flex-wrap">
                    <label for="url">URL</label>
                    <input v-model="url"
                        class="mt-0 mb-5 block w-full md:w-96 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                        type="text" id="url" placeholder="URL of your landing page (10 characters max)" maxlength="10"
                        onkeypress="return event.charCode != 32">
                    <label for="goal">Goal (1 or greater)</label>
                    <input v-model="goal"
                        class="mt-0 mb-5 block w-full md:w-96 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                        type="number" id="goal" placeholder="Likes needed to reach goal" min="1">

                    <label for="id-tag">Tag</label>
                    <input v-model="tag"
                        class="mt-0 mb-5 block w-full md:w-96 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                        type="text" id="id-tag" placeholder="Choose a Tag">

                </div>
            </div>
            <div class="create-btn cursor-pointer my-5 bg-blue-500 p-3 w-full " @click="createLandingPage">
                <h1 class="text-white text-xl text-center font-bold">Create</h1>
            </div>
        </div>
    </main>
</template>

<script>
import axios from 'axios';
import UploadWidget from '../components/UploadWidget.vue';
import { useUserStore } from '../store/user-store';

import AddSvg from '../assets/add.svg';
import deleteSvg from '../assets/delete.svg';

export default {
    name: 'CreateProduct',
    components: {
        UploadWidget,
    },
    data() {
        return {
            addIcon: AddSvg,
            deleteIcon: deleteSvg,
            title: '',
            url: '',
            goal: 1,
            tag: '',
            description: '',
            images: [],
            userId: '',
        };
    },
    methods: {
        handleImages(uploadedImages) {
            if (uploadedImages.length > 5) {
                alert('You can upload a maximum of 5 images.');
                this.images = uploadedImages.slice(0, 5);
            } else {
                this.images = uploadedImages;
            }
        },
        async removeImage(imageUrl) {
            try {
                const token = localStorage.getItem('userToken');
                const publicId = imageUrl.split('/').pop().split('.')[0];

                await axios.post('http://localhost:3000/cloudinary/delete-single',
                    { publicId },
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );

                this.images = this.images.filter(image => image !== imageUrl);
            } catch (error) {
                console.error('Error eliminando imagen:', error);
                alert('Hubo un error al intentar eliminar la imagen.');
            }
        },
        async createLandingPage() {
            try {
                const userStore = useUserStore();
                const token = localStorage.getItem('userToken');
                this.userId = userStore.get_account._id;
                const response = await axios.post('http://localhost:3000/landing/create', {
                    title: this.title,
                    url: this.url,
                    goal: this.goal,
                    tag: this.tag,
                    description: this.description,
                    images: this.images,
                    userId: this.userId
                },
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );

                if (response.status === 201 || response.status === 200) {
                    alert('Landing page created successfully!');
                    this.clearForm();
                }
            } catch (error) {
                console.error('Error creating landing page:', error);
                alert('There was an issue creating the landing page.');
                this.clearForm();
            }
        },
        clearForm() {
            this.title = '';
            this.goal = 1;
            this.tag = '';
            this.description = '';
            this.images = [];
        },
        async cleanupImages() {
            if (this.images.length > 0) {
                const token = localStorage.getItem('userToken');
                const publicIds = this.images.map(image => image.split('/').pop().split('.')[0]);

                try {
                    await axios.post('http://localhost:3000/cloudinary/delete-multiple',
                        { publicIds },
                        {
                            headers: { Authorization: `Bearer ${token}` }
                        }
                    );
                    console.log('All uploaded images were removed successfully.');
                } catch (error) {
                    console.error('Error cleaning up images:', error);
                }
            }
        },
        handleBeforeUnload(event) {
            this.cleanupImages();
            const confirmationMessage = 'You have unsaved changes. Are you sure you want to leave?';
            event.returnValue = confirmationMessage;
            return confirmationMessage;
        }

    },
    mounted() {
        window.addEventListener('beforeunload', this.handleBeforeUnload);
    },
    beforeDestroy() {
        window.removeEventListener('beforeunload', this.handleBeforeUnload);
    },
    beforeRouteLeave(to, from, next) {
        if (!this.images.length) {
            return next();
        } else {
            this.cleanupImages();
        }
        next();
    }
};
</script>
