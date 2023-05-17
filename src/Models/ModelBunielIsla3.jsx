/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF, PerspectiveCamera } from "@react-three/drei";

export default function ModelBunielIsla3(props) {
  const { nodes, materials } = useGLTF("/Buniel_isla3.gltf");
  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Adosados1.geometry}
          material={props.get(materials.Edificios)}
          position={[16.54, 50.42, 33.33]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Arbol3001.geometry}
          material={props.get(materials.Matojos)}
          position={[-23.04, 36.23, -15.19]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Capa1001.geometry}
          material={props.get(materials["Terreno.3"])}
          position={[-9.62, -29.47, -22.84]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Capa2001.geometry}
          material={props.get(materials["Terreno.2"])}
          position={[-8.64, -82.24, -21.28]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Carreteras001.geometry}
          material={props.get(materials["Carretera.002"])}
          position={[-8.69, 6.6, -26.6]}
          scale={0.31}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Carreteras3.geometry}
          material={props.get(materials.CARRETERA)}
          position={[-8.69, 6.6, -26.6]}
          scale={0.31}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Escombros002.geometry}
          material={props.get(materials.Matojos)}
          position={[42.12, 11.84, 79.18]}
        />
      </group>
      <PerspectiveCamera
        makeDefault={false}
        far={1000}
        near={0.1}
        fov={22.9}
        rotation={[-2.6, -0.03, -3.13]}
      />
    </group>
  );
}

useGLTF.preload("/Buniel_isla3.gltf");
