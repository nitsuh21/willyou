import { useState } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import Head from 'next/head';
import { FiHeart, FiGift, FiSend, FiMusic, FiArrowRight, FiArrowLeft } from 'react-icons/fi';

export default function CustomizeValentine() {
  const router = useRouter();
  const { theme } = useTheme();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    askerName: '',
    receiverName: '',
    message: '',
    selectedGifts: [] as string[],
    selectedTheme: '',
    musicUrl: '',
    musicStartTime: ''
  });

  const giftOptions = [
    { id: 'chocolate', emoji: '🍫', title: 'Chocolate Box', message: 'Sweet like your love!' },
    { id: 'date', emoji: '🌟', title: 'Romantic Date', message: 'Let me take you somewhere special!' },
    { id: 'flowers', emoji: '💐', title: 'Bouquet', message: 'As beautiful as you are!' },
    { id: 'ring', emoji: '💍', title: 'Promise Ring', message: 'A symbol of my love' },
    { id: 'teddy', emoji: '🧸', title: 'Teddy Bear', message: 'Hugs and cuddles!' },
    { id: 'movie', emoji: '🎬', title: 'Movie Night', message: 'Let\'s watch your favorite!' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGiftSelect = (giftId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedGifts: prev.selectedGifts.includes(giftId)
        ? prev.selectedGifts.filter(id => id !== giftId)
        : [...prev.selectedGifts, giftId]
    }));
  };

  const nextStep = () => {
    if (currentStep === 1 && (!formData.askerName || !formData.receiverName)) {
      alert('Please fill in both names!');
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 4) {
      nextStep();
      return;
    }
    const uniqueId = Math.random().toString(36).substr(2, 9);
    router.push({
      pathname: `/scenarios/valentine/${uniqueId}/${formData.askerName}-to-${formData.receiverName}`,
      query: {
        message: formData.message,
        gifts: formData.selectedGifts.join(','),
        music: formData.musicUrl,
        musicStartTime: formData.musicStartTime
      }
    });
  };

  const stepTitles = [
    'Who\'s This For?',
    'Write Your Message',
    'Choose Your Gifts',
    'Add Some Music'
  ];

  const formatTimeToSeconds = (timeStr: string) => {
    if (!timeStr) return '';
    const [minutes, seconds] = timeStr.split(':').map(num => parseInt(num) || 0);
    return ((minutes * 60) + seconds).toString();
  };

  const formatSecondsToTime = (seconds: string) => {
    if (!seconds) return '';
    const totalSeconds = parseInt(seconds);
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const seconds = formatTimeToSeconds(value);
    setFormData(prev => ({ ...prev, musicStartTime: seconds }));
  };

  return (
    <div className={`min-h-screen ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white' 
        : 'bg-gradient-to-br from-pink-100 via-red-100 to-purple-100 text-gray-800'
    } relative overflow-hidden py-8`}>
      <Head>
        <title>Customize Your Valentine's Message</title>
        <meta name="description" content="Create a special Valentine's message" />
      </Head>

      {/* Floating hearts background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute ${theme === 'dark' ? 'text-pink-500/20' : 'text-pink-300/40'}`}
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              y: [null, '-50px', '50px'],
              rotate: [null, '10deg', '-10deg']
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>
      
      <motion.form 
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto p-8 space-y-10 relative"
      >
        {/* Progress Steps */}
        <div className="flex justify-between items-center mb-8">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === currentStep
                  ? 'bg-pink-500 text-white'
                  : step < currentStep
                  ? 'bg-green-500 text-white'
                  : theme === 'dark'
                  ? 'bg-gray-700 text-gray-300'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {step < currentStep ? '✓' : step}
              </div>
              {step < 4 && (
                <div className={`w-24 h-1 ${
                  step < currentStep
                    ? 'bg-green-500'
                    : theme === 'dark'
                    ? 'bg-gray-700'
                    : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">{stepTitles[currentStep - 1]}</h1>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xl font-medium mb-3">
                    Your Name
                  </label>
                  <input
                    name="askerName"
                    value={formData.askerName}
                    onChange={handleInputChange}
                    className={`w-full p-4 rounded-xl text-lg ${
                      theme === 'dark' 
                        ? 'bg-gray-800/50 border border-gray-700 focus:border-pink-500' 
                        : 'bg-white/90 border border-pink-200 focus:border-pink-400'
                    } transition-colors focus:outline-none`}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xl font-medium mb-3">
                    Their Name
                  </label>
                  <input
                    name="receiverName"
                    value={formData.receiverName}
                    onChange={handleInputChange}
                    className={`w-full p-4 rounded-xl text-lg ${
                      theme === 'dark' 
                        ? 'bg-gray-800/50 border border-gray-700 focus:border-pink-500' 
                        : 'bg-white/90 border border-pink-200 focus:border-pink-400'
                    } transition-colors focus:outline-none`}
                    required
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <label className="block text-xl font-medium mb-3">
                  Your Message (Optional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full p-4 rounded-xl text-lg ${
                    theme === 'dark' 
                      ? 'bg-gray-800/50 border border-gray-700 focus:border-pink-500' 
                      : 'bg-white/90 border border-pink-200 focus:border-pink-400'
                  } transition-colors focus:outline-none`}
                  placeholder="Write your heartfelt message here..."
                />
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {giftOptions.map(gift => (
                    <motion.button
                      key={gift.id}
                      type="button"
                      onClick={() => handleGiftSelect(gift.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-xl text-center ${
                        formData.selectedGifts.includes(gift.id)
                          ? theme === 'dark'
                            ? 'bg-pink-600/30 border-pink-500'
                            : 'bg-pink-100 border-pink-400'
                          : theme === 'dark'
                          ? 'bg-gray-800/50 border border-gray-700 hover:border-pink-500/50'
                          : 'bg-white/90 border border-pink-200 hover:border-pink-400/50'
                      } border-2 transition-colors`}
                    >
                      <div className="text-4xl mb-2">{gift.emoji}</div>
                      <div className="font-medium">
                        {gift.title}
                      </div>
                      <div className="text-sm mt-1">
                        {gift.message}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xl font-medium mb-3">
                    YouTube Music URL (Optional)
                  </label>
                  <input
                    name="musicUrl"
                    value={formData.musicUrl}
                    onChange={handleInputChange}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className={`w-full p-4 rounded-xl text-lg ${
                      theme === 'dark' 
                        ? 'bg-gray-800/50 border border-gray-700 focus:border-pink-500' 
                        : 'bg-white/90 border border-pink-200 focus:border-pink-400'
                    } transition-colors focus:outline-none`}
                  />
                </div>
                <div>
                  <label className="block text-xl font-medium mb-3">
                    Start Time (Optional, format: mm:ss)
                  </label>
                  <input
                    type="text"
                    name="musicStartTime"
                    value={formatSecondsToTime(formData.musicStartTime)}
                    onChange={handleTimeChange}
                    placeholder="2:00"
                    className={`w-full p-4 rounded-xl text-lg ${
                      theme === 'dark' 
                        ? 'bg-gray-800/50 border border-gray-700 focus:border-pink-500' 
                        : 'bg-white/90 border border-pink-200 focus:border-pink-400'
                    } transition-colors focus:outline-none`}
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between pt-8">
          {currentStep > 1 && (
            <motion.button
              type="button"
              onClick={prevStep}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl ${
                theme === 'dark'
                  ? 'bg-gray-800 hover:bg-gray-700'
                  : 'bg-white/90 hover:bg-white'
              } transition-colors`}
            >
              <FiArrowLeft /> Back
            </motion.button>
          )}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white ml-auto"
          >
            {currentStep === 4 ? (
              <>Create <FiSend className="ml-2" /></>
            ) : (
              <>Next <FiArrowRight className="ml-2" /></>
            )}
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
}