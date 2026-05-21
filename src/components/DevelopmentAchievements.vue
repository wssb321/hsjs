<template>
  <section id="development" class="development-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">发展成就</h2>
        <p class="section-subtitle">见证国家发展，感受时代变迁</p>
        <div class="section-divider"></div>
      </div>
      
      <div class="achievements-grid">
        <div 
          v-for="(item, index) in achievements" 
          :key="item.id"
          class="achievement-card"
          :style="{ animationDelay: `${index * 0.1}s` }"
          @mouseenter="activeCard = index"
          @mouseleave="activeCard = -1"
        >
          <div class="card-icon" :class="item.icon">
            <span>{{ item.iconEmoji }}</span>
          </div>
          <div class="card-content">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
            <div class="card-stats">
              <div class="stat-item">
                <span class="stat-value">{{ item.value }}</span>
                <span class="stat-label">{{ item.unit }}</span>
              </div>
              <div class="stat-trend" :class="item.trend > 0 ? 'up' : 'down'">
                {{ item.trend > 0 ? '+' : '' }}{{ item.trend }}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="milestones-section">
        <h3 class="milestones-title">重大里程碑</h3>
        <div class="timeline">
          <div 
            v-for="(milestone, index) in milestones" 
            :key="milestone.year"
            class="timeline-item"
          >
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <span class="timeline-year">{{ milestone.year }}</span>
              <h4>{{ milestone.title }}</h4>
              <p>{{ milestone.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const activeCard = ref(-1);

const achievements = [
  {
    id: 1,
    title: '经济发展',
    description: '国民经济持续健康发展，综合国力显著增强',
    value: '126',
    unit: '万亿元',
    trend: 5.2,
    icon: 'icon-economy',
    iconEmoji: '📈'
  },
  {
    id: 2,
    title: '科技创新',
    description: '科技实力大幅提升，创新能力显著增强',
    value: '54',
    unit: '项重大成果',
    trend: 12.5,
    icon: 'icon-tech',
    iconEmoji: '💡'
  },
  {
    id: 3,
    title: '民生改善',
    description: '人民生活水平不断提高，幸福感持续增强',
    value: '9899',
    unit: '万脱贫人口',
    trend: 100,
    icon: 'icon-life',
    iconEmoji: '🏠'
  },
  {
    id: 4,
    title: '生态文明',
    description: '生态文明建设成效显著，环境质量明显改善',
    value: '87.6',
    unit: '%优良天数',
    trend: 3.2,
    icon: 'icon-eco',
    iconEmoji: '🌿'
  }
];

const milestones = [
  {
    year: '2012',
    title: '党的十八大',
    description: '提出全面建成小康社会目标'
  },
  {
    year: '2017',
    title: '党的十九大',
    description: '中国特色社会主义进入新时代'
  },
  {
    year: '2020',
    title: '脱贫攻坚战胜利',
    description: '现行标准下9899万农村贫困人口全部脱贫'
  },
  {
    year: '2022',
    title: '党的二十大',
    description: '全面建设社会主义现代化国家新征程'
  }
];
</script>

<style scoped>
.development-section {
  padding: 60px 0;
  background: linear-gradient(180deg, #f8f9fa 0%, #fff 100%);
}

.section-header {
  text-align: center;
  margin-bottom: 50px;
}

.section-title {
  font-size: 2.5rem;
  color: var(--primary-red);
  margin-bottom: 10px;
  font-weight: 700;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 20px;
}

.section-divider {
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-red), var(--gold));
  margin: 0 auto;
  border-radius: 2px;
}

.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  margin-bottom: 60px;
}

.achievement-card {
  background: #fff;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
  position: relative;
  overflow: hidden;
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

.achievement-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(194, 30, 39, 0.15);
}

.achievement-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-red), var(--gold));
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.achievement-card:hover::before {
  transform: scaleX(1);
}

.card-icon {
  width: 60px;
  height: 60px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  font-size: 1.8rem;
  transition: all 0.3s ease;
}

.icon-economy {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.icon-tech {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.icon-life {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.icon-eco {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.card-content h3 {
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 10px;
  font-weight: 600;
}

.card-content p {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
}

.card-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.stat-item {
  display: flex;
  align-items: baseline;
  gap: 5px;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--primary-red);
}

.stat-label {
  font-size: 0.85rem;
  color: #888;
}

.stat-trend {
  font-size: 0.9rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 15px;
}

.stat-trend.up {
  color: #28a745;
  background: rgba(40, 167, 69, 0.1);
}

.stat-trend.down {
  color: #dc3545;
  background: rgba(220, 53, 69, 0.1);
}

.milestones-section {
  background: #fff;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.milestones-title {
  font-size: 1.5rem;
  color: var(--primary-red);
  margin-bottom: 30px;
  text-align: center;
  font-weight: 600;
}

.timeline {
  position: relative;
  padding-left: 30px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 8px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, var(--primary-red), var(--gold));
}

.timeline-item {
  position: relative;
  padding-left: 30px;
  margin-bottom: 30px;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-dot {
  position: absolute;
  left: -26px;
  top: 5px;
  width: 16px;
  height: 16px;
  background: var(--primary-red);
  border-radius: 50%;
  border: 3px solid #fff;
  box-shadow: 0 0 10px rgba(194, 30, 39, 0.3);
}

.timeline-content {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.timeline-item:hover .timeline-content {
  background: linear-gradient(135deg, rgba(194, 30, 39, 0.05), rgba(212, 175, 55, 0.05));
}

.timeline-year {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--primary-red);
  margin-bottom: 5px;
  display: block;
}

.timeline-content h4 {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 8px;
  font-weight: 600;
}

.timeline-content p {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .development-section {
    padding: 40px 0;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .achievements-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .milestones-section {
    padding: 25px;
  }
  
  .timeline {
    padding-left: 20px;
  }
  
  .timeline::before {
    left: 3px;
  }
  
  .timeline-item {
    padding-left: 25px;
  }
  
  .timeline-dot {
    left: -21px;
  }
}
</style>
