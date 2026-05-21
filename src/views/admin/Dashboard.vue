<template>
  <div class="dashboard">
    <!-- 统计卡片 -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon users-icon"></div>
        <div class="stat-content">
          <h3>用户总数</h3>
          <p class="stat-number">{{ stats.users }}</p>
          <p class="stat-change positive">+{{ stats.userGrowth }}% 较上月</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon content-icon"></div>
        <div class="stat-content">
          <h3>内容总量</h3>
          <p class="stat-number">{{ stats.content }}</p>
          <p class="stat-change positive">+{{ stats.contentGrowth }}% 较上月</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon views-icon"></div>
        <div class="stat-content">
          <h3>总访问量</h3>
          <p class="stat-number">{{ stats.views }}</p>
          <p class="stat-change positive">+{{ stats.viewsGrowth }}% 较上月</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon ai-icon"></div>
        <div class="stat-content">
          <h3>AI交互次数</h3>
          <p class="stat-number">{{ stats.aiInteractions }}</p>
          <p class="stat-change positive">+{{ stats.aiGrowth }}% 较上月</p>
        </div>
      </div>
    </div>
    
    <!-- 图表区域 -->
    <div class="charts-grid">
      <!-- 访问量趋势图 -->
      <div class="chart-card">
        <h3>访问量趋势</h3>
        <div class="chart-container">
          <div class="chart-placeholder">
            <div class="chart-bars">
              <div class="bar" style="height: 60%;"></div>
              <div class="bar" style="height: 80%;"></div>
              <div class="bar" style="height: 45%;"></div>
              <div class="bar" style="height: 90%;"></div>
              <div class="bar" style="height: 75%;"></div>
              <div class="bar" style="height: 95%;"></div>
              <div class="bar" style="height: 85%;"></div>
            </div>
            <div class="chart-labels">
              <span>周一</span>
              <span>周二</span>
              <span>周三</span>
              <span>周四</span>
              <span>周五</span>
              <span>周六</span>
              <span>周日</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 用户增长图 -->
      <div class="chart-card">
        <h3>用户增长趋势</h3>
        <div class="chart-container">
          <div class="chart-placeholder">
            <div class="chart-line">
              <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                <polyline points="0,180 50,160 100,140 150,120 200,100 250,80 300,60 350,40 400,20" 
                  fill="none" stroke="#e74c3c" stroke-width="2"/>
                <circle cx="0" cy="180" r="4" fill="#e74c3c"/>
                <circle cx="50" cy="160" r="4" fill="#e74c3c"/>
                <circle cx="100" cy="140" r="4" fill="#e74c3c"/>
                <circle cx="150" cy="120" r="4" fill="#e74c3c"/>
                <circle cx="200" cy="100" r="4" fill="#e74c3c"/>
                <circle cx="250" cy="80" r="4" fill="#e74c3c"/>
                <circle cx="300" cy="60" r="4" fill="#e74c3c"/>
                <circle cx="350" cy="40" r="4" fill="#e74c3c"/>
                <circle cx="400" cy="20" r="4" fill="#e74c3c"/>
              </svg>
            </div>
            <div class="chart-labels">
              <span>1月</span>
              <span>2月</span>
              <span>3月</span>
              <span>4月</span>
              <span>5月</span>
              <span>6月</span>
              <span>7月</span>
              <span>8月</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 内容分类占比 -->
      <div class="chart-card">
        <h3>内容分类占比</h3>
        <div class="chart-container">
          <div class="chart-placeholder">
            <div class="pie-chart">
              <div class="pie-slice slice-1"></div>
              <div class="pie-slice slice-2"></div>
              <div class="pie-slice slice-3"></div>
              <div class="pie-slice slice-4"></div>
              <div class="pie-center"></div>
            </div>
            <div class="pie-legend">
              <div class="legend-item">
                <span class="legend-color color-1"></span>
                <span>党建要闻</span>
                <span class="legend-value">35%</span>
              </div>
              <div class="legend-item">
                <span class="legend-color color-2"></span>
                <span>理论学习</span>
                <span class="legend-value">25%</span>
              </div>
              <div class="legend-item">
                <span class="legend-color color-3"></span>
                <span>党史研究</span>
                <span class="legend-value">20%</span>
              </div>
              <div class="legend-item">
                <span class="legend-color color-4"></span>
                <span>其他内容</span>
                <span class="legend-value">20%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 热门内容 -->
      <div class="chart-card">
        <h3>热门内容</h3>
        <div class="chart-container">
          <div class="hot-content-list">
            <div class="hot-item">
              <div class="hot-rank">1</div>
              <div class="hot-info">
                <h4>习近平新时代中国特色社会主义思想学习纲要</h4>
                <p class="hot-views">2,345 次浏览</p>
              </div>
              <div class="hot-trend up">+12%</div>
            </div>
            <div class="hot-item">
              <div class="hot-rank">2</div>
              <div class="hot-info">
                <h4>中国共产党简史</h4>
                <p class="hot-views">1,892 次浏览</p>
              </div>
              <div class="hot-trend up">+8%</div>
            </div>
            <div class="hot-item">
              <div class="hot-rank">3</div>
              <div class="hot-info">
                <h4>党的二十大报告学习辅导百问</h4>
                <p class="hot-views">1,567 次浏览</p>
              </div>
              <div class="hot-trend up">+5%</div>
            </div>
            <div class="hot-item">
              <div class="hot-rank">4</div>
              <div class="hot-info">
                <h4>习近平谈治国理政第四卷</h4>
                <p class="hot-views">1,342 次浏览</p>
              </div>
              <div class="hot-trend up">+3%</div>
            </div>
            <div class="hot-item">
              <div class="hot-rank">5</div>
              <div class="hot-info">
                <h4>中国共产党章程</h4>
                <p class="hot-views">1,123 次浏览</p>
              </div>
              <div class="hot-trend down">-2%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 模拟数据
