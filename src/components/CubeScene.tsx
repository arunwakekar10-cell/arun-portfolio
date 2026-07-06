import React, { useMemo, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import gsap from "gsap";

/* ------------------------------------------------------------------ */
/* Shared mutable pointer state (updated from the DOM, read in R3F)    */
/* ------------------------------------------------------------------ */
export interface PointerState {
  x: number; // -1 .. 1
  y: number; // -1 .. 1
}

/* ------------------------------------------------------------------ */
/* Mobile detection — on small screens the cube is hidden (rings and   */
/* particles remain as the ambient background).                        */
/* ------------------------------------------------------------------ */
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= breakpoint
  );
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [breakpoint]);
  return isMobile;
}

/* ------------------------------------------------------------------ */
/* Scroll-aware rig: on the hero the cube sits right-of-center;        */
/* as the page scrolls horizontally it drifts to center, scales down   */
/* and keeps slowly spinning as an ambient page background.            */
/* ------------------------------------------------------------------ */
function SceneRig({
  scroll,
  children
}: {
  scroll: React.MutableRefObject<number>;
  children: React.ReactNode;
}) {
  const rig = useRef<THREE.Group>(null!);
  const { size } = useThree();

  useFrame((state, dt) => {
    const g = rig.current;
    const aspect = size.width / Math.max(1, size.height);
    const p = Math.min(1, Math.max(0, scroll.current * 1.6)); // 0 = hero
    const heroX = aspect < 1.1 ? 0 : 2.1;
    const targetX = heroX * (1 - p);
    const targetS = 1 - 0.22 * p;
    const k = Math.min(1, dt * 3);
    g.position.x += (targetX - g.position.x) * k;
    const s = g.scale.x + (targetS - g.scale.x) * k;
    g.scale.setScalar(s);
    // extra scroll-driven spin so movement between sections feels alive
    g.rotation.y += ((scroll.current * 2.2) - g.rotation.y) * k;
  });

  return <group ref={rig}>{children}</group>;
}

/* ------------------------------------------------------------------ */
/* Canvas texture helpers                                              */
/* ------------------------------------------------------------------ */

/** Animated electric-circuit texture drawn on a canvas */
function makeCircuitTexture(): THREE.CanvasTexture {
  const size = 512;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  ctx.clearRect(0, 0, size, size);

  const rand = (a: number, b: number) => a + Math.random() * (b - a);
  const colors = ["#22d3ee", "#3b82f6", "#a855f7"];
  const grid = 32;

  // circuit traces: manhattan paths with pads
  for (let i = 0; i < 46; i++) {
    const color = colors[i % 3];
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = rand(1.5, 2.5);
    ctx.globalAlpha = rand(0.45, 0.9);

    let x = Math.round(rand(1, 15)) * grid;
    let y = Math.round(rand(1, 15)) * grid;
    ctx.beginPath();
    ctx.moveTo(x, y);
    const steps = 2 + Math.floor(Math.random() * 4);
    for (let s = 0; s < steps; s++) {
      const horizontal = Math.random() > 0.5;
      const len = Math.round(rand(1, 4)) * grid * (Math.random() > 0.5 ? 1 : -1);
      if (horizontal) x = Math.min(size - grid, Math.max(grid, x + len));
      else y = Math.min(size - grid, Math.max(grid, y + len));
      ctx.lineTo(x, y);
    }
    ctx.stroke();

    // solder pad at end
    ctx.beginPath();
    ctx.arc(x, y, rand(3.5, 6), 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.strokeStyle = "rgba(255,255,255,0.85)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI * 2);
    ctx.stroke();
  }

  // tiny chips
  for (let i = 0; i < 8; i++) {
    const x = Math.round(rand(2, 13)) * grid;
    const y = Math.round(rand(2, 13)) * grid;
    ctx.globalAlpha = 0.8;
    ctx.strokeStyle = colors[i % 3];
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, grid * 1.5, grid);
  }
  ctx.globalAlpha = 1;

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 4;
  return tex;
}

