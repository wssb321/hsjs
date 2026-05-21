<template>
  <div class="activity-management">
    <div class="page-header">
      <div class="header-left">
        <div class="search-box">
          <input type="text" v-model="searchQuery" placeholder="搜索活动名称..." />
          <span class="search-icon">🔍</span>
        </div>
        <select v-model="statusFilter" class="filter-select">
          <option value="">全部状态</option>
          <option value="pending">待审核</option>
          <option value="approved">已通过</option>
          <option value="rejected">已拒绝</option>
          <option value="ongoing">进行中</option>
          <option value="finished">已结束</option>
        </select>
      </div>
      <div class="header-actions">
        <button class="btn btn-primary" @click="showAddModal = true">
          <span>➕</span> 发布活动
        </button>
      </div>
    </div>

    <div class="activity-stats">
      <div class="stat-card">
        <div class="stat-icon orange">📅</div>
        <div class="stat-content">
          <div class="stat-value">{{ stats.total }}</div>
          <div class="stat-label">活动总数</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon blue">⏳</div>
        <div class="stat-content">
          <div class="stat-value">{{ stats.pending }}</div>
          <div class="stat-label">待审核</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green">🔓</div>
        <div class="stat-content">
          <div class="stat-value">{{ stats.ongoing }}</div>
          <div class="stat-label">进行中</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon gray">✅</div>
        <div class="stat-content">
          <div class="stat-value">{{ stats.finished }}</div>
          <div class="stat-label">已结束</div>
        </div>
      </div>
    </div>

    <div class="activity-grid">
      <div v-for="activity in filteredActivities" :key="activity.id" class="activity-card">
        <div class="activity-image" :style="{ background: activity.gradient }">
          <span class="activity-badge" :class="activity.status">{{ getStatusName(activity.status) }}</span>
        </div>
        <div class="activity-content">
          <h3 class="activity-title">{{ activity.title }}</h3>
          <div class="activity-info">
            <div class="info-item">
              <span class="info-icon">📍</span>
              <span>{{ activity.location }}</span>
            </div>
            <div class="info-item">
              <span class="info-icon">📅</span>
              <span>{{ activity.date }}</span>
            </div>
            <div class="info-item">
              <span class="info-icon">👥</span>
              <span>{{ activity.registered }}/{{ activity.capacity }}人</span>
            </div>
          </div>
          <div class="activity-progress">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: (activity.registered / activity.capacity * 100) + '%' }"></div>
            </div>
            <span class="progress-text">{{ Math.round(activity.registered / activity.capacity * 100) }}%</span>
          </div>
          <div class="activity-actions">
            <button class="action-btn" @click="viewActivity(activity)" title="查看">👁️</button>
            <button class="action-btn" @click="editActivity(activity)" title="编辑">✏️</button>
            <button class="action-btn" @click="manageRegistration(activity)" title="报名管理">📋</button>
            <button class="action-btn" @click="checkinActivity(activity)" title="签到">✅</button>
            <button class="action-btn delete" @click="deleteActivity(activity)" title="删除">🗑️</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal" v-if="showAddModal">
      <div class="modal-content large">
        <div class="modal-header">
          <h3>{{ editingActivity ? '编辑活动' : '发布活动' }}</h3>
          <button class="close-btn" @click="closeModal">×</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>活动标题 <span class="required">*</span></label>
            <input type="text" v-model="activityForm.title" placeholder="请输入活动标题" />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>活动类型</label>
              <select v-model="activityForm.type">
                <option value="study">理论学习</option>
                <option value="practice">实践活动</option>
                <option value="meeting">会议培训</option>
                <option value="volunteer">志愿服务</option>
              </select>
            </div>
            <div class="form-group">
              <label>活动地点</label>
              <input type="text" v-model="activityForm.location" placeholder="请输入活动地点" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>开始时间</label>
              <input type="datetime-local" v-model="activityForm.startTime" />
            </div>
            <div class="form-group">
              <label>结束时间</label>
              <input type="datetime-local" v-model="activityForm.endTime" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>报名人数上限</label>
              <input type="number" v-model="activityForm.capacity" placeholder="请输入人数上限" />
            </div>
            <div class="form-group">
              <label>学分</label>
              <input type="number" v-model="activityForm.credit" placeholder="请输入学分" />
            </div>
          </div>
          <div class="form-group">
            <label>活动描述</label>
            <textarea v-model="activityForm.description" rows="4" placeholder="请输入活动描述"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeModal">取消</button>
          <button class="btn btn-primary" @click="saveActivity">保存</button>
        </div>
      </div>
    </div>

    <div class="modal" v-if="showRegistrationModal">
      <div class="modal-content large">
        <div class="modal-header">
          <h3>报名管理 - {{ selectedActivity?.title }}</h3>
          <button class="close-btn" @click="showRegistrationModal = false">×</button>
        </div>
        <div class="modal-body">
          <div class="registration-stats">
            <div class="reg-stat">
              <span class="reg-label">报名人数</span>
              <span class="reg-value">{{ registrations.length }}</span>
            </div>
            <div class="reg-stat">
              <span class="reg-label">签到人数</span>
              <span class="reg-value">{{ checkedInCount }}</span>
            </div>
            <div class="reg-stat">
              <span class="reg-label">签到率</span>
              <span class="reg-value">{{ registrations.length > 0 ? Math.round(checkedInCount / registrations.length * 100) : 0 }}%</span>
            </div>
          </div>
          <div class="registration-actions">
            <button class="btn btn-secondary" @click="exportRegistrations">📥 导出名单</button>
            <button class="btn btn-secondary" @click="addRegistration">➕ 手动添加</button>
          </div>
          <table class="registration-table">
            <thead>
              <tr>
                <th>姓名</th>
                <th>手机号</th>
                <th>所属组织</th>
                <th>报名时间</th>
                <th>签到状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="reg in registrations" :key="reg.id">
                <td>{{ reg.name }}</td>
                <td>{{ reg.phone }}</td>
                <td>{{ reg.organization }}</td>
                <td>{{ reg.registerTime }}</td>
                <td>
                  <span :class="['status-badge', reg.checkedIn ? 'checked-in' : 'not-checked']">
                    {{ reg.checkedIn ? '已签到' : '未签到' }}
                  </span>
                </td>
                <td>
                  <button v-if="!reg.checkedIn" class="action-btn" @click="manualCheckin(reg)">补签</button>
                  <button class="action-btn delete" @click="removeRegistration(reg)">移除</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const searchQuery = ref('');
