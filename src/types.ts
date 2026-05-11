export interface Attraction {
  id: string;
  destination_id: string;
  name: string;
  image: string;
  description: string;
  info?: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  tags: string[];
  explorers: string;
  is_trending?: boolean;
  description?: string; // 深度攻略 Markdown
  attractions?: Attraction[];
  created_at?: string;
}

export interface Post {
  id: string;
  author_id: string;
  author: {
    name: string;
    avatar: string;
    location?: string;
  };
  title: string;
  content: string;
  image: string;
  location: string;
  likes_count: number;
  comments_count: number;
  type: 'photo' | 'guide' | 'qa';
  rating?: number;
  tags?: string[];
  days?: number;
  created_at: string;
}

export interface Comment {
  id: string;
  post_id: string;
  author_id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  created_at: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  level: string;
  stats?: {
    footprints: number;
    followers: number;
    likes: number;
  };
  created_at: string;
}

export type View = 'home' | 'explore' | 'community' | 'profile' | 'destination' | 'post' | 'auth';
