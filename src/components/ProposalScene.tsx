import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Avatar } from './Avatar';
import { Button } from './Button';

export const ProposalScene = () => {
  const [isProposing, setIsProposing] = useState(false);
  const [response, setResponse] = useState<'pending' | 'yes' | 'no'>('pending');
  const [showButtons, setShowButtons] = useState(false);

  const handlePropose = useCallback(() => {
    setIsProposing(true);
    setTimeout(() => setShowButtons(true), 1500);
  }, []);

  const handleResponse = useCallback((answer: 'yes' | 'no') => {
    setResponse(answer);
    setShowButtons(false);

    if (answer === 'yes') {
      // Trigger confetti
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 7,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#ff0000', '#ff69b4', '#ff1493']
        });
        confetti({
          particleCount: 7,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#ff0000', '#ff69b4', '#ff1493']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, []);

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-pink-100 to-purple-100 overflow-hidden">
      {/* Background hearts */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23ff69b4' d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E")`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Avatars */}
      <Avatar
        gender="male"
        position={{ x: window.innerWidth / 2 - 100, y: window.innerHeight / 2 }}
        isKneeling={isProposing}
        onAnimationComplete={() => setShowButtons(true)}
      />
      <Avatar
        gender="female"
        position={{ x: window.innerWidth / 2 + 100, y: window.innerHeight / 2 }}
      />

      {/* Proposal text */}
      <AnimatePresence>
        {response === 'yes' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-4xl font-bold text-pink-600"
          >
            She said YES! 💖
          </motion.div>
        )}
      </AnimatePresence>

      {/* Buttons */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 space-y-4">
        {!isProposing && (
          <Button onClick={handlePropose}>Will You Marry Me?</Button>
        )}
        {showButtons && response === 'pending' && (
          <div className="space-x-4">
            <Button variant="success" onClick={() => handleResponse('yes')}>
              Yes! 💖
            </Button>
            <Button variant="danger" onClick={() => handleResponse('no')}>
              No 💔
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
