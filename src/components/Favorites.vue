<template>
  <section class="favorites">
    <div class="favorites-header">
      <h2>❤️ 我的收藏</h2>
      <div class="favorites-stats">
        <span class="favorites-count">共 {{ favorites.length }} 项收藏</span>
      </div>
    </div>

    <div class="favorites-actions">
      <div class="search-box">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="搜索收藏内容..."
          class="search-input"
        />
        <span class="search-icon">🔍</span>
      </div>
      <div class="filter-tabs">
        <button
          v-for="tab in filterTabs"
          :key="tab.value"
          :class="['filter-tab', { active: currentFilter === tab.value }]"
          @click="currentFilter = tab.value"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <div class="favorites-container">
      <div v-if="filteredFavorites.length > 0" class="favorites-grid">
        <div
          v-for="(item, index) in filteredFavorites"
          :key="index"
          class="favorite-card"
          @mouseenter="hoveredIndex = index"
          @mouseleave="hoveredIndex = -1"
        >
          <div class="favorite-card-header">
            <div class="favorite-category" :style="{ backgroundColor: getCategoryColor(item.category) }">
              {{ item.category || '学习' }}
            </div>
            <div class="favorite-actions">
              <button class="action-btn share-btn" @click="shareFavorite(item)" title="分享">
                <span>📤</span>
              </button>
              <button class="action-btn delete-btn" @click="removeFavorite(index)" title="删除">
                <span>🗑️</span>
              </button>
            </div>
          </div>

          <div class="favorite-card-body">
            <h3 class="favorite-title">{{ item.title }}</h3>
            <p class="favorite-description">{{ item.description }}</p>
          </div>

          <div class="favorite-card-footer">
            <div class="favorite-meta">
              <span class="favorite-date">📅 {{ item.date }}</span>
              <span class="favorite-views">👁️ {{ item.views || 0 }} 阅读</span>
            </div>
            <a :href="item.url" class="favorite-link" target="_blank">
              <span>查看详情</span>
              <span class="arrow">→</span>
            </a>
          </div>

          <div class="favorite-hover-overlay" v-if="hoveredIndex === index">
            <div class="overlay-content">
              <button class="overlay-btn" @click="editFavorite(item)">
                <span>✏️</span> 编辑
              </button>
              <button class="overlay-btn" @click="copyLink(item)">
                <span>🔗</span> 复制链接
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="empty-favorites">
        <div class="empty-illustration">
          <div class="empty-heart">❤️</div>
          <div class="empty-stars">⭐⭐⭐</div>
        </div>
        <h3>{{ searchQuery ? '没有找到相关收藏' : '暂无收藏' }}</h3>
        <p>{{ searchQuery ? '尝试搜索其他关键词' : '收藏的内容会显示在这里' }}</p>
        <button v-if="!searchQuery" class="btn btn-primary" @click="goToLearn">
          开始学习
        </button>
      </div>
    </div>

    <div class="favorites-tips" v-if="favorites.length > 0">
      <div class="tip-item">
        <span class="tip-icon">💡</span>
        <span class="tip-text">提示：鼠标悬停在收藏卡片上可以快速操作</span>
      </div>
    </div>

    <!-- 编辑收藏弹窗 -->
    <div v-if="showEditModal" class="modal-overlay" @click="closeEditModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>编辑收藏</h3>
          <button class="close-btn" @click="closeEditModal">×</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>标题</label>
            <input type="text" v-model="editingFavorite.title" class="form-control">
          </div>
          <div class="form-group">
            <label>描述</label>
            <textarea v-model="editingFavorite.description" class="form-control" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label>分类</label>
            <select v-model="editingFavorite.category" class="form-control">
              <option value="学习">学习</option>
              <option value="党建">党建</option>
              <option value="党史">党史</option>
              <option value="其他">其他</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeEditModal">取消</button>
          <button class="btn btn-primary" @click="saveFavorite">保存</button>
        </div>
      </div>
    </div>

    <!-- 分享弹窗 -->
    <div v-if="showShareModal" class="modal-overlay" @click="closeShareModal">
      <div class="modal-content modal-small" @click.stop>
        <div class="modal-header">
          <h3>分享收藏</h3>
          <button class="close-btn" @click="closeShareModal">×</button>
        </div>
        <div class="modal-body">
          <div class="share-preview">
            <h4>{{ sharingFavorite.title }}</h4>
            <p>{{ sharingFavorite.description }}</p>
          </div>
          <div class="share-links">
            <button class="share-option" @click="copyToClipboard">
              <span class="share-icon">📋</span>
              <span>复制链接</span>
            </button>
            <button class="share-option" @click="shareToWeixin">
              <span class="share-icon">💬</span>
              <span>微信</span>
            </button>
            <button class="share-option" @click="shareToWeibo">
              <span class="share-icon">🌐</span>
              <span>微博</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const favorites = ref([
  {
    title: '党史学习教育重要资料',
    description: '深入学习贯彻习近平总书记关于党史学习教育的重要论述，包括党史学习教育的重大意义、目标要求、重点内容等。',
    date: '2026-04-20',
    url: '/党史学习/index.html',
    category: '学习',
    views: 128
  },
  {
    title: '党的光辉历程',
    description: '中国共产党从成立到现在的发展历程，包括党的创建、新民主主义革命、社会主义建设、改革开放和新时代等重要阶段。',
    date: '2026-04-19',
    url: '#party-history',
    category: '党史',
    views: 256
  },
  {
    title: '习近平总书记重要讲话',
    description: '习近平总书记在二十大上的重要讲话精神，包括过去五年的工作和新时代十年的伟大变革、新时代新征程中国共产党的使命任务等。',
    date: '2026-04-18',
    url: '#news',
    category: '党建',
    views: 512
  },
  {
    title: '新时代中国特色社会主义',
    description: '习近平新时代中国特色社会主义思想的核心要义，包括“十个明确”、“十四个坚持”、“十三个方面成就”等内容。',
    date: '2026-04-17',
    url: '#theory',
    category: '学习',
    views: 89
  },
  {
    title: '中国共产党章程',
    description: '中国共产党的根本大法，规定了党的性质、宗旨、指导思想、奋斗目标、组织原则、党员权利义务等内容。',
    date: '2026-04-16',
    url: '#party-rules',
    category: '党建',
    views: 345
  },
  {
    title: '改革开放史',
    description: '中国改革开放的历史进程，包括十一届三中全会、经济特区建设、市场经济体制改革、加入世贸组织等重要事件。',
    date: '2026-04-15',
    url: '#reform-history',
    category: '党史',
    views: 198
  },
  {
    title: '社会主义发展史',
    description: '社会主义从空想到科学、从理论到实践、从一国到多国的发展历程，包括马克思主义的诞生、巴黎公社、十月革命、中国特色社会主义等。',
    date: '2026-04-14',
    url: '#socialism-history',
    category: '党史',
    views: 156
  },
  {
    title: '治国理政新理念新思想新战略',
    description: '习近平总书记关于治国理政的重要论述，包括“四个全面”战略布局、“五位一体”总体布局、新发展理念等。',
    date: '2026-04-13',
    url: '#governance',
    category: '学习',
    views: 423
  }
]);

