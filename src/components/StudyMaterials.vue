<template>
  <section class="study-materials-section" id="history-research">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">党史学习教育</h2>
      </div>
      
      <!-- 搜索和分类 -->
      <div class="study-materials-controls">
        <div class="search-box">
          <input type="text" v-model="searchQuery" placeholder="搜索学习材料..." class="search-input">
          <button class="search-button">搜索</button>
        </div>
        <div class="category-tabs">
          <button 
            v-for="category in categories" 
            :key="category.id"
            :class="['category-tab', { active: activeCategory === category.id }]"
            @click="activeCategory = category.id"
          >
            {{ category.name }}
          </button>
        </div>
      </div>
      
      <div class="study-materials-header">
        <h3>习近平新时代中国特色社会主义思想</h3>
        <div class="divider"></div>
      </div>
      
      <div class="study-materials-grid">
        <a 
          v-for="material in filteredMaterials" 
          :key="material.id"
          :href="material.url" 
          class="study-material-item" 
          target="_blank"
        >
          <div class="study-material-image">
            <img :src="material.image" :alt="material.title" />
            <div class="image-overlay">
              <span class="view-details">查看详情</span>
            </div>
          </div>
          <div class="study-material-content">
            <span :class="['category-tag', material.category]">{{ getCategoryName(material.category) }}</span>
            <h4>{{ material.title }}</h4>
            <div class="material-meta">
              <span class="publish-date">{{ material.publishDate }}</span>
              <span class="view-count">{{ material.viewCount }} 次学习</span>
            </div>
          </div>
        </a>
      </div>
      
      <!-- 分页 -->
      <div class="pagination">
        <button class="page-button" :disabled="currentPage === 1" @click="currentPage--">上一页</button>
        <button 
          v-for="page in totalPages" 
          :key="page"
          :class="['page-button', { active: currentPage === page }]"
          @click="currentPage = page"
        >
          {{ page }}
        </button>
        <button class="page-button" :disabled="currentPage === totalPages" @click="currentPage++">下一页</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';

// 分类数据
const categories = [
  { id: 'all', name: '全部' },
  { id: 'zxns', name: '习近平新时代' },
  { id: 'zglz', name: '治国理政' },
  { id: 'dsxx', name: '党史学习' }
];

// 学习材料数据
const studyMaterials = [
  {
    id: 1,
    title: '《习近平谈治国理政》第五卷',
    url: 'https://www.12371.cn/special/zglz5/',
    image: '../../image/治国理政5.jpg',
    category: 'zglz',
    publishDate: '2022-07',
    viewCount: 12500
  },
  {
    id: 2,
    title: '《习近平著作选读》',
    url: 'https://www.12371.cn/special/zzxd/',
    image: '../../image/习近平著作.jpg',
    category: 'zxns',
    publishDate: '2023-04',
    viewCount: 9800
  },
  {
    id: 3,
    title: '《习近平新时代中国特色社会主义思想专题摘编》',
    url: 'https://www.12371.cn/special/ztzb/',
    image: '../../image/习近平新时代1.jpg',
    category: 'zxns',
    publishDate: '2023-04',
    viewCount: 11200
  },
  {
    id: 4,
    title: '《习近平新时代中国特色社会主义思想学习纲要（2023年版）》',
    url: 'https://www.12371.cn/special/xxgy/',
    image: '../../image/习近平新时代.jpg',
    category: 'zxns',
    publishDate: '2023-06',
    viewCount: 8500
  },
  {
    id: 5,
    title: '《习近平谈治国理政》第四卷',
    url: 'https://www.12371.cn/special/zglz4/',
    image: '../../image/治国理政4.jpg',
    category: 'zglz',
    publishDate: '2022-06',
    viewCount: 10500
  },
  {
    id: 6,
    title: '《论中国共产党历史》',
    url: 'https://www.12371.cn/special/dsxxjc/gcdls/',
    image: '../../image/论党历史.jpg',
    category: 'dsxx',
    publishDate: '2021-02',
    viewCount: 7800
  },
  {
    id: 7,
    title: '《习近平新时代中国特色社会主义思想学习问答》',
    url: 'https://www.12371.cn/special/dsxxjc/xxwd/',
    image: '../../image/学习问答.jpg',
    category: 'zxns',
    publishDate: '2021-02',
    viewCount: 9200
  },
  {
    id: 8,
    title: '《习近平谈治国理政》第三卷',
    url: 'https://www.12371.cn/special/zglz3/',
    image: '../../image/治国理政3.jpg',
    category: 'zglz',
    publishDate: '2020-06',
    viewCount: 8900
  },
  {
    id: 9,
    title: '《习近平谈治国理政》第二卷',
    url: 'https://www.12371.cn/special/zglz2/',
    image: '../../image/治国理政2.jpg',
    category: 'zglz',
    publishDate: '2017-11',
    viewCount: 7500
  },
  {
    id: 10,
    title: '《习近平谈治国理政》第一卷',
    url: 'https://www.12371.cn/special/zglz1/',
    image: '../../image/治国理政1.jpg',
    category: 'zglz',
    publishDate: '2014-09',
    viewCount: 6800
  }
];

