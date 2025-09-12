<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/userStore'
import SidebarComponent from '@/components/SidebarComponent.vue'
const route = useRoute();
const userStore = useUserStore()
userStore.loadFromLocalStorage()
</script>

<template>
  <SidebarComponent v-if="route.name != 'LoginPage'" />
  <RouterView />
</template>

<style scoped></style>
