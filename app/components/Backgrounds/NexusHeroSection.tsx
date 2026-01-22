"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import styles from "./nexusHeroSection.module.css";

/** Vertex shader */
const VERT = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

function isMobileUA() {
  if (typeof navigator === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

function isSafariUA() {
  if (typeof navigator === "undefined") return false;
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

export default function NexusHeroSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const [storyHtml, setStoryHtml] = useState(
    `our vessel drifts at coordinates (0.00, 0.00)<br>
     gravitational field extends 0.10 units into quantum foam<br>
     currently merging with 0 other entities<br>
     temporal flux: 0 cycles per second`
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ------------------------------------------------------------
    // Device flags
    // ------------------------------------------------------------
    const isMobile = isMobileUA();
    const isSafari = isSafariUA();
    const cores = (navigator as any).hardwareConcurrency ?? 8;

    // More aggressive low-power detection (helps laptops too)
    const isLowPowerDevice = isMobile || cores <= 8;

    // ------------------------------------------------------------
    // Performance controls (MAIN SAVERS)
    // ------------------------------------------------------------
    // Internal render downscale (keeps CSS full screen but renders fewer pixels)
    const baseDpr = window.devicePixelRatio || 1;
    const renderScale = isMobile ? 0.75 : isLowPowerDevice ? 0.7 : 0.85;
    let pixelRatio = Math.min(baseDpr, 2) * renderScale;

    // Cap FPS
    const targetFps = isMobile ? 18 : 30;
    const frameMs = 1000 / targetFps;

    // ------------------------------------------------------------
    // Fragment shader (optimized steps + lower AO/shadows)
    // ------------------------------------------------------------
    const fragmentShaderBody = `

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uActualResolution;
uniform float uPixelRatio;
uniform vec2 uMousePosition;
uniform vec3 uCursorSphere;
uniform float uCursorRadius;
uniform int uSphereCount;

uniform float uMergeDistance;
uniform float uSmoothness;

uniform float uAmbientIntensity;
uniform float uDiffuseIntensity;
uniform float uSpecularIntensity;
uniform float uSpecularPower;
uniform float uFresnelPower;

uniform vec3 uBackgroundColor;
uniform vec3 uSphereColor;
uniform vec3 uLightColor;
uniform vec3 uLightPosition;

uniform float uContrast;
uniform float uFogDensity;
uniform float uAnimationSpeed;
uniform float uMovementScale;

uniform bool uMouseProximityEffect;
uniform float uMinMovementScale;
uniform float uMaxMovementScale;

uniform float uCursorGlowIntensity;
uniform float uCursorGlowRadius;
uniform vec3 uCursorGlowColor;

uniform float uIsSafari;
uniform float uIsMobile;
uniform float uIsLowPower;

varying vec2 vUv;

const float PI = 3.14159265359;
const float EPSILON = 0.001;
const float MAX_DIST = 100.0;

float smin(float a, float b, float k) {
  float h = max(k - abs(a - b), 0.0) / k;
  return min(a, b) - h * h * k * 0.25;
}

float sdSphere(vec3 p, float r) {
  return length(p) - r;
}

// normalizedPos: 0..1 -> world
vec3 screenToWorld(vec2 normalizedPos) {
  vec2 uv = normalizedPos * 2.0 - 1.0;
  uv.x *= uResolution.x / uResolution.y;
  return vec3(uv * 2.0, 0.0);
}

float getDistanceToCenter(vec2 pos) {
  float dist = length(pos - vec2(0.5, 0.5)) * 2.0;
  return smoothstep(0.0, 1.0, dist);
}

float sceneSDF(vec3 pos) {
  float result = MAX_DIST;

  // fixed spheres
  vec3 topLeftPos = screenToWorld(vec2(0.08, 0.92));
  float topLeft = sdSphere(pos - topLeftPos, 0.8);

  vec3 smallTopLeftPos = screenToWorld(vec2(0.25, 0.72));
  float smallTopLeft = sdSphere(pos - smallTopLeftPos, 0.3);

  vec3 bottomRightPos = screenToWorld(vec2(0.92, 0.08));
  float bottomRight = sdSphere(pos - bottomRightPos, 0.9);

  vec3 smallBottomRightPos = screenToWorld(vec2(0.72, 0.25));
  float smallBottomRight = sdSphere(pos - smallBottomRightPos, 0.35);

  float t = uTime * uAnimationSpeed;

  float dynamicMovementScale = uMovementScale;
  if (uMouseProximityEffect) {
    float distToCenter = getDistanceToCenter(uMousePosition);
    float mixFactor = smoothstep(0.0, 1.0, distToCenter);
    dynamicMovementScale = mix(uMinMovementScale, uMaxMovementScale, mixFactor);
  }

  int maxIter = uIsMobile > 0.5 ? 3 : (uIsLowPower > 0.5 ? 5 : min(uSphereCount, 8));
  for (int i = 0; i < 10; i++) {
    if (i >= uSphereCount || i >= maxIter) break;

    float fi = float(i);
    float speed = 0.4 + fi * 0.12;
    float radius = 0.12 + mod(fi, 3.0) * 0.06;
    float orbitRadius = (0.3 + mod(fi, 3.0) * 0.15) * dynamicMovementScale;
    float phaseOffset = fi * PI * 0.35;

    float distToCursor = length(vec3(0.0) - uCursorSphere);
    float proximityScale = 1.0 + (1.0 - smoothstep(0.0, 1.0, distToCursor)) * 0.5;
    orbitRadius *= proximityScale;

    vec3 offset;
    if (i == 0) {
      offset = vec3(
        sin(t * speed) * orbitRadius * 0.7,
        sin(t * 0.5) * orbitRadius,
        cos(t * speed * 0.7) * orbitRadius * 0.5
      );
    } else if (i == 1) {
      offset = vec3(
        sin(t * speed + PI) * orbitRadius * 0.5,
        -sin(t * 0.5) * orbitRadius,
        cos(t * speed * 0.7 + PI) * orbitRadius * 0.5
      );
    } else {
      offset = vec3(
        sin(t * speed + phaseOffset) * orbitRadius * 0.8,
        cos(t * speed * 0.85 + phaseOffset * 1.3) * orbitRadius * 0.6,
        sin(t * speed * 0.5 + phaseOffset) * 0.3
      );
    }

    vec3 toCursor = uCursorSphere - offset;
    float cursorDist = length(toCursor);
    if (cursorDist < uMergeDistance && cursorDist > 0.0) {
      float attraction = (1.0 - cursorDist / uMergeDistance) * 0.25;
      offset += normalize(toCursor) * attraction;
    }

    float movingSphere = sdSphere(pos - offset, radius);

    float blend = 0.05;
    if (cursorDist < uMergeDistance) {
      float influence = 1.0 - (cursorDist / uMergeDistance);
      blend = mix(0.05, uSmoothness, influence * influence * influence);
    }

    result = smin(result, movingSphere, blend);
  }

  float cursorBall = sdSphere(pos - uCursorSphere, uCursorRadius);

  float topLeftGroup = smin(topLeft, smallTopLeft, 0.4);
  float bottomRightGroup = smin(bottomRight, smallBottomRight, 0.4);

  result = smin(result, topLeftGroup, 0.3);
  result = smin(result, bottomRightGroup, 0.3);
  result = smin(result, cursorBall, uSmoothness);

  return result;
}

vec3 calcNormal(vec3 p) {
  float eps = uIsLowPower > 0.5 ? 0.002 : 0.001;
  return normalize(vec3(
    sceneSDF(p + vec3(eps, 0, 0)) - sceneSDF(p - vec3(eps, 0, 0)),
    sceneSDF(p + vec3(0, eps, 0)) - sceneSDF(p - vec3(0, eps, 0)),
    sceneSDF(p + vec3(0, 0, eps)) - sceneSDF(p - vec3(0, 0, eps))
  ));
}

float ambientOcclusion(vec3 p, vec3 n) {
  // Reduced AO samples
  float occ = 0.0;
  float weight = 1.0;
  int samples = uIsMobile > 0.5 ? 2 : (uIsLowPower > 0.5 ? 3 : 4);
  for (int i = 0; i < 6; i++) {
    if (i >= samples) break;
    float dist = 0.01 + 0.02 * float(i * i);
    float h = sceneSDF(p + n * dist);
    occ += (dist - h) * weight;
    weight *= 0.85;
  }
  return clamp(1.0 - occ, 0.0, 1.0);
}

float softShadow(vec3 ro, vec3 rd, float mint, float maxt, float k) {
  // Reduced shadow iterations
  float result = 1.0;
  float t = mint;
  int loops = uIsMobile > 0.5 ? 3 : (uIsLowPower > 0.5 ? 5 : 8);

  for (int i = 0; i < 20; i++) {
    if (i >= loops) break;
    if (t >= maxt) break;
    float h = sceneSDF(ro + rd * t);
    if (h < EPSILON) return 0.0;
    result = min(result, k * h / t);
    t += max(h, 0.05);
  }
  return result;
}

float rayMarch(vec3 ro, vec3 rd) {
  float t = 0.0;

  // Reduced ray-march steps
  int maxSteps = uIsMobile > 0.5 ? 10 : (uIsLowPower > 0.5 ? 14 : 22);

  for (int i = 0; i < 48; i++) {
    if (i >= maxSteps) break;

    vec3 p = ro + rd * t;
    float d = sceneSDF(p);

    if (d < EPSILON) return t;
    if (t > 5.0) break;

    t += d * (uIsLowPower > 0.5 ? 1.25 : 0.95);
  }
  return -1.0;
}

vec3 lighting(vec3 p, vec3 rd, float t) {
  if (t < 0.0) return vec3(0.0);

  vec3 normal = calcNormal(p);
  vec3 viewDir = -rd;

  vec3 baseColor = uSphereColor;

  float ao = ambientOcclusion(p, normal);
  vec3 ambient = uLightColor * uAmbientIntensity * ao;

  vec3 lightDir = normalize(uLightPosition);
  float diff = max(dot(normal, lightDir), 0.0);

  float shadow = softShadow(p, lightDir, 0.01, 10.0, 20.0);
  vec3 diffuse = uLightColor * diff * uDiffuseIntensity * shadow;

  vec3 reflectDir = reflect(-lightDir, normal);
  float spec = pow(max(dot(viewDir, reflectDir), 0.0), uSpecularPower);
  float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), uFresnelPower);

  vec3 specular = uLightColor * spec * uSpecularIntensity * fresnel;
  vec3 fresnelRim = uLightColor * fresnel * 0.35;

  float distToCursor = length(p - uCursorSphere);
  if (distToCursor < uCursorRadius + 0.35) {
    float highlight = 1.0 - smoothstep(0.0, uCursorRadius + 0.35, distToCursor);
    specular += uLightColor * highlight * 0.15;
    float glow = exp(-distToCursor * 3.0) * 0.12;
    ambient += uLightColor * glow * 0.45;
  }

  vec3 color = (baseColor + ambient + diffuse + specular + fresnelRim) * ao;
  color = pow(color, vec3(uContrast * 0.9));
  color = color / (color + vec3(0.8));

  return color;
}

float calculateCursorGlow(vec3 worldPos) {
  float dist = length(worldPos.xy - uCursorSphere.xy);
  float glow = 1.0 - smoothstep(0.0, uCursorGlowRadius, dist);
  glow = pow(glow, 2.0);
  return glow * uCursorGlowIntensity;
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - uActualResolution.xy) / uActualResolution.xy;
  uv.x *= uResolution.x / uResolution.y;

  vec3 ro = vec3(uv * 2.0, -1.0);
  vec3 rd = vec3(0.0, 0.0, 1.0);

  float t = rayMarch(ro, rd);
  vec3 p = ro + rd * t;

  vec3 color = lighting(p, rd, t);

  float cursorGlow = calculateCursorGlow(ro);
  vec3 glowContribution = uCursorGlowColor * cursorGlow;

  if (t > 0.0) {
    float fogAmount = 1.0 - exp(-t * uFogDensity);
    color = mix(color, uBackgroundColor.rgb, fogAmount * 0.3);

    color += glowContribution * 0.25;

    gl_FragColor = vec4(color, 1.0);
  } else {
    if (cursorGlow > 0.01) {
      gl_FragColor = vec4(glowContribution, cursorGlow * 0.75);
    } else {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
    }
  }
}
`;

    // ------------------------------------------------------------
    // THREE setup
    // ------------------------------------------------------------
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile && !isLowPowerDevice,
      alpha: true,
      powerPreference: isMobile ? "low-power" : "high-performance",
      preserveDrawingBuffer: false,
      premultipliedAlpha: false,
    });

    // ask the GPU what it supports
    const best = renderer.capabilities.getMaxPrecision("highp");
    const precisionLine = best === "highp" ? "precision highp float;" : "precision mediump float;";

    renderer.setPixelRatio(pixelRatio);

    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const canvas = renderer.domElement;
    canvas.className = styles.threeCanvas;
    container.appendChild(canvas);

    const clock = new THREE.Clock();

    // ------------------------------------------------------------
    // Settings (keep your look, but avoid extreme heavy values)
    // ------------------------------------------------------------
    const settings = {
      sphereCount: isMobile ? 2 : isLowPowerDevice ? 4 : 6,
      cursorRadiusMin: 0.08,
      cursorRadiusMax: 0.15,
      mergeDistance: 1.5,
      smoothness: 0.75,

      ambientIntensity: 0.02,
      diffuseIntensity: 1.3,
      specularIntensity: 2.2,
      specularPower: 7,
      fresnelPower: 1.1,

      backgroundColor: new THREE.Color("#000000"),
      sphereColor: new THREE.Color("#FF6E29"),
      //sphereColor: new THREE.Color("#FFFFFF"),

      lightColor: new THREE.Color("#ffffff"),
      lightPosition: new THREE.Vector3(1, 1, 1),

      contrast: 1.5,
      fogDensity: 0.01,

      animationSpeed: isMobile ? 0.55 : 0.6,
      movementScale: isMobile ? 0.9 : 1.1,
      mouseSmoothness: 0.1,
      mouseProximityEffect: true,
      minMovementScale: 0.3,
      maxMovementScale: 1.0,

      cursorGlowIntensity: isMobile ? 0.25 : 0.45,
      cursorGlowRadius: 1.2,
      cursorGlowColor: new THREE.Color("#ffffff"),
    };

    const targetMouse = new THREE.Vector2(0.5, 0.5);
    const mouse = new THREE.Vector2(0.5, 0.5);
    const cursorSphere3D = new THREE.Vector3(0, 0, 0);
    let activeMerges = 0;

    function screenToWorldJS(nx: number, ny: number) {
      const uvx = nx * 2.0 - 1.0;
      const uvy = ny * 2.0 - 1.0;
      const aspect = window.innerWidth / window.innerHeight;
      return new THREE.Vector3(uvx * aspect * 2.0, uvy * 2.0, 0.0);
    }

    function getStoryText(
      x: string,
      y: string,
      radius: string,
      merges: number,
      fps: number
    ) {
      if (isMobile) {
        return `vessel: (${x}, ${y})<br>field: ${radius}u<br>merges: ${merges}<br>flux: ${fps}hz`;
      }
      return `our vessel drifts at coordinates (${x}, ${y})<br>
              gravitational field extends ${radius} units into quantum foam<br>
              currently merging with ${merges} other entities<br>
              temporal flux: ${fps} cycles per second`;
    }

    // ------------------------------------------------------------
    // Shader material
    // ------------------------------------------------------------
    const material = new THREE.ShaderMaterial({
      precision: best === "highp" ? "highp" : "mediump",
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(w, h) },
        uActualResolution: { value: new THREE.Vector2(w * pixelRatio, h * pixelRatio) },
        uPixelRatio: { value: pixelRatio },

        uMousePosition: { value: new THREE.Vector2(0.5, 0.5) },
        uCursorSphere: { value: new THREE.Vector3(0, 0, 0) },
        uCursorRadius: { value: settings.cursorRadiusMin },
        uSphereCount: { value: settings.sphereCount },

        uMergeDistance: { value: settings.mergeDistance },
        uSmoothness: { value: settings.smoothness },

        uAmbientIntensity: { value: settings.ambientIntensity },
        uDiffuseIntensity: { value: settings.diffuseIntensity },
        uSpecularIntensity: { value: settings.specularIntensity },
        uSpecularPower: { value: settings.specularPower },
        uFresnelPower: { value: settings.fresnelPower },

        uBackgroundColor: { value: settings.backgroundColor },
        uSphereColor: { value: settings.sphereColor },
        uLightColor: { value: settings.lightColor },
        uLightPosition: { value: settings.lightPosition },

        uContrast: { value: settings.contrast },
        uFogDensity: { value: settings.fogDensity },

        uAnimationSpeed: { value: settings.animationSpeed },
        uMovementScale: { value: settings.movementScale },

        uMouseProximityEffect: { value: settings.mouseProximityEffect },
        uMinMovementScale: { value: settings.minMovementScale },
        uMaxMovementScale: { value: settings.maxMovementScale },

        uCursorGlowIntensity: { value: settings.cursorGlowIntensity },
        uCursorGlowRadius: { value: settings.cursorGlowRadius },
        uCursorGlowColor: { value: settings.cursorGlowColor },

        uIsSafari: { value: isSafari ? 1.0 : 0.0 },
        uIsMobile: { value: isMobile ? 1.0 : 0.0 },
        uIsLowPower: { value: isLowPowerDevice ? 1.0 : 0.0 },
      },
      vertexShader: VERT,
      fragmentShader: `${precisionLine}\n${fragmentShaderBody}`,
      transparent: true,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // ------------------------------------------------------------
    // Pointer
    // ------------------------------------------------------------
    function onPointerMove(clientX: number, clientY: number) {
      targetMouse.x = clientX / window.innerWidth;
      targetMouse.y = 1.0 - clientY / window.innerHeight;

      const worldPos = screenToWorldJS(targetMouse.x, targetMouse.y);
      cursorSphere3D.copy(worldPos);

      const fixedPositions = [
        screenToWorldJS(0.08, 0.92),
        screenToWorldJS(0.25, 0.72),
        screenToWorldJS(0.92, 0.08),
        screenToWorldJS(0.72, 0.25),
      ];

      let closest = 1000;
      activeMerges = 0;
      fixedPositions.forEach((pos) => {
        const dist = cursorSphere3D.distanceTo(pos);
        closest = Math.min(closest, dist);
        if (dist < settings.mergeDistance) activeMerges++;
      });

      const proximityFactor = Math.max(0, 1.0 - closest / settings.mergeDistance);
      const smoothFactor = proximityFactor * proximityFactor * (3.0 - 2.0 * proximityFactor);

      const dynamicRadius =
        settings.cursorRadiusMin +
        (settings.cursorRadiusMax - settings.cursorRadiusMin) * smoothFactor;

      material.uniforms.uCursorSphere.value.copy(cursorSphere3D);
      material.uniforms.uCursorRadius.value = dynamicRadius;
    }

    const handleMouse = (e: MouseEvent) => onPointerMove(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length) {
        const t = e.touches[0];
        onPointerMove(t.clientX, t.clientY);
      }
    };

    window.addEventListener("mousemove", handleMouse, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // ------------------------------------------------------------
    // Resize (keep SAME pixelRatio logic)
    // ------------------------------------------------------------
    function handleResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      const nextBaseDpr = window.devicePixelRatio || 1;
      pixelRatio = Math.min(nextBaseDpr, 2) * renderScale;

      renderer.setSize(width, height);
      renderer.setPixelRatio(pixelRatio);

      material.uniforms.uResolution.value.set(width, height);
      material.uniforms.uActualResolution.value.set(width * pixelRatio, height * pixelRatio);
      material.uniforms.uPixelRatio.value = pixelRatio;
    }
    window.addEventListener("resize", handleResize, { passive: true });

    // init center pointer
    onPointerMove(window.innerWidth / 2, window.innerHeight / 2);

    // ------------------------------------------------------------
    // Loop: FPS cap + story update + pause on hidden tab
    // ------------------------------------------------------------
    let lastFrame = performance.now();
    let lastFpsTime = performance.now();
    let frameCount = 0;
    let fps = 0;

    const renderFrame = () => {
      rafRef.current = requestAnimationFrame(renderFrame);

      const now = performance.now();
      if (now - lastFrame < frameMs) return; // ✅ FPS cap
      lastFrame = now;

      // smooth mouse
      mouse.x += (targetMouse.x - mouse.x) * settings.mouseSmoothness;
      mouse.y += (targetMouse.y - mouse.y) * settings.mouseSmoothness;

      if (isMobile) {
        material.uniforms.uTime.value = 0; // frozen
      } else {
        material.uniforms.uTime.value = clock.getElapsedTime();
      }
      material.uniforms.uMousePosition.value.copy(mouse);

      // fps display update (1/sec)
      frameCount++;
      if (now - lastFpsTime >= 1000) {
        fps = Math.round((frameCount * 1000) / (now - lastFpsTime));
        frameCount = 0;
        lastFpsTime = now;

        const r = material.uniforms.uCursorRadius.value as number;
        setStoryHtml(
          getStoryText(
            cursorSphere3D.x.toFixed(2),
            cursorSphere3D.y.toFixed(2),
            r.toFixed(2),
            activeMerges,
            fps
          )
        );
      }

      renderer.render(scene, camera);
    };

    const onVisibility = () => {
      if (document.hidden) {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      } else {
        if (!rafRef.current) {
          lastFrame = performance.now();
          lastFpsTime = performance.now();
          rafRef.current = requestAnimationFrame(renderFrame);
        }
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    // start
    rafRef.current = requestAnimationFrame(renderFrame);

    // ------------------------------------------------------------
    // Cleanup
    // ------------------------------------------------------------
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);

      scene.remove(mesh);
      geometry.dispose();
      material.dispose();
      renderer.dispose();

      if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, []);

  return (
    <section className={styles.section}>
      {/* Three.js canvas container */}
      <div ref={containerRef} className={styles.container} />

      {/* Hero */}
      <div className={styles.hero}>
        <h1>
          Where vision becomes
          <br />
          code — and code
          <br />
          becomes reality
        </h1>

        <h2>Web Development</h2>
        <h2>BUILD HIGH QUALITY SCALABLE WEB APPLICATION</h2>
        <h2>
          Web development plays a vital role in your business website & web
          application success, web development is the core (back-end) coding of
          your application or your business website.
        </h2>

        {/* <div dangerouslySetInnerHTML={{ __html: storyHtml }} /> */}
      </div>
      <a className={styles.footerLink}>Web Development</a>
      {/* Footer links */}
      <div className={styles.footerLinks}>
        <a className={styles.footerLink}>Web Development</a>
        <a className={styles.footerLink}>Mobile Apps</a>
        <a className={styles.footerLink}>UI/UX</a>
      </div>

      {/* Coordinates */}
      <div className={styles.coordinates}>
        <p>CodeCore State • Active</p>
        <p>where consciousness flows</p>
      </div>
    </section>
  );
}