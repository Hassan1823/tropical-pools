"use client";

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function CostaAzul(props) {
  const { nodes, materials } = useGLTF("/Costa Azul.gltf");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.node_id4.geometry}
        material={nodes.node_id4.material}
        position={[-1.261, -0.058, -0.536]}
        rotation={[Math.PI, -0.865, 0]}
        scale={[-0.003, 0.003, 0.003]}
      />
    </group>
  );
}

useGLTF.preload("/Costa Azul.gltf");
