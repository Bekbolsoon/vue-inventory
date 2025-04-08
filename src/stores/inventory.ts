import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { Item } from '@/types/Item'

export const useInventoryStore = defineStore("inventory", () => {
    const items = ref<Item[]>([])

    // Загрузка из localStorage
    const loadItems = () => {
        const stored = localStorage.getItem("inventory")
        if (stored) items.value = JSON.parse(stored)
    }

    // Сохранение в localStorage при каждом изменении
    watch(items, (newItems) => {
        localStorage.setItem("inventory", JSON.stringify(newItems))
    }, {deep: true})

    const removeItem = (id: string) => {
        items.value = items.value.filter(item => item.id === id)
    }

    const setItems = (initialItems: Item[]) => {
        items.value = initialItems
    }

    loadItems()

    return {
        items,
        removeItem,
        setItems,
    }
})