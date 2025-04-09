<script setup lang="ts">
import { onMounted } from "vue"
import { useInventoryStore } from "./stores/inventory"
import type {Item} from "./types/Item"
import Profile from "./components/Profile.vue"

const store = useInventoryStore()

onMounted(() => {
  if (store.items.length === 0) {
    const initialItems: Item[] = [
      {
        id: '1',
        name: '1 test name',
        description: '1 test desc',
        icon: '/icons/item-1.png'
      },
      {
        id: '2',
        name: '2 test name',
        description: '2 test desc',
        icon: '/icons/item-2.png'
      }
    ]
    store.setItems(initialItems)
  }
})
</script>

<template>
  <div class="app__wrapper">
    <Profile />
    <div class="inventory">
      <div v-for="item in store.items" :key="item.id" class="inventory__item">
        <img :src="item.icon" alt="">
        <p>{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app__wrapper {
  max-width: 849px;
  padding: 32px;
  display: grid;
  grid-template-columns: 236px 1fr;
  column-gap: 24px;
}

.inventory {
  display: flex;
  gap: 1rem;
  padding: 2rem;

  &__item {
    width: 100px;
    text-align: center;
    cursor: pointer;
  }

  img {
    width: 64px;
    height: 64px;
  }
}
</style>