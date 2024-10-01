<template>
    <router-view></router-view>
</template>

<script>
import LoginView from '../views/LoginView.vue';
export default {
    name: 'LoginLayout',
    data() {
        return {

        }
    },
    components: {
        LoginView
    }
}
</script>