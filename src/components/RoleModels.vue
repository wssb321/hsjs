<template>
  <section id="models" class="models-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">榜样人物</h2>
        <p class="section-description">学习先进事迹，汲取榜样力量</p>
        <div class="section-divider"></div>
      </div>
      
      <div class="models-grid">
        <div 
          v-for="(model, index) in models" 
          :key="index" 
          class="model-card"
          :style="{ animationDelay: `${index * 0.2}s` }"
        >
          <div class="model-image">
            <img :src="model.avatar" :alt="model.name" />
            <div class="model-badge">{{ model.badge }}</div>
          </div>
          <div class="model-info">
            <h3 class="model-name">{{ model.name }}</h3>
            <p class="model-title">{{ model.title }}</p>
            <p class="model-desc">{{ model.description }}</p>
            <div class="model-tags">
              <span 
                v-for="(tag, tagIndex) in model.tags" 
                :key="tagIndex" 
                class="tag"
              >
                {{ tag }}
              </span>
            </div>
            <button class="learn-btn" @click="learnMore(model)">
              了解更多
            </button>
          </div>
        </div>
      </div>
      
      <div class="inspiration-section">
        <div class="inspiration-content">
          <h3>向榜样学习，向先进看齐</h3>
          <p>
            榜样是旗帜，代表着方向；榜样是资源，凝聚着力量。
            让我们以榜样为镜，向榜样学习，汲取奋进力量，
            在新时代新征程上展现新担当、实现新作为。
          </p>
          <button class="action-btn">
            开始学习 →
          </button>
        </div>
      </div>
    </div>
    
    <div v-if="selectedModel" class="model-modal" @click.self="closeModal">
      <div class="modal-content">
        <button class="close-btn" @click="closeModal">×</button>
        <div class="modal-header">
          <div class="modal-avatar">
            <img :src="selectedModel.avatar" :alt="selectedModel.name" />
            <div class="modal-badge">{{ selectedModel.badge }}</div>
          </div>
          <div class="modal-title-section">
            <h2>{{ selectedModel.name }}</h2>
            <p class="modal-title">{{ selectedModel.title }}</p>
          </div>
        </div>
        <div class="modal-body">
          <h3>事迹简介</h3>
          <p>{{ selectedModel.description }}</p>
          <h3>主要贡献</h3>
          <ul>
            <li v-for="(contribution, index) in selectedModel.contributions" :key="index">
              {{ contribution }}
            </li>
          </ul>
        </div>
        <div class="modal-footer">
          <button class="modal-btn">学习榜样精神</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const selectedModel = ref(null);

const models = [
  {
    name: '黄大发',
    title: '七一勋章获得者',
    avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20elderly%20male%20hero%20portrait%20red%20background%20honorable&image_size=portrait_4_3',
    badge: '时代楷模',
    description: '带领村民历时36年，在悬崖绝壁上开凿出一条主渠长7200米、支渠长2200米的"生命渠"，被誉为"当代愚公"。',
    tags: ['脱贫攻坚', '艰苦奋斗', '奉献精神'],
    contributions: [
      '带领村民修建"大发渠"，解决了当地缺水问题',
      '推动乡村经济发展，带领群众脱贫致富',
      '坚守初心使命，践行共产党员的责任担当'
    ]
  },
  {
    name: '黄文秀',
    title: '全国脱贫攻坚楷模',
    avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Young%20Chinese%20female%20leader%20portrait%20professional%20red%20theme&image_size=portrait_4_3',
    badge: '最美奋斗者',
    description: '北京师范大学硕士毕业后，放弃大城市的工作机会，回到家乡百色，在脱贫攻坚第一线倾情投入、奉献自我。',
    tags: ['脱贫攻坚', '青年榜样', '无私奉献'],
    contributions: [
      '帮助村里发展特色产业，带领群众增收',
      '完善基础设施，改善村民生活条件',
      '心系群众安危，在抗洪抢险中牺牲'
    ]
  },
  {
    name: '张桂梅',
    title: '七一勋章获得者',
    avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20female%20teacher%20portrait%20kind%20caring%20professional&image_size=portrait_4_3',
    badge: '全国优秀党员',
    description: '创办全国第一所全免费女子高中，帮助1800多名贫困山区女孩圆梦大学，用知识改变贫困山区女孩命运。',
    tags: ['教育扶贫', '立德树人', '大爱无疆'],
    contributions: [
      '创办华坪女子高级中学，免费招收贫困女生',
      '累计帮助1800多名女孩考上大学',
      '推动教育公平，改变山区教育面貌'
    ]
  },
  {
    name: '钟南山',
    title: '共和国勋章获得者',
    avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20male%20doctor%20portrait%20professional%20medical%20expert&image_size=portrait_4_3',
    badge: '时代英雄',
    description: '著名呼吸病学专家，在抗击非典和新冠疫情中做出卓越贡献，展现了医者仁心和责任担当。',
    tags: ['抗疫英雄', '科学精神', '责任担当'],
    contributions: [
      '带领团队抗击非典疫情，取得重大胜利',
      '率先提出新冠病毒"人传人"，指导疫情防控',
      '推动公共卫生体系建设，提高疾病防控能力'
    ]
  },
  {
    name: '袁隆平',
    title: '共和国勋章获得者',
    avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20elderly%20male%20scientist%20portrait%20agriculture%20expert&image_size=portrait_4_3',
    badge: '杂交水稻之父',
    description: '毕生致力于杂交水稻研究，成功培育出高产杂交水稻，为解决中国和世界粮食问题作出巨大贡献。',
    tags: ['科技创新', '粮食安全', '造福人类'],
    contributions: [
      '培育成功杂交水稻，大幅提高粮食产量',
      '推动杂交水稻走向世界，帮助解决全球饥饿问题',
      '一生致力于农业科技研究，践行"禾下乘凉梦"'
    ]
  },
  {
    name: '焦裕禄',
    title: '县委书记的榜样',
    avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Chinese%20vintage%20male%20leader%20portrait%20communist%20style&image_size=portrait_4_3',
    badge: '革命烈士',
    description: '在兰考县担任县委书记期间，带领全县人民治理风沙、水涝、盐碱"三害"，铸就了"焦裕禄精神"。',
    tags: ['艰苦奋斗', '为民服务', '廉洁奉公'],
    contributions: [
      '带领兰考人民治理"三害"，改善生态环境',
      '心系群众疾苦，解决民生问题',
      '树立了共产党员的光辉榜样，铸就焦裕禄精神'
    ]
  }
];

