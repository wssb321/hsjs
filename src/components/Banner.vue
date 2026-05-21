<template>
  <section class="banner" id="home">
    <div class="container">
      <div class="banner-content">
        <div class="banner-left">
          <h1 class="banner-title">
            <span class="title-word">深入学习贯彻</span>
            <span class="title-word">习近平新时代</span>
            <span class="title-word">中国特色社会主义思想</span>
          </h1>
          <p class="banner-subtitle">不忘初心 · 牢记使命 · 永远奋斗</p>
          <div class="banner-buttons">
            <a href="#history-research" class="btn btn-primary">学习贯彻二十大精神</a>
            <a href="/党史学习/index.html" class="btn btn-secondary">党史学习教育</a>
          </div>
        </div>
        <div class="banner-right">
          <div v-if="bannerImage" class="banner-image">
            <div class="image-overlay"></div>
            <img :src="bannerImage" :alt="bannerAlt" />
          </div>
          <div v-else class="banner-image-placeholder">
            <div class="placeholder-content">
              <div class="placeholder-icon">📚</div>
              <p>党建主题图片</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// 图片属性
const props = defineProps({
  bannerImage: {
    type: String,
    default: ''
  },
  bannerAlt: {
    type: String,
    default: '党建主题图片'
  }
});
</script>

<style scoped>
/* Banner样式 */
.banner {
  background: linear-gradient(135deg, var(--primary-red-dark), var(--primary-red));
  color: var(--white);
  padding: 80px 0;
  position: relative;
  overflow: hidden;
}

/* 背景装饰 */
.banner::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: float 20s linear infinite;
  z-index: 0;
}

@keyframes float {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  100% {
    transform: translate(-25%, -25%) rotate(360deg);
  }
}

.banner-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 1;
}

.banner-left {
  flex: 1;
  padding-right: 50px;
  animation: fadeInLeft 1s ease forwards;
  opacity: 0;
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.banner-right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  animation: fadeInRight 1s ease forwards 0.3s;
  opacity: 0;
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.banner-title {
  margin-bottom: var(--spacing-xl);
  color: var(--white);
  font-size: 2.5rem;
  line-height: 1.2;
  font-weight: 700;
}

.title-word {
  display: block;
  margin-bottom: var(--spacing-sm);
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
}

.title-word:nth-child(1) { animation-delay: 0.5s; }
.title-word:nth-child(2) { animation-delay: 0.7s; }
.title-word:nth-child(3) { animation-delay: 0.9s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.banner-subtitle {
  font-size: 1.3rem;
  color: var(--gold-light);
  margin-bottom: var(--spacing-2xl);
  font-weight: 500;
  animation: fadeInUp 0.6s ease forwards 1.1s;
  opacity: 0;
}

.banner-buttons {
  display: flex;
  gap: var(--spacing-lg);
  animation: fadeInUp 0.6s ease forwards 1.3s;
  opacity: 0;
}

.btn-secondary {
  background-color: transparent;
  color: var(--white);
  border: 2px solid var(--white);
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.btn-secondary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: var(--white);
  transition: left var(--transition-slow);
  z-index: -1;
}

.btn-secondary:hover::before {
  left: 0;
}

.btn-secondary:hover {
  background-color: var(--white);
  color: var(--primary-red);
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.banner-image-placeholder {
  width: 450px;
  height: 300px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-size: 1.2rem;
  border-radius: var(--radius-lg);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  transition: all var(--transition-normal);
}

.banner-image-placeholder:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

.placeholder-content {
  text-align: center;
  animation: pulse 2s ease-in-out infinite;
}

.placeholder-icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-md);
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.banner-image {
  width: 450px;
  height: 300px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
  position: relative;
  transition: all var(--transition-normal);
}

.banner-image:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.3);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(194, 30, 39, 0.3), rgba(168, 26, 34, 0.1));
  z-index: 1;
  transition: all var(--transition-normal);
}

.banner-image:hover .image-overlay {
  background: linear-gradient(135deg, rgba(194, 30, 39, 0.4), rgba(168, 26, 34, 0.2));
}

.banner-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.banner-image:hover img {
  transform: scale(1.1);
}

/* 响应式调整 */
@media (max-width: 992px) {
  .banner-title {
    font-size: 2.2rem;
  }
  
  .banner-image-placeholder,
  .banner-image {
    width: 400px;
    height: 250px;
  }
}

@media (max-width: 768px) {
  .banner {
    padding: 40px 0 40px;
    min-height: auto;
  }
  
  .banner-content {
    flex-direction: column;
    text-align: center;
    gap: 30px;
  }
  
  .banner-left {
    padding-right: 0;
    margin-bottom: 0;
    order: 1;
  }
  
  .banner-right {
    order: 2;
    width: 100%;
  }
  
  .banner-title {
    font-size: 1.8rem;
    line-height: 1.3;
  }
  
  .banner-subtitle {
    font-size: 1rem;
    margin-bottom: 24px;
  }
  
  .banner-buttons {
    justify-content: center;
    flex-wrap: wrap;
    gap: 12px;
  }
  
  .banner-image-placeholder,
  .banner-image {
    width: 100%;
    height: 220px;
    border-radius: 12px;
  }
  
  .btn {
    min-width: 140px;
    padding: 14px 24px;
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .banner {
    padding: 30px 0 30px;
  }
  
  .banner-content {
    gap: 20px;
  }
  
  .banner-title {
    font-size: 1.4rem;
    line-height: 1.4;
  }
  
  .title-word {
    margin-bottom: 4px;
  }
  
  .banner-subtitle {
    font-size: 0.9rem;
    margin-bottom: 20px;
  }
  
  .banner-buttons {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
  
  .btn {
    width: 100%;
    max-width: none;
    padding: 14px 20px;
    font-size: 15px;
    border-radius: 10px;
  }
  
  .banner-image-placeholder,
  .banner-image {
    height: 180px;
  }
  
  .banner-image-placeholder .placeholder-icon {
    font-size: 2.5rem;
  }
  
  .banner-image-placeholder p {
    font-size: 0.9rem;
  }
}

@media (max-width: 360px) {
  .banner-title {
    font-size: 1.25rem;
  }
  
  .banner-subtitle {
    font-size: 0.85rem;
  }
  
  .banner-image-placeholder,
  .banner-image {
    height: 150px;
  }
}
</style>