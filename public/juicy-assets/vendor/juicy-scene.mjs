/**
 * Juicy — 3D product showcase runtime.
 *
 * Loaded by /samples/juicy-real.html. Everything is served from the app's
 * own origin: the Three.js build and the loaders are vendored under
 * /juicy-assets/vendor/three, and the HDRI/GLB models live in
 * /juicy-assets. No request leaves the site, so the preview cannot hang on
 * a slow or blocked CDN.
 */

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";

const ASSETS = "/juicy-assets";
const ENVIRONMENT_MAP = ASSETS + "/hdri/forest_slope_1k.hdr";
const BOOT_TIMEOUT_MS = 15000;
const SIZES = ["355", "100", "125"];
/**
 * The four juices of the original template, with the same themes and copy.
 */
const JUICES = [
  {
    id: "lemonGinger",
    name: "Lemon Ginger",
    model: ASSETS + "/3d/can/lemon.glb",
    fruit: ASSETS + "/images/fruit/lemon.webp",
    theme: {
      mainBgColor: "#82AF38",
      blurColor: "#E5F985",
      textColor: "#ffffff",
      buttonBgColor: "#ffffff",
      buttonTextColor: "#82AF38",
    },
    description:
      "A zesty and refreshing blend with a spicy kick. Our Lemon Ginger juice combines the citrusy brightness of fresh lemons with the warming properties of ginger.",
  },
  {
    id: "blueberryAcai",
    name: "Blueberry Açai",
    model: ASSETS + "/3d/can/blueberry.glb",
    fruit: ASSETS + "/images/fruit/blueberry.webp",
    theme: {
      mainBgColor: "#385dd2",
      blurColor: "#B6B6F9",
      textColor: "#ffffff",
      buttonBgColor: "#ffffff",
      buttonTextColor: "#385dd2",
    },
    description:
      "A nutrient-packed superfood blend. Our Blueberry Açai juice brings together antioxidant-rich berries with the exotic taste of açai for a delicious health boost.",
  },
  {
    id: "mangoBurst",
    name: "Mango Burst",
    model: ASSETS + "/3d/can/mango.glb",
    fruit: ASSETS + "/images/fruit/mango.webp",
    theme: {
      mainBgColor: "#FFA500",
      blurColor: "#FFF3B6",
      textColor: "#222222",
      buttonBgColor: "#ffffff",
      buttonTextColor: "#FFA500",
    },
    description:
      "A tropical explosion of sweetness. Our Mango Burst juice captures the sun-ripened goodness of premium mangoes for a taste of paradise in every sip.",
  },
  {
    id: "raspberryRose",
    name: "Raspberry Rosé",
    model: ASSETS + "/3d/can/raspberry.glb",
    fruit: ASSETS + "/images/fruit/raspberry.webp",
    theme: {
      mainBgColor: "#FF6B81",
      blurColor: "#FFD6DE",
      textColor: "#ffffff",
      buttonBgColor: "#ffffff",
      buttonTextColor: "#FF6B81",
    },
    description:
      "An elegant and sophisticated blend. Our Raspberry Rosé juice combines the delicate sweetness of raspberries with subtle floral notes for a refined experience.",
  },
];

/* ------------------------------------------------------------------ *
 * Boot shell — progress, hard timeout, visible fallback.
 * The preview must never sit in a permanent "loading" state.
 * ------------------------------------------------------------------ */

const bootEl = document.getElementById("boot");
const bootBarEl = document.getElementById("boot-bar-fill");
const bootDetailEl = document.getElementById("boot-detail");
const fallbackEl = document.getElementById("fallback");
const fallbackDetailEl = document.getElementById("fallback-detail");
const fallbackTextEl = document.getElementById("fallback-text");
const retryBtn = document.getElementById("fallback-retry");

let bootProgress = 0;

