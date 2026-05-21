const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const DATA_DIR = path.join(__dirname, 'data');

const readData = (filename) => {
  const filePath = path.join(DATA_DIR, filename);
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }
  return [];
};

const writeData = (filename, data) => {
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: '红色精神学习平台后端服务运行中', time: new Date().toISOString() });
});

app.get('/api/stats', (req, res) => {
  const users = readData('users.json');
  const notes = readData('notes.json');
  const favorites = readData('favorites.json');
  const progress = readData('progress.json');

  res.json({
    totalUsers: users.length,
    totalNotes: notes.length,
    totalFavorites: favorites.length,
    totalProgress: progress.length
  });
});

app.get('/api/admin/users', (req, res) => {
  const users = readData('users.json');
  res.json(users);
});

app.post('/api/admin/users', (req, res) => {
  const users = readData('users.json');
  const newUser = { id: Date.now(), ...req.body, createdAt: new Date().toISOString() };
  users.push(newUser);
  writeData('users.json', users);
  res.json(newUser);
});

app.delete('/api/admin/users/:id', (req, res) => {
  let users = readData('users.json');
  users = users.filter(u => u.id !== parseInt(req.params.id));
  writeData('users.json', users);
  res.json({ message: '用户删除成功' });
});

app.get('/api/admin/notes', (req, res) => {
  const notes = readData('notes.json');
  res.json(notes);
});

app.delete('/api/admin/notes/:id', (req, res) => {
  let notes = readData('notes.json');
  notes = notes.filter(n => n.id !== parseInt(req.params.id));
  writeData('notes.json', notes);
  res.json({ message: '笔记删除成功' });
});

app.get('/api/admin/favorites', (req, res) => {
  const favorites = readData('favorites.json');
  res.json(favorites);
});

app.delete('/api/admin/favorites/:id', (req, res) => {
  let favorites = readData('favorites.json');
  favorites = favorites.filter(f => f.id !== parseInt(req.params.id));
  writeData('favorites.json', favorites);
  res.json({ message: '收藏删除成功' });
});

app.get('/api/admin/progress', (req, res) => {
  const progress = readData('progress.json');
  res.json(progress);
});

app.listen(PORT, () => {
  console.log(`红色精神学习平台后端服务已启动`);
  console.log(`后端管理界面地址: http://localhost:${PORT}/api/admin`);
  console.log(`健康检查地址: http://localhost:${PORT}/api/health`);
  console.log(`数据统计地址: http://localhost:${PORT}/api/stats`);
});
