import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Scene3D from '../../components/Scene3D';
import { Invitation } from '../../types';

// This is a temporary mock function - replace with actual API call
const fetchInvitation = async (id: string): Promise<Invitation> => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        type: 'proposal',
        sender: {
          id: 'mock-sender',
          name: 'John',
          gender: 'male',
          style: 'anime',
          previewImage: '/characters/anime-male-1.png',
          modelPath: '/models/characters/anime-male-1.glb',
          animations: {
            idle: '/animations/idle.json',
            propose: '/animations/propose.json',
            celebrate: '/animations/celebrate.json',
          },
        },
        recipient: {
          name: 'Jane',
          email: 'jane@example.com',
        },
        message: 'Will you marry me?',
        scene: {
          id: 'romantic-garden',
          name: 'Romantic Garden',
          type: 'proposal',
          description: 'A beautiful garden setting',
          previewImage: '/scenes/romantic-garden.jpg',
          modelPath: '/models/scenes/romantic-garden.glb',
          animations: ['daylight', 'sunset', 'night'],
        },
        createdAt: new Date(),
      });
    }, 1000);
  });
};

export default function InvitationPreview() {
  const router = useRouter();
  const { id } = router.query;
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (id) {
      // Fetch invitation data from your API
      fetchInvitation(id as string).then(setInvitation);
    }
  }, [id]);

  if (!invitation) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-gray-900 dark:to-slate-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Scene3D
            scene={invitation.scene}
            character={invitation.sender}
            animation={playing ? 'propose' : 'idle'}
          />
          
          <div className="mt-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              {invitation.sender.name}'s {invitation.type}
            </h2>
            <p className="text-xl mb-6">{invitation.message}</p>
            
            {!playing && (
              <motion.button
                onClick={() => setPlaying(true)}
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full"
                whileHover={{ scale: 1.05 }}
              >
                Play Animation
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 