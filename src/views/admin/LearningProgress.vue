<template>
  <div class="learning-progress-management">
    <div class="page-header">
      <h2>学习进度监控</h2>
      <div class="header-actions">
        <select v-model="organizationFilter" class="filter-select">
          <option value="">全部组织</option>
          <option value="party_committee">党委</option>
          <option value="branch_1">第一党支部</option>
          <option value="branch_2">第二党支部</option>
          <option value="branch_3">第三党支部</option>
        </select>
        <button class="btn btn-secondary" @click="exportProgress">
          <span>📥</span> 导出报表
        </button>
      </div>
    </div>

    <div class="progress-overview">
      <div class="overview-card">
        <div class="overview-header">
          <h3>总体学习进度</h3>
          <span class="overview-rate">{{ overallProgress }}%</span>
        </div>
        <div class="overview-bar">
          <div class="overview-fill" :style="{ width: overallProgress + '%' }"></div>
        </div>
        <div class="overview-stats">
          <div class="stat">
            <span class="stat-value">{{ completedCount }}</span>
            <span class="stat-label">已完成</span>
          </div>
          <div class="stat">
            <span class="stat-value">{{ inProgressCount }}</span>
            <span class="stat-label">进行中</span>
          </div>
          <div class="stat">
            <span class="stat-value">{{ notStartedCount }}</span>
            <span class="stat-label">未开始</span>
          </div>
        </div>
      </div>

      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-icon">📚</div>
          <div class="stat-info">
            <div class="stat-value">{{ avgLearningHours }}</div>
            <div class="stat-label">人均学习学时</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🎯</div>
          <div class="stat-info">
            <div class="stat-value">{{ completionRate }}%</div>
            <div class="stat-label">年度完成率</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📝</div>
          <div class="stat-info">
            <div class="stat-value">{{ examPassRate }}%</div>
            <div class="stat-label">考试通过率</div>
          </div>
        </div>
        <div class="stat-card warning">
          <div class="stat-icon">⚠️</div>
          <div class="stat-info">
            <div class="stat-value">{{ warningCount }}</div>
            <div class="stat-label">学习滞后</div>
          </div>
        </div>
      </div>
    </div>

    <div class="learning-table-container">
      <table class="learning-table">
        <thead>
          <tr>
            <th>党员姓名</th>
            <th>所属组织</th>
            <th>学习进度</th>
            <th>完成学时</th>
            <th>考试状态</th>
            <th>最近学习</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="member in learningRecords" :key="member.id" :class="{ warning: member.progress < 60 }">
            <td>
              <div class="member-info">
                <div class="member-avatar">{{ member.name.charAt(0) }}</div>
                <span>{{ member.name }}</span>
              </div>
            </td>
            <td>{{ member.organization }}</td>
            <td>
              <div class="progress-cell">
                <div class="progress-bar">
                  <div class="progress-fill" :class="{ low: member.progress < 60 }" :style="{ width: member.progress + '%' }"></div>
                </div>
                <span>{{ member.progress }}%</span>
              </div>
            </td>
            <td>{{ member.hours }}小时 / {{ member.requiredHours }}小时</td>
            <td>
              <span :class="['exam-status', member.examStatus]">
                {{ getExamStatusName(member.examStatus) }}
              </span>
            </td>
            <td>{{ member.lastLearning }}</td>
            <td>
              <button class="action-btn" @click="viewDetail(member)">查看详情</button>
              <button class="action-btn" @click="sendReminder(member)">催学</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination">
      <button @click="currentPage--" :disabled="currentPage === 1">上一页</button>
      <span>第 {{ currentPage }} 页</span>
      <button @click="currentPage++" :disabled="currentPage === totalPages">下一页</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const organizationFilter = ref('');
const currentPage = ref(1);
const totalPages = 5;

const overallProgress = ref(78);
const completedCount = ref(89);
const inProgressCount = ref(52);
const notStartedCount = ref(15);
const avgLearningHours = ref(28.5);
const completionRate = ref(72);
const examPassRate = ref(85);
const warningCount = ref(12);

