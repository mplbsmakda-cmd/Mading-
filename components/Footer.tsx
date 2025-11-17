
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-light-navy border-t border-lightest-navy mt-12 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate">
        <p>&copy; {new Date().getFullYear()} E-Mading Digital. All Rights Reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="hover:text-accent transition-colors">Twitter</a>
          <a href="#" className="hover:text-accent transition-colors">Instagram</a>
          <a href="#" className="hover:text-accent transition-colors">Facebook</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
