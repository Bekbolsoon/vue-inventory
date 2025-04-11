<template>
  <div class="app__wrapper">
    <Profile />
    <Inventory />
    <TempBlock />
  </div>
</template>

<script setup lang="ts">
import Profile from "@/components/Profile.vue"
import Inventory from "@/components/Inventory.vue";
import TempBlock from "@/components/TempBlock.vue";
</script>

<style lang="scss" scoped>
.app {
  margin: 0 auto;
}
.app__wrapper {
  max-width: 849px;
  padding: 32px;
  display: grid;
  grid-template-columns: 236px 1fr;
  column-gap: 24px;
  row-gap: 24px;
}
</style>