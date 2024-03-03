"use client";

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function CanyonLake(props) {
  const { nodes, materials } = useGLTF("/Canyon Lake.gltf");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.node_id4.geometry}
        material={nodes.node_id4.material}
        position={[-0.084, -1.146, 1.323]}
        rotation={[0.923, -0.058, -3.043]}
        scale={0.005}
      />
    </group>
  );
}

useGLTF.preload("/Canyon Lake.gltf");
