import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface AvatarProps {
  gender: 'male' | 'female';
  position: { x: number; y: number };
  isKneeling?: boolean;
  onAnimationComplete?: () => void;
}

export const Avatar = ({ gender, position, isKneeling = false, onAnimationComplete }: AvatarProps) => {
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isKneeling && gender === 'male') {
      const timeline = gsap.timeline({
        onComplete: () => onAnimationComplete?.(),
      });

      timeline.to(avatarRef.current, {
        y: '+=50',
        rotateZ: -90,
        duration: 1,
        ease: 'power2.inOut',
      });
    }
  }, [isKneeling, gender, onAnimationComplete]);

  return (
    <motion.div
      ref={avatarRef}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="absolute"
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <div
        className={`w-20 h-40 rounded-full ${
          gender === 'male' ? 'bg-blue-500' : 'bg-pink-500'
        } relative`}
      >
        {/* Head */}
        <div className="absolute w-16 h-16 rounded-full bg-amber-200 -top-14 left-2" />
        
        {/* Eyes */}
        <div className="absolute w-2 h-2 rounded-full bg-gray-800 -top-10 left-6" />
        <div className="absolute w-2 h-2 rounded-full bg-gray-800 -top-10 left-10" />
        
        {/* Smile */}
        <div className="absolute w-6 h-3 border-b-2 border-gray-800 rounded-full -top-8 left-7" />
        
        {gender === 'female' && (
          <>
            {/* Hair */}
            <div className="absolute w-20 h-10 rounded-t-full bg-yellow-600 -top-16 left-0" />
            {/* Dress */}
            <div className="absolute w-32 h-32 bg-pink-300 -bottom-8 -left-6 transform rotate-45" />
          </>
        )}
      </div>
    </motion.div>
  );
};
