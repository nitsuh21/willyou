import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { AvatarStyle } from '../types/scenarios';

interface EnhancedAvatarProps {
  gender: 'male' | 'female';
  position: { x: number; y: number };
  style: AvatarStyle;
  animation?: {
    type: 'entrance' | 'kneel' | 'jump' | 'wave' | 'twirl' | 'dance' | 'blush' | 'surprise';
    onComplete?: () => void;
  };
  holding?: 'roses' | 'heart' | 'ring' | 'cake' | 'tickets' | 'gift';
  expression?: 'smile' | 'surprise' | 'blush' | 'cry' | 'excited';
}

const HOLDING_ITEMS = {
  roses: "🌹",
  heart: "❤️",
  ring: "💍",
  cake: "🎂",
  tickets: "🎟️",
  gift: "🎁",
};

// Map our style options to DiceBear options
const mapHairColor = (color: string) => {
  const colorMap: { [key: string]: string } = {
    'bg-yellow-600': 'blonde',
    'bg-gray-800': 'black',
    'bg-red-700': 'red',
    'bg-brown-600': 'brown',
  };
  return colorMap[color] || 'brown';
};

const mapHairStyle = (style: string) => {
  const styleMap: { [key: string]: string } = {
    'short': 'short',
    'long': 'long',
    'wavy': 'curly',
  };
  return styleMap[style] || 'short';
};

const mapOutfit = (outfit: string) => {
  const outfitMap: { [key: string]: string } = {
    'casual': 'hoodie',
    'formal': 'blazer',
    'fancy': 'blazerAndShirt',
  };
  return outfitMap[outfit] || 'hoodie';
};

export const EnhancedAvatar = ({ 
  gender, 
  position, 
  style, 
  animation, 
  holding,
  expression = 'smile' 
}: EnhancedAvatarProps) => {
  const avatarRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!avatarRef.current || !animation) return;

    const timeline = gsap.timeline({
      onComplete: animation.onComplete,
    });

    switch (animation.type) {
      case 'entrance':
        timeline.from(avatarRef.current, {
          opacity: 0,
          scale: 0.5,
          y: '+=50',
          duration: 1,
          ease: 'back.out',
        });
        break;

      case 'jump':
        timeline
          .to(avatarRef.current, {
            y: '-=50',
            duration: 0.5,
            ease: 'power2.out',
          })
          .to(avatarRef.current, {
            y: '+=50',
            duration: 0.5,
            ease: 'bounce.out',
          });
        break;

      case 'wave':
        timeline
          .to(avatarRef.current, {
            rotate: [-5, 5],
            duration: 0.5,
            repeat: 3,
            yoyo: true,
            ease: 'sine.inOut',
          });
        break;

      case 'twirl':
        timeline
          .to(avatarRef.current, {
            rotate: 360,
            duration: 1,
            ease: 'power2.inOut',
          });
        break;

      case 'dance':
        timeline
          .to(avatarRef.current, {
            rotate: 10,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          })
          .to(bodyRef.current, {
            y: '-=10',
            duration: 0.25,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          }, 0);
        break;
    }
  }, [animation]);

  // Generate the DiceBear avatar URL
  const getAvatarUrl = () => {
    const hairColor = mapHairColor(style.hairColor);
    const hairStyle = mapHairStyle(style.hairStyle);
    const outfit = mapOutfit(style.outfit);
    const mood = expression === 'smile' ? 'happy' : 
                expression === 'surprise' ? 'surprised' :
                expression === 'cry' ? 'sad' : 'default';

    const seed = `${gender}-${hairColor}-${hairStyle}-${outfit}-${mood}`;
    return `https://api.dicebear.com/6.x/avataaars/svg?seed=${seed}&backgroundColor=transparent&hairColor=${hairColor}&top=${hairStyle}&clothing=${outfit}&mouth=${mood}`;
  };

  return (
    <motion.div
      ref={avatarRef}
      className="absolute transform-gpu"
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <div 
        ref={bodyRef}
        className="relative transform-gpu"
      >
        <img 
          src={getAvatarUrl()} 
          alt={`${gender} avatar`}
          className="w-32 h-48 object-contain"
        />

        {/* Holding items */}
        {holding && (
          <div className="absolute -right-12 top-12 text-2xl transform-gpu">
            {HOLDING_ITEMS[holding]}
          </div>
        )}
      </div>
    </motion.div>
  );
};
