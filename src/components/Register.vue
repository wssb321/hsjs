<template>
  <div class="register-container">
    <!-- 星星元素 -->
    <span v-for="i in 20" :key="i" class="star"></span>
    
    <div class="box">
      <!-- 滑动盒子 -->
      <div class="pre-box" style="transform: translateX(100%); background-color: #c9e0ed;">
        <h1>WELCOME</h1>
        <p>JOIN US!</p>
        <div class="img-box">
          <img src="../../image/习近平著作.jpg" alt="" />
        </div>
      </div>
      <!-- 注册盒子 -->
      <div class="register-form">
        <!-- 标题盒子 -->
        <div class="title-box">
          <h1>注册</h1>
        </div>
        <!-- 输入框盒子 -->
        <div class="input-box">
          <input type="text" placeholder="用户名" v-model="username" required />
          <input type="email" placeholder="邮箱" v-model="email" required />
          <input type="password" placeholder="密码" v-model="password" required />
          <input type="password" placeholder="确认密码" v-model="confirmPassword" required />
        </div>
        <!-- 按钮盒子 -->
        <div class="btn-box">
          <button type="button" @click="handleRegister">注册</button>
          <!-- 绑定点击事件 -->
          <p @click="goToLogin">已有账号?去登录</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const handleRegister = () => {
  // 跳转到login.html文件
  window.location.href = '/登录/login.html';
};

const goToLogin = () => {
  router.push('/login');
};

// 动态创建星星
onMounted(() => {
  const createStar = () => {
    const star = document.createElement('span');
    star.className = 'star';
    star.style.left = Math.random() * window.innerWidth + 'px';
    star.style.animationDelay = Math.random() * 4 + 's';
    document.querySelector('.register-container').appendChild(star);
    
    setTimeout(() => {
      star.remove();
    }, 4000);
  };
  
  setInterval(createStar, 200);
});
</script>

<style scoped>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 去除input的轮廓 */
input {
  outline: none;
}

.register-container {
  height: 100vh;
  /* 溢出隐藏 */
  overflow-x: hidden;
  display: flex;
  /* 红色渐变背景 */
  background: linear-gradient(135deg, #e60012 0%, #8c000d 100%);
  /* 添加飘扬效果 */
  position: relative;
}

.register-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent);
  background-size: 50px 50px;
  animation: wave 20s linear infinite;
  z-index: 0;
}

@keyframes wave {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 50px 50px;
  }
}

/* 星星样式 */
.star {
  position: absolute;
  z-index: 0;
  bottom: 0;
  /* 星星形状 */
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  /* 星星颜色 */
  background: #ffd700;
  /* 星星阴影 */
  box-shadow: 0 0 10px #ffd700, 0 0 20px #ffd700;
  /* 动画 */
  animation: myMove 4s linear infinite;
  width: 20px;
  height: 20px;
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

/* 最外层的大盒子 */
.box {
  width: 1050px;
  height: 600px;
  display: flex;
  /* 相对定位 */
  position: relative;
  z-index: 2;
  margin: auto;
  /* 设置圆角 */
  border-radius: 8px;
  /* 设置边框 */
  border: 1px solid rgba(255, 255, 255, .6);
  /* 设置盒子阴影 */
  box-shadow: 2px 1px 19px rgba(0, 0, 0, .1);
}

/* 滑动的盒子 */
.pre-box {
  /* 宽度为大盒子的一半 */
  width: 50%;
  height: 100%;
  /* 绝对定位 */
  position: absolute;
  /* 距离大盒子左侧为0 */
  left: 0;
  /* 距离大盒子顶部为0 */
  top: 0;
  z-index: 99;
  border-radius: 4px;
  background-color: #edd4dc;
  box-shadow: 2px 1px 19px rgba(0, 0, 0, .1);
  /* 动画过渡，先加速再减速 */
  transition: 0.5s ease-in-out;
}

/* 滑动盒子的标题 */
.pre-box h1 {
  margin-top: 150px;
  text-align: center;
  /* 文字间距 */
  letter-spacing: 5px;
  color: white;
  /* 禁止选中 */
  user-select: none;
  /* 文字阴影 */
  text-shadow: 4px 4px 3px rgba(0, 0, 0, .1);
}

/* 滑动盒子的文字 */
.pre-box p {
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin: 20px 0;
  /* 禁止选中 */
  user-select: none;
  font-weight: bold;
  color: white;
  text-shadow: 4px 4px 3px rgba(0, 0, 0, .1);
}

/* 图片盒子 */
.img-box {
  width: 200px;
  height: 200px;
  margin: 20px auto;
  /* 设置为圆形 */
  border-radius: 50%;
  /* 设置用户禁止选中 */
  user-select: none;
  overflow: hidden;
  box-shadow: 4px 4px 3px rgba(0, 0, 0, .1);
}

/* 图片 */
.img-box img {
  width: 100%;
  transition: 0.5s;
}

/* 注册盒子 */
.register-form {
  flex: 1;
  height: 100%;
}

/* 标题盒子 */
.title-box {
  height: 200px;
  line-height: 400px;

}

/* 标题 */
.title-box h1 {
  text-align: center;
  color: white;
  /* 禁止选中 */
  user-select: none;
  letter-spacing: 5px;
  text-shadow: 4px 4px 3px rgba(0, 0, 0, .1);

}

/* 输入框盒子 */
.input-box {
  display: flex;
  /* 纵向布局 */
  flex-direction: column;
  /* 水平居中 */
  align-items: center;
}

/* 输入框 */
.input-box input {
  width: 60%;
  height: 40px;
  margin-bottom: 20px;
  text-indent: 10px;
  border: 1px solid #fff;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 120px;
  /* 增加磨砂质感 */
  backdrop-filter: blur(10px);
}

.input-box input:focus {
  /* 光标颜色 */
  color: #b0cfe9;

}

/* 聚焦时隐藏文字 */
.input-box input:focus::placeholder {
  opacity: 0;
}

/* 按钮盒子 */
.btn-box {
  display: flex;
  justify-content: center;
}

/* 按钮 */
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

/* 按钮悬停时 */
.btn-box button:hover {
  /* 鼠标小手 */
  cursor: pointer;
  /* 透明度 */
  opacity: .8;
}

/* 按钮文字 */
.btn-box p {
  height: 30px;
  line-height: 30px;
  /* 禁止选中 */
  user-select: none;
  font-size: 14px;
  color: white;

}

.btn-box p:hover {
  cursor: pointer;
  border-bottom: 1px solid white;
}
</style>