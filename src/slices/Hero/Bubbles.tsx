"use client";
"use client";

import * as THREE from "three"; 
import { useRef, useEffect } from "react"; 
import { useFrame } from "@react-three/fiber"; 
import gsap from "gsap"; 

// Using Object3D as a container to efficiently set and update positions for each bubble instance
const o = new THREE.Object3D(); 

// Customizable Bubbles component that renders an array of instanced bubbles
export function Bubbles({
  count = 300, 
  speed = 5, 
  bubbleSize = 0.05, 
  opacity = 0.5, 
  repeat = true, 
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null); 

  // Array that holds speed values for each bubble
  const bubbleSpeed = useRef(new Float32Array(count)); 
  const minSpeed = speed * 0.001; 
  const maxSpeed = speed * 0.005; 

  // Create geometry and material for the instanced mesh
  const geometry = new THREE.SphereGeometry(bubbleSize, 16, 16); 
  const material = new THREE.MeshStandardMaterial({
    transparent: true, 
    opacity, 
  });

  // Runs once when the component mounts to create and place bubbles
  useEffect(() => {
    const mesh = meshRef.current; 
    if (!mesh) {
      return; 
    }

    // Create bubbles and set initial positions and speeds
    for (let i = 0; i < count; i++) {
      // Set random positions for the bubbles within a specific range
      o.position.set(
        gsap.utils.random(-4, 4), 
        gsap.utils.random(-4, 4), 
        gsap.utils.random(-4, 4), 
      );

      // Update the matrix of the object to apply position changes
      o.updateMatrix();
      // Set the matrix for each instance in the mesh
      mesh.setMatrixAt(i, o.matrix);

      // Set a random speed for each bubble
      bubbleSpeed.current[i] = gsap.utils.random(minSpeed, maxSpeed);
    }

    // Notify Three.js that the instanced mesh's matrix needs an update
    mesh.instanceMatrix.needsUpdate = true;

    // Cleanup function to dispose of geometry and material when the component unmounts
    return () => {
      mesh.geometry.dispose(); 
      (mesh.material as THREE.Material).dispose(); 
    };
  }, [count, minSpeed, maxSpeed]); 

  // Function to animate the bubbles on each frame
  useFrame(() => {
    if (!meshRef.current) {
      return; 
    }

    // Update bubble color to match the current background color
    material.color = new THREE.Color(document.body.style.backgroundColor);

    // Loop through each bubble to update its position
    for (let i = 0; i < count; i++) {
      meshRef.current.getMatrixAt(i, o.matrix); 
      o.position.setFromMatrixPosition(o.matrix);
      o.position.y += bubbleSpeed.current[i]; 

      // Reset the bubble's position if it moves off the top of the screen and repeat is true
      if (o.position.y > 4 && repeat) {
        o.position.y = -2; 
        o.position.x = gsap.utils.random(-4, 4); 
        o.position.z = gsap.utils.random(0, 8); 
      }

      // Update the matrix with the new position
      o.updateMatrix();
      meshRef.current.setMatrixAt(i, o.matrix); 
    }

    // Notify Three.js that the instance matrix needs an update
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  // Return the instanced mesh component that renders all bubbles
  return (
    <instancedMesh
      ref={meshRef} 
      args={[undefined, undefined, count]} 
      position={[0, 0, 0]}
      material={material} 
      geometry={geometry}
    />
  );
}
