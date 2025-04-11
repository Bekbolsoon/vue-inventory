<template>
  <div class="temp-block" v-if="!isClosedTempBlock">
    <div class="temp-block__skeleton skeleton-text"></div>
    <img
      @click="isClosedTempBlock = true"
      class="temp-block__close-icon"
      src="../assets/img/close-modal.svg"
      alt="close-icon">
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const isClosedTempBlock = ref(false)
</script>

<style lang="scss" scoped>
.temp-block {
  grid-column: span 2;
  padding: 18px 68px 18px 18px;
  background: #262626;
  border: 1px solid #4d4d4d;
  border-radius: 12px;
  position: relative;
}

.temp-block__skeleton {
  height: 36px;
  border-radius: 12px;
}

.temp-block__close-icon {
  position: absolute;
  right: 14px;
  top: 14px;
  cursor: pointer;
}
</style>