/** Text billboard shown inside the cube */
function makeCoreTextTexture(): THREE.CanvasTexture {
  const w = 512;
  const h = 512;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  ctx.clearRect(0, 0, w, h);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // </> symbol
  const grad = ctx.createLinearGradient(90, 0, 422, 0);
  grad.addColorStop(0, "#60a5fa");
  grad.addColorStop(0.5, "#c084fc");
  grad.addColorStop(1, "#22d3ee");
  ctx.fillStyle = grad;
  ctx.shadowColor = "#818cf8";
  ctx.shadowBlur = 34;
  ctx.font = "700 150px 'Consolas', 'Courier New', monospace";
  ctx.fillText("</>", w / 2, 140);

  // AI
  ctx.font = "800 96px 'Segoe UI', sans-serif";
  ctx.shadowColor = "#22d3ee";
  ctx.shadowBlur = 28;
  ctx.fillStyle = "#e8f4ff";
  ctx.fillText("AI", w / 2, 282);

  // Automation · Testing
  ctx.font = "600 44px 'Segoe UI', sans-serif";
  ctx.shadowBlur = 20;
  ctx.shadowColor = "#a855f7";
  ctx.fillStyle = "#cfe0ff";
  ctx.fillText("AUTOMATION", w / 2, 386);
  ctx.fillStyle = "#9fdcf0";
  ctx.shadowColor = "#22d3ee";
  ctx.fillText("TESTING", w / 2, 448);

  const tex = new THREE.CanvasTexture(c);
  tex.anisotropy = 4;
  return tex;
}

/** Binary glyph sprite texture for particles ("0" or "1") */
function makeGlyphTexture(glyph: string, color: string): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const ctx = c.getContext("2d")!;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "700 44px 'Consolas', monospace";
  ctx.shadowColor = color;
  ctx.shadowBlur = 12;
  ctx.fillStyle = color;
  ctx.fillText(glyph, 32, 34);
  return new THREE.CanvasTexture(c);
}

/* ------------------------------------------------------------------ */
/* The AI Cube                                                         */
/* ------------------------------------------------------------------ */

const CUBE = 2.1;

