/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef } from "react";
import { useGLTF, TransformControls } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/cupula_AO_BAKE_v2.gltf");

  const get = (material) => {
    material.envMapIntensity = props.envMapIntensity;
    return material
  }

  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <group position={[52.3, 157.1, 423.8]}>
          <group position={[-80.33, 33.63, -269.79]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["Arboles3-Troncos001"].geometry}
              material={get(materials["Troncos.001"])}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["Arboles3-Arboles001"].geometry}
              material={get(materials.Arboles)}
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Peana001.geometry}
            material={get(materials["Terreno.1"])}
            position={[23.58, -88.93, 12.39]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Carretera001.geometry}
            material={get(materials["Carretera.1"])}
            position={[108.68, -40.43, 449.59]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Edificios001.geometry}
            material={get(materials["Material.001"])}
            position={[-75.52, 119.33, -204.58]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Terreno001.geometry}
            material={get(materials["Terreno.3"])}
            position={[23.58, -23.6, 12.39]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/cupula_hdr_soloGeo.gltf");
