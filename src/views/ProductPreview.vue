<template>
    <main class="h-screen min-h-screen text-black lg:flex md:p-4 lg:bg-gradient-to-b from-white from-90% to-black/30">
        <div class="flex-1 md:content-center justify-items-center ">
            <img class="block m-auto md:rounded-2xl aspect-square md:shadow-sm md:shadow-black"
                src="https://ucarecdn.com/ef38dab6-f814-4ec4-b25b-89a58e16f9e6/-/scale_crop/828x728/smart/828w" alt="">
            <!-- <div class="all-images mt-0 flex w-full justify-center ">
                <img class="flex flex-col cursor-pointer aspect-video w-40"
                    src="https://ucarecdn.com/ef38dab6-f814-4ec4-b25b-89a58e16f9e6/-/scale_crop/828x728/smart/828w"
                    alt="">
                <img class="flex flex-col cursor-pointer aspect-video w-40"
                    src="https://images.unsplash.com/photo-1719937206109-7f4e933230c8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="">
                <img class="flex flex-col cursor-pointer aspect-video w-40"
                    src="https://plus.unsplash.com/premium_photo-1678937609110-61b091b7e1ee?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="">
                <img class="flex flex-col cursor-pointer aspect-video w-40"
                    src="https://images.unsplash.com/photo-1725714354941-02986971c66b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="">
            </div> -->
        </div>
        <div class="flex-1 content-center justify-center p-4 ">
            <div class="product-info mb-20">
                <h1 class="text-4xl font-bold text-center">Travel Bag</h1>
                <label for="name" class="block mb-2 text-center text-sm font-medium text-black/80"><span
                        class="text-gray-500">By</span> <span class="cursor-pointer">travelbags</span> <span
                        class="w-fit"><img src="./../assets/verified.svg" class="w-4 -ml-1 inline-flex"
                            alt=""></span></label>
                <p @click="showDescription = !showDescription"
                    class="item-description text-justify text-sm sm:px-10 text-gray-500 mb-auto text-ellipsis ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias porro repellat autem ipsam itaque,
                    aperiam unde enim aspernatur dolorem dolore perferendis iusto quisquam illo error repudiandae animi
                    fugit nam beatae?
                    Mollitia quasi fuga perferendis ex. Sunt saepe soluta, molestias hic laboriosam, veritatis deserunt
                    id nostrum, eligendi fugiat impedit. Quam aperiam at vero dolorum sit assumenda aliquid accusantium
                    voluptas nulla unde.
                    Corporis, quae! Itaque quae est veritatis fugit, delectus provident dicta sunt perspiciatis
                    voluptatem magni? Quam, tempora. Omnis unde similique rem nesciunt delectus a nemo minima adipisci
                    ad quas, eum neque?
                    Assumenda perferendis atque consequuntur quod animi ab autem provident nobis officia molestias
                    voluptas nisi, earum aliquid modi eius? Ea ullam minus facilis reprehenderit incidunt blanditiis?
                    Eos perferendis consectetur aliquam quae.
                </p>
            </div>
            <div
                class="interact fixed bottom-0  right-0 w-full p-4 mx-auto bg-gradient-to-t from-white from-30% to-transparent lg:bg-transparent lg:static lg:bottom-auto lg:right-auto lg:w-1/2 lg:p-0 justify-center">
                <h1 class="lg:block hidden font-bold text-xl text-center text-gray-500/60 mb-4">Do you like this product?</h1>
                <div class="flex">
                    <button
                        class="lg:bg-pink-300/50 hover:bg-pink-400 bg-gradient-to-t from-pink-300 from-0% to-transparent text-gray-500 hover:text-white text-xl font-bold h-100 w-20 p-8 px-4 rounded-full m-auto lg:shadow-none shadow-2xl shadow-black content-center">
                        <img :src="sadIcon" class="w-10 flex content-center mx-auto" alt="like button">
                        Nope
                    </button>
                    <button
                        class="lg:bg-green-300/50 hover:bg-green-400 bg-gradient-to-t from-green-300 from-0% to-transparent text-gray-500 hover:text-white text-xl font-bold h-100 w-20 p-8 px-4 rounded-full m-auto lg:shadow-none shadow-2xl shadow-black content-center">
                        <img :src="heartIcon" class="w-10 flex content-center mx-auto" alt="like button">
                        Yes
                    </button>
                </div>
            </div>
            <!-- <div class="more-items sm:flex sm:flex-wrap">
                <MoreProducts class="flex-1 justify-center " title="More by travelbags" products="products" />
                <MoreProducts class="flex-1 justify-center " title="For you" products="products" />
            </div> -->
        </div>
    </main>
</template>

<script>
import MoreProducts from './../components/MoreProducts.vue'
import HeartSvg from './../assets/heart.svg'
import ShopSvg from './../assets/shop.svg'
import sadSvg from './../assets/sad.svg'

export default {
    name: 'ProductLayout',
    components: {
        MoreProducts
    },
    data() {
        return {
            // showDescription: false,
            heartIcon: HeartSvg,
            shopIcon: ShopSvg,
            sadIcon: sadSvg
        }
    }
}
</script>
