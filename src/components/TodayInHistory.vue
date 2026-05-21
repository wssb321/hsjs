<template>
  <section class="section today-in-history-section" id="today">
    <div class="section-header">
      <h2>历史上的今天</h2>
      <p class="section-subtitle">回顾党史，铭记历史</p>
    </div>
    <div class="today-card">
      <div class="date-display">
        <div class="current-date">{{ currentDate }}</div>
        <div class="date-info">
          <span class="weekday">{{ currentWeekday }}</span>
          <span class="lunar-date">{{ lunarDate }}</span>
        </div>
      </div>
      
      <!-- 时间差信息 -->
      <div class="time-diff-section">
        <h3 class="section-title">时间的见证</h3>
        <div class="time-diff-cards">
          <div class="time-diff-card">
            <div class="card-icon">🚩</div>
            <div class="card-content">
              <div class="card-title">中国共产党成立</div>
              <div class="card-value">{{ partyFoundingYears }}年{{ partyFoundingMonths }}个月{{ partyFoundingDays }}天</div>
            </div>
          </div>
          <div class="time-diff-card">
            <div class="card-icon">🇨🇳</div>
            <div class="card-content">
              <div class="card-title">中华人民共和国成立</div>
              <div class="card-value">{{ chinaFoundingYears }}年{{ chinaFoundingMonths }}个月{{ chinaFoundingDays }}天</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 历史事件 -->
      <div class="events-section">
        <h3 class="section-title">历史事件</h3>
        <div v-if="getHistoricalEvents().length > 0" class="events-list">
          <div 
            v-for="(event, index) in getHistoricalEvents()" 
            :key="index" 
            class="event-item"
            :class="{ 'is-visible': isVisible[index] }"
          >
            <div class="event-icon">{{ event.icon || '📅' }}</div>
            <div class="event-content">
              <h4 class="event-title">{{ event.title }}</h4>
              <p class="event-description">{{ event.content }}</p>
            </div>
            <div class="event-arrow">→</div>
          </div>
        </div>
        <div v-else class="empty-events">
          <div class="empty-icon">📚</div>
          <p>今天暂无历史事件记录</p>
          <p class="empty-subtext">让我们回顾党的光辉历程，学习党史知识，传承红色精神。</p>
        </div>
      </div>
      
      <!-- 党史小知识 -->
      <div class="knowledge-section">
        <h3 class="section-title">党史小知识</h3>
        <div class="knowledge-card">
          <div class="knowledge-content">
            <p>{{ dailyKnowledge }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

// 当前日期
const currentDate = ref('');
const currentWeekday = ref('');
const lunarDate = ref('');

// 可见性状态
const isVisible = ref([]);

// 时间差相关数据
const partyFoundingYears = ref(0);
const partyFoundingMonths = ref(0);
const partyFoundingDays = ref(0);
const chinaFoundingYears = ref(0);
const chinaFoundingMonths = ref(0);
const chinaFoundingDays = ref(0);

// 每日党史知识
const dailyKnowledge = ref('');

// 历史事件数据 - 按月份和日期存储
const historicalEvents = {
  '01-01': [
    {
      title: '中华人民共和国成立65周年',
      content: '2014年10月1日，中华人民共和国成立65周年庆祝活动举行。',
      icon: '🎉'
    },
    {
      title: '中央纪律检查委员会全体会议召开',
      content: '2023年1月1日，中国共产党第二十届中央纪律检查委员会第二次全体会议召开。',
      icon: '📋'
    }
  ],
  '01-05': [
    {
      title: '遵义会议召开',
      content: '1935年1月5日，遵义会议召开，确立了毛泽东在党中央和红军的领导地位。',
      icon: '📍'
    }
  ],
  '01-21': [
    {
      title: '瓦窑堡会议召开',
      content: '1935年1月21日，瓦窑堡会议召开，制定了抗日民族统一战线的策略方针。',
      icon: '🤝'
    }
  ],
  '02-07': [
    {
      title: '延安整风运动开始',
      content: '1942年2月7日，延安整风运动开始，这是一次全党范围的马克思主义思想教育运动。',
      icon: '📚'
    }
  ],
  '02-28': [
    {
      title: '台湾二二八事件',
      content: '1947年2月28日，台湾爆发二二八事件，这是台湾人民反对国民党独裁统治的爱国民主运动。',
      icon: '🌊'
    }
  ],
  '03-05': [
    {
      title: '学雷锋纪念日',
      content: '1963年3月5日，毛泽东题词"向雷锋同志学习"，此后每年3月5日成为学雷锋纪念日。',
      icon: '雷锋'
    }
  ],
  '03-12': [
    {
      title: '植树节',
      content: '1979年3月12日，第五届全国人大常委会第六次会议决定将每年的3月12日定为中国植树节。',
      icon: '🌲'
    }
  ],
  '03-16': [
    {
      title: '中央军委扩大会议召开',
      content: '1988年3月16日，中央军委扩大会议召开，讨论军队建设和改革问题。',
      icon: '⚔️'
    },
    {
      title: '全国科学大会召开',
      content: '1978年3月16日，全国科学大会召开，邓小平在会上提出"科学技术是生产力"的重要论断。',
      icon: '🔬'
    }
  ],
  '03-20': [
    {
      title: '党的十一届三中全会召开',
      content: '1978年3月20日，党的十一届三中全会召开，开启了改革开放和社会主义现代化建设的新时期。',
      icon: '🚪'
    }
  ],
  '04-01': [
    {
      title: '邓小平南方谈话',
      content: '1992年4月1日，邓小平南方谈话发表，进一步推动了改革开放的进程。',
      icon: '💬'
    }
  ],
  '04-23': [
    {
      title: '中国人民解放军海军成立',
      content: '1949年4月23日，中国人民解放军海军成立。',
      icon: '🚢'
    }
  ],
  '05-01': [
    {
      title: '国际劳动节',
      content: '1889年7月，第二国际宣布将每年的5月1日定为国际劳动节。',
      icon: '🛠️'
    }
  ],
  '05-04': [
    {
      title: '五四运动',
      content: '1919年5月4日，五四运动爆发，这是一场以青年学生为主的爱国运动。',
      icon: '🔥'
    }
  ],
  '05-23': [
    {
      title: '西藏和平解放',
      content: '1951年5月23日，西藏和平解放，标志着祖国大陆获得统一。',
      icon: '🏔️'
    }
  ],
  '06-01': [
    {
      title: '国际儿童节',
      content: '1949年11月，国际民主妇女联合会决定将每年的6月1日定为国际儿童节。',
      icon: '🧒'
    }
  ],
  '06-26': [
    {
      title: '国际禁毒日',
      content: '1987年6月26日，联合国确定每年的6月26日为国际禁毒日。',
      icon: '🚫'
    }
  ],
  '07-01': [
    {
      title: '中国共产党成立102周年',
      content: '2023年7月1日，庆祝中国共产党成立102周年，回顾党的光辉历程，展望美好未来。',
      icon: '🎂'
    },
    {
      title: '中国共产党成立',
      content: '1921年7月1日，中国共产党成立，这是中国历史上开天辟地的大事变。',
      icon: '🚩'
    }
  ],
  '07-23': [
    {
      title: '中国共产党第一次全国代表大会召开',
      content: '1921年7月23日，中国共产党第一次全国代表大会在上海召开。',
      icon: '📝'
    }
  ],
  '08-01': [
    {
      title: '中国人民解放军建军96周年',
      content: '2023年8月1日，庆祝中国人民解放军建军96周年，向全体官兵致以节日的问候。',
      icon: '🎖️'
    },
    {
      title: '南昌起义',
      content: '1927年8月1日，南昌起义爆发，标志着中国共产党独立领导武装斗争和创建人民军队的开始。',
      icon: '🔫'
    }
  ],
  '08-15': [
    {
      title: '日本投降',
      content: '1945年8月15日，日本宣布无条件投降，中国人民抗日战争取得胜利。',
      icon: '✌️'
    }
  ],
  '09-03': [
    {
      title: '中国人民抗日战争胜利纪念日',
      content: '2014年2月27日，十二届全国人大常委会第七次会议决定将9月3日确定为中国人民抗日战争胜利纪念日。',
      icon: '🏆'
    }
  ],
  '09-18': [
    {
      title: '九一八事变',
      content: '1931年9月18日，九一八事变爆发，日本开始侵华战争。',
      icon: '⚡'
    }
  ],
  '10-01': [
    {
      title: '中华人民共和国成立70周年',
      content: '2019年10月1日，中华人民共和国成立70周年庆祝大会、阅兵式和群众游行举行。',
      icon: '🎊'
    },
    {
      title: '中华人民共和国成立',
      content: '1949年10月1日，中华人民共和国成立，毛泽东在天安门城楼上宣告："中华人民共和国中央人民政府今天成立了！"',
      icon: '🇨🇳'
    }
  ],
  '10-10': [
    {
      title: '辛亥革命',
      content: '1911年10月10日，辛亥革命爆发，推翻了清朝统治，结束了中国两千多年的封建帝制。',
      icon: '🔄'
    }
  ],
  '11-07': [
    {
      title: '十月革命',
      content: '1917年11月7日，俄国十月革命爆发，建立了世界上第一个社会主义国家。',
      icon: '🌟'
    }
  ],
  '11-11': [
    {
      title: '第一次世界大战结束',
      content: '1918年11月11日，第一次世界大战结束，德国投降。',
      icon: '🕊️'
    }
  ],
  '12-09': [
    {
      title: '一二·九运动',
      content: '1935年12月9日，一二·九运动爆发，这是一场反对日本帝国主义侵略的爱国运动。',
      icon: '🗣️'
    }
  ],
  '12-20': [
    {
      title: '澳门回归',
      content: '1999年12月20日，澳门回归祖国，中国政府对澳门恢复行使主权。',
      icon: '🏮'
    }
  ],
  '12-26': [
    {
      title: '毛泽东诞辰',
      content: '1893年12月26日，毛泽东诞辰。毛泽东是中国共产党、中国人民解放军和中华人民共和国的主要缔造者和领导人。',
      icon: '👑'
    }
  ]
};

// 党史小知识
const knowledgeBase = [
  '中国共产党的宗旨是全心全意为人民服务。',
  '中国共产党的最高理想和最终目标是实现共产主义。',
  '中国共产党党徽为镰刀和锤头组成的图案。',
  '中国共产党党旗为旗面缀有金黄色党徽图案的红旗。',
  '中国共产党成立于1921年7月23日。',
  '党的最高领导机关是党的全国代表大会和它所产生的中央委员会。',
  '民主集中制是党的根本组织原则。',
  '党的思想路线是一切从实际出发，理论联系实际，实事求是，在实践中检验真理和发展真理。',
  '中国共产党党员必须履行八项义务，享有八项权利。',
  '党的纪律是党的各级组织和全体党员必须遵守的行为规则。'
];

// 计算两个日期之间的时间差
const calculateTimeDiff = (startDate) => {
  const now = new Date();
  const start = new Date(startDate);
  
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();
  
  // 调整月份和天数
  if (days < 0) {
    months--;
    // 获取上个月的天数
    const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += lastMonth.getDate();
  }
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  return { years, months, days };
};

// 获取星期几
const getWeekday = (date) => {
  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  return weekdays[date.getDay()];
};

// 模拟农历日期
const getLunarDate = () => {
  // 这里简化处理，实际应用中可以使用农历库
  const lunarMonths = ['正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
  const now = new Date();
  const month = now.getMonth();
  const day = now.getDate();
  return `${lunarMonths[month]}${day}日`;
};

// 处理滚动事件
const handleScroll = () => {
  const eventItems = document.querySelectorAll('.event-item');
  eventItems.forEach((item, index) => {
    const rect = item.getBoundingClientRect();
    const isInViewport = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
    if (isInViewport) {
      isVisible.value[index] = true;
    }
  });
};

// 获取当前日期并计算时间差
onMounted(() => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  currentDate.value = `${year}-${month}-${day}`;
  currentWeekday.value = getWeekday(now);
  lunarDate.value = getLunarDate();
  
  // 计算中国共产党成立时间差（1921年7月1日）
  const partyDiff = calculateTimeDiff('1921-07-01');
  partyFoundingYears.value = partyDiff.years;
  partyFoundingMonths.value = partyDiff.months;
  partyFoundingDays.value = partyDiff.days;
  
  // 计算中华人民共和国成立时间差（1949年10月1日）
  const chinaDiff = calculateTimeDiff('1949-10-01');
  chinaFoundingYears.value = chinaDiff.years;
  chinaFoundingMonths.value = chinaDiff.months;
  chinaFoundingDays.value = chinaDiff.days;
  
  // 随机选择一条党史小知识
  const randomIndex = Math.floor(Math.random() * knowledgeBase.length);
  dailyKnowledge.value = knowledgeBase[randomIndex];
  
  // 初始化可见性状态
  const events = getHistoricalEvents();
  isVisible.value = new Array(events.length).fill(false);
  
  // 添加滚动事件监听
  handleScroll();
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

// 模拟获取历史上的今天事件
const getHistoricalEvents = () => {
  // 提取当前月份和日期
  const dateParts = currentDate.value.split('-');
  const monthDay = `${dateParts[1]}-${dateParts[2]}`;
  
  // 这里预留接口调用，实际应用中会根据当前日期从API获取数据
  const events = historicalEvents[monthDay] || [];
  
  // 如果没有历史事件，添加一个默认事件
  if (events.length === 0) {
    events.push({
      title: '历史上的今天',
      content: `今天是${currentDate.value}，让我们回顾党的光辉历程，学习党史知识，传承红色精神。`,
      icon: '📅'
    });
  }
  
  return events;
};
</script>

<style scoped>
/* 历史上的今天样式 */
.today-in-history-section {
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

.today-in-history-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(90deg, var(--primary-red), var(--gold), var(--primary-red));
  animation: gradientShift 3s ease-in-out infinite;
}

.today-in-history-section:hover {
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

.today-card {
  position: relative;
  z-index: 1;
}

/* 日期显示 */
.date-display {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px;
  background: linear-gradient(135deg, var(--primary-red), var(--primary-red-dark));
  border-radius: var(--radius-lg);
  color: var(--white);
  box-shadow: var(--shadow-lg);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.date-display:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-xl);
}

.current-date {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 10px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.date-info {
  display: flex;
  justify-content: center;
  gap: 20px;
  font-size: 1.1rem;
  opacity: 0.9;
}

.weekday, .lunar-date {
  padding: 5px 15px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-full);
  backdrop-filter: blur(10px);
}

/* 时间差信息样式 */
.time-diff-section {
  margin-bottom: 40px;
}

.section-title {
  color: var(--primary-red);
  margin-bottom: 25px;
  font-size: 1.4rem;
  font-weight: 600;
  position: relative;
  padding-left: 20px;
}

.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 20px;
  background: linear-gradient(180deg, var(--primary-red), var(--gold));
  border-radius: var(--radius-sm);
}

.time-diff-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.time-diff-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: var(--radius-lg);
  padding: 25px;
  box-shadow: var(--shadow);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
  overflow: hidden;
}

.time-diff-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--primary-red), var(--gold));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.time-diff-card:hover::before {
  transform: scaleX(1);
}

