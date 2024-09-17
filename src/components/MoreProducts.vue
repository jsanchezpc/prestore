<template>
    <div class="more-products my-20">
        <h1 class="text-2xl font-bold text-center mb-2 text-gray-500 italic">More by <span
                class="cursor-pointer text-black font-normal">travelbags</span></h1>
        <div class="flex all-images content-center justify-center">
            <img class="flex flex-col cursor-pointer aspect-square w-14 lg:w-20"
                src="https://ucarecdn.com/ef38dab6-f814-4ec4-b25b-89a58e16f9e6/-/scale_crop/828x728/smart/828w" alt="">
            <img class="flex flex-col cursor-pointer aspect-square w-14 lg:w-20"
                src="https://images.unsplash.com/photo-1719937206109-7f4e933230c8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="">
            <img class="flex flex-col cursor-pointer aspect-square w-14 lg:w-20"
                src="https://plus.unsplash.com/premium_photo-1678937609110-61b091b7e1ee?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="">

        </div>
    </div>
</template>

<script>


export default {
    name: 'MoreProducts',
    props: {
        products: {
            type: Array,
            // required: true
        },
        title: String
    }
}   
</script>