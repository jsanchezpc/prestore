<template>
  <TopNav />
  <router-view />
</template>

<script>
import TopNav from './components/TopNav.vue';

export default {
  name: 'App',
  components: {
    TopNav
  }
}
</script>

<style scoped></style>
