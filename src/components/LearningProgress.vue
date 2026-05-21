<template>
  <section class="learning-progress">
    <div class="progress-header-section">
      <h2>📊 学习数据中心</h2>
      <div class="progress-streak" v-if="currentStreak > 0">
        <span class="streak-icon">🔥</span>
        <span class="streak-count">连续学习 {{ currentStreak }} 天</span>
      </div>
    </div>

    <div class="stats-overview">
      <div class="stat-card">
        <div class="stat-icon">🎯</div>
        <div class="stat-content">
          <div class="stat-value">{{ totalLearnedItems }}</div>
          <div class="stat-label">总学习项数</div>
        </div>
        <div class="stat-trend up">+12%</div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">⏱️</div>
        <div class="stat-content">
          <div class="stat-value">{{ formatTotalTime }}</div>
          <div class="stat-label">总学习时长</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">📚</div>
        <div class="stat-content">
          <div class="stat-value">{{ totalItems }}</div>
          <div class="stat-label">知识内容</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">⭐</div>
        <div class="stat-content">
          <div class="stat-value">{{ totalScore }}</div>
          <div class="stat-label">学习积分</div>
        </div>
      </div>
    </div>



    <div class="learning-achievements">
      <h3>🏆 学习成就</h3>
      <div class="achievements-grid">
        <div v-for="(achievement, index) in achievements" :key="index" class="achievement-item" :class="{ unlocked: achievement.unlocked }">
          <div class="achievement-icon">{{ achievement.icon }}</div>
          <div class="achievement-info">
            <div class="achievement-name">{{ achievement.name }}</div>
            <div class="achievement-desc">{{ achievement.description }}</div>
          </div>
          <div class="achievement-status" v-if="achievement.unlocked">✓</div>
        </div>
      </div>
    </div>

    <div class="recent-activities">
      <div class="activities-header">
        <h3>📝 最近学习活动</h3>
        <button class="btn-clear" @click="clearActivities">清空记录</button>
      </div>
      <div class="activity-timeline">
        <div v-for="(activity, index) in recentActivities" :key="index" class="timeline-item">
          <div class="timeline-marker" :style="{ backgroundColor: getActivityColor(activity.type) }"></div>
          <div class="timeline-content">
            <div class="timeline-time">{{ activity.time }}</div>
            <div class="timeline-text">{{ activity.content }}</div>
            <div class="timeline-badge" v-if="activity.badge">{{ activity.badge }}</div>
          </div>
        </div>
        <div v-if="recentActivities.length === 0" class="empty-activity">
          <div class="empty-icon">📚</div>
          <p>暂无学习活动</p>
          <span>开始你的学习之旅吧！</span>
        </div>
      </div>
    </div>

    <div class="learning-goals">
      <h3>🎯 学习目标</h3>
      <div class="goals-list">
        <div v-for="(goal, index) in learningGoals" :key="index" class="goal-item">
          <div class="goal-checkbox" :class="{ completed: goal.completed }" @click="toggleGoal(index)">
            <span v-if="goal.completed">✓</span>
          </div>
          <div class="goal-content">
            <div class="goal-title">{{ goal.title }}</div>
            <div class="goal-progress" v-if="!goal.completed">
              <div class="goal-progress-bar">
                <div class="goal-progress-fill" :style="{ width: goal.progress + '%' }"></div>
              </div>
              <span class="goal-progress-text">{{ goal.progress }}%</span>
            </div>
          </div>
          <div class="goal-reward" v-if="goal.reward">
            <span>+{{ goal.reward }}积分</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const currentStreak = ref(7);
const totalScore = ref(850);



const achievements = ref([
  { icon: '🌟', name: '初学者', description: '完成第一次学习', unlocked: true },
  { icon: '🔥', name: '坚持不懈', description: '连续学习7天', unlocked: true },
  { icon: '📚', name: '学习达人', description: '学习50个内容', unlocked: true },
  { icon: '🎯', name: '目标明确', description: '完成10个目标', unlocked: false },
  { icon: '💎', name: '知识钻石', description: '学习100个内容', unlocked: false },
  { icon: '👑', name: '党史专家', description: '完成所有党史学习', unlocked: false }
]);