// 响应式数据
const searchQuery = ref('');
const activeCategory = ref('all');
const currentPage = ref(1);
const itemsPerPage = ref(8);

// 计算属性
const filteredMaterials = computed(() => {
  let filtered = studyMaterials.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = activeCategory.value === 'all' || item.category === activeCategory.value;
    return matchesSearch && matchesCategory;
  });
  
  // 分页
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filtered.slice(start, end);
});

const totalPages = computed(() => {
  const filtered = studyMaterials.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = activeCategory.value === 'all' || item.category === activeCategory.value;
    return matchesSearch && matchesCategory;
  });
  return Math.ceil(filtered.length / itemsPerPage.value);
});

// 方法
const getCategoryName = (categoryId) => {
  const category = categories.find(cat => cat.id === categoryId);
  return category ? category.name : '';
};
</script>

<style scoped>
/* 学习材料样式 */
.study-materials-section {
  background-color: var(--white);
  padding: 40px 0;
  margin-bottom: 30px;
  position: relative;
  overflow: hidden;
}

.study-materials-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(90deg, var(--primary-red), var(--gold), var(--primary-red));
}

.section-header {
  background-color: var(--primary-red);
  padding: 20px 0;
  margin-bottom: 40px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.section-title {
  color: var(--white);
  font-size: 1.8rem;
  text-align: center;
  margin: 0;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* 搜索和分类控制 */
.study-materials-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
}

.search-box {
  display: flex;
  gap: 10px;
  flex: 1;
  min-width: 300px;
}

.search-input {
  flex: 1;
  padding: 12px 15px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-red);
  box-shadow: 0 0 0 3px rgba(194, 30, 39, 0.1);
}

.search-button {
  background-color: var(--primary-red);
  color: var(--white);
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.search-button:hover {
  background-color: var(--primary-red-dark);
  transform: translateY(-2px);
}

.category-tabs {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.category-tab {
  background-color: #f7fafc;
  border: 2px solid #e2e8f0;
  padding: 10px 20px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 500;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-tab:hover {
  background-color: #edf2f7;
  border-color: var(--primary-red);
  color: var(--primary-red);
}

.category-tab.active {
  background-color: var(--primary-red);
  border-color: var(--primary-red);
  color: var(--white);
}

.study-materials-header {
  margin-bottom: 40px;
  text-align: center;
  position: relative;
  padding-bottom: 20px;
}

.study-materials-header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  height: 3px;
  background: linear-gradient(90deg, transparent, var(--primary-red), transparent);
}

.study-materials-header h3 {
  color: var(--primary-red);
  font-size: 2rem;
  margin-bottom: 15px;
  font-weight: 700;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.divider {
  width: 200px;
  height: 3px;
  background-color: var(--primary-red);
  margin: 0 auto;
}

/* 学习材料网格 */
.study-materials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.study-material-item {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
  position: relative;
  border: 1px solid #e2e8f0;
}

.study-material-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  border-color: var(--primary-red);
}

.study-material-image {
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
}

.study-material-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.study-material-item:hover .study-material-image img {
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.study-material-item:hover .image-overlay {
  opacity: 1;
}

.view-details {
  background-color: var(--primary-red);
  color: var(--white);
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  transition: transform 0.3s ease;
}

.study-material-item:hover .view-details {
  transform: translateY(-5px);
}

.study-material-content {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.category-tag {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 10px;
  align-self: flex-start;
}

.category-tag.zxns {
  background-color: #e8f5e8;
  color: #2ecc71;
}

.category-tag.zglz {
  background-color: #e3f2fd;
  color: #3498db;
}

.category-tag.dsxx {
  background-color: #fff3e0;
  color: #f39c12;
}

.study-material-content h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 15px 0;
  line-height: 1.4;
  flex: 1;
}

.material-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #718096;
  margin-top: auto;
  padding-top: 15px;
  border-top: 1px solid #f0f0f0;
}

.publish-date {
  display: flex;
  align-items: center;
  gap: 5px;
}

.view-count {
  display: flex;
  align-items: center;
  gap: 5px;
}

/* 分页 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 40px;
}

.page-button {
  background-color: #f7fafc;
  border: 1px solid #e2e8f0;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-button:hover:not(:disabled) {
  background-color: #edf2f7;
  border-color: var(--primary-red);
  color: var(--primary-red);
}

.page-button.active {
  background-color: var(--primary-red);
  border-color: var(--primary-red);
  color: var(--white);
}

.page-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .study-materials-controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-box {
    min-width: auto;
  }
  
  .category-tabs {
    justify-content: center;
  }
  
  .study-materials-grid {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
  }
  
  .study-material-image {
    height: 200px;
  }
  
  .study-materials-header h3 {
    font-size: 1.6rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .study-material-content h4 {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .study-materials-grid {
    grid-template-columns: 1fr;
  }
  
  .study-materials-section {
    padding: 20px 0;
  }
  
  .section-header {
    padding: 15px 0;
  }
  
  .study-materials-header {
    margin-bottom: 30px;
  }
  
  .study-material-content {
    padding: 15px;
  }
}
</style>