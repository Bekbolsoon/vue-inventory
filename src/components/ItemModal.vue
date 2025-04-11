<template>
  <transition name="slide" appear>
    <div v-if="item" class="modal">
      <img
        @click="$emit('close')"
        class="modal__close-icon"
        src="../assets/img/close-modal.svg"
        alt="close-icon">
      <img :src="item.icon" alt="item" class="modal__img">
      <div class="modal__text">
        <div class="skeleton-text skeleton-title skeleton-title_modal"></div>
        <div class="skeleton-text w-100"></div>
        <div class="skeleton-text w-100"></div>
        <div class="skeleton-text w-100"></div>
        <div class="skeleton-text w-180"></div>
        <div class="skeleton-text w-80"></div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { Item } from "@/types/Item"

const props = defineProps<{ item: Item | null}>()
const emit = defineEmits(['close'])
</script>

<style scoped lang="scss">
.modal {
  position: absolute;
  box-sizing: border-box;
  height: 100%;
  right: 0;
  padding: 55px 15px 18px 15px;
  background: rgba(38, 38, 38, 0.5);
  border-left: 1px solid #4d4d4d;
  width: 250px;
  text-align: center;
  will-change: transform;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    backdrop-filter: blur(16px);
    z-index: -1;
  }
}

.slide-enter-active, .slide-leave-active {
  transition: transform 0.4s ease;
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(100%);
}
.slide-enter-to, .slide-leave-from {
  transform: translateX(0);
}

.modal__img {
  width: 130px;
  height: 130px;
  margin-bottom: 30px;
}

.modal__close-icon {
  position: absolute;
  right: 8px;
  top: 8px;
  cursor: pointer;
}

.modal__text {
  padding: 16px 0 24px 0;
  max-width: 211px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  border-top: 1px #4d4d4d solid;
  border-bottom: 1px #4d4d4d solid;
}
</style>