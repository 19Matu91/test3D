/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF, PerspectiveCamera } from "@react-three/drei";

export default function ModelBunielIsla2(props) {
  const { nodes, materials } = useGLTF("/Buniel_isla2.gltf");
  return (
    <group {...props} dispose={null}>
      <group rotation={[0, -0.04, 0]} scale={0.01}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Adosados2.geometry}
          material={props.get(materials.Edificios)}
          position={[188.29, 42.06, 219.88]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Arbol3.geometry}
          material={props.get(materials.Matojos)}
          position={[211.97, -1.28, 271.72]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Capa1.geometry}
          material={props.get(materials["Terreno.3"])}
          position={[-339.84, 9.28, -318.4]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Capa2.geometry}
          material={props.get(materials["Terreno.2"])}
          position={[-339.91, -57.31, -348.95]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Carreteras.geometry}
          material={props.get(materials["Carretera.002"])}
          position={[104.32, -9.73, -56.15]}
          scale={0.31}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Escombros1.geometry}
          material={props.get(materials.Matojos)}
          position={[279.49, 7.25, 175.75]}
        />
      </group>
      <PerspectiveCamera
        makeDefault={false}
        far={1000}
        near={0.1}
        fov={22.9}
        rotation={[-0.43, -0.32, -0.14]}
      />
    </group>
  );
}

useGLTF.preload("/Buniel_isla2.gltf");