const recentActivities = ref([
  { time: '2026-04-21 15:30', content: '学习了"党史学习教育"页面', type: 'study', badge: '+10分' },
  { time: '2026-04-21 14:15', content: '查看了"历史上的今天"', type: 'browse', badge: '+5分' },
  { time: '2026-04-21 10:45', content: '阅读了"每日早报"', type: 'read', badge: '+5分' },
  { time: '2026-04-20 16:20', content: '使用了"AI智能问答"', type: 'ai', badge: '+15分' },
  { time: '2026-04-20 13:50', content: '浏览了"党建知识库"', type: 'browse', badge: '+5分' }
]);

const learningGoals = ref([
  { title: '每日学习10项内容', progress: 50, completed: false, reward: 20 },
  { title: '本周完成50项学习', progress: 50, completed: false, reward: 50 },
  { title: '阅读所有党史资料', progress: 30, completed: false, reward: 100 },
  { title: '参与互动问答5次', progress: 0, completed: false, reward: 30 }
]);

const totalLearnedItems = ref(120);
const totalItems = ref(200);
const totalLearningMinutes = ref(1200);

const formatTotalTime = computed(() => {
  const hours = Math.floor(totalLearningMinutes.value / 60);
  const mins = totalLearningMinutes.value % 60;
  return `${hours}小时${mins}分`;
});

const getActivityColor = (type) => {
  const colors = {
    study: '#dc3545',
    browse: '#007bff',
    read: '#28a745',
    ai: '#fd7e14'
  };
  return colors[type] || '#6c757d';
};

const toggleGoal = (index) => {
  learningGoals.value[index].completed = !learningGoals.value[index].completed;
  if (learningGoals.value[index].completed) {
    totalScore.value += learningGoals.value[index].reward;
  }
};

const clearActivities = () => {
  if (confirm('确定要清空所有学习记录吗？')) {
    recentActivities.value = [];
    localStorage.setItem('recentActivities', JSON.stringify([]));
  }
};

onMounted(() => {
  const savedData = localStorage.getItem('learningProgress');
  if (savedData) {
    const data = JSON.parse(savedData);
    totalLearnedItems.value = data.totalLearnedItems || 120;
    totalLearningMinutes.value = data.totalLearningMinutes || 1200;
    recentActivities.value = data.recentActivities || [];
    currentStreak.value = data.currentStreak || 0;
    totalScore.value = data.totalScore || 0;
  }
});
</script>

<style scoped>
.learning-progress {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
  margin-bottom: var(--spacing-2xl);
}

.progress-header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xl);
}

.learning-progress h2 {
  color: var(--primary-red);
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

.progress-streak {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  background: linear-gradient(135deg, #ff6b6b, #ffa500);
  color: var(--white);
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-full);
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);
}

.streak-icon {
  font-size: 1.2rem;
}

.stats-overview {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-2xl);
}

.stat-card {
  background: var(--light-gray);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
}

.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
}



.stat-icon {
  font-size: 2rem;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
}

.stat-label {
  font-size: 0.85rem;
  color: var(--medium-gray);
}

.stat-trend {
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  font-size: 0.75rem;
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  font-weight: 600;
}

.stat-trend.up {
  background: rgba(40, 167, 69, 0.2);
  color: #28a745;
}



.learning-achievements {
  margin-bottom: var(--spacing-2xl);
}

.learning-achievements h3 {
  color: var(--dark-gray);
  margin-bottom: var(--spacing-lg);
  font-size: 1.2rem;
  font-weight: 600;
}

.achievements-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
}

.achievement-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  background: var(--light-gray);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  opacity: 0.5;
  transition: all var(--transition-normal);
}

