"use client";

/**
 * Premium Interactive Particle Earth — Geographic Edition
 *
 * Loads earth_land_mask.png and samples pixel brightness to place
 * particles densely on continents and sparsely on oceans.
 * Keeps all premium interactive features:
 *   • Radial breathing flow (noise along normal)
 *   • Magnetic cursor ripple (smooth outward displacement)
 *   • Lambertian day/night shading
 *   • Fresnel atmosphere rim glow
 *   • 80-second slow rotation
 */

import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { TextureLoader } from "three";
import * as THREE from "three";

// ═══════════════════════════════════════════════════════════════════
//  Constants
// ═══════════════════════════════════════════════════════════════════

const RADIUS = 1.5;
const ROTATION_SPEED = (2 * Math.PI) / 80;

const SUN_DIR = new THREE.Vector3(1.0, 0.5, 0.8).normalize();
const NO_HIT = new THREE.Vector3(9999, 9999, 9999);

// Texture sampling grid
const SAMPLE_COLS = 600;
const SAMPLE_ROWS = 300;
const LAND_MAX = 18000;
const OCEAN_MAX = 12000;

// ═══════════════════════════════════════════════════════════════════
//  Texture helpers
// ═══════════════════════════════════════════════════════════════════

function textureToPixels(tex) {
  const img = tex.image;
  const c = document.createElement("canvas");
  c.width = img.width; c.height = img.height;
  const ctx = c.getContext("2d");
  ctx.drawImage(img, 0, 0);
  return { d: ctx.getImageData(0, 0, img.width, img.height).data, w: img.width, h: img.height };
}

function getLuminance(px, u, v) {
  const x = Math.min(Math.floor(u * px.w), px.w - 1);
  const y = Math.min(Math.floor(v * px.h), px.h - 1);
  const i = (y * px.w + x) * 4;
  return 0.2126 * px.d[i] + 0.7152 * px.d[i + 1] + 0.0722 * px.d[i + 2];
}

function uvToSphere(u, v, r) {
  const phi = v * Math.PI;
  const theta = u * 2 * Math.PI - Math.PI;
  return [
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  ];
}

// ═══════════════════════════════════════════════════════════════════
//  GLSL Simplex 3D noise (Ashima Arts, MIT)
// ═══════════════════════════════════════════════════════════════════

