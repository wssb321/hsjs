<template>
  <div class="warning-system">
    <div class="page-header">
      <h2>挂科预警系统</h2>
      <div class="header-actions">
        <button class="btn btn-secondary" @click="exportWarnings">
          <span>📥</span> 导出预警名单
        </button>
      </div>
    </div>

    <div class="warning-stats">
      <div class="stat-card critical">
        <div class="stat-icon">🚨</div>
        <div class="stat-content">
          <div class="stat-value">{{ criticalCount }}</div>
          <div class="stat-label">严重滞后</div>
        </div>
      </div>
      <div class="stat-card warning">
        <div class="stat-icon">⚠️</div>
        <div class="stat-content">
          <div class="stat-value">{{ warningCount }}</div>
          <div class="stat-label">一般滞后</div>
        </div>
      </div>
      <div class="stat-card notice">
        <div class="stat-icon">📢</div>
        <div class="stat-content">
          <div class="stat-value">{{ noticeCount }}</div>
          <div class="stat-label">提醒关注</div>
        </div>
      </div>
    </div>

    <div class="warning-filters">
      <select v-model="warningLevel" class="filter-select">
        <option value="">全部预警级别</option>
        <option value="critical">严重滞后</option>
        <option value="warning">一般滞后</option>
        <option value="notice">提醒关注</option>
      </select>
      <select v-model="warningType" class="filter-select">
        <option value="">全部预警类型</option>
        <option value="progress">学习进度滞后</option>
        <option value="exam">考试未通过</option>
        <option value="incomplete">作业未完成</option>
      </select>
    </div>

    <div class="warning-list">
      <div v-for="warning in filteredWarnings" :key="warning.id" class="warning-card" :class="warning.level">
        <div class="warning-header">
          <div class="warning-level-badge">{{ getLevelName(warning.level) }}</div>
          <span class="warning-time">{{ warning.time }}</span>
        </div>
        <div class="warning-content">
          <div class="member-info">
            <div class="member-avatar">{{ warning.name.charAt(0) }}</div>
            <div class="member-details">
              <div class="member-name">{{ warning.name }}</div>
              <div class="member-org">{{ warning.organization }}</div>
            </div>
          </div>
          <div class="warning-reason">
            <div class="reason-title">{{ warning.reason }}</div>
            <div class="reason-detail">{{ warning.detail }}</div>
          </div>
          <div class="warning-data">
            <div class="data-item">
              <span class="data-label">当前进度</span>
              <span class="data-value">{{ warning.currentProgress }}%</span>
            </div>
            <div class="data-item">
              <span class="data-label">要求进度</span>
              <span class="data-value">{{ warning.requiredProgress }}%</span>
            </div>
            <div class="data-item">
              <span class="data-label">落后</span>
              <span class="data-value danger">{{ warning.requiredProgress - warning.currentProgress }}%</span>
            </div>
          </div>
        </div>
        <div class="warning-actions">
          <button class="btn btn-primary" @click="sendNotification(warning)">
            <span>📩</span> 发送通知
          </button>
          <button class="btn btn-secondary" @click="viewRecord(warning)">
            <span>📋</span> 查看学习记录
          </button>
          <button class="btn btn-secondary" @click="addToList(warning)">
            <span>➕</span> 加入学习帮扶
          </button>
        </div>
      </div>
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

const warningLevel = ref('');
const warningType = ref('');
const currentPage = ref(1);
const totalPages = 3;

const criticalCount = ref(5);
const warningCount = ref(12);
const noticeCount = ref(23);

