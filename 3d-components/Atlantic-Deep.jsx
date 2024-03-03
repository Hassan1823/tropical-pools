"use client";

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function AtlanticDeep(props) {
  const { nodes, materials } = useGLTF("/Atlantic.gltf");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.node_id4.geometry}
        material={nodes.node_id4.material}
        position={[0.701, 0.193, 0.406]}
        rotation={[-0.914, 1.223, 1.445]}
        scale={0}
      />
    </group>
  );
}

useGLTF.preload("/Atlantic.gltf");
