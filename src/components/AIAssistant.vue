<template>
  <section class="section ai-assistant-section" id="ai-assistant">
    <div class="section-header">
      <h2>AI智能问答助手</h2>
      <p class="section-subtitle">党史知识，随时解答</p>
    </div>
    <div class="chat-container">
      <!-- 聊天头部 -->
      <div class="chat-header">
        <div class="chat-title">
          <div class="chat-icon">🤖</div>
          <span>赓续文脉AI助手</span>
        </div>
        <div class="chat-status">
          <span class="status-indicator"></span>
          <span>在线</span>
        </div>
      </div>
      
      <!-- 聊天消息区域 -->
      <div class="chat-messages" ref="messagesContainer">
        <div 
          v-for="(message, index) in messages" 
          :key="index" 
          :class="['message', message.type]"
        >
          <div class="message-content">
            {{ message.content }}
          </div>
          <div class="message-time">{{ message.timestamp }}</div>
        </div>
        <div v-if="isLoading" class="loading-message">
          <div class="loading-spinner"></div>
          <span>AI正在思考...</span>
        </div>
      </div>
      
      <!-- 常见问题快捷按钮 -->
      <div class="quick-questions" v-if="showQuickQuestions">
        <button 
          v-for="(question, index) in quickQuestions" 
          :key="index" 
          class="quick-question-btn"
          @click="selectQuickQuestion(question)"
        >
          {{ question }}
        </button>
      </div>
      
      <!-- 聊天输入区域 -->
      <div class="chat-input">
        <input 
          type="text" 
          v-model="userInput" 
          placeholder="请输入您的问题..." 
          @keyup.enter="sendMessage" 
          :disabled="isLoading"
          class="input-field"
        />
        <button 
          @click="sendMessage" 
          :disabled="isLoading"
          class="send-button"
        >
          <span v-if="!isLoading">发送</span>
          <div v-else class="button-spinner"></div>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue';
import axios from 'axios';

// 聊天消息
const messages = ref([
  {
    type: 'ai',
    content: '您好！我是红色AI助手，有什么可以帮您了解的党史知识吗？',
    timestamp: new Date().toLocaleTimeString()
  }
]);

// 用户输入
const userInput = ref('');

// 加载状态
const isLoading = ref(false);

// 显示快捷问题
const showQuickQuestions = ref(true);

// 常见问题
const quickQuestions = [
  '中国共产党成立于哪一年？',
  '党的二十大是什么时候召开的？',
  '改革开放始于哪一年？',
  '中华人民共和国成立的时间？',
  '党史学习教育的重要意义？'
];

// 消息容器引用
const messagesContainer = ref(null);

// API配置 - 百度千帆 (国内模型)
const QIANFAN_API_KEY = 'bce-v3/ALTAK-Ks0Snaf7BlCktdegrk9yh/02f1a0225a96991b52c1ad56b57d38a660714c48'; // 用户提供的千帆接口API Key
const QIANFAN_API_URL = 'https://qianfan.baidubce.com/v2/chat/completions';

