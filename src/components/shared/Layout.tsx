import { ReactNode } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FiMoon, FiSun } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Footer } from '../Footer';
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-pink-50'}`}>
      <Link href="/">
        <motion.div
          className={`fixed top-6 left-6 p-4 font-bold text-xl z-50 cursor-pointer ${
            theme === 'dark' ? 'text-pink-400' : 'text-pink-600'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          WillYou?
        </motion.div>
      </Link>

      <motion.button
        onClick={toggleTheme}
        className="fixed top-6 right-6 p-4 rounded-full bg-white/10 backdrop-blur-lg dark:bg-black/20 text-gray-800 dark:text-white z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {theme === 'light' ? <FiMoon size={24} /> : <FiSun size={24} />}
      </motion.button>

      <div className="pb-16">
        {children}
      </div>
      <Footer />
    </div>
  );
}