const learningRecords = ref([
  { id: 1, name: '张三', organization: '党委办公室', progress: 95, hours: 45, requiredHours: 48, examStatus: 'passed', lastLearning: '2024-04-20' },
  { id: 2, name: '李四', organization: '第一党支部', progress: 88, hours: 42, requiredHours: 48, examStatus: 'passed', lastLearning: '2024-04-19' },
  { id: 3, name: '王五', organization: '第二党支部', progress: 75, hours: 36, requiredHours: 48, examStatus: 'pending', lastLearning: '2024-04-18' },
  { id: 4, name: '赵六', organization: '第三党支部', progress: 45, hours: 22, requiredHours: 48, examStatus: 'failed', lastLearning: '2024-04-15' },
  { id: 5, name: '钱七', organization: '第一党支部', progress: 30, hours: 14, requiredHours: 48, examStatus: 'failed', lastLearning: '2024-04-10' },
  { id: 6, name: '孙八', organization: '第二党支部', progress: 92, hours: 44, requiredHours: 48, examStatus: 'passed', lastLearning: '2024-04-20' },
  { id: 7, name: '周九', organization: '党委办公室', progress: 68, hours: 33, requiredHours: 48, examStatus: 'pending', lastLearning: '2024-04-17' }
]);

const getExamStatusName = (status) => {
  const names = {
    passed: '已通过',
    pending: '待考试',
    failed: '未通过'
  };
  return names[status] || status;
};

const viewDetail = (member) => {
  alert('查看学习详情：' + member.name);
};

const sendReminder = (member) => {
  alert('发送催学通知给：' + member.name);
};

const exportProgress = () => {
  alert('正在导出学习进度报表...');
};
</script>

<style scoped>
.learning-progress-management {
  padding: 0;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.page-header h2 {
  margin: 0;
  font-size: 20px;
  color: #1a202c;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.filter-select {
  padding: 10px 15px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  background: #fff;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
}

.btn-secondary {
  background: #e2e8f0;
  color: #2d3748;
}

.progress-overview {
  margin-bottom: 25px;
}

.overview-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 15px;
}

.overview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.overview-header h3 {
  margin: 0;
  font-size: 16px;
  color: #1a202c;
}

.overview-rate {
  font-size: 32px;
  font-weight: 700;
  color: #e74c3c;
}

.overview-bar {
  height: 12px;
  background: #e2e8f0;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 15px;
}

.overview-fill {
  height: 100%;
  background: linear-gradient(90deg, #e74c3c, #f39c12);
  border-radius: 6px;
}

.overview-stats {
  display: flex;
  gap: 30px;
}

.stat {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 20px;
  font-weight: 700;
  color: #1a202c;
}

.stat-label {
  font-size: 13px;
  color: #718096;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}

.stat-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.stat-card.warning {
  background: #fff5f5;
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #1a202c;
}

.stat-label {
  font-size: 13px;
  color: #718096;
}

.learning-table-container {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.learning-table {
  width: 100%;
  border-collapse: collapse;
}

.learning-table th,
.learning-table td {
  padding: 15px 12px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.learning-table th {
  background: #f8fafc;
  font-weight: 600;
  color: #4a5568;
  font-size: 13px;
}

.learning-table tr:hover {
  background: #f8fafc;
}

.learning-table tr.warning {
  background: #fff5f5;
}

.member-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.member-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #e74c3c;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.progress-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.progress-bar {
  width: 100px;
  height: 6px;
  background: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #27ae60;
  border-radius: 3px;
}

.progress-fill.low {
  background: #e74c3c;
}

.exam-status {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
}

.exam-status.passed {
  background: #c6f6d5;
  color: #276749;
}

.exam-status.pending {
  background: #fef3c7;
  color: #92400e;
}

.exam-status.failed {
  background: #fed7d7;
  color: #c53030;
}

.action-btn {
  background: none;
  border: 1px solid #e2e8f0;
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  margin-right: 5px;
}

.action-btn:hover {
  background: #f0f0f0;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
}

.pagination button {
  padding: 8px 15px;
  border: 1px solid #e2e8f0;
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 992px) {
  .stats-row {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .stats-row {
    grid-template-columns: 1fr;
  }
}
</style>
