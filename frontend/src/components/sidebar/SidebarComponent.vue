<script setup lang="ts">
import IconNotes  from '@icons/IconNotes.vue'
</script>

<template>
  <div class="sidebar">
    <IconNotes :width="'28px'" :height="'28px'" :color="'#fff'"/>
    <hr/>
  </div>
</template>

<style scoped lang="scss">
  .sidebar{
    display: flex;
    flex-direction: column;
    position: fixed;
    align-items: center;
    padding: 20px 0px 20px 0px;
    width: 70px;
    height: 100vh;
    background-color: #303030;
  }
</style>
