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
camera.position.set( 0, 0, 20 );


const geometry = new THREE.BufferGeometry();
const material = new THREE.MeshBasicMaterial( );

var outer=0.5;

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


const geometrybox = new THREE.BoxGeometry( 1, 1, 1 );
const materialcaja = new THREE.MeshBasicMaterial(new THREE.Color(0xff0000));
const caja = new THREE.Mesh( geometrybox, materialcaja );
caja.position.set( -6, 0, 0 );

const spheregeometry = new THREE.SphereGeometry( 1 );
const spherematerial = new THREE.MeshPhongMaterial( new THREE.Color(0x00ff00));
const sphere = new THREE.Mesh( spheregeometry, spherematerial );
sphere.position.set(-3,0,0)

const cilindergeometry = new THREE.CylinderGeometry( 1, 1);
const cilindermaterial = new THREE.MeshLambertMaterial(new THREE.Color(0x0000ff));
const cilinder = new THREE.Mesh( cilindergeometry, cilindermaterial );
cilinder.position.set(3,0,0)


caja.rotation.set( Math.PI / 5, Math.PI / 5, 0 );


const light = new THREE.DirectionalLight( 0xff0000, 2 );
light.position.set( 6, 6, 6 );
scene.add( light );

scene.add( caja );
scene.add( cilinder );
scene.add( sphere );


scene.add( box );


renderer.render( scene, camera );

