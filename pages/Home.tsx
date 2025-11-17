import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { fetchPosts } from '../services/supabase';
import type { Post } from '../types';
import PostCard from '../components/PostCard';
import PostDetailModal from '../components/PostDetailModal';
import LoadingSpinner from '../components/LoadingSpinner';

export interface ColorScheme {
  border: string;
  tagBg: string;
  tagText: string;
  shadow: string;
}

const colorSchemes: ColorScheme[] = [
  { border: 'hover:border-celestial-gold', tagBg: 'bg-celestial-gold/10', tagText: 'text-celestial-gold', shadow: 'hover:shadow-[0_0_20px_rgba(255,215,0,0.4)]' },
  { border: 'hover:border-nebula-teal', tagBg: 'bg-nebula-teal/10', tagText: 'text-nebula-teal', shadow: 'hover:shadow-[0_0_20px_rgba(0,181,173,0.4)]' },
  { border: 'hover:border-galaxy-purple', tagBg: 'bg-galaxy-purple/10', tagText: 'text-galaxy-purple', shadow: 'hover:shadow-[0_0_20px_rgba(147,112,219,0.4)]' },
];

const materializeAnimation = {
  initial: { opacity: 0, y: -100, scale: 0.8 },
  animate: { opacity: 1, y: 0, scale: 1 },
};

type AnimationVariant = typeof materializeAnimation;
type StyledPost = Post & { style: React.CSSProperties; animation: AnimationVariant; colorScheme: ColorScheme; };
type SelectedPostState = { post: Post; colorScheme: ColorScheme; } | null;

const Home: React.FC = () => {
    const [posts, setPosts] = useState<StyledPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPost, setSelectedPost] = useState<SelectedPostState>(null);
    const constraintsRef = useRef(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 100, stiffness: 500, mass: 2 };
    const smoothMouseX = useSpring(mouseX, springConfig);
    const smoothMouseY = useSpring(mouseY, springConfig);

    const background = useTransform(
        [smoothMouseX, smoothMouseY],
        ([newX, newY]) => `
          radial-gradient(600px at ${newX}px ${newY}px, rgba(255, 215, 0, 0.12), transparent 80%)
        `
    );

    useEffect(() => {
        const getPosts = async () => {
            setLoading(true);
            const fetchedPosts = await fetchPosts();
            
            const styledPosts = fetchedPosts.map((post, index) => {
                const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
                const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
                
                const cardWidth = 320;
                const isTextSticker = !post.title && !post.image_url;
                const itemWidth = isTextSticker ? 250 : cardWidth;
                const randomScheme = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];

                return {
                    ...post,
                    style: {
                        position: 'absolute',
                        top: `${Math.random() * (vh - 300) + 100}px`,
                        left: `${Math.random() * (vw - itemWidth - 50) + 25}px`,
                        transform: `rotate(${Math.random() * 10 - 5}deg)`,
                        zIndex: index,
                    },
                    animation: materializeAnimation,
                    colorScheme: randomScheme,
                };
            });
            
            setPosts(styledPosts);
            setLoading(false);
        };
        getPosts();
    }, []);
    
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!constraintsRef.current) return;
        const rect = (constraintsRef.current as HTMLElement).getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    const handleCardClick = (post: Post) => {
      const isTextSticker = !post.title && !post.image_url;
      if (isTextSticker) return;

      const postWithScheme = posts.find(p => p.id === post.id);
      if (postWithScheme) {
        setSelectedPost({ post: postWithScheme, colorScheme: postWithScheme.colorScheme });
      }
    };

    const handleCloseModal = () => {
      setSelectedPost(null);
    }

    if (loading) {
        return <div className="w-full h-screen flex items-center justify-center bg-navy"><LoadingSpinner /></div>;
    }

    return (
        <div 
            className="w-full min-h-screen overflow-hidden relative -mt-20 -mb-8 bg-navy" 
            ref={constraintsRef}
            onMouseMove={handleMouseMove}
        >
            <div className="absolute inset-0 bg-starfield bg-center animate-star-pan opacity-50"></div>
            <div className="absolute inset-0 bg-digital-grid animate-grid-pan"></div>
            
            <motion.div
                className="pointer-events-none absolute inset-0 z-0"
                style={{ background }}
            />

            <div className="w-full h-full">
                {posts.map((post, index) => (
                    <motion.div
                        key={post.id}
                        style={{...post.style, perspective: '1000px'}}
                        className="w-auto cursor-grab"
                        drag
                        dragConstraints={constraintsRef}
                        dragTransition={{ bounceStiffness: 400, bounceDamping: 15 }}
                        whileDrag={{ 
                          scale: 1.05, 
                          zIndex: 100, 
                          rotate: 0,
                          boxShadow: '0 0 35px -10px rgba(0, 181, 173, 0.7)'
                        }}
                        initial={post.animation.initial}
                        animate={{
                            ...post.animation.animate,
                            rotate: parseFloat(post.style.transform?.match(/rotate\(([^deg]+)deg\)/)?.[1] || '0'),
                        }}
                        transition={{ type: 'spring', damping: 15, stiffness: 80, delay: index * 0.08 }}
                    >
                        <PostCard post={post} index={index} onCardClick={handleCardClick} colorScheme={post.colorScheme}/>
                    </motion.div>
                ))}
            </div>
            <AnimatePresence>
              {selectedPost && <PostDetailModal post={selectedPost.post} colorScheme={selectedPost.colorScheme} onClose={handleCloseModal} />}
            </AnimatePresence>
        </div>
    );
};

export default Home;