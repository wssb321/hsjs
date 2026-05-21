<template>
  <section class="section party-history-section" id="history">
    <div class="section-header">
      <h2>党的光辉历程</h2>
      <p class="section-subtitle">中国共产党的百年奋斗历程</p>
    </div>
    <div class="timeline">
      <div 
        v-for="(item, index) in partyHistory" 
        :key="index" 
        class="timeline-item"
        :class="{ 'is-visible': isVisible[index] }"
        @scroll="handleScroll"
      >
        <div class="timeline-dot">
          <div class="dot-inner"></div>
        </div>
        <div class="timeline-content">
          <div class="timeline-date">{{ item.date }}</div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.content }}</p>
          <div class="timeline-icon">{{ item.icon }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

// 党的光辉历程数据
const partyHistory = [
  {
    date: '1921年',
    title: '中国共产党成立',
    content: '中国共产党第一次全国代表大会在上海召开，宣告中国共产党正式成立。',
    icon: '🚩'
  },
  {
    date: '1949年',
    title: '中华人民共和国成立',
    content: '中华人民共和国成立，中国人民从此站起来了。',
    icon: '🇨🇳'
  },
  {
    date: '1978年',
    title: '改革开放',
    content: '党的十一届三中全会召开，开启了改革开放和社会主义现代化建设的新时期。',
    icon: '🔄'
  },
  {
    date: '2012年',
    title: '十八大召开',
    content: '中国共产党第十八次全国代表大会召开，确立了科学发展观为党的指导思想。',
    icon: '📊'
  },
  {
    date: '2022年',
    title: '二十大召开',
    content: '中国共产党第二十次全国代表大会召开，为全面建设社会主义现代化国家、全面推进中华民族伟大复兴指明了前进方向。',
    icon: '🌟'
  }
];

// 可见性状态
const isVisible = ref(new Array(partyHistory.length).fill(false));

// 处理滚动事件
const handleScroll = () => {
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach((item, index) => {
    const rect = item.getBoundingClientRect();
    const isInViewport = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
    if (isInViewport) {
      isVisible.value[index] = true;
    }
  });
};

onMounted(() => {
  handleScroll(); // 初始检查
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
/* 党的光辉历程样式 */
.party-history-section {
  margin: 60px 0;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  padding: 40px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border);
}

.party-history-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(90deg, var(--primary-red), var(--gold), var(--primary-red));
  animation: gradientShift 3s ease-in-out infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.party-history-section:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.section-header {
  text-align: center;
  margin-bottom: 50px;
  position: relative;
  padding-bottom: 20px;
}

.section-header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background: linear-gradient(90deg, var(--primary-red), var(--gold));
  border-radius: var(--radius-sm);
}

.section-header h2 {
  color: var(--primary-red);
  margin-bottom: 15px;
  font-size: 2.2rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: linear-gradient(90deg, var(--primary-red), var(--primary-red-dark));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  color: var(--gray);
  font-size: 1.1rem;
  margin-bottom: 0;
  font-weight: 500;
}

/* 时间线样式 */
.timeline {
  position: relative;
  padding: 0;
  margin: 0;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 4px;
  background: linear-gradient(180deg, var(--primary-red), var(--primary-red-light), var(--gold), var(--primary-red-light), var(--primary-red));
  transform: translateX(-50%);
  box-shadow: 0 0 15px rgba(194, 30, 39, 0.3);
  border-radius: var(--radius-full);
  animation: pulseLine 3s ease-in-out infinite;
}

@keyframes pulseLine {
  0%, 100% {
    box-shadow: 0 0 15px rgba(194, 30, 39, 0.3);
  }
  50% {
    box-shadow: 0 0 25px rgba(194, 30, 39, 0.5);
  }
}

.timeline-item {
  position: relative;
  margin-bottom: 60px;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: translateY(50px);
}

.timeline-item.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.timeline-item:nth-child(1) {
  transition-delay: 0.1s;
}

.timeline-item:nth-child(2) {
  transition-delay: 0.2s;
}

.timeline-item:nth-child(3) {
  transition-delay: 0.3s;
}

.timeline-item:nth-child(4) {
  transition-delay: 0.4s;
}

.timeline-item:nth-child(5) {
  transition-delay: 0.5s;
}

.timeline-item:hover {
  transform: translateY(-10px) scale(1.02);
}

.timeline-item:nth-child(odd) {
  padding-right: calc(50% + 60px);
  text-align: right;
}

.timeline-item:nth-child(even) {
  padding-left: calc(50% + 60px);
  text-align: left;
}

.timeline-dot {
  position: absolute;
  top: 25px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--white);
  border: 4px solid var(--primary-red);
  transform: translateX(-50%);
  box-shadow: 0 0 0 8px rgba(194, 30, 39, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.timeline-dot:hover {
  transform: translateX(-50%) scale(1.4);
  box-shadow: 0 0 0 12px rgba(194, 30, 39, 0.3);
  border-color: var(--gold);
}

.dot-inner {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--gold), var(--gold-light));
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: pulseDot 2s ease-in-out infinite;
}

