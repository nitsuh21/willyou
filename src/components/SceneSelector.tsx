import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Scene } from '../types';

const scenes: Scene[] = [
  {
    id: 'romantic-garden',
    name: 'Romantic Garden',
    type: 'proposal',
    description: 'A beautiful garden with flowers and fairy lights',
    previewImage: '/scenes/romantic-garden.jpg',
    modelPath: '/models/scenes/romantic-garden.glb',
    animations: ['daylight', 'sunset', 'night'],
  },
  // Add more scenes...
];

interface SceneSelectorProps {
  onSelect: (scene: Scene) => void;
}

export default function SceneSelector({ onSelect }: SceneSelectorProps) {
  const [selectedScene, setSelectedScene] = useState<Scene | null>(null);

  const handleSelect = (scene: Scene) => {
    setSelectedScene(scene);
    onSelect(scene);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold mb-6">Choose Your Scene</h2>
      <div className="grid grid-cols-2 gap-4">
        {scenes.map((scene) => (
          <motion.div
            key={scene.id}
            className={`relative cursor-pointer rounded-lg overflow-hidden
              ${selectedScene?.id === scene.id ? 'ring-2 ring-pink-500' : ''}
            `}
            whileHover={{ scale: 1.02 }}
            onClick={() => handleSelect(scene)}
          >
            <Image
              src={scene.previewImage}
              alt={scene.name}
              width={300}
              height={200}
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
              <h3 className="text-white font-semibold">{scene.name}</h3>
              <p className="text-white/80 text-sm">{scene.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 