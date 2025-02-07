import { useState } from 'react';
import { motion } from 'framer-motion';

interface RecipientFormProps {
  onSubmit: (data: { name: string; email?: string }) => void;
}

export default function RecipientForm({ onSubmit }: RecipientFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email: email || undefined });
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Recipient Details
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Recipient Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
            placeholder="Enter recipient's name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email (optional)
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
            placeholder="Enter recipient's email"
          />
        </div>
        <motion.button
          type="submit"
          className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={!name}
        >
          Continue
        </motion.button>
      </form>
    </div>
  );
} 