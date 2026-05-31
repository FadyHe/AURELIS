import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../../../stores/useStore';

interface BottleProps {
  id: string;
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
  isHovered?: boolean;
}

// 1. High-Performance Luxury Scent Reference Configurations
const SCENT_STATES = {
  aurelis: {
    // Light pure crystal with slightly frosted, highly tactile details
    liquidColor: new THREE.Color('#22d3ee'), 
    liquidEmissive: new THREE.Color('#0891b2'),
    liquidEmissiveIntensity: 0.40, // Elegant vivid split layer definition
    glassColor: new THREE.Color('#f8fafc'), // pure white porcelain crystal
    glassOpacity: 0.42,
    glassRoughness: 0.06, // Slight tactile roughness variation
    glassTransmission: 0.96,
    glassMetalness: 0.08,
    capColor: new THREE.Color('#e2e8f0'), // mirror-shine sterling silver
    capRoughness: 0.04, // Premium silver cap detailing
    capMetalness: 1.0,
    collarColor: new THREE.Color('#94a3b8'), // brushed silver collar
    labelColor: new THREE.Color('#f8fafc'), // Frosted crystal label plate
    labelBorderColor: new THREE.Color('#cbd5e1'), // silver outline frame
    hasCapCylinder: 1.0,
    hasCapStone: 0.0,
    hasCapGold: 0.0,
    isRoundedBox: 1.0,
    isCylinder: 0.0,
    labelScale: 1.0,
  },
  nocterra: {
    // Deep emerald translucent body with highly rich magical forest glows
    liquidColor: new THREE.Color('#047857'), 
    liquidEmissive: new THREE.Color('#10b981'), // Rich emerald internal glow
    liquidEmissiveIntensity: 0.95, // Highly energized sillage Core
    glassColor: new THREE.Color('#022c22'), // Deep emerald translucent envelope
    glassOpacity: 0.85, 
    glassRoughness: 0.16, // Premium mineral stone grain sheen
    glassTransmission: 0.20, // Lower transmission means spectacular contrast & depth
    glassMetalness: 0.32, 
    capColor: new THREE.Color('#141110'), // Granite Basalt premium stone black
    capRoughness: 0.94, // Ultra-matte raw mineral stone texture
    capMetalness: 0.02,
    collarColor: new THREE.Color('#292524'), // matte stone collar
    labelColor: new THREE.Color('#03120a'), // Dark engraved midnight emerald plaque
    labelBorderColor: new THREE.Color('#059669'), // glowing jade outline
    hasCapCylinder: 0.0,
    hasCapStone: 1.0,
    hasCapGold: 0.0,
    isRoundedBox: 0.0,
    isCylinder: 1.0,
    labelScale: 0.92,
  },
  'solaire-noir': {
    // Highly dense indigo obsidian outer skin housing a glowing amber core
    liquidColor: new THREE.Color('#ea580c'), // Molten hot gold amber
    liquidEmissive: new THREE.Color('#f97316'), // warm amber liquid core
    liquidEmissiveIntensity: 0.90, // Intense premium core brilliance
    glassColor: new THREE.Color('#04020a'), // Dark indigo obsidian glass finish
    glassOpacity: 0.94,
    glassRoughness: 0.04, // Slick polished mirror-shine obsidian gloss
    glassTransmission: 0.12, // light only bleeds beautifully through liquid center!
    glassMetalness: 0.45, // heavy silhouette reflections
    capColor: new THREE.Color('#fbbf24'), // 24k bright gold block cap
    capRoughness: 0.08, // highly polished premium gold
    capMetalness: 1.0,
    collarColor: new THREE.Color('#d97706'), // warm gold collar
    labelColor: new THREE.Color('#060402'), // Dark luxury velvet label plate
    labelBorderColor: new THREE.Color('#fbbf24'), // shiny gold metallic detailing
    hasCapCylinder: 0.0,
    hasCapStone: 0.0,
    hasCapGold: 1.0,
    isRoundedBox: 1.0,
    isCylinder: 0.0,
    labelScale: 1.02,
  },
};

