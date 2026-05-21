<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue';

// 轮播图属性
const props = defineProps({
  slides: {
    type: Array,
    default: () => []
  },
  autoPlay: {
    type: Boolean,
    default: true
  },
  interval: {
    type: Number,
    default: 5000
  }
});

// 轮播图当前索引
const currentSlide = ref(0);
const isAnimating = ref(false);
let autoPlayInterval = null;

// 计算轮播图数量
const slideCount = computed(() => {
  return props.slides.length > 0 ? props.slides.length : 3;
});

// 轮播图控制方法
const nextSlide = () => {
  if (isAnimating.value) return;
  isAnimating.value = true;
  currentSlide.value = (currentSlide.value + 1) % slideCount.value;
  setTimeout(() => {
    isAnimating.value = false;
  }, 800);
};

const prevSlide = () => {
  if (isAnimating.value) return;
  isAnimating.value = true;
  currentSlide.value = (currentSlide.value - 1 + slideCount.value) % slideCount.value;
  setTimeout(() => {
    isAnimating.value = false;
  }, 800);
};

const goToSlide = (index) => {
  if (isAnimating.value || currentSlide.value === index) return;
  isAnimating.value = true;
  currentSlide.value = index;
  setTimeout(() => {
    isAnimating.value = false;
  }, 800);
};

// 自动轮播
const startAutoPlay = () => {
  if (props.autoPlay) {
    autoPlayInterval = setInterval(() => {
      nextSlide();
    }, props.interval);
  }
};

const stopAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
  }
};

onMounted(() => {
  startAutoPlay();
});

onUnmounted(() => {
  stopAutoPlay();
});
</script>

<template>
  <section class="carousel-section">
    <div class="container">
      <div class="carousel" @mouseenter="stopAutoPlay" @mouseleave="startAutoPlay">
        <div class="carousel-inner">
          <!-- 用户自定义图片 -->
          <div 
            v-for="(slide, index) in slides" 
            :key="index"
            :class="['carousel-item', { active: currentSlide === index }]"
            :style="{
              transform: `translateX(${(index - currentSlide) * 100}%)`,
              opacity: Math.abs(index - currentSlide) <= 1 ? 1 : 0
            }"
          >
            <div class="carousel-image">
              <div class="image-overlay"></div>
              <img :src="slide.image" :alt="slide.alt" />
              <div v-if="slide.title" class="carousel-caption">
                <h3>{{ slide.title }}</h3>
                <p v-if="slide.description">{{ slide.description }}</p>
              </div>
            </div>
          </div>
          
          <!-- 默认占位图片 -->
          <div 
            v-if="slides.length === 0" 
            :class="['carousel-item', { active: currentSlide === 0 }]"
            :style="{
              transform: `translateX(${(0 - currentSlide) * 100}%)`,
              opacity: Math.abs(0 - currentSlide) <= 1 ? 1 : 0
            }"
          >
            <div class="carousel-image-placeholder">
              <div class="placeholder-content">
                <div class="placeholder-icon">📚</div>
                <h3>学习贯彻20大</h3>
                <p>深入学习贯彻党的二十大精神</p>
              </div>
            </div>
          </div>
          <div 
            v-if="slides.length === 0" 
            :class="['carousel-item', { active: currentSlide === 1 }]"
            :style="{
              transform: `translateX(${(1 - currentSlide) * 100}%)`,
              opacity: Math.abs(1 - currentSlide) <= 1 ? 1 : 0
            }"
          >
            <div class="carousel-image-placeholder">
              <div class="placeholder-content">
                <div class="placeholder-icon">📅</div>
                <h3>党史学习教育动员大会</h3>
                <p>开展党史学习教育，传承红色基因</p>
              </div>
            </div>
          </div>
          <div 
            v-if="slides.length === 0" 
            :class="['carousel-item', { active: currentSlide === 2 }]"
            :style="{
              transform: `translateX(${(2 - currentSlide) * 100}%)`,
              opacity: Math.abs(2 - currentSlide) <= 1 ? 1 : 0
            }"
          >
            <div class="carousel-image-placeholder">
              <div class="placeholder-content">
                <div class="placeholder-icon">🌟</div>
                <h3>学习贯彻新时代</h3>
                <p>习近平新时代中国特色社会主义思想</p>
              </div>
            </div>
          </div>
        </div>
        <!-- 轮播控制按钮 -->
        <button class="carousel-control prev" @click="prevSlide" aria-label="Previous">
          <span class="control-icon">‹</span>
        </button>
        <button class="carousel-control next" @click="nextSlide" aria-label="Next">
          <span class="control-icon">›</span>
        </button>
        <!-- 轮播指示器 -->
        <div class="carousel-indicators">
          <span 
            v-for="(item, index) in slideCount" 
            :key="index"
            :class="['indicator', { active: currentSlide === index }]"
            @click="goToSlide(index)"
            :aria-label="`Go to slide ${index + 1}`"
          ></span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 轮播图样式 */
