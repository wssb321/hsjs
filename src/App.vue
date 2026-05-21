<script setup>
import Navbar from './components/Navbar.vue';
</script>

<template>
  <div class="app">
    <!-- 顶部导航栏 -->
    <Navbar />

    <!-- 路由视图 -->
    <main class="main-content-wrapper">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style scoped>
.main-content-wrapper {
  padding-top: 70px;
}

@media (max-width: 768px) {
  .main-content-wrapper {
    padding-top: 65px;
    padding-top: calc(65px + env(safe-area-inset-top));
  }
}

@media (max-width: 480px) {
  .main-content-wrapper {
    padding-top: 60px;
    padding-top: calc(60px + env(safe-area-inset-top));
  }
}
</style>