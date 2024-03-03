"use client";

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Cocoa(props) {
  const { nodes, materials } = useGLTF("/Cocoa.gltf");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.node_id4.geometry}
        material={nodes.node_id4.material}
        position={[0.745, -0.186, 0.719]}
        rotation={[0.417, 0.978, 2.96]}
        scale={0}
      />
    </group>
  );
}

useGLTF.preload("/Cocoa.gltf");
