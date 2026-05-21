<template>
  <div class="user-management">
    <div class="page-header">
      <div class="header-left">
        <div class="search-box">
          <input type="text" v-model="searchQuery" placeholder="搜索党员姓名、手机号、身份证号..." @input="handleSearch" />
          <span class="search-icon">🔍</span>
        </div>
        <select v-model="statusFilter" class="filter-select">
          <option value="">全部状态</option>
          <option value="active">启用</option>
          <option value="disabled">禁用</option>
        </select>
        <select v-model="roleFilter" class="filter-select">
          <option value="">全部角色</option>
          <option value="super_admin">超级管理员</option>
          <option value="party_committee_admin">党委管理员</option>
          <option value="branch_secretary">支部书记</option>
          <option value="party_member">普通党员</option>
        </select>
      </div>
      <div class="header-actions">
        <button class="btn btn-secondary" @click="showImportModal = true">
          <span>📥</span> 批量导入
        </button>
        <button class="btn btn-secondary" @click="exportUsers">
          <span>📤</span> 导出数据
        </button>
        <button class="btn btn-primary" @click="showAddModal = true">
          <span>➕</span> 添加党员
        </button>
      </div>
    </div>

    <div class="user-stats">
      <div class="stat-card">
        <div class="stat-icon blue">👥</div>
        <div class="stat-content">
          <div class="stat-value">{{ userStats.total }}</div>
          <div class="stat-label">党员总数</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green">✅</div>
        <div class="stat-content">
          <div class="stat-value">{{ userStats.active }}</div>
          <div class="stat-label">启用状态</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon orange">⏸️</div>
        <div class="stat-content">
          <div class="stat-value">{{ userStats.disabled }}</div>
          <div class="stat-label">禁用状态</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon red">⚠️</div>
        <div class="stat-content">
          <div class="stat-value">{{ userStats.warning }}</div>
          <div class="stat-label">学习滞后</div>
        </div>
      </div>
    </div>

    <div class="user-table-container">
      <table class="user-table">
        <thead>
          <tr>
            <th><input type="checkbox" @change="toggleSelectAll" :checked="isSelectAll" /></th>
            <th>姓名</th>
            <th>性别</th>
            <th>手机号</th>
            <th>身份证号</th>
            <th>所属组织</th>
            <th>角色</th>
            <th>状态</th>
            <th>学习进度</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id" :class="{ warning: user.learningProgress < 60 }">
            <td><input type="checkbox" :value="user.id" v-model="selectedUsers" /></td>
            <td>
              <div class="user-info">
                <div class="user-avatar">{{ user.name.charAt(0) }}</div>
                <span class="user-name">{{ user.name }}</span>
              </div>
            </td>
            <td>{{ user.gender }}</td>
            <td>{{ maskPhone(user.phone) }}</td>
            <td>{{ maskIdCard(user.idCard) }}</td>
            <td>{{ user.organization }}</td>
            <td>
              <span class="role-tag" :class="user.role">{{ getRoleName(user.role) }}</span>
            </td>
            <td>
              <span class="status-tag" :class="user.status">
                {{ user.status === 'active' ? '启用' : '禁用' }}
              </span>
            </td>
            <td>
              <div class="progress-cell">
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: user.learningProgress + '%' }" :class="{ low: user.learningProgress < 60 }"></div>
                </div>
                <span class="progress-text">{{ user.learningProgress }}%</span>
              </div>
            </td>
            <td>
              <div class="action-buttons">
                <button class="action-btn" @click="editUser(user)" title="编辑">✏️</button>
                <button class="action-btn" @click="toggleUserStatus(user)" :title="user.status === 'active' ? '禁用' : '启用'">
                  {{ user.status === 'active' ? '⏸️' : '▶️' }}
                </button>
                <button class="action-btn" @click="resetPassword(user)" title="重置密码">🔑</button>
                <button class="action-btn delete" @click="deleteUser(user)" title="删除">🗑️</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination-container">
      <div class="pagination-info">
        共 {{ totalUsers }} 条记录，当前第 {{ currentPage }} / {{ totalPages }} 页
      </div>
      <div class="pagination">
        <button @click="currentPage--" :disabled="currentPage === 1">上一页</button>
        <button v-for="page in visiblePages" :key="page" :class="{ active: page === currentPage }" @click="currentPage = page">
          {{ page }}
        </button>
        <button @click="currentPage++" :disabled="currentPage === totalPages">下一页</button>
      </div>
    </div>

    <div class="batch-actions" v-if="selectedUsers.length > 0">
      <span>已选择 {{ selectedUsers.length }} 项</span>
      <button class="btn btn-sm" @click="batchEnable">批量启用</button>
      <button class="btn btn-sm" @click="batchDisable">批量禁用</button>
      <button class="btn btn-sm" @click="batchResetPassword">批量重置密码</button>
    </div>

    <div class="modal" v-if="showAddModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ editingUser ? '编辑党员' : '添加党员' }}</h3>
          <button class="close-btn" @click="closeModal">×</button>
        </div>
        <div class="modal-body">
          <div class="form-row">
            <div class="form-group">
              <label>姓名 <span class="required">*</span></label>
              <input type="text" v-model="userForm.name" placeholder="请输入姓名" />
            </div>
            <div class="form-group">
              <label>性别</label>
              <select v-model="userForm.gender">
                <option value="男">男</option>
                <option value="女">女</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>手机号 <span class="required">*</span></label>
              <input type="text" v-model="userForm.phone" placeholder="请输入手机号" />
            </div>
            <div class="form-group">
              <label>身份证号 <span class="required">*</span></label>
              <input type="text" v-model="userForm.idCard" placeholder="请输入身份证号" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>所属组织 <span class="required">*</span></label>
              <select v-model="userForm.organizationId">
                <option value="">请选择组织</option>
                <option v-for="org in organizations" :key="org.id" :value="org.id">{{ org.name }}</option>
              </select>
            </div>
            <div class="form-group">
              <label>角色 <span class="required">*</span></label>
              <select v-model="userForm.role">
                <option value="">请选择角色</option>
                <option value="super_admin">超级管理员</option>
                <option value="party_committee_admin">党委管理员</option>
                <option value="branch_secretary">支部书记</option>
                <option value="party_member">普通党员</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label>入党时间</label>
            <input type="date" v-model="userForm.joinDate" />
          </div>
          <div class="form-group">
            <label>备注</label>
            <textarea v-model="userForm.note" rows="3" placeholder="请输入备注信息"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeModal">取消</button>
          <button class="btn btn-primary" @click="saveUser">保存</button>
        </div>
      </div>
    </div>

    <div class="modal" v-if="showImportModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>批量导入党员</h3>
          <button class="close-btn" @click="showImportModal = false">×</button>
        </div>
        <div class="modal-body">
          <div class="import-area" @dragover.prevent @drop="handleFileDrop">
            <div class="import-icon">📁</div>
            <p>拖拽Excel文件到此处，或 <a href="#">点击上传</a></p>
            <p class="import-tip">支持 .xlsx, .xls 格式，文件大小不超过10MB</p>
          </div>
          <div class="import-template">
            <a href="#" @click.prevent="downloadTemplate">下载导入模板</a>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="showImportModal = false">取消</button>
          <button class="btn btn-primary" @click="startImport">开始导入</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const searchQuery = ref('');
