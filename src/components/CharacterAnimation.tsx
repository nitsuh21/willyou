import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import { Character } from './CharacterSelector';

interface CharacterAnimationProps {
  character: Character;
  animation: 'idle' | 'propose' | 'celebrate';
  className?: string;
}

export default function CharacterAnimation({ 
  character, 
  animation, 
  className 
}: CharacterAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationInstance = useRef<any>(null);

  useEffect(() => {
    if (containerRef.current) {
      animationInstance.current = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: character.animations[animation],
      });
    }

    return () => {
      if (animationInstance.current) {
        animationInstance.current.destroy();
      }
    };
  }, [character, animation]);

  return <div ref={containerRef} className={className} />;
} 