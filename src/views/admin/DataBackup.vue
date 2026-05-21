<template>
  <div class="data-backup">
    <div class="page-header">
      <h2>数据备份与恢复</h2>
      <button class="btn btn-primary" @click="createBackup">
        <span>💾</span> 创建备份
      </button>
    </div>

    <div class="backup-overview">
      <div class="backup-status">
        <div class="status-icon success">✅</div>
        <div class="status-info">
          <div class="status-title">最近备份</div>
          <div class="status-time">2024-04-20 02:00:00</div>
          <div class="status-size">备份大小: 1.2 GB</div>
        </div>
      </div>
      <div class="backup-stats">
        <div class="stat">
          <span class="stat-value">{{ backupCount }}</span>
          <span class="stat-label">备份总数</span>
        </div>
        <div class="stat">
          <span class="stat-value">{{ autoBackupCount }}</span>
          <span class="stat-label">自动备份</span>
        </div>
        <div class="stat">
          <span class="stat-value">{{ lastBackupSize }}</span>
          <span class="stat-label">上次备份大小</span>
        </div>
      </div>
    </div>

    <div class="auto-backup-settings">
      <h3>自动备份设置</h3>
      <div class="settings-row">
        <div class="setting-item">
          <label>自动备份</label>
          <select v-model="autoBackupEnabled">
            <option value="true">启用</option>
            <option value="false">禁用</option>
          </select>
        </div>
        <div class="setting-item">
          <label>备份频率</label>
          <select v-model="backupFrequency">
            <option value="daily">每天</option>
            <option value="weekly">每周</option>
            <option value="monthly">每月</option>
          </select>
        </div>
        <div class="setting-item">
          <label>保留份数</label>
          <select v-model="keepBackups">
            <option value="7">保留7份</option>
            <option value="14">保留14份</option>
            <option value="30">保留30份</option>
          </select>
        </div>
      </div>
      <button class="btn btn-secondary" @click="saveSettings">保存设置</button>
    </div>

    <div class="backup-list">
      <h3>备份历史</h3>
      <table class="backup-table">
        <thead>
          <tr>
            <th>备份时间</th>
            <th>备份类型</th>
            <th>文件大小</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="backup in backupHistory" :key="backup.id">
            <td>{{ backup.time }}</td>
            <td>{{ backup.type }}</td>
            <td>{{ backup.size }}</td>
            <td><span :class="['status-badge', backup.status]">{{ getStatusName(backup.status) }}</span></td>
            <td>
              <button class="action-btn" @click="restoreBackup(backup)">恢复</button>
              <button class="action-btn" @click="downloadBackup(backup)">下载</button>
              <button class="action-btn delete" @click="deleteBackup(backup)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const autoBackupEnabled = ref('true');
const backupFrequency = ref('daily');
const keepBackups = ref('7');
const backupCount = ref(45);
const autoBackupCount = ref(30);
const lastBackupSize = ref('1.2 GB');

const backupHistory = ref([
  { id: 1, time: '2024-04-20 02:00:00', type: '自动备份', size: '1.2 GB', status: 'success' },
  { id: 2, time: '2024-04-19 02:00:00', type: '自动备份', size: '1.1 GB', status: 'success' },
  { id: 3, time: '2024-04-18 14:30:00', type: '手动备份', size: '1.0 GB', status: 'success' },
  { id: 4, time: '2024-04-17 02:00:00', type: '自动备份', size: '1.1 GB', status: 'success' },
  { id: 5, time: '2024-04-15 10:00:00', type: '手动备份', size: '0.9 GB', status: 'success' }
]);

const getStatusName = (status) => {
  const names = { success: '成功', failed: '失败', running: '进行中' };
  return names[status] || status;
};

const createBackup = () => {
  alert('正在创建备份，请稍候...');
};

const restoreBackup = (backup) => {
  if (confirm('确定要恢复此备份吗？当前数据将被覆盖。')) {
    alert('正在恢复备份...');
  }
};

const downloadBackup = (backup) => {
  alert('正在下载备份文件...');
};

const deleteBackup = (backup) => {
  if (confirm('确定要删除此备份吗？')) {
    backupHistory.value = backupHistory.value.filter(b => b.id !== backup.id);
  }
};

const saveSettings = () => {
  alert('设置已保存！');
};
</script>

<style scoped>
.data-backup {
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

.backup-overview {
  background: #fff;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.backup-status {
  display: flex;
  align-items: center;
  gap: 20px;
}

.status-icon {
  font-size: 48px;
}

.status-title {
  font-size: 16px;
  font-weight: 600;
  color: #1a202c;
}

.status-time, .status-size {
  font-size: 14px;
  color: #718096;
}

.backup-stats {
  display: flex;
  gap: 40px;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #1a202c;
}

.stat-label {
  font-size: 13px;
  color: #718096;
}

.auto-backup-settings, .backup-list {
  background: #fff;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;
}

.auto-backup-settings h3, .backup-list h3 {
  margin: 0 0 20px 0;
  font-size: 16px;
  color: #1a202c;
}

.settings-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.setting-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.setting-item label {
  font-size: 14px;
  color: #4a5568;
}

.setting-item select {
  padding: 10px 15px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
}

.backup-table {
  width: 100%;
  border-collapse: collapse;
}

.backup-table th, .backup-table td {
  padding: 15px 12px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.backup-table th {
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

.status-badge.success {
  background: #c6f6d5;
  color: #276749;
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

.action-btn.delete:hover {
  background: #ffe0e0;
}

@media (max-width: 768px) {
  .backup-overview {
    flex-direction: column;
    gap: 20px;
  }

  .settings-row {
    flex-direction: column;
  }
}
</style>
