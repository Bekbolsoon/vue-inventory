<template>
  <div class="app__wrapper">
    <Profile />
    <Inventory />
  </div>
</template>

<script setup lang="ts">
import Profile from "@/components/Profile.vue"
import Inventory from "@/components/Inventory.vue";
</script>

<style lang="scss" scoped>
.app__wrapper {
  max-width: 849px;
  padding: 32px;
  display: grid;
  grid-template-columns: 236px 1fr;
  column-gap: 24px;
}
</style>