const statusFilter = ref('');
const roleFilter = ref('');
const currentPage = ref(1);
const pageSize = 10;
const selectedUsers = ref([]);
const showAddModal = ref(false);
const showImportModal = ref(false);
const editingUser = ref(null);

const userForm = ref({
  name: '',
  gender: '男',
  phone: '',
  idCard: '',
  organizationId: '',
  role: 'party_member',
  joinDate: '',
  note: ''
});

const userStats = ref({
  total: 156,
  active: 148,
  disabled: 8,
  warning: 12
});

const users = ref([
  { id: 1, name: '张三', gender: '男', phone: '13800138000', idCard: '110101199001011234', organization: '党委办公室', organizationId: 1, role: 'super_admin', status: 'active', learningProgress: 95 },
  { id: 2, name: '李四', gender: '女', phone: '13800138001', idCard: '110101199002021234', organization: '第一党支部', organizationId: 2, role: 'party_committee_admin', status: 'active', learningProgress: 88 },
  { id: 3, name: '王五', gender: '男', phone: '13800138002', idCard: '110101199003031234', organization: '第二党支部', organizationId: 3, role: 'branch_secretary', status: 'active', learningProgress: 75 },
  { id: 4, name: '赵六', gender: '女', phone: '13800138003', idCard: '110101199004041234', organization: '第三党支部', organizationId: 4, role: 'party_member', status: 'active', learningProgress: 45 },
  { id: 5, name: '钱七', gender: '男', phone: '13800138004', idCard: '110101199005051234', organization: '第一党小组', organizationId: 5, role: 'party_member', status: 'disabled', learningProgress: 20 },
  { id: 6, name: '孙八', gender: '女', phone: '13800138005', idCard: '110101199006061234', organization: '第二党小组', organizationId: 6, role: 'party_member', status: 'active', learningProgress: 92 }
]);

