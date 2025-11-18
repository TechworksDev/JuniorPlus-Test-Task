<script setup>
const props = defineProps({
  text: String
});
</script>

<template>
  <div class="empty-state">
    <div class="empty-state-content">
      <div class="empty-icon">📭</div>
      <p class="empty-text">{{ text }}</p>
    </div>
  </div>
</template>

<style scoped>
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.empty-state-content {
  text-align: center;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.empty-text {
  font-size: 20px;
  color: #999;
}
</style>