function setProgress(pct, detail) {
  bootProgress = Math.max(bootProgress, pct);
  if (bootBarEl) bootBarEl.style.width = bootProgress + "%";
  if (detail && bootDetailEl) bootDetailEl.textContent = detail;
}

// No-op tracing hook kept for any call sites; safe to leave in place.
function dbg() { /* noop */ }

function hideBoot() {
  if (bootEl) bootEl.hidden = true;
}

function showFallback(message, detail) {
  hideBoot();
  if (fallbackTextEl && message) fallbackTextEl.textContent = message;
  if (fallbackDetailEl && detail) fallbackDetailEl.textContent = detail;
  if (fallbackEl) fallbackEl.classList.add("show");
}

if (retryBtn) {
  retryBtn.addEventListener("click", () => window.location.reload());
}

// Hard timeout: whatever happens, the user ends up with a usable page.
const bootTimer = setTimeout(() => {
  showFallback(
    "The 3D scene took too long to load. The page is still fully interactive.",
    "Timed out after " + BOOT_TIMEOUT_MS / 1000 + "s"
  );
}, BOOT_TIMEOUT_MS);

window.addEventListener("error", (event) => {
  console.error("[juicy]", event.message || event.error);
});

window.addEventListener("unhandledrejection", (event) => {
  console.error("[juicy] unhandled rejection", event.reason);
});

/* ------------------------------------------------------------------ *
 * Scene
 * ------------------------------------------------------------------ */

const canvas = document.getElementById("scene");

const state = { activeIndex: 0, size: "355", ready: false };

let renderer = null;
let scene = null;
let camera = null;
let frameId = 0;
let disposed = false;

const clock = new THREE.Clock();
const gltfLoader = new GLTFLoader();
const rgbeLoader = new RGBELoader();

const canPivot = new THREE.Group();
const canRoot = new THREE.Group();
const fruitGroup = new THREE.Group();
const iceGroup = new THREE.Group();
canPivot.add(canRoot);

const loadedModels = new Map();
const fruitTextures = new Map();

const iceTexture = new THREE.TextureLoader().load(ASSETS + "/images/ice/cube.webp");
const leafTextures = [
  new THREE.TextureLoader().load(ASSETS + "/images/leaf/1.webp"),
  new THREE.TextureLoader().load(ASSETS + "/images/leaf/2.webp"),
];

let currentCan = null;
let pmremGenerator = null;

function loadModel(url) {
  if (loadedModels.has(url)) {
    dbg("model cached: " + url);
    return loadedModels.get(url);
  }
  dbg("model fetch start: " + url);
  const promise = new Promise((resolve, reject) => {
    gltfLoader.load(
      url,
      (gltf) => {
        dbg("model onLoad: " + url);
        resolve(gltf.scene);
      },
      (event) => {
        if (event && event.lengthComputable && event.total > 0) {
          const ratio = Math.min(1, event.loaded / event.total);
          setProgress(25 + ratio * 40, "Loading can model…");
        }
      },
      (error) => {
        dbg("model onError: " + url + " " + String(error));
        reject(error instanceof Error ? error : new Error(String(error)));
      }
    );
  });
  loadedModels.set(url, promise);
  return promise;
}

function loadEnvironment() {
  return new Promise((resolve, reject) => {
    rgbeLoader.load(
      ENVIRONMENT_MAP,
      (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        resolve(texture);
      },
      undefined,
      (error) => reject(error instanceof Error ? error : new Error(String(error)))
    );
  });
}

function createRenderer() {
  const r = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  r.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  r.setSize(window.innerWidth, window.innerHeight, false);
  r.toneMapping = THREE.ACESFilmicToneMapping;
  r.toneMappingExposure = 1.05;
  r.outputColorSpace = THREE.SRGBColorSpace;
  r.shadowMap.enabled = true;
  r.shadowMap.type = THREE.PCFSoftShadowMap;
  return r;
}