const warnings = ref([
  {
    id: 1,
    name: '赵六',
    organization: '第三党支部',
    level: 'critical',
    type: 'progress',
    reason: '学习进度严重滞后',
    detail: '连续两周未进行学习，当前进度仅完成年度要求的30%',
    currentProgress: 30,
    requiredProgress: 60,
    time: '2024-04-20 10:30'
  },
  {
    id: 2,
    name: '钱七',
    organization: '第一党支部',
    level: 'critical',
    type: 'exam',
    reason: '考试多次未通过',
    detail: '党章党规测试连续3次未通过，需要加强学习',
    currentProgress: 25,
    requiredProgress: 50,
    time: '2024-04-19 15:20'
  },
  {
    id: 3,
    name: '孙八',
    organization: '第二党支部',
    level: 'warning',
    type: 'progress',
    reason: '学习进度滞后',
    detail: '本周学习时长不足要求的50%',
    currentProgress: 45,
    requiredProgress: 70,
    time: '2024-04-20 09:15'
  },
  {
    id: 4,
    name: '周九',
    organization: '第一党支部',
    level: 'warning',
    type: 'incomplete',
    reason: '作业未完成',
    detail: '党史学习心得体会未在规定时间内提交',
    currentProgress: 55,
    requiredProgress: 80,
    time: '2024-04-18 14:00'
  },
  {
    id: 5,
    name: '吴十',
    organization: '党委办公室',
    level: 'notice',
    type: 'progress',
    reason: '学习效率偏低',
    detail: '学习进度略低于计划进度，需适当加快',
    currentProgress: 65,
    requiredProgress: 75,
    time: '2024-04-17 11:30'
  }
]);

const filteredWarnings = computed(() => {
  let result = warnings.value;
  if (warningLevel.value) {
    result = result.filter(w => w.level === warningLevel.value);
  }
  if (warningType.value) {
    result = result.filter(w => w.type === warningType.value);
  }
  return result;
});

const getLevelName = (level) => {
  const names = {
    critical: '严重滞后',
    warning: '一般滞后',
    notice: '提醒关注'
  };
  return names[level] || level;
};

const sendNotification = (warning) => {
  alert('发送催学通知给：' + warning.name);
};

const viewRecord = (warning) => {
  alert('查看学习记录：' + warning.name);
};

const addToList = (warning) => {
  alert('加入学习帮扶名单：' + warning.name);
};

const exportWarnings = () => {
  alert('正在导出预警名单...');
};
</script>

<style scoped>
.warning-system {
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

.btn-primary {
  background: #e74c3c;
  color: #fff;
}

.btn-secondary {
  background: #e2e8f0;
  color: #2d3748;
}

.warning-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 25px;
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

.stat-card.critical {
  background: #fff5f5;
  border: 2px solid #e74c3c;
}

.stat-card.warning {
  background: #fffaf0;
  border: 2px solid #f39c12;
}

.stat-card.notice {
  background: #f0f9ff;
  border: 2px solid #3498db;
}

.stat-icon {
  font-size: 32px;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  color: #1a202c;
}

.stat-label {
  font-size: 14px;
  color: #718096;
}

.warning-filters {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.filter-select {
  padding: 10px 15px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  background: #fff;
}

.warning-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.warning-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border-left: 4px solid #e74c3c;
}

.warning-card.critical {
  border-left-color: #e74c3c;
  background: #fffafafa;
}

.warning-card.warning {
  border-left-color: #f39c12;
}

.warning-card.notice {
  border-left-color: #3498db;
}

.warning-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.warning-level-badge {
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;
  color: #fff;
}

.warning-card.critical .warning-level-badge {
  background: #e74c3c;
}

.warning-card.warning .warning-level-badge {
  background: #f39c12;
}

.warning-card.notice .warning-level-badge {
  background: #3498db;
}

.warning-time {
  font-size: 13px;
  color: #718096;
}

.warning-content {
  margin-bottom: 15px;
}

.member-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.member-avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: #e74c3c;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
}

.member-name {
  font-weight: 600;
  color: #1a202c;
  font-size: 16px;
}

.member-org {
  font-size: 13px;
  color: #718096;
}

.warning-reason {
  margin-bottom: 15px;
}

.reason-title {
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 5px;
}

.reason-detail {
  font-size: 14px;
  color: #718096;
}

.warning-data {
  display: flex;
  gap: 30px;
  padding: 15px;
  background: #f8fafc;
  border-radius: 8px;
}

.data-item {
  display: flex;
  flex-direction: column;
}

.data-label {
  font-size: 12px;
  color: #718096;
  margin-bottom: 4px;
}

.data-value {
  font-size: 20px;
  font-weight: 700;
  color: #1a202c;
}

.data-value.danger {
  color: #e74c3c;
}

.warning-actions {
  display: flex;
  gap: 10px;
  padding-top: 15px;
  border-top: 1px solid #e2e8f0;
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

@media (max-width: 768px) {
  .warning-stats {
    grid-template-columns: 1fr;
  }

  .warning-filters {
    flex-direction: column;
  }

  .warning-actions {
    flex-direction: column;
  }
}
</style>
