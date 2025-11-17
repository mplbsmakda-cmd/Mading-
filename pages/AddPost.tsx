import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../services/supabase';
import type { NewPost } from '../types';
import AnimatedPage from '../components/AnimatedPage';
import { motion, AnimatePresence } from 'framer-motion';

const AddPost: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('Artikel');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    // State for text stickers
    const [fontFamily, setFontFamily] = useState('Permanent Marker');
    const [fontSize, setFontSize] = useState(32);

    const isTextStickerMode = useMemo(() => !title && !imageUrl, [title, imageUrl]);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content) {
            setError('Konten wajib diisi.');
            return;
        }

        setLoading(true);
        setError(null);

        const newPost: NewPost = {
            title: title || undefined,
            content,
            author: author || 'Anonim',
            category,
            image_url: imageUrl || undefined,
        };

        if (isTextStickerMode) {
          newPost.font_family = fontFamily;
          newPost.font_size = fontSize;
          newPost.category = 'Stiker Teks';
        }

        try {
            await createPost(newPost);
            navigate('/');
        } catch (err) {
            setError('Gagal mengirim postingan. Coba lagi nanti.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const inputClasses = "w-full px-4 py-2 rounded-md bg-light-navy/50 backdrop-blur-sm border-2 border-lightest-navy focus:border-celestial-gold focus:outline-none focus:ring-2 focus:ring-celestial-gold/50 text-starlight-white transition-all duration-300";

    return (
        <AnimatedPage>
            <div className="max-w-2xl mx-auto py-10 px-4">
                <h1 className="font-display text-4xl md:text-5xl font-bold text-lightest-slate mb-8 text-center">Tempel Karyamu di Mading</h1>

                {error && (
                    <div className="bg-red-500/20 text-red-300 p-4 rounded-md mb-6">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-light-slate mb-2">Judul (Kosongkan untuk Stiker Teks)</label>
                        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className={inputClasses} />
                    </div>
                    <div>
                        <label htmlFor="imageUrl" className="block text-light-slate mb-2">URL Gambar (Kosongkan untuk Stiker Teks)</label>
                        <input type="url" id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className={inputClasses} placeholder="https://..." />
                    </div>
                    
                    <AnimatePresence>
                    {isTextStickerMode && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-lightest-navy/50 p-4 rounded-lg space-y-4 overflow-hidden border border-nebula-teal/20"
                        >
                          <h3 className="text-lg font-bold text-nebula-teal">Kustomisasi Stiker Teks</h3>
                          <div>
                            <label htmlFor="fontFamily" className="block text-light-slate mb-2">Pilih Font</label>
                             <select id="fontFamily" value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} className={inputClasses}>
                                <option value="Permanent Marker">Permanent Marker</option>
                                <option value="Bangers">Bangers</option>
                                <option value="Lobster">Lobster</option>
                                <option value="Poppins">Poppins</option>
                            </select>
                          </div>
                           <div>
                            <label htmlFor="fontSize" className="block text-light-slate mb-2">Ukuran Font: {fontSize}px</label>
                            <input type="range" id="fontSize" min="18" max="72" value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value, 10))} className="w-full h-2 bg-light-navy rounded-lg appearance-none cursor-pointer" />
                          </div>
                        </motion.div>
                    )}
                    </AnimatePresence>
                    
                    <div>
                        <label htmlFor="author" className="block text-light-slate mb-2">Nama (Opsional)</label>
                        <input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Default: Anonim" className={inputClasses} />
                    </div>
                     {!isTextStickerMode && (
                        <div>
                            <label htmlFor="category" className="block text-light-slate mb-2">Kategori</label>
                            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className={inputClasses}>
                                <option>Artikel</option>
                                <option>Pengumuman</option>
                                <option>Prestasi</option>
                                <option>Karya</option>
                                <option>Random</option>
                            </select>
                        </div>
                    )}
                    <div>
                        <label htmlFor="content" className="block text-light-slate mb-2">Konten</label>
                        <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} rows={8} className={inputClasses} required></textarea>
                    </div>
                    <div className="text-center pt-4">
                        <motion.button
                            type="submit"
                            disabled={loading}
                            className="bg-nebula-teal text-navy font-bold py-3 px-10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-lg animate-pulse-glow"
                            whileHover={{ scale: 1.05, filter: 'brightness(1.2)' }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {loading ? 'Menempel...' : 'Tempel di Mading'}
                        </motion.button>
                    </div>
                </form>
            </div>
        </AnimatedPage>
    );
};

export default AddPost;