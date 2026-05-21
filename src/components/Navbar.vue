<template>
  <header class="navbar" :class="{ 'navbar-scrolled': isScrolled, 'navbar-menu-open': menuOpen }">
    <div class="container">
      <div class="navbar-content">
        <div class="navbar-logo">
          <div class="logo-container">
            <div class="logo-icon">⭐</div>
            <div class="logo-text">
              <h1 class="navbar-title"><router-link to="/">赓续文脉，强国有我</router-link></h1>
              <p class="navbar-subtitle">党员教育学习平台</p>
            </div>
          </div>
        </div>
        
        <!-- 桌面导航 -->
        <nav class="navbar-nav" v-if="!isMobile">
          <ul>
            <li :class="{ active: isActive('/') }"><a href="/">首页</a></li>
            <li :class="{ active: isActive('#history') }"><a href="/#history">光辉历程</a></li>
            <li :class="{ active: isActive('#today') }"><a href="/#today">历史今天</a></li>
            <li :class="{ active: isActive('#daily-news') }"><a href="/#daily-news">每日早报</a></li>
            <li :class="{ active: isActive('/ai-chat') }"><router-link to="/ai-chat">AI问答</router-link></li>
            <li :class="{ active: isActive('#development') }"><a href="/#development">发展成就</a></li>
            <li :class="{ active: isActive('#models') }"><a href="/#models">榜样人物</a></li>
            <li><a href="/党史学习/index.html">党史研究</a></li>
            <li v-if="isLoggedIn" :class="{ active: isActive('/profile') }"><router-link to="/profile">我的</router-link></li>
            <li v-else><a href="/登录/login.html" class="login-btn">登录/注册</a></li>
          </ul>
        </nav>
        
        <!-- 移动端菜单按钮 -->
        <button class="menu-toggle" @click="toggleMenu" :class="{ active: menuOpen }" v-else aria-label="Toggle menu">
          <span class="menu-icon"></span>
          <span class="menu-text">{{ menuOpen ? '关闭' : '菜单' }}</span>
        </button>
      </div>
      
      <!-- 移动端导航菜单 -->
      <div class="mobile-menu" v-if="isMobile && menuOpen" role="navigation" aria-label="Mobile navigation">
        <div class="mobile-menu-header">
          <div class="mobile-logo">
            <div class="logo-icon">⚡</div>
            <span>赓续文脉，强国有我</span>
          </div>
          <button class="close-btn" @click="closeMenu" aria-label="Close menu">×</button>
        </div>
        <ul class="mobile-menu-list">
          <li :class="{ active: isActive('/') }"><a href="/" @click="closeMenu">🏠 首页</a></li>
          <li :class="{ active: isActive('#history') }"><a href="/#history" @click="closeMenu">📜 党的光辉历程</a></li>
          <li :class="{ active: isActive('#today') }"><a href="/#today" @click="closeMenu">📅 历史上的今天</a></li>
          <li :class="{ active: isActive('#daily-news') }"><a href="/#daily-news" @click="closeMenu">📰 每日早报</a></li>
          <li :class="{ active: isActive('/ai-chat') }"><router-link to="/ai-chat" @click="closeMenu">🤖 AI智能问答</router-link></li>
          <li :class="{ active: isActive('#development') }"><a href="/#development" @click="closeMenu">📈 发展成就</a></li>
          <li :class="{ active: isActive('#models') }"><a href="#models" @click="closeMenu">⭐ 榜样人物</a></li>
          <li><a href="/党史学习/index.html" @click="closeMenu">📚 党史研究</a></li>
          <li class="mobile-menu-divider"></li>
          <li v-if="isLoggedIn" :class="{ active: isActive('/profile') }"><router-link to="/profile" @click="closeMenu">👤 我的</router-link></li>
          <li v-else><a href="/登录/login.html" @click="closeMenu">🔐 登录</a></li>
          <li v-if="!isLoggedIn"><a href="/登录/login.html" @click="closeMenu">✍️ 注册</a></li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const isLoggedIn = ref(false);
const isScrolled = ref(false);
const isMobile = ref(false);
const menuOpen = ref(false);

// 检测登录状态
const checkLoginStatus = () => {
  isLoggedIn.value = localStorage.getItem('isLoggedIn') === 'true';
};

// 检测滚动状态
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

// 检测屏幕尺寸
const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 768;
  if (isMobile.value) {
    menuOpen.value = false;
  }
};

// 切换菜单
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

