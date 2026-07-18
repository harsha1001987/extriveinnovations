"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const MODEL_PATH = "/textures/backex.glb";

// Preload so parsing starts as early as possible.
useGLTF.preload(MODEL_PATH);

/* ------------------------------------------------------------------ *
 *  The exosuit — auto-fitted, scroll-reveal rotation + cursor tilt
 * ------------------------------------------------------------------ */
function Exosuit({ progressRef, reducedMotion }) {
  const { scene } = useGLTF(MODEL_PATH);
  const spinRef = useRef();
  const fitRef = useRef();
  const emissivesRef = useRef([]);

  useEffect(() => {
    // Normalise the model to a predictable size + centre it.
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const s = 2.7 / maxDim;

    if (fitRef.current) {
      fitRef.current.scale.setScalar(s);
      fitRef.current.position.set(
        -center.x * s,
        -center.y * s,
        -center.z * s
      );
    }

    // Collect any already-emissive materials so we can pulse indicator
    // details on reveal. (Node/mesh names are unknown — see notes.)
    const emissives = [];
    scene.traverse((o) => {
      if (!o.isMesh) return;
      o.castShadow = true;
      o.receiveShadow = true;
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      mats.forEach((m) => {
        if (m && m.emissive && (m.emissive.r || m.emissive.g || m.emissive.b)) {
          emissives.push({ mat: m, base: m.emissiveIntensity || 1 });
        }
      });
    });
    emissivesRef.current = emissives;
  }, [scene]);

  useFrame((state, delta) => {
    if (!spinRef.current) return;
    const p = reducedMotion ? 1 : progressRef.current;

    // Base reveal rotation: starts angled, settles near front-on.
    const revealY = THREE.MathUtils.degToRad(-28 + p * 34);
    // Inspection-grade cursor tilt, only once mostly revealed (<= ~3deg).
    const gate = Math.max(0, (p - 0.55) / 0.45);
    const tiltY = state.pointer.x * 0.05 * gate;
    const tiltX = -state.pointer.y * 0.04 * gate;

    spinRef.current.rotation.y = THREE.MathUtils.damp(
      spinRef.current.rotation.y,
      revealY + tiltY,
      4,
      delta
    );
    spinRef.current.rotation.x = THREE.MathUtils.damp(
      spinRef.current.rotation.x,
      tiltX,
      4,
      delta
    );

    // Bring indicator/LED emissives up as the suit is revealed.
    const glow = 0.5 + p * 1.8;
    for (const e of emissivesRef.current) {
      e.mat.emissiveIntensity = e.base * glow;
    }
  });

  return (
    <group ref={spinRef}>
      <group ref={fitRef}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ *
 *  Scroll-tied lights — near-silhouette → fully lit
 * ------------------------------------------------------------------ */
function Lights({ progressRef, reducedMotion }) {
  const keyRef = useRef();
  const fillRef = useRef();
  const rimRef = useRef();

  useFrame((_, delta) => {
    const p = reducedMotion ? 1 : progressRef.current;
    const damp = (ref, target) => {
      if (ref.current)
        ref.current.intensity = THREE.MathUtils.damp(
          ref.current.intensity,
          target,
          5,
          delta
        );
    };
    // key light climbs from a whisper to full studio.
    damp(keyRef, 0.15 + p * 2.6);
    damp(fillRef, 0.05 + p * 0.7);
    // orange rim catches edges early, stays as accent.
    damp(rimRef, 0.6 + p * 2.4);
  });

  return (
    <>
      <ambientLight intensity={0.12} />
      <directionalLight
        ref={keyRef}
        position={[3, 5, 4]}
        intensity={0.15}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
      />
      <directionalLight ref={fillRef} position={[-4, 1, 2]} intensity={0.05} />
      <spotLight
        ref={rimRef}
        position={[-2.5, 3, -4]}
        angle={0.6}
        penumbra={0.8}
        intensity={0.6}
        color="#ff6b00"
        distance={20}
      />
    </>
  );
}

/* ------------------------------------------------------------------ *
 *  Camera dolly-in tied to scroll
 * ------------------------------------------------------------------ */
function Rig({ progressRef, reducedMotion }) {
  useFrame((state, delta) => {
    const p = reducedMotion ? 1 : progressRef.current;
    const targetZ = 6.6 - p * 1.9;
    const targetY = 0.15 + p * 0.05;
    state.camera.position.z = THREE.MathUtils.damp(
      state.camera.position.z,
      targetZ,
      3,
      delta
    );
    state.camera.position.y = THREE.MathUtils.damp(
      state.camera.position.y,
      targetY,
      3,
      delta
    );
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ------------------------------------------------------------------ *
 *  Public component: lazy R3F canvas + GSAP ScrollTrigger driver
 * ------------------------------------------------------------------ */
export default function HeroModel({ reducedMotion = false }) {
  const progressRef = useRef(reducedMotion ? 1 : 0);
  const [quality, setQuality] = useState({ shadows: true, dpr: [1, 1.75] });

  // Down-tune on small / low-power viewports.
  useEffect(() => {
    const small = window.matchMedia("(max-width: 768px)").matches;
    if (small) setQuality({ shadows: false, dpr: [1, 1.3] });
  }, []);

  // Drive reveal progress straight from scroll position (scrubbed).
  useEffect(() => {
    if (reducedMotion) {
      progressRef.current = 1;
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    const st = ScrollTrigger.create({
      trigger: "#hero",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
    });
    const t = setTimeout(() => ScrollTrigger.refresh(), 250);
    return () => {
      clearTimeout(t);
      st.kill();
    };
  }, [reducedMotion]);

  return (
    <Canvas
      dpr={quality.dpr}
      shadows={quality.shadows}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.15, 6.6], fov: 35 }}
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={["#090909"]} />
      <fog attach="fog" args={["#090909", 6, 14]} />
      <Suspense fallback={null}>
        <Lights progressRef={progressRef} reducedMotion={reducedMotion} />
        <Exosuit progressRef={progressRef} reducedMotion={reducedMotion} />
        {/* Subtle warehouse reflections, not a bright showroom. */}
        <Environment preset="warehouse" environmentIntensity={0.35} />
      </Suspense>
      <Rig progressRef={progressRef} reducedMotion={reducedMotion} />
    </Canvas>
  );
}
