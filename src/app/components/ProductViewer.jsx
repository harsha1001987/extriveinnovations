"use client";

import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Center, useGLTF } from "@react-three/drei";

/* Part 7.2 — flat, hard-edged, drag-to-rotate 3D viewport. No gradients,
   no glow, no boxed white background: a solid dark surface inside a sharp
   2px border with accent corner registration marks. */
function Model({ src, scale = 1.4 }) {
    const { scene } = useGLTF(src);
    const cloned = useMemo(() => scene.clone(true), [scene]);
    return (
        <Center>
            <primitive object={cloned} scale={scale} />
        </Center>
    );
}

export default function ProductViewer({ src, scale = 1.4 }) {
    const [dragging, setDragging] = useState(false);
    const frameRef = useRef(null);

    return (
        <div ref={frameRef} className={`pv-frame ${dragging ? "on" : ""}`} data-cursor="media">
            <span className="pv-corner tl" aria-hidden="true" />
            <span className="pv-corner tr" aria-hidden="true" />
            <span className="pv-corner bl" aria-hidden="true" />
            <span className="pv-corner br" aria-hidden="true" />

            <div className="pv-marker" aria-hidden="true">
                <span className="pv-marker-dot" />
                INSPECT · DRAG TO ROTATE
            </div>

            <Canvas
                camera={{ position: [0, 0, 3.4], fov: 42 }}
                dpr={[1, 1.6]}
                gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
                style={{ width: "100%", height: "100%", position: "relative", zIndex: 1 }}
                onPointerDown={() => setDragging(true)}
                onPointerUp={() => setDragging(false)}
            >
                {/* Flat, high-key — graphic read, no atmosphere. */}
                <ambientLight intensity={0.85} />
                <directionalLight position={[2, 3, 4]} intensity={1.5} />
                <directionalLight position={[-3, 1, 2]} intensity={0.8} color="#ff4d00" />
                <directionalLight position={[0, -2, -3]} intensity={0.5} />
                <Suspense fallback={null}>
                    <Model src={src} scale={scale} />
                </Suspense>
                <OrbitControls
                    autoRotate autoRotateSpeed={0.7}
                    enableZoom={false} enablePan={false}
                    minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 1.7}
                />
            </Canvas>

            <style dangerouslySetInnerHTML={{ __html: `
                .pv-frame { position: relative; width: 100%; aspect-ratio: 3/4; overflow: hidden; background: var(--bg-surface); border: 2px solid var(--border); }
                .pv-corner { position: absolute; width: 14px; height: 14px; z-index: 2; pointer-events: none; border: 0 solid var(--accent); }
                .pv-corner.tl { top: 10px; left: 10px; border-top-width: 2px; border-left-width: 2px; }
                .pv-corner.tr { top: 10px; right: 10px; border-top-width: 2px; border-right-width: 2px; }
                .pv-corner.bl { bottom: 10px; left: 10px; border-bottom-width: 2px; border-left-width: 2px; }
                .pv-corner.br { bottom: 10px; right: 10px; border-bottom-width: 2px; border-right-width: 2px; }
                .pv-marker { position: absolute; top: 20px; left: 20px; z-index: 3; display: inline-flex; align-items: center; gap: 9px; font-family: var(--font-mono); text-transform: uppercase; font-size: 0.6rem; letter-spacing: 0.14em; color: var(--text-secondary); pointer-events: none; }
                .pv-marker-dot { width: 7px; height: 7px; background: var(--accent); animation: pvPulse 2.2s ease-in-out infinite; }
                @keyframes pvPulse { 0%,100% { opacity: 0.55; } 50% { opacity: 1; } }
                @media (prefers-reduced-motion: reduce) { .pv-marker-dot { animation: none; } }
            `}} />
        </div>
    );
}

useGLTF.preload("/textures/backex.glb");
