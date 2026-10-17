'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { HeroSceneFallback } from './HeroSceneFallback';

export const HeroScene3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGLSupported, setWebGLSupported] = useState<boolean | null>(null);

  useEffect(() => {
    // 1. WebGL Support Test
    const checkWebGL = (): boolean => {
      try {
        const canvas = document.createElement('canvas');
        return !!(
          window.WebGLRenderingContext &&
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        );
      } catch {
        return false;
      }
    };

    if (!checkWebGL()) {
      setWebGLSupported(false);
      return;
    }

    setWebGLSupported(true);

    const container = containerRef.current;
    if (!container) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 2. Setup Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const width = container.clientWidth || 550;
    const height = container.clientHeight || 550;

    // Responsive FOV & distance calculation to ensure ZERO clipping on mobile & desktop
    const aspect = width / height;
    const camera = new THREE.PerspectiveCamera(38, aspect, 0.1, 50);

    // Compute distance adaptively: wider back on portrait/mobile to keep entire system in frame
    const computeCameraZ = (w: number, h: number) => {
      const asp = w / h;
      if (asp < 0.8) return 5.2; // Mobile narrow portrait
      if (asp < 1.0) return 4.7; // Tablet portrait
      return 4.2;                // Desktop / landscape
    };

    camera.position.set(0, 0.18, computeCameraZ(width, height));
    camera.lookAt(0, 0.08, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.35;
      container.appendChild(renderer.domElement);
    } catch {
      setWebGLSupported(false);
      return;
    }

    // 3. Lighting Setup (Natural Botanical with Tech Rim Accents)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // Key solar warm light
    const keyLight = new THREE.DirectionalLight(0xfff9e6, 2.6);
    keyLight.position.set(3.5, 5.5, 4.0);
    scene.add(keyLight);

    // Aquatic Teal rim light (brand accent)
    const tealRim = new THREE.PointLight(0x00897b, 3.0, 10);
    tealRim.position.set(-2.8, 1.5, -1.8);
    scene.add(tealRim);

    // Amber bounce fill
    const amberFill = new THREE.PointLight(0xfb8c00, 1.5, 7);
    amberFill.position.set(2.5, -1.2, 2.0);
    scene.add(amberFill);

    // 4. Agro-Ecosystem 3D Model Group (Centered at origin Y=0)
    // Geometry bounds: roots extend to y = -0.72, sprout leaves extend to y = +0.88.
    // Visual center is ~0.08, perfectly framed by camera lookAt(0, 0.08, 0).
    const ecosystemGroup = new THREE.Group();
    ecosystemGroup.position.set(0, 0.02, 0);
    scene.add(ecosystemGroup);

    // Disposable resource registry
    const disposables: { dispose: () => void }[] = [];
    const registerDisposable = <T extends { dispose: () => void }>(item: T): T => {
      disposables.push(item);
      return item;
    };

    // A. Hydroponic Net Pod / Collar Base (Precision chamfered collar)
    const collarGeo = registerDisposable(new THREE.CylinderGeometry(0.55, 0.44, 0.16, 36));
    const collarMat = registerDisposable(
      new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.65,
        roughness: 0.35,
        emissive: 0x0f172a,
        emissiveIntensity: 0.2,
      })
    );
    const collarMesh = new THREE.Mesh(collarGeo, collarMat);
    collarMesh.position.y = -0.16;
    ecosystemGroup.add(collarMesh);

    // Collar Rim Lip Ring (Aquatic Teal anodized metal)
    const collarRimGeo = registerDisposable(new THREE.TorusGeometry(0.56, 0.024, 16, 48));
    const collarRimMat = registerDisposable(
      new THREE.MeshStandardMaterial({
        color: 0x00897b,
        metalness: 0.85,
        roughness: 0.25,
        emissive: 0x004d40,
        emissiveIntensity: 0.4,
      })
    );
    const collarRimMesh = new THREE.Mesh(collarRimGeo, collarRimMat);
    collarRimMesh.rotation.x = Math.PI / 2;
    collarRimMesh.position.y = -0.08;
    ecosystemGroup.add(collarRimMesh);

    // B. Hydroponic Precision Irrigation Ring (Bounded radius: 0.90 units, zero canvas clipping)
    const ringGeo = registerDisposable(new THREE.TorusGeometry(0.9, 0.022, 16, 64));
    const ringMat = registerDisposable(
      new THREE.MeshStandardMaterial({
        color: 0x00897b,
        metalness: 0.85,
        roughness: 0.2,
        emissive: 0x004d40,
        emissiveIntensity: 0.35,
      })
    );
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = -0.16;
    ecosystemGroup.add(ringMesh);

    // C. Outer Nutrient Circulation Ring (Bounded radius: 1.15 units, gracefully inside viewport)
    const outerRingGeo = registerDisposable(new THREE.TorusGeometry(1.15, 0.012, 16, 64));
    const outerRingMat = registerDisposable(
      new THREE.MeshBasicMaterial({
        color: 0x4dd0e1,
        transparent: true,
        opacity: 0.45,
      })
    );
    const outerRingMesh = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRingMesh.rotation.x = Math.PI / 2.06;
    outerRingMesh.position.y = -0.2;
    ecosystemGroup.add(outerRingMesh);

    // D. Central Living Plant Stem (Smooth natural curve emerging upward)
    const stemCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -0.12, 0),
      new THREE.Vector3(0.015, 0.12, 0.01),
      new THREE.Vector3(-0.025, 0.38, 0.02),
      new THREE.Vector3(0.01, 0.65, -0.01),
      new THREE.Vector3(0, 0.86, 0),
    ]);
    const stemGeo = registerDisposable(new THREE.TubeGeometry(stemCurve, 36, 0.038, 12, false));
    const stemMat = registerDisposable(
      new THREE.MeshStandardMaterial({
        color: 0x2e7d32,
        roughness: 0.3,
        metalness: 0.1,
        emissive: 0x1b5e20,
        emissiveIntensity: 0.25,
      })
    );
    const stemMesh = new THREE.Mesh(stemGeo, stemMat);
    ecosystemGroup.add(stemMesh);

    // E. Realistic Organic Sculptural Leaves (Multi-tier botanical arrangement)
    const leafGroup = new THREE.Group();
    ecosystemGroup.add(leafGroup);

    const createLeaf = (
      scaleX: number,
      scaleY: number,
      rotZ: number,
      posY: number,
      rotY: number,
      rotX: number,
      colorHex: number
    ) => {
      const leafShape = new THREE.Shape();
      leafShape.moveTo(0, 0);
      leafShape.bezierCurveTo(0.24, 0.18, 0.38, 0.52, 0, 0.88);
      leafShape.bezierCurveTo(-0.38, 0.52, -0.24, 0.18, 0, 0);

      const leafGeo = registerDisposable(new THREE.ShapeGeometry(leafShape, 16));
      const leafMaterial = registerDisposable(
        new THREE.MeshStandardMaterial({
          color: colorHex,
          roughness: 0.25,
          metalness: 0.1,
          emissive: 0x004d40,
          emissiveIntensity: 0.18,
          side: THREE.DoubleSide,
        })
      );

      const mesh = new THREE.Mesh(leafGeo, leafMaterial);
      mesh.scale.set(scaleX, scaleY, 1);
      mesh.position.set(0, posY, 0);
      mesh.rotation.set(rotX, rotY, rotZ);

      // Delicate midrib vein along the leaf center
      const veinCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0.005),
        new THREE.Vector3(0, 0.42 * scaleY, 0.008),
        new THREE.Vector3(0, 0.84 * scaleY, 0.003),
      ]);
      const veinGeo = registerDisposable(new THREE.TubeGeometry(veinCurve, 12, 0.006 * scaleX, 6, false));
      const veinMat = registerDisposable(
        new THREE.MeshBasicMaterial({
          color: 0x81c784,
          transparent: true,
          opacity: 0.65,
        })
      );
      const veinMesh = new THREE.Mesh(veinGeo, veinMat);
      mesh.add(veinMesh);

      return mesh;
    };

    // Lower mature leaf pair (broad & gentle curve)
    const leafLowerLeft = createLeaf(0.58, 0.58, -0.65, 0.34, 0.35, 0.22, 0x00897b);
    const leafLowerRight = createLeaf(0.55, 0.55, 0.65, 0.42, -0.4, -0.18, 0x2e7d32);
    // Mid vibrant leaf pair (active photosynthesis)
    const leafMidLeft = createLeaf(0.5, 0.5, -0.5, 0.58, -0.2, 0.25, 0x43a047);
    const leafMidRight = createLeaf(0.48, 0.48, 0.52, 0.68, 0.28, -0.15, 0x26a69a);
    // Apical top bud (young growing shoot tip)
    const leafTopCenter = createLeaf(0.38, 0.38, -0.1, 0.85, 0.12, 0.1, 0x66bb6a);

    leafGroup.add(leafLowerLeft);
    leafGroup.add(leafLowerRight);
    leafGroup.add(leafMidLeft);
    leafGroup.add(leafMidRight);
    leafGroup.add(leafTopCenter);

    // F. Root Network (Branching suspended in nutrient chamber, bounded at y = -0.72)
    const rootMat = registerDisposable(
      new THREE.LineBasicMaterial({
        color: 0x81c784,
        transparent: true,
        opacity: 0.72,
      })
    );

    const createRootTendril = (points: THREE.Vector3[]) => {
      const rootCurve = new THREE.CatmullRomCurve3(points);
      const rootGeo = registerDisposable(new THREE.BufferGeometry().setFromPoints(rootCurve.getPoints(24)));
      return new THREE.Line(rootGeo, rootMat);
    };

    // Main taproots terminating safely above -0.72 to maintain perfect margins
    ecosystemGroup.add(
      createRootTendril([
        new THREE.Vector3(0, -0.16, 0),
        new THREE.Vector3(-0.14, -0.38, 0.06),
        new THREE.Vector3(-0.22, -0.68, -0.04),
      ])
    );
    ecosystemGroup.add(
      createRootTendril([
        new THREE.Vector3(0, -0.16, 0),
        new THREE.Vector3(0.12, -0.36, -0.05),
        new THREE.Vector3(0.24, -0.66, 0.08),
      ])
    );
    ecosystemGroup.add(
      createRootTendril([
        new THREE.Vector3(0, -0.16, 0),
        new THREE.Vector3(0.03, -0.42, 0.12),
        new THREE.Vector3(-0.06, -0.7, 0.15),
      ])
    );
    ecosystemGroup.add(
      createRootTendril([
        new THREE.Vector3(0, -0.16, 0),
        new THREE.Vector3(-0.05, -0.4, -0.1),
        new THREE.Vector3(0.08, -0.65, -0.14),
      ])
    );

    // Root Nodes (Nutrient uptake indicators in soft aquatic cyan)
    const nodeGeo = registerDisposable(new THREE.SphereGeometry(0.02, 8, 8));
    const nodeMat = registerDisposable(new THREE.MeshBasicMaterial({ color: 0x4dd0e1 }));
    const addNode = (x: number, y: number, z: number) => {
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(x, y, z);
      ecosystemGroup.add(nodeMesh);
    };
    addNode(-0.14, -0.38, 0.06);
    addNode(-0.22, -0.68, -0.04);
    addNode(0.12, -0.36, -0.05);
    addNode(0.24, -0.66, 0.08);
    addNode(0.03, -0.42, 0.12);
    addNode(-0.06, -0.7, 0.15);

    // G. Subtle Aeroponic Nutrient Mist (Restrained, elegant rising vapor, max 60 particles)
    const particleCount = 55;
    const particleGeo = registerDisposable(new THREE.BufferGeometry());
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      const radius = 0.12 + Math.random() * 0.9;
      const angle = Math.random() * Math.PI * 2;
      const y = -0.7 + Math.random() * 1.5;

      particlePositions[i * 3] = Math.cos(angle) * radius;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = Math.sin(angle) * radius;

      particleVelocities.push(0.003 + Math.random() * 0.004);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = registerDisposable(
      new THREE.PointsMaterial({
        color: 0x4dd0e1,
        size: 0.03,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending,
      })
    );

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    ecosystemGroup.add(particleSystem);

    // 5. Interaction & Animation Loop
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;
    let currentScrollProgress = 0;
    let targetScrollProgress = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetMouseX = Math.max(-0.25, Math.min(0.25, x * 0.45));
      targetMouseY = Math.max(-0.2, Math.min(0.2, y * 0.35));
    };

    const handleScroll = () => {
      // Clamped normalized progress (0 to 1 over first 500px of scroll)
      targetScrollProgress = Math.min(window.scrollY / 500, 1.0);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Smooth lerping for pointer and scroll
        currentMouseX += (targetMouseX - currentMouseX) * 0.06;
        currentMouseY += (targetMouseY - currentMouseY) * 0.06;
        currentScrollProgress += (targetScrollProgress - currentScrollProgress) * 0.08;

        // Continuous smooth Y rotation + gentle scroll rotation
        const baseRotY = elapsedTime * 0.3;
        const scrollRotY = currentScrollProgress * 0.5;
        ecosystemGroup.rotation.y = baseRotY + scrollRotY + currentMouseX;

        // UPWARD GROWTH DYNAMICS:
        // When scrolling down, the plant gracefully elongates upward (scaleY up to 1.12),
        // leaves unfurl outward, and the roots remain centered—never falling or sinking downward.
        const growthScaleY = 1.0 + currentScrollProgress * 0.1;
        stemMesh.scale.set(1.0, growthScaleY, 1.0);
        leafGroup.scale.set(1.0 + currentScrollProgress * 0.06, growthScaleY, 1.0 + currentScrollProgress * 0.06);

        // Gentle organic levitation sway (tightly bounded amplitude ±0.02)
        const floatSway = Math.sin(elapsedTime * 1.6) * 0.025;
        ecosystemGroup.position.y = 0.02 + floatSway;

        // Subtle mouse tilt
        ecosystemGroup.rotation.x = currentMouseY * 0.25;

        // Upward ascending nutrient mist uptake
        const positions = particleGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          positions[i * 3 + 1] += particleVelocities[i];
          if (positions[i * 3 + 1] > 0.88) {
            positions[i * 3 + 1] = -0.7;
          }
        }
        particleGeo.attributes.position.needsUpdate = true;

        // Counter-rotating outer nutrient wave ring
        outerRingMesh.rotation.z += 0.003;
      } else {
        // Serene static presentation for reduced motion
        ecosystemGroup.position.y = 0.02;
        ecosystemGroup.rotation.set(0, 0.4, 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    // 6. Responsive Resize Handling (Camera distance adapted for mobile)
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.position.z = computeCameraZ(newWidth, newHeight);
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // 7. Resource Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      disposables.forEach((item) => item.dispose());

      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (webGLSupported === false) {
    return <HeroSceneFallback />;
  }

  return (
    <div className="relative w-full h-full min-h-[460px] lg:min-h-[580px] flex items-center justify-center overflow-hidden rounded-3xl border border-slate-200/80 dark:border-white/10 bg-gradient-to-b from-slate-100/70 via-white/50 to-slate-200/50 dark:from-[#071329]/90 dark:via-[#0A1A38]/60 dark:to-[#040915] shadow-2xl backdrop-blur-md transition-colors duration-300">
      {/* 3D WebGL Canvas Mount - Strictly ZERO Technical Badges inside Canvas */}
      <div
        ref={containerRef}
        className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing"
        aria-label="Interactive 3D AgrooNext living plant and hydroponic root cultivation model"
        role="img"
      />
    </div>
  );
};
