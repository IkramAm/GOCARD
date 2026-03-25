import { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function CardModel() {
  const { scene } = useGLTF('/models/Gocard.glb');

  const fittedScene = useMemo(() => {
    const copy = scene.clone(true);
    copy.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.castShadow = false;
        obj.receiveShadow = false;

        const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
        materials.forEach((mat) => {
          if (!mat) return;
          if ('roughness' in mat) {
            (mat as THREE.MeshStandardMaterial).roughness = 0.88;
          }
          if ('metalness' in mat) {
            (mat as THREE.MeshStandardMaterial).metalness = 0.08;
          }
          if ('envMapIntensity' in mat) {
            (mat as THREE.MeshStandardMaterial).envMapIntensity = 0.2;
          }
          if ('clearcoat' in mat) {
            (mat as THREE.MeshPhysicalMaterial).clearcoat = 0;
          }
          mat.needsUpdate = true;
        });
      }
    });

    // Normalize model size/position so any GLB scale stays visible.
    const box = new THREE.Box3().setFromObject(copy);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxAxis = Math.max(size.x, size.y, size.z) || 1;
    const targetSize = 1.90;
    const scale = targetSize / maxAxis;

    copy.position.sub(center);
    copy.scale.setScalar(scale);

    return copy;
  }, [scene]);

  return <primitive object={fittedScene} position={[0, -0.55, 0]} rotation={[0.08, -0.28, 0.02]} />;
}

export default function Card3D() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 'var(--card-inner-inset, 0px)',
        width: '100%',
        height: '100%',
      }}
    >
      <Canvas camera={{ position: [0, 0, 2.85], fov: 40 }}>
        <ambientLight intensity={1.05} />
        <directionalLight position={[2, 2, 3]} intensity={1.25} />
        <pointLight position={[0.2, 0.25, 1.9]} intensity={2.2} color="#ffffff" distance={4.5} />
        <Suspense fallback={null}>
          <CardModel />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minDistance={2.85}
          maxDistance={2.85}
          autoRotate
          autoRotateSpeed={1.2}
          minPolarAngle={Math.PI / 2.15}
          maxPolarAngle={Math.PI / 1.85}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload('/models/Gocard.glb');