const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;
  vec3 i1=min(g,l.zxy);vec3 i2=max(g,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(
    i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
  float n_=.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;
  vec4 sh=-step(h,vec4(0.));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
  m=m*m;
  return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

// ═══════════════════════════════════════════════════════════════════
//  Vertex shader — flow + ripple + shading
// ═══════════════════════════════════════════════════════════════════

const VERT = /* glsl */ `
${NOISE}

uniform float uTime;
uniform vec3  uSunDir;
uniform vec3  uCursor;
uniform float uDimFactor;  // 1.0 for land, 0.4 for ocean

varying float vAlpha;

void main() {
  vec3 pos = position;
  vec3 N   = normalize(pos);

  // ── 1. Tangent-plane flow (energy circulating on surface) ──────
  vec3 up  = vec3(0.0, 1.0, 0.0);
  vec3 ref = abs(dot(N, up)) > 0.99 ? vec3(1.0, 0.0, 0.0) : up;
  vec3 T   = normalize(cross(N, ref));
  vec3 B   = cross(N, T);
  float nT = snoise(pos * 1.6 + vec3(uTime * 0.12, 0.0, 0.0));
  float nB = snoise(pos * 1.6 + vec3(0.0, uTime * 0.12, 17.0));
  vec3 flowed = pos + T * nT * 0.018 + B * nB * 0.018;
  flowed = normalize(flowed) * length(pos);

  // ── 2. Cursor DISPERSE — visible outward scatter ───────────────
  float d      = length(flowed - uCursor);
  float ripple = smoothstep(0.9, 0.0, d);     // influence radius
  vec3  push   = N * ripple * 0.3;            // strong visible push
  vec3  newPos = flowed + push;

  // ── 3. Lambertian shading (simple, no pulse) ───────────────────
  float sun = dot(N, uSunDir);
  float day = smoothstep(-0.15, 0.5, sun);
  vAlpha    = uDimFactor * (0.2 + 0.8 * day);

  // ── 4. Projection + size attenuation ───────────────────────────
  vec4 mv = modelViewMatrix * vec4(newPos, 1.0);
  gl_PointSize = 18.0 / -mv.z;
  gl_Position  = projectionMatrix * mv;
}`;

// ═══════════════════════════════════════════════════════════════════
//  Fragment shader
// ═══════════════════════════════════════════════════════════════════

const FRAG = /* glsl */ `
varying float vAlpha;
void main() {
  float dist = length(gl_PointCoord - 0.5);
  float disc = 1.0 - smoothstep(0.35, 0.5, dist);
  if (disc < 0.01) discard;
  vec3 col = vec3(0.92, 0.95, 1.0);
  gl_FragColor = vec4(col, vAlpha * disc * 0.8);
}`;

// ═══════════════════════════════════════════════════════════════════
//  Atmosphere shaders (Fresnel)
// ═══════════════════════════════════════════════════════════════════

const ATMO_V = /* glsl */ `
varying vec3 vN; varying vec3 vV;
void main() {
  vN = normalize(normalMatrix * normal);
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vV = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}`;

const ATMO_F = /* glsl */ `
varying vec3 vN; varying vec3 vV;
void main() {
  float f = pow(1.0 - abs(dot(vN, vV)), 4.0);
  vec3 col = vec3(0.7, 0.85, 1.0);
  gl_FragColor = vec4(col * f, f * 0.4);
}`;

// ═══════════════════════════════════════════════════════════════════
//  ParticleEarth — texture-sampled geographic particles
// ═══════════════════════════════════════════════════════════════════

function ParticleEarth({ cursorRef }) {
  const landMatRef = useRef();
  const oceanMatRef = useRef();
  const landMask = useLoader(TextureLoader, "/textures/earth_land_mask.png");

  // Generate particles from texture luminance
  const { landPos, oceanPos } = useMemo(() => {
    if (!landMask?.image) return { landPos: new Float32Array(0), oceanPos: new Float32Array(0) };

    const px = textureToPixels(landMask);
    const land = [];
    const ocean = [];
    const J = 0.5 / SAMPLE_COLS; // UV jitter to hide grid

    for (let r = 0; r < SAMPLE_ROWS; r++) {
      for (let c = 0; c < SAMPLE_COLS; c++) {
        const u = (c + 0.5) / SAMPLE_COLS;
        const v = (r + 0.5) / SAMPLE_ROWS;
        const lum = getLuminance(px, u, v);

        if (lum > 100 && land.length / 3 < LAND_MAX && Math.random() < 0.72) {
          const ju = u + (Math.random() - 0.5) * J;
          const jv = v + (Math.random() - 0.5) * J;
          land.push(...uvToSphere(ju, jv, RADIUS));
        } else if (lum <= 100 && ocean.length / 3 < OCEAN_MAX && Math.random() < 0.08) {
          const ju = u + (Math.random() - 0.5) * J;
          const jv = v + (Math.random() - 0.5) * J;
          ocean.push(...uvToSphere(ju, jv, RADIUS));
        }
      }
    }
    return { landPos: new Float32Array(land), oceanPos: new Float32Array(ocean) };
  }, [landMask]);

  // Uniforms
  const landUniforms = useMemo(() => ({
    uTime: { value: 0 },
    uSunDir: { value: SUN_DIR },
    uCursor: { value: NO_HIT.clone() },
    uDimFactor: { value: 1.0 },
  }), []);

  const oceanUniforms = useMemo(() => ({
    uTime: { value: 0 },
    uSunDir: { value: SUN_DIR },
    uCursor: { value: NO_HIT.clone() },
    uDimFactor: { value: 0.4 },
  }), []);

  // Ocean uses smaller points
  const VERT_OCEAN = VERT.replace("18.0 / -mv.z", "12.0 / -mv.z");

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const cp = cursorRef.current;
    if (landMatRef.current) {
      landMatRef.current.uniforms.uTime.value = t;
      landMatRef.current.uniforms.uCursor.value.copy(cp);
    }
    if (oceanMatRef.current) {
      oceanMatRef.current.uniforms.uTime.value = t;
      oceanMatRef.current.uniforms.uCursor.value.copy(cp);
    }
  });

  return (
    <>
      {/* Land particles — bright, dense, geographic */}
      {landPos.length > 0 && (
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" array={landPos} itemSize={3} count={landPos.length / 3} />
          </bufferGeometry>
          <shaderMaterial
            ref={landMatRef}
            uniforms={landUniforms}
            vertexShader={VERT}
            fragmentShader={FRAG}
            transparent depthWrite={false}
            blending={THREE.NormalBlending}
          />
        </points>
      )}

      {/* Ocean particles — sparse, dim, smaller */}
      {oceanPos.length > 0 && (
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" array={oceanPos} itemSize={3} count={oceanPos.length / 3} />
          </bufferGeometry>
          <shaderMaterial
            ref={oceanMatRef}
            uniforms={oceanUniforms}
            vertexShader={VERT_OCEAN}
            fragmentShader={FRAG}
            transparent depthWrite={false}
            blending={THREE.NormalBlending}
          />
        </points>
      )}
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  Atmosphere
// ═══════════════════════════════════════════════════════════════════

function Atmosphere() {
  return (
    <mesh>
      <sphereGeometry args={[RADIUS * 1.08, 64, 64]} />
      <shaderMaterial
        vertexShader={ATMO_V} fragmentShader={ATMO_F}
        transparent side={THREE.FrontSide}
        depthWrite={false} blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  Scene — rotation, raycasting, parallax
// ═══════════════════════════════════════════════════════════════════

function Scene() {
  const { camera, gl } = useThree();
  const groupRef = useRef();
  const hitMesh = useRef();
  const cursorRef = useRef(NO_HIT.clone());
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const mouse = useRef(new THREE.Vector2(9999, 9999));

  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.outputColorSpace = THREE.SRGBColorSpace;
  }, [gl]);

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += ROTATION_SPEED * delta;

    if (hitMesh.current) {
      raycaster.setFromCamera(mouse.current, camera);
      const hits = raycaster.intersectObject(hitMesh.current);
      if (hits.length > 0) {
        const lp = groupRef.current.worldToLocal(hits[0].point.clone());
        lp.normalize().multiplyScalar(RADIUS);
        cursorRef.current.lerp(lp, 0.1);
      } else {
        // Smooth fade-out: drift cursor away from surface
        const curr = cursorRef.current;
        if (curr.length() < RADIUS + 1.5) {
          const escape = curr.clone().normalize().multiplyScalar(RADIUS + 3.0);
          curr.lerp(escape, 0.06);
        }
      }
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={hitMesh} visible={false}>
        <sphereGeometry args={[RADIUS, 32, 32]} />
        <meshBasicMaterial />
      </mesh>

      <Suspense fallback={null}>
        <ParticleEarth cursorRef={cursorRef} />
      </Suspense>

    </group>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  Root
// ═══════════════════════════════════════════════════════════════════

export default function EarthBackground() {
  return (
    <div className="fixed inset-0 bg-[#0b0f14] z-0">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5.0], fov: 45 }}
        gl={{ antialias: true, powerPreference: "high-performance", alpha: false }}
      >
        <fog attach="fog" args={["#0b0f14", 5, 12]} />
        <ambientLight intensity={0.08} />

        {/* ── Cinematic top spotlight ── */}
        <spotLight
          position={[0, 7, 5]}
          target-position={[0, 0, 0]}
          angle={0.45}
          penumbra={0.9}
          intensity={1.4}
          color="#dce6f0"
          castShadow={false}
        />

        {/* ── Cinematic bottom spotlight (softer) ── */}
        <spotLight
          position={[0, -7, 5]}
          target-position={[0, 0, 0]}
          angle={0.45}
          penumbra={0.9}
          intensity={0.8}
          color="#c8d8e8"
          castShadow={false}
        />

        <Scene />
      </Canvas>

      {/* ── Vignette overlay (CSS radial gradient) ── */}
      <div
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.45) 100%)",
        }}
      />
    </div>
  );
}