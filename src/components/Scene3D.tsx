import { useEffect, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { Scene, Character } from '../types';

interface Model3DProps {
  character: Character;
  animation: string;
  position?: [number, number, number];
}

function Model3D({ character, animation, position = [0, 0, 0] }: Model3DProps) {
  const group = useRef<THREE.Group>();
  const { scene, animations } = useGLTF(character.modelPath);
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    // Play the specified animation
    const action = actions[animation];
    if (action) {
      action.reset().fadeIn(0.5).play();
      return () => {
        action.fadeOut(0.5);
      };
    }
  }, [animation, actions]);

  return <primitive ref={group} object={scene} position={position} />;
}

interface Scene3DProps {
  scene: Scene;
  character: Character;
  animation: string;
}

export default function Scene3D({ scene, character, animation }: Scene3DProps) {
  return (
    <div className="w-full h-[600px]">
      <Canvas
        camera={{ position: [0, 1.5, 4], fov: 50 }}
        shadows
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />

        <Model3D
          character={character}
          animation={animation}
        />

        <Environment preset="sunset" />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
} 