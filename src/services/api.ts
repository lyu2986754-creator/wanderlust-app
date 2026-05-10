import { supabase } from '../lib/supabaseClient';
import { Post, Comment, User } from '../types';

export const authService = {
  // 注册
  async signUp(email: string, password: string, name: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }
      }
    });
    if (error) throw error;
    return data;
  },

  // 登录
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  // 登出
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // 获取当前会话
  async getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  },

  // 获取当前用户信息（从 users 表）
  async getCurrentProfile() {
    const session = await this.getSession();
    if (!session) return null;

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (error) throw error;
    return data as User;
  }
};

export const postService = {
  // 获取所有帖子（带分页和过滤）
  async getPosts(page = 1, pageSize = 10, filterType?: string) {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
      .from('posts')
      .select('*, author:users(*)')
      .order('created_at', { ascending: false })
      .range(from, to);

    if (filterType && filterType !== 'all') {
      query = query.eq('type', filterType);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as Post[];
  },

  // 上传图片到 Storage
  async uploadImage(file: File) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `post-images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('wanderlust-assets')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('wanderlust-assets')
      .getPublicUrl(filePath);

    return data.publicUrl;
  },

  // 获取单个帖子详情
  async getPostById(id: string) {
    const { data, error } = await supabase
      .from('posts')
      .select('*, author:users(*), comments(*, author:users(*))')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Post;
  },

  // 创建新帖子
  async createPost(post: Partial<Post>) {
    const { data, error } = await supabase
      .from('posts')
      .insert([post])
      .select()
      .single();

    if (error) throw error;
    return data as Post;
  },

  // 点赞帖子
  async likePost(postId: string, userId: string) {
    const { data, error } = await supabase
      .from('likes')
      .insert([{ post_id: postId, user_id: userId }])
      .select();

    if (error) throw error;
    return data;
  },

  // 实时订阅帖子更新
  subscribeToPosts(callback: (payload: any) => void) {
    return supabase
      .channel('public:posts')
      .on('postgres_changes', { event: '*', table: 'posts' }, callback)
      .subscribe();
  }
};

export const commentService = {
  // 获取帖子的评论
  async getComments(postId: string) {
    const { data, error } = await supabase
      .from('comments')
      .select('*, author:users(*)')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data as Comment[];
  },

  // 发表评论
  async createComment(comment: Partial<Comment>) {
    const { data, error } = await supabase
      .from('comments')
      .insert([comment])
      .select()
      .single();

    if (error) throw error;
    return data as Comment;
  },

  // 订阅新评论
  subscribeToComments(postId: string, callback: (payload: any) => void) {
    return supabase
      .channel(`comments:${postId}`)
      .on('postgres_changes', 
        { event: 'INSERT', table: 'comments', filter: `post_id=eq.${postId}` }, 
        callback
      )
      .subscribe();
  }
};
