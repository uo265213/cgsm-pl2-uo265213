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
camera.position.set( 0, 0, 10 );

const spheregeometry = new THREE.SphereGeometry( 1 );

//const spherematerial = new THREE.MeshBasicMaterial( );
const mapUrl = "../textures/tierra.gif";   // The file used as texture
const textureLoader = new THREE.TextureLoader( );  // The object used to load textures
const map = textureLoader.load( mapUrl, ( loaded ) => { renderer.render( scene, camera ); } );
const spherematerial = new THREE.MeshPhongMaterial( { map: map } );

const sphere = new THREE.Mesh( spheregeometry, spherematerial );
sphere.position.set(0,0,0);




const atmosferageometry = new THREE.SphereGeometry( 1.03 );

//const spherematerial = new THREE.MeshBasicMaterial( );
const mapUrlatmosffera = "../textures/atmosfera.gif";   // The file used as texture
//const textureLoader = new THREE.TextureLoader( );  // The object used to load textures
const mapatmosfera = textureLoader.load( mapUrlatmosffera, ( loaded ) => { renderer.render( scene, camera ); } );
//const atmosferamaterial = new THREE.MeshLambertMaterial( { map: mapatmosfera } );

var atmosferamaterial = new THREE.MeshLambertMaterial( { color: 0xFFFFFF, map: mapatmosfera, transparent: true } );

const atmosfera = new THREE.Mesh( atmosferageometry, atmosferamaterial );
atmosfera.position.set(0,0,0);



var object = new THREE.Object3D();
object.add( sphere );
object.add( atmosfera );
object.rotation.set( 0, 0, 0.36 );

scene.add( object );




const moonMapUrl = '../textures/luna.gif';
const moonMap = textureLoader.load( moonMapUrl, function(loaded) { renderer.render( scene, camera ); } );
const materialluna = new THREE.MeshLambertMaterial( { map: moonMap, color: 0x888888 } );

//... TODO: create the Moon and compute the distance to the Earth
const lunageometry = new THREE.SphereGeometry( 0.27 );
const moon = new THREE.Mesh( lunageometry, materialluna );

// Move the Moon away from the coordinate origin (the Earth)
// NOT TO SCALE. Real value: Math.sqrt( distance * distance / 2 )
const distance=50;
moon.position.set( Math.sqrt( distance / 2 ), 0, -Math.sqrt( distance / 2 ) );

// Rotate the Moon to face visible side to the Earth (tidal locking)
moon.rotation.y = Math.PI;

// Moon should rotate around the Earth: an Object3D is needed
const moonGroup = new THREE.Object3D( );
moonGroup.add( moon );

// The Moon orbit is a bit tilted
moonGroup.rotation.x = 0.089;

scene.add(moonGroup);



//const light = new THREE.PointLight( 0xffffff, 2 );
const light = new THREE.PointLight( 0xffffff, 3 );
light.position.set( -5, 0, 0 );
scene.add( light );



const clock = new THREE.Clock( );

animate();

function animate( ) {

    const delta = clock.getDelta( ); // Elapsed time in seconds

    // UPDATE THE SCENE ACCORDING TO THE ELAPSED TIME

        // UPDATE THE SCENE ACCORDING TO THE ELAPSED TIME
        const rotation = ( delta * Math.PI * 2 ) / 24;
        sphere.rotation.y += rotation;
        atmosfera.rotation.y += rotation * 0.95;

    // Render the scene
    renderer.render( scene, camera );

    // Request the browser to execute the animation-rendering loop
    requestAnimationFrame( animate );
};

//scene.add( sphere );
//scene.add( atmosfera );

//renderer.render( scene, camera );