.achievement-item.unlocked {
  opacity: 1;
  background: linear-gradient(135deg, #fff9e6, #fff3cc);
  border: 1px solid #ffd700;
}

.achievement-icon {
  font-size: 2rem;
}

.achievement-info {
  flex: 1;
}

.achievement-name {
  font-weight: 600;
  color: var(--dark-gray);
  font-size: 0.95rem;
}

.achievement-desc {
  font-size: 0.8rem;
  color: var(--medium-gray);
}

.achievement-status {
  background: #28a745;
  color: var(--white);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.8rem;
}

.recent-activities {
  margin-bottom: var(--spacing-2xl);
}

.activities-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.activities-header h3 {
  color: var(--dark-gray);
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.btn-clear {
  background: none;
  border: none;
  color: var(--medium-gray);
  cursor: pointer;
  font-size: 0.85rem;
  transition: color var(--transition-normal);
}

.btn-clear:hover {
  color: var(--primary-red);
}

.activity-timeline {
  position: relative;
  padding-left: 20px;
}

.timeline-item {
  position: relative;
  padding-left: var(--spacing-lg);
  padding-bottom: var(--spacing-lg);
  border-left: 2px solid var(--light-gray);
}

.timeline-item:last-child {
  border-left-color: transparent;
  padding-bottom: 0;
}

.timeline-marker {
  position: absolute;
  left: -6px;
  top: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--primary-red);
}

.timeline-content {
  background: var(--light-gray);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
}

.timeline-time {
  font-size: 0.8rem;
  color: var(--medium-gray);
  margin-bottom: var(--spacing-xs);
}

.timeline-text {
  color: var(--dark-gray);
  font-size: 0.95rem;
  margin-bottom: var(--spacing-xs);
}

.timeline-badge {
  display: inline-block;
  background: var(--primary-red);
  color: var(--white);
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 600;
}

.empty-activity {
  text-align: center;
  padding: var(--spacing-2xl);
  color: var(--medium-gray);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-md);
}

.empty-activity p {
  margin: 0 0 var(--spacing-xs) 0;
  font-size: 1.1rem;
  color: var(--dark-gray);
}

.empty-activity span {
  font-size: 0.9rem;
}

.learning-goals h3 {
  color: var(--dark-gray);
  margin-bottom: var(--spacing-lg);
  font-size: 1.2rem;
  font-weight: 600;
}

.goals-list {
  display: grid;
  gap: var(--spacing-md);
}

.goal-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  background: var(--light-gray);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  transition: all var(--transition-normal);
}

.goal-item:hover {
  background: #f0f0f0;
}

.goal-checkbox {
  width: 24px;
  height: 24px;
  border: 2px solid var(--medium-gray);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-normal);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--white);
}

.goal-checkbox.completed {
  background: var(--primary-red);
  border-color: var(--primary-red);
}

.goal-content {
  flex: 1;
}

.goal-title {
  color: var(--dark-gray);
  font-size: 0.95rem;
  margin-bottom: var(--spacing-xs);
}

.goal-progress {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.goal-progress-bar {
  flex: 1;
  height: 6px;
  background: var(--medium-gray);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.goal-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-red), var(--primary-red-light));
  border-radius: var(--radius-full);
  transition: width var(--transition-slow);
}

.goal-progress-text {
  font-size: 0.8rem;
  color: var(--medium-gray);
  min-width: 40px;
}

.goal-reward {
  background: linear-gradient(135deg, #ffd700, #ffb347);
  color: var(--white);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: 0.8rem;
  font-weight: 600;
}

/* 响应式调整 */
@media (max-width: 992px) {
  .stats-overview {
    grid-template-columns: repeat(2, 1fr);
  }

  .progress-circle-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .achievements-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .learning-progress {
    padding: var(--spacing-lg);
  }

  .progress-header-section {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-md);
  }

  .stats-overview {
    grid-template-columns: 1fr;
  }

  .progress-circle-container {
    grid-template-columns: 1fr;
  }

  .achievements-grid {
    grid-template-columns: 1fr;
  }
}
</style>
