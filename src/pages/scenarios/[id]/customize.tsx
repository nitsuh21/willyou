import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import gsap from 'gsap';
import { styles } from '../../../utils/styles';
import { Loading } from '../../../components/shared/Loading';
import type { AvatarStyle } from '../../../types/scenarios';

const hairColors = [
  { name: 'Black', value: 'bg-gray-900' },
  { name: 'Brown', value: 'bg-yellow-900' },
  { name: 'Blonde', value: 'bg-yellow-400' },
  { name: 'Red', value: 'bg-red-500' },
];

const hairStyles = [
  { name: 'Short', value: 'short' as const },
  { name: 'Long', value: 'long' as const },
  { name: 'Wavy', value: 'wavy' as const },
  { name: 'Curly', value: 'curly' as const },
];

const outfits = [
  { name: 'Casual', value: 'casual' as const },
  { name: 'Formal', value: 'formal' as const },
  { name: 'Fancy', value: 'fancy' as const },
  { name: 'Party', value: 'party' as const },
];

const accessories = [
  { name: 'None', value: undefined },
  { name: 'Glasses', value: 'glasses' as const },
  { name: 'Hat', value: 'hat' as const },
  { name: 'Bowtie', value: 'bowtie' as const },
  { name: 'Necklace', value: 'necklace' as const },
];

export default function Customize() {
  const router = useRouter();
  const { id } = router.query;
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [previewKey, setPreviewKey] = useState(0);

  const [askerStyle, setAskerStyle] = useState<AvatarStyle>({
    bodyColor: 'bg-blue-500',
    hairColor: 'bg-gray-900',
    hairStyle: 'short',
    outfit: 'formal',
    accessories: undefined,
  });

  const [receiverStyle, setReceiverStyle] = useState<AvatarStyle>({
    bodyColor: 'bg-pink-500',
    hairColor: 'bg-yellow-900',
    hairStyle: 'long',
    outfit: 'fancy',
    accessories: undefined,
  });

  const handleStyleChange = (
    character: 'asker' | 'receiver',
    property: keyof AvatarStyle,
    value: string | undefined
  ) => {
    if (character === 'asker') {
      setAskerStyle((prev) => ({
        ...prev,
        [property]: value,
      }));
    } else {
      setReceiverStyle((prev) => ({
        ...prev,
        [property]: value,
      }));
    }
    setPreviewKey((prev) => prev + 1);
  };

  useEffect(() => {
    if (!id) return;
    controls.start('visible');
  }, [id, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  if (!id) return <Loading message="Loading scene..." type="hearts" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 overflow-hidden">
      <div className="relative py-20 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-pink-200 rounded-full -top-48 -left-48 blur-3xl opacity-30 animate-pulse" />
          <div className="absolute w-96 h-96 bg-purple-200 rounded-full -bottom-48 -right-48 blur-3xl opacity-30 animate-pulse" />
        </div>

        <motion.div
          ref={containerRef}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="container mx-auto max-w-6xl relative"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h1 className={`${styles.text.heading.h1} ${styles.text.gradient.pink} mb-6`}>
              Customize Your Scene
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Make it personal! Customize both characters to create your perfect moment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Asker customization */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Customize Asker</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className={styles.form.label}>Hair Color</label>
                    <div className="grid grid-cols-4 gap-2">
                      {hairColors.map(color => (
                        <motion.button
                          key={color.value}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleStyleChange('asker', 'hairColor', color.value)}
                          className={`w-full h-10 rounded-lg ${color.value} ${
                            askerStyle.hairColor === color.value ? 'ring-2 ring-pink-500' : ''
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className={styles.form.label}>Hair Style</label>
                    <div className="grid grid-cols-2 gap-2">
                      {hairStyles.map(style => (
                        <motion.button
                          key={style.value}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleStyleChange('asker', 'hairStyle', style.value)}
                          className={`px-4 py-2 rounded-lg ${
                            askerStyle.hairStyle === style.value
                              ? 'bg-pink-500 text-white'
                              : 'bg-gray-100 hover:bg-gray-200'
                          }`}
                        >
                          {style.name}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className={styles.form.label}>Outfit</label>
                    <div className="grid grid-cols-2 gap-2">
                      {outfits.map(outfit => (
                        <motion.button
                          key={outfit.value}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleStyleChange('asker', 'outfit', outfit.value)}
                          className={`px-4 py-2 rounded-lg ${
                            askerStyle.outfit === outfit.value
                              ? 'bg-pink-500 text-white'
                              : 'bg-gray-100 hover:bg-gray-200'
                          }`}
                        >
                          {outfit.name}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className={styles.form.label}>Accessories</label>
                    <div className="grid grid-cols-2 gap-2">
                      {accessories.map(acc => (
                        <motion.button
                          key={acc.name}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleStyleChange('asker', 'accessories', acc.value as string)}
                          className={`px-4 py-2 rounded-lg ${
                            askerStyle.accessories === acc.value
                              ? 'bg-pink-500 text-white'
                              : 'bg-gray-100 hover:bg-gray-200'
                          }`}
                        >
                          {acc.name}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Preview */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg h-[500px] relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={previewKey}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full"
                  >
                    
                    
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Receiver customization */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Customize Receiver</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className={styles.form.label}>Hair Color</label>
                    <div className="grid grid-cols-4 gap-2">
                      {hairColors.map(color => (
                        <motion.button
                          key={color.value}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleStyleChange('receiver', 'hairColor', color.value)}
                          className={`w-full h-10 rounded-lg ${color.value} ${
                            receiverStyle.hairColor === color.value ? 'ring-2 ring-pink-500' : ''
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className={styles.form.label}>Hair Style</label>
                    <div className="grid grid-cols-2 gap-2">
                      {hairStyles.map(style => (
                        <motion.button
                          key={style.value}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleStyleChange('receiver', 'hairStyle', style.value)}
                          className={`px-4 py-2 rounded-lg ${
                            receiverStyle.hairStyle === style.value
                              ? 'bg-pink-500 text-white'
                              : 'bg-gray-100 hover:bg-gray-200'
                          }`}
                        >
                          {style.name}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className={styles.form.label}>Outfit</label>
                    <div className="grid grid-cols-2 gap-2">
                      {outfits.map(outfit => (
                        <motion.button
                          key={outfit.value}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleStyleChange('receiver', 'outfit', outfit.value)}
                          className={`px-4 py-2 rounded-lg ${
                            receiverStyle.outfit === outfit.value
                              ? 'bg-pink-500 text-white'
                              : 'bg-gray-100 hover:bg-gray-200'
                          }`}
                        >
                          {outfit.name}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className={styles.form.label}>Accessories</label>
                    <div className="grid grid-cols-2 gap-2">
                      {accessories.map(acc => (
                        <motion.button
                          key={acc.name}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleStyleChange('receiver', 'accessories', acc.value as string)}
                          className={`px-4 py-2 rounded-lg ${
                            receiverStyle.accessories === acc.value
                              ? 'bg-pink-500 text-white'
                              : 'bg-gray-100 hover:bg-gray-200'
                          }`}
                        >
                          {acc.name}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="mt-12 text-center"
          >
            <motion.button
              onClick={() => router.push(`/scenarios/${id}/preview`)}
              className={`${styles.button.base} ${styles.button.primary} text-lg`}
            >
              Continue to Preview
              <motion.span
                className="inline-block ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                →
              </motion.span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