function createScene() {
  const s = new THREE.Scene();
  s.fog = new THREE.Fog(0x0a0a0a, 6, 16);

  const cam = new THREE.PerspectiveCamera(32, window.innerWidth / window.innerHeight, 0.01, 100);
  cam.position.set(0, 0, 1.35);
  s.add(cam);

  s.add(new THREE.HemisphereLight(0xffffff, 0x223020, 1.1));

  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(4, 6, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.near = 0.5;
  key.shadow.camera.far = 20;
  s.add(key);

  const rim = new THREE.DirectionalLight(0xffffff, 1.1);
  rim.position.set(-4, -2, -3);
  s.add(rim);

  const fill = new THREE.PointLight(0xffffff, 0.6, 12);
  fill.position.set(0, 0, 3);
  s.add(fill);

  s.add(canPivot);
  s.add(fruitGroup);
  s.add(iceGroup);
  return s;
}

/* ------------------------------------------------------------------ *
 * Can model — a metallic clone of the loaded GLTF scene.
 * ------------------------------------------------------------------ */

function buildCan(source) {
  const clone = source.clone(true);
  clone.traverse((obj) => {
    if (!obj.isMesh) return;
    obj.castShadow = true;
    obj.receiveShadow = true;
    const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
    mats.forEach((mat) => {
      if (mat && mat.isMeshStandardMaterial) {
        mat.metalness = 0.95;
        mat.roughness = 0.05;
        mat.envMapIntensity = 1.2;
      }
    });
  });
  return clone;
}

async function showCan(index) {
  const source = await loadModel(JUICES[index].model);
  if (disposed) return;

  if (currentCan) {
    canRoot.remove(currentCan);
    currentCan = null;
  }
  const can = buildCan(source);
  canRoot.add(can);
  currentCan = can;
  setProgress(70, "Can ready");
}

/* ------------------------------------------------------------------ *
 * Floating fruits
 * ------------------------------------------------------------------ */

const fruitSprites = [];

function getFruitTexture(url) {
  if (!fruitTextures.has(url)) {
    const tex = new THREE.TextureLoader().load(url);
    tex.colorSpace = THREE.SRGBColorSpace;
    fruitTextures.set(url, tex);
  }
  return fruitTextures.get(url);
}

function buildFruits(juice) {
  fruitGroup.clear();
  fruitSprites.length = 0;

  const texture = getFruitTexture(juice.fruit);
  const slots = [
    { x: -1.05, y: 0.62, s: 0.42 },
    { x: -0.92, y: -0.55, s: 0.56 },
    { x: 1.02, y: 0.6, s: 0.54 },
    { x: 0.95, y: -0.5, s: 0.4 },
  ];

  slots.forEach((slot, i) => {
    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
    });
    const sprite = new THREE.Sprite(material);
    sprite.position.set(slot.x, slot.y, 0.2);
    sprite.scale.setScalar(slot.s);
    sprite.userData = {
      baseX: slot.x,
      baseY: slot.y,
      phase: i * 1.7,
      speed: 0.35 + i * 0.08,
    };
    fruitGroup.add(sprite);
    fruitSprites.push(sprite);
  });
}

/* ------------------------------------------------------------------ *
 * Ice cubes & leaves
 * ------------------------------------------------------------------ */

const iceItems = [];

function buildIce() {
  iceGroup.clear();
  iceItems.length = 0;

  const columns = [
    { x: -1.55, count: 5 },
    { x: 1.55, count: 5 },
  ];

  columns.forEach((column, colIndex) => {
    for (let i = 0; i < column.count; i++) {
      const isLeaf = i % 3 === 2;
      const texture = isLeaf ? leafTextures[(i + colIndex) % 2] : iceTexture;
      const size = isLeaf ? 0.24 + Math.random() * 0.1 : 0.13 + Math.random() * 0.09;

      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: isLeaf ? 0.85 : 0.62,
        depthWrite: false,
        rotation: Math.random() * Math.PI * 2,
      });
      const sprite = new THREE.Sprite(material);
      const y = 0.85 - i * 0.42;
      sprite.position.set(column.x + (Math.random() - 0.5) * 0.22, y, 0.1);
      sprite.scale.setScalar(size);
      sprite.userData = {
        baseY: y,
        phase: Math.random() * Math.PI * 2,
        speed: 0.28 + Math.random() * 0.3,
        drift: (Math.random() - 0.5) * 0.3,
      };
      iceGroup.add(sprite);
      iceItems.push(sprite);
    }
  });
}

