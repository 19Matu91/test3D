import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, OrbitControls, useHelper } from "@react-three/drei";
import { Model } from "./Model";
import { useControls } from "leva";
import * as THREE from 'three'
import { EffectComposer, SSAO, Glitch } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

export default function Viewer() {
  const ref = useRef();
  const pL1 = useRef();
  const pL2 = useRef();
  const canvas = useRef();

  const ambientRef = useRef()

  // useControls('Ambient Light', {
  //   visible: {
  //     value: false,
  //     onChange: (v) => {
  //       ambientRef.current.visible = v
  //     }
  //   },
  //   color: {
  //     value: 'white',
  //     onChange: (v) => {
  //       ambientRef?.current?.color = new THREE.Color(v)
  //     }
  //   }
  // })
  
  // useEffect(() => {
  //   console.log(ambientRef.current)
  // }, [ambientRef])

  const {
    envMapIntensity,
    intensity1PointLight,
    intensity2PointLight,
    color1PointLight,
    color2PointLight,
    position1PointLight,
    position2PointLight,
    ssaoDistanceThreshold,
    ssaoRangeThreshold,
    ssaoLuminanceInfluence,
    ssaoScale
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
    },
    ssaoDistanceThreshold: 1,
    ssaoRangeThreshold: 0.5,
    ssaoLuminanceInfluence: 0.9,
    ssaoScale: 0.5
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

      <EffectComposer>
        {/* <Glitch /> */}
        <SSAO
          blendFunction={BlendFunction.MULTIPLY} // blend mode
          samples={30} // amount of samples per pixel (shouldn't be a multiple of the ring count)
          rings={4} // amount of rings in the occlusion sampling pattern
          distanceThreshold={ssaoDistanceThreshold} // global distance threshold at which the occlusion effect starts to fade out. min: 0, max: 1
          distanceFalloff={0.0} // distance falloff. min: 0, max: 1
          rangeThreshold={ssaoRangeThreshold} // local occlusion range threshold at which the occlusion starts to fade out. min: 0, max: 1
          rangeFalloff={0.1} // occlusion range falloff. min: 0, max: 1
          luminanceInfluence={ssaoLuminanceInfluence} // how much the luminance of the scene influences the ambient occlusion
          radius={20} // occlusion sampling radius
          scale={ssaoScale} // scale of the ambient occlusion
          bias={0.5} // occlusion bias
        />
      </EffectComposer>

        <Environment files="/Grad5_2k.hdr" />
        {/* <ambientLight ref={ambientRef} /> */}
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
