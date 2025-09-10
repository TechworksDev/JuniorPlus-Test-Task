<script setup lang="ts">
  import SidebarComponent from '@components/sidebar/SidebarComponent.vue'
</script>

<template>
  <div class="container">
    <SidebarComponent />
  </div>
</template>

<style lang="scss">
  .container{
    display: flex;
    width: 100%;
    height: 100vh;
    bottom: 0px;
    flex-direction: row;
    gap: 20px;
  }
</style>
