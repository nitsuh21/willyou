import { useState } from 'react';
import { motion } from 'framer-motion';

interface MessageComposerProps {
  type: string;
  onComplete: (message: string) => void;
}

export default function MessageComposer({ type, onComplete }: MessageComposerProps) {
  const [message, setMessage] = useState('');

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-8">Write Your Message</h2>
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full h-48 px-4 py-3 rounded-lg bg-white/10 text-white resize-none"
          placeholder="Write your heartfelt message..."
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-4 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold"
          onClick={() => onComplete(message)}
        >
          Continue
        </motion.button>
      </div>
    </div>
  );
} 