"use client";

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Biloxi(props) {
  const { nodes, materials } = useGLTF("/Biloxi.gltf");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.node_id4.geometry}
        material={nodes.node_id4.material}
        position={[-0.138, -0.496, 2.126]}
        rotation={[0.302, -0.084, 0.09]}
        scale={0.003}
      />
    </group>
  );
}

useGLTF.preload("/Biloxi.gltf");
