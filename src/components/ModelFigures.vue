<template>
  <section id="models" class="models-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">榜样人物</h2>
        <p class="section-subtitle">学习榜样精神，汲取奋进力量</p>
        <div class="section-divider"></div>
      </div>

      <div class="models-grid">
        <div 
          v-for="(model, index) in models" 
          :key="model.id"
          class="model-card"
          :style="{ animationDelay: `${index * 0.15}s` }"
          @mouseenter="activeCard = index"
          @mouseleave="activeCard = -1"
        >
          <div class="card-inner">
            <div class="card-front">
              <div class="model-image">
                <img :src="model.image" :alt="model.name" />
                <div class="image-overlay"></div>
              </div>
              <div class="model-info">
                <h3>{{ model.name }}</h3>
                <p class="model-title">{{ model.title }}</p>
                <p class="model-desc">{{ model.shortDesc }}</p>
              </div>
            </div>
            <div class="card-back">
              <h3>{{ model.name }}</h3>
              <p class="model-title">{{ model.title }}</p>
              <div class="model-detail">
                <p>{{ model.description }}</p>
              </div>
              <div class="model-tags">
                <span v-for="tag in model.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
              <button class="learn-btn">了解更多</button>
            </div>
          </div>
        </div>
      </div>

      <div class="honor-section">
        <h3 class="honor-title">荣誉殿堂</h3>
        <div class="honor-grid">
          <div 
            v-for="honor in honors" 
            :key="honor.id"
            class="honor-item"
          >
            <div class="honor-icon">{{ honor.icon }}</div>
            <div class="honor-info">
              <h4>{{ honor.title }}</h4>
              <p>{{ honor.description }}</p>
              <span class="honor-count">{{ honor.count }}人获得</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const activeCard = ref(-1);

const models = [
  {
    id: 1,
    name: '袁隆平',
    title: '杂交水稻之父',
    shortDesc: '一生致力于杂交水稻研究，解决亿万人民温饱问题',
    description: '袁隆平是中国杂交水稻育种专家，中国工程院院士。他毕生致力于杂交水稻研究，成功培育出高产杂交水稻，解决了中国乃至世界亿万人民的温饱问题，被誉为"杂交水稻之父"。他的科研精神和无私奉献激励着一代又一代人。',
    image: '/image/袁隆平.jpg',
    tags: ['科学家', '奋斗者', '奉献']
  },
  {
    id: 2,
    name: '钟南山',
    title: '抗疫英雄',
    shortDesc: '84岁高龄奔赴抗疫一线，守护人民生命安全',
    description: '钟南山是中国著名呼吸病学专家，中国工程院院士。在新冠疫情期间，84岁高龄的他挺身而出，奔赴抗疫一线，为疫情防控做出了巨大贡献。他的担当精神和专业素养赢得了全国人民的尊敬。',
    image: '/image/钟南山.jpg',
    tags: ['医生', '英雄', '担当']
  },
  {
    id: 3,
    name: '黄大年',
    title: '归国科学家',
    shortDesc: '放弃海外优越生活，回国报效祖国',
    description: '黄大年是著名地球物理学家，生前担任吉林大学教授。他放弃海外优越的科研条件和生活待遇，毅然回国报效祖国，带领团队突破多项关键技术，填补了国内多项技术空白。他的爱国情怀和科研精神令人敬佩。',
    image: '/image/黄大年.jpg',
    tags: ['科学家', '爱国者', '奉献']
  },
  {
    id: 4,
    name: '张桂梅',
    title: '校长妈妈',
    shortDesc: '创办女子高中，改变山区女孩命运',
    description: '张桂梅是云南丽江华坪女子高级中学校长。她扎根贫困山区，创办了全国第一所全免费女子高中，帮助数千名山区女孩走出大山，改变了她们的命运。她的无私奉献和教育情怀感动了无数人。',
    image: '/image/张桂梅.jpg',
    tags: ['教师', '奉献者', '教育家']
  },
  {
    id: 5,
    name: '焦裕禄',
    title: '县委书记的榜样',
    shortDesc: '治理兰考风沙，鞠躬尽瘁死而后已',
    description: '焦裕禄是原河南兰考县委书记。在兰考任职期间，他带领群众治理风沙、盐碱地，身患重病仍坚持工作，最终因病去世。他的"焦裕禄精神"成为党员干部学习的典范。',
    image: '/image/焦裕禄.jpg',
    tags: ['干部', '榜样', '公仆']
  },
  {
    id: 6,
    name: '雷锋',
    title: '全心全意为人民服务',
    shortDesc: '平凡岗位做出不平凡贡献的楷模',
    description: '雷锋是中国著名的模范士兵。他在平凡的岗位上默默奉献，全心全意为人民服务，留下了大量感人的事迹。"雷锋精神"影响了几代人，成为中华民族宝贵的精神财富。',
    image: '/image/雷锋.jpg',
    tags: ['士兵', '奉献', '楷模']
  }
];

const honors = [
  {
    id: 1,
    icon: '🏆',
    title: '全国优秀共产党员',
    description: '表彰在各条战线表现突出的共产党员',
    count: 2000
  },
  {
    id: 2,
    icon: '🌟',
    title: '时代楷模',
    description: '彰显时代精神的先进典型',
    count: 500
  },
  {
    id: 3,
    icon: '🎖️',
    title: '劳动模范',
    description: '表彰各行各业的劳动模范',
    count: 1500
  },
  {
    id: 4,
    icon: '💎',
    title: '道德模范',
    description: '践行社会主义核心价值观的榜样',
    count: 800
  }
];
</script>

