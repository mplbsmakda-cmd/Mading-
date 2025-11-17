import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-2 border-nebula-teal/50 rounded-full animate-holo-rotate"></div>
        <div className="absolute inset-2 border-2 border-galaxy-purple/50 rounded-full animate-holo-rotate" style={{ animationDirection: 'reverse' }}></div>
        <div className="absolute inset-0 rounded-full bg-nebula-teal/50 animate-holo-pulse"></div>
        <div className="absolute inset-0 rounded-full bg-galaxy-purple/50 animate-holo-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-starlight-white rounded-full"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;