// 滚动到底部
const scrollToBottom = async () => {
  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

// 选择快捷问题
const selectQuickQuestion = (question) => {
  userInput.value = question;
  sendMessage();
  showQuickQuestions.value = false;
};

// 发送消息
const sendMessage = async () => {
  if (userInput.value.trim() === '') return;
  
  // 添加用户消息
  const userMessage = {
    type: 'user',
    content: userInput.value,
    timestamp: new Date().toLocaleTimeString()
  };
  messages.value.push(userMessage);
  
  // 清空输入
  userInput.value = '';
  
  // 隐藏快捷问题
  showQuickQuestions.value = false;
  
  // 滚动到底部
  await scrollToBottom();
  
  // 显示加载状态
  isLoading.value = true;
  
  try {
    console.log('准备调用百度千帆API');
    
    // 准备请求数据
    const requestData = {
      model: 'qwen3-coder-30b-a3b-instruct', // 百度千帆模型名称
      messages: [
        {
          role: 'system',
          content: '你是红色精神AI助手，专注于党史知识的问答，要保持准确、客观、积极的态度。'
        },
        ...messages.value.map(msg => ({
          role: msg.type === 'user' ? 'user' : 'assistant',
          content: msg.content
        }))
      ],
      temperature: 0.7,
      top_p: 0.8,
      stop: [],
      repetition_penalty: 1
    };
    
    console.log('百度千帆请求数据:', requestData);
    
    // 调用百度千帆API
    const response = await axios.post(QIANFAN_API_URL, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${QIANFAN_API_KEY}`
      }
    });
    
    console.log('百度千帆响应:', response.data);
    
    // 添加AI回复
    if (response.data.choices && response.data.choices[0]) {
      const aiMessage = {
        type: 'ai',
        content: response.data.choices[0].message.content,
        timestamp: new Date().toLocaleTimeString()
      };
      messages.value.push(aiMessage);
    } else {
      const errorMessage = {
        type: 'ai',
        content: '抱歉，未能获取到AI回复，请稍后再试。',
        timestamp: new Date().toLocaleTimeString()
      };
      messages.value.push(errorMessage);
    }
  } catch (error) {
    console.error('调用百度千帆API失败:', error);
    console.error('错误详情:', JSON.stringify(error, null, 2));
    
    let errorContent = '抱歉，处理您的请求时出现错误，请稍后再试。';
    if (error.response) {
      errorContent = `抱歉，处理您的请求时出现错误: ${error.response.data.error?.message || error.response.statusText || '未知错误'}`;
    } else if (error.request) {
      errorContent = '抱歉，无法连接到AI服务，请检查网络连接或API配置。';
    } else if (error.message) {
      errorContent = `抱歉，处理您的请求时出现错误: ${error.message}`;
    }
    
    const errorMessage = {
      type: 'ai',
      content: errorContent,
      timestamp: new Date().toLocaleTimeString()
    };
    messages.value.push(errorMessage);
  } finally {
    // 关闭加载状态
    isLoading.value = false;
    // 滚动到底部
    await scrollToBottom();
  }
};

// 组件挂载后滚动到底部
onMounted(() => {
  scrollToBottom();
});
</script>

<style scoped>
/* AI智能问答助手样式 */
.ai-assistant-section {
  margin: 60px 0;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  padding: 40px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border);
}

.ai-assistant-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(90deg, var(--primary-red), var(--gold), var(--primary-red));
  animation: gradientShift 3s ease-in-out infinite;
}

.ai-assistant-section:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.section-header {
  text-align: center;
  margin-bottom: 40px;
  position: relative;
  padding-bottom: 20px;
}

.section-header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background: linear-gradient(90deg, var(--primary-red), var(--gold));
  border-radius: var(--radius-sm);
}

.section-header h2 {
  color: var(--primary-red);
  margin-bottom: 10px;
  font-size: 2.2rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: linear-gradient(90deg, var(--primary-red), var(--primary-red-dark));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  color: var(--gray);
  font-size: 1.1rem;
  margin-bottom: 0;
  font-weight: 500;
}

/* 聊天容器样式 */
.chat-container {
  display: flex;
  flex-direction: column;
  height: 550px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  background-color: var(--white);
  border: 1px solid var(--border);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.chat-container:hover {
  box-shadow: var(--shadow-xl);
}

/* 聊天头部 */
.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px;
  background: linear-gradient(135deg, var(--primary-red), var(--primary-red-dark));
  color: var(--white);
  border-bottom: 1px solid var(--border);
}

.chat-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.chat-icon {
  font-size: 1.5rem;
  animation: pulse 2s ease-in-out infinite;
}

.chat-title span {
  font-size: 1.1rem;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.chat-status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  opacity: 0.9;
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #4caf50;
  animation: pulse 2s ease-in-out infinite;
}

/* 聊天消息区域 */
.chat-messages {
  flex: 1;
  padding: 25px;
  overflow-y: auto;
  background-color: #f9f9f9;
  background-image: 
    linear-gradient(rgba(194, 30, 39, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(194, 30, 39, 0.02) 1px, transparent 1px);
  background-size: 20px 20px;
  scroll-behavior: smooth;
}

/* 消息样式 */
.message {
  margin-bottom: 20px;
  max-width: 80%;
  animation: messageSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes messageSlideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* AI消息样式 */
.message.ai {
  align-self: flex-start;
  margin-right: auto;
}

.message.ai .message-content {
  background: linear-gradient(135deg, #ffffff 0%, #f0f4f8 100%);
  padding: 15px 20px;
  border-radius: 18px 18px 18px 4px;
  box-shadow: var(--shadow);
  color: var(--gray-dark);
  position: relative;
  border: 1px solid var(--border);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.message.ai .message-content::before {
  content: '';
  position: absolute;
  bottom: 4px;
  left: -8px;
  width: 0;
  height: 0;
  border-right: 8px solid #ffffff;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  box-shadow: -2px 0 2px rgba(0, 0, 0, 0.05);
}

.message.ai:hover .message-content {
  box-shadow: var(--shadow-lg);
  transform: translateX(5px);
  background: linear-gradient(135deg, #ffffff 0%, #e9ecef 100%);
}

/* 用户消息样式 */
.message.user {
  align-self: flex-end;
  margin-left: auto;
}

.message.user .message-content {
  background: linear-gradient(135deg, var(--primary-red-light), var(--primary-red));
  padding: 15px 20px;
  border-radius: 18px 18px 4px 18px;
  box-shadow: var(--shadow);
  color: var(--white);
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.message.user .message-content::before {
  content: '';
  position: absolute;
  bottom: 4px;
  right: -8px;
  width: 0;
  height: 0;
  border-left: 8px solid var(--primary-red-light);
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  box-shadow: 2px 0 2px rgba(0, 0, 0, 0.1);
}

.message.user:hover .message-content {
  box-shadow: var(--shadow-lg);
  transform: translateX(-5px);
  background: linear-gradient(135deg, var(--primary-red), var(--primary-red-dark));
}

/* 消息时间戳 */
.message-time {
  font-size: 0.75rem;
  color: var(--gray);
  margin-top: 5px;
  text-align: right;
  opacity: 0.7;
}

.message.ai .message-time {
  text-align: left;
  padding-left: 20px;
}

/* 加载消息 */
.loading-message {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  padding: 15px 20px;
  background: linear-gradient(135deg, #ffffff 0%, #f0f4f8 100%);
  border-radius: 18px 18px 18px 4px;
  box-shadow: var(--shadow);
  color: var(--gray-dark);
  border: 1px solid var(--border);
  animation: messageSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(194, 30, 39, 0.2);
  border-top: 2px solid var(--primary-red);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 常见问题快捷按钮 */
.quick-questions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 15px 25px;
  background-color: #f8f9fa;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.quick-question-btn {
  padding: 8px 16px;
  background-color: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius-full);
  font-size: 0.9rem;
  color: var(--gray-dark);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--shadow-sm);
}

.quick-question-btn:hover {
  background-color: var(--primary-red);
  color: var(--white);
  transform: translateY(-2px);
  box-shadow: var(--shadow);
  border-color: var(--primary-red);
}

/* 聊天输入区域 */
.chat-input {
  display: flex;
  gap: 10px;
  padding: 20px 25px;
  border-top: 1px solid var(--border);
  background-color: var(--white);
  border-bottom-left-radius: var(--radius-lg);
  border-bottom-right-radius: var(--radius-lg);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}

/* 输入框样式 */
.input-field {
  flex: 1;
  padding: 15px 20px;
  border: 1px solid var(--border);
  border-radius: var(--radius-full);
  font-size: 14px;
  outline: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: #f9f9f9;
  box-shadow: var(--shadow-sm);
}

.input-field:focus {
  border-color: var(--primary-red);
  box-shadow: 0 0 0 3px rgba(194, 30, 39, 0.1);
  background-color: var(--white);
  transform: translateY(-2px);
}

.input-field:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
  opacity: 0.7;
}

/* 发送按钮样式 */
.send-button {
  padding: 0 25px;
  background: linear-gradient(135deg, var(--primary-red), var(--primary-red-dark));
  color: var(--white);
  border: none;
  border-radius: var(--radius-full);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--shadow);
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
}

.send-button:hover:not(:disabled) {
  background: linear-gradient(135deg, var(--primary-red-dark), var(--primary-red));
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.send-button:active:not(:disabled) {
  transform: translateY(0);
}

.send-button:disabled {
  background: linear-gradient(135deg, var(--gray), var(--gray-dark));
  cursor: not-allowed;
  opacity: 0.7;
}

/* 按钮加载动画 */
.button-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid var(--white);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* 滚动条样式 */
.chat-messages::-webkit-scrollbar {
  width: 8px;
}

.chat-messages::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: var(--radius-sm);
}

.chat-messages::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, var(--primary-red-light), var(--primary-red));
  border-radius: var(--radius-sm);
  transition: all 0.3s ease;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, var(--primary-red), var(--primary-red-dark));
  transform: scale(1.1);
}

/* 响应式调整 */
@media (max-width: 992px) {
  .ai-assistant-section {
    padding: 30px;
  }
  
  .section-header h2 {
    font-size: 1.8rem;
  }
  
  .chat-container {
    height: 500px;
  }
  
  .chat-messages {
    padding: 20px;
  }
  
  .message {
    max-width: 85%;
  }
  
  .chat-input {
    padding: 15px 20px;
  }
  
  .input-field {
    padding: 12px 18px;
  }
  
  .send-button {
    padding: 0 20px;
  }
}

@media (max-width: 768px) {
  .ai-assistant-section {
    padding: 20px;
    margin: 40px 0;
  }
  
  .section-header h2 {
    font-size: 1.5rem;
  }
  
  .section-subtitle {
    font-size: 0.9rem;
  }
  
  .chat-container {
    height: 450px;
  }
  
  .chat-header {
    padding: 15px 20px;
  }
  
  .chat-messages {
    padding: 15px;
  }
  
  .message {
    max-width: 90%;
  }
  
  .message.ai .message-content,
  .message.user .message-content {
    padding: 12px 16px;
  }
  
  .quick-questions {
    padding: 10px 15px;
    gap: 8px;
  }
  
  .quick-question-btn {
    padding: 6px 12px;
    font-size: 0.8rem;
  }
  
  .chat-input {
    padding: 10px 15px;
  }
  
  .input-field {
    padding: 10px 16px;
    font-size: 13px;
  }
  
  .send-button {
    padding: 0 16px;
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .ai-assistant-section {
    padding: 15px;
  }
  
  .section-header h2 {
    font-size: 1.3rem;
  }
  
  .chat-container {
    height: 400px;
  }
  
  .message {
    max-width: 95%;
  }
  
  .message.ai .message-content,
  .message.user .message-content {
    padding: 10px 14px;
  }
  
  .input-field {
    padding: 8px 14px;
  }
  
  .send-button {
    padding: 0 14px;
  }
}

/* 动画 */
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}
</style>