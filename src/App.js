import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, OrbitControls, useHelper } from "@react-three/drei";
import { Model } from "./Model";
import { useControls } from "leva";

export default function Viewer() {
  const ref = useRef();
  const pL1 = useRef();
  const pL2 = useRef();
  const canvas = useRef();

  const {
    fovCamera,
    envMapIntensity,
    intensity1PointLight,
    intensity2PointLight,
    color1PointLight,
    color2PointLight,
    position1PointLight,
    position2PointLight,
  } = useControls({
    intensity1PointLight: {
      value: 3.0,
      min: 0,
      max: 5,
      step: 0.01,
    },
    intensity2PointLight: {
      value: 0.6,
      min: 0,
      max: 5,
      step: 0.01,
    },
    envMapIntensity: {
      value: 3,
      min: 0,
      max: 5,
      step: 0.01,
    },
    color1PointLight: "#ffb557",
    color2PointLight: "#008cff",
    position1PointLight: {
      value: [-9000, 0, 0],
      step: 0.01,
    },
    position2PointLight: {
      value: [9000, 0, 0],
      step: 0.01,
    }
  });

  return (
    <Canvas
      dpr={[1, 2]}
      ref={canvas}
      camera={{
        far: 1000000,
        fov: 35,
        near: 0.5,
        position: [-200, 500, 1500], // Esto OK para Garray, pero no para Algarrobico ni Buniel.
      }}
      style={{ background: "#1f1f1f" }}
    >
      <Suspense fallback={null}>
        <Environment files="/Grad5_2k.hdr" />
        <Model envMapIntensity={envMapIntensity} />
        <pointLight
          intensity={intensity1PointLight}
          decay={2}
          ref={pL1}
          color={color1PointLight}
          position={position1PointLight}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <pointLight
          intensity={intensity2PointLight}
          decay={2}
          ref={pL2}
          color={color2PointLight}
          position={position2PointLight}
          rotation={[-Math.PI / 2, 0, 0]}
        />
      </Suspense>
      <OrbitControls ref={ref} />
    </Canvas>
  );
}
