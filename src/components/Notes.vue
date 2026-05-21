<template>
  <section class="notes">
    <div class="notes-header">
      <h2>📝 我的笔记</h2>
      <div class="notes-stats">
        <div class="stat-badge">
          <span class="stat-icon">📖</span>
          <span class="stat-text">共 {{ notes.length }} 篇笔记</span>
        </div>
      </div>
    </div>

    <div class="notes-toolbar">
      <div class="search-box">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="搜索笔记..."
          class="search-input"
        />
        <span class="search-icon">🔍</span>
      </div>
      <div class="toolbar-actions">
        <select v-model="sortBy" class="sort-select">
          <option value="date-desc">最新在前</option>
          <option value="date-asc">最早在前</option>
          <option value="title">按标题</option>
        </select>
        <button class="btn btn-primary" @click="showAddNoteForm = true">
          <span>+</span> 添加笔记
        </button>
      </div>
    </div>

    <div class="notes-container">
      <div v-if="filteredNotes.length > 0" class="notes-grid">
        <div
          v-for="(note, index) in filteredNotes"
          :key="index"
          class="note-card"
          :class="{ 'note-expanded': expandedIndex === index }"
        >
          <div class="note-card-header" @click="toggleExpand(index)">
            <div class="note-title-row">
              <h3 class="note-title">{{ note.title }}</h3>
              <div class="note-actions">
                <button class="action-btn" @click.stop="editNoteFn(index)" title="编辑">
                  <span>✏️</span>
                </button>
                <button class="action-btn" @click.stop="deleteNote(index)" title="删除">
                  <span>🗑️</span>
                </button>
                <button class="action-btn" @click.stop="shareNote(note)" title="分享">
                  <span>📤</span>
                </button>
              </div>
            </div>
            <div class="note-meta">
              <span class="note-date">📅 {{ note.date }}</span>
              <span class="note-time">🕐 {{ note.time }}</span>
              <span class="note-words">{{ note.wordCount || calculateWords(note.content) }} 字</span>
            </div>
          </div>

          <div class="note-card-body" v-if="expandedIndex === index">
            <div class="note-content" v-html="formatContent(note.content)"></div>
            <div class="note-tags" v-if="note.tags && note.tags.length > 0">
              <span v-for="(tag, tagIndex) in note.tags" :key="tagIndex" class="note-tag">
                {{ tag }}
              </span>
            </div>
          </div>

          <div class="note-card-footer" v-if="expandedIndex === index">
            <button class="btn btn-sm" @click.stop="copyNote(note)">
              <span>📋</span> 复制
            </button>
            <button class="btn btn-sm" @click.stop="exportNote(note)">
              <span>📥</span> 导出
            </button>
          </div>
        </div>
      </div>

      <div v-else class="empty-notes">
        <div class="empty-illustration">
          <div class="empty-icon">📝</div>
          <div class="empty-decoration">✨</div>
        </div>
        <h3>{{ searchQuery ? '没有找到相关笔记' : '暂无笔记' }}</h3>
        <p>{{ searchQuery ? '尝试搜索其他关键词' : '点击"添加笔记"开始记录你的学习感悟' }}</p>
        <button v-if="!searchQuery" class="btn btn-primary" @click="showAddNoteForm = true">
          开始记录
        </button>
      </div>
    </div>

    <div class="notes-footer" v-if="notes.length > 0">
      <div class="writing-tip">
        <span class="tip-icon">💡</span>
        <span class="tip-text">提示：点击笔记卡片可以展开查看详细内容</span>
      </div>
    </div>

    <!-- 添加/编辑笔记弹窗 -->
    <div v-if="showAddNoteForm || showEditForm" class="modal-overlay" @click="closeForm">
      <div class="modal-content modal-large" @click.stop>
        <div class="modal-header">
          <h3>{{ showEditForm ? '编辑笔记' : '添加笔记' }}</h3>
          <button class="close-btn" @click="closeForm">×</button>
        </div>
        <div class="modal-body">
          <div class="form-row">
            <div class="form-group">
              <label>标题</label>
              <input
                type="text"
                v-model="noteForm.title"
                class="form-control"
                placeholder="输入笔记标题"
              >
            </div>
          </div>
          <div class="form-group">
            <label>内容</label>
            <textarea
              v-model="noteForm.content"
              class="form-control content-textarea"
              placeholder="输入笔记内容..."
              rows="10"
            ></textarea>
            <div class="word-count">{{ calculateWords(noteForm.content) }} 字</div>
          </div>
          <div class="form-group">
            <label>标签（用逗号分隔）</label>
            <input
              type="text"
              v-model="noteForm.tagsInput"
              class="form-control"
              placeholder="例如：党建, 学习, 心得"
            >
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeForm">取消</button>
          <button type="button" class="btn btn-primary" @click="showEditForm ? saveEdit() : addNote()">
            {{ showEditForm ? '保存' : '添加' }}
          </button>
        </div>
      </div>
    </div>

    <!-- 分享弹窗 -->
    <div v-if="showShareModal" class="modal-overlay" @click="closeShareModal">
      <div class="modal-content modal-small" @click.stop>
        <div class="modal-header">
          <h3>分享笔记</h3>
          <button class="close-btn" @click="closeShareModal">×</button>
        </div>
        <div class="modal-body">
          <div class="share-preview">
            <h4>{{ sharingNote.title }}</h4>
            <p>{{ sharingNote.content.substring(0, 100) }}...</p>
          </div>
          <div class="share-links">
            <button class="share-option" @click="copyNoteToClipboard">
              <span class="share-icon">📋</span>
              <span>复制内容</span>
            </button>
            <button class="share-option" @click="exportNoteToFile">
              <span class="share-icon">📄</span>
              <span>导出为文本</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const notes = ref([
  {
    title: '党史学习感悟',
    content: '通过学习党史，我深刻认识到中国共产党的伟大历程。从红船精神到长征精神，再到改革开放精神，这些精神财富激励着我们不断前进。党史是最生动、最有说服力的教科书。',
    date: '2026-04-20',
    time: '15:30',
    tags: ['党史', '学习', '心得']
  },
  {
    title: '二十大精神学习',
    content: '习近平总书记在二十大上的重要讲话为我们指明了前进方向。我们要紧密团结在党中央周围，为实现中华民族伟大复兴的中国梦而努力奋斗。不忘初心，牢记使命，这是每一位党员的责任。',
    date: '2026-04-19',
    time: '10:15',
    tags: ['二十大', '党建']
  },
  {
    title: '习近平新时代中国特色社会主义思想',
    content: '习近平新时代中国特色社会主义思想是当代中国马克思主义、21世纪马克思主义，是中华文化和中国精神的时代精华。我们要深入学习贯彻这一思想，推动各项工作再上新台阶。',
    date: '2026-04-18',
    time: '09:00',
    tags: ['理论', '学习']
  }
]);

