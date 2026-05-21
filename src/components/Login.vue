<template>
  <div class="login-wrapper">
    <!-- 星星背景 -->
    <span v-for="i in 20" :key="i" class="star"></span>

    <!-- 最外层的大盒子 -->
    <div class="box">
      <!-- 滑动盒子 -->
      <div class="pre-box" :class="{ 'slide-right': showRegister }">
        <h1>WELCOME</h1>
        <p>JOIN US!</p>
        <div class="img-box">
          <img :src="showRegister ? '../../绝美/img/wuwu.jpeg' : '../../绝美/img/waoku.jpg'" alt="">
        </div>
      </div>

      <!-- 登录盒子 -->
      <div class="login-form" v-if="!showRegister">
        <!-- 标题盒子 -->
        <div class="title-box">
          <h1>登录</h1>
        </div>
        <!-- 输入框盒子 -->
        <div class="input-box">
          <input type="text" placeholder="用户名" v-model="loginForm.username" required />
          <input type="password" placeholder="密码" v-model="loginForm.password" required />
        </div>
        <!-- 按钮盒子 -->
        <div class="btn-box">
          <button @click="handleLogin">登录</button>
          <p @click="showRegister = true">没有账号?去注册</p>
        </div>
      </div>

      <!-- 注册盒子 -->
      <div class="register-form" v-if="showRegister">
        <!-- 标题盒子 -->
        <div class="title-box">
          <h1>注册</h1>
        </div>
        <!-- 输入框盒子 -->
        <div class="input-box">
          <input type="text" placeholder="用户名" v-model="registerForm.username" required />
          <input type="password" placeholder="密码" v-model="registerForm.password" required />
          <input type="password" placeholder="确认密码" v-model="registerForm.confirmPassword" required />
        </div>
        <!-- 按钮盒子 -->
        <div class="btn-box">
          <button @click="handleRegister">注册</button>
          <p @click="showRegister = false">已有账号?去登录</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onMounted as onMountedVue } from 'vue';

const showRegister = ref(false);

// 处理登录
const handleLogin = () => {
  // 跳转到HTML登录页面
  window.location.href = './绝美/login.html';
};

// 处理注册
const handleRegister = () => {
  // 跳转到HTML登录页面
  window.location.href = './绝美/login.html';
};

onMounted(() => {
  const createStar = () => {
    const star = document.createElement('span');
    star.className = 'star';
    star.style.left = Math.random() * window.innerWidth + 'px';
    star.style.animationDelay = Math.random() * 4 + 's';
    document.querySelector('.login-wrapper').appendChild(star);

    setTimeout(() => {
      star.remove();
    }, 4000);
  };

  setInterval(createStar, 200);
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

input {
  outline: none;
}

.login-wrapper {
  height: 100vh;
  overflow-x: hidden;
  display: flex;
  position: relative;
}

/* 视频背景 */
.bg-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

span {
  position: absolute;
  z-index: 0;
  bottom: 0;
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  background: #ffd700;
  box-shadow: 0 0 10px #ffd700, 0 0 20px #ffd700;
  animation: myMove 4s linear infinite;
}

@keyframes myMove {
  0% {
    transform: translateY(0%);
    opacity: 1;
  }

  50% {
    transform: translate(10%, -1000%);
  }

  75% {
    transform: translate(-20%, -1200%);
  }

  99% {
    opacity: .9;
  }

  100% {
    transform: translateY(-1800%) scale(1.5);
    opacity: 0;
  }
}

.box {
  width: 1050px;
  height: 600px;
  display: flex;
  position: relative;
  z-index: 2;
  margin: auto;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, .6);
  box-shadow: 2px 1px 19px rgba(0, 0, 0, .1);
}

.pre-box {
  width: 50%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 99;
  border-radius: 4px;
  background-color: #edd4dc;
  box-shadow: 2px 1px 19px rgba(0, 0, 0, .1);
  transition: 0.5s ease-in-out;
}

.pre-box.slide-right {
  transform: translateX(100%);
  background-color: #c9e0ed;
}

.pre-box h1 {
  margin-top: 150px;
  text-align: center;
  letter-spacing: 5px;
  color: white;
  user-select: none;
  text-shadow: 4px 4px 3px rgba(0, 0, 0, .1);
}

.pre-box p {
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin: 20px 0;
  user-select: none;
  font-weight: bold;
  color: white;
  text-shadow: 4px 4px 3px rgba(0, 0, 0, .1);
}

.img-box {
  width: 200px;
  height: 200px;
  margin: 20px auto;
  border-radius: 50%;
  user-select: none;
  overflow: hidden;
  box-shadow: 4px 4px 3px rgba(0, 0, 0, .1);
}

.img-box img {
  width: 100%;
  transition: 0.5s;
}

.login-form,
.register-form {
  flex: 1;
  height: 100%;
}

.title-box {
  height: 300px;
  line-height: 500px;
}

.title-box h1 {
  text-align: center;
  color: white;
  user-select: none;
  letter-spacing: 5px;
  text-shadow: 4px 4px 3px rgba(0, 0, 0, .1);
}

.input-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-box input {
  width: 60%;
  height: 40px;
  margin-bottom: 20px;
  text-indent: 10px;
  border: 1px solid #fff;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 120px;
  backdrop-filter: blur(10px);
}

.input-box input:focus {
  color: #b0cfe9;
}

.input-box input:focus::placeholder {
  opacity: 0;
}

.btn-box {
  display: flex;
  justify-content: center;
}

.btn-box button {
  width: 100px;
  height: 30px;
  margin: 0 7px;
  line-height: 30px;
  border: none;
  border-radius: 4px;
  background-color: #69b3f0;
  color: white;
}

.btn-box button:hover {
  cursor: pointer;
  opacity: .8;
}

.btn-box p {
  height: 30px;
  line-height: 30px;
  user-select: none;
  font-size: 14px;
  color: white;
}

.btn-box p:hover {
  cursor: pointer;
  border-bottom: 1px solid white;
}
</style>
