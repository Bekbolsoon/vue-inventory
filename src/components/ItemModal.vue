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

      <button v-if="!showDeleteForm" @click="showDeleteForm = true" class="modal__btn-delete">Удалить предмет</button>

      <div v-else class="modal__delete-form">
        <input
          v-model="deleteCount"
          type="number"
          min="1"
          placeholder="Введите количество"
          class="modal__input"
        >
        <div class="modal__actions">
          <button @click="showDeleteForm = false" class="modal__btn-cancel">Отмена</button>
          <button @click="confirmDelete" class="modal__btn-confirm">Подтвердить</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import {defineProps, defineEmits, ref} from 'vue'
import type { Item } from "@/types/Item"
import {useInventoryStore} from "@/stores/inventory";

const props = defineProps<{ item: Item | null}>()
const emit = defineEmits(['close'])

const showDeleteForm = ref(false)
const deleteCount = ref<number | null>(null)
const store = useInventoryStore();

function confirmDelete() {
  if (!deleteCount.value || deleteCount.value < 1) {
    alert("Введите корректное количество")
    return
  }

  if (props.item) {
    store.decreaseItemQuantity(props.item.id, deleteCount.value)
  }

  deleteCount.value = null
  showDeleteForm.value = false
  emit('close')
}
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

.modal__btn-delete {
  //font-family: var(--second-family);
  font-weight: 400;
  font-size: 14px;
  text-align: center;
  color: #fff;
  background: #fa7272;
  border-radius: 8px;
  padding: 11px 0;
  width: 100%;
  margin-top: 18px;
  border: none;
  cursor: pointer;
  outline: none;
}

.modal__delete-form {
  padding: 20px 21px;
  border-top: 1px solid #4d4d4d;
  backdrop-filter: blur(16px);
  background: rgba(38, 38, 38, 0.6);
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
}

.modal__input {
  border: 1px solid #4d4d4d;
  outline: none;
  border-radius: 4px;
  width: 100%;
  padding: 11px 12px 12px 12px;
  background: #262626;
  font-weight: 500;
  font-size: 14px;
  color: #fff;
  appearance: none;
  -moz-appearance: textfield;
  margin-bottom: 20px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  &:hover,
  &:focus {
    appearance: none;
    -moz-appearance: textfield;
  }

  &::placeholder {
    color: rgba(#fff, 0.4);
  }
}

.modal__actions {
  display: flex;
  gap: 10px;
}

.modal__btn-cancel {
  border-radius: 8px;
  padding: 8px 19.5px;
  background: #fff;
  //font-family: var(--second-family);
  font-weight: 400;
  font-size: 14px;
  color: #2d2d2d;
  border: none;
  cursor: pointer;
  outline: none;
}

.modal__btn-confirm {
  background: #fa7272;
  border-radius: 8px;
  padding: 8px 15px;
  //font-family: var(--second-family);
  font-weight: 400;
  font-size: 14px;
  color: #fff;
  border: none;
  cursor: pointer;
  outline: none;
}
</style>