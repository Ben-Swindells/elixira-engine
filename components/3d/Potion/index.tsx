import { useGLTF } from "@react-three/drei";
import Bottle from "../assets/potion-bottle.glb";
import React from "react";

export const PotionBottle = () => {
  const { nodes, material } = useGLTF(Bottle);
  return <primitive object={nodes} />;
};
