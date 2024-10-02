"use client";

import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

useGLTF.preload("/Soda-can.gltf"); // Ensure the correct path to the GLTF file

const flavorTextures = {
  lemonLime: "/labels/lemon-lime.png",
  grape: "/labels/grape.png",
  blackCherry: "/labels/cherry.png",
  strawberryLemonade: "/labels/strawberry.png",
  watermelon: "/labels/watermelon.png",
};

const metalMaterial = new THREE.MeshStandardMaterial({
  roughness: 0.3,
  metalness: 1,
  color: "#bbbbbb",
});

export type SodaCanProps = {
  flavor?: keyof typeof flavorTextures;
  scale?: number;
};

export function SodaCan({
  flavor = "blackCherry",
  scale = 2,
  ...props
}: SodaCanProps) {
  const { nodes } = useGLTF("/Soda-can.gltf"); // Make sure the path is correct
  const labels = useTexture(flavorTextures);

  // Ensure that the labels are not flipped upside down
  labels.strawberryLemonade.flipY = false;
  labels.blackCherry.flipY = false;
  labels.watermelon.flipY = false;
  labels.grape.flipY = false;
  labels.lemonLime.flipY = false;

  // Select the correct texture based on flavor
  const label = labels[flavor];

  return (
    <group {...props} dispose={null} scale={scale} rotation={[0, -Math.PI, 0]}>
      {/* Assuming 'nodes.cylinder' and 'nodes.cylinder_1' are the correct names in the GLTF */}
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes?.cylinder as THREE.Mesh)?.geometry} // Ensure 'cylinder' node exists in the GLTF
        material={metalMaterial} // Apply the metallic material
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.cylinder_1 as THREE.Mesh).geometry} // Apply texture to the correct geometry
      >
        <meshStandardMaterial roughness={0.15} metalness={0.7} map={label} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Tab as THREE.Mesh).geometry} // Check if 'Tab' is the correct name in the GLTF
        material={metalMaterial} // Metallic tab material
      />
    </group>
  );
}