const searchQuery = ref('');
const currentFilter = ref('all');
const hoveredIndex = ref(-1);
const showEditModal = ref(false);
const showShareModal = ref(false);
const editingFavorite = ref({});
const sharingFavorite = ref({});

const filterTabs = [
  { label: '全部', value: 'all' },
  { label: '学习', value: '学习' },
  { label: '党建', value: '党建' },
  { label: '党史', value: '党史' }
];

const filteredFavorites = computed(() => {
  let result = favorites.value;

  if (currentFilter.value !== 'all') {
    result = result.filter(item => item.category === currentFilter.value);
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    );
  }

  return result;
});

const getCategoryColor = (category) => {
  const colors = {
    '学习': '#007bff',
    '党建': '#dc3545',
    '党史': '#28a745',
    '其他': '#6c757d'
  };
  return colors[category] || '#6c757d';
};

const removeFavorite = (index) => {
  if (confirm('确定要删除这条收藏吗？')) {
    favorites.value.splice(index, 1);
    saveFavorites();
  }
};

const editFavorite = (item) => {
  editingFavorite.value = { ...item };
  showEditModal.value = true;
};

const closeEditModal = () => {
  showEditModal.value = false;
};

const saveFavorite = () => {
  const index = favorites.value.findIndex(item => item.title === editingFavorite.value.title);
  if (index !== -1) {
    favorites.value[index] = { ...editingFavorite.value };
    saveFavorites();
  }
  closeEditModal();
};