const organizations = ref([
  { id: 1, name: '党委办公室' },
  { id: 2, name: '第一党支部' },
  { id: 3, name: '第二党支部' },
  { id: 4, name: '第三党支部' },
  { id: 5, name: '第一党小组' },
  { id: 6, name: '第二党小组' }
]);

const filteredUsers = computed(() => {
  let result = users.value;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(user =>
      user.name.toLowerCase().includes(query) ||
      user.phone.includes(query) ||
      user.idCard.includes(query)
    );
  }

  if (statusFilter.value) {
    result = result.filter(user => user.status === statusFilter.value);
  }

  if (roleFilter.value) {
    result = result.filter(user => user.role === roleFilter.value);
  }

  return result;
});

const totalUsers = computed(() => filteredUsers.value.length);
const totalPages = computed(() => Math.ceil(totalUsers.value / pageSize));

const visiblePages = computed(() => {
  const pages = [];
  const start = Math.max(1, currentPage.value - 2);
  const end = Math.min(totalPages.value, currentPage.value + 2);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

const isSelectAll = computed(() => {
  return filteredUsers.value.length > 0 && selectedUsers.value.length === filteredUsers.value.length;
});

const maskPhone = (phone) => {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
};

const maskIdCard = (idCard) => {
  return idCard.replace(/(\d{6})\d{8}(\d{4})/, '$1********$2');
};

const getRoleName = (role) => {
  const roleNames = {
    'super_admin': '超级管理员',
    'party_committee_admin': '党委管理员',
    'branch_secretary': '支部书记',
    'party_member': '普通党员'
  };
  return roleNames[role] || role;
};

const handleSearch = () => {
  currentPage.value = 1;
};

const toggleSelectAll = (event) => {
  if (event.target.checked) {
    selectedUsers.value = filteredUsers.value.map(user => user.id);
  } else {
    selectedUsers.value = [];
  }
};

const editUser = (user) => {
  editingUser.value = user;
  userForm.value = { ...user };
  showAddModal.value = true;
};

const closeModal = () => {
  showAddModal.value = false;
  editingUser.value = null;
  userForm.value = {
    name: '',
    gender: '男',
    phone: '',
    idCard: '',
    organizationId: '',
    role: 'party_member',
    joinDate: '',
    note: ''
  };
};

const saveUser = () => {
  if (editingUser.value) {
    const index = users.value.findIndex(u => u.id === editingUser.value.id);
    if (index !== -1) {
      users.value[index] = { ...userForm.value, id: editingUser.value.id };
    }
  } else {
    users.value.push({
      ...userForm.value,
      id: users.value.length + 1,
      status: 'active',
      learningProgress: 0
    });
  }
  closeModal();
};

const toggleUserStatus = (user) => {
  user.status = user.status === 'active' ? 'disabled' : 'active';
  updateStats();
};

const resetPassword = (user) => {
  if (confirm(`确定要重置 ${user.name} 的密码吗？`)) {
    alert(`密码已重置为默认密码：123456`);
  }
};

const deleteUser = (user) => {
  if (confirm(`确定要删除党员 ${user.name} 吗？`)) {
    users.value = users.value.filter(u => u.id !== user.id);
    updateStats();
  }
};

const batchEnable = () => {
  users.value.forEach(user => {
    if (selectedUsers.value.includes(user.id)) {
      user.status = 'active';
    }
  });
  updateStats();
};

const batchDisable = () => {
  users.value.forEach(user => {
    if (selectedUsers.value.includes(user.id)) {
      user.status = 'disabled';
    }
  });
  updateStats();
};

const batchResetPassword = () => {
  if (confirm(`确定要重置 ${selectedUsers.value.length} 名党员的密码吗？`)) {
    alert('密码已重置为默认密码：123456');
  }
};

const exportUsers = () => {
  alert('正在导出数据...');
};

const handleFileDrop = (event) => {
  event.preventDefault();
  const files = event.dataTransfer.files;
  if (files.length > 0) {
    alert(`已选择文件: ${files[0].name}`);
  }
};

const downloadTemplate = () => {
  alert('正在下载导入模板...');
};

const startImport = () => {
  alert('正在导入数据...');
  showImportModal.value = false;
};

const updateStats = () => {
  userStats.value.total = users.value.length;
  userStats.value.active = users.value.filter(u => u.status === 'active').length;
  userStats.value.disabled = users.value.filter(u => u.status === 'disabled').length;
  userStats.value.warning = users.value.filter(u => u.learningProgress < 60).length;
};

onMounted(() => {
  updateStats();
});
</script>

<style scoped>
.user-management {
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
  width: 280px;
  font-size: 14px;
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
  font-size: 14px;
  background: #fff;
  cursor: pointer;
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
  transition: all 0.3s;
}

.btn-primary {
  background: #e74c3c;
  color: #fff;
}

.btn-primary:hover {
  background: #c0392b;
}

.btn-secondary {
  background: #e2e8f0;
  color: #2d3748;
}

.btn-secondary:hover {
  background: #cbd5e0;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 13px;
}

.user-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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

.stat-icon.blue { background: #ebf8ff; }
.stat-icon.green { background: #f0fff4; }
.stat-icon.orange { background: #fffaf0; }
.stat-icon.red { background: #fff5f5; }

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #1a202c;
}

.stat-label {
  font-size: 14px;
  color: #718096;
}

.user-table-container {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
}

.user-table th,
.user-table td {
  padding: 15px 12px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.user-table th {
  background: #f8fafc;
  font-weight: 600;
  color: #4a5568;
  font-size: 13px;
}

.user-table tr:hover {
  background: #f8fafc;
}

.user-table tr.warning {
  background: #fff5f5;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-avatar {
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

.user-name {
  font-weight: 500;
}

.role-tag {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.role-tag.super_admin { background: #feb2b2; color: #c53030; }
.role-tag.party_committee_admin { background: #fbd38d; color: #c05621; }
.role-tag.branch_secretary { background: #90cdf4; color: #2b6cb0; }
.role-tag.party_member { background: #c6f6d5; color: #276749; }

.status-tag {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
}

.status-tag.active { background: #c6f6d5; color: #276749; }
.status-tag.disabled { background: #e2e8f0; color: #718096; }

.progress-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.progress-bar {
  width: 80px;
  height: 6px;
  background: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #48bb78;
  border-radius: 3px;
  transition: width 0.3s;
}

.progress-fill.low {
  background: #e74c3c;
}

.progress-text {
  font-size: 13px;
  color: #718096;
}

.action-buttons {
  display: flex;
  gap: 5px;
}

.action-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background 0.3s;
}

.action-btn:hover {
  background: #f0f0f0;
}

.action-btn.delete:hover {
  background: #ffe0e0;
}

.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 15px 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.pagination-info {
  font-size: 14px;
  color: #718096;
}

.pagination {
  display: flex;
  gap: 8px;
}

.pagination button {
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.pagination button:hover:not(:disabled) {
  border-color: #e74c3c;
  color: #e74c3c;
}

.pagination button.active {
  background: #e74c3c;
  color: #fff;
  border-color: #e74c3c;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.batch-actions {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: #1a202c;
  color: #fff;
  padding: 12px 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
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
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
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

.import-area {
  border: 2px dashed #e2e8f0;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
}

.import-icon {
  font-size: 48px;
  margin-bottom: 15px;
}

.import-area p {
  margin: 10px 0;
  color: #4a5568;
}

.import-area a {
  color: #e74c3c;
}

.import-tip {
  font-size: 13px;
  color: #a0aec0;
}

.import-template {
  margin-top: 15px;
  text-align: center;
}

.import-template a {
  color: #e74c3c;
  font-size: 14px;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-left {
    width: 100%;
  }

  .search-box input {
    width: 100%;
  }

  .header-actions {
    width: 100%;
    justify-content: flex-end;
  }

  .user-stats {
    grid-template-columns: 1fr 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .pagination-container {
    flex-direction: column;
    gap: 15px;
  }
}
</style>
