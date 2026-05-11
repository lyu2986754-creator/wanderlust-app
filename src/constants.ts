import { Destination, Post, Comment } from './types';

export const DESTINATIONS: Destination[] = [
  {
    id: 'bali',
    name: '巴厘岛',
    country: '印尼',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000&auto=format&fit=crop',
    tags: ['#海岛', '#文化', '#自然'],
    explorers: '1.2万',
    is_trending: true
  },
  {
    id: 'paris',
    name: '巴黎',
    country: '法国',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000&auto=format&fit=crop',
    tags: ['#浪漫', '#艺术', '#都市'],
    explorers: '9.8k'
  },
  {
    id: 'tokyo',
    name: '东京',
    country: '日本',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1000&auto=format&fit=crop',
    tags: ['#都市', '#美食', '#文化'],
    explorers: '2.5万',
    is_trending: true
  },
  {
    id: 'santorini',
    name: '圣托里尼',
    country: '希腊',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1000&auto=format&fit=crop',
    tags: ['#海岛', '#浪漫', '#自然'],
    explorers: '8.2k'
  },
  {
    id: 'kyoto',
    name: '京都',
    country: '日本',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000&auto=format&fit=crop',
    tags: ['#文化', '#历史', '#自然'],
    explorers: '1.1万'
  },
  {
    id: 'dubai',
    name: '迪拜',
    country: '阿联酋',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1000&auto=format&fit=crop',
    tags: ['#奢华', '#现代', '#都市'],
    explorers: '1.5万'
  }
];

export const POSTS: Post[] = [
  {
    id: 'post-1',
    author_id: 'user-1',
    author: {
      name: 'Elena R.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
      location: '日本，京都'
    },
    title: '霓虹东京：终极72小时漫游指南',
    content: '祇园的黄金时刻真是太棒了。避开了主干道的人群，找到了这条安静的小巷。强烈建议在晚饭前5点左右去！',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1000&auto=format&fit=crop',
    created_at: '2024-05-10T12:00:00Z',
    location: '日本，京都',
    likes_count: 124,
    comments_count: 18,
    type: 'guide',
    rating: 4.9,
    tags: ['#都市探索'],
    days: 3
  },
  {
    id: 'post-2',
    author_id: 'user-2',
    author: {
      name: 'Marcus T.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
    },
    title: '美国西南部：沙漠奇观自驾游',
    content: '计划明年去百内国家公园。是11月去避开高峰人群比较好，还是等到1月天气暖和点？有去过的人能给点建议吗？',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000&auto=format&fit=crop',
    created_at: '2024-05-10T09:00:00Z',
    location: '美国',
    likes_count: 32,
    comments_count: 45,
    type: 'qa',
    rating: 4.8,
    tags: ['#公路旅行'],
    days: 7
  }
];

export const COMMENTS: Comment[] = [
  {
    id: 'c1',
    post_id: 'post-1',
    author_id: 'user-3',
    author: {
      name: '大卫·陈',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'
    },
    content: '我一直在找像爱宕念佛寺这样的地方！你觉得乘坐公共交通去那里困难吗？',
    created_at: '2024-05-09T10:00:00Z'
  }
];
