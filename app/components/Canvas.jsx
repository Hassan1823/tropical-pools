"use client";

import React from "react";
import { Environment, OrbitControls } from "@react-three/drei";
import { TestModel } from "@/3d-components/BathTub";
import { Canvas } from "@react-three/fiber";

const CanvasComp = () => {
  return (
    <div className="w-full h-[100vh]">
      <Canvas>
        <ambientLight />
        <OrbitControls />
        <TestModel />
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
};

export default CanvasComp;
