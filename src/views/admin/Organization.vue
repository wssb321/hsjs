<template>
  <div class="organization-management">
    <div class="page-header">
      <h2>组织架构管理</h2>
      <div class="header-actions">
        <button class="btn btn-secondary" @click="expandAll">
          <span>📂</span> 展开全部
        </button>
        <button class="btn btn-secondary" @click="collapseAll">
          <span>📁</span> 收起全部
        </button>
        <button class="btn btn-primary" @click="showAddModal = true">
          <span>➕</span> 添加组织
        </button>
      </div>
    </div>

    <div class="org-container">
      <div class="org-tree-panel">
        <div class="panel-header">
          <h3>党组织树</h3>
          <span class="org-count">共 {{ totalOrgs }} 个组织</span>
        </div>
        <div class="tree-container">
          <TreeNode
            v-for="org in organizationTree"
            :key="org.id"
            :node="org"
            :expandedNodes="expandedNodes"
            :selectedNode="selectedNode"
            @toggle="toggleNode"
            @select="selectNode"
            @add-child="addChildNode"
            @edit="editNode"
            @delete="deleteNode"
          />
        </div>
      </div>

      <div class="org-detail-panel">
        <div v-if="selectedNode" class="detail-content">
          <div class="detail-header">
            <div class="detail-icon" :style="{ background: getLevelColor(selectedNode.level) }">
              {{ selectedNode.name.charAt(0) }}
            </div>
            <div class="detail-info">
              <h3>{{ selectedNode.name }}</h3>
              <span class="level-badge">{{ getLevelName(selectedNode.level) }}</span>
            </div>
          </div>

          <div class="detail-stats">
            <div class="stat-item">
              <span class="stat-label">党员人数</span>
              <span class="stat-value">{{ selectedNode.memberCount || 0 }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">子组织数</span>
              <span class="stat-value">{{ selectedNode.children ? selectedNode.children.length : 0 }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">负责人</span>
              <span class="stat-value">{{ selectedNode.leader || '未设置' }}</span>
            </div>
          </div>

          <div class="detail-info-list">
            <div class="info-item">
              <span class="info-label">组织编码</span>
              <span class="info-value">{{ selectedNode.code }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">成立时间</span>
              <span class="info-value">{{ selectedNode.establishedDate || '未设置' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">联系电话</span>
              <span class="info-value">{{ selectedNode.phone || '未设置' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">详细地址</span>
              <span class="info-value">{{ selectedNode.address || '未设置' }}</span>
            </div>
          </div>

          <div class="detail-actions">
            <button class="btn btn-primary" @click="editNode(selectedNode)">
              <span>✏️</span> 编辑
            </button>
            <button class="btn btn-secondary" @click="addChildNode(selectedNode)">
              <span>➕</span> 添加下级
            </button>
            <button class="btn btn-danger" @click="deleteNode(selectedNode)">
              <span>🗑️</span> 删除
            </button>
          </div>

          <div class="member-list">
            <h4>组织成员</h4>
            <div v-if="selectedNode.members && selectedNode.members.length > 0" class="member-grid">
              <div v-for="member in selectedNode.members" :key="member.id" class="member-card">
                <div class="member-avatar">{{ member.name.charAt(0) }}</div>
                <div class="member-info">
                  <div class="member-name">{{ member.name }}</div>
                  <div class="member-role">{{ member.role }}</div>
                </div>
              </div>
            </div>
            <div v-else class="empty-members">
              <p>暂无成员</p>
            </div>
          </div>
        </div>

        <div v-else class="no-selection">
          <div class="no-selection-icon">🏛️</div>
          <p>请选择一个组织查看详情</p>
        </div>
      </div>
    </div>

    <div class="modal" v-if="showAddModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ editingOrg ? '编辑组织' : '添加组织' }}</h3>
          <button class="close-btn" @click="closeModal">×</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>上级组织</label>
            <select v-model="orgForm.parentId" :disabled="!canSelectParent">
              <option value="">请选择上级组织（留空为顶级）</option>
              <option v-for="org in flatOrganizations" :key="org.id" :value="org.id">{{ org.name }}</option>
            </select>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>组织名称 <span class="required">*</span></label>
              <input type="text" v-model="orgForm.name" placeholder="请输入组织名称" />
            </div>
            <div class="form-group">
              <label>组织级别</label>
              <select v-model="orgForm.level" @change="onLevelChange">
                <option value="party_committee">党委</option>
                <option value="general_branch">党总支</option>
                <option value="branch">党支部</option>
                <option value="group">党小组</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>组织编码</label>
              <input type="text" v-model="orgForm.code" placeholder="请输入组织编码" />
            </div>
            <div class="form-group">
              <label>成立时间</label>
              <input type="date" v-model="orgForm.establishedDate" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>负责人</label>
              <input type="text" v-model="orgForm.leader" placeholder="请输入负责人姓名" />
            </div>
            <div class="form-group">
              <label>联系电话</label>
              <input type="text" v-model="orgForm.phone" placeholder="请输入联系电话" />
            </div>
          </div>
          <div class="form-group">
            <label>详细地址</label>
            <input type="text" v-model="orgForm.address" placeholder="请输入详细地址" />
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeModal">取消</button>
          <button class="btn btn-primary" @click="saveOrganization">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, h } from 'vue';

const organizationTree = ref([
  {
    id: 1,
    name: '中共XX公司委员会',
    level: 'party_committee',
    code: 'ORG001',
    memberCount: 45,
    leader: '张三',
    phone: '010-12345678',
    address: '北京市朝阳区XX路1号',
    establishedDate: '2020-01-01',
    children: [
      {
        id: 2,
        name: '第一党总支',
        level: 'general_branch',
        code: 'ORG001-01',
        memberCount: 28,
        leader: '李四',
        phone: '010-12345679',
        address: '北京市朝阳区XX路2号',
        establishedDate: '2020-06-01',
        children: [
          {
            id: 4,
            name: '第一党支部',
            level: 'branch',
            code: 'ORG001-01-01',
            memberCount: 15,
            leader: '王五',
            phone: '010-12345680',
            members: [
              { id: 1, name: '王五', role: '支部书记' },
              { id: 2, name: '赵六', role: '组织委员' },
              { id: 3, name: '钱七', role: '宣传委员' }
            ],
            children: [
              { id: 7, name: '第一党小组', level: 'group', code: 'ORG001-01-01-01', memberCount: 5, leader: '孙八', members: [] },
              { id: 8, name: '第二党小组', level: 'group', code: 'ORG001-01-01-02', memberCount: 5, leader: '周九', members: [] }
            ]
          },
          {
            id: 5,
            name: '第二党支部',
            level: 'branch',
            code: 'ORG001-01-02',
            memberCount: 13,
            leader: '周十',
            members: [
              { id: 4, name: '周十', role: '支部书记' },
              { id: 5, name: '吴十一', role: '组织委员' }
            ]
          }
        ]
      },
      {
        id: 3,
        name: '第二党总支',
        level: 'general_branch',
        code: 'ORG001-02',
        memberCount: 17,
        leader: '郑十一',
        children: [
          {
            id: 6,
            name: '第三党支部',
            level: 'branch',
            code: 'ORG001-02-01',
            memberCount: 17,
            leader: '郑十一',
            members: [
              { id: 6, name: '郑十一', role: '支部书记' },
              { id: 7, name: '冯十二', role: '组织委员' },
              { id: 8, name: '陈十三', role: '宣传委员' }
            ]
          }
        ]
      }
    ]
  }
]);

const expandedNodes = ref(new Set([1, 2, 3, 4, 5, 6]));
const selectedNode = ref(null);
const showAddModal = ref(false);
const editingOrg = ref(null);
const canSelectParent = ref(true);

const orgForm = ref({
  name: '',
  level: 'branch',
  code: '',
  parentId: '',
  leader: '',
  phone: '',
  address: '',
  establishedDate: ''
});

const flatOrganizations = computed(() => {
  const result = [];
  const flatten = (nodes, level = 0) => {
    nodes.forEach(node => {
      result.push({
        id: node.id,
        name: node.name,
        level: node.level,
        levelName: getLevelName(node.level)
      });
      if (node.children) {
        flatten(node.children, level + 1);
      }
    });
  };
  flatten(organizationTree.value);
  return result;
});

const totalOrgs = computed(() => {
  let count = 0;
  const countNodes = (nodes) => {
    nodes.forEach(node => {
      count++;
      if (node.children) {
        countNodes(node.children);
      }
    });
  };
  countNodes(organizationTree.value);
  return count;
});

const getLevelName = (level) => {
  const names = {
    'party_committee': '党委',
    'general_branch': '党总支',
    'branch': '党支部',
    'group': '党小组'
  };
  return names[level] || level;
};

const getLevelColor = (level) => {
  const colors = {
    'party_committee': '#e74c3c',
    'general_branch': '#f39c12',
    'branch': '#3498db',
    'group': '#27ae60'
  };
  return colors[level] || '#95a5a6';
};

const toggleNode = (nodeId) => {
  if (expandedNodes.value.has(nodeId)) {
    expandedNodes.value.delete(nodeId);
  } else {
    expandedNodes.value.add(nodeId);
  }
};

const selectNode = (node) => {
  selectedNode.value = node;
};

const addChildNode = (parentNode) => {
  editingOrg.value = null;
  orgForm.value = {
    name: '',
    level: getNextLevel(parentNode.level),
    code: parentNode.code + '-',
    parentId: parentNode.id,
    leader: '',
    phone: '',
    address: '',
    establishedDate: ''
  };
  canSelectParent.value = false;
  showAddModal.value = true;
};

const editNode = (node) => {
  editingOrg.value = node;
  orgForm.value = { ...node, parentId: '' };
  canSelectParent.value = false;
  showAddModal.value = true;
};

const deleteNode = (node) => {
  if (confirm(`确定要删除组织"${node.name}"吗？${node.children && node.children.length > 0 ? '该操作将同时删除所有子组织。' : ''}`)) {
    removeNode(organizationTree.value, node.id);
    if (selectedNode.value && selectedNode.value.id === node.id) {
      selectedNode.value = null;
    }
  }
};

const removeNode = (nodes, nodeId) => {
  const index = nodes.findIndex(n => n.id === nodeId);
  if (index !== -1) {
    nodes.splice(index, 1);
  } else {
    nodes.forEach(node => {
      if (node.children) {
        removeNode(node.children, nodeId);
      }
    });
  }
};

const getNextLevel = (currentLevel) => {
  const levels = ['party_committee', 'general_branch', 'branch', 'group'];
  const currentIndex = levels.indexOf(currentLevel);
  if (currentIndex < levels.length - 1) {
    return levels[currentIndex + 1];
  }
  return 'group';
};

const onLevelChange = () => {
  if (orgForm.value.parentId) {
    const parent = findNode(organizationTree.value, orgForm.value.parentId);
    if (parent) {
      const nextLevel = getNextLevel(parent.level);
      if (orgForm.value.level !== nextLevel) {
        orgForm.value.level = nextLevel;
      }
    }
  }
};

const findNode = (nodes, nodeId) => {
  for (const node of nodes) {
    if (node.id === nodeId) {
      return node;
    }
    if (node.children) {
      const found = findNode(node.children, nodeId);
      if (found) return found;
    }
  }
  return null;
};

const closeModal = () => {
  showAddModal.value = false;
  editingOrg.value = null;
  canSelectParent.value = true;
};

const saveOrganization = () => {
  if (!orgForm.value.name) {
    alert('请输入组织名称');
    return;
  }

  if (editingOrg.value) {
    Object.assign(editingOrg.value, orgForm.value);
  } else {
    const newOrg = {
      id: Date.now(),
      ...orgForm.value,
      memberCount: 0,
      members: [],
      children: []
    };
    if (orgForm.value.parentId) {
      const parent = findNode(organizationTree.value, orgForm.value.parentId);
      if (parent) {
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(newOrg);
      }
    } else {
      organizationTree.value.push(newOrg);
    }
  }
  closeModal();
};

const expandAll = () => {
  const expand = (nodes) => {
    nodes.forEach(node => {
      expandedNodes.value.add(node.id);
      if (node.children) {
        expand(node.children);
      }
    });
  };
  expand(organizationTree.value);
};

const collapseAll = () => {
  expandedNodes.value.clear();
};

const TreeNode = (props) => {
  const { node, expandedNodes, selectedNode } = props;
  const isExpanded = expandedNodes.has(node.id);
  const isSelected = selectedNode && selectedNode.id === node.id;
  const hasChildren = node.children && node.children.length > 0;

  return h('div', { class: 'tree-node' }, [
    h('div', {
      class: ['tree-node-content', { selected: isSelected }],
      onClick: () => props.onSelect(node)
    }, [
      hasChildren ? h('span', {
        class: ['toggle-icon', { expanded: isExpanded }],
        onClick: (e) => {
          e.stopPropagation();
          props.onToggle(node.id);
        }
      }, isExpanded ? '📂' : '📁') : h('span', { class: 'toggle-icon leaf' }, '📄'),
      h('span', { class: 'node-icon', style: { background: getLevelColor(node.level) } }, node.name.charAt(0)),
      h('span', { class: 'node-name' }, node.name),
      h('span', { class: 'node-count' }, node.memberCount + '人')
    ]),
    hasChildren && isExpanded ? h('div', { class: 'tree-node-children' },
      node.children.map(child =>
        h(TreeNode, {
          key: child.id,
          node: child,
          expandedNodes: expandedNodes,
          selectedNode: selectedNode,
          onToggle: props.onToggle,
          onSelect: props.onSelect,
          onAddChild: props.onAddChild,
          onEdit: props.onEdit,
          onDelete: props.onDelete
        })
      )
    ) : null
  ]);
};

onMounted(() => {
  selectNode(organizationTree.value[0]);
});
</script>

<style scoped>
.organization-management {
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

.btn-danger {
  background: #e74c3c;
  color: #fff;
}

.org-container {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 20px;
  height: calc(100vh - 220px);
}

.org-tree-panel {
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

.org-count {
  font-size: 13px;
  color: #718096;
}

.tree-container {
  flex: 1;
  overflow-y: auto;
}

.tree-node {
  margin-bottom: 4px;
}

.tree-node-content {
  display: flex;
  align-items: center;
  padding: 8px 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.tree-node-content:hover {
  background: #f7fafc;
}

.tree-node-content.selected {
  background: #fff5f5;
  border-left: 3px solid #e74c3c;
}

.toggle-icon {
  width: 20px;
  margin-right: 6px;
  font-size: 14px;
  cursor: pointer;
}

.toggle-icon.leaf {
  opacity: 0.5;
}

.node-icon {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  margin-right: 10px;
}

.node-name {
  flex: 1;
  font-size: 14px;
  color: #2d3748;
}

.node-count {
  font-size: 12px;
  color: #a0aec0;
  background: #f0f0f0;
  padding: 2px 8px;
  border-radius: 10px;
}

.tree-node-children {
  margin-left: 30px;
  padding-left: 15px;
  border-left: 2px solid #e2e8f0;
}

.org-detail-panel {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow-y: auto;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e2e8f0;
}

.detail-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 24px;
  font-weight: 700;
}

.detail-info h3 {
  margin: 0 0 8px 0;
  font-size: 20px;
  color: #1a202c;
}

.level-badge {
  display: inline-block;
  padding: 4px 12px;
  background: #fff5f5;
  color: #e74c3c;
  border-radius: 4px;
  font-size: 13px;
}

.detail-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 25px;
}

.stat-item {
  background: #f8fafc;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
}

.stat-label {
  display: block;
  font-size: 13px;
  color: #718096;
  margin-bottom: 5px;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #1a202c;
}

.detail-info-list {
  margin-bottom: 25px;
}

.info-item {
  display: flex;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.info-label {
  width: 100px;
  color: #718096;
  font-size: 14px;
}

.info-value {
  flex: 1;
  color: #2d3748;
  font-size: 14px;
}

.detail-actions {
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
}

.member-list h4 {
  margin: 0 0 15px 0;
  font-size: 16px;
  color: #1a202c;
}

.member-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
}

.member-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 8px;
}

.member-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #3498db;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.member-name {
  font-weight: 500;
  color: #2d3748;
}

.member-role {
  font-size: 13px;
  color: #718096;
}

.empty-members {
  text-align: center;
  padding: 30px;
  color: #a0aec0;
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
.form-group select {
  width: 100%;
  padding: 10px 12px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
}

.form-group input:focus,
.form-group select:focus {
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

@media (max-width: 992px) {
  .org-container {
    grid-template-columns: 1fr;
    height: auto;
  }

  .org-tree-panel {
    max-height: 400px;
  }

  .detail-stats {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
