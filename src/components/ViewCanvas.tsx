"use client";
import { Canvas } from "@react-three/fiber";
import { View, Html } from "@react-three/drei";
import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";

const Loader = dynamic(
  () => import("@react-three/drei").then((mod) => mod.Loader),
  { ssr: false },
);

export default function ViewCanvas() {
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Simulate loading
    }, 3000); // Adjust this delay as needed

    return () => clearTimeout(timer); // Cleanup timeout
  }, []);

  return (
    <>
      <Canvas
        style={{
          position: "fixed",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          overflow: "hidden",
          zIndex: 30,
        }}
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
        camera={{
          fov: 30,
        }}
      >
        {loading && (
          <Html center>
            {/* You can design your custom loader here */}
            <div className="loader-container">
              <div className="loader-spinner"></div>
              <p>Loading Content...</p>
            </div>
          </Html>
        )}
        {!loading && (
          <Suspense fallback={null}>
            <View.Port />
          </Suspense>
        )}
      </Canvas>
    </>
  );
}
