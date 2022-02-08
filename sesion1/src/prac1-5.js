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
camera.position.set( 0, 0, 7 );






/*
const cuadrado = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( );
const box = new THREE.Mesh( cuadrado, material );
box.position.set( 0, 0, 0 );
*/

//box.rotation.set( Math.PI / 5, Math.PI / 5, 0 );

//scene.add( box );

const geometry = new THREE.BufferGeometry();
const material = new THREE.MeshBasicMaterial( );

var outer=0.5;
var inner=0.4;

/*
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
    -outer, -outer, 0,
    0, 1, 0


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
    3, 0, 4,
    4, 5, 8
];
*/

const vertices = new Float32Array( [

    // External vertices
    -outer, outer, 0,
    outer, outer, 0,
    outer, -outer, 0,
    -outer, -outer, 0,
    0, 1, 0

] );

// Faces (indices of vertices)
const indices = [
    2,1,0,
    0,3,2,
    1,4,0

];


geometry.setIndex( indices );
geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
const box = new THREE.Mesh( geometry, material );

scene.add( box );



renderer.render( scene, camera );

