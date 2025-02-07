import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export interface Character {
  id: string;
  name: string;
  gender: 'male' | 'female';
  style: 'anime' | 'casual' | 'formal';
  previewImage: string;
  animations: {
    idle: string;
    propose: string;
    celebrate: string;
    // Add more animations as needed
  };
}

const characters: Character[] = [
  {
    id: 'anime-male-1',
    name: 'Kai',
    gender: 'male',
    style: 'anime',
    previewImage: '/characters/anime-male-1.png',
    animations: {
      idle: '/animations/anime-male-1/idle.json',
      propose: '/animations/anime-male-1/propose.json',
      celebrate: '/animations/anime-male-1/celebrate.json',
    },
  },
  // Add more character presets
];

interface CharacterSelectorProps {
  onSelect: (character: Character) => void;
}

export default function CharacterSelector({ onSelect }: CharacterSelectorProps) {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [customName, setCustomName] = useState('');

  const handleSelect = (character: Character) => {
    setSelectedCharacter(character);
  };

  const handleConfirm = () => {
    if (selectedCharacter && customName) {
      onSelect({
        ...selectedCharacter,
        name: customName,
      });
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Choose Your Character
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {characters.map((character) => (
          <motion.div
            key={character.id}
            className={`p-4 rounded-lg cursor-pointer ${
              selectedCharacter?.id === character.id
                ? 'border-2 border-pink-500'
                : 'border border-gray-200 dark:border-gray-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelect(character)}
          >
            <div className="relative w-full h-48">
              <Image
                src={character.previewImage}
                alt={character.name}
                fill
                className="object-contain"
              />
            </div>
            <p className="text-center mt-2 text-gray-700 dark:text-gray-300">
              {character.name}
            </p>
          </motion.div>
        ))}
      </div>

      {selectedCharacter && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Character Name
            </label>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
              placeholder="Enter character name"
            />
          </div>

          <motion.button
            onClick={handleConfirm}
            className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!customName}
          >
            Confirm Character
          </motion.button>
        </div>
      )}
    </div>
  );
} 