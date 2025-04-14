<template>
  <div class="inventory">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="inventory__slot"
      @dragover.prevent
      @drop="onDrop(index)"
      @click="selectItem(index)"
    >
      <div
        v-if="item"
        class="inventory__item"
        draggable="true"
        @dragstart="onDragStart(index, $event)"
        @drag="onDrag($event)"
        @dragend="onDragEnd"
      >
        <img
          :src="item.icon"
          class="inventory__item-img"
          alt="icon">
        <div class="inventory__item-quantity">{{ item.quantity }}</div>
      </div>
    </div>

    <ItemModal :item="selectedItem" @close="selectedItem = null" />
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue"
import {useInventoryStore} from "@/stores/inventory";
import type {Item} from "@/types/Item"
import ItemModal from "@/components/ItemModal.vue";

const store = useInventoryStore()
const draggedIndex = ref<number | null>(null)
const selectedItem = ref<Item | null>(null)

const items = computed(() => store.slots)

onMounted(() => {
  if (store.slots.filter(Boolean).length === 0) {
    const initialItems: Item[] = [
      {
        id: '1',
        name: '1 test name',
        description: '1 test desc',
        icon: `${import.meta.env.BASE_URL}icons/item-1.png`,
        quantity: 4
      },
      {
        id: '2',
        name: '2 test name',
        description: '2 test desc',
        icon: `${import.meta.env.BASE_URL}icons/item-2.png`,
        quantity: 2
      },
      {
        id: '3',
        name: '3 test name',
        description: '3 test desc',
        icon: `${import.meta.env.BASE_URL}icons/item-3.png`,
        quantity: 5
      }
    ]
    store.setItems(initialItems)
  }
})

const selectItem = (index: number) => {
  if (items.value[index]) {
    selectedItem.value = items.value[index]
  }
}


const dragWrapper = document.createElement("div")
dragWrapper.classList.add('inventory__drag')
const emptyImage = new Image()
emptyImage.src =
  'data:image/svg+xml;base64,' +
  btoa('<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"></svg>')

const onDragStart = (index: number, event: DragEvent) => {
  draggedIndex.value = index

  const itemEl = (event.target as HTMLElement).cloneNode(true) as HTMLElement
  dragWrapper.innerHTML = ''
  dragWrapper.appendChild(itemEl)
  document.body.appendChild(dragWrapper)

  dragWrapper.style.left = `${event.clientX}px`
  dragWrapper.style.top = `${event.clientY}px`

  event.dataTransfer?.setDragImage(emptyImage, 0, 0)
}

const onDrag = (event: DragEvent) => {
  if (event.clientX && event.clientY) {
    dragWrapper.style.left = `${event.clientX}px`
    dragWrapper.style.top = `${event.clientY}px`
  }
}

const onDragEnd = () => {
  dragWrapper.remove()
}

const onDrop = (targetIndex: number) => {
  if (draggedIndex.value !== null && draggedIndex.value !== targetIndex) {
    store.moveItem(draggedIndex.value, targetIndex)
    draggedIndex.value = null
  }
}
</script>

<style lang="scss">
.inventory {
  display: grid;
  grid-template-columns: repeat(5, 105px);
  grid-template-rows: repeat(5, 100px);
  background: #262626;
  border-radius: 12px;
  border: 1px solid #4d4d4d;
  max-height: 500px;
  position: relative;
  overflow: hidden;
}

.inventory__slot {
  border-bottom: 1px solid #4d4d4d;
  border-right: 1px solid #4d4d4d;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: url("/icons/cursor-hand-hover.svg"), pointer;

  &:hover {
    background: #2f2f2f;
  }

  &:nth-last-child(-n+5) {
    border-bottom: none;
  }
  &:nth-child(5n) {
    border-right: none;
  }
}

.inventory__item {
  text-align: center;
}

.inventory__item-img {
  width: 54px;
  height: 54px;
  display: block;
  margin: 0 auto;
}

.inventory__item-quantity {
  position: absolute;
  right: 0;
  bottom: 0;
  font-weight: 500;
  font-size: 10px;
  text-align: center;
  color: rgba(#fff, 0.4);
  border: 1px solid #4d4d4d;
  border-bottom: 0;
  border-radius: 6px 0 0 0;
  padding: 2px 4px;
}

.inventory__drag {
  padding: 25px 23px;
  width: 105px;
  height: 100px;
  background: #262626;
  border: 1px solid #4d4d4d;
  border-radius: 24px;
  position: fixed;
  pointer-events: none;
  z-index: 1000;
  transform: translate(-82px, -56px);
  transition: transform 0.1s ease;
}
</style>