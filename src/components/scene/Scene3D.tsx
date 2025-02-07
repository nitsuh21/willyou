import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { Character3D } from '../character/Character3D';

interface Scene3DProps {
  character: any;
  scene: any;
}

export default function Scene3D({ character, scene }: Scene3DProps) {
  return (
    <div className="w-full h-[600px]">
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stage environment="city" intensity={0.6}>
          <Character3D character={character} />
          {/* Add scene model here */}
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