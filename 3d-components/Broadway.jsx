"use client";

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Broadway(props) {
  const { nodes, materials } = useGLTF("/Broadway.gltf");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.node_id4.geometry}
        material={nodes.node_id4.material}
        position={[0.072, -0.158, 1.827]}
        rotation={[0.109, 0.052, 0]}
        scale={0.004}
      />
    </group>
  );
}

useGLTF.preload("/Broadway.gltf");
