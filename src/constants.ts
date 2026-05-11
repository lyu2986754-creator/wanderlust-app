import { Destination, Post, Comment } from './types';

export const DESTINATIONS: Destination[] = [
  {
    id: 'nanchang',
    name: '南昌',
    country: '中国',
    image: 'https://images.unsplash.com/photo-1543080036-79178905389f?q=80&w=1000&auto=format&fit=crop',
    tags: ['#红色记忆', '#赣菜美食', '#江南名楼'],
    explorers: '20万+',
    is_trending: true,
    description: `### 南昌3日精华游（2026最新，含预约/交通/美食）
**核心亮点**：江南名楼滕王阁、红色历史地标、赣江夜景、地道粉面瓦罐汤，节奏轻松不赶场。

---

### 一、行前必看
- **最佳时间**：3-5月、9-11月（5月气温18-28℃，舒适少雨）
- **预约**：**江西省博物馆、八一起义纪念馆、滕王阁**需提前在官方公众号预约（免费/购票）
- **交通**：
  - 机场：昌北机场→地铁1号线/机场大巴（15元）到市区
  - 高铁：南昌西站（地铁2号线）、南昌站（地铁1/2号线）
  - 市内：地铁覆盖核心景点，支付宝“鹭鹭行”扫码；老城区骑电动车（2元/10分钟）更方便
- **穿衣**：5月长袖+薄外套，早晚微凉；赣菜偏辣，不能吃辣提前说“微辣”

---

### 二、3日行程（轻松版）
#### Day1：老城文脉·红色记忆（免费为主）
- **上午**：八一广场（免费）→八一起义纪念馆（免费，预约）
- **中午**：羊子巷/系马桩吃地道午餐（南昌拌粉+瓦罐汤）
- **下午**：江西省博物馆（免费，预约）→万寿宫历史文化街区（免费）
- **晚上**：滕王阁夜游（门票50元，背诵《滕王阁序》全文免门票）

#### Day2：赣江两岸·夜景巅峰
- **上午**：绳金塔（免费）→大士院早市（油条包麻糍人均15元吃到撑）
- **下午**：南昌汉代海昏侯国遗址公园（门票60元）
- **傍晚**：南昌之星摩天轮（门票50元，黄昏俯瞰赣江）
- **晚上**：秋水广场音乐喷泉（免费，19:30/20:30各一场）

#### Day3：城市绿肺·文艺慢游
- **上午**：梅岭国家森林公园（狮子峰看云海日出）
- **下午**：699文创园（免费）→返程`,
    attractions: [
      {
        id: 'twg',
        destination_id: 'nanchang',
        name: '滕王阁',
        image: 'https://images.unsplash.com/photo-1543080036-79178905389f?q=80&w=600',
        description: '江南三大名楼之首，因王勃《滕王阁序》而闻名天下。',
        info: '门票: 50元 | 开放时间: 08:00-18:00'
      },
      {
        id: 'wsg',
        destination_id: 'nanchang',
        name: '万寿宫',
        image: 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?q=80&w=600',
        description: '明清风格历史街区，汇集地道南昌美食与老字号。',
        info: '门票: 免费 | 开放时间: 全天'
      }
    ]
  },
  {
    id: 'beijing',
    name: '北京',
    country: '中国',
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=1000&auto=format&fit=crop',
    tags: ['#皇城根', '#文化古都', '#长城'],
    explorers: '100万+',
    is_trending: true,
    description: `### 北京4日深度皇城游
**核心亮点**：故宫深度游、八达岭长城日出、胡同Citywalk、北京烤鸭。

---

### 一、行前必看
- **最佳时间**：春秋两季
- **交通**：地铁非常发达，建议使用北京一卡通App
- **预约**：故宫需提前7天预约，极其火爆`,
    attractions: [
      {
        id: 'gg',
        destination_id: 'beijing',
        name: '故宫博物院',
        image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=600',
        description: '明清两代的皇家宫殿，世界上现存规模最大、保存最为完整的木质结构古建筑之一。',
        info: '门票: 60元(旺季) | 需实名预约'
      }
    ]
  },
  {
    id: 'shanghai',
    name: '上海',
    country: '中国',
    image: 'https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?q=80&w=1000&auto=format&fit=crop',
    tags: ['#魔都', '#外滩', '#迪士尼'],
    explorers: '80万+',
    description: `### 上海3日摩登之旅
**核心亮点**：外滩夜景、武康路漫步、陆家嘴三件套。`
  },
  {
    id: 'chengdu',
    name: '成都',
    country: '中国',
    image: 'https://images.unsplash.com/photo-1546702312-73c2f1127c68?q=80&w=1000&auto=format&fit=crop',
    tags: ['#慢生活', '#大熊猫', '#川菜美食'],
    explorers: '60万+',
    description: `### 成都4日慢生活体验
**核心亮点**：熊猫基地、宽窄巷子、火锅盛宴、青城山。`
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
    title: '南昌瓦罐汤真的绝了！大士院早市必去',
    content: '在大士院吃到撑！油条包麻糍真的太好吃了，拌粉+瓦罐汤10块钱吃到爽。',
    image: 'https://images.unsplash.com/photo-1543080036-79178905389f?q=80&w=1000',
    created_at: '2024-05-10T12:00:00Z',
    location: '江西南昌',
    likes_count: 124,
    comments_count: 18,
    type: 'guide',
    rating: 4.9,
    tags: ['#南昌美食', '#避坑指南'],
    days: 3
  },
  {
    id: 'post-2',
    author_id: 'user-2',
    author: {
      name: 'Marcus T.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
    },
    title: '北京胡同Citywalk：在史家胡同感受老北京',
    content: '相比南锣鼓巷，史家胡同更加安静，这里有真正的北京人生活气息。',
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=1000',
    created_at: '2024-05-10T09:00:00Z',
    location: '北京',
    likes_count: 32,
    comments_count: 45,
    type: 'qa',
    rating: 4.8,
    tags: ['#Citywalk', '#老北京'],
    days: 1
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