const searchQuery = ref('');
const sortBy = ref('date-desc');
const expandedIndex = ref(-1);
const showAddNoteForm = ref(false);
const showEditForm = ref(false);
const showShareModal = ref(false);
const editingIndex = ref(-1);
const sharingNote = ref({});

const noteForm = ref({
  title: '',
  content: '',
  tagsInput: ''
});

const filteredNotes = computed(() => {
  let result = notes.value;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(note =>
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query) ||
      (note.tags && note.tags.some(tag => tag.toLowerCase().includes(query)))
    );
  }

  result = [...result].sort((a, b) => {
    if (sortBy.value === 'date-desc') {
      return new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time);
    } else if (sortBy.value === 'date-asc') {
      return new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time);
    } else if (sortBy.value === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  return result;
});

const calculateWords = (content) => {
  if (!content) return 0;
  return content.replace(/\s/g, '').length;
};

const formatContent = (content) => {
  if (!content) return '';
  return content.replace(/\n/g, '<br>');
};

const toggleExpand = (index) => {
  expandedIndex.value = expandedIndex.value === index ? -1 : index;
};

const addNote = () => {
  if (!noteForm.value.title || !noteForm.value.content) {
    alert('请填写标题和内容');
    return;
  }

  const now = new Date();
  const tags = noteForm.value.tagsInput
    ? noteForm.value.tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag)
    : [];

  notes.value.unshift({
    title: noteForm.value.title,
    content: noteForm.value.content,
    date: now.toISOString().split('T')[0],
    time: now.toTimeString().substring(0, 5),
    tags: tags
  });

  saveNotes();
  closeForm();
};

const editNoteFn = (index) => {
  const note = filteredNotes.value[index];
  const originalIndex = notes.value.findIndex(n => n.title === note.title && n.date === note.date);

  editingIndex.value = originalIndex;
  noteForm.value = {
    title: note.title,
    content: note.content,
    tagsInput: note.tags ? note.tags.join(', ') : ''
  };
  showEditForm.value = true;
};

