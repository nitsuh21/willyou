import { motion } from 'framer-motion';
import { HexColorPicker } from 'react-colorful';

interface CustomizationProps {
  customization: {
    name: string;
    hairColor: string;
    skinTone: string;
    outfitColor: string;
  };
  onChange: (values: any) => void;
  onNext: () => void;
}

export default function CharacterCustomization({
  customization,
  onChange,
  onNext,
}: CustomizationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <h2 className="text-4xl font-bold text-white mb-8">Customize Your Character</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-white mb-2">Character Name</label>
          <input
            type="text"
            value={customization.name}
            onChange={(e) => onChange({ ...customization, name: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur-lg text-white"
            placeholder="Enter name"
          />
        </div>

        <div>
          <label className="block text-white mb-2">Hair Color</label>
          <HexColorPicker
            color={customization.hairColor}
            onChange={(color) => onChange({ ...customization, hairColor: color })}
          />
        </div>

        <div>
          <label className="block text-white mb-2">Skin Tone</label>
          <HexColorPicker
            color={customization.skinTone}
            onChange={(color) => onChange({ ...customization, skinTone: color })}
          />
        </div>

        <div>
          <label className="block text-white mb-2">Outfit Color</label>
          <HexColorPicker
            color={customization.outfitColor}
            onChange={(color) => onChange({ ...customization, outfitColor: color })}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-4 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold"
          onClick={onNext}
        >
          Continue
        </motion.button>
      </div>
    </motion.div>
  );
} 