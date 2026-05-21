import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import MyProfile from '../components/MyProfile.vue';
import AIChat from '../views/AIChat.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/profile',
    name: 'MyProfile',
    component: MyProfile
  },
  {
    path: '/ai-chat',
    name: 'AIChat',
    component: AIChat
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