const learnMore = (model) => {
  selectedModel.value = model;
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  selectedModel.value = null;
  document.body.style.overflow = '';
};
</script>

<style scoped>
.models-section {
  padding: 60px 0;
  background: linear-gradient(135deg, #fef9f6 0%, #f5f0ef 100%);
}

.section-header {
  text-align: center;
  margin-bottom: 50px;
}

.section-title {
  font-size: 2.5rem;
  color: var(--primary-red);
  margin-bottom: 15px;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.section-description {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 20px;
}

.section-divider {
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-red), var(--gold));
  border-radius: 2px;
  margin: 0 auto;
  box-shadow: 0 2px 8px rgba(194, 30, 39, 0.3);
}

.models-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto 60px;
}

.model-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

.model-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 15px 45px rgba(0, 0, 0, 0.15);
}

.model-image {
  position: relative;
  height: 220px;
  overflow: hidden;
}

.model-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.model-card:hover .model-image img {
  transform: scale(1.05);
}

.model-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: linear-gradient(135deg, var(--primary-red), var(--primary-red-dark));
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  box-shadow: 0 2px 10px rgba(194, 30, 39, 0.4);
}

.model-info {
  padding: 25px;
}

.model-name {
  font-size: 1.4rem;
  color: #333;
  margin-bottom: 8px;
  font-weight: 700;
}

.model-title {
  font-size: 0.95rem;
  color: var(--primary-red);
  margin-bottom: 15px;
  font-weight: 500;
}

.model-desc {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.model-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.tag {
  background: rgba(194, 30, 39, 0.1);
  color: var(--primary-red);
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
}

.learn-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, var(--primary-red), var(--primary-red-dark));
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(194, 30, 39, 0.3);
}

.learn-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(194, 30, 39, 0.4);
  background: linear-gradient(135deg, var(--primary-red-dark), var(--primary-red));
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

.inspiration-section {
  background: linear-gradient(135deg, var(--primary-red), var(--primary-red-dark));
  border-radius: 20px;
  padding: 50px;
  text-align: center;
  color: white;
  max-width: 1000px;
  margin: 0 auto;
  box-shadow: 0 10px 40px rgba(194, 30, 39, 0.4);
}

.inspiration-content h3 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  font-weight: 600;
}

.inspiration-content p {
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 30px;
  opacity: 0.95;
}

.action-btn {
  background: white;
  color: var(--primary-red);
  padding: 15px 40px;
  border: none;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.action-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

.model-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background: white;
  border-radius: 24px;
  max-width: 500px;
  width: 90%;
  max-height: 85vh;
  overflow-y: auto;
  animation: slideUp 0.4s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 45px;
  height: 45px;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: rotate(90deg);
}

.modal-header {
  display: flex;
  gap: 20px;
  padding: 30px;
  background: linear-gradient(135deg, var(--primary-red), var(--primary-red-dark));
  color: white;
  position: relative;
}

.modal-avatar {
  position: relative;
  flex-shrink: 0;
}

.modal-avatar img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 0.3);
  object-fit: cover;
}

.modal-badge {
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--gold);
  color: var(--primary-red);
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
}

.modal-title-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.modal-title-section h2 {
  margin: 0 0 8px 0;
  font-size: 1.8rem;
}

.modal-title {
  margin: 0;
  opacity: 0.9;
  font-size: 1rem;
}

.modal-body {
  padding: 30px;
}

.modal-body h3 {
  color: var(--primary-red);
  margin-bottom: 15px;
  font-size: 1.2rem;
}

.modal-body p {
  color: #666;
  line-height: 1.8;
  margin-bottom: 25px;
}

.modal-body ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.modal-body li {
  padding: 10px 0 10px 25px;
  border-bottom: 1px solid #eee;
  color: #555;
  position: relative;
}

.modal-body li:last-child {
  border-bottom: none;
}

.modal-body li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--primary-red);
  font-weight: bold;
}

.modal-footer {
  padding: 20px 30px 30px;
  text-align: center;
}

.modal-btn {
  background: linear-gradient(135deg, var(--primary-red), var(--primary-red-dark));
  color: white;
  padding: 14px 45px;
  border: none;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(194, 30, 39, 0.3);
}

.modal-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(194, 30, 39, 0.4);
}

@media (max-width: 768px) {
  .models-section {
    padding: 40px 0;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .models-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
  }
  
  .model-image {
    height: 200px;
  }
  
  .inspiration-section {
    padding: 35px 25px;
  }
  
  .inspiration-content h3 {
    font-size: 1.5rem;
  }
  
  .modal-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .modal-avatar img {
    width: 80px;
    height: 80px;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.6rem;
  }
  
  .model-image {
    height: 180px;
  }
  
  .model-info {
    padding: 20px;
  }
  
  .inspiration-content h3 {
    font-size: 1.3rem;
  }
  
  .inspiration-content p {
    font-size: 1rem;
  }
}
</style>