.time-diff-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  background: linear-gradient(135deg, #ffffff 0%, #f0f4f8 100%);
}

.card-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.time-diff-card:hover .card-icon {
  transform: scale(1.2) rotate(10deg);
}

.card-content {
  flex: 1;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--gray-dark);
  margin-bottom: 10px;
}

.card-value {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--primary-red);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* 历史事件样式 */
.events-section {
  margin-bottom: 40px;
}

.events-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.event-item {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: var(--radius-lg);
  padding: 25px;
  box-shadow: var(--shadow);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--border);
  display: flex;
  align-items: flex-start;
  gap: 20px;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(30px);
}

.event-item.is-visible {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.event-item:nth-child(1) {
  transition-delay: 0.1s;
}

.event-item:nth-child(2) {
  transition-delay: 0.2s;
}

.event-item:nth-child(3) {
  transition-delay: 0.3s;
}

.event-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--primary-red), var(--gold));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.event-item:hover::before {
  transform: scaleX(1);
}

.event-item:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  background: linear-gradient(135deg, #ffffff 0%, #f0f4f8 100%);
}

.event-icon {
  font-size: 2rem;
  flex-shrink: 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  margin-top: 5px;
}

.event-item:hover .event-icon {
  transform: scale(1.2) rotate(15deg);
}

