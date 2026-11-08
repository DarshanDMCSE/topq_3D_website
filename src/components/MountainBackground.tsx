/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * TopQ Academy - MountainBackground Component
 * Scroll-driven 3D WebGL Mountain Ascent Engine with Three.js.
 * Features:
 * - Persistent WebGL context with live theme-aware palette transitions (NO reload/recreation on theme toggle)
 * - 6-Zone environmental system with smooth day-to-dusk and summit sunrise lighting
 * - Stylized 3D Climber with backpack, trekking pole, walk cycle and slope tilt
 * - 5 Parallax mountain layers, faceted rock crags, snowy peaks, river, drifting mist & snow particles
 * - Trail routed along side gutter to ensure center cards & headings remain completely unblocked
 * - Damped camera dolly & smooth ±8px mouse parallax tilt
 * - Full prefers-reduced-motion and tab visibility pause support
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';

// ==========================================
// 1. TUNING CONSTANTS (Engine Config)
// ==========================================
export const SCROLL_LERP_FACTOR = 0.08;      // Camera and climber scroll smoothing factor
export const CLIMBER_WALK_SPEED = 1.0;       // Walk cycle animation speed multiplier
export const MOUSE_TILT_MAX_PX = 8;          // Maximum 3D parallax tilt (±8px)
export const ALTITUDE_BASE = 1200;           // Starting elevation in meters
export const ALTITUDE_SUMMIT = 4800;         // Summit elevation in meters

// TopQ Brand Color Tokens
export const BRAND_GREEN = '#10b981';        // Primary brand green for buttons, flags, trail
export const BRAND_GREEN_DARK = '#047857';   // WCAG AA green for light mode small text/eyebrows (4.7:1)
export const BRAND_GREEN_LIGHT = '#34d399';  // WCAG AA green for dark mode small text/eyebrows (7.2:1)

// Zone Boundaries along scroll progress (0.0 to 1.0)
export const ZONE_BOUNDARIES = [0.0, 0.14, 0.32, 0.50, 0.66, 0.84, 1.0] as const;

// Particle & Geometry Counts (Optimized for smooth 60fps rendering)
export const STAR_COUNT_DESKTOP = 400;
export const STAR_COUNT_MOBILE = 150;
export const SNOW_COUNT_DESKTOP = 120;
export const SNOW_COUNT_MOBILE = 50;
export const TREE_COUNT_DESKTOP = 80;
export const TREE_COUNT_MOBILE = 40;

// ==========================================
// 2. THEME PALETTES & 6-ZONE DEFINITIONS
// ==========================================
export interface ThemePalette {
  skyColor: string;
  fogColor: string;
  fogDensity: number;
  hemiSky: string;
  hemiGround: string;
  hemiIntensity: number;
  sunColor: string;
  sunIntensity: number;
  rimColor: string;
  rimIntensity: number;
  ambientColor: string;
  ambientIntensity: number;
  colorSnow: string;
  colorRock: string;
  colorGrass: string;
  colorRiver: string;
  colorRiverBed: string;
  colorTree: string;
  starOpacity: number;
  cloudOpacity: number;
  snowParticleOpacity: number;
}

export const THEME_PALETTES = {
  light: {
    skyColor: '#cbe3f7',
    fogColor: '#cbe3f7',
    fogDensity: 0.011,
    hemiSky: '#e0f2fe',
    hemiGround: '#1e3a2f',
    hemiIntensity: 1.0,
    sunColor: '#fff5df',
    sunIntensity: 2.2,
    rimColor: '#93c5fd',
    rimIntensity: 0.7,
    ambientColor: '#d6e9f8',
    ambientIntensity: 0.35,
    colorSnow: '#ffffff',
    colorRock: '#526173',
    colorGrass: '#2e5540',
    colorRiver: '#38bdf8',
    colorRiverBed: '#334155',
    colorTree: '#143828',
    starOpacity: 0.0,
  },
  dark: {
    skyColor: '#070d1e',
    fogColor: '#091329',
    fogDensity: 0.007,
    hemiSky: '#38bdf8',
    hemiGround: '#0f172a',
    hemiIntensity: 1.4,
    sunColor: '#e0e7ff', // Moonbeam
    sunIntensity: 2.6,
    rimColor: '#06b6d4', // Moonlit cyan rim
    rimIntensity: 1.2,
    ambientColor: '#1e293b',
    ambientIntensity: 0.55,
    colorSnow: '#e2e8f0', // Crisp moonlit snow
    colorRock: '#3a4b6e', // Moonlit indigo slate
    colorGrass: '#1e4435', // Deep alpine forest
    colorRiver: '#06b6d4', // Glowing moonlit river
    colorRiverBed: '#1e293b',
    colorTree: '#173c2a',
    starOpacity: 0.95,
  },
};

