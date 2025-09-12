<script setup lang="ts">
import SidebarComponent from '@/components/SidebarComponent.vue'
import { RouterView } from 'vue-router'
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/userStore'
const route = useRoute();
const userStore = useUserStore()
userStore.loadFromLocalStorage()
</script>

<template>
  <SidebarComponent v-if="route.name != 'LoginPage'"/>
  <RouterView />
</template>

<style scoped>

</style>