export const UnifiedLuxuryBottle: React.FC<BottleProps> = ({
  id,
  position = [0, 0, 0],
  scale = 1.0,
  rotation = [0, 0, 0],
  isHovered = false,
}) => {
  const bottleGroupRef = useRef<THREE.Group>(null);
  const scrollProgress = useStore((state) => state.scrollProgress);
  const performanceTier = useStore((state) => state.performanceTier);

  // Normalize Active ID to match key structure
  const activeScentId = useMemo(() => {
    const formatted = id.toLowerCase().trim();
    if (formatted === 'solairenoir' || formatted === 'solaire_noir') return 'solaire-noir';
    if (formatted === 'nocterra') return 'nocterra';
    return 'aurelis';
  }, [id]);

  // Unified persistent Lerping Refs to prevent state drop popping
  const refs = useMemo(() => ({
    liquidColor: new THREE.Color(),
    liquidEmissive: new THREE.Color(),
    liquidEmissiveIntensity: 0,
    glassColor: new THREE.Color(),
    glassOpacity: 0,
    glassRoughness: 0,
    glassTransmission: 0,
    glassMetalness: 0,
    capColor: new THREE.Color(),
    capRoughness: 0,
    capMetalness: 0,
    collarColor: new THREE.Color(),
    labelColor: new THREE.Color(),
    labelBorderColor: new THREE.Color(),
    hasCapCylinder: 1.0,
    hasCapStone: 0.0,
    hasCapGold: 0.0,
    isRoundedBox: 1.0,
    isCylinder: 0.0,
    labelScale: 1.0,
  }), []);

  // Initialize Lerps from default state
  useMemo(() => {
    const initial = SCENT_STATES[activeScentId as keyof typeof SCENT_STATES] || SCENT_STATES.aurelis;
    refs.liquidColor.copy(initial.liquidColor);
    refs.liquidEmissive.copy(initial.liquidEmissive);
    refs.liquidEmissiveIntensity = initial.liquidEmissiveIntensity;
    refs.glassColor.copy(initial.glassColor);
    refs.glassOpacity = initial.glassOpacity;
    refs.glassRoughness = initial.glassRoughness;
    refs.glassTransmission = initial.glassTransmission;
    refs.glassMetalness = initial.glassMetalness;
    refs.capColor.copy(initial.capColor);
    refs.capRoughness = initial.capRoughness;
    refs.capMetalness = initial.capMetalness;
    refs.collarColor.copy(initial.collarColor);
    refs.labelColor.copy(initial.labelColor);
    refs.labelBorderColor.copy(initial.labelBorderColor);
    refs.hasCapCylinder = initial.hasCapCylinder;
    refs.hasCapStone = initial.hasCapStone;
    refs.hasCapGold = initial.hasCapGold;
    refs.isRoundedBox = initial.isRoundedBox;
    refs.isCylinder = initial.isCylinder;
    refs.labelScale = initial.labelScale;
  }, [activeScentId, refs]);

  // References and local variables for low CPU physics simulation
  const glassRoundedBoxRef = useRef<THREE.Mesh>(null);
  const glassCylinderGroupRef = useRef<THREE.Group>(null);
  const liquidBoxRef = useRef<THREE.Mesh>(null);
  const liquidCylinderRef = useRef<THREE.Mesh>(null);
  const meniscusRef = useRef<THREE.Mesh>(null);
  const capCylinderRef = useRef<THREE.Mesh>(null);
  const capStoneGroupRef = useRef<THREE.Group>(null);
  const capGoldGroupRef = useRef<THREE.Group>(null);
  const collarRef = useRef<THREE.Mesh>(null);
  const labelGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!bottleGroupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Trace scent state properties to interpolate
    const target = SCENT_STATES[activeScentId as keyof typeof SCENT_STATES] || SCENT_STATES.aurelis;

    // Smooth Lerps 0.082 rate
    const r = 0.082;
    refs.liquidColor.lerp(target.liquidColor, r);
    refs.liquidEmissive.lerp(target.liquidEmissive, r);
    refs.liquidEmissiveIntensity = THREE.MathUtils.lerp(refs.liquidEmissiveIntensity, target.liquidEmissiveIntensity, r);
    refs.glassColor.lerp(target.glassColor, r);
    refs.glassOpacity = THREE.MathUtils.lerp(refs.glassOpacity, target.glassOpacity, r);
    refs.glassRoughness = THREE.MathUtils.lerp(refs.glassRoughness, target.glassRoughness, r);
    refs.glassTransmission = THREE.MathUtils.lerp(refs.glassTransmission, target.glassTransmission, r);
    refs.glassMetalness = THREE.MathUtils.lerp(refs.glassMetalness, target.glassMetalness, r);
    refs.capColor.lerp(target.capColor, r);
    refs.capRoughness = THREE.MathUtils.lerp(refs.capRoughness, target.capRoughness, r);
    refs.capMetalness = THREE.MathUtils.lerp(refs.capMetalness, target.capMetalness, r);
    refs.collarColor.lerp(target.collarColor, r);
    refs.labelColor.lerp(target.labelColor, r);
    refs.labelBorderColor.lerp(target.labelBorderColor, r);
    refs.labelScale = THREE.MathUtils.lerp(refs.labelScale, target.labelScale, r);

    // Geometry weights lerp
    refs.hasCapCylinder = THREE.MathUtils.lerp(refs.hasCapCylinder, target.hasCapCylinder, r);
    refs.hasCapStone = THREE.MathUtils.lerp(refs.hasCapStone, target.hasCapStone, r);
    refs.hasCapGold = THREE.MathUtils.lerp(refs.hasCapGold, target.hasCapGold, r);
    refs.isRoundedBox = THREE.MathUtils.lerp(refs.isRoundedBox, target.isRoundedBox, r);
    refs.isCylinder = THREE.MathUtils.lerp(refs.isCylinder, target.isCylinder, r);

    // Apply handheld noble breathing drift
    const driftY = Math.sin(time * 1.35) * 0.025;
    const driftX = Math.cos(time * 0.7) * 0.01;
    bottleGroupRef.current.position.y = position[1] + driftY;
    bottleGroupRef.current.position.x = position[0] + driftX;

    // Apply custom micro-rotation (Continuous slow passive breathing)
    bottleGroupRef.current.rotation.y = rotation[1] + time * 0.09;
    bottleGroupRef.current.rotation.x = rotation[0] + Math.sin(time * 0.3) * 0.01;

    // Apply materials color & state morphing to dynamic elements
    if (collarRef.current) {
      const mat = collarRef.current.material as THREE.MeshStandardMaterial;
      mat.color.copy(refs.collarColor);
    }

    // Apply morphing parameters to the active visible geometries
    // 1. Capping Systems
    if (capCylinderRef.current) {
      capCylinderRef.current.visible = refs.hasCapCylinder > 0.01;
      capCylinderRef.current.scale.setScalar(refs.hasCapCylinder);
      const mat = capCylinderRef.current.material as THREE.MeshStandardMaterial;
      mat.color.copy(refs.capColor);
      mat.roughness = refs.capRoughness;
      mat.metalness = refs.capMetalness;
    }

    if (capStoneGroupRef.current) {
      capStoneGroupRef.current.visible = refs.hasCapStone > 0.01;
      capStoneGroupRef.current.scale.setScalar(refs.hasCapStone);
      capStoneGroupRef.current.children.forEach((child) => {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.color.copy(refs.capColor);
          mat.roughness = refs.capRoughness;
          mat.metalness = refs.capMetalness;
        }
      });
    }

    if (capGoldGroupRef.current) {
      capGoldGroupRef.current.visible = refs.hasCapGold > 0.01;
      capGoldGroupRef.current.scale.setScalar(refs.hasCapGold);
      capGoldGroupRef.current.children.forEach((child) => {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.color.copy(refs.capColor);
          mat.roughness = refs.capRoughness;
          mat.metalness = refs.capMetalness;
        }
      });
    }

    // 2. Main High-Performance Glass Envelopes
    if (glassRoundedBoxRef.current) {
      glassRoundedBoxRef.current.visible = refs.isRoundedBox > 0.01;
      glassRoundedBoxRef.current.scale.setScalar(refs.isRoundedBox);
      const mat = glassRoundedBoxRef.current.material as THREE.MeshStandardMaterial;
      if (performanceTier === 'low') {
        // High-end opaque polished porcelain/metallic lacquer finish (Z-overdraw zero!)
        const colorTarget = activeScentId === 'aurelis' ? new THREE.Color('#cbd5e1') : new THREE.Color('#16142c');
        mat.color.copy(colorTarget);
        mat.metalness = 0.95;
        mat.roughness = 0.04;
        mat.opacity = 1.0;
        mat.transparent = false;
      } else {
        const matPhys = mat as THREE.MeshPhysicalMaterial;
        matPhys.color.copy(refs.glassColor);
        matPhys.opacity = refs.glassOpacity;
        matPhys.roughness = refs.glassRoughness;
        matPhys.metalness = refs.glassMetalness;
        matPhys.transmission = refs.glassTransmission;
        matPhys.transparent = true;
      }
    }

    if (glassCylinderGroupRef.current) {
      glassCylinderGroupRef.current.visible = refs.isCylinder > 0.01;
      glassCylinderGroupRef.current.scale.setScalar(refs.isCylinder);
      glassCylinderGroupRef.current.children.forEach((child) => {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          if (performanceTier === 'low') {
            // High-end obsidian midnight emerald opaque finish
            mat.color.copy(new THREE.Color('#032c1e'));
            mat.metalness = 0.90;
            mat.roughness = 0.08;
            mat.opacity = 1.0;
            mat.transparent = false;
          } else {
            const matPhys = mat as THREE.MeshPhysicalMaterial;
            matPhys.color.copy(refs.glassColor);
            matPhys.opacity = refs.glassOpacity;
            matPhys.roughness = refs.glassRoughness;
            matPhys.metalness = refs.glassMetalness;
            matPhys.transmission = refs.glassTransmission;
            matPhys.transparent = true;
          }
        }
      });
    }

    // 3. Faked Liquid Physics (Only active in high/med tiers, bypassed in mobile)
    const wobbleSpeed = activeScentId === 'nocterra' ? 1.6 : activeScentId === 'solaire-noir' ? 1.2 : 1.4;
    const wobbleX = Math.sin(time * wobbleSpeed) * 0.015;
    const wobbleZ = Math.cos(time * wobbleSpeed) * 0.015;

    if (liquidBoxRef.current) {
      liquidBoxRef.current.visible = refs.isRoundedBox > 0.01 && performanceTier !== 'low';
      if (liquidBoxRef.current.visible) {
        liquidBoxRef.current.scale.setScalar(refs.isRoundedBox);
        liquidBoxRef.current.rotation.x = wobbleX;
        liquidBoxRef.current.rotation.z = wobbleZ;
        
        const mat = liquidBoxRef.current.material as THREE.MeshPhysicalMaterial;
        mat.color.copy(refs.liquidColor);
        mat.emissive.copy(refs.liquidEmissive);
        mat.emissiveIntensity = refs.liquidEmissiveIntensity;
      }
    }

    if (liquidCylinderRef.current) {
      liquidCylinderRef.current.visible = refs.isCylinder > 0.01 && performanceTier !== 'low';
      if (liquidCylinderRef.current.visible) {
        liquidCylinderRef.current.scale.setScalar(refs.isCylinder);
        liquidCylinderRef.current.rotation.x = wobbleX;
        liquidCylinderRef.current.rotation.z = wobbleZ;

        const mat = liquidCylinderRef.current.material as THREE.MeshPhysicalMaterial;
        mat.color.copy(refs.liquidColor);
        mat.emissive.copy(refs.liquidEmissive);
        mat.emissiveIntensity = refs.liquidEmissiveIntensity;
      }
    }

    // 4. Floating Front Designer Labels Position Morphing
    if (labelGroupRef.current) {
      labelGroupRef.current.scale.setScalar(refs.labelScale);
      
      const labelPlate = labelGroupRef.current.children[0] as THREE.Mesh;
      if (labelPlate) {
        const mat = labelPlate.material as THREE.MeshStandardMaterial;
        mat.color.copy(refs.labelColor);
      }

      if (labelGroupRef.current.children.length > 1) {
        const labelBorder = labelGroupRef.current.children[1] as THREE.Mesh;
        if (labelBorder) {
          const mat = labelBorder.material as THREE.MeshStandardMaterial;
          mat.color.copy(refs.labelBorderColor);
        }
      }
      
      const targetZ = 0.515;
      labelGroupRef.current.position.z = THREE.MathUtils.lerp(labelGroupRef.current.position.z, targetZ, 0.08);
    }
    
    // 5. Calm Meniscus Ring Overlay Sync (Hidden on mobile)
    if (meniscusRef.current) {
      const topOffset = refs.isCylinder > 0.5 ? 0.565 : 0.635;
      meniscusRef.current.position.y = topOffset;
      meniscusRef.current.rotation.x = wobbleX;
      meniscusRef.current.rotation.z = wobbleZ;
      const mat = meniscusRef.current.material as THREE.MeshPhysicalMaterial;
      mat.color.copy(refs.liquidColor);
    }
  });

  return (
    <group ref={bottleGroupRef} position={position} scale={[scale, scale, scale]} rotation={rotation}>
      
      {/* =========================================================================
          FEATURE 1: MACHINES COLLAR & NECK (Always Rendered & Shared - Low Segments)
          ========================================================================= */}
      <mesh ref={collarRef} position={[0, 1.34, 0]}>
        <cylinderGeometry args={[0.18, 0.2, 0.08, performanceTier === 'low' ? 8 : (performanceTier === 'medium' ? 10 : 12)]} />
        <meshStandardMaterial roughness={0.15} metalness={0.92} />
      </mesh>

      {/* =========================================================================
          FEATURE 2: EXCLUSIVELY REUSED LERPED CAP ENVELOPE SHAPES (No Unmounting)
          ========================================================================= */}
      {/* A. Silver/Platinum Brushed Cylinder Cap (Aurelis Accent) */}
      <mesh ref={capCylinderRef} position={[0, 1.48, 0]}>
        <cylinderGeometry args={[0.3, 0.32, 0.32, performanceTier === 'low' ? 8 : (performanceTier === 'medium' ? 10 : 12)]} />
        <meshStandardMaterial />
      </mesh>

      {/* B. Basalt Slate Charcoal Natural Dodecahedron Cap (Nocterra Accent) */}
      <group ref={capStoneGroupRef} position={[0, 1.54, 0]}>
        <mesh rotation={[0.15, 0.6, -0.05]}>
          <dodecahedronGeometry args={[0.26, 0]} />
          <meshStandardMaterial flatShading />
        </mesh>
        {performanceTier !== 'low' && (
          <mesh position={[0.1, 0.12, -0.05]} rotation={[0.9, -0.3, 0.4]}>
            <dodecahedronGeometry args={[0.1, 0]} />
            <meshStandardMaterial flatShading />
          </mesh>
        )}
      </group>

      {/* C. Sculptural Rough Gold Mineral Crown Cap (Solaire Noir Accent) */}
      <group ref={capGoldGroupRef} position={[0, 1.54, 0]}>
        <mesh rotation={[0.35, -0.22, 0.25]}>
          <dodecahedronGeometry args={[0.27, 0]} />
          <meshStandardMaterial flatShading />
        </mesh>
        {performanceTier !== 'low' && (
          <mesh position={[-0.1, 0.08, 0.1]} rotation={[0.1, 1.0, -0.45]}>
            <icosahedronGeometry args={[0.12, 0]} />
            <meshStandardMaterial flatShading />
          </mesh>
        )}
      </group>

      {/* =========================================================================
          FEATURE 3: STATIC FROSTED SPRAYER STRAW (Completely bypassed on Low-end mobile)
          ========================================================================= */}
      {performanceTier !== 'low' && (
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 1.35, 5]} />
          <meshPhysicalMaterial
            color="#94a3b8"
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.6}
          />
        </mesh>
      )}

      {/* =========================================================================
          FEATURE 4: PERFORMANCE HIGH-END GLASS EMBELLISHMENT SHELLS (No Transmission Thrashing)
          ========================================================================= */}
      {/* A. Square Architectural rounded crystal case (Aurelis / Solaire Noir) */}
      {performanceTier === 'low' ? (
        <mesh ref={glassRoundedBoxRef as any}>
          <boxGeometry args={[1.0, 1.76, 1.0]} />
          <meshStandardMaterial roughness={0.08} metalness={0.9} />
        </mesh>
      ) : (
        <RoundedBox
          ref={glassRoundedBoxRef as any}
          args={[1.0, 1.76, 1.0]}
          radius={0.11}
          smoothness={performanceTier === 'high' ? 3 : 1}
        >
          <meshPhysicalMaterial
            ior={1.5}
            thickness={1.4}
            clearcoat={performanceTier === 'high' ? 1.0 : 0.0}
            clearcoatRoughness={0.02}
            transparent
          />
        </RoundedBox>
      )}

      {/* B. Cylindrical Emerald Glass Canopy (Nocterra) - Simplified Hemisphere Groups */}
      {performanceTier === 'high' ? (
        <group ref={glassCylinderGroupRef}>
          <mesh>
            <cylinderGeometry args={[0.54, 0.54, 1.25, 14]} />
            <meshPhysicalMaterial
              ior={1.5}
              thickness={1.4}
              clearcoat={1.0}
              clearcoatRoughness={0.02}
              transparent
            />
          </mesh>
          <mesh position={[0, 0.625, 0]}>
            <sphereGeometry args={[0.54, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshPhysicalMaterial ior={1.5} thickness={1.2} clearcoat={1.0} transparent />
          </mesh>
          <mesh position={[0, -0.625, 0]}>
            <sphereGeometry args={[0.54, 14, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
            <meshPhysicalMaterial ior={1.5} thickness={1.4} clearcoat={1.0} transparent />
          </mesh>
        </group>
      ) : (
        <group ref={glassCylinderGroupRef}>
          <mesh>
            <cylinderGeometry args={[0.54, 0.54, 1.45, performanceTier === 'medium' ? 10 : 8]} />
            {performanceTier === 'medium' ? (
              <meshPhysicalMaterial ior={1.5} thickness={1.0} transparent />
            ) : (
              <meshStandardMaterial roughness={0.08} metalness={0.9} />
            )}
          </mesh>
        </group>
      )}

      {/* =========================================================================
          FEATURE 5: OPTIMIZED INTERCONNECTIVE LIQUID BODIES
          ========================================================================= */}
      {performanceTier !== 'low' && (
        <>
          {/* A. Rectangular Solid glass-inner fluid block (Aurelis / Solaire Noir) */}
          <mesh ref={liquidBoxRef} position={[0, -0.05, 0]}>
            <boxGeometry args={[0.82, 1.36, 0.82]} />
            <meshPhysicalMaterial
              ior={1.333}
              thickness={0.5}
              transparent
              opacity={0.9}
            />
          </mesh>

          {/* B. Cylindrical Glass-inner fluid core (Nocterra) */}
          <mesh ref={liquidCylinderRef} position={[0, -0.05, 0]}>
            <cylinderGeometry args={[0.455, 0.455, 1.15, performanceTier === 'medium' ? 10 : 14]} />
            <meshPhysicalMaterial
              ior={1.333}
              thickness={0.5}
              transparent
              opacity={0.9}
            />
          </mesh>

          {/* C. Dynamic Meniscus Ring catch surface tension */}
          <mesh ref={meniscusRef} position={[0, 0.63, 0]}>
            <torusGeometry args={[0.38, 0.009, 3, performanceTier === 'medium' ? 8 : 12]} />
            <meshPhysicalMaterial
              roughness={0.01}
              transparent
              opacity={0.9}
            />
          </mesh>
        </>
      )}

      {/* =========================================================================
          FEATURE 6: GEOMETRIC FRONT BRAND LABEL PLATES WITH ENGRAVED CRESTS
          ========================================================================= */}
      <group ref={labelGroupRef} position={[0, -0.15, 0.515]}>
        {/* Rich matte label plate background */}
        <mesh>
          <planeGeometry args={[0.52, 0.52]} />
          <meshStandardMaterial roughness={0.88} metalness={0.15} />
        </mesh>
        
        {/* Double luxury metallic border frame */}
        {performanceTier !== 'low' && (
          <mesh position={[0, 0, 0.005]}>
            <planeGeometry args={[0.49, 0.49]} />
            <meshStandardMaterial wireframe roughness={0.08} metalness={0.98} />
          </mesh>
        )}

        {/* Laser-engraved centered crest medallion emblem representing Dior/Chanel heritage seal */}
        {performanceTier !== 'low' && (
          <mesh position={[0, 0, 0.012]} rotation={[0, 0, Math.PI / 4]}>
            <planeGeometry args={[0.12, 0.12]} />
            <meshStandardMaterial 
              color={activeScentId === 'aurelis' ? '#cbd5e1' : activeScentId === 'nocterra' ? '#059669' : '#fbbf24'} 
              roughness={0.12} 
              metalness={0.98} 
            />
          </mesh>
        )}
      </group>

      {/* =========================================================================
          FEATURE 6.5: EXQUISITE HORIZONTAL METALLIC ENGRAVING SHOULDER STRIPS
          Our shoulder level structural cuffs perfectly matching physical bottle envelopes
          ========================================================================= */}
      {performanceTier !== 'low' && (
        <group>
          {/* Rounded shoulder cuff (Aurelis / Solaire Noir) */}
          {refs.isRoundedBox > 0.15 && (
            <mesh position={[0, 0.52, 0]} scale={refs.isRoundedBox}>
              <RoundedBox args={[1.018, 0.045, 1.018]} radius={0.11} smoothness={1}>
                <meshStandardMaterial 
                  color={activeScentId === 'aurelis' ? '#cbd5e1' : '#fbbf24'} 
                  roughness={0.10} 
                  metalness={0.98} 
                />
              </RoundedBox>
            </mesh>
          )}

          {/* Cylindrical shoulder ring (Nocterra) */}
          {refs.isCylinder > 0.15 && (
            <mesh position={[0, 0.52, 0]} scale={refs.isCylinder}>
              <cylinderGeometry args={[0.546, 0.546, 0.045, 16, 1, true]} />
              <meshStandardMaterial 
                color="#059669" 
                roughness={0.12} 
                metalness={0.96} 
                side={THREE.DoubleSide}
              />
            </mesh>
          )}
        </group>
      )}

      {/* =========================================================================
          FEATURE 7: LUXURY EXQUISITE FLOATING PEDESTAL PLINTH
          ========================================================================= */}
      <mesh position={[0, -0.99, 0]}>
        <cylinderGeometry args={[0.62, 0.65, 0.12, performanceTier === 'low' ? 12 : 32]} />
        <meshStandardMaterial
          color={
            activeScentId === 'aurelis' 
              ? '#cbd5e1' // solid silver plinth
              : activeScentId === 'nocterra' 
                ? '#121213' // mineral black basalt plinth
                : '#b45309' // solid warm copper/amber bronze plinth
          }
          roughness={activeScentId === 'solaire-noir' ? 0.08 : 0.85}
          metalness={activeScentId === 'solaire-noir' ? 0.98 : 0.12}
        />
      </mesh>

    </group>
  );
};