const statusFilter = ref('');
const showAddModal = ref(false);
const showRegistrationModal = ref(false);
const editingActivity = ref(null);
const selectedActivity = ref(null);

const activityForm = ref({
  title: '',
  type: 'study',
  location: '',
  startTime: '',
  endTime: '',
  capacity: 50,
  credit: 2,
  description: ''
});

const stats = ref({
  total: 28,
  pending: 3,
  ongoing: 12,
  finished: 13
});

const activities = ref([
  { id: 1, title: '党史学习教育专题讲座', type: 'study', location: '党委会议室', date: '2024-04-20 14:00', startTime: '2024-04-20 14:00', endTime: '2024-04-20 16:00', capacity: 100, registered: 85, credit: 3, status: 'ongoing', gradient: 'linear-gradient(135deg, #e74c3c, #c0392b)' },
  { id: 2, title: '乡村振兴志愿服务活动', type: 'volunteer', location: 'XX村', date: '2024-04-21 09:00', startTime: '2024-04-21 09:00', endTime: '2024-04-21 17:00', capacity: 30, registered: 30, credit: 5, status: 'approved', gradient: 'linear-gradient(135deg, #27ae60, #229954)' },
  { id: 3, title: '党章党规知识竞赛', type: 'study', location: '多功能厅', date: '2024-04-22 19:00', startTime: '2024-04-22 19:00', endTime: '2024-04-22 21:00', capacity: 200, registered: 156, credit: 2, status: 'pending', gradient: 'linear-gradient(135deg, #3498db, #2980b9)' },
  { id: 4, title: '支部书记培训会议', type: 'meeting', location: '党校报告厅', date: '2024-04-25 08:30', startTime: '2024-04-25 08:30', endTime: '2024-04-25 17:00', capacity: 50, registered: 42, credit: 4, status: 'approved', gradient: 'linear-gradient(135deg, #f39c12, #e67e22)' },
  { id: 5, title: '革命传统教育实践活动', type: 'practice', location: '革命纪念馆', date: '2024-04-18 08:00', startTime: '2024-04-18 08:00', endTime: '2024-04-18 12:00', capacity: 80, registered: 80, credit: 3, status: 'finished', gradient: 'linear-gradient(135deg, #9b59b6, #8e44ad)' }
]);

const registrations = ref([
  { id: 1, name: '张三', phone: '13800138000', organization: '第一党支部', registerTime: '2024-04-15 10:30', checkedIn: true },
  { id: 2, name: '李四', phone: '13800138001', organization: '第二党支部', registerTime: '2024-04-15 11:20', checkedIn: true },
  { id: 3, name: '王五', phone: '13800138002', organization: '第三党支部', registerTime: '2024-04-16 09:15', checkedIn: false },
  { id: 4, name: '赵六', phone: '13800138003', organization: '第一党支部', registerTime: '2024-04-16 14:00', checkedIn: false }
]);

const checkedInCount = computed(() => {
  return registrations.value.filter(r => r.checkedIn).length;
});

const filteredActivities = computed(() => {
  let result = activities.value;
  if (searchQuery.value) {
    result = result.filter(a => a.title.includes(searchQuery.value));
  }
  if (statusFilter.value) {
    result = result.filter(a => a.status === statusFilter.value);
  }
  return result;
});

