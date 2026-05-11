import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Supabase Client Setup
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseUrl.startsWith('http')) {
  console.error('❌ 错误: 环境变量 SUPABASE_URL 无效或缺失！');
  console.error('请检查 server/.env 文件是否填入了正确的项目地址。');
  process.exit(1); // 停止程序，避免抛出难懂的堆栈错误
}

if (!supabaseKey) {
  console.error('❌ 错误: 环境变量 SUPABASE_SERVICE_ROLE_KEY 缺失！');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());
app.use(express.json());

// --- API Routes ---

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Wanderlust Backend is running' });
});

// Get all posts with author details
app.get('/api/posts', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*, author:users(*)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new post
app.post('/api/posts', async (req, res) => {
  try {
    const { title, content, image, author_id, location, type, tags } = req.body;
    
    const { data, error } = await supabase
      .from('posts')
      .insert([{
        title,
        content,
        image,
        author_id,
        location,
        type,
        tags,
        likes_count: 0,
        comments_count: 0
      }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get user profile
app.get('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('users')
      .select('*, posts(*)')
      .eq('id', id)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