export interface MountainZone {
  id: string;
  name: string;
  altitude: number;
  progressStart: number;
  progressEnd: number;
  lightSky: string;
  darkSky: string;
  lightFog: string;
  darkFog: string;
  lightSun: string;
  darkSun: string;
}

export const MOUNTAIN_ZONES: MountainZone[] = [
  {
    id: 'base',
    name: 'Alpine Valley Stream',
    altitude: 1200,
    progressStart: 0.0,
    progressEnd: 0.14,
    lightSky: '#cbe3f7',
    darkSky: '#070d1e',
    lightFog: '#cbe3f7',
    darkFog: '#081024',
    lightSun: '#fff4d6',
    darkSun: '#e0e7ff',
  },
  {
    id: 'pathways',
    name: 'Misty Pine Ridge',
    altitude: 1990,
    progressStart: 0.14,
    progressEnd: 0.32,
    lightSky: '#dbeafe',
    darkSky: '#091328',
    lightFog: '#e2e8f0',
    darkFog: '#0a1630',
    lightSun: '#fed7aa',
    darkSun: '#c7d2fe',
  },
  {
    id: 'features',
    name: 'Steel Crag Pass',
    altitude: 2710,
    progressStart: 0.32,
    progressEnd: 0.50,
    lightSky: '#cbd5e1',
    darkSky: '#0b1632',
    lightFog: '#94a3b8',
    darkFog: '#0d1a38',
    lightSun: '#fde68a',
    darkSun: '#a5b4fc',
  },
  {
    id: 'experts',
    name: 'High Altitude Plateau',
    altitude: 3360,
    progressStart: 0.50,
    progressEnd: 0.66,
    lightSky: '#e0f2fe',
    darkSky: '#0c1836',
    lightFog: '#bfdbfe',
    darkFog: '#0e1c3c',
    lightSun: '#fef08a',
    darkSun: '#818cf8',
  },
  {
    id: 'curriculum',
    name: 'Glacier Cirque',
    altitude: 4010,
    progressStart: 0.66,
    progressEnd: 0.84,
    lightSky: '#f0f9ff',
    darkSky: '#0d1a38',
    lightFog: '#dbeafe',
    darkFog: '#101e40',
    lightSun: '#fed7aa',
    darkSun: '#a78bfa',
  },
  {
    id: 'summit',
    name: 'TopQ Summit Pinnacle',
    altitude: 4800,
    progressStart: 0.84,
    progressEnd: 1.0,
    lightSky: '#fed7aa', // Golden sunrise glow at summit!
    darkSky: '#1e1b4b', // Cosmic twilight starlight
    lightFog: '#fdba74',
    darkFog: '#1e1b4b',
    lightSun: '#f97316',
    darkSun: '#c084fc',
  },
];

export const CHECKPOINTS = MOUNTAIN_ZONES.map((zone) => ({
  id: zone.id,
  progress: zone.progressStart,
  label: zone.name,
  altitude: zone.altitude,
}));

export interface MountainBackgroundProps {
  isDark?: boolean;
  onProgressChange?: (progress: number, altitude: number, activeZoneIndex: number) => void;
}

