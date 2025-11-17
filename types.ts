export interface Post {
  id: number;
  created_at: string;
  title: string | null;
  content: string;
  author: string;
  category: string;
  image_url: string | null;
  video_url?: string;
  published_at: string;
  font_family?: string;
  font_size?: number;
  text_color?: string;
}

export type NewPost = {
  title?: string; // Title is now optional
  content: string;
  author?: string; // Author is now optional
  category: string;
  image_url?: string;
  video_url?: string;
  font_family?: string;
  font_size?: number;
  text_color?: string;
};