function AICube({ pointer }: { pointer: React.MutableRefObject<PointerState> }) {
  const rig = useRef<THREE.Group>(null!); // mouse tilt + float
  const spin = useRef<THREE.Group>(null!); // continuous rotation
  const bodyMat = useRef<THREE.MeshStandardMaterial>(null!);
  const circuitMats = useRef<THREE.MeshBasicMaterial[]>([]);
  const textMats = useRef<THREE.MeshBasicMaterial[]>([]);
  const edgeMat = useRef<THREE.LineBasicMaterial>(null!);
  const glowLight = useRef<THREE.PointLight>(null!);
  const sheen = useRef<THREE.Mesh>(null!);
  const hoverState = useRef({ scale: 1, glow: 1 });

  const circuitTex = useMemo(makeCircuitTexture, []);
  const coreTex = useMemo(makeCoreTextTexture, []);
  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(CUBE, CUBE, CUBE)), []);

  const corners = useMemo(() => {
    const h = CUBE / 2;
    const pts: [number, number, number][] = [];
    for (const x of [-h, h]) for (const y of [-h, h]) for (const z of [-h, h]) pts.push([x, y, z]);
    return pts;
  }, []);

  /* hover → GSAP glow + enlarge (triggered by pointer proximity since the
     scrolling page sits above the canvas) */
  const hovered = useRef(false);
  const setHover = (on: boolean) => {
    if (hovered.current === on) return;
    hovered.current = on;
    gsap.to(hoverState.current, {
      scale: on ? 1.09 : 1,
      glow: on ? 1.9 : 1,
      duration: on ? 0.6 : 0.8,
      ease: "power3.out"
    });
  };

  /* GSAP intro sequence */
  useEffect(() => {
    if (!rig.current) return;
    gsap.fromTo(
      rig.current.scale,
      { x: 0.001, y: 0.001, z: 0.001 },
      { x: 1, y: 1, z: 1, duration: 1.6, ease: "elastic.out(1, 0.62)", delay: 0.25 }
    );
  }, []);

  const worldPos = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const hv = hoverState.current;

    /* proximity hover: project cube center to NDC, compare with pointer */
    spin.current.getWorldPosition(worldPos);
    worldPos.project(state.camera);
    const dx = worldPos.x - pointer.current.x;
    const dy = -worldPos.y - pointer.current.y; // pointer.y is inverted vs NDC
    setHover(Math.hypot(dx, dy) < 0.34);

    /* continuous slow rotation: 360° every ~24 s */
    spin.current.rotation.y += (Math.PI * 2 / 24) * dt;
    spin.current.rotation.x = Math.sin(t * 0.22) * 0.12;

    /* float up & down + mouse tilt (lerped) */
    const g = rig.current;
    g.position.y = Math.sin(t * 0.85) * 0.16;
    const tx = pointer.current.y * 0.24;
    const ty = pointer.current.x * 0.32;
    g.rotation.x += (tx - g.rotation.x) * Math.min(1, dt * 3.2);
    g.rotation.y += (ty - g.rotation.y) * Math.min(1, dt * 3.2);

    /* hover scale on top of intro scale */
    const s = hv.scale;
    spin.current.scale.setScalar(s);

    /* energy pulse — solid body emissive breathes */
    const pulse = 0.75 + Math.sin(t * 2.4) * 0.25 + Math.sin(t * 5.1) * 0.08;
    if (bodyMat.current) bodyMat.current.emissiveIntensity = (0.35 + pulse * 0.3) * hv.glow;
    if (glowLight.current) glowLight.current.intensity = (1.8 + pulse * 2.0) * hv.glow;

    /* LED edges flicker + hover boost */
    if (edgeMat.current) {
      const led = 0.75 + Math.sin(t * 3.1) * 0.18;
      edgeMat.current.opacity = Math.min(1, led * hv.glow);
    }

    /* flowing circuits: scroll texture */
    circuitTex.offset.x = (t * 0.05) % 1;
    circuitTex.offset.y = (t * 0.028) % 1;
    circuitMats.current.forEach((m, i) => {
      if (m) m.opacity = (0.4 + 0.18 * Math.sin(t * 1.8 + i * 1.1)) * hv.glow;
    });

    /* face text glow pulse */
    textMats.current.forEach((m, i) => {
      if (m) m.opacity = Math.min(1, (0.85 + 0.15 * Math.sin(t * 2 + i)) * hv.glow);
    });

    /* moving light reflection sweep across faces */
    if (sheen.current) {
      const mat = sheen.current.material as THREE.MeshBasicMaterial;
      const k = (t % 5) / 5;
      sheen.current.position.set(-CUBE + k * CUBE * 2, CUBE - k * CUBE * 2, CUBE / 2 + 0.011);
      mat.opacity = Math.sin(k * Math.PI) * 0.4;
    }
  });

  const half = CUBE / 2 + 0.012;
  const faceProps: { pos: [number, number, number]; rot: [number, number, number] }[] = [
    { pos: [0, 0, half], rot: [0, 0, 0] },
    { pos: [0, 0, -half], rot: [0, Math.PI, 0] },
    { pos: [half, 0, 0], rot: [0, Math.PI / 2, 0] },
    { pos: [-half, 0, 0], rot: [0, -Math.PI / 2, 0] },
    { pos: [0, half, 0], rot: [-Math.PI / 2, 0, 0] },
    { pos: [0, -half, 0], rot: [Math.PI / 2, 0, 0] }
  ];

  return (
    <group ref={rig}>
      <group ref={spin}>
        {/* --- SOLID cube body --- */}
        <mesh castShadow>
          <boxGeometry args={[CUBE, CUBE, CUBE]} />
          <meshStandardMaterial
            ref={bodyMat}
            color="#101a4d"
            metalness={0.75}
            roughness={0.28}
            emissive="#2436a8"
            emissiveIntensity={0.45}
          />
        </mesh>

        {/* --- animated circuit layer on every face --- */}
        {faceProps.map((f, i) => (
          <mesh key={i} position={f.pos} rotation={f.rot}>
            <planeGeometry args={[CUBE * 0.985, CUBE * 0.985]} />
            <meshBasicMaterial
              ref={(m) => { if (m) circuitMats.current[i] = m; }}
              map={circuitTex}
              transparent
              opacity={0.45}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        ))}

        {/* --- "</> AI AUTOMATION TESTING" printed on the 4 side faces --- */}
        {faceProps.slice(0, 4).map((f, i) => (
          <mesh
            key={`t${i}`}
            position={[f.pos[0] * 1.01, f.pos[1] * 1.01, f.pos[2] * 1.01]}
            rotation={f.rot}
          >
            <planeGeometry args={[CUBE * 0.82, CUBE * 0.82]} />
            <meshBasicMaterial
              ref={(m) => { if (m) textMats.current[i] = m; }}
              map={coreTex}
              transparent
              opacity={0.95}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        ))}

        {/* --- moving specular sheen (light reflection) --- */}
        <mesh ref={sheen} rotation={[0, 0, Math.PI / 4]}>
          <planeGeometry args={[0.34, CUBE * 2.6]} />
          <meshBasicMaterial color="#bfe3ff" transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>

        {/* --- glowing LED edges --- */}
        <lineSegments geometry={edges}>
          <lineBasicMaterial ref={edgeMat} color="#67e8f9" transparent opacity={0.9} toneMapped={false} />
        </lineSegments>

        {/* corner LED nodes */}
        {corners.map((p, i) => (
          <mesh key={i} position={p}>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshBasicMaterial color={i % 2 ? "#22d3ee" : "#a78bfa"} toneMapped={false} />
          </mesh>
        ))}

        {/* glow light emanating from the cube */}
        <pointLight ref={glowLight} color="#7d8cff" intensity={2.4} distance={8} decay={2} />
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Holographic rings                                                   */
/* ------------------------------------------------------------------ */
function HoloRings() {
  const r1 = useRef<THREE.Mesh>(null!);
  const r2 = useRef<THREE.Mesh>(null!);
  const r3 = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    r1.current.rotation.z = t * 0.32;
    r1.current.rotation.x = Math.PI / 2.15 + Math.sin(t * 0.3) * 0.08;
    r2.current.rotation.z = -t * 0.2;
    r2.current.rotation.x = Math.PI / 2.6;
    r2.current.rotation.y = t * 0.14;
    r3.current.rotation.x = Math.PI / 1.75 + Math.cos(t * 0.24) * 0.1;
    r3.current.rotation.z = t * 0.45;
  });

  return (
    <group>
      <mesh ref={r1} rotation={[Math.PI / 2.15, 0, 0]}>
        <torusGeometry args={[2.35, 0.012, 8, 128]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.55} toneMapped={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={r2} rotation={[Math.PI / 2.6, 0, 0]}>
        <torusGeometry args={[2.85, 0.009, 8, 128]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.42} toneMapped={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={r3} rotation={[Math.PI / 1.75, 0, 0]}>
        <torusGeometry args={[1.85, 0.014, 8, 96]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.6} toneMapped={false} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Orbiting particles: dust, binary glyphs, data packets               */
/* ------------------------------------------------------------------ */
function Particles() {
  const dust = useRef<THREE.Points>(null!);
  const zeros = useRef<THREE.Points>(null!);
  const ones = useRef<THREE.Points>(null!);

  const dustGeo = useMemo(() => {
    const n = 220;
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 2.4 + Math.random() * 2.4;
      const th = Math.random() * Math.PI * 2;
      const ph = (Math.random() - 0.5) * Math.PI * 0.7;
      pos[i * 3] = r * Math.cos(th) * Math.cos(ph);
      pos[i * 3 + 1] = r * Math.sin(ph);
      pos[i * 3 + 2] = r * Math.sin(th) * Math.cos(ph);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);

  const makeBinaryGeo = (n: number) => {
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 2.7 + Math.random() * 1.9;
      const th = Math.random() * Math.PI * 2;
      const ph = (Math.random() - 0.5) * Math.PI * 0.55;
      pos[i * 3] = r * Math.cos(th) * Math.cos(ph);
      pos[i * 3 + 1] = r * Math.sin(ph);
      pos[i * 3 + 2] = r * Math.sin(th) * Math.cos(ph);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  };

  const zeroGeo = useMemo(() => makeBinaryGeo(30), []);
  const oneGeo = useMemo(() => makeBinaryGeo(30), []);
  const zeroTex = useMemo(() => makeGlyphTexture("0", "#67e8f9"), []);
  const oneTex = useMemo(() => makeGlyphTexture("1", "#c4b5fd"), []);

  /* data packets: small glowing boxes on tilted orbits */
  const packets = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        radius: 2.5 + (i % 3) * 0.55,
        speed: 0.35 + (i % 4) * 0.16,
        phase: (i / 7) * Math.PI * 2,
        tilt: (i % 3) * 0.4 - 0.35,
        color: ["#22d3ee", "#a855f7", "#3b82f6"][i % 3]
      })),
    []
  );
  const packetRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    dust.current.rotation.y = t * 0.05;
    zeros.current.rotation.y = -t * 0.075;
    zeros.current.rotation.x = Math.sin(t * 0.18) * 0.1;
    ones.current.rotation.y = t * 0.06;
    ones.current.rotation.z = Math.sin(t * 0.15) * 0.08;

    packets.forEach((p, i) => {
      const m = packetRefs.current[i];
      if (!m) return;
      const a = t * p.speed + p.phase;
      m.position.set(
        Math.cos(a) * p.radius,
        Math.sin(a * 1.35) * 0.55 + Math.sin(a) * p.tilt,
        Math.sin(a) * p.radius
      );
      m.rotation.x = t * 1.4 + i;
      m.rotation.y = t * 1.1;
    });
  });

  return (
    <group>
      <points ref={dust} geometry={dustGeo}>
        <pointsMaterial color="#7da2ff" size={0.028} transparent opacity={0.75} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
      <points ref={zeros} geometry={zeroGeo}>
        <pointsMaterial map={zeroTex} color="#67e8f9" size={0.17} transparent opacity={0.85} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
      <points ref={ones} geometry={oneGeo}>
        <pointsMaterial map={oneTex} color="#c4b5fd" size={0.17} transparent opacity={0.85} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
      {packets.map((p, i) => (
        <mesh key={i} ref={(m) => { if (m) packetRefs.current[i] = m; }}>
          <boxGeometry args={[0.09, 0.09, 0.09]} />
          <meshBasicMaterial color={p.color} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Responsive camera fit                                               */
/* ------------------------------------------------------------------ */
function Responsive() {
  const { camera, size } = useThree();
  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    const aspect = size.width / Math.max(1, size.height);
    cam.position.z = aspect < 0.85 ? 9.4 : aspect < 1.2 ? 8.2 : 7.2;
    cam.updateProjectionMatrix();
  }, [camera, size]);
  return null;
}

/* ------------------------------------------------------------------ */
/* Scene root                                                          */
/* ------------------------------------------------------------------ */
export default function CubeScene({
  pointer,
  scroll
}: {
  pointer: React.MutableRefObject<PointerState>;
  scroll: React.MutableRefObject<number>;
}) {
  const isMobile = useIsMobile();
  return (
    <Canvas
      className="stage-canvas"
      shadows
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.1, 7.2], fov: 45 }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 6, 4]} intensity={1.1} color="#bcd4ff" castShadow />
      <pointLight position={[-5, -2, 3]} intensity={1.4} color="#a855f7" />
      <pointLight position={[4, -3, -4]} intensity={1.2} color="#22d3ee" />

      <SceneRig scroll={scroll}>
        {!isMobile && <AICube pointer={pointer} />}
        <HoloRings />
        <Particles />
      </SceneRig>

      <EffectComposer multisampling={0}>
        <Bloom intensity={1.15} luminanceThreshold={0.32} luminanceSmoothing={0.65} mipmapBlur radius={0.75} />
      </EffectComposer>
    </Canvas>
  );
}