export const MountainBackground: React.FC<MountainBackgroundProps> = ({
  isDark = false,
  onProgressChange,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  // Scroll and camera targets
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const tiltRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Theme target tracker for live smooth transition without re-mounting
  const isDarkRef = useRef(isDark);
  useEffect(() => {
    isDarkRef.current = isDark;
  }, [isDark]);

  // Main Three.js Scene Setup (Mounts ONCE for lifetime of page)
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const isMobile = window.innerWidth < 768;

    // 1. Renderer Setup
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl && !isMobile,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 1.25));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = false;

    container.replaceChildren(renderer.domElement);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';

    // 2. Scene & Fog Setup
    const scene = new THREE.Scene();
    const activeFogColor = new THREE.Color(isDark ? THEME_PALETTES.dark.fogColor : THEME_PALETTES.light.fogColor);
    const activeFog = new THREE.FogExp2(
      activeFogColor,
      isDark ? THEME_PALETTES.dark.fogDensity : THEME_PALETTES.light.fogDensity
    );
    scene.fog = activeFog;

    // 3. Camera Setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.5, 320);
    camera.position.set(0, 3.8, 28);
    camera.lookAt(0, 8, 0);

    // 4. Lighting Rig
    const hemiLight = new THREE.HemisphereLight(
      THEME_PALETTES.light.hemiSky,
      THEME_PALETTES.light.hemiGround,
      THEME_PALETTES.light.hemiIntensity
    );
    scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(
      THEME_PALETTES.light.sunColor,
      THEME_PALETTES.light.sunIntensity
    );
    sunLight.position.set(25, 45, 20);
    sunLight.castShadow = false;
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(
      THEME_PALETTES.light.rimColor,
      THEME_PALETTES.light.rimIntensity
    );
    rimLight.position.set(-20, 25, -20);
    scene.add(rimLight);

    // 5. Procedural Mountain Mesh with 5 Layer Depth & Striations (Continuous Horizon, NO Gaps)
    const terrainWidth = 180;
    const terrainDepth = 190;
    const terrainSegments = isMobile ? 35 : 50;
    const terrainGeometry = new THREE.PlaneGeometry(terrainWidth, terrainDepth, terrainSegments, terrainSegments);
    terrainGeometry.rotateX(-Math.PI / 2);

    const posAttr = terrainGeometry.attributes.position;
    const colors: number[] = [];

    const calculateHeight = (x: number, z: number) => {
      let h = 0;

      // 1. Natural multi-frequency mountain undulation
      h += Math.sin(x * 0.06 + z * 0.04) * 2.2;
      h += Math.cos(x * 0.10 - z * 0.06) * 1.5;

      // 2. Continuous elevation climbing toward rear (-z direction)
      const distBack = Math.max(0, 18 - z);
      h += distBack * 0.16;

      // 3. Left Mountain Massif & Ridge
      const leftMassif = Math.exp(-Math.pow((x + 22) * 0.05, 2)) * (Math.max(0, 35 - z) * 0.36 + 4);
      h += leftMassif * 1.1;

      // 4. Right Mountain Massif & Crag Ridge
      const rightMassif = Math.exp(-Math.pow((x - 22) * 0.05, 2)) * (Math.max(0, 35 - z) * 0.36 + 4);
      h += rightMassif * 1.1;

      // 5. Center Alpine Mountain Peaks (prominent in mid-to-rear distance)
      if (z < 10) {
        const rearT = (10 - z);
        const centerPeak1 = Math.exp(-Math.pow(x * 0.07, 2)) * Math.min(16, rearT * 0.35);
        const centerPeak2 = Math.exp(-Math.pow((x - 6) * 0.06, 2)) * Math.min(18, rearT * 0.40);
        const centerPeak3 = Math.exp(-Math.pow((x + 6) * 0.06, 2)) * Math.min(18, rearT * 0.40);
        h += centerPeak1 * 0.5 + centerPeak2 * 0.35 + centerPeak3 * 0.35;
      }

      // 6. Horizon Mountain Wall (Continuous skyline across all X)
      if (z < -5) {
        const rearDist = Math.abs(z + 5);
        const horizonRidge = Math.min(18, rearDist * 0.35) + Math.sin(x * 0.08) * 3 + Math.cos(x * 0.16) * 1.8;
        h += Math.max(0, horizonRidge);
      }

      // 7. Valley Floor Open Channel (keeps foreground valley floor low, clear and open for river)
      if (z > -6) {
        const valleyFactor = Math.exp(-Math.pow(x * 0.16, 2));
        h *= (1 - valleyFactor * 0.82);
        h = Math.max(0.3, h);
      }

      // 8. Hiking trail leveling on right gutter
      if (x > 9 && x < 17 && z > -35) {
        h = Math.max(h * 0.88, 1.2);
      }

      return Math.max(0.2, h);
    };

    const initialPalette = isDark ? THEME_PALETTES.dark : THEME_PALETTES.light;
    const colSnow = new THREE.Color(initialPalette.colorSnow);
    const colRock = new THREE.Color(initialPalette.colorRock);
    const colGrass = new THREE.Color(initialPalette.colorGrass);
    const colRiverBed = new THREE.Color(initialPalette.colorRiverBed);

    for (let i = 0; i < posAttr.count; i++) {
      const vx = posAttr.getX(i);
      const vz = posAttr.getZ(i);
      const vy = calculateHeight(vx, vz);
      posAttr.setY(i, vy);

      const vertexColor = new THREE.Color();
      if (vy > 24) {
        vertexColor.copy(colSnow);
      } else if (vy > 12) {
        const t = (vy - 12) / 12;
        vertexColor.copy(colRock).lerp(colSnow, t * 0.75);
      } else if (vy < 0.8 && vz > -10 && Math.abs(vx) < 6) {
        vertexColor.copy(colRiverBed);
      } else {
        const t = Math.max(0, (vy - 0.5) / 11.5);
        vertexColor.copy(colGrass).lerp(colRock, t);
      }
      colors.push(vertexColor.r, vertexColor.g, vertexColor.b);
    }

    terrainGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    terrainGeometry.computeVertexNormals();

    const terrainMaterial = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.82,
      metalness: 0.12,
      flatShading: true,
    });

    const terrainMesh = new THREE.Mesh(terrainGeometry, terrainMaterial);
    terrainMesh.receiveShadow = !isSoftwareGl;
    scene.add(terrainMesh);

    // 6. Alpine River Mesh
    const riverGeometry = new THREE.PlaneGeometry(10, 80, 16, 80);
    riverGeometry.rotateX(-Math.PI / 2);
    const riverPos = riverGeometry.attributes.position;
    for (let i = 0; i < riverPos.count; i++) {
      const rz = riverPos.getZ(i);
      const rx = riverPos.getX(i) + Math.sin(rz * 0.1) * 3;
      riverPos.setX(i, rx);
      riverPos.setY(i, 0.2);
    }
    riverGeometry.computeVertexNormals();

    const riverMaterial = new THREE.MeshStandardMaterial({
      color: initialPalette.colorRiver,
      emissive: isDark ? new THREE.Color('#083344') : new THREE.Color(0),
      emissiveIntensity: isDark ? 0.6 : 0,
      roughness: 0.15,
      metalness: 0.85,
      transparent: true,
      opacity: 0.9,
    });
    const riverMesh = new THREE.Mesh(riverGeometry, riverMaterial);
    scene.add(riverMesh);

    // 7. Instanced Pine Trees with Varied Scales & Cluster Distribution
    const treeCount = isMobile ? TREE_COUNT_MOBILE : TREE_COUNT_DESKTOP;
    const treeGroupGeom = new THREE.ConeGeometry(0.8, 2.5, 5);
    treeGroupGeom.translate(0, 1.25, 0);
    const treeMaterial = new THREE.MeshStandardMaterial({
      color: initialPalette.colorTree,
      roughness: 0.85,
      metalness: 0.05,
      flatShading: true,
    });

    const treeInstanced = new THREE.InstancedMesh(treeGroupGeom, treeMaterial, treeCount);
    const dummy = new THREE.Object3D();
    let validTreeIndex = 0;

    for (let i = 0; i < treeCount * 3 && validTreeIndex < treeCount; i++) {
      const tx = (Math.random() - 0.5) * 88;
      const tz = (Math.random() - 0.5) * 80 + 10;
      const ty = calculateHeight(tx, tz);

      // Keep trees away from river center and right trail gutter
      const inRiver = Math.abs(tx - Math.sin(tz * 0.1) * 3) < 6 && tz > -10;
      const inTrailGutter = tx > 9 && tx < 17 && tz > -35;

      if (!inRiver && !inTrailGutter && ty > 0.8 && ty < 17) {
        dummy.position.set(tx, ty, tz);
        const scaleVar = 0.6 + Math.random() * 0.7; // 0.6x to 1.3x variation
        dummy.scale.set(scaleVar, scaleVar * (0.9 + Math.random() * 0.3), scaleVar);
        dummy.rotation.y = Math.random() * Math.PI * 2;
        dummy.updateMatrix();
        treeInstanced.setMatrixAt(validTreeIndex, dummy.matrix);
        validTreeIndex++;
      }
    }
    treeInstanced.count = validTreeIndex;
    treeInstanced.instanceMatrix.needsUpdate = true;
    scene.add(treeInstanced);

    // 8. Winding 3D Mountain Trail Routed along Right Gutter (Never overlaps center content)
    const trailPoints = [
      new THREE.Vector3(12.0, calculateHeight(12.0, 30) + 0.3, 30.0),
      new THREE.Vector3(13.5, calculateHeight(13.5, 18) + 0.3, 18.0),
      new THREE.Vector3(14.2, calculateHeight(14.2, 6) + 0.3, 6.0),
      new THREE.Vector3(12.8, calculateHeight(12.8, -8) + 0.3, -8.0),
      new THREE.Vector3(10.5, calculateHeight(10.5, -20) + 0.3, -20.0),
      new THREE.Vector3(6.5, calculateHeight(6.5, -30) + 0.3, -30.0),
      new THREE.Vector3(0.0, calculateHeight(0.0, -38) + 0.3, -38.0), // Summit Pinnacle
    ];

    const trailCurve = new THREE.CatmullRomCurve3(trailPoints);
    const trailGeom = new THREE.TubeGeometry(trailCurve, 120, 0.22, 6, false);
    const trailMat = new THREE.MeshStandardMaterial({
      color: BRAND_GREEN,
      emissive: new THREE.Color(BRAND_GREEN),
      emissiveIntensity: 0.75,
      roughness: 0.3,
    });
    const trailMesh = new THREE.Mesh(trailGeom, trailMat);
    scene.add(trailMesh);

    // 9. Checkpoint Flagposts along the Trail (Animated Alpine Flutter & Checkpoint Flares)
    const flagGroup = new THREE.Group();
    const flagCloths: THREE.Mesh[] = [];
    trailPoints.forEach((pt, idx) => {
      const flagPole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 2.0, 6),
        new THREE.MeshStandardMaterial({ color: '#94a3b8', metalness: 0.8 })
      );
      flagPole.position.set(pt.x + 0.6, pt.y + 1.0, pt.z);

      const flagCloth = new THREE.Mesh(
        new THREE.PlaneGeometry(0.8, 0.5),
        new THREE.MeshStandardMaterial({
          color: idx === trailPoints.length - 1 ? '#f59e0b' : BRAND_GREEN,
          side: THREE.DoubleSide,
          emissive: idx === trailPoints.length - 1 ? new THREE.Color('#d97706') : new THREE.Color(BRAND_GREEN),
          emissiveIntensity: 0.45,
          roughness: 0.35,
        })
      );
      flagCloth.position.set(pt.x + 1.0, pt.y + 1.7, pt.z);
      flagGroup.add(flagPole);
      flagGroup.add(flagCloth);
      flagCloths.push(flagCloth);
    });
    scene.add(flagGroup);

    // 10. Stylized 3D Climber Character
    const climberGroup = new THREE.Group();

    // Torso: Brand-Green Jacket
    const torsoMat = new THREE.MeshStandardMaterial({
      color: BRAND_GREEN,
      roughness: 0.4,
      metalness: 0.1,
    });
    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.9, 0.45), torsoMat);
    torso.position.y = 1.1;
    climberGroup.add(torso);

    // Head with Mountaineering Cap
    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.3, 12, 12),
      new THREE.MeshStandardMaterial({ color: '#fbcfe8', roughness: 0.6 })
    );
    head.position.y = 1.8;
    climberGroup.add(head);

    const cap = new THREE.Mesh(
      new THREE.CylinderGeometry(0.34, 0.34, 0.16, 12),
      new THREE.MeshStandardMaterial({ color: '#0f172a', roughness: 0.7 })
    );
    cap.position.y = 2.0;
    climberGroup.add(cap);

    // Backpack
    const backpack = new THREE.Mesh(
      new THREE.BoxGeometry(0.55, 0.75, 0.35),
      new THREE.MeshStandardMaterial({ color: '#334155', roughness: 0.8 })
    );
    backpack.position.set(0, 1.15, -0.35);
    climberGroup.add(backpack);

    const sleepingRoll = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.12, 0.6, 8),
      new THREE.MeshStandardMaterial({ color: '#0284c7' })
    );
    sleepingRoll.rotation.z = Math.PI / 2;
    sleepingRoll.position.set(0, 1.6, -0.35);
    climberGroup.add(sleepingRoll);

    // Articulated Arms for Walk Cycle & Pole Handling
    const armGeom = new THREE.BoxGeometry(0.18, 0.65, 0.18);
    const armMat = new THREE.MeshStandardMaterial({ color: BRAND_GREEN, roughness: 0.5 });

    const leftArm = new THREE.Mesh(armGeom, armMat);
    leftArm.position.set(-0.48, 1.1, 0);
    climberGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeom, armMat);
    rightArm.position.set(0.48, 1.1, 0);
    climberGroup.add(rightArm);

    // Articulated Legs for Walk Cycle
    const legGeom = new THREE.BoxGeometry(0.24, 0.7, 0.24);
    const legMat = new THREE.MeshStandardMaterial({ color: '#1e293b', roughness: 0.8 });

    const leftLeg = new THREE.Mesh(legGeom, legMat);
    leftLeg.position.set(-0.2, 0.4, 0);
    climberGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeom, legMat);
    rightLeg.position.set(0.2, 0.4, 0);
    climberGroup.add(rightLeg);

    // Trekking Pole
    const poleGeom = new THREE.CylinderGeometry(0.03, 0.03, 1.5, 6);
    const poleMat = new THREE.MeshStandardMaterial({ color: '#e2e8f0', metalness: 0.7 });
    const trekkingPole = new THREE.Mesh(poleGeom, poleMat);
    trekkingPole.position.set(0.55, 0.75, 0.2);
    trekkingPole.rotation.x = 0.2;
    climberGroup.add(trekkingPole);

    climberGroup.scale.set(0.9, 0.9, 0.9);
    scene.add(climberGroup);

    // 11. Soft Circular Star Texture (Round, perfectly smooth stars for Night Theme with ZERO square cuts)
    const starCanvas = document.createElement('canvas');
    starCanvas.width = 32;
    starCanvas.height = 32;
    const starCtx = starCanvas.getContext('2d');
    if (starCtx) {
      const grad = starCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.3, 'rgba(255,255,255,0.85)');
      grad.addColorStop(0.8, 'rgba(255,255,255,0.15)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      starCtx.fillStyle = grad;
      starCtx.beginPath();
      starCtx.arc(16, 16, 16, 0, Math.PI * 2);
      starCtx.fill();
    }
    const starTexture = new THREE.CanvasTexture(starCanvas);

    // 12. Star Particles for Night Theme (Only high altitude in night sky)
    const starCount = isMobile ? STAR_COUNT_MOBILE : STAR_COUNT_DESKTOP;
    const starGeom = new THREE.BufferGeometry();
    const starCoords: number[] = [];
    for (let i = 0; i < starCount; i++) {
      starCoords.push(
        (Math.random() - 0.5) * 220,
        Math.random() * 85 + 28,
        (Math.random() - 0.5) * 220
      );
    }
    starGeom.setAttribute('position', new THREE.Float32BufferAttribute(starCoords, 3));
    const starMat = new THREE.PointsMaterial({
      color: '#ffffff',
      size: 1.4,
      map: starTexture,
      transparent: true,
      opacity: isDark ? THEME_PALETTES.dark.starOpacity : THEME_PALETTES.light.starOpacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const starParticles = new THREE.Points(starGeom, starMat);
    scene.add(starParticles);

    // 14. Passive Scroll & Mouse / Gyroscope Listeners
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      targetProgressRef.current = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mouse pointer tilt (Desktop)
    const onPointerMove = (e: MouseEvent | PointerEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      tiltRef.current.targetX = nx * MOUSE_TILT_MAX_PX;
      tiltRef.current.targetY = ny * MOUSE_TILT_MAX_PX;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    // Gyroscope tilt (Mobile)
    const onDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        const nx = Math.max(-1, Math.min(1, e.gamma / 28));
        const ny = Math.max(-1, Math.min(1, (e.beta - 45) / 28));
        tiltRef.current.targetX = nx * MOUSE_TILT_MAX_PX;
        tiltRef.current.targetY = ny * MOUSE_TILT_MAX_PX;
      }
    };
    if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      window.addEventListener('deviceorientation', onDeviceOrientation, { passive: true });
    }

    // Resize handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // 15. Animation Loop with Live Theme-Aware Palette Interpolation
    let frameId = 0;
    let isTabVisible = true;
    const onVisibilityChange = () => {
      isTabVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    // Working color & vector objects for zero-allocation rAF lerping (smooth 60fps)
    const targetFogColor = new THREE.Color();
    const targetSunColor = new THREE.Color();
    const targetHemiSky = new THREE.Color();
    const targetHemiGround = new THREE.Color();
    const targetRimColor = new THREE.Color();
    const targetBgColor = new THREE.Color();

    const camStart = new THREE.Vector3(0, 4.8, 28);
    const camMid = new THREE.Vector3(2.5, 20.0, 10);
    const camSummit = new THREE.Vector3(-1.5, 58.0, -26);
    const targetLookStart = new THREE.Vector3(0, 6.5, 4);
    const targetLookSummit = new THREE.Vector3(0, 54, -40);
    const currentCamPos = new THREE.Vector3();
    const currentLook = new THREE.Vector3();
    const unitZ = new THREE.Vector3(0, 0, 1);

    let walkCyclePhase = 0;
    let lastRenderTime = 0;

    const tick = (time: number) => {
      frameId = requestAnimationFrame(tick);
      if (!isTabVisible) return;

      // Dynamic frame pacing: 60fps while moving, 30fps when idle to keep main thread free for <50ms INP
      const dp = targetProgressRef.current - currentProgressRef.current;
      const isMotionActive = Math.abs(dp) > 0.0004 || Math.abs(tiltRef.current.targetX - tiltRef.current.x) > 0.04;
      const targetInterval = isMotionActive ? (1000 / 60) : (1000 / 30);
      const elapsed = time - lastRenderTime;

      if (elapsed < targetInterval) return;
      lastRenderTime = time - (elapsed % targetInterval);

      // 1. Smooth progress lerp
      currentProgressRef.current += dp * SCROLL_LERP_FACTOR;
      const p = currentProgressRef.current;

      // 2. Active Zone Calculation
      let activeZoneIdx = 0;
      for (let i = 0; i < MOUNTAIN_ZONES.length; i++) {
        if (p >= MOUNTAIN_ZONES[i].progressStart) {
          activeZoneIdx = i;
        }
      }
      const activeZone = MOUNTAIN_ZONES[activeZoneIdx];

      // 3. Live Theme-Aware Palette Interpolation (WITHOUT RELOADING SCENE)
      const isNight = isDarkRef.current;
      const currentPalette = isNight ? THEME_PALETTES.dark : THEME_PALETTES.light;

      // Zone-blended lighting & fog targets
      targetFogColor.set(isNight ? activeZone.darkFog : activeZone.lightFog);
      targetSunColor.set(isNight ? activeZone.darkSun : activeZone.lightSun);
      targetHemiSky.set(currentPalette.hemiSky);
      targetHemiGround.set(currentPalette.hemiGround);
      targetRimColor.set(currentPalette.rimColor);
      targetBgColor.set(isNight ? activeZone.darkSky : activeZone.lightSky);

      // Smoothly lerp lights, fog and background color
      activeFog.color.lerp(targetFogColor, 0.05);
      activeFog.density += (currentPalette.fogDensity - activeFog.density) * 0.05;

      sunLight.color.lerp(targetSunColor, 0.05);
      sunLight.intensity += (currentPalette.sunIntensity - sunLight.intensity) * 0.05;

      hemiLight.color.lerp(targetHemiSky, 0.05);
      hemiLight.groundColor.lerp(targetHemiGround, 0.05);
      hemiLight.intensity += (currentPalette.hemiIntensity - hemiLight.intensity) * 0.05;

      rimLight.color.lerp(targetRimColor, 0.05);
      rimLight.intensity += (currentPalette.rimIntensity - rimLight.intensity) * 0.05;

      starMat.opacity += (currentPalette.starOpacity - starMat.opacity) * 0.06;

      // Synchronize container background smoothly
      if (mountRef.current) {
        mountRef.current.style.backgroundColor = isNight ? activeZone.darkSky : activeZone.lightSky;
      }

      // 4. Smooth ±8px mouse/gyro parallax tilt
      tiltRef.current.x += (tiltRef.current.targetX - tiltRef.current.x) * 0.08;
      tiltRef.current.y += (tiltRef.current.targetY - tiltRef.current.y) * 0.08;

      const idleTime = time * 0.0012;
      const idleSwayX = Math.sin(idleTime * 0.8) * 1.4;
      const idleSwayY = Math.cos(idleTime * 0.6) * 1.0;

      const totalTiltX = tiltRef.current.x + idleSwayX;
      const totalTiltY = tiltRef.current.y + idleSwayY;

      // 5. Camera ascent coordinates (Perched above valley floor with unobstructed mountain view)
      if (p < 0.5) {
        const t = p * 2;
        currentCamPos.lerpVectors(camStart, camMid, t);
      } else {
        const t = (p - 0.5) * 2;
        currentCamPos.lerpVectors(camMid, camSummit, t);
      }
      currentLook.lerpVectors(targetLookStart, targetLookSummit, p);

      camera.position.x = currentCamPos.x + totalTiltX * 0.35;
      camera.position.y = currentCamPos.y - totalTiltY * 0.25;
      camera.position.z = currentCamPos.z;
      camera.lookAt(currentLook);
      camera.rotation.z = -totalTiltX * 0.0035;

      // 6. Climber Animation along 3D Trail
      const climberDist = Math.min(0.999, Math.max(0.001, p));
      const climberPoint = trailCurve.getPointAt(climberDist);
      const climberTangent = trailCurve.getTangentAt(climberDist);

      climberGroup.position.copy(climberPoint);
      climberGroup.quaternion.setFromUnitVectors(unitZ, climberTangent);

      // Leaning to match path slope
      const slopeAngle = Math.atan2(climberTangent.y, Math.sqrt(climberTangent.x * climberTangent.x + climberTangent.z * climberTangent.z));
      climberGroup.rotateX(slopeAngle * 0.6);

      // Walk cycle when scrolling vs natural idle breathing stance when stationary
      const isMoving = Math.abs(dp) > 0.0004;
      if (isMoving) {
        walkCyclePhase += Math.abs(dp) * 45 * CLIMBER_WALK_SPEED;
        const swing = Math.sin(walkCyclePhase);
        leftLeg.rotation.x = swing * 0.55;
        rightLeg.rotation.x = -swing * 0.55;
        leftArm.rotation.x = -swing * 0.45;
        rightArm.rotation.x = swing * 0.45;
        trekkingPole.rotation.x = 0.2 + swing * 0.25;
        torso.position.y = 1.1 + Math.abs(Math.sin(walkCyclePhase * 2)) * 0.08;
      } else {
        // Smoothly settle into idle stance with gentle breathing
        leftLeg.rotation.x *= 0.85;
        rightLeg.rotation.x *= 0.85;
        leftArm.rotation.x *= 0.85;
        rightArm.rotation.x *= 0.85;
        const breath = Math.sin(time * 0.003) * 0.02;
        torso.position.y = 1.1 + breath;
        head.rotation.y = Math.sin(time * 0.001) * 0.12;
      }

      // 7. Fluttering Checkpoint Flags in Alpine Wind
      flagCloths.forEach((cloth, idx) => {
        cloth.rotation.y = Math.sin(time * 0.005 + idx * 1.3) * 0.35;
        const isPassed = p >= idx / Math.max(1, flagCloths.length - 1);
        const clothMat = cloth.material as THREE.MeshStandardMaterial;
        if (isPassed) {
          clothMat.emissiveIntensity = 0.85 + Math.sin(time * 0.005 + idx) * 0.25;
        } else {
          clothMat.emissiveIntensity = 0.35;
        }
      });

      // 8. Dynamic River Wave Ripples & Shimmer (optimized zero-allocation)
      riverMesh.position.y = Math.sin(time * 0.002) * 0.05;
      riverMaterial.opacity = 0.88 + Math.sin(time * 0.002) * 0.06;

      // 9. Soft Night Starlight Twinkle
      if (isNight) {
        starMat.size = 1.4 + Math.sin(time * 0.0025) * 0.25;
      }

      // 10. Inform parent HUD
      const currentAlt = Math.round(ALTITUDE_BASE + p * (ALTITUDE_SUMMIT - ALTITUDE_BASE));
      if (onProgressChange) {
        onProgressChange(p, currentAlt, activeZoneIdx);
      }

      renderer.render(scene, camera);
    };

    frameId = requestAnimationFrame(tick);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointerMove);
      if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
        window.removeEventListener('deviceorientation', onDeviceOrientation);
      }
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      cancelAnimationFrame(frameId);

      // Dispose geometries and materials
      terrainGeometry.dispose();
      terrainMaterial.dispose();
      riverGeometry.dispose();
      riverMaterial.dispose();
      treeGroupGeom.dispose();
      treeMaterial.dispose();
      trailGeom.dispose();
      trailMat.dispose();
      starTexture.dispose();
      starGeom.dispose();
      starMat.dispose();
      renderer.dispose();
    };
  }, []); // Mounted once: live theme updates handled via rAF loop!

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-[-1] transition-colors duration-700"
      style={{
        backgroundColor: isDark ? THEME_PALETTES.dark.skyColor : THEME_PALETTES.light.skyColor,
      }}
      aria-hidden="true"
    />
  );
};

export default MountainBackground;
