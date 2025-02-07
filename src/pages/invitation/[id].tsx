import { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Invitation } from '../../types';

// Import Scene3D with no SSR
const Scene3D = dynamic(() => import('../../components/Scene3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] flex items-center justify-center bg-slate-100 dark:bg-slate-800">
      <div className="text-lg">Loading 3D Scene...</div>
    </div>
  ),
});

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
      fetchInvitation(id as string).then(setInvitation);
    }
  }, [id]);

  if (!invitation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-gray-900 dark:to-slate-900 flex items-center justify-center">
        <div className="text-xl">Loading invitation...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-gray-900 dark:to-slate-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Suspense fallback={
            <div className="w-full h-[500px] flex items-center justify-center bg-slate-100 dark:bg-slate-800">
              <div className="text-lg">Loading 3D Scene...</div>
            </div>
          }>
            <Scene3D
              scene={String(invitation.scene)}
              character={invitation.sender}
              animation={playing ? 'propose' : 'idle'}
            />
          </Suspense>
          
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