/* ------------------------------------------------------------------ *
 * Overlay UI
 * ------------------------------------------------------------------ */

const ui = {
  name: document.getElementById("product-name"),
  desc: document.getElementById("product-desc"),
  info: document.getElementById("product-info"),
  seeMore: document.getElementById("see-more"),
  sizes: document.getElementById("sizes"),
  dots: document.getElementById("dots"),
  prev: document.getElementById("prev"),
  next: document.getElementById("next"),
  orb: document.getElementById("bg-orb"),
  water: document.getElementById("bg-water"),
};

JUICES.forEach((juice, index) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.setAttribute("aria-label", juice.name);
  dot.addEventListener("click", () => selectJuice(index));
  ui.dots.appendChild(dot);
});

SIZES.forEach((size) => {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = size + " ml";
  button.setAttribute("aria-pressed", String(size === state.size));
  button.addEventListener("click", () => {
    state.size = size;
    Array.from(ui.sizes.children).forEach((child, i) => {
      child.setAttribute("aria-pressed", String(SIZES[i] === size));
    });
  });
  ui.sizes.appendChild(button);
});

let transitioning = false;

function applyTheme(juice) {
  const theme = juice.theme;
  document.documentElement.style.setProperty("--accent", theme.mainBgColor);
  ui.water.style.backgroundColor = theme.mainBgColor;
  ui.orb.style.backgroundColor = theme.blurColor;
  ui.name.style.color = theme.textColor;
  ui.desc.style.color = theme.textColor;
  ui.desc.style.opacity = theme.textColor === "#222222" ? "0.78" : "0.88";
  ui.seeMore.style.backgroundColor = theme.buttonBgColor;
  ui.seeMore.style.color = theme.buttonTextColor;
  if (scene) scene.fog.color.set(theme.mainBgColor);
}

function applyText(juice) {
  ui.name.textContent = juice.name;
  ui.desc.textContent = juice.description;
  ui.info.classList.remove("reveal");
  // Force a reflow so the reveal transition replays on every change.
  void ui.info.offsetWidth;
  requestAnimationFrame(() => ui.info.classList.add("reveal"));
  Array.from(ui.dots.children).forEach((dot, i) => {
    dot.setAttribute("aria-current", String(i === state.activeIndex));
  });
}

async function selectJuice(index) {
  if (transitioning || index === state.activeIndex) return;
  transitioning = true;
  state.activeIndex = index;

  const juice = JUICES[index];
  applyTheme(juice);
  applyText(juice);
  buildFruits(juice);

  try {
    await showCan(index);
  } catch (error) {
    console.error("[juicy] model load failed", error);
    showFallback(
      "This flavor's 3D model could not be loaded.",
      String(error && error.message ? error.message : error)
    );
  } finally {
    transitioning = false;
  }
}

ui.prev.addEventListener("click", () => {
  selectJuice((state.activeIndex + JUICES.length - 1) % JUICES.length);
});
ui.next.addEventListener("click", () => {
  selectJuice((state.activeIndex + 1) % JUICES.length);
});
ui.seeMore.addEventListener("click", () => {
  ui.desc.style.maxHeight = ui.desc.style.maxHeight === "none" ? "" : "none";
});

/* ------------------------------------------------------------------ *
 * Render loop
 * ------------------------------------------------------------------ */