@keyframes pulseDot {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 5px rgba(212, 175, 55, 0.5);
  }
  50% {
    transform: scale(1.2);
    box-shadow: 0 0 10px rgba(212, 175, 55, 0.8);
  }
}

.timeline-item:hover .dot-inner {
  transform: scale(1.3);
  background: linear-gradient(135deg, var(--gold-light), var(--gold));
}

.timeline-item:nth-child(odd) .timeline-dot {
  right: calc(50% - 16px);
  transform: translateX(50%);
}

.timeline-item:nth-child(odd):hover .timeline-dot {
  transform: translateX(50%) scale(1.4);
}

.timeline-item:nth-child(even) .timeline-dot {
  left: calc(50% - 16px);
}

.timeline-content {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  padding: 30px;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  border-left: 4px solid var(--primary-red);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid var(--border);
}

.timeline-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-red), var(--gold), var(--primary-red));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.timeline-item:hover .timeline-content::before {
  transform: scaleX(1);
  animation: gradientShift 3s ease-in-out infinite;
}

.timeline-item:nth-child(odd) .timeline-content {
  border-left: none;
  border-right: 4px solid var(--primary-red);
}

.timeline-item:nth-child(odd) .timeline-content::before {
  transform-origin: right;
}

.timeline-item:hover .timeline-content {
  box-shadow: var(--shadow-xl);
  background: linear-gradient(135deg, #ffffff 0%, #f0f4f8 100%);
  transform: translateY(-5px);
}

.timeline-date {
  font-weight: 700;
  color: var(--primary-red);
  margin-bottom: 15px;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  display: inline-block;
  padding: 5px 15px;
  background: rgba(194, 30, 39, 0.1);
  border-radius: var(--radius-full);
  border: 1px solid rgba(194, 30, 39, 0.2);
}

.timeline-content h3 {
  margin-bottom: 15px;
  color: var(--gray-dark);
  font-size: 1.4rem;
  font-weight: 700;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.timeline-item:hover .timeline-content h3 {
  color: var(--primary-red);
  transform: translateY(-3px);
}

.timeline-content p {
  line-height: 1.7;
  color: var(--gray);
  margin-bottom: 0;
  font-size: 1rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.timeline-item:hover .timeline-content p {
  color: var(--gray-dark);
}

.timeline-icon {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 2rem;
  opacity: 0.1;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 0;
}

.timeline-item:nth-child(odd) .timeline-icon {
  right: auto;
  left: 20px;
}

.timeline-item:hover .timeline-icon {
  opacity: 0.3;
  transform: scale(1.2) rotate(15deg);
}

/* 响应式调整 */
@media (max-width: 992px) {
  .party-history-section {
    padding: 30px;
  }
  
  .section-header h2 {
    font-size: 1.8rem;
  }
  
  .timeline-content {
    padding: 25px;
  }
  
  .timeline-item:nth-child(odd),
  .timeline-item:nth-child(even) {
    padding-right: calc(50% + 40px);
    padding-left: 0;
    text-align: right;
  }
  
  .timeline-item:nth-child(even) .timeline-content {
    border-left: none;
    border-right: 4px solid var(--primary-red);
  }
  
  .timeline-item:nth-child(even) .timeline-dot {
    left: auto;
    right: calc(50% - 16px);
    transform: translateX(50%);
  }
  
  .timeline-item:nth-child(even) .timeline-icon {
    right: 20px;
    left: auto;
  }
}

@media (max-width: 768px) {
  .party-history-section {
    padding: 20px;
    margin: 40px 0;
  }
  
  .section-header h2 {
    font-size: 1.5rem;
  }
  
  .section-subtitle {
    font-size: 0.9rem;
  }
  
  .timeline::before {
    left: 30px;
  }
  
  .timeline-item:nth-child(odd),
  .timeline-item:nth-child(even) {
    padding-left: 80px;
    padding-right: 0;
    text-align: left;
  }
  
  .timeline-dot {
    left: 18px !important;
    transform: translateX(0) !important;
  }
  
  .timeline-item:hover .timeline-dot {
    transform: translateX(0) scale(1.4) !important;
  }
  
  .timeline-item:nth-child(odd) .timeline-content,
  .timeline-item:nth-child(even) .timeline-content {
    border-left: 4px solid var(--primary-red);
    border-right: none;
  }
  
  .timeline-item:nth-child(odd) .timeline-icon,
  .timeline-item:nth-child(even) .timeline-icon {
    right: 20px;
    left: auto;
  }
  
  .timeline-content {
    padding: 20px;
  }
  
  .timeline-date {
    font-size: 1rem;
    padding: 3px 10px;
  }
  
  .timeline-content h3 {
    font-size: 1.2rem;
  }
  
  .timeline-content p {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .party-history-section {
    padding: 15px;
  }
  
  .section-header h2 {
    font-size: 1.3rem;
  }
  
  .timeline-content {
    padding: 15px;
  }
  
  .timeline-item {
    margin-bottom: 40px;
  }
}
</style>