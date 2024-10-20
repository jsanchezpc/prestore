<template>
    <main class="h-auto min-h-screen w-screen text-black lg:bg-gradient-to-b from-white from-90% to-black/30">
        <div class="new-mvp mt-20 ml-10 mr-10 md:mx-20 p-0 md:p-4">
            <div class="bg-gradient-to-l from-gray-900 to-black p-4 rounded-md shadow-lg">
                <RouterLink to="/">
                    <h1 class="text-md font-light text-slate-100/80">Dashboard /</h1>
                </RouterLink>

                <h1 class="text-xl md:text-4xl font-medium text-slate-100">Create a new landing page</h1>
            </div>
            <div v-if="formProcess === 1" class="w-full mt-4 mx-auto">
                <LottieAnimation class="w-96 h-96 mx-auto" :animation-data="loadingLottie" :auto-play="true"
                    :loop="true" :speed="1" />
                <h1 class="text-4xl text-center text-gray-500/50">Your landing page is being created...</h1>
            </div>
            <div v-if="formProcess === 0" class="landing-form mt-14 flex flex-wrap gap-4">
                <div class="grow">
                    <label for="id-name">Title</label>
                    <input v-model="title"
                        class="mt-0 mb-5 block w-full md:w-96 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                        type="text" id="id-name" placeholder="Name your landing page">
                    <label for="id-description">Description</label>
                    <textarea v-model="description"
                        class="mt-1 mb-5 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-300/90 focus:ring focus:ring-gray-200/10 focus:ring-opacity-50"
                        id="id-description" placeholder="Describe your idea/product/project..."></textarea>
                    <span>Add media <span>{{ plan === 0 ? '(3 max.)' : plan === 1 ? '(5 max.)' : '(3 max.)'
                            }}</span></span>
                    <div class="flex content-center mt-2">
                        <UploadWidget v-if="enableUpload" @imagesUploaded="handleImages" />
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

                    <label for="id-tag">Tag</label>
                    <input v-model="tag"
                        class="mt-0 mb-5 block w-full md:w-96 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                        type="text" id="id-tag" placeholder="Choose a Tag">

                </div>
            </div>
            <div v-if="formProcess === 0" class="create-btn cursor-pointer my-5 bg-blue-500 p-3 w-full "
                @click="createLandingPage">
                <h1 class="text-white text-xl text-center font-bold">Create landing</h1>
            </div>
            <div v-if="formProcess === 2" class="create-btn cursor-pointer my-5  w-full " @click="landIt">
                <h1 class="text-black/10 mb-10 text-4xl text-center font-bold">Your landing page is ready!</h1>
                <div class="flex p-3 mr-3">
                    <div class="return-btn bg-return bg-center bg-contain bg-no-repeat p-3 cursor-pointer mr-2"></div>
                    <h1 @click="returnToDashboard()"
                        class="text-gray-500 text-left w-fit content-center mx-auto text-xl rounded  font-bold  p-3">
                        Return
                        to Dashboard</h1>
                    <h1 @click="goToLandingPage(username, weburl)"
                        class="text-white w-full ml-5 content-center text-xl text-center rounded-sm font-bold bg-blue-500 p-1">
                        Land
                        it 🚀</h1>

                </div>

            </div>
        </div>
    </main>
</template>

<script>
import axios from 'axios';
import UploadWidget from '../components/UploadWidget.vue';
import { useUserStore } from '../store/user-store';
import { LottieAnimation } from "lottie-web-vue"
// assets: 
import loadingLottie from './../assets/lotties/paper-fly.json';

export default {
    name: 'CreateProduct',
    components: {
        UploadWidget,
        LottieAnimation
    },
    data() {
        return {
            title: '',
            url: '',
            tag: '',
            description: '',
            images: [],
            userId: '',
            username: '',
            weburl: '',
            formProcess: 0,
            loadingLottie: loadingLottie,
            plan: 0,
            enableUpload: true
        };
    },
    methods: {
        returnToDashboard() {
            this.$router.push('/');
        },
        handleImages(uploadedImages) {
            switch (this.plan) {
                case 0:
                    if (uploadedImages.length > 3) {
                        alert('You can upload a maximum of 3 images.');
                        this.images = uploadedImages.slice(0, 3);
                    } else {
                        this.images = uploadedImages;
                    }
                    this.recountImages();
                    break;
                case 1:
                    if (uploadedImages.length > 5) {
                        alert('You can upload a maximum of 5 images.');
                        this.images = uploadedImages.slice(0, 5);
                    } else {
                        this.images = uploadedImages;
                    }
                    this.recountImages();
                    break;
                default:
                    alert('Something went wrong. Please try again.');
                    break;
            }

        },
        recountImages() {
            switch (this.plan) {
                case 0:
                    if (this.images.length === 3) {
                        this.enableUpload = false;
                    } else {
                        this.enableUpload = true;
                    }
                    break;
                case 1:
                    if (this.images.length === 5) {
                        this.enableUpload = false;
                    } else {
                        this.enableUpload = true;
                    }
                    break;
                default:
                    alert('Something went wrong. Please try again.');
                    break;
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
                this.recountImages();
            } catch (error) {
                console.error('Error eliminando imagen:', error);
                alert('Hubo un error al intentar eliminar la imagen.');
            }
        },
        async createLandingPage() {
            try {
                this.formProcess = 1;
                const userStore = useUserStore();
                const token = localStorage.getItem('userToken');
                this.userId = userStore.get_account._id;
                this.username = userStore.get_account.username;
                console.log(this.username);
                const response = await axios.post('http://localhost:3000/landing/create', {
                    title: this.title,
                    url: this.url,
                    tag: this.tag,
                    description: this.description,
                    images: this.images,
                    userId: this.userId,
                    username: this.username,
                },
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );

                if (response.status === 201 || response.status === 200) {
                    this.clearForm();
                    this.weburl = response.data.url;
                    this.formProcess = 2;
                }
            } catch (error) {
                console.error('Error creating landing page:', error);
                alert('There was an issue creating the landing page.');
                this.clearForm();
                this.formProcess = 0;
            }
        },
        goToLandingPage(username, url) {
            const landingPageUrl = `/${username}/${url}`;
            window.open(landingPageUrl, '_blank');
        },
        clearForm() {
            this.title = '';
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
            // this.formProcess = 0;
            this.cleanupImages();
            const confirmationMessage = 'You have unsaved changes. Are you sure you want to leave?';
            event.returnValue = confirmationMessage;
            return confirmationMessage;
        }

    },
    mounted() {
        const userStore = useUserStore();
        window.addEventListener('beforeunload', this.handleBeforeUnload);
        this.plan = userStore.get_account.plan;
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