const shareFavorite = (item) => {
  sharingFavorite.value = { ...item };
  showShareModal.value = true;
};

const closeShareModal = () => {
  showShareModal.value = false;
};

const copyToClipboard = () => {
  navigator.clipboard.writeText(window.location.origin + sharingFavorite.value.url);
  alert('链接已复制到剪贴板');
};

const copyLink = (item) => {
  navigator.clipboard.writeText(window.location.origin + item.url);
  alert('链接已复制到剪贴板');
};

const shareToWeixin = () => {
  alert('微信分享功能开发中');
};

const shareToWeibo = () => {
  alert('微博分享功能开发中');
};

const goToLearn = () => {
  window.location.href = '/';
};

const saveFavorites = () => {
  localStorage.setItem('favorites', JSON.stringify(favorites.value));
};

onMounted(() => {
  const savedFavorites = localStorage.getItem('favorites');
  if (savedFavorites) {
    favorites.value = JSON.parse(savedFavorites);
  }
});
</script>

<style scoped>
.favorites {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
  margin-bottom: var(--spacing-2xl);
}

.favorites-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.favorites h2 {
  color: var(--primary-red);
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.favorites-count {
  background: var(--light-gray);
  color: var(--dark-gray);
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-full);
  font-size: 0.85rem;
}

.favorites-actions {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  flex-wrap: wrap;
}

.search-box {
  position: relative;
  flex: 1;
  min-width: 200px;
}

.search-input {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  padding-left: 40px;
  border: 2px solid var(--light-gray);
  border-radius: var(--radius-md);
  font-size: 0.95rem;
  transition: border-color var(--transition-normal);
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-red);
}

.search-icon {
  position: absolute;
  left: var(--spacing-md);
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
}

.filter-tabs {
  display: flex;
  gap: var(--spacing-xs);
}

.filter-tab {
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  background: var(--light-gray);
  color: var(--dark-gray);
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: 0.9rem;
  transition: all var(--transition-normal);
}

.filter-tab:hover {
  background: #e9e9e9;
}

.filter-tab.active {
  background: var(--primary-red);
  color: var(--white);
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.favorite-card {
  background: var(--light-gray);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all var(--transition-normal);
  position: relative;
}

.favorite-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.favorite-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md);
  background: linear-gradient(135deg, #f8f9fa, #ffffff);
}

.favorite-category {
  color: var(--white);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: 0.8rem;
  font-weight: 600;
}

.favorite-actions {
  display: flex;
  gap: var(--spacing-xs);
  opacity: 0;
  transition: opacity var(--transition-normal);
}

.favorite-card:hover .favorite-actions {
  opacity: 1;
}

.action-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  padding: var(--spacing-xs);
  border-radius: var(--radius-sm);
  transition: background-color var(--transition-normal);
}

.action-btn:hover {
  background: rgba(0, 0, 0, 0.1);
}

.favorite-card-body {
  padding: var(--spacing-lg);
}

.favorite-title {
  color: var(--dark-gray);
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 var(--spacing-sm) 0;
}

