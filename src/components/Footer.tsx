import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-400">
      <div className="container mx-auto px-6 md:px-12 py-12">
        <div className="text-center">
          <p>© {new Date().getFullYear()} Uniquers. All rights reserved.</p>
          <p className="mt-2">Designed with ❤️ for experts worldwide</p>
        </div>
      </div>
    </footer>
  );
};