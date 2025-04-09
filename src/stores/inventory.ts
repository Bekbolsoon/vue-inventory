import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { Item } from '@/types/Item'

export const useInventoryStore = defineStore("inventory", () => {
    const slots = ref<(Item | null)[]>([])

    // Загрузка из localStorage
    const loadSlots = () => {
        const stored = localStorage.getItem("inventory")
        if (stored) {
            slots.value = JSON.parse(stored)
        } else {
            slots.value = Array(25).fill(null)
        }
    }

    // Сохранение в localStorage при каждом изменении
    watch(slots, (newSlots) => {
        localStorage.setItem("inventory", JSON.stringify(newSlots))
    }, {deep: true})

    const setItems = (initialItems: Item[]) => {
        slots.value = Array(25).fill(null);
        initialItems.forEach((item, index) => {
            slots.value[index] = item
        })
    }

    const removeItem = (id: string) => {
        slots.value = slots.value.map(item => item && item.id === id ? null :item)
    }

    const moveItem = (fromIndex: number, toIndex: number) => {
        const temp = slots.value[toIndex]
        slots.value[toIndex] = slots.value[fromIndex]
        slots.value[fromIndex] = temp
    }

    loadSlots()

    return {
        slots,
        setItems,
        removeItem,
        moveItem,
    }
})