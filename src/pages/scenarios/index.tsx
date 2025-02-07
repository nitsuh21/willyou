import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export default function ScenariosPage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [showComingSoonDialog, setShowComingSoonDialog] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleCardClick = (type: string) => {
    if (type === 'valentine') {
      router.push('/scenarios/valentine/customize');
    } else {
      setSelectedType(type);
      setShowComingSoonDialog(true);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Valentine\'s Message',
          text: 'Create your own Valentine\'s message!',
          url: window.location.href
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (error) {
        console.error('Error copying to clipboard:', error);
      }
    }
  };

  return (
    <div className={`min-h-screen ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white' 
        : 'bg-gradient-to-br from-pink-100 via-red-100 to-purple-100'
    } relative overflow-hidden`}>
      {/* Theme Toggle Button */}
      <motion.button
        onClick={toggleTheme}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg"
      >
        {theme === 'dark' ? '🌞' : '🌙'}
      </motion.button>

      <div className="container mx-auto px-4 py-16 relative">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 mb-4"
          >
            Choose Your Moment
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-700 dark:text-gray-200"
          >
            Create something special for someone you love
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              id: 'valentine',
              title: 'Will You Be My Valentine?',
              description: 'Create a magical Valentine\'s proposal',
              icon: '❤️'
            },
            {
              id: 'proposal',
              title: 'Will You Marry Me?',
              description: 'Pop the question in a unique way',
              icon: '💍'
            },
            {
              id: 'prom',
              title: 'Will You Go To Prom?',
              description: 'Make your prom invitation special',
              icon: '🎭'
            },
            {
              id: 'date',
              title: 'Will You Go On A Date?',
              description: 'Ask them out in style',
              icon: '🌹'
            },
            {
              id: 'anniversary',
              title: 'Will You Celebrate With Me?',
              description: 'Make your anniversary memorable',
              icon: '🎊'
            },
            {
              id: 'custom',
              title: 'Custom Will You...?',
              description: 'Create your own special request',
              icon: '✨'
            }
          ].map((card) => (
            <motion.button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * Math.random() }}
              className={`group relative ${
                theme === 'dark'
                  ? 'bg-gray-800/50 border-gray-700'
                  : 'bg-white/10 border-white/20'
              } backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border w-full`}
            >
              <div className="aspect-w-16 aspect-h-9 p-8">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="text-6xl transform group-hover:scale-110 transition-transform">
                    {card.icon}
                  </div>
                  <h3 className={`text-2xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {card.title}
                  </h3>
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                    {card.description}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Coming Soon Modal */}
      <AnimatePresence>
        {selectedType && selectedType !== 'valentine' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedType(null)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className={`relative p-8 rounded-2xl ${
                theme === 'dark'
                  ? 'bg-gray-800 text-white'
                  : 'bg-white text-gray-800'
              } max-w-md w-full text-center space-y-6`}
            >
              <div className="text-6xl animate-bounce">
                {selectedType === 'proposal' ? '💍' : 
                 selectedType === 'prom' ? '🎭' :
                 selectedType === 'date' ? '🌹' :
                 selectedType === 'anniversary' ? '🎊' : '✨'}
              </div>
              <h3 className="text-2xl font-bold">
                Coming Soon!
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                We're working hard to make the perfect {selectedType} card. Would you like to share your ideas with us?
              </p>
              <div className="flex justify-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedType(null)}
                  className={`px-6 py-2 rounded-xl ${
                    theme === 'dark'
                      ? 'bg-gray-700 hover:bg-gray-600'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  Maybe Later
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = 'mailto:feedback@willyou.com'}
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
                >
                  Share Ideas
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
