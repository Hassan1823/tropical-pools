"use client";

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function CaesarsPalaceBeach(props) {
  const { nodes, materials } = useGLTF("/Caesars Palace Beach.gltf");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.node_id4.geometry}
        material={nodes.node_id4.material}
        position={[0, -0.068, 2.208]}
        scale={0.003}
      />
    </group>
  );
}

useGLTF.preload("/Caesars Palace Beach.gltf");