// 关闭菜单
const closeMenu = () => {
  menuOpen.value = false;
};

// 检测当前激活的导航项
const isActive = (path) => {
  if (path.startsWith('#')) {
    // 处理锚点链接
    return window.location.hash === path;
  } else {
    // 处理路由链接
    return route.path === path;
  }
};

onMounted(() => {
  checkLoginStatus();
  checkScreenSize();
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', checkScreenSize);
  // 监听hash变化
  window.addEventListener('hashchange', () => {
    // 当hash变化时，不需要做特殊处理，isActive函数会自动检测
  });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', checkScreenSize);
  window.removeEventListener('hashchange', () => {});
});

// 监听路由变化，重新检查登录状态
watch(() => route.path, () => {
  checkLoginStatus();
  closeMenu();
});
</script>

<style scoped>
/* 导航栏样式 */
.navbar {
  background: linear-gradient(135deg, var(--primary-red), var(--primary-red-dark));
  color: var(--white);
  padding: 15px 0;
  box-shadow: var(--shadow);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(0);
  padding-top: env(safe-area-inset-top);
}

/* 滚动效果 */
.navbar.navbar-scrolled {
  padding: 8px 0;
  background: linear-gradient(135deg, rgba(194, 30, 39, 0.98), rgba(168, 26, 34, 0.98));
  box-shadow: var(--shadow-lg);
  backdrop-filter: blur(15px);
  transform: translateY(0);
}

/* 菜单打开状态 */
.navbar.navbar-menu-open {
  background: linear-gradient(135deg, var(--primary-red-dark), var(--primary-red));
  box-shadow: var(--shadow-xl);
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Logo样式 */
.logo-container {
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.navbar.navbar-scrolled .logo-container {
  gap: 8px;
}

.logo-icon {
  font-size: 1.8rem;
  animation: pulse 2s ease-in-out infinite;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
}

.navbar.navbar-scrolled .logo-icon {
  font-size: 1.6rem;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
  }
  50% {
    transform: scale(1.1);
    text-shadow: 0 0 30px rgba(255, 215, 0, 0.8);
  }
}

.logo-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.navbar-logo h1 {
  margin: 0;
  font-size: 1.6rem;
  color: var(--white);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 700;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  position: relative;
  display: inline-block;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.navbar-logo h1::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--gold);
  transition: width 0.3s ease;
}

.navbar-logo a:hover h1::after {
  width: 100%;
}

.navbar.navbar-scrolled .navbar-logo h1 {
  font-size: 1.4rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.navbar-subtitle {
  margin: 2px 0 0 0;
  font-size: 0.8rem;
  color: var(--gold-light);
  font-weight: 400;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  opacity: 1;
}

.navbar.navbar-scrolled .navbar-subtitle {
  font-size: 0.7rem;
  opacity: 0.9;
}

.navbar-logo a {
  color: var(--white);
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 15px;
  position: relative;
  overflow: hidden;
}

.navbar-logo a::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s ease, height 0.6s ease;
}

.navbar-logo a:hover::before {
  width: 300px;
  height: 300px;
}

.navbar-logo a:hover {
  color: var(--gold-light);
  transform: translateY(-3px);
}

/* 桌面导航 */
.navbar-nav ul {
  list-style: none;
  display: flex;
  gap: 5px;
  margin: 0;
  padding: 0;
  flex-wrap: nowrap;
  overflow: hidden;
}

.navbar-nav li {
  margin: 0;
  position: relative;
  perspective: 1000px;
  white-space: nowrap;
}

/* 激活状态 */
.navbar-nav li.active a {
  background-color: var(--primary-red-dark);
  color: var(--gold-light);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  transform: translateY(-2px);
}

.navbar-nav li.active a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 3px;
  background: linear-gradient(90deg, var(--gold-light), var(--gold), var(--gold-light));
  border-radius: var(--radius-sm);
  animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
}

@keyframes slideIn {
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 80%;
    opacity: 1;
  }
}

.navbar-nav a {
  color: var(--white);
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: inline-block;
  transform-style: preserve-3d;
  transform: translateZ(0);
  white-space: nowrap;
}

.navbar-nav a.login-btn {
  background-color: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 8px 20px;
  border-radius: 20px;
}

.navbar-nav a.login-btn:hover {
  background-color: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}

.navbar-nav a::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
}

.navbar-nav a:hover::before {
  left: 100%;
}

