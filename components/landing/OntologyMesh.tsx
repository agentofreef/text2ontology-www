"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Sparkles, Billboard } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Hero background: the lakehouse-graph rendered onto the surface of a
 * wireframe icosahedron — every one of the 12 vertices carries an
 * entity, so coverage stays full at any rotation angle (no empty back
 * hemisphere when the graph turns away).
 *
 * Visual language mirrors /lakehouse-graph in the app:
 *   - Entity     → solid black filled disc + "NAME / ENTITY Np" label
 *   - Property   → small gray filled square + tiny mono label
 *   - FK link    → accent tube arcing OVER the sphere surface, with the
 *                  FK column name floating at curve midpoint
 *   - Pulse      → emissive comet crawling each FK arc (bloom-streaked)
 *
 * Tuned for white background:
 *   - Thinner FK tubes (0.013 vs the heavy 0.022 of the molecular pass)
 *   - Softer emissive on FK so accent doesn't dominate
 *   - Darker ownership lines (#a3a3a3) so they read against #fafafa
 *
 * Slow rotation; sparkles for atmosphere; bloom catches the accent.
 */

type Entity = { name: string; props: string[] };
type FK = { from: string; to: string; via: string };

// 12 entities — one per icosahedron vertex.
// Total property count bumped ~+20% (28 → 34) for denser coverage.
const ENTITY_SPECS: Entity[] = [
  { name: "Order", props: ["id", "qty", "total", "date"] },
  { name: "Customer", props: ["id", "name", "segment", "country"] },
  { name: "Product", props: ["id", "name", "sku_code", "price"] },
  { name: "Region", props: ["id", "name", "country"] },
  { name: "SKU", props: ["id", "code", "unit"] },
  { name: "Channel", props: ["id", "name", "type"] },
  { name: "Period", props: ["id", "date"] },
  { name: "Account", props: ["id", "name"] },
  { name: "Vendor", props: ["id", "name"] },
  { name: "Supplier", props: ["id", "contact"] },
  { name: "Inventory", props: ["id", "qty"] },
  { name: "Promotion", props: ["id", "rate"] },
];

const FKS: FK[] = [
  { from: "Order", to: "Customer", via: "customer_id" },
  { from: "Order", to: "Product", via: "product_id" },
  { from: "Order", to: "Channel", via: "channel_id" },
  { from: "Order", to: "Period", via: "period_id" },
  { from: "Product", to: "SKU", via: "sku_code" },
  { from: "Product", to: "Region", via: "region_id" },
  { from: "Product", to: "Vendor", via: "vendor_id" },
  { from: "SKU", to: "Supplier", via: "supplier_id" },
  { from: "Inventory", to: "SKU", via: "sku_id" },
  { from: "Promotion", to: "Channel", via: "channel_id" },
];

const POLY_RADIUS = 2.55;
const FK_TUBE_RADIUS = 0.013;
const ENTITY_DISC_RADIUS = 0.12;
const LABEL_OFFSET_Y = -0.33;
const PLASTIC_NUMBER_CONJ = 0.7548776662466927;

function icosahedronBaseVertices(radius: number): THREE.Vector3[] {
  const geo = new THREE.IcosahedronGeometry(radius, 0);
  const attr = geo.attributes.position as THREE.BufferAttribute;
  const seen = new Map<string, THREE.Vector3>();
  for (let i = 0; i < attr.count; i++) {
    const v = new THREE.Vector3().fromBufferAttribute(attr, i);
    const key = `${v.x.toFixed(2)},${v.y.toFixed(2)},${v.z.toFixed(2)}`;
    if (!seen.has(key)) seen.set(key, v);
  }
  return Array.from(seen.values());
}

// Great-circle-ish arc: midpoint projected outward beyond the sphere so
// the bezier bulges OVER the polyhedron instead of cutting through.
function buildSurfaceArcGeometry(
  a: THREE.Vector3,
  b: THREE.Vector3,
  radius: number,
  bondRadius: number,
): { geo: THREE.TubeGeometry; curve: THREE.QuadraticBezierCurve3 } {
  const mid = new THREE.Vector3()
    .addVectors(a, b)
    .multiplyScalar(0.5)
    .normalize()
    .multiplyScalar(radius * 1.06);
  const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
  return {
    geo: new THREE.TubeGeometry(curve, 38, bondRadius, 8, false),
    curve,
  };
}

function Graph() {
  const groupRef = useRef<THREE.Group>(null);
  const pulseRefs = useRef<(THREE.Mesh | null)[]>([]);
  // Label DOM refs for per-frame facing-based opacity fade.
  const entityLabelRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 12 entities mapped 1:1 to the 12 icosahedron base vertices.
  const entities = useMemo(() => {
    const verts = icosahedronBaseVertices(POLY_RADIUS);
    return ENTITY_SPECS.map((spec, i) => ({
      ...spec,
      pos: verts[i].clone(),
    }));
  }, []);

  const entityByName = useMemo(() => {
    const m = new Map<string, (typeof entities)[number]>();
    entities.forEach((e) => m.set(e.name, e));
    return m;
  }, [entities]);

  const fks = useMemo(
    () =>
      FKS.map((fk, i) => {
        const a = entityByName.get(fk.from)!.pos;
        const b = entityByName.get(fk.to)!.pos;
        const { geo, curve } = buildSurfaceArcGeometry(
          a,
          b,
          POLY_RADIUS,
          FK_TUBE_RADIUS,
        );
        return {
          ...fk,
          geo,
          curve,
          phase: (i * PLASTIC_NUMBER_CONJ) % 1,
          speed: 0.1 + ((i * 0.137) % 0.05),
          labelPos: curve.getPoint(0.5),
        };
      }),
    [entityByName],
  );

  const polyGeo = useMemo(
    () => new THREE.IcosahedronGeometry(POLY_RADIUS, 1),
    [],
  );
  const entityGeo = useMemo(
    () => new THREE.CircleGeometry(ENTITY_DISC_RADIUS, 32),
    [],
  );
  const pulseGeo = useMemo(() => new THREE.SphereGeometry(0.038, 14, 14), []);

  // Reused vector to avoid per-frame allocation cost across ~50 labels.
  const facingTmp = useMemo(() => new THREE.Vector3(), []);

  // Facing → opacity ramp. World-space z relative to the polyhedron
  // radius: front (z = +R) maps to 1, back (z = -R) maps to 0.15.
  // pow(1.4) gives a sharper falloff near the back so the back half
  // sits clearly muted, not just dimly visible.
  const facingOpacity = (worldZ: number) => {
    const t = Math.max(0, Math.min(1, (worldZ + POLY_RADIUS) / (2 * POLY_RADIUS)));
    return 0.15 + Math.pow(t, 1.4) * 0.85;
  };

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
      groupRef.current.rotation.x += delta * 0.016;
    }
    const t = state.clock.elapsedTime;
    for (let i = 0; i < fks.length; i++) {
      const m = pulseRefs.current[i];
      if (!m) continue;
      const e = fks[i];
      const u = (t * e.speed + e.phase) % 1;
      const p = e.curve.getPoint(u);
      m.position.set(p.x, p.y, p.z);
    }

    // Per-frame facing-based label opacity fade. Cuts visual density
    // in half: only the front-hemisphere labels are full opacity, back
    // hemisphere fades to ~15%.
    const groupQ = groupRef.current?.quaternion;
    if (groupQ) {
      // Entity labels
      for (let i = 0; i < entities.length; i++) {
        const ref = entityLabelRefs.current[i];
        if (!ref) continue;
        facingTmp.copy(entities[i].pos).applyQuaternion(groupQ);
        ref.style.opacity = String(facingOpacity(facingTmp.z));
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer wireframe icosahedron — scaffold */}
      <mesh geometry={polyGeo}>
        <meshBasicMaterial
          color="#525252"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* FK arcs over the sphere surface */}
      {fks.map((fk, i) => (
        <mesh key={`fk-${i}`} geometry={fk.geo}>
          <meshStandardMaterial
            color="#ff4500"
            emissive="#ff4500"
            emissiveIntensity={0.85}
            roughness={0.45}
            metalness={0.15}
          />
        </mesh>
      ))}

      {/* Pulse comets — small but emissive enough that bloom streaks them */}
      {fks.map((_, i) => (
        <mesh
          key={`pulse-${i}`}
          geometry={pulseGeo}
          ref={(el) => {
            pulseRefs.current[i] = el;
          }}
        >
          <meshStandardMaterial
            color="#ffb499"
            emissive="#ff5722"
            emissiveIntensity={2.4}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Entity discs + labels */}
      {entities.map((e, i) => (
        <group key={`ent-${i}`} position={[e.pos.x, e.pos.y, e.pos.z]}>
          <Billboard>
            <mesh geometry={entityGeo}>
              <meshBasicMaterial color="#0a0a0a" />
            </mesh>
          </Billboard>
          <Html
            position={[0, LABEL_OFFSET_Y, 0]}
            center
            distanceFactor={8}
            zIndexRange={[30, 0]}
            style={{ pointerEvents: "none" }}
          >
            <div
              ref={(el) => {
                entityLabelRefs.current[i] = el;
              }}
              style={{
                fontFamily: "var(--font-jetbrains-mono, monospace)",
                textAlign: "center",
                userSelect: "none",
                lineHeight: 1.15,
                transition: "opacity 0.15s linear",
              }}
            >
              <div
                style={{
                  fontSize: 10.5,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "#0a0a0a",
                  textTransform: "uppercase",
                }}
              >
                {e.name}
              </div>
              <div
                style={{
                  fontSize: 7,
                  letterSpacing: "0.15em",
                  color: "#a3a3a3",
                  textTransform: "uppercase",
                  marginTop: 1,
                }}
              >
                ENTITY {e.props.length}p
              </div>
            </div>
          </Html>
        </group>
      ))}

      <Sparkles
        count={60}
        scale={[8, 7, 8]}
        size={1.3}
        speed={0.22}
        opacity={0.32}
        color="#888"
      />
    </group>
  );
}

export function OntologyMesh() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute right-[3%] top-1/2 hidden h-[90%] w-[50%] -translate-y-1/2 md:block"
      style={{
        background:
          "radial-gradient(ellipse at 55% 50%, rgba(10,10,20,0.05) 0%, rgba(10,10,20,0.02) 40%, transparent 75%)",
      }}
    >
      <Canvas camera={{ position: [0, 0, 8.5], fov: 55 }} dpr={[1, 2]}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 6, 4]} intensity={0.7} />
        <Graph />
        <EffectComposer>
          <Bloom
            intensity={0.75}
            luminanceThreshold={0.62}
            luminanceSmoothing={0.4}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
