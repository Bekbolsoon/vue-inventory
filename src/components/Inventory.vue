<template>
  <div class="inventory">
    <div
      v-for="(slot, index) in store.slots"
      :key="index"
      class="inventory__slot"
      @dragover.prevent
      @drop="onDrop(index)"
    >
      <div
        v-if="slot"
        class="inventory__item"
        draggable="true"
        @dragstart="onDragStart(index)"
      >
        <img :src="slot.icon" alt="">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import {useInventoryStore} from "@/stores/inventory";
import type {Item} from "@/types/Item"

const store = useInventoryStore()
const draggedIndex = ref<number | null>(null)

onMounted(() => {
  if (store.slots.filter(Boolean).length === 0) {
    const initialItems: Item[] = [
      {
        id: '1',
        name: '1 test name',
        description: '1 test desc',
        icon: '/icons/item-1.png',
      },
      {
        id: '2',
        name: '2 test name',
        description: '2 test desc',
        icon: '/icons/item-2.png'
      },
      {
        id: '3',
        name: '3 test name',
        description: '3 test desc',
        icon: '/icons/item-3.png'
      }
    ]
    store.setItems(initialItems)
  }
})

const onDragStart = (index: number) => {
  draggedIndex.value = index
}

const onDrop = (targetIndex: number) => {
  if (draggedIndex.value !== null && draggedIndex.value !== targetIndex) {
    store.moveItem(draggedIndex.value, targetIndex)
    draggedIndex.value = null
  }
}
</script>

<style lang="scss" scoped>
.inventory {
  display: grid;
  grid-template-columns: repeat(5, 105px);
  grid-template-rows: repeat(5, 100px);
  background: #262626;
  border-radius: 12px;
  border: 1px solid #4d4d4d;
  max-height: 500px;
}

.inventory__slot {
  border-bottom: 1px solid #4d4d4d;
  border-right: 1px solid #4d4d4d;
  display: flex;
  align-items: center;
  justify-content: center;

  &:nth-last-child(-n+5) {
    border-bottom: none;
  }
  &:nth-child(5n) {
    border-right: none;
  }
}

.inventory__item {
  text-align: center;
  cursor: grab;

  img {
    width: 54px;
    height: 54px;
    display: block;
    margin: 0 auto;
  }
}
</style>