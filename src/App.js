import React, { Suspense, useEffect, useRef, useState } from "react";
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

  const [select, setSelect] = useState(0)

  const {
    envMapIntensity,
    intensity1,
    intensity2,
    color1,
    color2,
    position1,
    position2,
    intensity,
    samples
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
      intensity: {
        value: 4,
        min: 4,
        max: 5,
        step: 1,
      },
      samples: {
        value: 128,
        min: 128,
        max: 256,
        step: 128,
      }
    })
  });

  return (
    <>
      <div>
        <h2 onClick={() => setSelect(5)}>ModelBunielIsla3</h2>
        <h2 onClick={() => setSelect(4)}>ModelBunielIsla2</h2>
        <h2 onClick={() => setSelect(3)}>ModelBunielIsla1</h2>
        {/* <h2 onClick={() => setSelect(2)}>ModelBunielUrbanizacion</h2> */}
        <h2 onClick={() => setSelect(1)}>ModelAlgarrobico</h2>
        <h2 onClick={() => setSelect(0)}>ModelCupula</h2>
      </div>
      <Canvas
        dpr={[1, 2]}
        ref={canvas}
        camera={{
          far: 1000000,
          fov: 35,
          near: 0.5,
          position: [-200, 500, 1500], // Esto OK para Garray, pero no para Algarrobico ni Buniel.
        }}
        gl={{ logarithmicDepthBuffer: true}}
        style={{ background: "#1f1f1f" }}
      >
        <Perf position='bottom-right' />
        <Suspense fallback={null}>

          <EffectComposer multisampling={0}>
            {/* <Glitch /> */}
            <SSAO
              samples={intensity}
              color={'#000000'}
              intensity={samples}
            />
          </EffectComposer>

          <Environment files="/Grad5_2k.hdr" />
          {/* <ambientLight ref={ambientRef} /> */}
          <Model envMapIntensity={envMapIntensity} select={select} />
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
    </>
  );
}