/** Triangle wave in [0, 1] that reverses smoothly — as the template's. */
function smoothOscillation(time, frequency) {
  const t = (time * frequency) % 2;
  return t <= 1 ? t : 2 - t;
}

function resize() {
  if (!renderer || !camera) return;
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.setSize(w, h, false);
}

function animate() {
  if (disposed) return;
  frameId = requestAnimationFrame(animate);

  const delta = Math.min(clock.getDelta(), 0.1);
  const t = clock.elapsedTime;

  // The can sways around its base rotation, as the template's oscillation.
  canPivot.rotation.set(
    (smoothOscillation(t, 0.3) * 2 - 1) * 0.05,
    (smoothOscillation(t, 0.2) * 2 - 1) * 0.03,
    (smoothOscillation(t, 0.25) * 2 - 1) * 0.05
  );
  canPivot.position.y = 0.03 + Math.sin(t * 0.9) * 0.012;

  // Fruits drift around their anchor.
  fruitSprites.forEach((sprite) => {
    const d = sprite.userData;
    sprite.position.x = d.baseX + Math.sin(t * d.speed + d.phase) * 0.06;
    sprite.position.y = d.baseY + Math.cos(t * d.speed * 0.8 + d.phase) * 0.08;
    sprite.material.rotation = Math.sin(t * 0.4 + d.phase) * 0.2;
  });

  // Ice cubes float upward and wrap around.
  iceItems.forEach((sprite) => {
    const d = sprite.userData;
    sprite.position.y = d.baseY + ((t * d.speed * 0.25 + d.phase) % 1) * 0.6;
    sprite.position.x += d.drift * delta * 0.05;
    sprite.material.rotation += delta * 0.12;
  });

  if (renderer && scene && camera) renderer.render(scene, camera);
}

window.addEventListener("resize", resize);

/* ------------------------------------------------------------------ *
 * Boot
 * ------------------------------------------------------------------ */

async function boot() {
  dbg("boot start");
  setProgress(5, "Preparing 3D scene…");

  try {
    renderer = createRenderer();
    dbg("renderer created");
  } catch (error) {
    showFallback(
      "WebGL is not available in this browser, so the 3D preview cannot start.",
      String(error && error.message ? error.message : error)
    );
    return;
  }

  scene = createScene();
  camera = scene.children.find((child) => child.isPerspectiveCamera);
  resize();
  dbg("scene created");

  buildIce();
  buildFruits(JUICES[0]);
  applyTheme(JUICES[0]);
  applyText(JUICES[0]);
  dbg("ice/fruits/theme built");

  // The environment map is optional: the scene still renders without it.
  setProgress(18, "Loading environment…");
  dbg("loading environment");
  try {
    const texture = await loadEnvironment();
    dbg("environment loaded");
    pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    scene.environment = pmremGenerator.fromEquirectangular(texture).texture;
    texture.dispose();
    setProgress(88, "Lighting the scene…");
    dbg("environment applied");
  } catch (error) {
    dbg("environment failed: " + String(error));
    console.warn("[juicy] environment map unavailable", error);
    setProgress(88, "Using default lighting…");
  }

  // The first can is the only one required to reveal the page.
  try {
    dbg("loading can 0");
    await showCan(0);
    dbg("can 0 loaded");
  } catch (error) {
    dbg("can 0 failed: " + String(error));
    showFallback(
      "The 3D can model could not be loaded.",
      String(error && error.message ? error.message : error)
    );
    return;
  }

  // Preload the rest in the background so turning the wheel never waits.
  JUICES.slice(1).forEach((juice) => {
    loadModel(juice.model).catch((error) =>
      console.warn("[juicy] preload failed", juice.id, error)
    );
  });

  setProgress(100, "Ready");
  state.ready = true;

  clearTimeout(bootTimer);
  hideBoot();

  animate();
}

boot();
