<template>
  <div class="admin-container">
    <!-- 侧边栏 -->
    <aside class="admin-sidebar">
      <div class="sidebar-header">
        <h2>后台管理</h2>
      </div>
      <nav class="sidebar-nav">
        <ul>
          <li>
            <router-link to="/admin/dashboard">
              <i class="icon dashboard-icon"></i>
              <span>数据概览</span>
            </router-link>
          </li>
          <li>
            <router-link to="/admin/content">
              <i class="icon content-icon"></i>
              <span>内容管理</span>
            </router-link>
          </li>
          <li>
            <router-link to="/admin/users">
              <i class="icon users-icon"></i>
              <span>用户管理</span>
            </router-link>
          </li>
          <li>
            <router-link to="/admin/settings">
              <i class="icon settings-icon"></i>
              <span>系统设置</span>
            </router-link>
          </li>
        </ul>
      </nav>
      <div class="sidebar-footer">
        <router-link to="/" class="back-home">返回首页</router-link>
      </div>
    </aside>
    
    <!-- 主内容区 -->
    <main class="admin-content">
      <header class="content-header">
        <h1>{{ currentPage }}</h1>
      </header>
      <div class="content-body">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const currentPage = computed(() => {
  const path = route.path;
  switch (path) {
    case '/admin/dashboard':
      return '数据概览';
    case '/admin/content':
      return '内容管理';
    case '/admin/users':
      return '用户管理';
    case '/admin/settings':
      return '系统设置';
    default:
      return '后台管理';
  }
});
</script>

<style scoped>
.admin-container {
  display: flex;
  height: 100vh;
  background-color: #f5f7fa;
}

/* 侧边栏样式 */
.admin-sidebar {
  width: 240px;
  background-color: #1a202c;
  color: #fff;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid #2d3748;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #e74c3c;
}

.sidebar-nav {
  flex: 1;
  padding: 20px 0;
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-nav li {
  margin: 0;
}

.sidebar-nav a {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  color: #e2e8f0;
  text-decoration: none;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
}

.sidebar-nav a:hover {
  background-color: #2d3748;
  border-left-color: #e74c3c;
  color: #fff;
}

.sidebar-nav a.router-link-active {
  background-color: #2d3748;
  border-left-color: #e74c3c;
  color: #fff;
  font-weight: 600;
}

.icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 图标样式 */
.dashboard-icon::before {
  content: '📊';
  font-size: 18px;
}

.content-icon::before {
  content: '📝';
  font-size: 18px;
}

.users-icon::before {
  content: '👥';
  font-size: 18px;
}

.settings-icon::before {
  content: '⚙️';
  font-size: 18px;
}

.sidebar-footer {
  padding: 20px;
  border-top: 1px solid #2d3748;
}

.back-home {
  display: block;
  text-align: center;
  padding: 10px;
  background-color: #e74c3c;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.back-home:hover {
  background-color: #c0392b;
}

/* 主内容区样式 */
.admin-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.content-header {
  padding: 20px 30px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #e2e8f0;
}

.content-header h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: #1a202c;
}

.content-body {
  flex: 1;
  padding: 30px;
  overflow-y: auto;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .admin-sidebar {
    width: 200px;
  }
  
  .sidebar-header h2 {
    font-size: 16px;
  }
  
  .sidebar-nav a {
    padding: 12px 15px;
  }
  
  .content-header {
    padding: 15px 20px;
  }
  
  .content-header h1 {
    font-size: 20px;
  }
  
  .content-body {
    padding: 20px;
  }
}
</style>
