<template>
  <div class="role-permission-management">
    <div class="page-header">
      <h2>角色权限管理</h2>
      <button class="btn btn-primary" @click="showAddRoleModal = true">
        <span>➕</span> 添加角色
      </button>
    </div>

    <div class="role-container">
      <div class="role-list-panel">
        <div class="panel-header">
          <h3>角色列表</h3>
          <span class="role-count">{{ roles.length }} 个角色</span>
        </div>
        <div class="role-list">
          <div
            v-for="role in roles"
            :key="role.id"
            :class="['role-item', { active: selectedRole && selectedRole.id === role.id }]"
            @click="selectRole(role)"
          >
            <div class="role-icon" :style="{ background: role.color }">
              {{ role.name.charAt(0) }}
            </div>
            <div class="role-info">
              <div class="role-name">{{ role.name }}</div>
              <div class="role-desc">{{ role.description }}</div>
            </div>
            <div class="role-actions">
              <button class="action-btn" @click.stop="editRole(role)" title="编辑">✏️</button>
              <button class="action-btn" @click.stop="deleteRole(role)" title="删除" v-if="role.canDelete">🗑️</button>
            </div>
          </div>
        </div>
      </div>

      <div class="permission-panel">
        <div v-if="selectedRole" class="permission-content">
          <div class="permission-header">
            <div class="permission-title">
              <h3>{{ selectedRole.name }}</h3>
              <span class="permission-desc">{{ selectedRole.description }}</span>
            </div>
            <button class="btn btn-primary" @click="savePermissions">
              <span>💾</span> 保存权限
            </button>
          </div>

          <div class="permission-sections">
            <div class="permission-section">
              <div class="section-header">
                <input type="checkbox" :checked="isSectionChecked('userManagement')" @change="toggleSection('userManagement')" />
                <span class="section-icon">👥</span>
                <span class="section-name">用户管理</span>
              </div>
              <div class="permission-items">
                <label class="permission-item">
                  <input type="checkbox" :checked="hasPermission('userManagement', 'view')" @change="togglePermission('userManagement', 'view')" />
                  <span>查看党员列表</span>
                </label>
                <label class="permission-item">
                  <input type="checkbox" :checked="hasPermission('userManagement', 'add')" @change="togglePermission('userManagement', 'add')" />
                  <span>添加党员</span>
                </label>
                <label class="permission-item">
                  <input type="checkbox" :checked="hasPermission('userManagement', 'edit')" @change="togglePermission('userManagement', 'edit')" />
                  <span>编辑党员</span>
                </label>
                <label class="permission-item">
                  <input type="checkbox" :checked="hasPermission('userManagement', 'delete')" @change="togglePermission('userManagement', 'delete')" />
                  <span>删除党员</span>
                </label>
                <label class="permission-item">
                  <input type="checkbox" :checked="hasPermission('userManagement', 'export')" @change="togglePermission('userManagement', 'export')" />
                  <span>导出数据</span>
                </label>
              </div>
            </div>

            <div class="permission-section">
              <div class="section-header">
                <input type="checkbox" :checked="isSectionChecked('contentManagement')" @change="toggleSection('contentManagement')" />
                <span class="section-icon">📝</span>
                <span class="section-name">内容管理</span>
              </div>
              <div class="permission-items">
                <label class="permission-item">
                  <input type="checkbox" :checked="hasPermission('contentManagement', 'view')" @change="togglePermission('contentManagement', 'view')" />
                  <span>查看内容</span>
                </label>
                <label class="permission-item">
                  <input type="checkbox" :checked="hasPermission('contentManagement', 'publish')" @change="togglePermission('contentManagement', 'publish')" />
                  <span>发布内容</span>
                </label>
                <label class="permission-item">
                  <input type="checkbox" :checked="hasPermission('contentManagement', 'edit')" @change="togglePermission('contentManagement', 'edit')" />
                  <span>编辑内容</span>
                </label>
                <label class="permission-item">
                  <input type="checkbox" :checked="hasPermission('contentManagement', 'delete')" @change="togglePermission('contentManagement', 'delete')" />
                  <span>删除内容</span>
                </label>
                <label class="permission-item">
                  <input type="checkbox" :checked="hasPermission('contentManagement', 'recommend')" @change="togglePermission('contentManagement', 'recommend')" />
                  <span>内容置顶/推荐</span>
                </label>
              </div>
            </div>

            <div class="permission-section">
              <div class="section-header">
                <input type="checkbox" :checked="isSectionChecked('activityManagement')" @change="toggleSection('activityManagement')" />
                <span class="section-icon">📅</span>
                <span class="section-name">活动管理</span>
              </div>
              <div class="permission-items">
                <label class="permission-item">
                  <input type="checkbox" :checked="hasPermission('activityManagement', 'view')" @change="togglePermission('activityManagement', 'view')" />
                  <span>查看活动</span>
                </label>
                <label class="permission-item">
                  <input type="checkbox" :checked="hasPermission('activityManagement', 'create')" @change="togglePermission('activityManagement', 'create')" />
                  <span>创建活动</span>
                </label>
                <label class="permission-item">
                  <input type="checkbox" :checked="hasPermission('activityManagement', 'approve')" @change="togglePermission('activityManagement', 'approve')" />
                  <span>审核活动</span>
                </label>
                <label class="permission-item">
                  <input type="checkbox" :checked="hasPermission('activityManagement', 'checkin')" @change="togglePermission('activityManagement', 'checkin')" />
                  <span>签到管理</span>
                </label>
              </div>
            </div>

            <div class="permission-section">
              <div class="section-header">
                <input type="checkbox" :checked="isSectionChecked('learningSupervision')" @change="toggleSection('learningSupervision')" />
                <span class="section-icon">📖</span>
                <span class="section-name">学习监管</span>
              </div>
              <div class="permission-items">
                <label class="permission-item">
                  <input type="checkbox" :checked="hasPermission('learningSupervision', 'view')" @change="togglePermission('learningSupervision', 'view')" />
                  <span>查看学习进度</span>
                </label>
                <label class="permission-item">
                  <input type="checkbox" :checked="hasPermission('learningSupervision', 'export')" @change="togglePermission('learningSupervision', 'export')" />
                  <span>导出学习报表</span>
                </label>
                <label class="permission-item">
                  <input type="checkbox" :checked="hasPermission('learningSupervision', 'warn')" @change="togglePermission('learningSupervision', 'warn')" />
                  <span>发送预警通知</span>
                </label>
                <label class="permission-item">
                  <input type="checkbox" :checked="hasPermission('learningSupervision', 'remind')" @change="togglePermission('learningSupervision', 'remind')" />
                  <span>催学通知</span>
                </label>
              </div>
            </div>

            <div class="permission-section">
              <div class="section-header">
                <input type="checkbox" :checked="isSectionChecked('systemSettings')" @change="toggleSection('systemSettings')" />
                <span class="section-icon">⚙️</span>
                <span class="section-name">系统配置</span>
              </div>
              <div class="permission-items">
                <label class="permission-item">
                  <input type="checkbox" :checked="hasPermission('systemSettings', 'view')" @change="togglePermission('systemSettings', 'view')" />
                  <span>查看系统设置</span>
                </label>
                <label class="permission-item">
                  <input type="checkbox" :checked="hasPermission('systemSettings', 'edit')" @change="togglePermission('systemSettings', 'edit')" />
                  <span>修改系统设置</span>
                </label>
                <label class="permission-item">
                  <input type="checkbox" :checked="hasPermission('systemSettings', 'backup')" @change="togglePermission('systemSettings', 'backup')" />
                  <span>数据备份</span>
                </label>
                <label class="permission-item">
                  <input type="checkbox" :checked="hasPermission('systemSettings', 'log')" @change="togglePermission('systemSettings', 'log')" />
                  <span>查看操作日志</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="no-selection">
          <div class="no-selection-icon">🔐</div>
          <p>请选择一个角色查看权限</p>
        </div>
      </div>
    </div>

    <div class="modal" v-if="showAddRoleModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ editingRole ? '编辑角色' : '添加角色' }}</h3>
          <button class="close-btn" @click="closeRoleModal">×</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>角色名称 <span class="required">*</span></label>
            <input type="text" v-model="roleForm.name" placeholder="请输入角色名称" />
          </div>
          <div class="form-group">
            <label>角色描述</label>
            <input type="text" v-model="roleForm.description" placeholder="请输入角色描述" />
          </div>
          <div class="form-group">
            <label>角色颜色</label>
            <div class="color-options">
              <div
                v-for="color in colorOptions"
                :key="color"
                :class="['color-option', { selected: roleForm.color === color }]"
                :style="{ background: color }"
                @click="roleForm.color = color"
              ></div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeRoleModal">取消</button>
          <button class="btn btn-primary" @click="saveRole">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const roles = ref([
  {
    id: 1,
    name: '超级管理员',
    description: '拥有系统所有权限',
    color: '#e74c3c',
    canDelete: false,
    permissions: {
      userManagement: ['view', 'add', 'edit', 'delete', 'export'],
      contentManagement: ['view', 'publish', 'edit', 'delete', 'recommend'],
      activityManagement: ['view', 'create', 'approve', 'checkin'],
      learningSupervision: ['view', 'export', 'warn', 'remind'],
      systemSettings: ['view', 'edit', 'backup', 'log']
    }
  },
  {
    id: 2,
    name: '党委管理员',
    description: '管理党委及下属组织',
    color: '#f39c12',
    canDelete: false,
    permissions: {
      userManagement: ['view', 'add', 'edit', 'export'],
      contentManagement: ['view', 'publish', 'edit'],
      activityManagement: ['view', 'create', 'checkin'],
      learningSupervision: ['view', 'export', 'remind'],
      systemSettings: ['view', 'log']
    }
  },
  {
    id: 3,
    name: '支部书记',
    description: '管理本支部党员和活动',
    color: '#3498db',
    canDelete: true,
    permissions: {
      userManagement: ['view', 'edit'],
      contentManagement: ['view', 'publish'],
      activityManagement: ['view', 'create', 'checkin'],
      learningSupervision: ['view', 'remind'],
      systemSettings: []
    }
  },
  {
    id: 4,
    name: '普通党员',
    description: '普通学习用户',
    color: '#27ae60',
    canDelete: true,
    permissions: {
      userManagement: [],
      contentManagement: ['view'],
      activityManagement: ['view'],
      learningSupervision: [],
      systemSettings: []
    }
  }
]);

