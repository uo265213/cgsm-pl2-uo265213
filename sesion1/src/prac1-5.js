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
camera.position.set( 0, 0, 30 );

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


//box.rotation.set( Math.PI / 5, Math.PI / 5, 0 );


var inner=5;

var outer=8;

const geometryhouse = new THREE.BufferGeometry();

const vertices = new Float32Array( [
    // Internal vertices
    -inner, inner, 0,
    inner, inner, 0,
    inner, -inner, 0,
    -inner, -inner, 0,

    // External vertices
    -outer, outer, 0,
    outer, outer, 0,
    outer, -outer, 0,
    -outer, -outer, 0
] );

// Faces (indices of vertices)
const indices = [
    5, 4, 0,
    0, 1, 5,
    6, 5, 1,
    1, 2, 6,
    7, 6, 2,
    2, 3, 7,
    4, 7, 3,
    3, 0, 4
];

geometryhouse.setIndex( indices );
geometryhouse.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );


scene.add( box );
scene.add( cilinder );
scene.add( sphere );
scene.add(geometryhouse)

renderer.render( scene, camera );

