import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, OrbitControls, useHelper } from "@react-three/drei";
import { Model } from "./Model";
import { useControls, folder } from "leva";
import * as THREE from 'three'
import { EffectComposer, SSAO, Glitch } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { Perf } from 'r3f-perf'

export default function Viewer() {
  const ref = useRef();
  const pL1 = useRef();
  const pL2 = useRef();
  const canvas = useRef();

  const {
    envMapIntensity,
    intensity1,
    intensity2,
    color1,
    color2,
    position1,
    position2,
    distanceThreshold,
    rangeThreshold,
    luminanceInfluence,
    scale,
    intensity,
    color,
    distanceScaling,
    depthAwareUpsampling,
    rings,
    samples, distanceFalloff,
    rangeFalloff,
    minRadiusScale,
    bias,
    fade,
    radius,
    resolutionScale
  } = useControls({
    'Luz1': folder({
      intensity1: {
        value: 3.0,
        min: 0,
        max: 5,
        step: 0.01,
      },
      color1: "#ffb557",
      position1: {
        value: [-9000, 0, 0],
        step: 0.01,
      },
    }),
    'Luz2': folder({

      intensity2: {
        value: 0.6,
        min: 0,
        max: 5,
        step: 0.01,
      },
      color2: "#008cff",
      position2: {
        value: [9000, 0, 0],
        step: 0.01,
      }
    }),
    'Env': folder({
      envMapIntensity: {
        value: 3,
        min: 0,
        max: 5,
        step: 0.01,
      }
    }),
    'SSAO': folder({
      distanceScaling: true,
      depthAwareUpsampling: true,
      samples: 9,
      rings: 7,
      minRadiusScale: 0.33,
      radius: 0.1825,
      distanceFalloff: {
        value: 0.03,
        max: 1,
        min: 0
      },
      rangeFalloff: {
        value: 0.03,
        max: 1,
        min: 0
      },
      distanceThreshold: {
        value: 1,
        max: 1,
        min: 0
      },
      rangeThreshold: {
        value: 0.5,
        max: 1,
        min: 0
      },
      luminanceInfluence: 0.7,
      scale: 0.5,
      intensity: 1.0,
      bias: 0.025,
      color: '#53514e',
      fade: 0.01,
      resolutionScale: 1.0,
    })
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
      <Perf position='bottom-right' />
      <Suspense fallback={null}>

        <EffectComposer multisampling={0}>
          {/* <Glitch /> */}
          <SSAO
            distanceScaling={distanceScaling}
            depthAwareUpsampling={depthAwareUpsampling}
            samples={samples} // amount of samples per pixel (shouldn't be a multiple of the ring count)
            rings={rings} // amount of rings in the occlusion sampling pattern
            distanceThreshold={distanceThreshold} // global distance threshold at which the occlusion effect starts to fade out. min: 0, max: 1
            distanceFalloff={distanceFalloff} // distance falloff. min: 0, max: 1
            rangeThreshold={rangeThreshold} // local occlusion range threshold at which the occlusion starts to fade out. min: 0, max: 1
            rangeFalloff={rangeFalloff} // occlusion range falloff. min: 0, max: 1
            luminanceInfluence={luminanceInfluence} // how much the luminance of the scene influences the ambient occlusion
            radius={radius} // occlusion sampling radius
            scale={scale} // scale of the ambient occlusion
            bias={bias} // occlusion bias
            color={color}
            minRadiusScale={minRadiusScale}
            intensity={intensity}
            fade={fade}
            resolutionScale={resolutionScale}
          />
        </EffectComposer>

        <Environment files="/Grad5_2k.hdr" />
        {/* <ambientLight ref={ambientRef} /> */}
        <Model envMapIntensity={envMapIntensity} />
        <pointLight
          intensity={intensity1}
          decay={2}
          ref={pL1}
          color={color1}
          position={position1}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <pointLight
          intensity={intensity2}
          decay={2}
          ref={pL2}
          color={color2}
          position={position2}
          rotation={[-Math.PI / 2, 0, 0]}
        />
      </Suspense>
      <OrbitControls ref={ref} />
    </Canvas>
  );
}
