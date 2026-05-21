<template>
  <div class="profile-container">
    <div class="container">
      <h2>个人中心</h2>
      
      <div class="profile-card">
        <div class="profile-header">
          <div class="profile-avatar">
            <div class="avatar-container">
              <img v-if="user.avatar" :src="user.avatar" alt="用户头像" class="avatar-image" />
              <div v-else class="avatar-placeholder">
                <span>{{ user.username.charAt(0).toUpperCase() }}</span>
              </div>
              <input type="file" id="avatar-upload" class="avatar-upload" accept="image/*" @change="handleAvatarUpload" />
              <label for="avatar-upload" class="avatar-upload-label">
                <span>修改头像</span>
              </label>
            </div>
          </div>
          <div class="profile-info">
            <h3>{{ user.username }}</h3>
            <p class="profile-email">{{ user.email || '未设置邮箱' }}</p>
            <div class="profile-badge" v-if="user.politicalStatus">
              {{ user.politicalStatus }}
            </div>
          </div>
        </div>
        
        <div class="profile-body">
          <div class="profile-section">
            <h4>基本信息</h4>
            <div class="info-item">
              <label>政治面貌：</label>
              <span>{{ user.politicalStatus || '未设置' }}</span>
              <button class="edit-btn" @click="editField('politicalStatus')">编辑</button>
            </div>
            <div class="info-item">
              <label>姓名：</label>
              <span>{{ user.name || '未设置' }}</span>
              <button class="edit-btn" @click="editField('name')">编辑</button>
            </div>
            <div class="info-item">
              <label>性别：</label>
              <span>{{ user.gender || '未设置' }}</span>
              <button class="edit-btn" @click="editField('gender')">编辑</button>
            </div>
            <div class="info-item">
              <label>年龄：</label>
              <span>{{ user.age || '未设置' }}</span>
              <button class="edit-btn" @click="editField('age')">编辑</button>
            </div>
            <div class="info-item">
              <label>联系电话：</label>
              <span>{{ user.phone || '未设置' }}</span>
              <button class="edit-btn" @click="editField('phone')">编辑</button>
            </div>
          </div>
          
          <div class="profile-section">
            <h4>账号设置</h4>
            <div class="info-item">
              <label>用户名：</label>
              <span>{{ user.username }}</span>
            </div>
            <div class="info-item">
              <label>邮箱：</label>
              <span>{{ user.email || '未设置' }}</span>
              <button class="edit-btn" @click="editField('email')">编辑</button>
            </div>
            <div class="info-item">
              <label>密码：</label>
              <span>••••••••</span>
              <button class="edit-btn" @click="editField('password')">修改密码</button>
            </div>
          </div>
          
          <div class="profile-actions">
            <button class="btn btn-primary" @click="saveProfile">保存修改</button>
            <button class="btn btn-secondary" @click="logout">退出登录</button>
          </div>
        </div>
      </div>
      
      <!-- 学习进度 -->
      <LearningProgress />
      
      <!-- 我的收藏 -->
      <Favorites />
      
      <!-- 我的笔记 -->
      <Notes />
    </div>
    
    <!-- 编辑弹窗 -->
    <div v-if="showEditModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ modalTitle }}</h3>
          <button class="close-btn" @click="closeModal">&times;</button>
        </div>
        <div class="modal-body">
          <!-- 政治面貌选择 -->
          <div v-if="currentField === 'politicalStatus'" class="form-group">
            <label>政治面貌</label>
            <select v-model="editValue" class="form-control">
              <option value="党员">党员</option>
              <option value="团员">团员</option>
              <option value="群众">群众</option>
              <option value="其他">其他</option>
            </select>
          </div>
          
          <!-- 姓名输入 -->
          <div v-else-if="currentField === 'name'" class="form-group">
            <label>姓名</label>
            <input type="text" v-model="editValue" class="form-control" placeholder="请输入姓名">
          </div>
          
          <!-- 性别选择 -->
          <div v-else-if="currentField === 'gender'" class="form-group">
            <label>性别</label>
            <select v-model="editValue" class="form-control">
              <option value="男">男</option>
              <option value="女">女</option>
            </select>
          </div>
          
          <!-- 年龄输入 -->
          <div v-else-if="currentField === 'age'" class="form-group">
            <label>年龄</label>
            <input type="number" v-model.number="editValue" class="form-control" placeholder="请输入年龄" min="0" max="100">
            <div v-if="ageError" class="error-message">{{ ageError }}</div>
          </div>
          
          <!-- 电话输入 -->
          <div v-else-if="currentField === 'phone'" class="form-group">
            <label>联系电话</label>
            <input type="tel" v-model="editValue" class="form-control" placeholder="请输入11位手机号">
            <div v-if="phoneError" class="error-message">{{ phoneError }}</div>
          </div>
          
          <!-- 邮箱输入 -->
          <div v-else-if="currentField === 'email'" class="form-group">
            <label>邮箱</label>
            <input type="email" v-model="editValue" class="form-control" placeholder="请输入邮箱">
          </div>
          
          <!-- 密码输入 -->
          <div v-else-if="currentField === 'password'" class="form-group">
            <label>新密码</label>
            <input type="password" v-model="editValue" class="form-control" placeholder="请输入新密码">
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeModal">取消</button>
          <button class="btn btn-primary" @click="saveEdit">保存</button>
        </div>
      </div>
    </div>
    
    <!-- 成功提示 -->
    <div v-if="showSuccess" class="success-toast">
      {{ successMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import LearningProgress from './LearningProgress.vue';
import Favorites from './Favorites.vue';
import Notes from './Notes.vue';

const router = useRouter();
const user = ref({
  username: '',
  email: '',
  politicalStatus: '群众',
  name: '',
  gender: '',
  age: '',
  phone: '',
  avatar: ''
});

// 编辑弹窗相关状态
const showEditModal = ref(false);
const currentField = ref('');
const editValue = ref('');
const ageError = ref('');
const phoneError = ref('');

// 成功提示相关状态
const showSuccess = ref(false);
const successMessage = ref('');

// 弹窗标题
const modalTitle = computed(() => {
  const titles = {
    politicalStatus: '编辑政治面貌',
    name: '编辑姓名',
    gender: '编辑性别',
    age: '编辑年龄',
    phone: '编辑联系电话',
    email: '编辑邮箱',
    password: '修改密码'
  };
  return titles[currentField.value] || '编辑信息';
});

onMounted(() => {
  // 从localStorage获取登录状态
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (!isLoggedIn) {
    // 如果没有登录状态，跳转到登录页
    router.push('/login');
    return;
  }
  
  // 从localStorage获取用户信息
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    user.value = JSON.parse(storedUser);
  } else {
    // 如果没有完整的用户信息，从localStorage获取username
    const username = localStorage.getItem('username');
    if (username) {
      user.value.username = username;
    } else {
      // 如果没有username，跳转到登录页
      router.push('/login');
    }
  }
});

const editField = (field) => {
  // 设置当前编辑字段
  currentField.value = field;
  // 设置编辑值
  editValue.value = user.value[field] || '';
  // 清空错误信息
  ageError.value = '';
  phoneError.value = '';
  // 显示弹窗
  showEditModal.value = true;
};

const closeModal = () => {
  // 关闭弹窗
  showEditModal.value = false;
  // 清空错误信息
  ageError.value = '';
  phoneError.value = '';
};

const showSuccessToast = (message) => {
  successMessage.value = message;
  showSuccess.value = true;
  setTimeout(() => {
    showSuccess.value = false;
  }, 3000);
};

const saveEdit = () => {
  // 验证年龄
  if (currentField.value === 'age') {
    if (editValue.value < 0 || editValue.value > 100) {
      ageError.value = '年龄不能大于100岁';
      return;
    }
  }
  
  // 验证电话
  if (currentField.value === 'phone') {
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(editValue.value)) {
      phoneError.value = '请输入11位有效手机号';
      return;
    }
  }
  
  // 保存编辑值
  user.value[currentField.value] = editValue.value;
  // 保存到localStorage
  localStorage.setItem('user', JSON.stringify(user.value));
  // 关闭弹窗
  closeModal();
  // 显示成功提示
  showSuccessToast('修改成功');
};

const handleAvatarUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    // 使用FileReader读取文件
    const reader = new FileReader();
    reader.onload = (e) => {
      user.value.avatar = e.target.result;
      // 保存到localStorage
      localStorage.setItem('user', JSON.stringify(user.value));
      // 显示成功提示
      showSuccessToast('头像更新成功');
    };
    reader.readAsDataURL(file);
  }
};

const saveProfile = () => {
  // 保存用户信息到localStorage
  localStorage.setItem('user', JSON.stringify(user.value));
  showSuccessToast('个人信息已保存');
};

const logout = () => {
  // 清除localStorage中的用户信息
  localStorage.removeItem('user');
  localStorage.removeItem('isLoggedIn');
  // 跳转到登录页
  router.push('/login');
};
</script>

<style scoped>
.profile-container {
  min-height: 80vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 40px 0;
  position: relative;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.profile-container h2 {
  color: var(--primary-red);
  margin-bottom: 30px;
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: fadeInUp 0.6s ease-out;
}

.profile-card {
  background-color: var(--white);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  animation: fadeIn 0.8s ease-out;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.profile-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.profile-header {
  display: flex;
  align-items: center;
  padding: 40px;
  border-bottom: 1px solid #e0e0e0;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  position: relative;
  overflow: hidden;
}

.profile-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-red), var(--primary-red-light));
}

.profile-avatar {
  margin-right: 30px;
  position: relative;
  z-index: 1;
}

.avatar-container {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid var(--primary-red);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.avatar-container:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.avatar-container:hover .avatar-image {
  transform: scale(1.1);
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-red), var(--primary-red-light));
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: bold;
  transition: background 0.3s ease;
}

.avatar-upload {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 2;
}

.avatar-upload-label {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: var(--white);
  text-align: center;
  padding: 15px 0 5px;
  font-size: 0.8rem;
  cursor: pointer;
  z-index: 1;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(100%);
}

