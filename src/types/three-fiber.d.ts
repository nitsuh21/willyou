declare module '@react-three/fiber' {
  export * from '@react-three/fiber/dist/declarations/src';
  export { Canvas } from '@react-three/fiber/dist/declarations/src/web/Canvas';
}

declare module '@react-three/drei' {
  export * from '@react-three/drei/core';
  export { OrbitControls } from '@react-three/drei/core/OrbitControls';
  export { Stage } from '@react-three/drei/core/Stage';
} 