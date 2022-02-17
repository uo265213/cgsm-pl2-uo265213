import * as THREE from 'three';
import WEBGL from 'three/examples/jsm/capabilities/WebGL.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min';
import Stats from 'three/examples/jsm/libs/stats.module';

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
camera.position.set( 0, 0, 3 );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );

const textureLoader = new THREE.TextureLoader( );  // The object used to load textures
const material = new THREE.MeshPhongMaterial(
    {
        map: textureLoader.load( "../textures/brick.jpg" ),
        bumpMap: textureLoader.load( "../textures/brick-map.jpg" )
    } );

const controlData = {
    bumpScale: material.bumpScale
}

const stats = new Stats( );
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '0px';
document.body.appendChild( stats.domElement );

const gui = new GUI( );
gui.add( controlData, 'bumpScale', -4, 4 ).step(0.1).name( 'bumpScale' );

const box = new THREE.Mesh( geometry, material );

box.rotation.set( Math.PI / 5, Math.PI / 5, 0 );
scene.add( box );


const light = new THREE.PointLight( 0xffffff,  0.5);
const ambientlight = new THREE.AmbientLight( 0xffffff,  0.5);
light.position.set( -8, 0, 0 );
scene.add( light );
ambientlight.position.set( -8, 0, 0 );
scene.add( ambientlight );



renderer.render( scene, camera );

const clock = new THREE.Clock( );

animate();

function animate( ) {

    const delta = clock.getDelta( ); // Elapsed time in seconds

    // UPDATE THE SCENE ACCORDING TO THE ELAPSED TIME

        // UPDATE THE SCENE ACCORDING TO THE ELAPSED TIME
        const rotation = ( delta * Math.PI * 2 ) / 24;
        box.rotation.y += rotation;
        material.bumpScale = controlData.bumpScale;
        stats.update( );
    // Render the scene
    renderer.render( scene, camera );

    // Request the browser to execute the animation-rendering loop
    requestAnimationFrame( animate );
};