import { Destination, Post, Comment } from './types';

export const DESTINATIONS: Destination[] = [
  {
    id: 'beijing',
    name: '北京',
    country: '中国',
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=1000&auto=format&fit=crop',
    tags: ['#文化', '#历史', '#必打卡'],
    explorers: '50万+',
    is_trending: true
  },
  {
    id: 'shanghai',
    name: '上海',
    country: '中国',
    image: 'https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?q=80&w=1000&auto=format&fit=crop',
    tags: ['#都市', '#时尚', '#美食'],
    explorers: '45万+',
    is_trending: true
  },
  {
    id: 'chengdu',
    name: '成都',
    country: '中国',
    image: 'https://images.unsplash.com/photo-1546702312-73c2f1127c68?q=80&w=1000&auto=format&fit=crop',
    tags: ['#美食', '#休闲', '#大熊猫'],
    explorers: '38万+'
  },
  {
    id: 'xian',
    name: '西安',
    country: '中国',
    image: 'https://images.unsplash.com/photo-1524316212875-f855e3e34a62?q=80&w=1000&auto=format&fit=crop',
    tags: ['#历史', '#文化', '#古都'],
    explorers: '32万+'
  },
  {
    id: 'bali',
    name: '巴厘岛',
    country: '印尼',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000&auto=format&fit=crop',
    tags: ['#海岛', '#文化', '#自然'],
    explorers: '1.2万'
  },
  {
    id: 'tokyo',
    name: '东京',
    country: '日本',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1000&auto=format&fit=crop',
    tags: ['#都市', '#美食', '#文化'],
    explorers: '2.5万',
    is_trending: true
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
