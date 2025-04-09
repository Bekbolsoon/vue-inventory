<template>
  <div class="profile app__profile">
    <div class="profile__img">
      <img src="../assets/img/profile.png" alt="profile-img">
    </div>
    <div class="profile__text">
      <div class="skeleton-text skeleton-title"></div>
      <div class="skeleton-text w-155"></div>
      <div class="skeleton-text w-100"></div>
      <div class="skeleton-text w-170"></div>
      <div class="skeleton-text w-160"></div>
      <div class="skeleton-text w-140"></div>
      <div class="skeleton-text skeleton-end-text"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.profile {
  padding: 18px 14px 24px 14px;
  max-height: 500px;
  box-sizing: border-box;
  background: #262626;
  border: 1px solid #4d4d4d;
  border-radius: 12px;
}

.profile__img {
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;

  img {
    filter: blur(12px);
  }
}

.profile__text {
  max-width: 190px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
</style>