.carousel-section {
  margin: 40px 0;
  position: relative;
}

.carousel {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  height: 450px;
  background: linear-gradient(135deg, var(--primary-red-light), var(--primary-red));
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.carousel:hover {
  box-shadow: var(--shadow-2xl);
  transform: translateY(-5px);
}

.carousel-inner {
  position: relative;
  height: 100%;
  display: flex;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.carousel-item {
  position: relative;
  flex: 0 0 100%;
  height: 100%;
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-item.active {
  opacity: 1;
}

.carousel-image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--primary-red), var(--primary-red-dark));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  position: relative;
  overflow: hidden;
}

.carousel-image-placeholder::before {
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

.placeholder-content {
  text-align: center;
  z-index: 1;
  animation: fadeInUp 1s ease forwards;
  padding: 0 20px;
}

.placeholder-icon {
  font-size: 4rem;
  margin-bottom: 20px;
  animation: pulse 2s ease-in-out infinite;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
}

.placeholder-content h3 {
  font-size: 1.8rem;
  margin-bottom: 10px;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.placeholder-content p {
  font-size: 1.1rem;
  color: var(--gold-light);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.carousel-image {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.carousel-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 7s cubic-bezier(0.4, 0, 0.2, 1);
}

.carousel-image:hover img {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(194, 30, 39, 0.4), rgba(168, 26, 34, 0.2));
  z-index: 1;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.carousel-image:hover .image-overlay {
  background: linear-gradient(135deg, rgba(194, 30, 39, 0.5), rgba(168, 26, 34, 0.3));
}

.carousel-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: var(--white);
  z-index: 2;
  transform: translateY(100%);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.carousel-image:hover .carousel-caption {
  transform: translateY(0);
}

.carousel-caption h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  animation: fadeInUp 0.6s ease forwards;
}

.carousel-caption p {
  font-size: 1rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  animation: fadeInUp 0.6s ease forwards 0.2s;
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 轮播控制按钮 */
.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  color: var(--white);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 1.8rem;
  cursor: pointer;
  z-index: 10;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
}

.carousel:hover .carousel-control {
  opacity: 1;
}

.carousel-control:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
}

.carousel-control.prev {
  left: 30px;
}

.carousel-control.next {
  right: 30px;
}

.control-icon {
  display: block;
  line-height: 1;
  transition: transform 0.3s ease;
}

.carousel-control:hover .control-icon {
  transform: scale(1.2);
}

/* 轮播指示器 */
.carousel-indicators {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 15px;
  z-index: 10;
  padding: 10px 20px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 30px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0, 1);
  opacity: 0.7;
}

.carousel:hover .carousel-indicators {
  opacity: 1;
  transform: translateX(-50%) translateY(-5px);
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.indicator::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: var(--gold);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.4s ease, height 0.4s ease;
}

.indicator.active {
  background-color: var(--white);
  transform: scale(1.3);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
}

.indicator.active::before {
  width: 100%;
  height: 100%;
}

.indicator:hover {
  background-color: rgba(255, 255, 255, 0.8);
  transform: scale(1.2);
}

/* 响应式调整 */
@media (max-width: 992px) {
  .carousel {
    height: 400px;
  }
  
  .placeholder-content h3 {
    font-size: 1.5rem;
  }
  
  .carousel-caption h3 {
    font-size: 1.3rem;
  }
  
  .carousel-control {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
  }
}

@media (max-width: 768px) {
  .carousel {
    height: 280px;
  }
  
  .carousel-section {
    margin: 20px 0;
    padding: 0 8px;
  }
  
  .placeholder-icon {
    font-size: 2.5rem;
  }
  
  .placeholder-content h3 {
    font-size: 1.2rem;
  }
  
  .placeholder-content p {
    font-size: 0.85rem;
  }
  
  .carousel-caption {
    padding: 25px 20px;
  }
  
  .carousel-caption h3 {
    font-size: 1rem;
  }
  
  .carousel-caption p {
    font-size: 0.75rem;
  }
  
  .carousel-control {
    width: 44px;
    height: 44px;
    font-size: 1.3rem;
    opacity: 0.8;
  }
  
  .carousel:hover .carousel-control {
    opacity: 1;
  }
  
  .carousel-control.prev {
    left: 10px;
  }
  
  .carousel-control.next {
    right: 10px;
  }
  
  .carousel-indicators {
    bottom: 15px;
    gap: 8px;
    padding: 6px 12px;
  }
  
  .indicator {
    width: 10px;
    height: 10px;
  }
}

@media (max-width: 480px) {
  .carousel {
    height: 250px;
  }
  
  .placeholder-content h3 {
    font-size: 1.1rem;
  }
  
  .carousel-caption {
    padding: 20px;
  }
  
  .carousel-caption h3 {
    font-size: 1rem;
  }
  
  .carousel-indicators {
    bottom: 15px;
  }
}
</style>