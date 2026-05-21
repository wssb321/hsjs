<template>
  <section class="daily-news" id="daily-news">
    <div class="container">
      <h2>每日早报</h2>
      <div class="news-card">
        <div class="news-header">
          <h3>{{ newsData.date }}</h3>
          <p class="news-subtitle">全球热点新闻速览</p>
        </div>
        
        <div v-if="isLoading" class="loading-container">
          <div class="loading-spinner"></div>
          <p>加载中...</p>
        </div>
        
        <div v-else-if="error" class="error-container">
          <p>{{ error }}</p>
          <button @click="fetchNews" class="btn btn-primary">重试</button>
        </div>
        
        <div v-else class="news-content">
          <div class="news-list">
            <div v-for="(news, index) in newsData.news" :key="index" class="news-item">
              <span class="news-number">{{ index + 1 }}</span>
              <p class="news-text">{{ news }}</p>
            </div>
          </div>
          
          <div class="news-footer">
            <div class="news-weiyu">
              <h4>微语</h4>
              <p>{{ newsData.weiyu }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const newsData = ref({
  date: '',
  news: [],
  weiyu: ''
});
const isLoading = ref(true);
const error = ref('');

const fetchNews = async () => {
  isLoading.value = true;
  error.value = '';
  
  try {
    const response = await axios.get('https://prismapi.asia/zaobao');
    if (response.data.code === 0 && response.data.data) {
      newsData.value = response.data.data;
    } else {
      error.value = '获取早报失败，请稍后重试';
    }
  } catch (err) {
    console.error('API调用失败:', err);
    error.value = '网络错误，请检查网络连接';
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchNews();
});
</script>

<style scoped>
.daily-news {
  padding: 60px 0;
  background-color: var(--gray-light);
  margin: 40px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

h2 {
  color: var(--primary-red);
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 2px solid var(--primary-red);
  font-size: 1.8rem;
  text-align: center;
}

.news-card {
  background-color: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  overflow: hidden;
  transition: all var(--transition-normal);
  border: 1px solid var(--border);
}

.news-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-5px);
}

.news-header {
  background: #ffffff;
  color: var(--gray-dark);
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid var(--border);
}

.news-header h3 {
  margin: 0 0 10px 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--primary-red);
}

.news-subtitle {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.9;
  color: var(--gray);
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--border);
  border-top: 4px solid var(--primary-red);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.error-container p {
  margin-bottom: 20px;
  color: var(--gray-dark);
}

.news-content {
  padding: 30px;
}

.news-list {
  margin-bottom: 30px;
}

.news-item {
  display: flex;
  margin-bottom: 15px;
  padding: 10px 0;
  border-bottom: 1px solid var(--border);
  transition: all var(--transition-normal);
}

.news-item:last-child {
  border-bottom: none;
}

.news-item:hover {
  background-color: var(--gray-light);
  padding-left: 10px;
  border-radius: var(--radius-sm);
}

.news-number {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-color: var(--primary-red);
  color: var(--white);
  border-radius: 50%;
  text-align: center;
  line-height: 24px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-right: 15px;
  flex-shrink: 0;
}

.news-text {
  margin: 0;
  flex: 1;
  line-height: 1.5;
  color: var(--gray-dark);
}

.news-footer {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 2px solid var(--primary-red-light);
}

.news-weiyu h4 {
  color: var(--primary-red);
  margin-bottom: 10px;
  font-size: 1.1rem;
}

.news-weiyu p {
  margin: 0;
  line-height: 1.6;
  color: var(--gray-dark);
  font-style: italic;
  background-color: var(--gray-light);
  padding: 15px;
  border-radius: var(--radius-sm);
  border-left: 4px solid var(--primary-red);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .daily-news {
    padding: 25px 0;
    margin: 20px 0;
  }
  
  h2 {
    font-size: 1.4rem;
    margin-bottom: 20px;
  }
  
  .news-card {
    border-radius: 12px;
    overflow: hidden;
  }
  
  .news-header {
    padding: 15px;
  }
  
  .news-header h3 {
    font-size: 1.1rem;
  }
  
  .news-content {
    padding: 15px;
  }
  
  .news-list {
    margin-bottom: 20px;
  }
  
  .news-item {
    flex-direction: row;
    padding: 10px 0;
    align-items: flex-start;
  }
  
  .news-number {
    margin-right: 12px;
    margin-bottom: 0;
    min-width: 24px;
    height: 24px;
    flex-shrink: 0;
  }
  
  .news-text {
    font-size: 0.9rem;
    line-height: 1.5;
  }
  
  .news-footer {
    margin-top: 20px;
    padding-top: 15px;
  }
  
  .news-weiyu p {
    padding: 12px;
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .daily-news {
    padding: 20px 0;
    margin: 15px 0;
  }
  
  .news-header h3 {
    font-size: 1rem;
  }
  
  .news-subtitle {
    font-size: 0.8rem;
  }
  
  .news-item {
    padding: 8px 0;
  }
  
  .news-number {
    width: 22px;
    height: 22px;
    font-size: 0.75rem;
    line-height: 22px;
  }
  
  .news-text {
    font-size: 0.85rem;
    line-height: 1.5;
  }
  
  .news-weiyu h4 {
    font-size: 1rem;
  }
  
  .news-weiyu p {
    padding: 10px;
    font-size: 0.8rem;
  }
}
</style>