"use client";

import React from "react";
import { Environment, OrbitControls } from "@react-three/drei";
import { TestModel } from "@/3d-components/BathTub";
import { Canvas } from "@react-three/fiber";
import { Biloxi } from "@/3d-components/Biloxi";
import { Broadway } from "@/3d-components/Broadway";
import { CaesarsPalaceBeach } from "@/3d-components/Caesars-Palace-Beach";
import { CanyonLake } from "@/3d-components/CanyonLake";
import { CostaAzul } from "@/3d-components/Costa-Azul";
import { AtlanticDeep } from "@/3d-components/Atlantic-Deep";
import { Cocoa } from "@/3d-components/Cocoa-Beach";

const CanvasComp = ({ poolName }) => {
  return (
    <div className="w-full h-[100vh]">
      <Canvas>
        <ambientLight />
        <OrbitControls />
        {poolName === "Ariella" ? (
          <TestModel />
        ) : poolName === "Atlantic Deep" ? (
          <TestModel />
        ) : // <AtlanticDeep />
        poolName === "Biloxi" ? (
          <Biloxi />
        ) : poolName === "Broadway" ? (
          <Broadway />
        ) : poolName === "Caesars Palace Beach" ? (
          <CaesarsPalaceBeach />
        ) : poolName === "Canyon Lake" ? (
          <CanyonLake />
        ) : poolName === "Cocoa Beach" ? (
          <CanyonLake />
        ) : (
          // <Cocoa />
          <CostaAzul />
        )}
        {/* <TestModel /> */}
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
};

export default CanvasComp;