const getStatusName = (status) => {
  const names = {
    pending: '待审核',
    approved: '已通过',
    rejected: '已拒绝',
    ongoing: '进行中',
    finished: '已结束'
  };
  return names[status] || status;
};

const viewActivity = (activity) => {
  alert('查看活动详情：' + activity.title);
};

const editActivity = (activity) => {
  editingActivity.value = activity;
  activityForm.value = { ...activity };
  showAddModal.value = true;
};

const manageRegistration = (activity) => {
  selectedActivity.value = activity;
  showRegistrationModal.value = true;
};

const checkinActivity = (activity) => {
  alert('打开签到管理：' + activity.title);
};

const deleteActivity = (activity) => {
  if (confirm('确定要删除活动"' + activity.title + '"吗？')) {
    activities.value = activities.value.filter(a => a.id !== activity.id);
  }
};

const closeModal = () => {
  showAddModal.value = false;
  editingActivity.value = null;
  activityForm.value = {
    title: '',
    type: 'study',
    location: '',
    startTime: '',
    endTime: '',
    capacity: 50,
    credit: 2,
    description: ''
  };
};

const saveActivity = () => {
  if (!activityForm.value.title) {
    alert('请输入活动标题');
    return;
  }
  if (editingActivity.value) {
    const index = activities.value.findIndex(a => a.id === editingActivity.value.id);
    if (index !== -1) {
      activities.value[index] = { ...activityForm.value, id: editingActivity.value.id };
    }
  } else {
    activities.value.push({
      ...activityForm.value,
      id: Date.now(),
      registered: 0,
      status: 'pending',
      gradient: 'linear-gradient(135deg, #3498db, #2980b9)'
    });
  }
  closeModal();
};

const exportRegistrations = () => {
  alert('正在导出报名名单...');
};

const addRegistration = () => {
  alert('打开手动添加报名窗口...');
};

const manualCheckin = (reg) => {
  reg.checkedIn = true;
};

const removeRegistration = (reg) => {
  if (confirm('确定要移除报名记录吗？')) {
    registrations.value = registrations.value.filter(r => r.id !== reg.id);
  }
};
</script>

<style scoped>
.activity-management {
  padding: 0;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
}

.header-left {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.search-box {
  position: relative;
}

.search-box input {
  padding: 10px 15px;
  padding-left: 40px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  width: 250px;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
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
  transition: all 0.3s;
}

.btn-primary {
  background: #e74c3c;
  color: #fff;
}

.btn-secondary {
  background: #e2e8f0;
  color: #2d3748;
}

.activity-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
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

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.stat-icon.orange { background: #fffaf0; }
.stat-icon.blue { background: #ebf8ff; }
.stat-icon.green { background: #f0fff4; }
.stat-icon.gray { background: #f0f0f0; }

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #1a202c;
}

.stat-label {
  font-size: 14px;
  color: #718096;
}

.activity-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

.activity-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;
}

.activity-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
}

.activity-image {
  height: 120px;
  position: relative;
}

.activity-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
}

.activity-badge.pending { background: #f39c12; }
.activity-badge.approved { background: #27ae60; }
.activity-badge.ongoing { background: #3498db; }
.activity-badge.finished { background: #95a5a6; }

.activity-content {
  padding: 15px;
}

.activity-title {
  margin: 0 0 12px 0;
  font-size: 16px;
  color: #1a202c;
}

.activity-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #718096;
}

.activity-progress {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.progress-bar {
  flex: 1;
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

.progress-text {
  font-size: 13px;
  color: #718096;
  min-width: 40px;
}

.activity-actions {
  display: flex;
  gap: 5px;
  padding-top: 12px;
  border-top: 1px solid #e2e8f0;
}

.action-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 4px 8px;
  border-radius: 4px;
}

.action-btn:hover {
  background: #f0f0f0;
}

.action-btn.delete:hover {
  background: #ffe0e0;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-content.large {
  max-width: 700px;
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 18px;
  color: #1a202c;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #a0aec0;
}

.modal-body {
  padding: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  color: #4a5568;
}

.required {
  color: #e74c3c;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px 12px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #e74c3c;
}

.modal-footer {
  padding: 20px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.registration-stats {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  padding: 15px;
  background: #f8fafc;
  border-radius: 8px;
}

.reg-stat {
  display: flex;
  flex-direction: column;
}

.reg-label {
  font-size: 13px;
  color: #718096;
}

.reg-value {
  font-size: 24px;
  font-weight: 700;
  color: #1a202c;
}

.registration-actions {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.registration-table {
  width: 100%;
  border-collapse: collapse;
}

.registration-table th,
.registration-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.registration-table th {
  background: #f8fafc;
  font-weight: 600;
  color: #4a5568;
  font-size: 13px;
}

.status-badge {
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
}

.status-badge.checked-in {
  background: #c6f6d5;
  color: #276749;
}

.status-badge.not-checked {
  background: #fed7d7;
  color: #c53030;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .activity-grid {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
