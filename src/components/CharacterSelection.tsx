import { motion } from 'framer-motion';
import { Character } from '../types';

interface CharacterSelectionProps {
  characters: Character[];
  onSelect: (character: Character) => void;
}

export default function CharacterSelection({ characters, onSelect }: CharacterSelectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <h2 className="text-4xl font-bold text-white mb-8">Select Your Avatar</h2>
      <div className="grid grid-cols-2 gap-6">
        {characters.map((character) => (
          <motion.div
            key={character.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer bg-white/10 backdrop-blur-lg"
            onClick={() => onSelect(character)}
          >
            <img
              src={character.previewImage}
              alt={character.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <h3 className="text-2xl font-bold text-white">{character.name}</h3>
              <p className="text-white/80 capitalize">{character.style} Style</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 