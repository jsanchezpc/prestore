<template>
    <main class="h-screen min-h-screen w-screen text-black lg:bg-gradient-to-b from-white from-90% to-black/30">
        <div class="new-mvp mt-20 ml-10 mr-10  md:mx-20 p-0  md:p-4">
            <div class="bg-gradient-to-l from-gray-900 to-black p-4 rounded-md shadow-lg">
                <h1 class="text-md font-light text-slate-100/80">Dashboard /</h1>
                <h1 class="text-xl md:text-4xl font-medium text-slate-100">Create a new landing page</h1>
            </div>
            <div class="landing-form mt-14">
                <label for="id-name">Title</label>
                <input
                    class="mt-0 mb-10 block w-full md:w-96 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                    type="text" id="id-name" placeholder="Name your landing page">
                <label for="goal">Goal (1 or greater)</label>
                <input
                    class="mt-0 mb-10 block w-full md:w-96 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                    type="number" id="goal" placeholder="Likes needed to reach goal " min="1">

                <label for="id-tag">Tag</label>
                <input
                    class="mt-0 mb-10 block w-full md:w-96 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
                    type="text" id="id-tag" placeholder="Choose a Tag">
                <!-- <select class="mt-0 mb-10 block w-full md:w-96 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black" id="id-category">
                    <option>Category</option>
                    <option>Category</option>
                    <option>Category</option>
                </select> -->

                <label for="id-description">Description</label>
                <textarea
                    class="mt-1 mb-10 block w-full md:w-96 lg:w-1/2 rounded-md border-gray-300 shadow-sm focus:border-gray-300/90 focus:ring focus:ring-gray-200/10 focus:ring-opacity-50"
                    id="id-description" placeholder="Describe your idea/product/project..."></textarea>

                <label for="id-image">Add media</label>
                <div class="mt-1 mb-10 flex items-left justify-left">
                    <div class="w-16 h-16 cursor-pointer  bg-addImage bg-contain bg-no-repeat"></div>
                    <div class="w-16 h-16 cursor-pointer  bg-addImage bg-contain bg-no-repeat"></div>
                    <div class="w-16 h-16 cursor-pointer  bg-addImage bg-contain bg-no-repeat"></div>
                    <div class="w-16 h-16 cursor-pointer  bg-addImage bg-contain bg-no-repeat"></div>
                </div>

                <!-- <label for="id-price">Price</label>
                <input class="mt-0 mb-10 block w-full md:w-96 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black" id="id-price" placeholder="Price"> -->
                <div class="create-btn cursor-pointer bg-blue-400 p-3 w-full md:w-96 rounded-full">
                    <h1 class="text-white text-xl text-center font-bold">Create</h1>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import AddSvg from '../assets/add.svg'
export default {
    name: 'CreateProduct',
    data() {
        return {
            addIcon: AddSvg,
            title:'',
            goal: 1,
            tag: '',
            description: '',
            images: '',
        }
    }
}
</script>