.navbar-nav a:hover {
  background-color: var(--primary-red-dark);
  color: var(--gold-light);
  transform: translateY(-4px) translateZ(20px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  text-decoration: none;
}

.navbar-nav a:hover::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-sm);
  animation: pulse-light 1.5s ease-in-out infinite;
}

@keyframes pulse-light {
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

/* 移动端菜单按钮 */
.menu-toggle {
  display: none;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-sm);
  cursor: pointer;
  padding: 12px;
  z-index: 1001;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.menu-toggle::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s ease, height 0.6s ease;
}

.menu-toggle:hover::before {
  width: 200px;
  height: 200px;
}

.menu-toggle:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05) rotate(5deg);
  border-color: rgba(255, 255, 255, 0.3);
}

.menu-toggle.active {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1) rotate(0deg);
}

.menu-icon {
  display: block;
  width: 24px;
  height: 2px;
  background-color: var(--white);
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
}

.menu-icon::before,
.menu-icon::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 2px;
  background-color: var(--white);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
}

.menu-icon::before {
  top: -8px;
}

.menu-icon::after {
  bottom: -8px;
}

.menu-toggle.active .menu-icon {
  background-color: transparent;
  box-shadow: none;
}

.menu-toggle.active .menu-icon::before {
  transform: rotate(45deg) scale(1.1);
  top: 0;
  background-color: var(--white);
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
}

.menu-toggle.active .menu-icon::after {
  transform: rotate(-45deg) scale(1.1);
  bottom: 0;
  background-color: var(--white);
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
}

/* 移动端导航菜单 */
.mobile-menu {
  background: linear-gradient(135deg, var(--primary-red), var(--primary-red-dark));
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  box-shadow: var(--shadow-xl);
  z-index: 999;
  animation: slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  max-height: 80vh;
  overflow-y: auto;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px) scaleY(0.9);
    box-shadow: none;
  }
  to {
    opacity: 1;
    transform: translateY(0) scaleY(1);
    box-shadow: var(--shadow-xl);
  }
}

/* 移动端菜单头部 */
.mobile-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(168, 26, 34, 0.9);
  backdrop-filter: blur(15px);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.mobile-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--white);
  font-weight: 600;
  font-size: 1.2rem;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.mobile-logo .logo-icon {
  font-size: 1.5rem;
  animation: pulse 2s ease-in-out infinite;
  text-shadow: 0 0 15px rgba(255, 215, 0, 0.6);
}

.close-btn {
  background: none;
  border: none;
  color: var(--white);
  font-size: 1.8rem;
  cursor: pointer;
  padding: 5px 10px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  border-radius: 50%;
}

.close-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s ease, height 0.6s ease;
}

.close-btn:hover::before {
  width: 100px;
  height: 100px;
}

.close-btn:hover {
  color: var(--gold-light);
  transform: scale(1.2) rotate(90deg);
  text-shadow: 0 0 10px rgba(212, 175, 55, 0.8);
}

.mobile-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.mobile-menu li {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.mobile-menu li:last-child {
  border-bottom: none;
}

/* 移动端激活状态 */
.mobile-menu li.active {
  background-color: var(--primary-red-dark);
  transform: translateX(5px);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.mobile-menu li.active a {
  color: var(--gold-light);
  padding-left: 25px;
  font-weight: 600;
  text-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
}

.mobile-menu li.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(180deg, var(--gold-light), var(--gold), var(--gold-light));
  box-shadow: 0 0 10px rgba(212, 175, 55, 0.8);
}

.mobile-menu a {
  display: block;
  padding: 18px 20px;
  color: var(--white);
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  transform: translateZ(0);
}

.mobile-menu a::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(180deg, var(--gold-light), var(--gold), var(--gold-light));
  transform: scaleY(0);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
}

.mobile-menu a:hover::before {
  transform: scaleY(1);
}

.mobile-menu a::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-menu a:hover::after {
  left: 100%;
}

.mobile-menu a:hover {
  background-color: var(--primary-red-dark);
  color: var(--gold-light);
  padding-left: 25px;
  transform: translateX(10px) translateZ(10px);
  text-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
}

/* 响应式调整 */
@media (max-width: 992px) {
  .navbar-nav ul {
    gap: 20px;
  }
  
  .navbar-nav a {
    padding: 10px 15px;
    font-size: 0.95rem;
  }
  
  .navbar-title {
    font-size: 1.6rem;
  }
  
  .navbar-subtitle {
    font-size: 0.8rem;
  }
}

