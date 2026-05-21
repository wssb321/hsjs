<template>
  <section class="innovation-section" id="innovation">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">
          <span class="title-icon">🌟</span> 创新理论
        </h2>
        <p class="section-subtitle">深入学习贯彻习近平新时代中国特色社会主义思想</p>
        <div class="innovation-buttons">
          <a href="#" class="btn btn-primary">电子图书</a>
          <a href="#" class="btn btn-secondary">在线试听</a>
          <a href="#" class="btn btn-tertiary">学习文章</a>
        </div>
      </div>
      
      <div class="innovation-grid">
        <!-- 第一行 -->
        <div class="innovation-item large">
          <div class="innovation-card">
            <div class="card-image primary">
              <div class="image-content">
                <h3>习近平新时代中国特色社会主义思想科学体系</h3>
                <p>深入学习贯彻习近平新时代中国特色社会主义思想，掌握其核心要义</p>
              </div>
            </div>
            <div class="card-footer">
              <span class="card-tag">重要理论</span>
              <a href="#" class="card-link">查看详情 →</a>
            </div>
          </div>
        </div>
        <div class="innovation-item large">
          <div class="innovation-card">
            <div class="card-image blue">
              <div class="image-content">
                <h3>学习贯彻习近平总书记"七一"重要讲话精神</h3>
                <p>深刻领会"七一"重要讲话的精神实质和丰富内涵</p>
              </div>
            </div>
            <div class="card-footer">
              <span class="card-tag">讲话精神</span>
              <a href="#" class="card-link">查看详情 →</a>
            </div>
          </div>
        </div>
        <div class="innovation-item">
          <div class="innovation-card">
            <div class="card-image green">
              <div class="image-content">
                <h3>系列报道：新时代的关键抉择</h3>
                <p>回顾新时代以来的重大决策和发展成就</p>
              </div>
            </div>
            <div class="card-footer">
              <span class="card-tag">系列报道</span>
              <a href="#" class="card-link">查看详情 →</a>
            </div>
          </div>
        </div>
        <div class="innovation-item">
          <div class="innovation-card">
            <div class="card-image purple">
              <div class="image-content">
                <h3>习近平总书记治国理政纪实</h3>
                <p>记录习近平总书记的治国理政实践和重要思想</p>
              </div>
            </div>
            <div class="card-footer">
              <span class="card-tag">纪实报道</span>
              <a href="#" class="card-link">查看详情 →</a>
            </div>
          </div>
        </div>
        
        <!-- 第二行 -->
        <div class="innovation-item">
          <div class="innovation-card">
            <div class="card-image book">
              <div class="image-content">
                <div class="book-icon">📚</div>
                <h3>习近平谈治国理政 第三卷</h3>
              </div>
            </div>
            <div class="card-footer">
              <span class="card-tag">著作</span>
              <a href="#" class="card-link">查看详情 →</a>
            </div>
          </div>
        </div>
        <div class="innovation-item">
          <div class="innovation-card">
            <div class="card-image book">
              <div class="image-content">
                <div class="book-icon">📚</div>
                <h3>习近平谈治国理政 第二卷</h3>
              </div>
            </div>
            <div class="card-footer">
              <span class="card-tag">著作</span>
              <a href="#" class="card-link">查看详情 →</a>
            </div>
          </div>
        </div>
        <div class="innovation-item">
          <div class="innovation-card">
            <div class="card-image book">
              <div class="image-content">
                <div class="book-icon">📚</div>
                <h3>习近平谈治国理政 第一卷</h3>
              </div>
            </div>
            <div class="card-footer">
              <span class="card-tag">著作</span>
              <a href="#" class="card-link">查看详情 →</a>
            </div>
          </div>
        </div>
        <div class="innovation-item large">
          <div class="innovation-card">
            <div class="card-image yellow">
              <div class="image-content">
                <h3>党课开讲啦：学习"七一"重要讲话精神</h3>
                <p>通过党课形式深入学习贯彻"七一"重要讲话精神</p>
              </div>
            </div>
            <div class="card-footer">
              <span class="card-tag">党课学习</span>
              <a href="#" class="card-link">查看详情 →</a>
            </div>
          </div>
        </div>
        <div class="innovation-item large">
          <div class="innovation-card">
            <div class="card-image red">
              <div class="image-content">
                <h3>学习贯彻习近平总书记"七一"重要讲话精神系列专题宣讲报告会</h3>
                <p>通过专题宣讲深入解读"七一"重要讲话精神</p>
              </div>
            </div>
            <div class="card-footer">
              <span class="card-tag">宣讲报告</span>
              <a href="#" class="card-link">查看详情 →</a>
            </div>
          </div>
        </div>
      </div>
      
      <div class="innovation-footer">
        <div class="footer-content">
          <h3>学党史 悟思想 办实事 开新局</h3>
          <p>深入学习贯彻习近平新时代中国特色社会主义思想，为实现中华民族伟大复兴的中国梦而奋斗</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 创新理论样式 */
.innovation-section {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  padding: 60px 0;
  margin: 60px 0;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border);
}

.innovation-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(90deg, var(--primary-red), var(--gold), var(--primary-red));
  animation: gradientShift 3s ease-in-out infinite;
}

/* section-header 样式 */
.section-header {
  text-align: center;
  margin-bottom: 50px;
  position: relative;
  padding-bottom: 30px;
}

.section-header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 3px;
  background: linear-gradient(90deg, var(--primary-red), var(--gold));
  border-radius: var(--radius-sm);
}

