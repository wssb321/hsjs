<template>
  <div class="home">
    <!-- 头部Banner -->
    <Banner
      bannerImage="../image/习近平讲话.jpg"
      bannerAlt="党建主题图片"
    />

    <!-- 轮播图 -->
    <Carousel :slides="carouselSlides" />

    <!-- 每日早报 -->
    <DailyNews />

    <!-- 学习材料 -->
    <StudyMaterials />

    <!-- 主体内容 -->
    <main class="main-content">
      <div class="container">
        <!-- 党的光辉历程 -->
        <PartyHistory />

        <!-- 历史上的今天 -->
        <TodayInHistory />

        <!-- AI智能问答助手 -->
        <AIAssistant />
      </div>
    </main>

    <!-- 发展成就 -->
    <DevelopmentAchievements />

    <!-- 榜样人物 -->
    <ModelFigures />

    <!-- 底部版权区 -->
    <Footer />
  </div>
</template>

<script setup>
import Banner from './Banner.vue';
import Carousel from './Carousel.vue';
import DailyNews from './DailyNews.vue';
import StudyMaterials from './StudyMaterials.vue';
import PartyHistory from './PartyHistory.vue';
import TodayInHistory from './TodayInHistory.vue';
import AIAssistant from './AIAssistant.vue';
import DevelopmentAchievements from './DevelopmentAchievements.vue';
import ModelFigures from './ModelFigures.vue';
import Footer from './Footer.vue';

const carouselSlides = [
  {
    image: '/image/学习贯彻.jpg',
    alt: '学习贯彻20大'
  },
  {
    image: '/image/学习贯彻1.jpg',
    alt: '学习贯彻新时代'
  }
];
</script>

<style scoped>
.main-content {
  padding: 40px 0;
}

@media (max-width: 768px) {
  .main-content {
    padding: 20px 0;
  }
}

@media (max-width: 480px) {
  .main-content {
    padding: 15px 0;
  }
}
</style>
