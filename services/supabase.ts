
import { createClient } from '@supabase/supabase-js';
import type { Post, NewPost } from '../types';

const supabaseUrl = 'https://hvdrxlvmxgzgvuupnbzo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2ZHJ4bHZteGd6Z3Z1dXBuYnpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzMjI5NTQsImV4cCI6MjA3ODg5ODk1NH0.H5pJXVh-JMCkspF4ouWcyvuPTQCWmFmwEyL-TSNFOpo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const fetchPosts = async (): Promise<Post[]> => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error.message || error);
    alert(`Gagal mengambil data dari Supabase. Pastikan tabel 'posts' ada dan RLS (Row Level Security) mengizinkan akses baca (read) untuk pengguna anonim. Error: ${error.message}`);
    return [];
  }
  return data as Post[];
};

export const createPost = async (post: NewPost): Promise<Post | null> => {
  const { data, error } = await supabase
    .from('posts')
    .insert([{ ...post, published_at: new Date().toISOString() }])
    .select()
    .single();

  if (error) {
    console.error('Error creating post:', error);
    throw error;
  }
  return data as Post;
};