const saveEdit = () => {
  if (!noteForm.value.title || !noteForm.value.content) {
    alert('请填写标题和内容');
    return;
  }

  const tags = noteForm.value.tagsInput
    ? noteForm.value.tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag)
    : [];

  notes.value[editingIndex.value] = {
    ...notes.value[editingIndex.value],
    title: noteForm.value.title,
    content: noteForm.value.content,
    tags: tags
  };

  saveNotes();
  closeForm();
};

const deleteNote = (index) => {
  if (confirm('确定要删除这条笔记吗？')) {
    const note = filteredNotes.value[index];
    const originalIndex = notes.value.findIndex(n => n.title === note.title && n.date === note.date);
    notes.value.splice(originalIndex, 1);
    saveNotes();
  }
};

const shareNote = (note) => {
  sharingNote.value = { ...note };
  showShareModal.value = true;
};

const closeShareModal = () => {
  showShareModal.value = false;
};

const copyNoteToClipboard = () => {
  const text = `${sharingNote.value.title}\n\n${sharingNote.value.content}`;
  navigator.clipboard.writeText(text);
  alert('笔记内容已复制到剪贴板');
};

const copyNote = (note) => {
  const text = `${note.title}\n\n${note.content}`;
  navigator.clipboard.writeText(text);
  alert('笔记内容已复制到剪贴板');
};

const exportNoteToFile = () => {
  const text = `${sharingNote.value.title}\n\n${sharingNote.value.content}\n\n标签：${sharingNote.value.tags ? sharingNote.value.tags.join(', ') : '无'}`;
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${sharingNote.value.title}.txt`;
  a.click();
  URL.revokeObjectURL(url);
};

const exportNote = (note) => {
  const text = `${note.title}\n\n${note.content}\n\n标签：${note.tags ? note.tags.join(', ') : '无'}`;
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${note.title}.txt`;
  a.click();
  URL.revokeObjectURL(url);
};

const closeForm = () => {
  showAddNoteForm.value = false;
  showEditForm.value = false;
  noteForm.value = {
    title: '',
    content: '',
    tagsInput: ''
  };
  editingIndex.value = -1;
};

const saveNotes = () => {
  localStorage.setItem('notes', JSON.stringify(notes.value));
};

onMounted(() => {
  const savedNotes = localStorage.getItem('notes');
  if (savedNotes) {
    notes.value = JSON.parse(savedNotes);
  }
});
</script>

<style scoped>
.notes {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
  margin-bottom: var(--spacing-2xl);
}

.notes-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.notes h2 {
  color: var(--primary-red);
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.stat-badge {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  background: var(--light-gray);
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-full);
  font-size: 0.9rem;
  color: var(--dark-gray);
}

.notes-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  flex-wrap: wrap;
}

.search-box {
  position: relative;
  flex: 1;
  min-width: 200px;
}

.search-input {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  padding-left: 40px;
  border: 2px solid var(--light-gray);
  border-radius: var(--radius-md);
  font-size: 0.95rem;
  transition: border-color var(--transition-normal);
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-red);
}

.search-icon {
  position: absolute;
  left: var(--spacing-md);
  top: 50%;
  transform: translateY(-50%);
}

.toolbar-actions {
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
}

.sort-select {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 2px solid var(--light-gray);
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  cursor: pointer;
  transition: border-color var(--transition-normal);
}

.sort-select:focus {
  outline: none;
  border-color: var(--primary-red);
}

.notes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.note-card {
  background: var(--light-gray);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all var(--transition-normal);
}

.note-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
}

.note-card.note-expanded {
  grid-column: span 1;
}

.note-card-header {
  padding: var(--spacing-lg);
  cursor: pointer;
}

.note-title-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-sm);
}

.note-title {
  color: var(--dark-gray);
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  flex: 1;
}

.note-actions {
  display: flex;
  gap: var(--spacing-xs);
  opacity: 0;
  transition: opacity var(--transition-normal);
}

.note-card:hover .note-actions {
  opacity: 1;
}

.action-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  padding: var(--spacing-xs);
  border-radius: var(--radius-sm);
  transition: background-color var(--transition-normal);
}

.action-btn:hover {
  background: rgba(0, 0, 0, 0.1);
}

.note-meta {
  display: flex;
  gap: var(--spacing-md);
  font-size: 0.85rem;
  color: var(--medium-gray);
}

