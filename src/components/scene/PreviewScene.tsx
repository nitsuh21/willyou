import { motion } from 'framer-motion';
import Scene3D from './Scene3D';

interface PreviewSceneProps {
  data: {
    character: any;
    scene: any;
    message: string;
  };
  onComplete: () => void;
}

export default function PreviewScene({ data, onComplete }: PreviewSceneProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-8">Preview Your Creation</h2>
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden">
        <Scene3D character={data.character} scene={data.scene} />
        <div className="p-6">
          <p className="text-white mb-6">{data.message}</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold"
            onClick={onComplete}
          >
            Create Invitation
          </motion.button>
        </div>
      </div>
    </div>
  );
} 