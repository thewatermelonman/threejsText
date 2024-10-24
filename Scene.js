import * as THREE from "three";
import { TTFLoader } from 'three/addons/loaders/TTFLoader.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';


// Background
const background_geo = new THREE.PlaneGeometry(500, 500);
const background_mat = new THREE.MeshStandardMaterial({color: 0x999999});//{color: 0x14130f});
const background_mesh = new THREE.Mesh(background_geo, background_mat);

// Text
let text_mesh;

//Light
const ambient_light = new THREE.AmbientLight(0xffffff, 2);
RectAreaLightUniformsLib.init();
const distance = 15;
const rectLight1 = new THREE.RectAreaLight( 0xff0000, 5, 4, 10 );
const rectLight2 = new THREE.RectAreaLight(0x00ff00, 5, 4, 10);
const rectLight3 = new THREE.RectAreaLight(0x0000ff, 5, 4, 10);
rectLight1.position.set(- 5, 5, distance);
rectLight2.position.set(0, 5, distance);
rectLight3.position.set(5, 5, distance);

//const text_geo = new THREE.BoxGeometry(2, 2);



export function init_scene(scene) {
    scene.add(background_mesh);
    scene.add(text_mesh);
    scene.add(ambient_light);

	
	scene.add(rectLight2);
	scene.add(rectLight3);
	scene.add(rectLight1);
	scene.add(new RectAreaLightHelper(rectLight1));
	scene.add(new RectAreaLightHelper(rectLight2));
	scene.add(new RectAreaLightHelper(rectLight3));

    background_mesh.position.set(0, -1, 0);
    background_mesh.rotation.set(0, 0, 0)
	create_text("TEst", 1, 1, 1, 0.4, scene);
	create_text("TEst", 5, 5, 1, 0.2, scene);

    //scene.add( new THREE.GridHelper( 5000, 50 ) );
}

function update_scene() {

}

function create_text(text, x, y, size, height, scene) {
	const loader = new TTFLoader();
	const fontLoader = new FontLoader();
	loader.load('./Poppins-Regular.ttf', function (json) {
		const font = fontLoader.parse(json);
		const text_geo = new TextGeometry(text, {
			font: font,
			size: size,
			depth: height,
		});
		const text_mat = new THREE.MeshStandardMaterial(
			{
				transparent: true, 
				color: 0xffffff, 
				wireframe: false
			}
		);
		text_mesh = new THREE.Mesh(text_geo, text_mat);
		text_mesh.position.set(x, y, 0);
		scene.add(text_mesh);
	});
}

