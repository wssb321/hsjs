<template>
  <div class="simple-page">
    <h2>{{ pageTitle }}</h2>
    <div class="placeholder-content">
      <div class="placeholder-icon">{{ icon }}</div>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const pageConfig = {
  '/admin/statistics': { title: '数据报表', icon: '📊', description: '数据报表功能' },
  '/admin/organization': { title: '组织架构', icon: '🏛️', description: '组织架构管理' },
  '/admin/roles': { title: '角色权限', icon: '🔐', description: '角色权限管理' },
  '/admin/courses': { title: '课程管理', icon: '🎥', description: '课程管理功能' },
  '/admin/questions': { title: '题库管理', icon: '❓', description: '题库管理功能' },
  '/admin/banners': { title: 'Banner管理', icon: '🖼️', description: 'Banner管理功能' },
  '/admin/registration': { title: '报名管理', icon: '📋', description: '报名管理功能' },
  '/admin/checkin': { title: '签到管理', icon: '✅', description: '签到管理功能' },
  '/admin/star-students': { title: '学习标兵', icon: '⭐', description: '学习标兵推荐' },
  '/admin/reminders': { title: '催学通知', icon: '📩', description: '催学通知发送' },
  '/admin/learning-rules': { title: '学习规则', icon: '📜', description: '学习规则配置' },
  '/admin/integration': { title: '积分规则', icon: '🎯', description: '积分规则配置' },
  '/admin/sensitive-words': { title: '敏感词配置', icon: '🚫', description: '敏感词配置' },
  '/admin/templates': { title: '通知模板', icon: '📧', description: '通知模板管理' },
  '/admin/operation-logs': { title: '操作日志', icon: '📋', description: '操作日志查询' },
  '/admin/login-logs': { title: '登录日志', icon: '🔑', description: '登录日志查询' },
  '/admin/error-logs': { title: '异常日志', icon: '❌', description: '异常日志查询' },
  '/admin/recovery': { title: '数据恢复', icon: '🔄', description: '数据恢复功能' },
  '/admin/security': { title: '安全设置', icon: '🔒', description: '安全设置' },
  '/admin/ContentManagement': { title: '内容管理', icon: '📝', description: '内容管理' },
  '/admin/CourseManagement': { title: '课程管理', icon: '🎥', description: '课程管理' },
  '/admin/QuestionBank': { title: '题库管理', icon: '❓', description: '题库管理' },
  '/admin/BannerManagement': { title: 'Banner管理', icon: '🖼️', description: 'Banner管理' },
  '/admin/RegistrationManagement': { title: '报名管理', icon: '📋', description: '报名管理' },
  '/admin/CheckinManagement': { title: '签到管理', icon: '✅', description: '签到管理' },
  '/admin/StarStudents': { title: '学习标兵', icon: '⭐', description: '学习标兵' },
  '/admin/ReminderNotifications': { title: '催学通知', icon: '📩', description: '催学通知' },
  '/admin/LearningRules': { title: '学习规则', icon: '📜', description: '学习规则' },
  '/admin/IntegrationRules': { title: '积分规则', icon: '🎯', description: '积分规则' },
  '/admin/SensitiveWords': { title: '敏感词配置', icon: '🚫', description: '敏感词配置' },
  '/admin/NotificationTemplates': { title: '通知模板', icon: '📧', description: '通知模板' },
  '/admin/OperationLogs': { title: '操作日志', icon: '📋', description: '操作日志' },
  '/admin/LoginLogs': { title: '登录日志', icon: '🔑', description: '登录日志' },
  '/admin/ErrorLogs': { title: '异常日志', icon: '❌', description: '异常日志' },
  '/admin/DataRecovery': { title: '数据恢复', icon: '🔄', description: '数据恢复' },
  '/admin/SecuritySettings': { title: '安全设置', icon: '🔒', description: '安全设置' }
};

const config = computed(() => {
  return pageConfig[route.path] || { title: '页面', icon: '📄', description: '功能页面' };
});

const pageTitle = computed(() => config.value.title);
const icon = computed(() => config.value.icon);
const description = computed(() => config.value.description);
</script>

<style scoped>
.simple-page {
  padding: 20px;
}

.simple-page h2 {
  margin: 0 0 30px 0;
  font-size: 24px;
  color: #1a202c;
}

.placeholder-content {
  background: #fff;
  border-radius: 12px;
  padding: 60px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.placeholder-icon {
  font-size: 80px;
  margin-bottom: 20px;
}

.placeholder-content p {
  font-size: 16px;
  color: #718096;
}
</style>
