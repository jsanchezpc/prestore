<template>
    <TopNav />
    <router-view></router-view>
</template>

<script>
import TopNav from './../components/TopNav.vue';

export default {
    name: 'HomeLayout',
    components: {
        TopNav
    }
}
</script>
