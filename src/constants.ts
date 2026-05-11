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

### 二通、3日行程（轻松版）
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
- **最佳时间**：春秋两季（9-10月气候最宜人）
- **交通**：地铁网络极其发达，建议下载“北京一卡通”App
- **预约**：**故宫**需提前7天预约，**毛主席纪念堂、国家博物馆**需提前预约

---

### 二、4日行程建议
#### Day1：皇城初见
- 天安门广场看升旗 → 故宫博物院（深度游）→ 景山公园（俯瞰故宫全景）→ 王府井

#### Day2：长城好汉
- 八达岭/慕田峪长城（建议早去避开人流）→ 奥林匹克公园（鸟巢/水立方夜景）

#### Day3：园林韵味
- 颐和园（昆明湖泛舟）→ 圆明园遗址 → 清华/北大校园（需预约）

#### Day4：胡同慢生活
- 雍和宫祈福 → 国子监 → 什刹海胡同Citywalk → 烟袋斜街`,
    attractions: [
      {
        id: 'gg',
        destination_id: 'beijing',
        name: '故宫博物院',
        image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=600',
        description: '明清两代的皇家宫殿，感受震撼的历史厚重感。',
        info: '门票: 60元(旺季) | 需实名预约'
      },
      {
        id: 'cc',
        destination_id: 'beijing',
        name: '八达岭长城',
        image: 'https://images.unsplash.com/photo-1541144143000-cd9473a60ed3?q=80&w=600',
        description: '不到长城非好汉，感受世界奇迹的宏伟。',
        info: '门票: 40元 | 建议乘坐S2线/高铁直达'
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
    is_trending: true,
    description: `### 上海3日摩登之旅
**核心亮点**：外滩夜景、武康路漫步、陆家嘴三件套、迪士尼乐园。

---

### 一、行程安排
#### Day1：海派风情
- 武康路（Citywalk起点）→ 安福路 → 淮海中路 → 南京路步行街 → 外滩（看夜景）

#### Day2：魔都高度
- 陆家嘴（上海中心/东方明珠）→ 豫园 → 城隍庙 → 艺术展（西岸美术馆/浦东美术馆）

#### Day3：童话世界
- 全天：上海迪士尼度假区（建议提前下载App看排队时间）`,
    attractions: [
      {
        id: 'wt',
        destination_id: 'shanghai',
        name: '外滩',
        image: 'https://images.unsplash.com/photo-1512236258305-32fb110fcbc2?q=80&w=600',
        description: '上海的地标，看万国建筑群与陆家嘴现代奇迹隔江对望。',
        info: '门票: 免费 | 最佳观赏时间: 19:00-22:00'
      },
      {
        id: 'dns',
        destination_id: 'shanghai',
        name: '上海迪士尼',
        image: 'https://images.unsplash.com/photo-1505995433366-e12047f3f144?q=80&w=600',
        description: '中国内地首座迪士尼乐园，体验奇妙的童话旅程。',
        info: '门票: 475元起 | 需提前购票'
      }
    ]
  },
  {
    id: 'chengdu',
    name: '成都',
    country: '中国',
    image: 'https://images.unsplash.com/photo-1546702312-73c2f1127c68?q=80&w=1000&auto=format&fit=crop',
    tags: ['#慢生活', '#大熊猫', '#川菜美食'],
    explorers: '60万+',
    description: `### 成都4日慢生活体验
**核心亮点**：熊猫基地看“花花”、宽窄巷子吃火锅、玉林路的小酒馆、青城山避暑。

---

### 一、行程建议
#### Day1：萌宠与老街
- 成都大熊猫繁育研究基地（建议8点前到）→ 文殊院 → 宽窄巷子

#### Day2：市井生活
- 人民公园（喝盖碗茶/掏耳朵）→ 武侯祠 → 锦里 → 九眼桥酒吧街

#### Day3：文艺时光
- 熊猫书店 → 太古里/春熙路（打卡大熊猫爬墙）→ 玉林路生活圈

#### Day4：问道青城
- 青城山或都江堰一日游`,
    attractions: [
      {
        id: 'xm',
        destination_id: 'chengdu',
        name: '大熊猫繁育基地',
        image: 'https://images.unsplash.com/photo-1564349683136-77e08bef1ed1?q=80&w=600',
        description: '来看国宝大熊猫，尤其是顶流“花花”。',
        info: '门票: 55元 | 需提前在官方公众号预约'
      }
    ]
  },
  {
    id: 'xian',
    name: '西安',
    country: '中国',
    image: 'https://images.unsplash.com/photo-1524316212875-f855e3e34a62?q=80&w=1000&auto=format&fit=crop',
    tags: ['#长安城', '#秦始皇陵', '#碳水天堂'],
    explorers: '70万+',
    description: `### 西安3日古都穿越
**核心亮点**：兵马俑、西安城墙骑行、大唐不夜城、回民街美食。

---

### 一、行程安排
#### Day1：历史厚重
- 陕西历史博物馆 → 西安城墙（南门进）→ 碑林博物馆 → 书院门

#### Day2：奇迹见证
- 秦始皇兵马俑博物馆 → 华清宫 → 长恨歌演出（需提前订票）

#### Day3：人间烟火
- 钟鼓楼 → 回民街/洒金桥（狂吃）→ 大雁塔北广场音乐喷泉 → 大唐不夜城`,
    attractions: [
      {
        id: 'bmy',
        destination_id: 'xian',
        name: '兵马俑博物馆',
        image: 'https://images.unsplash.com/photo-1599889959407-598566c6e1f1?q=80&w=600',
        description: '世界第八大奇迹，感受大秦帝国的雄壮军阵。',
        info: '门票: 120元 | 建议请讲解员'
      }
    ]
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