.favorite-description {
  color: var(--medium-gray);
  font-size: 0.95rem;
  line-height: 1.4;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.favorite-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.favorite-meta {
  display: flex;
  gap: var(--spacing-md);
  font-size: 0.85rem;
  color: var(--medium-gray);
}

.favorite-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--primary-red);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all var(--transition-normal);
}

.favorite-link:hover {
  color: var(--primary-red-dark);
}

.favorite-link .arrow {
  transition: transform var(--transition-normal);
}

.favorite-link:hover .arrow {
  transform: translateX(3px);
}

.favorite-hover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition-normal);
}

.favorite-card:hover .favorite-hover-overlay {
  opacity: 1;
}

.overlay-content {
  display: flex;
  gap: var(--spacing-md);
}

.overlay-btn {
  background: var(--white);
  color: var(--dark-gray);
  border: none;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  transition: all var(--transition-normal);
}

.overlay-btn:hover {
  background: var(--primary-red);
  color: var(--white);
}

.empty-favorites {
  text-align: center;
  padding: var(--spacing-3xl);
}

.empty-illustration {
  margin-bottom: var(--spacing-xl);
}

.empty-heart {
  font-size: 4rem;
  animation: pulse 2s infinite;
}

.empty-stars {
  font-size: 1.5rem;
  margin-top: var(--spacing-md);
}

.empty-favorites h3 {
  color: var(--dark-gray);
  margin-bottom: var(--spacing-sm);
  font-size: 1.3rem;
}

.empty-favorites p {
  color: var(--medium-gray);
  margin-bottom: var(--spacing-lg);
}

.favorites-tips {
  margin-top: var(--spacing-lg);
  padding: var(--spacing-md);
  background: var(--light-gray);
  border-radius: var(--radius-md);
}

.tip-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--medium-gray);
  font-size: 0.9rem;
}

.tip-icon {
  font-size: 1.2rem;
}

/* 弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: var(--white);
  border-radius: var(--radius-lg);
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-small {
  max-width: 400px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--light-gray);
}

.modal-header h3 {
  margin: 0;
  color: var(--primary-red);
  font-size: 1.2rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--medium-gray);
  transition: color var(--transition-normal);
}

.close-btn:hover {
  color: var(--dark-gray);
}

.modal-body {
  padding: var(--spacing-lg);
}

.form-group {
  margin-bottom: var(--spacing-md);
}

.form-group label {
  display: block;
  margin-bottom: var(--spacing-xs);
  color: var(--dark-gray);
  font-weight: 500;
}

.form-control {
  width: 100%;
  padding: var(--spacing-sm);
  border: 2px solid var(--light-gray);
  border-radius: var(--radius-md);
  font-size: 0.95rem;
  transition: border-color var(--transition-normal);
}

.form-control:focus {
  outline: none;
  border-color: var(--primary-red);
}

.modal-footer {
  display: flex;
  gap: var(--spacing-md);
  justify-content: flex-end;
  padding: var(--spacing-lg);
  border-top: 1px solid var(--light-gray);
}

.share-preview {
  background: var(--light-gray);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-lg);
}

.share-preview h4 {
  margin: 0 0 var(--spacing-xs) 0;
  color: var(--dark-gray);
}

.share-preview p {
  margin: 0;
  color: var(--medium-gray);
  font-size: 0.9rem;
}

.share-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
}

.share-option {
  background: var(--light-gray);
  border: none;
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
  transition: all var(--transition-normal);
}

.share-option:hover {
  background: var(--primary-red);
  color: var(--white);
}

.share-icon {
  font-size: 1.5rem;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .favorites {
    padding: var(--spacing-lg);
  }

  .favorites-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-sm);
  }

  .favorites-actions {
    flex-direction: column;
  }

  .search-box {
    width: 100%;
  }

  .filter-tabs {
    width: 100%;
    overflow-x: auto;
  }

  .favorites-grid {
    grid-template-columns: 1fr;
  }

  .share-links {
    grid-template-columns: 1fr;
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}
</style>
