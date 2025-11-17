import React, { useRef, useState } from 'react';
import type { Post } from '../types';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import type { ColorScheme } from '../pages/Home';

interface PostCardProps {
  post: Post;
  index: number;
  onCardClick: (post: Post) => void;
  colorScheme: ColorScheme;
}

const PostCard: React.FC<PostCardProps> = ({ post, index, onCardClick, colorScheme }) => {
    const formattedDate = new Date(post.published_at).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
    
    const isTextSticker = !post.title && !post.image_url;

    const cardRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-150, 150], [25, -25]);
    const rotateY = useTransform(x, [-150, 150], [-25, 25]);

    const handleMouseMove = (event: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        x.set(event.clientX - rect.left - rect.width / 2);
        y.set(event.clientY - rect.top - rect.height / 2);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const elegantColors = ['#FFD700', '#00B5AD', '#9370DB', '#e6f1ff'];
    const [stickerColor] = useState(() => elegantColors[Math.floor(Math.random() * elegantColors.length)]);


    if (isTextSticker) {
      return (
        <span
          className="whitespace-pre-wrap select-none animate-flicker"
          style={{
            fontFamily: post.font_family || '"Permanent Marker", cursive',
            fontSize: post.font_size ? `${post.font_size}px` : '28px',
            color: stickerColor,
            textShadow: `
              0 0 2px #fff,
              0 0 5px ${stickerColor}, 
              0 0 10px ${stickerColor}, 
              0 0 20px ${stickerColor}`,
            display: 'inline-block',
            lineHeight: 1.2,
          }}
        >
          {post.content}
        </span>
      );
    }

    return (
        <motion.div
            layoutId={`card-container-${post.id}`}
            ref={cardRef}
            style={{
                transformStyle: 'preserve-3d',
                rotateX,
                rotateY,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className={`relative break-inside-avoid bg-light-navy/70 backdrop-blur-md rounded-md overflow-hidden shadow-lg group border border-lightest-navy/20 ${colorScheme.border} transition-all duration-300 ${colorScheme.shadow} animate-flicker`}
            onClick={() => onCardClick(post)}
        >
            <div className="absolute inset-0 overflow-hidden rounded-md pointer-events-none bg-nebula-cloud animate-nebula-drift opacity-70"></div>
            <div className="absolute inset-0 overflow-hidden rounded-md pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent"></div>
              <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-1 h-full bg-white/20 absolute left-1/4 animate-scanline"></div>
              </div>
            </div>
            
            {post.image_url && (
              <motion.div 
                className="relative overflow-hidden opacity-80 group-hover:opacity-100 transition-opacity"
                style={{
                  transform: 'translateZ(-20px)',
                  transformStyle: 'preserve-3d',
                }}
              >
                  <motion.img 
                      layoutId={`card-image-${post.id}`}
                      src={post.image_url} 
                      alt={post.title || 'Post Image'} 
                      className="w-full h-40 object-cover"
                  />
                  <div className="absolute inset-0 bg-digital-grid bg-navy opacity-20" style={{backgroundSize: '20px 20px'}}></div>
              </motion.div>
            )}
            <motion.div 
              className="p-4 text-white relative"
              style={{
                transform: 'translateZ(40px)',
                transformStyle: 'preserve-3d',
              }}
            >
                <div>
                  <span className={`inline-block ${colorScheme.tagBg} ${colorScheme.tagText} text-xs font-semibold px-2 py-1 rounded-full mb-2`}>
                      {post.category}
                  </span>
                  <h3 className="font-display text-lg font-bold text-starlight-white mb-1 truncate">{post.title}</h3>
                  <p className="text-xs text-slate">{formattedDate}</p>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default PostCard;