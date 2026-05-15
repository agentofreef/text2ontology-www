"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Background 3D motif for the hero. A slow-rotating wireframe icosahedron
 * with a second smaller "data" cube nested inside — visually echoes the
 * site's logo (ontology back-block + data front-block). Stays abstract
 * and quiet so the hero text stays the focus.
 *
 * Renders at canvas-fill, behind the hero text. Pointer events are off so
 * it doesn't intercept clicks.
 */
function Mesh() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.x += delta * 0.05;
    groupRef.current.rotation.y += delta * 0.08;
  });

  // Icosahedron geometry, materialized once. Wireframe so the visual stays
  // line-based — matches the industrial "blueprint" look the site uses.
  const ico = useMemo(() => new THREE.IcosahedronGeometry(2.2, 1), []);
  const cube = useMemo(() => new THREE.BoxGeometry(1.4, 1.4, 1.4), []);

  return (
    <group ref={groupRef}>
      <mesh geometry={ico}>
        <meshBasicMaterial color="#171717" wireframe />
      </mesh>
      <mesh geometry={cube} position={[0.6, -0.3, 0.4]}>
        <meshBasicMaterial color="#ff4500" wireframe />
      </mesh>
    </group>
  );
}

export function OntologyMesh() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-25"
    >
      <Canvas
        // Pull the camera back; no orbit controls — the mesh just slowly
        // self-rotates.
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
      >
        <Mesh />
      </Canvas>
    </div>
  );
}
