"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, useGLTF } from "@react-three/drei";

/* Part 4.2 — BackEx presented FLAT / stark-lit and hard-edged: no fog, no
   atmospheric environment, no cinematic silhouette reveal. High-key
   directional lighting for a graphic, high-contrast read. A slow constant
   spin keeps it alive; the scroll-scrubbed scale is applied by the parent
   Hero on the wrapping element. */
function Model({ reducedMotion }) {
    const { scene } = useGLTF("/textures/backex.glb");
    const cloned = useMemo(() => scene.clone(true), [scene]);
    const ref = useRef();
    useFrame((_, delta) => {
        if (reducedMotion || !ref.current) return;
        ref.current.rotation.y += delta * 0.25;
    });
    return (
        <group ref={ref}>
            <Center>
                <primitive object={cloned} scale={1.4} />
            </Center>
        </group>
    );
}

export default function HeroProduct({ reducedMotion = false }) {
    return (
        <Canvas
            dpr={[1, 1.6]}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            camera={{ position: [0, 0, 3.4], fov: 42 }}
            style={{ width: "100%", height: "100%" }}
        >
            {/* Flat, high-key studio — no environment, no fog. */}
            <ambientLight intensity={0.85} />
            <directionalLight position={[2, 3, 4]} intensity={1.6} />
            <directionalLight position={[-3, 1, 2]} intensity={0.8} color="#ff4d00" />
            <directionalLight position={[0, -2, -3]} intensity={0.5} />
            <Suspense fallback={null}>
                <Model reducedMotion={reducedMotion} />
            </Suspense>
        </Canvas>
    );
}

useGLTF.preload("/textures/backex.glb");
