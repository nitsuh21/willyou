import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../../../context/ThemeContext';
import Head from 'next/head';
import { FiHeart, FiShare2, FiGift } from 'react-icons/fi';
import confetti from 'canvas-confetti';
import { MusicPlayer } from '../../../../components/MusicPlayer';

export default function ValentinePage() {
  const router = useRouter();
  const { theme } = useTheme();
  const { id, names, message, gifts } = router.query;
  const [askerName, receiverName] = (names as string)?.split('-to-') || ['', ''];
  const giftList = (gifts as string)?.split(',').filter(Boolean) || [];
  const musicUrl = router.query.music as string;
  const [msg, setMessage] = useState('');
  const [giftsState, setGifts] = useState<string[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [noCount, setNoCount] = useState(0);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [response, setResponse] = useState<'yes' | 'no' | null>(null);
  const [openedGifts, setOpenedGifts] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setMessage(params.get('message') || '');
      setGifts((params.get('gifts') || '').split(',').filter(Boolean));
      setDimensions({ width: window.innerWidth, height: window.innerHeight });

      // Trigger confetti on load
      const duration = 15 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, []);

  const giftOptions = [
    { id: 'chocolate', emoji: '🍫', title: 'Box of Chocolates', message: 'Sweet treats for my sweet!' },
    { id: 'flowers', emoji: '💐', title: 'Bouquet of Flowers', message: 'As beautiful as you are!' },
    { id: 'ring', emoji: '💍', title: 'Promise Ring', message: 'A symbol of my love for you.' },
    { id: 'teddy', emoji: '🧸', title: 'Teddy Bear', message: 'Hugs and cuddles!' },
    { id: 'date', emoji: '🌟', title: 'Romantic Date', message: 'Let me take you somewhere special!' },
    { id: 'movie', emoji: '🎬', title: 'Movie Night', message: 'Let\'s watch our favorite movie together!' }
  ];

  const selectedGifts = giftOptions.filter(gift => giftList.includes(gift.id));

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Valentine\'s Message',
          text: `Check out this Valentine's message from ${askerName} to ${receiverName}!`,
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

  const handleGiftOpen = (giftId: string) => {
    if (!openedGifts.includes(giftId)) {
      setOpenedGifts(prev => [...prev, giftId]);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleNoClick = () => {
    setNoCount(count => count + 1);
    if (noCount >= 2) {
      setShowConfirmDialog(true);
    }
  };

  const handleYesClick = () => {
    setResponse('yes');
    confetti({
      particleCount: 150,
      spread: 180,
      origin: { y: 0.8 }
    });
  };

  const handleFinalNo = () => {
    setTimeout(() => {
      router.push('/scenarios');
    }, 3000);
    setResponse('no');
    setShowConfirmDialog(false);
  };

  const FloatingHearts = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute ${theme === 'dark' ? 'text-pink-500/20' : 'text-pink-300/40'}`}
          initial={{
            x: Math.random() * (dimensions.width || 800),
            y: Math.random() * (dimensions.height || 600),
            scale: Math.random() * 0.5 + 0.5,
            rotate: Math.random() * 360
          }}
          animate={{
            y: [null, '-50px', '50px'],
            x: [null, '-20px', '20px'],
            rotate: [null, '10deg', '-10deg'],
            scale: [null, 1.1, 0.9]
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );

  // Flower animation component
  interface FloatingFlowerProps {
    emoji: string;
    delay?: number;
  }

  const FloatingFlower = ({ emoji, delay = 0 }: FloatingFlowerProps) => {
    const [randomX, setRandomX] = useState(0);

    useEffect(() => {
      setRandomX(Math.random() * window.innerWidth);
    }, []);

    return (
      <motion.div
        initial={{ opacity: 0, y: 100, x: randomX }}
        animate={{
          opacity: [0, 1, 1, 0],
          y: -100,
          x: Math.random() * 100 - 50,
          rotate: Math.random() * 360
        }}
        transition={{
          duration: 5,
          delay,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute text-2xl pointer-events-none"
      >
        {emoji}
      </motion.div>
    );
  };

  // Flower emojis for animation
  const flowers = ['🌸', '🌺', '🌹', '🌷', '💐', '🌻'];

  return (
    <div className={`min-h-screen relative overflow-hidden ${theme === 'dark' ? 'bg-gray-900' : 'bg-pink-50'}`}>
      <Head>
        <title>Will You Be My Valentine? - {askerName} asks {receiverName}</title>
      </Head>

      {/* Floating Flowers */}
      <div className="fixed inset-0 pointer-events-none">
        {flowers.map((flower, index) => (
          Array(3).fill(null).map((_, i) => (
            <FloatingFlower 
              key={`${index}-${i}`} 
              emoji={flower} 
              delay={index * 0.5 + i * 2} 
            />
          ))
        ))}
      </div>

      {/* Music Player - Top Left */}
      <div className="fixed top-4 left-4 z-50">
        {musicUrl && (
          <MusicPlayer 
            url={musicUrl} 
            startTime={router.query.musicStartTime as string || '0'} 
          />
        )}
      </div>

      {/* Share Button - Top Right */}
      <motion.button
        onClick={handleShare}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white/10 backdrop-blur-lg hover:bg-white/20 text-pink-500 dark:text-pink-400 shadow-lg"
      >
        {/* <FiShare2 className="w-6 h-6" /> */}
      </motion.button>

      <FloatingHearts />
      
      <div className="container mx-auto px-4 py-16 relative">
        <div className="max-w-4xl mx-auto">
          {response === null ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`backdrop-blur-lg rounded-3xl p-8 shadow-xl relative ${
                theme === 'dark'
                  ? 'bg-gray-900/40 border border-gray-700'
                  : 'bg-white/80 border border-pink-200'
              }`}
            >
              {/* Share Button on Card */}
              <motion.button
                onClick={handleShare}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`absolute top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-full ${
                  theme === 'dark'
                    ? 'bg-gray-800/80 hover:bg-gray-700/80 text-pink-400'
                    : 'bg-pink-100/80 hover:bg-pink-200/80 text-pink-600'
                } backdrop-blur-sm transition-colors shadow-lg`}
              >
                <FiShare2 className="w-4 h-4" />
                <span className="text-sm font-medium">Share</span>
              </motion.button>

              <div className="space-y-8">
                {/* Initial Valentine's Request */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                  <h1 className={`text-5xl md:text-6xl font-bold mb-8 ${
                    theme === 'dark'
                      ? 'bg-gradient-to-r from-pink-400 to-purple-400'
                      : 'bg-gradient-to-r from-pink-600 to-purple-600'
                  } bg-clip-text text-transparent`}>
                    Dear {receiverName}
                  </h1>

                  {msg ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className={`text-2xl italic mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      "{msg}"
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        rotate: [0, 2, -2, 0]
                      }}
                      transition={{ 
                        duration: 0.5,
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                      className={`text-4xl font-bold mb-8 ${
                        theme === 'dark' ? 'text-pink-400' : 'text-pink-600'
                      }`}
                    >
                      ❤️
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className={`text-3xl font-bold mb-12 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
                  >
                    Will you be my Valentine?
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
                  >
                    With love,<br />
                    {askerName}
                  </motion.div>

                  {/* Yes/No Buttons */}
                  <motion.div 
                    className="flex justify-center gap-4 mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                  >
                    <motion.button
                      onClick={handleYesClick}
                      className={`px-12 py-4 text-xl font-bold rounded-xl ${
                        theme === 'dark'
                          ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:from-pink-500 hover:to-purple-500'
                          : 'bg-gradient-to-r from-pink-400 to-purple-400 text-white hover:from-pink-500 hover:to-purple-500'
                      } shadow-lg transition-colors`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Yes! ❤️
                    </motion.button>
                    <motion.button
                      onClick={handleNoClick}
                      className={`px-12 py-4 text-xl font-bold rounded-xl ${
                        theme === 'dark'
                          ? 'bg-gray-800 text-white hover:bg-gray-700'
                          : 'bg-white text-gray-800 hover:bg-gray-50'
                      } shadow-lg transition-colors`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      animate={noCount > 0 ? {
                        x: [0, -4, 4, -4, 4, 0],
                        transition: { duration: 0.5 }
                      } : {}}
                      style={{
                        position: noCount > 0 ? 'relative' : 'static',
                        top: noCount > 0 ? Math.random() * 100 - 50 : 0,
                        left: noCount > 0 ? Math.random() * 100 - 50 : 0,
                      }}
                    >
                      No
                    </motion.button>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ) : response === 'yes' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8 text-center"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
              >
                Yay! Thank you for saying yes! ❤️
              </motion.h2>

              {selectedGifts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-12"
                >
                  <h3 className={`text-2xl font-semibold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    <FiGift className="inline-block mr-2" />
                    Special Gifts for You
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {selectedGifts.map((gift) => (
                      <motion.div
                        key={gift.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.05 }}
                        className={`p-6 rounded-xl ${
                          theme === 'dark'
                            ? 'bg-gray-800/50 border border-gray-700'
                            : 'bg-white/90 border border-pink-200'
                        } cursor-pointer`}
                        onClick={() => handleGiftOpen(gift.id)}
                      >
                        <motion.div
                          animate={
                            openedGifts.includes(gift.id)
                              ? {
                                  rotate: [0, -10, 10, -10, 10, 0],
                                  scale: [1, 1.2, 1],
                                }
                              : {}
                          }
                          transition={{ duration: 0.5 }}
                          className="text-5xl mb-4"
                        >
                          {gift.emoji}
                        </motion.div>
                        <h4 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                          {gift.title}
                        </h4>
                        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          {gift.message}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              <motion.button
                onClick={handleShare}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className={`mt-8 px-6 py-3 rounded-xl ${
                  theme === 'dark'
                    ? 'bg-gray-800 text-white hover:bg-gray-700'
                    : 'bg-white text-gray-800 hover:bg-gray-50'
                } shadow-lg transition-colors`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiShare2 className="inline-block mr-2" />
                Share this moment
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <h2 className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                Maybe next time... 💔
              </h2>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
