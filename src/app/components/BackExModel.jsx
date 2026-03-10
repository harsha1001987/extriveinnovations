"use client";

import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Center, useGLTF } from "@react-three/drei";

function Model() {
    const { scene } = useGLTF("/textures/backex.glb");

    // Clone the scene to prevent React re-render conflicts with WebGL
    const clonedScene = useMemo(() => scene.clone(true), [scene]);

    return (
        <Center>
            <primitive object={clonedScene} scale={1.35} />
        </Center>
    );
}

export default function BackExModel() {
    return (
        <div className="relative overflow-hidden aspect-[2/4] bg-[#111] border border-white/5 w-full h-full">
            <Canvas
                camera={{ position: [0, 0, 3.5], fov: 42 }}
                dpr={[1, 1.5]}
                gl={{
                    antialias: true,
                    powerPreference: "high-performance",
                    failIfMajorPerformanceCaveat: false,
                }}
                style={{ width: "100%", height: "100%" }}
            >
                {/* Subtle industrial lighting — no Environment preset */}
                <ambientLight intensity={0.35} />
                <directionalLight position={[-3, 5, 3]} intensity={0.7} />
                <directionalLight position={[2, -1, 2]} intensity={0.15} />

                <Suspense fallback={null}>
                    <Model />
                </Suspense>

                <OrbitControls
                    autoRotate
                    autoRotateSpeed={0.6}
                    enableZoom={false}
                    enablePan={false}
                />
            </Canvas>
        </div>
    );
}

useGLTF.preload("/textures/backex.glb");