.event-content {
  flex: 1;
}

.event-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--primary-red);
  margin-bottom: 10px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.event-item:hover .event-title {
  color: var(--primary-red-dark);
  transform: translateX(5px);
}

.event-description {
  color: var(--gray-dark);
  line-height: 1.7;
  margin: 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.event-item:hover .event-description {
  color: var(--gray);
}

.event-arrow {
  font-size: 1.5rem;
  color: var(--primary-red);
  opacity: 0.5;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
  margin-top: 5px;
}

.event-item:hover .event-arrow {
  opacity: 1;
  transform: translateX(5px) rotate(10deg);
}

/* 空状态样式 */
.empty-events {
  text-align: center;
  padding: 60px 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: var(--radius-lg);
  border: 2px dashed var(--border);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.empty-events:hover {
  background: linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%);
  border-color: var(--primary-red-light);
  transform: translateY(-5px);
  box-shadow: var(--shadow);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 20px;
  animation: pulse 2s ease-in-out infinite;
}

.empty-events p {
  font-size: 1.1rem;
  color: var(--gray);
  margin-bottom: 10px;
}

.empty-subtext {
  font-size: 0.9rem;
  color: var(--gray-light);
}

/* 党史小知识样式 */
.knowledge-section {
  margin-top: 40px;
}

.knowledge-card {
  background: linear-gradient(135deg, var(--primary-red-light), var(--primary-red));
  border-radius: var(--radius-lg);
  padding: 30px;
  box-shadow: var(--shadow-lg);
  color: var(--white);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.knowledge-card::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: float 20s linear infinite;
  z-index: 0;
}

.knowledge-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-xl);
  background: linear-gradient(135deg, var(--primary-red), var(--primary-red-dark));
}

