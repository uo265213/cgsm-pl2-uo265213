import * as THREE from 'three';
import WEBGL from 'three/examples/jsm/capabilities/WebGL.js';

if ( WEBGL.isWebGLAvailable() ) {
    console.log("WEBGL soportado en el nagevador ");
}

window.addEventListener( 'resize', ( ) => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix( );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.render( scene, camera );
}, false );

const scene = new THREE.Scene();

const renderer = WEBGL.isWebGLAvailable() ? new THREE.WebGLRenderer( {antialias: true} ) : new THREE.CanvasRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 1, 4000 );
camera.position.set( 0, 0, 15 );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( );
const box = new THREE.Mesh( geometry, material );
box.position.set( 0, 0, 0 );

const spheregeometry = new THREE.SphereGeometry( 1 );
const spherematerial = new THREE.MeshBasicMaterial( );
const sphere = new THREE.Mesh( spheregeometry, spherematerial );
sphere.position.set(0,3,0)

const cilindergeometry = new THREE.CylinderGeometry( 1, 1);
const cilindermaterial = new THREE.MeshBasicMaterial( );
const cilinder = new THREE.Mesh( cilindergeometry, cilindermaterial );
cilinder.position.set(0,6,0)


box.rotation.set( Math.PI / 5, Math.PI / 5, 0 );

scene.add( box );
scene.add( cilinder );
scene.add( sphere );

renderer.render( scene, camera );

