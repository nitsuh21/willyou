import { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

interface Character3DProps {
  character: {
    model: string;
    customization: {
      hairColor: string;
      skinTone: string;
      outfitColor: string;
    };
  };
}

export function Character3D({ character }: Character3DProps) {
  const group = useRef<THREE.Group | undefined>();
  const { scene, animations } = useGLTF('/models/character-base.glb');
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // Apply materials based on customization
    scene.traverse((child: THREE.Object3D) => {
      if (child instanceof THREE.Mesh) {
        if (child.name.includes('Hair')) {
          (child.material as THREE.Material).color.set(character.customization.hairColor);
        }
        if (child.name.includes('Skin')) {
          (child.material as THREE.Material).color.set(character.customization.skinTone);
        }
        if (child.name.includes('Outfit')) {
          (child.material as THREE.Material).color.set(character.customization.outfitColor);
        }
      }
    });

    // Play idle animation
    const action = actions['idle'];
    if (action) {
      action.reset().fadeIn(0.5).play();
    }

    return () => {
      if (action) {
        action.fadeOut(0.5);
      }
    };
  }, [character, scene, actions]);

  return <primitive ref={group} object={scene} />;
} 