const selectedRole = ref(null);
const showAddRoleModal = ref(false);
const editingRole = ref(null);

const roleForm = ref({
  name: '',
  description: '',
  color: '#3498db'
});

const colorOptions = [
  '#e74c3c', '#f39c12', '#3498db', '#27ae60', '#9b59b6', '#1abc9c', '#34495e', '#e67e22'
];

const selectRole = (role) => {
  selectedRole.value = role;
};

const hasPermission = (section, action) => {
  if (!selectedRole.value) return false;
  return selectedRole.value.permissions[section]?.includes(action) || false;
};

const isSectionChecked = (section) => {
  if (!selectedRole.value) return false;
  const sectionPermissions = selectedRole.value.permissions[section];
  if (!sectionPermissions || sectionPermissions.length === 0) return false;
  const allActions = getSectionActions(section);
  return allActions.every(action => sectionPermissions.includes(action));
};

const getSectionActions = (section) => {
  const actionsMap = {
    userManagement: ['view', 'add', 'edit', 'delete', 'export'],
    contentManagement: ['view', 'publish', 'edit', 'delete', 'recommend'],
    activityManagement: ['view', 'create', 'approve', 'checkin'],
    learningSupervision: ['view', 'export', 'warn', 'remind'],
    systemSettings: ['view', 'edit', 'backup', 'log']
  };
  return actionsMap[section] || [];
};

