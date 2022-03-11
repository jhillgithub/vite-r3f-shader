import { useRef, Suspense } from 'react';
import { shaderMaterial } from '@react-three/drei';
import { Canvas, extend, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import ImageURL from './pirate.jpg';
import './App.css';
import vertex from './shader.vert';
import fragment from './shader.frag';

const WaveShaderMaterial = shaderMaterial(
  //Uniforms
  {
    uTime: 0,
    uColor: new THREE.Color(0.0, 0.0, 0.0),
    uTexture: new THREE.Texture()
  },
  // Vertex Shader
  vertex,
  // Fragment Shader
  fragment
);

extend({ WaveShaderMaterial });

const Wave = () => {
  const ref = useRef();
  useFrame(({ clock }) => (ref.current.uTime = clock.getElapsedTime()));

  const [image] = useLoader(THREE.TextureLoader, [ImageURL]);
  return (
    <mesh>
      <planeBufferGeometry
        args={[1, 0.6, 16, 16]}
      />
      <waveShaderMaterial uColor={'hotpink'} ref={ref} uTexture={image} />
    </mesh>);
};

export const Scene = () => {
  return (
    <Canvas camera={{ fov: 10, position: [0, 0, 5] }}>
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <Wave />
      </Suspense>
    </Canvas>);
};
function App() {
  return (
    <Scene />
  );
}

export default App;