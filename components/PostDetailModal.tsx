import React from 'react';
import type { Post } from '../types';
import { motion } from 'framer-motion';
import type { ColorScheme } from '../pages/Home';

interface PostDetailModalProps {
  post: Post;
  colorScheme: ColorScheme;
  onClose: () => void;
}

const modalContentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

const PostDetailModal: React.FC<PostDetailModalProps> = ({ post, colorScheme, onClose }) => {
  const formattedDate = new Date(post.published_at).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const borderColorClass = colorScheme.border.replace('hover:', '').replace('border-', 'border-') + '/50';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-navy/80 backdrop-blur-sm z-[1000] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        layoutId={`card-container-${post.id}`}
        className={`relative bg-light-navy/80 backdrop-blur-md rounded-lg overflow-hidden max-h-[90vh] max-w-2xl w-full shadow-2xl border ${borderColorClass} shadow-galaxy-purple/10`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 bg-nebula-cloud animate-nebula-drift pointer-events-none opacity-70"></div>
        <div className="relative overflow-y-auto max-h-[90vh]">
          {post.image_url && (
              <motion.img
                  layoutId={`card-image-${post.id}`}
                  src={post.image_url}
                  alt={post.title || 'Post Image'}
                  className="w-full h-64 object-cover"
              />
          )}
          <motion.div 
              className="p-8 text-lightest-slate"
              variants={modalContentVariants}
              initial="hidden"
              animate="visible"
          >
            
            <motion.span variants={itemVariants} className={`inline-block ${colorScheme.tagBg} ${colorScheme.tagText} text-sm font-semibold px-3 py-1 rounded-full mb-4`}>
              {post.category}
            </motion.span>
            <motion.h1 variants={itemVariants} className="font-display text-3xl font-bold text-starlight-white mb-2">{post.title}</motion.h1>
            
            <motion.div variants={itemVariants} className="flex items-center text-slate text-sm mb-6 mt-4">
              <span>Oleh: {post.author}</span>
              <span className="mx-2">•</span>
              <span>{formattedDate}</span>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="prose prose-lg max-w-none text-lightest-slate prose-headings:text-starlight-white prose-a:text-nebula-teal prose-strong:text-starlight-white"
            >
               <p className="whitespace-pre-wrap">{post.content}</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      <button onClick={onClose} className="absolute top-4 right-4 text-white text-4xl hover:text-celestial-gold transition-colors">&times;</button>
    </motion.div>
  );
};

export default PostDetailModal;