import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import type { Invitation } from '../types';

interface Scene3DProps {
  className?: string;
  scene?: string;
  character?: Invitation['sender'];
  animation?: 'idle' | 'propose';
}

function Character({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath);
  return (
    <primitive 
      object={scene} 
      position={[0, 0, 0]}
      scale={1}
    />
  );
}

const Scene3D: React.FC<Scene3DProps> = ({ 
  className, 
  character,
  animation = 'idle' 
}) => {
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <div className={className || "w-full h-[500px]"}>
      <Canvas
        camera={{ position: [0, 1.5, 3], fov: 75 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        {character?.modelPath && (
          <Character modelPath={character.modelPath} />
        )}

        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

export default Scene3D;
