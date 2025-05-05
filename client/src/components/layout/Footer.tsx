import { useState } from 'react';

const Footer = () => {
  const [year] = useState(() => new Date().getFullYear());
  
  return (
    <footer className="bg-white border-t border-gray-200 py-4 px-6 text-center">
      <div className="text-sm text-gray-500">
        &copy; {year} MrAix Expo. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
