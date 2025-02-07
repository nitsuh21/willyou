import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useTheme } from '../context/ThemeContext';
import { FiMoon, FiSun, FiHeart, FiGift, FiCamera, FiArrowDown, FiMusic } from 'react-icons/fi';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const { theme, toggleTheme } = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate hero section elements
      gsap.from(textRef.current?.querySelectorAll('.animate-text'), {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out',
      });

      // Animate features
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top center',
          end: 'bottom center',
          toggleActions: 'play none none reverse',
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-gray-900 dark:to-slate-900 transition-colors duration-500">
      {/* Theme Toggle */}
      <motion.button
        onClick={toggleTheme}
        className="fixed top-6 right-6 p-4 rounded-full bg-white/10 backdrop-blur-lg dark:bg-black/20 text-gray-800 dark:text-white z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 180, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {theme === 'light' ? <FiMoon size={24} /> : <FiSun size={24} />}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      {/* Hero Section */}
      <div ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 dark:from-pink-500/10 dark:to-purple-500/10 backdrop-blur-3xl" />
        </motion.div>

        <motion.div
          ref={textRef}
          style={{ y: textY }}
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        >
          <motion.h1 
            className="animate-text text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600 dark:from-pink-400 dark:to-purple-400 mb-6"
          >
            Will You?
          </motion.h1>
          <motion.p 
            className="animate-text text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-12"
          >
            Create beautiful digital requests that will make the moment memorable and captured.
          </motion.p>
          <motion.div className="animate-text">
            <Link href="/scenarios" className="inline-block">
              <motion.button
                className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold text-lg shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                whileTap={{ scale: 0.95 }}
              >
                Start Creating
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FiArrowDown className="text-4xl text-gray-600 dark:text-gray-400" />
        </motion.div>
      </div>

      {/* Features Section */}
      <div ref={featuresRef} className="relative z-10 py-24 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
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
