<template>
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" :width="width" :height="height">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <circle opacity="0.5" cx="12" cy="12" r="10" :stroke="color" stroke-width="1.5"></circle>
      <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" :stroke="color" stroke-width="1.5" stroke-linecap="round"></path>
    </g>
  </svg>
</template>

<script setup lang="ts">
  defineProps({
    width: {
      type: String,
      default: '24px'
    },
    height: {
      type: String,
      default: '24px'
    },
    color: {
      type: String,
      default: '#1C274C'
    }
  })
</script>
