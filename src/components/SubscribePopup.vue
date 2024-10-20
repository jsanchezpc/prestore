<template>
    <div class="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden transition flex items-center">
        <!-- overlay -->
        <div aria-hidden="true" @click="close()" class="fixed inset-0 w-full h-full bg-black/50 cursor-pointer">
        </div>

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
                    <span class="sr-only">
                        Close
                    </span>
                </button>



                <div v-if="isSub === false" class="p-2">
                    <div class="p-4 text-center dark:text-white">
                        <h2 class="text-xl font-bold tracking-tight text-left" id="page-action.heading">
                            Subscribing to "{{ title }}", by {{ username }}
                        </h2>

                        <p class="text-gray-600 text-justify mt-4">
                            Allow <b>{{ username }}</b> to notify you via email when this idea is ready
                        </p>
                    </div>
                </div>

                <div v-else class="p-2">
                    <div class="p-4 text-center dark:text-white">
                        <h2 class="text-xl font-bold tracking-tight text-left" id="page-action.heading">
                            Unsubscribing from "{{ title }}", by {{ username }}
                        </h2>

                        <p class="text-gray-600 text-justify mt-4">
                            Unsuscribe will stop receiving notifications from this idea
                        </p>
                    </div>
                </div>

                <div class="space-y-2">
                    <!-- <div aria-hidden="true" class="border-t dark:border-gray-700 px-2"></div> -->
                    <span v-if="isSub === false" class="text-sm text-gray-500 text-center w-full block">You can unsuscribe anytime.</span>
                    <div class="px-6 py-2">
                        <div class="grid gap-2 grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
                            <button type="button" @click="close()"
                                class="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-sm text-gray-800 bg-white border-gray-300 hover:bg-gray-50 focus:ring-primary-600 focus:text-primary-600 focus:bg-primary-50 focus:border-primary-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:text-gray-200 dark:focus:text-primary-400 dark:focus:border-primary-400 dark:focus:bg-gray-800">
                                <span class="flex items-center gap-1">
                                    <span class="">
                                        Cancel
                                    </span>
                                </span>
                            </button>

                            <button v-if="isSub === false" @click="subscribe()"
                                class="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-sm text-white shadow focus:ring-white border-transparent bg-blue-600 hover:bg-blue-500 focus:bg-blue-700 focus:ring-offset-blue-700">

                                <span class="flex items-center gap-1">
                                    <span class="">
                                        Subscribe
                                    </span>
                                </span>

                            </button>
                            <button v-else @click="unsubscribe()"
                                class="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-sm text-white shadow focus:ring-white border-transparent bg-red-600 hover:bg-red-500 focus:bg-red-700 focus:ring-offset-red-700">
                                <span class="flex items-center gap-1">
                                    <span class="">
                                        Unsubscribe
                                    </span>
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
import { useUserStore } from '../store/user-store';
export default {
    name: 'SubscribePopup',
    data() {
        return {
            show: false,
            newEmail: '',
        }
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        isSub: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        subscribe() {
            const user = useUserStore().get_account;
            if (user) {
                this.$emit('subscribe');
            } else {
                this.$router.push("/account/login");
            }

        },
        unsubscribe() {
            this.$emit('unsubscribe');
        }
    }
}
</script>