.section-title {
  color: var(--primary-red);
  font-size: 2.2rem;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: linear-gradient(90deg, var(--primary-red), var(--primary-red-dark));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title-icon {
  font-size: 2rem;
  animation: pulse 2s ease-in-out infinite;
}

.section-subtitle {
  color: var(--gray);
  font-size: 1.1rem;
  margin-bottom: 30px;
  font-weight: 500;
}

.innovation-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.btn-secondary {
  background: linear-gradient(135deg, #f39c12, #e67e22);
  color: var(--white);
  box-shadow: 0 4px 6px rgba(243, 156, 18, 0.2);
}

.btn-secondary:hover {
  background: linear-gradient(135deg, #e67e22, #d35400);
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(243, 156, 18, 0.3);
}

.btn-tertiary {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: var(--white);
  box-shadow: 0 4px 6px rgba(52, 152, 219, 0.2);
}

.btn-tertiary:hover {
  background: linear-gradient(135deg, #2980b9, #1f618d);
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(52, 152, 219, 0.3);
}

/* 创新理论网格 */
.innovation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  margin-bottom: 50px;
}

/* 创新理论卡片 */
.innovation-item {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.innovation-item:hover {
  transform: translateY(-10px);
}

.innovation-item.large {
  grid-column: span 2;
}

.innovation-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--border);
  position: relative;
}

.innovation-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-red), var(--gold));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
}

.innovation-card:hover::before {
  transform: scaleX(1);
}

.innovation-card:hover {
  box-shadow: var(--shadow-xl);
  transform: translateY(-5px);
}

/* 卡片图片 */
.card-image {
  position: relative;
  height: 220px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-image::before {
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

.card-image.primary {
  background: linear-gradient(135deg, var(--primary-red), var(--primary-red-dark));
}

.card-image.blue {
  background: linear-gradient(135deg, #3498db, #2980b9);
}

.card-image.green {
  background: linear-gradient(135deg, #27ae60, #229954);
}

.card-image.purple {
  background: linear-gradient(135deg, #9b59b6, #8e44ad);
}

.card-image.yellow {
  background: linear-gradient(135deg, #f39c12, #e67e22);
}

.card-image.red {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
}

.card-image.book {
  background: linear-gradient(135deg, #95a5a6, #7f8c8d);
}

.innovation-card:hover .card-image {
  transform: scale(1.05);
}

/* 图片内容 */
.image-content {
  position: relative;
  z-index: 1;
  color: var(--white);
  text-align: center;
  padding: 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.image-content h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 10px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  color: var(--white);
  line-height: 1.4;
}

.image-content p {
  font-size: 0.9rem;
  opacity: 0.9;
  line-height: 1.5;
  margin: 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.book-icon {
  font-size: 3rem;
  margin-bottom: 15px;
  animation: pulse 2s ease-in-out infinite;
}

/* 卡片底部 */
.card-footer {
  padding: 20px;
  background: var(--white);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--border);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.innovation-card:hover .card-footer {
  background: #f8f9fa;
}

.card-tag {
  padding: 5px 12px;
  background: rgba(194, 30, 39, 0.1);
  color: var(--primary-red);
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.innovation-card:hover .card-tag {
  background: var(--primary-red);
  color: var(--white);
  transform: scale(1.05);
}

.card-link {
  color: var(--primary-red);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 5px;
}

.card-link:hover {
  color: var(--primary-red-dark);
  transform: translateX(5px);
  text-decoration: none;
}

/* 创新理论底部 */
.innovation-footer {
  background: linear-gradient(135deg, var(--primary-red-light), var(--primary-red));
  padding: 40px;
  border-radius: var(--radius-lg);
  text-align: center;
  color: var(--white);
  box-shadow: var(--shadow-lg);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.innovation-footer::before {
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

.innovation-footer:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-xl);
  background: linear-gradient(135deg, var(--primary-red), var(--primary-red-dark));
}

.footer-content {
  position: relative;
  z-index: 1;
}

.footer-content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 15px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  color: var(--white);
}

.footer-content p {
  font-size: 1rem;
  opacity: 0.9;
  margin: 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

/* 响应式调整 */
@media (max-width: 992px) {
  .innovation-section {
    padding: 40px 0;
    margin: 40px 0;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
  
  .innovation-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }
  
  .innovation-item.large {
    grid-column: span 1;
  }
  
  .card-image {
    height: 200px;
  }
  
  .image-content {
    padding: 20px;
  }
  
  .image-content h3 {
    font-size: 1.1rem;
  }
  
  .innovation-footer {
    padding: 30px;
  }
  
  .footer-content h3 {
    font-size: 1.3rem;
  }
}

@media (max-width: 768px) {
  .innovation-section {
    padding: 30px 0;
    margin: 30px 0;
  }
  
  .section-header {
    margin-bottom: 30px;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .section-subtitle {
    font-size: 0.9rem;
  }
  
  .innovation-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 200px;
  }
  
  .card-image {
    height: 180px;
  }
  
  .image-content h3 {
    font-size: 1rem;
  }
  
  .image-content p {
    font-size: 0.8rem;
  }
  
  .card-footer {
    padding: 15px;
  }
  
  .innovation-footer {
    padding: 20px;
  }
  
  .footer-content h3 {
    font-size: 1.1rem;
  }
  
  .footer-content p {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .innovation-section {
    padding: 20px 0;
    margin: 20px 0;
  }
  
  .section-title {
    font-size: 1.3rem;
  }
  
  .card-image {
    height: 150px;
  }
  
  .image-content {
    padding: 15px;
  }
  
  .book-icon {
    font-size: 2rem;
  }
  
  .card-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
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
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}
</style>