const stats = {
  users: 1,234,
  userGrowth: 12.5,
  content: 567,
  contentGrowth: 8.3,
  views: 12,345,
  viewsGrowth: 15.7,
  aiInteractions: 2,345,
  aiGrowth: 23.1
};
</script>

<style scoped>
.dashboard {
  width: 100%;
}

/* 统计卡片样式 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  font-size: 24px;
}

.users-icon {
  background-color: #e74c3c;
  color: #fff;
}

.content-icon {
  background-color: #3498db;
  color: #fff;
}

.views-icon {
  background-color: #2ecc71;
  color: #fff;
}

.ai-icon {
  background-color: #9b59b6;
  color: #fff;
}

.stat-content {
  flex: 1;
}

.stat-content h3 {
  margin: 0 0 5px 0;
  font-size: 14px;
  font-weight: 500;
  color: #718096;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-number {
  margin: 0 0 5px 0;
  font-size: 24px;
  font-weight: 700;
  color: #1a202c;
}

.stat-change {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
}

.stat-change.positive {
  color: #2ecc71;
}

.stat-change.negative {
  color: #e74c3c;
}

/* 图表网格 */
.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 20px;
}

.chart-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.chart-card h3 {
  margin: 0 0 20px 0;
  font-size: 16px;
  font-weight: 600;
  color: #1a202c;
}

.chart-container {
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* 柱状图样式 */
.chart-bars {
  display: flex;
  align-items: end;
  gap: 10px;
  height: 150px;
  width: 100%;
  justify-content: center;
}

.bar {
  width: 30px;
  background-color: #e74c3c;
  border-radius: 4px 4px 0 0;
  transition: height 0.3s ease;
}

.bar:hover {
  background-color: #c0392b;
}

/* 折线图样式 */
.chart-line {
  width: 100%;
  height: 150px;
}

/* 饼图样式 */
.pie-chart {
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 20px;
}

.pie-slice {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%);
}

.slice-1 {
  background-color: #e74c3c;
  transform: rotate(0deg);
}

.slice-2 {
  background-color: #3498db;
  transform: rotate(126deg);
}

.slice-3 {
  background-color: #2ecc71;
  transform: rotate(216deg);
}

.slice-4 {
  background-color: #f39c12;
  transform: rotate(288deg);
}

.pie-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background-color: #fff;
  border-radius: 50%;
}

.pie-legend {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.legend-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  margin-right: 10px;
}

.color-1 {
  background-color: #e74c3c;
}

.color-2 {
  background-color: #3498db;
}

.color-3 {
  background-color: #2ecc71;
}

.color-4 {
  background-color: #f39c12;
}

.legend-value {
  font-weight: 600;
  color: #1a202c;
}

/* 热门内容列表 */
.hot-content-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.hot-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.hot-item:hover {
  background-color: #f7fafc;
}

.hot-rank {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #e74c3c;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-right: 15px;
}

.hot-info {
  flex: 1;
}

.hot-info h4 {
  margin: 0 0 5px 0;
  font-size: 14px;
  font-weight: 600;
  color: #1a202c;
  line-height: 1.4;
}

.hot-views {
  margin: 0;
  font-size: 12px;
  color: #718096;
}

.hot-trend {
  font-size: 12px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 10px;
}

.hot-trend.up {
  background-color: #e8f5e8;
  color: #2ecc71;
}

.hot-trend.down {
  background-color: #ffebee;
  color: #e74c3c;
}

/* 图表标签 */
.chart-labels {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 10px;
  font-size: 12px;
  color: #718096;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .charts-grid {
    grid-template-columns: 1fr;
  }
  
  .chart-card {
    padding: 15px;
  }
  
  .chart-container {
    height: 200px;
  }
}
</style>