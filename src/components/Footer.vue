<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <span class="footer-icon">⭐</span>
          <span class="footer-title">赓续文脉，强国有我</span>
        </div>
        <p class="footer-slogan">传承红色基因 · 牢记初心使命</p>
        <p class="footer-copyright">© 2026 赓续文脉教育平台 版权所有</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* 底部版权区样式 */
.footer {
  background-color: var(--primary-red);
  color: var(--white);
  padding: 40px 0;
  text-align: center;
  border-top: 4px solid var(--gold);
  position: relative;
  overflow: hidden;
}

.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--gold), var(--gold-light), var(--gold));
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px;
}

.footer-icon {
  font-size: 1.5rem;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.footer-title {
  font-size: 1.2rem;
  font-weight: 600;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.footer-slogan {
  color: var(--gold-light);
  font-size: 0.95rem;
  margin: 0;
  opacity: 0.9;
}

.footer-copyright {
  font-size: 0.85rem;
  margin: 0;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .footer {
    padding: 30px 0;
    padding-bottom: calc(30px + env(safe-area-inset-bottom));
  }
  
  .footer-content {
    gap: 8px;
  }
  
  .footer-title {
    font-size: 1.1rem;
  }
  
  .footer-slogan {
    font-size: 0.85rem;
  }
  
  .footer-copyright {
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .footer {
    padding: 25px 0;
    padding-bottom: calc(25px + env(safe-area-inset-bottom));
  }
  
  .footer-brand {
    gap: 8px;
  }
  
  .footer-icon {
    font-size: 1.3rem;
  }
  
  .footer-title {
    font-size: 1rem;
  }
  
  .footer-slogan {
    font-size: 0.8rem;
    text-align: center;
    padding: 0 10px;
  }
  
  .footer-copyright {
    font-size: 0.7rem;
  }
}
</style>