.avatar-container:hover .avatar-upload-label {
  opacity: 1;
  transform: translateY(0);
}

.profile-info {
  position: relative;
  z-index: 1;
  flex: 1;
}

.profile-info h3 {
  margin: 0 0 10px 0;
  color: var(--gray-dark);
  font-size: 1.5rem;
  font-weight: 600;
}

.profile-email {
  margin: 0 0 15px 0;
  color: var(--gray);
  font-size: 1rem;
}

.profile-badge {
  display: inline-block;
  padding: 5px 15px;
  background: linear-gradient(135deg, var(--primary-red), var(--primary-red-light));
  color: var(--white);
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(244, 67, 54, 0.3);
  animation: pulse 2s infinite;
}

.profile-body {
  padding: 40px;
}

.profile-section {
  margin-bottom: 40px;
  animation: fadeInUp 0.6s ease-out;
}

.profile-section:nth-child(2) {
  animation-delay: 0.2s;
}

.profile-section h4 {
  margin: 0 0 25px 0;
  color: var(--gray-dark);
  border-bottom: 3px solid var(--primary-red-light);
  padding-bottom: 12px;
  font-size: 1.2rem;
  font-weight: 600;
  position: relative;
}

.profile-section h4::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 80px;
  height: 3px;
  background-color: var(--primary-red);
}

.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
}

.info-item:hover {
  transform: translateX(5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-left-color: var(--primary-red);
}

.info-item label {
  width: 120px;
  font-weight: 500;
  color: var(--gray-dark);
  font-size: 1rem;
}

.info-item span {
  flex: 1;
  color: var(--gray);
  font-size: 1rem;
}

.edit-btn {
  background: transparent;
  border: 2px solid var(--primary-red);
  color: var(--primary-red);
  padding: 8px 16px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.edit-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(244, 67, 54, 0.2), transparent);
  transition: left 0.5s ease;
  z-index: -1;
}

.edit-btn:hover::before {
  left: 100%;
}

.edit-btn:hover {
  background-color: var(--primary-red);
  color: var(--white);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(244, 67, 54, 0.3);
}

.profile-actions {
  display: flex;
  gap: 20px;
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid #e0e0e0;
  animation: fadeInUp 0.6s ease-out 0.4s both;
}

@media (max-width: 768px) {
  .profile-container {
    padding: 20px 0;
  }
  
  .profile-header {
    flex-direction: column;
    text-align: center;
    padding: 30px 20px;
  }
  
  .profile-avatar {
    margin-right: 0;
    margin-bottom: 25px;
  }
  
  .avatar-container {
    width: 100px;
    height: 100px;
  }
  
  .profile-body {
    padding: 20px;
  }
  
  .info-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 15px;
  }
  
  .info-item label {
    width: 100%;
  }
  
  .profile-actions {
    flex-direction: column;
  }
  
  .profile-actions button {
    width: 100%;
  }
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
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background-color: var(--white);
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  animation: slideIn 0.3s ease;
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px;
  border-bottom: 1px solid #e0e0e0;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.modal-header h3 {
  margin: 0;
  color: var(--primary-red);
  font-size: 1.2rem;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--gray);
  transition: all 0.3s ease;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.close-btn:hover {
  color: var(--primary-red);
  background-color: rgba(244, 67, 54, 0.1);
  transform: rotate(90deg);
}

.modal-body {
  padding: 30px 25px;
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  margin-bottom: 10px;
  font-weight: 500;
  color: var(--gray-dark);
  font-size: 1rem;
}

.form-control {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: #f8f9fa;
}

.form-control:focus {
  outline: none;
  border-color: var(--primary-red);
  box-shadow: 0 0 0 4px rgba(244, 67, 54, 0.1);
  background-color: var(--white);
}

.error-message {
  color: #f44336;
  font-size: 0.875rem;
  margin-top: 8px;
  animation: shake 0.3s ease;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  padding: 20px 25px;
  border-top: 1px solid #e0e0e0;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
  z-index: -1;
}

.btn:hover::before {
  left: 100%;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary-red), var(--primary-red-light));
  color: var(--white);
  box-shadow: 0 4px 12px rgba(244, 67, 54, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(244, 67, 54, 0.4);
}

.btn-secondary {
  background: linear-gradient(135deg, #6c757d, #5a6268);
  color: var(--white);
  box-shadow: 0 4px 12px rgba(108, 117, 125, 0.3);
}

.btn-secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(108, 117, 125, 0.4);
}

/* 成功提示样式 */
.success-toast {
  position: fixed;
  top: 20px;
  right: 20px;
  background: linear-gradient(135deg, #4caf50, #45a049);
  color: var(--white);
  padding: 15px 25px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
  z-index: 1001;
  animation: slideInRight 0.3s ease, fadeOut 3s ease 2.7s both;
  font-weight: 500;
}

/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-30px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 2px 8px rgba(244, 67, 54, 0.3);
  }
  50% {
    box-shadow: 0 4px 16px rgba(244, 67, 54, 0.5);
  }
  100% {
    box-shadow: 0 2px 8px rgba(244, 67, 54, 0.3);
  }
}
</style>