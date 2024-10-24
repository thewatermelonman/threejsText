import * as THREE from "three";
import RAPIER from 'https://cdn.skypack.dev/@dimforge/rapier3d-compat@0.11.2';
import * as SceneSetup from "./Scene.js";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls( camera, renderer.domElement );
camera.position.set(0, 5, 10);
camera.rotation.set(0, Math.PI / 2, 0);
controls.update();

let mousePos = new THREE.Vector2();
SceneSetup.init_scene(scene);
/*
await RAPIER.init();
const gravity = { x: 0.0, y: 0, z: 0.0 };
const world = new RAPIER.World(gravity);
*/

function animate() {
  requestAnimationFrame(animate);
  //world.step();
  controls.update();
  renderer.render(scene, camera);
}

animate();

function handleWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize, false);

function handleMouseMove (evt) {
  mousePos.x = (evt.clientX / window.innerWidth) * 2 - 1;
  mousePos.y = -(evt.clientY / window.innerHeight) * 2 + 1;
}
window.addEventListener('mousemove', handleMouseMove, false);

