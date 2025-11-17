import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <motion.header 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="sticky top-0 z-50 bg-light-navy/80 backdrop-blur-md shadow-lg"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link to="/" className="text-2xl font-display font-bold text-starlight-white hover:text-celestial-gold transition-colors">
                        Mading Digital
                    </Link>
                    <nav className="hidden md:flex items-center space-x-2">
                         <motion.div
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                           className="ml-4"
                         >
                            <Link to="/add" className="bg-nebula-teal text-navy font-bold py-2 px-4 rounded-md inline-block shadow-lg animate-pulse-glow">
                                + Isi Mading
                            </Link>
                         </motion.div>
                    </nav>
                    <div className="md:hidden">
                        <motion.div
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                         >
                            <Link to="/add" className="bg-nebula-teal text-navy font-bold py-2 px-4 rounded-md inline-block shadow-lg animate-pulse-glow">
                                + Isi Mading
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.header>
    );
};

export default Header;