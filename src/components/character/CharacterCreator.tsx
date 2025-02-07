import { useState } from 'react';
import { motion } from 'framer-motion';
import CharacterModel from './CharacterModel';
import CharacterControls from './CharacterControls';

interface CharacterCreatorProps {
  onComplete: (character: any) => void;
}

export default function CharacterCreator({ onComplete }: CharacterCreatorProps) {
  const [character, setCharacter] = useState({
    model: 'default',
    name: '',
    customization: {
      hairStyle: 'default',
      hairColor: '#000000',
      skinTone: '#FFE0BD',
      eyeColor: '#4B4B4B',
      outfit: 'casual',
      outfitColor: '#FF0000',
    },
  });

  return (
    <div className="grid grid-cols-2 gap-8">
      {/* Left: Character Preview */}
      <div className="bg-white/5 rounded-2xl overflow-hidden">
        <CharacterModel character={character} />
      </div>

      {/* Right: Customization Controls */}
      <div className="space-y-6">
        <CharacterControls
          character={character}
          onChange={setCharacter}
          onComplete={onComplete}
        />
      </div>
    </div>
  );
} 