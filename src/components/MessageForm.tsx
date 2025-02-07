import { useState } from 'react';
import { motion } from 'framer-motion';

interface MessageFormProps {
  onSubmit: (message: string) => void;
}

export default function MessageForm({ onSubmit }: MessageFormProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(message);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Your Message
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 min-h-[150px]"
            placeholder="Write your message..."
            required
          />
        </div>
        <motion.button
          type="submit"
          className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={!message}
        >
          Create Invitation
        </motion.button>
      </form>
    </div>
  );
} 