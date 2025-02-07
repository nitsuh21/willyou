import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { ReactNode } from 'react';
import { styles } from '../../utils/styles';
import { animations } from '../../utils/animations';
import { useTheme } from '../../context/ThemeContext';
import { FiMoon, FiSun } from 'react-icons/fi';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  showHeader?: boolean;
  showFooter?: boolean;
  backgroundPattern?: 'hearts' | 'stars' | 'confetti' | 'none';
}

export const Layout = ({
  children,
  title = 'WillYou?',
  description = 'Create magical moments with beautiful, interactive invitation pages',
  showHeader = true,
  showFooter = true,
  backgroundPattern = 'none',
}: LayoutProps) => {
  const { theme, toggleTheme } = useTheme();
  
  const getBackgroundStyle = () => {
    if (backgroundPattern === 'none') return '';
    return styles.patterns[backgroundPattern];
  };

  return (
    <div className={`relative min-h-screen ${theme}`}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Theme Toggle Button */}
      <motion.button
        onClick={toggleTheme}
        className="fixed top-6 right-6 p-3 rounded-full bg-white/10 backdrop-blur-lg dark:bg-black/20 text-gray-800 dark:text-white z-50 shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 180, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      {/* Background with pattern */}
      <div className="fixed inset-0 z-[-1]">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white dark:from-gray-900 dark:to-slate-900 transition-colors duration-500" />
        {backgroundPattern !== 'none' && (
          <div className={`absolute inset-0 opacity-5 dark:opacity-10 ${getBackgroundStyle()}`} />
        )}
      </div>

      {/* Content */}
      <div className="relative z-0">
        {showHeader && (
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/10 dark:bg-black/10 backdrop-blur-lg border-b border-white/10 dark:border-white/5"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
              <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600 dark:from-pink-400 dark:to-purple-400">
                WillYou?
              </Link>
              <div className="flex items-center space-x-6">
                <Link href="/scenarios" className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                  Scenarios
                </Link>
                <Link href="/gallery" className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                  Gallery
                </Link>
              </div>
            </nav>
          </motion.header>
        )}

        <main className="pt-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>

        {showFooter && (
          <footer className="py-8 mt-16 bg-white/5 dark:bg-black/5 backdrop-blur-lg border-t border-white/10 dark:border-white/5">
            <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
              <p>Made with ❤️ for special moments</p>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
};
