import { motion } from 'framer-motion';
import Head from 'next/head';
import { FiMail, FiHeart } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

export default function GalleryPage() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-pink-50'}`}>
      <Head>
        <title>Gallery - Coming Soon | Will You</title>
      </Head>

      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`max-w-2xl mx-auto text-center p-8 rounded-3xl shadow-xl ${
            theme === 'dark'
              ? 'bg-gray-800/50 backdrop-blur-lg border border-pink-500/20'
              : 'bg-white/70 backdrop-blur-lg border border-pink-300/50'
          }`}
        >
          {/* Floating Hearts Animation */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{ 
                  opacity: 0,
                  scale: 0.5,
                  x: Math.random() * 100 - 50,
                  y: Math.random() * 100
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5],
                  y: [0, -100],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeInOut"
                }}
              >
                <FiHeart className={`w-6 h-6 ${theme === 'dark' ? 'text-pink-500/20' : 'text-pink-300/40'}`} />
              </motion.div>
            ))}
          </div>

          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              theme === 'dark' ? 'text-pink-400' : 'text-pink-600'
            }`}
          >
            Love Stories Gallery
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`text-xl mb-8 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            <p className="mb-4">
              Coming Soon! 💝
            </p>
            <p className="text-lg">
              We're working on something special - a place to showcase beautiful proposal stories.
              Share your story with us and be among the first to be featured!
            </p>
          </motion.div>

          <motion.a
            href="mailto:nitsuhdemissew21@gmail.com?subject=My%20Proposal%20Story&body=Share%20your%20beautiful%20story%20with%20us!"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-lg font-medium ${
              theme === 'dark'
                ? 'bg-pink-500/20 hover:bg-pink-500/30 text-pink-400'
                : 'bg-pink-100 hover:bg-pink-200 text-pink-600'
            } transition-colors`}
          >
            <FiMail className="w-5 h-5" />
            Share Your Story
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