const togglePermission = (section, action) => {
  if (!selectedRole.value) return;
  if (!selectedRole.value.permissions[section]) {
    selectedRole.value.permissions[section] = [];
  }
  const index = selectedRole.value.permissions[section].indexOf(action);
  if (index === -1) {
    selectedRole.value.permissions[section].push(action);
  } else {
    selectedRole.value.permissions[section].splice(index, 1);
  }
};

const toggleSection = (section) => {
  if (!selectedRole.value) return;
  const allActions = getSectionActions(section);
  const currentPermissions = selectedRole.value.permissions[section] || [];

  if (currentPermissions.length === allActions.length) {
    selectedRole.value.permissions[section] = [];
  } else {
    selectedRole.value.permissions[section] = [...allActions];
  }
};

const savePermissions = () => {
  alert('权限保存成功！');
};

const editRole = (role) => {
  editingRole.value = role;
  roleForm.value = { ...role };
  showAddRoleModal.value = true;
};

const deleteRole = (role) => {
  if (confirm(`确定要删除角色"${role.name}"吗？`)) {
    roles.value = roles.value.filter(r => r.id !== role.id);
    if (selectedRole.value && selectedRole.value.id === role.id) {
      selectedRole.value = null;
    }
  }
};

const closeRoleModal = () => {
  showAddRoleModal.value = false;
  editingRole.value = null;
  roleForm.value = {
    name: '',
    description: '',
    color: '#3498db'
  };
};

