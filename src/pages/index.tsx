import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from '../context/ThemeContext';
import { FiMoon, FiSun, FiHeart, FiGift, FiCamera, FiArrowDown, FiMusic } from 'react-icons/fi';
import { useRef } from 'react';

const features = [
  {
    icon: FiHeart,
    title: 'Express Your Love',
    description: 'Create a heartfelt digital proposal or love message that captures your feelings.',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: FiGift,
    title: 'Beautiful Animations',
    description: 'Stunning visual effects and animations that make your message magical.',
    color: 'from-purple-500 to-indigo-500',
  },
  {
    icon: FiMusic,
    title: 'Your Special Song',
    description: 'Add your favorite love song to make the moment even more memorable.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: FiCamera,
    title: 'Share The Love',
    description: 'Share your special message with your loved one through a unique link.',
    color: 'from-teal-500 to-emerald-500',
  },
];

export default function Home() {
  const { theme, toggleTheme } = useTheme()
  const featuresRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const heartVariants = {
    float: {
      y: [0, -20, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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
        whileTap={{ scale: 0.95 }}
        className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/20"
      >
        {theme === 'dark' ? <FiMoon size={24} /> : <FiSun size={24} />}
      </motion.button>

      {/* Floating Hearts */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            scale: Math.random() * 0.5 + 0.5,
            opacity: 0.6
          }}
          animate="float"
          variants={heartVariants}
          style={{
            position: 'absolute',
            fontSize: '2rem',
            pointerEvents: 'none',
            userSelect: 'none'
          }}
        >
          <FiHeart size={48} />
        </motion.div>
      ))}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-16 relative flex flex-col items-center justify-center min-h-screen"
      >
        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-8xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500"
        >
          Will You...?
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className={`text-xl md:text-2xl text-center mb-12 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          } max-w-2xl`}
        >
          Create beautiful, personalized messages for your special someone. Choose from various scenarios or create your own unique message.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/scenarios" passHref>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-4 rounded-full text-lg font-semibold ${
                theme === 'dark'
                  ? 'bg-white text-gray-900 hover:bg-gray-100'
                  : 'bg-pink-500 text-white hover:bg-pink-600'
              } transform transition-all duration-200 ease-in-out`}
            >
              Get Started
            </motion.a>
          </Link>
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <div ref={featuresRef} className="relative z-10 py-24 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="feature-card group"
              whileHover={{ y: -10 }}
            >
              <div className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 dark:border-white/5 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${feature.color}" />
                <feature.icon className="text-4xl mb-6 bg-gradient-to-r from-pink-500 to-purple-500 p-3 rounded-lg text-white" />
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
