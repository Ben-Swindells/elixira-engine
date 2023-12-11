import { useGLTF } from "@react-three/drei";
import Bottle from "../../assets/models/potion-bottle.glb?url";
import React from "react";

export const PotionBottle = () => {
  const { nodes, materials } = useGLTF(Bottle);
  return (
    <group dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.potion_sphere.geometry}
        material={materials["bottle.001"]}
      />
      <group position={[0, 1.046, 0]} scale={0.255}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder_1.geometry}
          material={materials["bottle.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder_2.geometry}
          material={materials.cap}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.potion_liquid.geometry}
        material={materials.liquid}
        scale={0.842}
      />
    </group>
  );
};

useGLTF.preload(Bottle);
