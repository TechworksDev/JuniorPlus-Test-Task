<script setup lang="ts">
import SidebarComponent from '@components/sidebar/SidebarComponent.vue'
import { RouterView } from 'vue-router'
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<template>
  <SidebarComponent v-if="route.name != 'LoginPage'"/>
  <RouterView />
</template>

<style scoped>

</style>