.knowledge-content {
  position: relative;
  z-index: 1;
}

.knowledge-content p {
  font-size: 1.1rem;
  line-height: 1.7;
  margin: 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

/* 响应式设计 */
@media (max-width: 992px) {
  .today-in-history-section {
    padding: 30px;
  }
  
  .section-header h2 {
    font-size: 1.8rem;
  }
  
  .current-date {
    font-size: 2rem;
  }
  
  .time-diff-cards {
    grid-template-columns: 1fr;
  }
  
  .event-item {
    padding: 20px;
  }
  
  .knowledge-card {
    padding: 25px;
  }
}

@media (max-width: 768px) {
  .today-in-history-section {
    padding: 20px;
    margin: 40px 0;
  }
  
  .section-header h2 {
    font-size: 1.5rem;
  }
  
  .section-subtitle {
    font-size: 0.9rem;
  }
  
  .date-display {
    padding: 20px;
  }
  
  .current-date {
    font-size: 1.8rem;
  }
  
  .date-info {
    flex-direction: column;
    gap: 10px;
  }
  
  .weekday, .lunar-date {
    display: inline-block;
  }
  
  .event-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .event-icon {
    font-size: 1.5rem;
  }
  
  .event-arrow {
    align-self: flex-end;
  }
  
  .empty-events {
    padding: 40px 20px;
  }
  
  .empty-icon {
    font-size: 3rem;
  }
}

@media (max-width: 480px) {
  .today-in-history-section {
    padding: 15px;
  }
  
  .section-header h2 {
    font-size: 1.3rem;
  }
  
  .current-date {
    font-size: 1.5rem;
  }
  
  .time-diff-card {
    padding: 20px;
  }
  
  .event-item {
    padding: 15px;
  }
  
  .knowledge-card {
    padding: 20px;
  }
}

/* 动画 */
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes float {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  100% {
    transform: translate(-25%, -25%) rotate(360deg);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}
</style>