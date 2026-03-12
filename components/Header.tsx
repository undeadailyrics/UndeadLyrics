import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
        AI Rap Lyricist
      </h1>
      <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
        Turn your ideas into full-length rap anthems. Just drop a concept, choose your style, and let the AI do the rest.
      </p>
    </header>
  );
};

export default Header;
