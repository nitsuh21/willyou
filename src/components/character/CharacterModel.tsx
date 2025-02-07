import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { Character3D } from './Character3D';

interface CharacterModelProps {
  character: {
    model: string;
    customization: {
      hairStyle: string;
      hairColor: string;
      skinTone: string;
      eyeColor: string;
      outfit: string;
      outfitColor: string;
    };
  };
}

export default function CharacterModel({ character }: CharacterModelProps) {
  return (
    <div className="w-full h-[600px]">
      <Canvas shadows camera={{ position: [0, 1.5, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stage environment="city" intensity={0.6}>
          <Character3D character={character} />
        </Stage>
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