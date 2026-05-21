<template>
  <div class="system-settings">
    <!-- 操作栏 -->
    <div class="action-bar">
      <h2>系统设置</h2>
      <button class="save-button">保存设置</button>
    </div>
    
    <!-- 设置标签页 -->
    <div class="settings-tabs">
      <button class="tab-button active">网站信息</button>
      <button class="tab-button">主题设置</button>
      <button class="tab-button">安全设置</button>
      <button class="tab-button">通知设置</button>
    </div>
    
    <!-- 设置内容 -->
    <div class="settings-content">
      <!-- 网站信息设置 -->
      <div class="settings-section active">
        <h3>网站基本信息</h3>
        <div class="form-grid">
          <div class="form-group">
            <label for="site-name">网站名称</label>
            <input type="text" id="site-name" class="form-input" value="红色精神学习平台">
          </div>
          <div class="form-group">
            <label for="site-description">网站描述</label>
            <input type="text" id="site-description" class="form-input" value="深入学习党的理论知识，提高政治素养">
          </div>
          <div class="form-group">
            <label for="site-logo">网站Logo</label>
            <div class="file-upload">
              <input type="file" id="site-logo" class="file-input">
              <label for="site-logo" class="file-label">选择文件</label>
            </div>
          </div>
          <div class="form-group">
            <label for="site-favicon">网站图标</label>
            <div class="file-upload">
              <input type="file" id="site-favicon" class="file-input">
              <label for="site-favicon" class="file-label">选择文件</label>
            </div>
          </div>
          <div class="form-group full-width">
            <label for="site-footer">页脚信息</label>
            <textarea id="site-footer" class="form-textarea">© 2026 红色精神学习平台 版权所有</textarea>
          </div>
        </div>
      </div>
      
      <!-- 主题设置 -->
      <div class="settings-section">
        <h3>主题设置</h3>
        <div class="form-grid">
          <div class="form-group">
            <label for="theme-color">主题颜色</label>
            <input type="color" id="theme-color" class="color-input" value="#e74c3c">
          </div>
          <div class="form-group">
            <label for="secondary-color">次要颜色</label>
            <input type="color" id="secondary-color" class="color-input" value="#3498db">
          </div>
          <div class="form-group">
            <label for="theme-mode">主题模式</label>
            <select id="theme-mode" class="form-select">
              <option value="light">浅色模式</option>
              <option value="dark">深色模式</option>
              <option value="auto">自动模式</option>
            </select>
          </div>
          <div class="form-group full-width">
            <label>启用动画效果</label>
            <div class="checkbox-group">
              <input type="checkbox" id="enable-animations" class="form-checkbox" checked>
              <label for="enable-animations">启用页面动画效果</label>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 安全设置 -->
      <div class="settings-section">
        <h3>安全设置</h3>
        <div class="form-grid">
          <div class="form-group">
            <label for="login-attempts">登录尝试次数限制</label>
            <input type="number" id="login-attempts" class="form-input" value="5">
          </div>
          <div class="form-group">
            <label for="session-timeout">会话超时时间（分钟）</label>
            <input type="number" id="session-timeout" class="form-input" value="30">
          </div>
          <div class="form-group full-width">
            <label>启用HTTPS</label>
            <div class="checkbox-group">
              <input type="checkbox" id="enable-https" class="form-checkbox">
              <label for="enable-https">启用HTTPS</label>
            </div>
          </div>
          <div class="form-group full-width">
            <label>启用验证码</label>
            <div class="checkbox-group">
              <input type="checkbox" id="enable-captcha" class="form-checkbox" checked>
              <label for="enable-captcha">启用登录验证码</label>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 通知设置 -->
      <div class="settings-section">
        <h3>通知设置</h3>
        <div class="form-grid">
          <div class="form-group">
            <label for="email-notifications">邮件通知</label>
            <select id="email-notifications" class="form-select">
              <option value="enabled">启用</option>
              <option value="disabled">禁用</option>
            </select>
          </div>
          <div class="form-group">
            <label for="sms-notifications">短信通知</label>
            <select id="sms-notifications" class="form-select">
              <option value="enabled">启用</option>
              <option value="disabled">禁用</option>
            </select>
          </div>
          <div class="form-group full-width">
            <label>通知类型</label>
            <div class="checkbox-group">
              <input type="checkbox" id="notify-login" class="form-checkbox" checked>
              <label for="notify-login">登录通知</label>
            </div>
            <div class="checkbox-group">
              <input type="checkbox" id="notify-content" class="form-checkbox" checked>
              <label for="notify-content">内容更新通知</label>
            </div>
            <div class="checkbox-group">
              <input type="checkbox" id="notify-system" class="form-checkbox" checked>
              <label for="notify-system">系统通知</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 可以添加设置管理的逻辑
</script>

<style scoped>
.system-settings {
  width: 100%;
}

/* 操作栏 */
.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.action-bar h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #1a202c;
}

.save-button {
  background-color: #e74c3c;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.save-button:hover {
  background-color: #c0392b;
}

/* 设置标签页 */
.settings-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 10px;
}

.tab-button {
  background-color: transparent;
  border: none;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  color: #718096;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 2px solid transparent;
}

.tab-button:hover {
  color: #4a5568;
}

.tab-button.active {
  color: #e74c3c;
  border-bottom-color: #e74c3c;
}

/* 设置内容 */
.settings-content {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.settings-section {
  display: none;
}

.settings-section.active {
  display: block;
}

.settings-section h3 {
  margin: 0 0 20px 0;
  font-size: 16px;
  font-weight: 600;
  color: #1a202c;
}

/* 表单网格 */
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  font-size: 14px;
  font-weight: 500;
  color: #4a5568;
}

.form-input,
.form-select,
.form-textarea {
  padding: 10px 15px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: #e74c3c;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

/* 文件上传 */
.file-upload {
  position: relative;
}

.file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.file-label {
  display: inline-block;
  background-color: #f7fafc;
  border: 1px solid #e2e8f0;
  padding: 10px 15px;
  border-radius: 4px;
  font-size: 14px;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.3s ease;
}

.file-label:hover {
  background-color: #edf2f7;
}

/* 颜色选择器 */
.color-input {
  width: 100%;
  height: 40px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  cursor: pointer;
}

/* 复选框组 */
.checkbox-group {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.checkbox-group:last-child {
  margin-bottom: 0;
}

.form-checkbox {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.checkbox-group label {
  font-size: 14px;
  font-weight: 400;
  color: #4a5568;
  cursor: pointer;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .action-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .settings-tabs {
    flex-wrap: wrap;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .settings-content {
    padding: 15px;
  }
}
</style>