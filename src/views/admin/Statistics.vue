<template>
  <div class="statistics-page">
    <div class="page-header">
      <h2>数据统计报表</h2>
      <div class="header-actions">
        <select v-model="dateRange" class="date-select">
          <option value="week">最近7天</option>
          <option value="month">最近30天</option>
          <option value="quarter">最近90天</option>
          <option value="year">最近一年</option>
        </select>
        <button class="btn btn-secondary" @click="exportReport">
          <span>📥</span> 导出报表
        </button>
      </div>
    </div>

    <div class="stats-overview">
      <div class="stat-card">
        <div class="stat-icon blue">👥</div>
        <div class="stat-content">
          <div class="stat-value">{{ statsData.totalUsers }}</div>
          <div class="stat-label">用户总数</div>
          <div class="stat-trend up">↑ 12%</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green">📚</div>
        <div class="stat-content">
          <div class="stat-value">{{ statsData.totalCourses }}</div>
          <div class="stat-label">课程总数</div>
          <div class="stat-trend up">↑ 8%</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon orange">📝</div>
        <div class="stat-content">
          <div class="stat-value">{{ statsData.totalArticles }}</div>
          <div class="stat-label">文章总数</div>
          <div class="stat-trend up">↑ 15%</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon purple">🎯</div>
        <div class="stat-content">
          <div class="stat-value">{{ statsData.avgCompletionRate }}%</div>
          <div class="stat-label">平均完成率</div>
          <div class="stat-trend up">↑ 5%</div>
        </div>
      </div>
    </div>

    <div class="charts-grid">
      <div class="chart-card full-width">
        <div class="chart-header">
          <h3>用户活跃趋势</h3>
        </div>
        <div class="chart-body">
          <div class="chart-placeholder">
            <div class="chart-bars">
              <div v-for="(value, index) in userActivityData" :key="index" class="bar-container">
                <div class="bar" :style="{ height: (value / maxUserActivity * 100) + '%' }"></div>
                <span class="bar-label">{{ userActivityLabels[index] }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="chart-card">
        <div class="chart-header">
          <h3>学习内容分类占比</h3>
        </div>
        <div class="chart-body">
          <div class="pie-chart">
            <div class="pie-legend">
              <div v-for="(item, index) in contentCategoryData" :key="index" class="legend-item">
                <span class="legend-color" :style="{ background: item.color }"></span>
                <span class="legend-label">{{ item.name }}</span>
                <span class="legend-value">{{ item.value }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="chart-card">
        <div class="chart-header">
          <h3>课程完成率分布</h3>
        </div>
        <div class="chart-body">
          <div class="completion-distribution">
            <div v-for="(item, index) in completionDistribution" :key="index" class="distribution-item">
              <div class="distribution-label">{{ item.label }}</div>
              <div class="distribution-bar">
                <div class="distribution-fill" :style="{ width: item.value + '%', background: item.color }"></div>
              </div>
              <div class="distribution-value">{{ item.value }}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const dateRange = ref('month');

const statsData = ref({
  totalUsers: 156,
  totalCourses: 48,
  totalArticles: 326,
  avgCompletionRate: 78
});

const userActivityLabels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
const userActivityData = ref([120, 145, 132, 156, 142, 98, 115]);

const maxUserActivity = computed(() => {
  return Math.max(...userActivityData.value);
});

const contentCategoryData = ref([
  { name: '党史学习', value: 35, color: '#e74c3c' },
  { name: '理论学习', value: 28, color: '#3498db' },
  { name: '党建知识', value: 22, color: '#f39c12' },
  { name: '时事政治', value: 15, color: '#27ae60' }
]);

const completionDistribution = ref([
  { label: '100%完成', value: 45, color: '#27ae60' },
  { label: '80-99%完成', value: 28, color: '#3498db' },
  { label: '60-79%完成', value: 15, color: '#f39c12' },
  { label: '60%以下', value: 12, color: '#e74c3c' }
]);

const exportReport = () => {
  alert('正在生成报表，请稍候...');
};
</script>

<style scoped>
.statistics-page { padding: 0; }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.page-header h2 { margin: 0; font-size: 20px; color: #1a202c; }
.header-actions { display: flex; gap: 10px; }
.date-select { padding: 10px 15px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 14px; background: #fff; }
.btn { display: inline-flex; align-items: center; gap: 6px; padding: 10px 20px; border: none; border-radius: 8px; font-size: 14px; cursor: pointer; }
.btn-secondary { background: #e2e8f0; color: #2d3748; }
.stats-overview { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 25px; }
.stat-card { background: #fff; border-radius: 12px; padding: 20px; display: flex; align-items: center; gap: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
.stat-icon { width: 60px; height: 60px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 28px; }
.stat-icon.blue { background: #ebf8ff; }
.stat-icon.green { background: #f0fff4; }
.stat-icon.orange { background: #fffaf0; }
.stat-icon.purple { background: #faf5ff; }
.stat-value { font-size: 32px; font-weight: 700; color: #1a202c; }
.stat-label { font-size: 14px; color: #718096; margin-bottom: 4px; }
.stat-trend { font-size: 13px; font-weight: 600; }
.stat-trend.up { color: #27ae60; }
.charts-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 25px; }
.chart-card { background: #fff; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
.chart-card.full-width { grid-column: span 2; }
.chart-header { margin-bottom: 20px; }
.chart-header h3 { margin: 0; font-size: 16px; color: #1a202c; }
.chart-placeholder { height: 200px; }
.chart-bars { display: flex; align-items: flex-end; justify-content: space-around; height: 180px; padding-top: 20px; }
.bar-container { display: flex; flex-direction: column; align-items: center; gap: 8px; }
.bar { width: 40px; background: linear-gradient(180deg, #3498db 0%, #2980b9 100%); border-radius: 6px 6px 0 0; transition: height 0.5s ease; }
.bar-label { font-size: 12px; color: #718096; }
.pie-legend { display: flex; flex-direction: column; gap: 12px; }
.legend-item { display: flex; align-items: center; gap: 10px; }
.legend-color { width: 16px; height: 16px; border-radius: 4px; }
.legend-label { flex: 1; font-size: 14px; color: #2d3748; }
.legend-value { font-size: 14px; font-weight: 600; color: #1a202c; }
.completion-distribution { display: flex; flex-direction: column; gap: 15px; }
.distribution-item { display: grid; grid-template-columns: 80px 1fr 50px; align-items: center; gap: 15px; }
.distribution-label { font-size: 13px; color: #4a5568; }
.distribution-bar { height: 12px; background: #f0f0f0; border-radius: 6px; overflow: hidden; }
.distribution-fill { height: 100%; border-radius: 6px; transition: width 0.5s ease; }
.distribution-value { font-size: 14px; font-weight: 600; color: #1a202c; text-align: right; }
@media (max-width: 992px) { .charts-grid { grid-template-columns: 1fr; } .chart-card.full-width { grid-column: span 1; } }
@media (max-width: 768px) { .page-header { flex-direction: column; align-items: flex-start; gap: 15px; } }
</style>
