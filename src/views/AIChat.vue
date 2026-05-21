<template>
  <div class="ai-chat-container">
    <div class="container">
      <h2>AI智能问答助手</h2>
      
      <div class="chat-card">
        <div class="chat-header">
          <h3>赓续文脉AI助手</h3>
          <p>专注于党史知识的智能问答</p>
        </div>
        
        <div class="chat-body" ref="chatBody">
          <div v-for="(message, index) in messages" :key="index" :class="['message-item', message.type]">
            <div class="message-content">
              {{ message.content }}
            </div>
          </div>
          <div v-if="isLoading" class="message-item ai">
            <div class="message-content">
              <div class="loading">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="chat-input">
          <input 
            type="text" 
            v-model="userInput" 
            placeholder="请输入您的问题..." 
            @keyup.enter="sendMessage"
            class="input-field"
          />
          <button @click="sendMessage" class="send-btn" :disabled="isLoading || !userInput.trim()">
            发送
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

// API配置 - 百度千帆
const QIANWEN_API_KEY = 'bce-v3/ALTAK-Ks0Snaf7BlCktdegrk9yh/02f1a0225a96991b52c1ad56b57d38a660714c48'; // 用户提供的千文接口API Key
const QIANWEN_API_URL = 'https://qianfan.baidubce.com/v2/chat/completions';
const QIANWEN_MODEL = 'qwen3-coder-30b-a3b-instruct';

// 响应式数据
const messages = ref([
  {
    type: 'ai',
    content: '您好！我是红色AI助手，有什么可以帮您了解的党史知识吗？'
  }
]);
const userInput = ref('');
const isLoading = ref(false);
const chatBody = ref(null);

// 发送消息
const sendMessage = async () => {
  if (userInput.value.trim() === '' || isLoading.value) return;
  
  // 添加用户消息
  messages.value.push({
    type: 'user',
    content: userInput.value
  });
  
  // 清空输入
  userInput.value = '';
  
  // 显示加载状态
  isLoading.value = true;
  
  // 滚动到底部
  scrollToBottom();
  
  try {
    // 调用百度千帆API
    const response = await axios.post(QIANWEN_API_URL, {
      model: QIANWEN_MODEL,
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
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${QIANWEN_API_KEY}`
      }
    });
    
    // 处理响应
    if (response.data && response.data.choices && response.data.choices.length > 0) {
      const aiResponse = response.data.choices[0].message.content;
      messages.value.push({
        type: 'ai',
        content: aiResponse
      });
    } else {
      messages.value.push({
        type: 'ai',
        content: '抱歉，无法获取AI响应，请稍后再试。'
      });
    }
  } catch (error) {
    console.error('API调用失败:', error);
    console.error('错误详情:', JSON.stringify(error, null, 2));
    messages.value.push({
      type: 'ai',
      content: '抱歉，无法连接到AI服务，请检查网络连接。'
    });
  } finally {
    isLoading.value = false;
    scrollToBottom();
  }
};

// 滚动到底部
const scrollToBottom = () => {
  setTimeout(() => {
    if (chatBody.value) {
      chatBody.value.scrollTop = chatBody.value.scrollHeight;
    }
  }, 100);
};

// 监听消息变化，自动滚动
watch(messages, () => {
  scrollToBottom();
}, { deep: true });

// 组件挂载后滚动到底部
onMounted(() => {
  scrollToBottom();
});
</script>

<style scoped>
.ai-chat-container {
  min-height: 100vh;
  padding: 40px 0;
  background-color: var(--background);
}

.container {
  max-width: 800px;
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

.chat-card {
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: var(--shadow);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.chat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.chat-header {
  background-color: var(--primary-red);
  color: var(--white);
  padding: 20px;
  text-align: center;
}

.chat-header h3 {
  margin: 0 0 5px 0;
  font-size: 1.4rem;
}

.chat-header p {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.9;
}

.chat-body {
  height: 500px;
  overflow-y: auto;
  padding: 20px;
  background-color: #f8f9fa;
  position: relative;
}

/* 自定义滚动条 */
.chat-body::-webkit-scrollbar {
  width: 6px;
}

.chat-body::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.chat-body::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.chat-body::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.message-item {
  margin-bottom: 20px;
  display: flex;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message-item.user {
  justify-content: flex-end;
}

.message-item.ai {
  justify-content: flex-start;
}

.message-content {
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 18px;
  line-height: 1.4;
  word-wrap: break-word;
}

.message-item.user .message-content {
  background-color: #e3f2fd;
  border-bottom-right-radius: 4px;
  color: #1976d2;
}

.message-item.ai .message-content {
  background-color: var(--white);
  border-bottom-left-radius: 4px;
  color: var(--gray-dark);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.loading {
  display: flex;
  align-items: center;
  gap: 8px;
}

.loading .dot {
  width: 8px;
  height: 8px;
  background-color: var(--primary-red);
  border-radius: 50%;
  animation: pulse 1.5s infinite ease-in-out;
}

.loading .dot:nth-child(2) {
  animation-delay: 0.2s;
}

.loading .dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
}

.chat-input {
  display: flex;
  padding: 15px;
  background-color: var(--white);
  border-top: 1px solid var(--border);
  gap: 10px;
}

.input-field {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid var(--border);
  border-radius: 24px;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.input-field:focus {
  outline: none;
  border-color: var(--primary-red);
  box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.1);
}

.send-btn {
  padding: 0 24px;
  background-color: var(--primary-red);
  color: var(--white);
  border: none;
  border-radius: 24px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.send-btn:hover:not(:disabled) {
  background-color: #d32f2f;
  transform: translateY(-1px);
}

.send-btn:disabled {
  background-color: #bdbdbd;
  cursor: not-allowed;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .ai-chat-container {
    padding: 20px 0;
  }
  
  .chat-body {
    height: 400px;
  }
  
  .message-content {
    max-width: 90%;
  }
}
</style>