@media (max-width: 768px) {
  .navbar-nav {
    display: none;
  }
  
  .menu-toggle {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    min-height: 48px;
  }
  
  .menu-text {
    font-size: 14px;
    font-weight: 500;
  }
  
  .navbar-content {
    flex-direction: row;
    align-items: center;
  }
  
  .navbar-logo {
    flex: 1;
  }
  
  .logo-container {
    gap: 10px;
  }
  
  .logo-icon {
    font-size: 1.8rem;
  }
  
  .navbar-title {
    font-size: 1.5rem;
  }
  
  .navbar-subtitle {
    font-size: 0.75rem;
    display: none;
  }
  
  .navbar {
    padding: 12px 0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  }
  
  .navbar.navbar-scrolled {
    padding: 8px 0;
  }
  
  .mobile-menu {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
    max-height: calc(100vh - 60px);
    overflow-y: auto;
    z-index: 999;
    border-radius: 0;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
  
  .mobile-menu-header {
    position: sticky;
    top: 0;
    z-index: 100;
    backdrop-filter: blur(20px);
  }
  
  .mobile-menu-list {
    padding: 10px 0;
  }
  
  .mobile-menu-list li {
    padding: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
  
  .mobile-menu-list li:last-child {
    border-bottom: none;
  }
  
  .mobile-menu-list a {
    padding: 18px 20px;
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .mobile-menu-divider {
    height: 20px;
    background: rgba(255, 255, 255, 0.05);
    border-bottom: none;
  }
  
  .mobile-menu-divider a {
    display: none;
  }
}

@media (max-width: 480px) {
  .logo-container {
    gap: 8px;
  }
  
  .logo-icon {
    font-size: 1.5rem;
  }
  
  .navbar-title {
    font-size: 1.2rem;
  }
  
  .navbar-subtitle {
    font-size: 0.65rem;
    display: none;
  }
  
  .menu-toggle {
    padding: 10px 14px;
    min-height: 44px;
  }
  
  .menu-icon {
    width: 20px;
  }
  
  .menu-icon::before,
  .menu-icon::after {
    width: 20px;
  }
  
  .menu-text {
    font-size: 13px;
  }
  
  .navbar {
    padding: 10px 0;
  }
  
  .mobile-menu {
    top: 56px;
    max-height: calc(100vh - 56px);
  }
  
  .mobile-menu-list a {
    padding: 16px 15px;
    font-size: 15px;
    gap: 10px;
  }
  
  .mobile-logo {
    font-size: 1.1rem;
  }
  
  .close-btn {
    font-size: 1.6rem;
    padding: 4px 8px;
  }
}

@media (max-width: 360px) {
  .navbar-title {
    font-size: 1.1rem;
  }
  
  .logo-icon {
    font-size: 1.4rem;
  }
  
  .menu-text {
    display: none;
  }
  
  .menu-toggle {
    padding: 10px;
  }
}

/* 动画效果 */
@media (prefers-reduced-motion: no-preference) {
  .navbar-nav li {
    animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    opacity: 0;
    transform: translateY(-20px);
  }
  
  .navbar-nav li:nth-child(1) { animation-delay: 0.1s; }
  .navbar-nav li:nth-child(2) { animation-delay: 0.2s; }
  .navbar-nav li:nth-child(3) { animation-delay: 0.3s; }
  .navbar-nav li:nth-child(4) { animation-delay: 0.4s; }
  .navbar-nav li:nth-child(5) { animation-delay: 0.5s; }
  .navbar-nav li:nth-child(6) { animation-delay: 0.6s; }
  .navbar-nav li:nth-child(7) { animation-delay: 0.7s; }
  .navbar-nav li:nth-child(8) { animation-delay: 0.8s; }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(-20px) translateZ(0);
  }
  to {
    opacity: 1;
    transform: translateY(0) translateZ(0);
  }
}

/* 滚动条样式 */
.mobile-menu::-webkit-scrollbar {
  width: 8px;
}

.mobile-menu::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-sm);
}

.mobile-menu::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, var(--gold-light), var(--gold));
  border-radius: var(--radius-sm);
  box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
  transition: all 0.3s ease;
}

.mobile-menu::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, var(--gold), var(--gold-light));
  box-shadow: 0 0 15px rgba(212, 175, 55, 0.8);
  transform: scale(1.1);
}

/* 导航栏加载动画 */
@keyframes navbarLoad {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.navbar {
  animation: navbarLoad 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
</style>