const saveRole = () => {
  if (!roleForm.value.name) {
    alert('请输入角色名称');
    return;
  }

  if (editingRole.value) {
    const index = roles.value.findIndex(r => r.id === editingRole.value.id);
    if (index !== -1) {
      roles.value[index] = {
        ...roles.value[index],
        ...roleForm.value
      };
    }
  } else {
    roles.value.push({
      id: Date.now(),
      ...roleForm.value,
      canDelete: true,
      permissions: {}
    });
  }
  closeRoleModal();
};
</script>

<style scoped>
.role-permission-management {
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

.role-container {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 20px;
  height: calc(100vh - 220px);
}

.role-list-panel {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e2e8f0;
}

.panel-header h3 {
  margin: 0;
  font-size: 16px;
  color: #1a202c;
}

.role-count {
  font-size: 13px;
  color: #718096;
}

.role-list {
  flex: 1;
  overflow-y: auto;
}

.role-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 8px;
}

.role-item:hover {
  background: #f7fafc;
}

.role-item.active {
  background: #fff5f5;
  border-left: 3px solid #e74c3c;
}

.role-icon {
  width: 45px;
  height: 45px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
}

.role-info {
  flex: 1;
}

.role-name {
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 4px;
}

.role-desc {
  font-size: 13px;
  color: #718096;
}

.role-actions {
  display: flex;
  gap: 5px;
  opacity: 0;
  transition: opacity 0.2s;
}

.role-item:hover .role-actions {
  opacity: 1;
}

.action-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 4px;
}

.action-btn:hover {
  background: #f0f0f0;
}

.permission-panel {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow-y: auto;
}

.permission-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e2e8f0;
}

.permission-title h3 {
  margin: 0 0 5px 0;
  font-size: 18px;
  color: #1a202c;
}

.permission-desc {
  font-size: 14px;
  color: #718096;
}

.permission-sections {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.permission-section {
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.section-icon {
  font-size: 18px;
}

.section-name {
  font-weight: 600;
  color: #1a202c;
}

.permission-items {
  padding: 15px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
}

.permission-item {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.permission-item span {
  font-size: 14px;
  color: #2d3748;
}

.no-selection {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #a0aec0;
}

.no-selection-icon {
  font-size: 64px;
  margin-bottom: 15px;
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

.form-group input {
  width: 100%;
  padding: 10px 12px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
}

.form-group input:focus {
  outline: none;
  border-color: #e74c3c;
}

.color-options {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.color-option {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s;
}

.color-option:hover {
  transform: scale(1.1);
}

.color-option.selected {
  border: 3px solid #1a202c;
}

.modal-footer {
  padding: 20px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

@media (max-width: 992px) {
  .role-container {
    grid-template-columns: 1fr;
    height: auto;
  }

  .role-list-panel {
    max-height: 300px;
  }
}

@media (max-width: 768px) {
  .permission-items {
    grid-template-columns: 1fr;
  }
}
</style>
