"use client";

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function TestModel(props) {
  const { nodes, materials } = useGLTF("/Arialla.gltf");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.node_id5.geometry}
        material={nodes.node_id5.material}
        position={[0.053, -0.366, 0.615]}
        rotation={[0.517, 0.076, 3.098]}
        scale={[-0.002, 0.002, 0.002]}
      />
    </group>
  );
}

useGLTF.preload("/Arialla.gltf");
