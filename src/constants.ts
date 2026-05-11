import { Destination, Post, Comment } from './types';

export const DESTINATIONS: Destination[] = [
  {
    id: 'nanchang',
    name: '南昌',
    country: '中国',
    image: 'https://images.unsplash.com/photo-1543080036-79178905389f?q=80&w=1000&auto=format&fit=crop',
    tags: ['#英雄城', '#赣菜', '#滕王阁'],
    explorers: '20万+',
    is_trending: true,
    description: `### 南昌3日精华游（2026最新，含预约/交通/美食）
**核心亮点**：江南名楼滕王阁、红色历史地标、赣江夜景、地道粉面瓦罐汤，节奏轻松不赶场。

---

### 一、行前必看
- **最佳时间**：3-5月、9-11月（5月气温18-28℃，舒适少雨）
- **预约**：江西省博物馆、八一起义纪念馆、滕王阁需提前在官方公众号预约
- **交通**：昌北机场→地铁1号线；市内地铁覆盖核心景点，老城区骑电动车更方便
- **穿衣**：5月长袖+薄外套，赣菜偏辣，不能吃辣提前说“微辣”

---

### 二、3日行程（轻松版）
#### Day1：老城文脉·红色记忆
- **上午**：八一广场（免费）→ 八一起义纪念馆（免费，需预约）
- **中午**：羊子巷/系马桩吃地道午餐。必点：南昌拌粉+瓦罐汤（人均10元）
- **下午**：江西省博物馆（新馆，看海昏侯金器）→ 万寿宫历史文化街区
- **晚上**：滕王阁夜游（门票50元）。**背诵《滕王阁序》全文免门票**

#### Day2：赣江两岸·夜景巅峰
- **上午**：绳金塔 → 大士院早市（本地人私藏，油条包麻糍人均15元吃到撑）
- **下午**：南昌汉代海昏侯国遗址公园（出土金器超3000件）
- **晚上**：秋水广场音乐喷泉（19:30/20:30各一场）+ 南昌之星摩天轮

#### Day3：城市绿肺·文艺慢游
- **上午**：梅岭国家森林公园（狮子峰看云海日出）
- **下午**：699文创园（工业风拍照出片）→ 返程`,
    attractions: [
      { id: 'twg', name: '滕王阁', image: 'https://images.unsplash.com/photo-1543080036-79178905389f', description: '江南三大名楼之一，落霞与孤鹜齐飞。' },
      { id: 'wsg', name: '万寿宫', image: 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699', description: '明清赣派建筑，感受南昌市井气。' }
    ]
  },
  {
    id: 'beijing',
    name: '北京',
    country: '中国',
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=1000&auto=format&fit=crop',
    tags: ['#故宫', '#长城', '#京味儿'],
    explorers: '50万+',
    is_trending: true,
    description: `### 北京4日皇城深度游
**核心亮点**：故宫深度讲解、长城日出、胡同骑行、地道北京烤鸭。`
  },
  {
    id: 'shanghai',
    name: '上海',
    country: '中国',
    image: 'https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?q=80&w=1000&auto=format&fit=crop',
    tags: ['#外滩', '#迪士尼', '#魔都'],
    explorers: '45万+',
    description: '### 上海3日摩登之旅\n漫步武康路，看外滩夜景。'
  }
];

export const POSTS: Post[] = [
  {
    id: 'post-1',
    author_id: 'user-1',
    author: {
      name: 'Elena R.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
      location: '江西南昌'
    },
    title: '南昌真的不是美食沙漠！瓦罐汤绝了',
    content: '在大士院吃到撑！油条包麻糍真的好吃到哭，拌粉+瓦罐汤才10块钱，性价比逆天！',
    image: 'https://images.unsplash.com/photo-1543080036-79178905389f?q=80&w=1000&auto=format&fit=crop',
    created_at: '2024-05-10T12:00:00Z',
    location: '江西南昌',
    likes_count: 124,
    comments_count: 18,
    type: 'guide',
    rating: 4.9,
    tags: ['#南昌美食', '#避坑指南'],
    days: 3
  }
];

export const COMMENTS: Comment[] = [
  {
    id: 'c1',
    post_id: 'post-1',
    author_id: 'user-3',
    author: {
      name: '小王',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'
    },
    content: '滕王阁背诵序全文真的免票吗？',
    created_at: '2024-05-09T10:00:00Z'
  }
];
