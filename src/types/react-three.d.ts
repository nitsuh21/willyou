declare module '@react-three/fiber' {
  import { ReactThreeFiber } from '@react-three/fiber'
  export * from '@react-three/fiber'
}

declare module '@react-three/drei' {
  export * from '@react-three/drei'
}

declare namespace JSX {
  interface IntrinsicElements {
    ambientLight: any;
    pointLight: any;
    primitive: any;
    // Add other elements as needed
  }
} 