<style scoped>
.models-section {
  padding: 60px 0;
  background: linear-gradient(180deg, #fff 0%, #f8f9fa 100%);
}

.section-header {
  text-align: center;
  margin-bottom: 50px;
}

.section-title {
  font-size: 2.5rem;
  color: var(--primary-red);
  margin-bottom: 10px;
  font-weight: 700;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 20px;
}

.section-divider {
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-red), var(--gold));
  margin: 0 auto;
  border-radius: 2px;
}

.models-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

.model-card {
  perspective: 1000px;
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-inner {
  position: relative;
  width: 100%;
  height: 450px;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}

.model-card:hover .card-inner {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.card-front {
  background: #fff;
}

.card-back {
  background: linear-gradient(135deg, var(--primary-red), var(--primary-red-dark));
  transform: rotateY(180deg);
  padding: 30px;
  display: flex;
  flex-direction: column;
  color: #fff;
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
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, transparent 40%, rgba(194, 30, 39, 0.6));
}

.model-info {
  padding: 25px;
  text-align: center;
}

.model-info h3 {
  font-size: 1.4rem;
  color: #333;
  margin-bottom: 8px;
  font-weight: 600;
}

.model-title {
  font-size: 0.9rem;
  color: var(--primary-red);
  margin-bottom: 12px;
  font-weight: 500;
}

.model-desc {
  font-size: 0.85rem;
  color: #666;
  line-height: 1.5;
}

.card-back h3 {
  font-size: 1.4rem;
  margin-bottom: 8px;
}

.card-back .model-title {
  font-size: 0.9rem;
  color: var(--gold-light);
  margin-bottom: 20px;
}

.model-detail {
  flex: 1;
  overflow-y: auto;
}

.model-detail p {
  font-size: 0.9rem;
  line-height: 1.7;
  opacity: 0.95;
}

.model-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 15px;
}

.tag {
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
}

.learn-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  padding: 10px 25px;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  margin-top: 15px;
  transition: all 0.3s ease;
}

.learn-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.honor-section {
  background: #fff;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.honor-title {
  font-size: 1.5rem;
  color: var(--primary-red);
  margin-bottom: 30px;
  text-align: center;
  font-weight: 600;
}

.honor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 25px;
}

.honor-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: linear-gradient(135deg, #f8f9fa, #fff);
  border-radius: 12px;
  border: 1px solid #eee;
  transition: all 0.3s ease;
}

.honor-item:hover {
  background: linear-gradient(135deg, rgba(194, 30, 39, 0.05), rgba(212, 175, 55, 0.05));
  transform: translateY(-3px);
}

.honor-icon {
  font-size: 2.5rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(194, 30, 39, 0.1), rgba(212, 175, 55, 0.1));
  border-radius: 12px;
}

.honor-info h4 {
  font-size: 1rem;
  color: #333;
  margin-bottom: 5px;
  font-weight: 600;
}

.honor-info p {
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 5px;
}

.honor-count {
  font-size: 0.85rem;
  color: var(--primary-red);
  font-weight: 600;
}

@media (max-width: 768px) {
  .models-section {
    padding: 40px 0;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
  
  .section-subtitle {
    font-size: 0.95rem;
  }
  
  .models-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .model-card {
    perspective: none;
  }
  
  .card-inner {
    height: auto;
    transform-style: flat;
    position: relative;
  }
  
  .card-front,
  .card-back {
    position: relative;
    backface-visibility: visible;
    transform: none;
    height: auto;
    overflow: visible;
  }
  
  .card-back {
    transform: none;
    padding: 20px;
    margin-top: -4px;
    border-radius: 0 0 15px 15px;
  }
  
  .model-card:hover .card-inner {
    transform: none;
  }
  
  .model-image {
    height: 200px;
    border-radius: 15px 15px 0 0;
  }
  
  .model-info {
    padding: 20px;
  }
  
  .model-info h3 {
    font-size: 1.3rem;
  }
  
  .model-title {
    font-size: 0.85rem;
  }
  
  .model-desc {
    font-size: 0.85rem;
    line-height: 1.5;
  }
  
  .card-back h3 {
    font-size: 1.3rem;
  }
  
  .model-detail {
    max-height: 120px;
  }
  
  .model-detail p {
    font-size: 0.85rem;
    line-height: 1.6;
  }
  
  .learn-btn {
    padding: 12px 24px;
    font-size: 0.9rem;
    margin-top: 15px;
    border-radius: 25px;
    min-height: 44px;
  }
  
  .honor-section {
    padding: 25px 20px;
  }
  
  .honor-title {
    font-size: 1.3rem;
  }
  
  .honor-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
  
  .honor-item {
    flex-direction: column;
    text-align: center;
    padding: 15px;
  }
  
  .honor-icon {
    font-size: 2rem;
    width: 50px;
    height: 50px;
  }
  
  .honor-info h4 {
    font-size: 0.9rem;
  }
  
  .honor-info p {
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .models-section {
    padding: 30px 0;
  }
  
  .section-title {
    font-size: 1.6rem;
  }
  
  .models-grid {
    gap: 15px;
  }
  
  .model-image {
    height: 180px;
  }
  
  .model-info {
    padding: 15px;
  }
  
  .model-info h3 {
    font-size: 1.2rem;
  }
  
  .card-back {
    padding: 15px;
  }
  
  .learn-btn {
    width: 100%;
    padding: 14px;
    font-size: 0.95rem;
  }
  
  .honor-section {
    padding: 20px 15px;
  }
  
  .honor-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .honor-item {
    flex-direction: row;
    text-align: left;
    padding: 15px;
  }
  
  .honor-icon {
    font-size: 1.8rem;
    width: 45px;
    height: 45px;
  }
  
  .honor-info h4 {
    font-size: 0.95rem;
  }
}
</style>