.note-card-body {
  padding: 0 var(--spacing-lg) var(--spacing-lg);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.note-content {
  color: var(--medium-gray);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-top: var(--spacing-md);
  max-height: 200px;
  overflow-y: auto;
}

.note-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  margin-top: var(--spacing-md);
}

.note-tag {
  background: var(--primary-red);
  color: var(--white);
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
}

.note-card-footer {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-lg);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  background: rgba(0, 0, 0, 0.02);
}

.empty-notes {
  text-align: center;
  padding: var(--spacing-3xl);
}

.empty-illustration {
  position: relative;
  margin-bottom: var(--spacing-xl);
}

.empty-icon {
  font-size: 4rem;
}

.empty-decoration {
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 1.5rem;
  animation: bounce 1s infinite;
}

.empty-notes h3 {
  color: var(--dark-gray);
  margin-bottom: var(--spacing-sm);
  font-size: 1.3rem;
}

.empty-notes p {
  color: var(--medium-gray);
  margin-bottom: var(--spacing-lg);
}

.notes-footer {
  margin-top: var(--spacing-lg);
  padding: var(--spacing-md);
  background: var(--light-gray);
  border-radius: var(--radius-md);
}

.writing-tip {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--medium-gray);
  font-size: 0.9rem;
}

/* 弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: var(--white);
  border-radius: var(--radius-lg);
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-large {
  max-width: 700px;
}

.modal-small {
  max-width: 400px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--light-gray);
}

.modal-header h3 {
  margin: 0;
  color: var(--primary-red);
  font-size: 1.2rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--medium-gray);
  transition: color var(--transition-normal);
}

.close-btn:hover {
  color: var(--dark-gray);
}

.modal-body {
  padding: var(--spacing-lg);
}

.form-row {
  display: flex;
  gap: var(--spacing-md);
}

.form-group {
  margin-bottom: var(--spacing-md);
  flex: 1;
}

.form-group label {
  display: block;
  margin-bottom: var(--spacing-xs);
  color: var(--dark-gray);
  font-weight: 500;
}

.form-control {
  width: 100%;
  padding: var(--spacing-sm);
  border: 2px solid var(--light-gray);
  border-radius: var(--radius-md);
  font-size: 0.95rem;
  transition: border-color var(--transition-normal);
}

.form-control:focus {
  outline: none;
  border-color: var(--primary-red);
}

.content-textarea {
  resize: vertical;
  min-height: 200px;
}

.word-count {
  text-align: right;
  font-size: 0.85rem;
  color: var(--medium-gray);
  margin-top: var(--spacing-xs);
}

.modal-footer {
  display: flex;
  gap: var(--spacing-md);
  justify-content: flex-end;
  padding: var(--spacing-lg);
  border-top: 1px solid var(--light-gray);
}

.share-preview {
  background: var(--light-gray);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-lg);
}

.share-preview h4 {
  margin: 0 0 var(--spacing-xs) 0;
  color: var(--dark-gray);
}

.share-preview p {
  margin: 0;
  color: var(--medium-gray);
  font-size: 0.9rem;
}

.share-links {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
}

.share-option {
  background: var(--light-gray);
  border: none;
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
  transition: all var(--transition-normal);
}

.share-option:hover {
  background: var(--primary-red);
  color: var(--white);
}

.share-icon {
  font-size: 1.5rem;
}

/* 按钮样式 */
.btn {
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  transition: all var(--transition-normal);
}

.btn-primary {
  background: var(--primary-red);
  color: var(--white);
}

.btn-primary:hover {
  background: var(--primary-red-dark);
}

.btn-secondary {
  background: var(--light-gray);
  color: var(--dark-gray);
}

.btn-secondary:hover {
  background: #e0e0e0;
}

.btn-sm {
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: 0.85rem;
  background: var(--white);
  color: var(--dark-gray);
  border: 1px solid var(--light-gray);
}

.btn-sm:hover {
  background: var(--primary-red);
  color: var(--white);
  border-color: var(--primary-red);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .notes {
    padding: var(--spacing-lg);
  }

  .notes-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-sm);
  }

  .notes-toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .toolbar-actions {
    justify-content: space-between;
  }

  .notes-grid {
    grid-template-columns: 1fr;
  }

  .note-meta {
    flex-wrap: wrap;
  }

  .share-links {
    grid-template-columns: 1fr;
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}
</style>
