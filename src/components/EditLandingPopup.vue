<template>
    <div class="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden transition flex items-center">
        <!-- overlay -->
        <div aria-hidden="true" @click="close()" class="fixed inset-0 w-full h-full bg-black/50 cursor-pointer"></div>

        <!-- Modal -->
        <div class="relative w-full cursor-pointer pointer-events-none transition my-auto p-4">
            <div
                class="w-full py-2 bg-white cursor-default pointer-events-auto dark:bg-gray-800 relative rounded-xl mx-auto max-w-sm">

                <button @click="close()" tabindex="-1" type="button"
                    class="absolute top-2 right-2 rtl:right-auto rtl:left-2">
                    <svg title="Close" tabindex="-1" class="h-4 w-4 cursor-pointer text-gray-400"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"></path>
                    </svg>
                    <span class="sr-only">Close</span>
                </button>

                <div class="space-y-2 p-2">
                    <div class="p-4 space-y-2 text-center dark:text-white">
                        <div class="landing-form mt-14 flex flex-wrap gap-4">
                            <div class="grow">
                                <label class="text-left w-full block" for="id-name">Title</label>
                                <input v-model="title"
                                    class="mt-0 mb-5 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                                    type="text" id="id-name" placeholder="Name your landing page">
                                <label class="text-left w-full block" for="id-description">Description</label>
                                <textarea v-model="description"
                                    class="mt-1 mb-5 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-300/90 focus:ring focus:ring-gray-200/10 focus:ring-opacity-50"
                                    rows="5" id="id-description"
                                    placeholder="Describe your idea/product/project..."></textarea>
                                <span>Add media (5 max.)</span>
                                <div class="flex content-center mt-2">
                                    <UploadWidget v-if="images.length < 5" @imagesUploaded="handleImages" />
                                    <div class="justify-center content-center" v-if="images.length">
                                        <ul class="flex flex-wrap gap-2 mb-4 content-center justify-left">
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
                                <label class="text-left w-full block" for="url">URL</label>
                                <input v-model="url"
                                    class="mt-0 mb-5 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                                    type="text" id="url" placeholder="URL of your landing page (10 characters max)"
                                    maxlength="10" onkeypress="return event.charCode != 32">
                                <label class="text-left w-full block" for="goal">Goal (1 or greater)</label>
                                <input v-model="goal"
                                    class="mt-0 mb-5 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                                    type="number" id="goal" placeholder="Likes needed to reach goal" min="1">

                                <label class="text-left w-full block" for="id-tag">Tag</label>
                                <input v-model="tag"
                                    class="mt-0 mb-5 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                                    type="text" id="id-tag" placeholder="Choose a Tag">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="space-y-2">
                    <div aria-hidden="true" class="border-t dark:border-gray-700 px-2"></div>

                    <div class="px-6 py-2">
                        <div class="grid gap-2 grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
                            <button type="button" @click="close()"
                                class="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-sm text-gray-800 bg-white border-gray-300 hover:bg-gray-50 focus:ring-primary-600 focus:text-primary-600 focus:bg-primary-50 focus:border-primary-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:text-gray-200 dark:focus:text-primary-400 dark:focus:border-primary-400 dark:focus:bg-gray-800">
                                <span class="flex items-center gap-1">
                                    <span>Cancel</span>
                                </span>
                            </button>

                            <button @click="editLanding()"
                                class="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-sm text-white shadow focus:ring-white border-transparent bg-green-600 hover:bg-green-500 focus:bg-green-700 focus:ring-offset-green-700">

                                <span class="flex items-center gap-1">
                                    <span>Save changes</span>
                                </span>

                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import UploadWidget from '../components/UploadWidget.vue';

export default {
    name: 'EditLandingPopup',
    components: {
        UploadWidget,
    },
    data() {
        return {
            images: [],
            title: '',
            url: '',
            goal: '',
            tag: '',
            description: ''
        };
    },
    props: {
        landing: {
            type: Object,
            required: true,
        },
    },
    mounted() {
        window.addEventListener('beforeunload', this.handleBeforeUnload);

        this.title = this.landing.title;
        this.url = this.landing.url;
        this.goal = this.landing.goal;
        this.tag = this.landing.tag;
        this.description = this.landing.description;
        this.images = this.landing.images;
    },
    methods: {
        close() {
            this.$emit('close');
        },
        editLanding() {
            this.$emit('confirmChanges', {
                title: this.title,
                url: this.url,
                goal: this.goal,
                tag: this.tag,
                description: this.description,
                images: this.images
            });
        },
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
        },

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
}
</script>
