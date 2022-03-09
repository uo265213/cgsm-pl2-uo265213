import * as THREE from 'three';
import WEBGL from 'three/examples/jsm/capabilities/WebGL.js';

if ( WEBGL.isWebGLAvailable() ) {
    console.log("WEBGL soportado en el nagevador ");
}



const scene = new THREE.Scene();

const renderer = WEBGL.isWebGLAvailable() ? new THREE.WebGLRenderer( {antialias: true} ) : new THREE.CanvasRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 1, 4000 );
camera.position.set( 0, 0, 500 );

window.addEventListener( 'resize', ( ) => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix( );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.render( scene, camera );
}, false );

//const video = document.getElementById( 'player' );
const url = "../videos/sintel_trailer_custom_480_720_1080.mpd";
const player = dashjs.MediaPlayer().create();
player.initialize(document.querySelector("#player"), url, true);




const image = document.createElement( 'canvas' );
image.width = 480;  // Video width
image.height = 204; // Video height
const imageContext = image.getContext( '2d' );
imageContext.fillStyle = '#000000';
imageContext.fillRect( 0, 0, image.width - 1, image.height - 1 );
const texture = new THREE.Texture( image );



const material = new THREE.MeshBasicMaterial( { map: texture } );
const wall = new THREE.Mesh( new THREE.PlaneGeometry( image.width, image.height, 4, 4 ), material );



scene.add(wall);

const light = new THREE.AmbientLight( 0xffffff, 2 );
light.position.set( -8, 0, 0 );
scene.add( light );


//scene.add( box );
renderer.render( scene, camera );

const clock = new THREE.Clock( );


animate();



function animate( ) {

    const delta = clock.getDelta( ); // Elapsed time in seconds

/*
    if ( video.readyState === video.HAVE_ENOUGH_DATA ) {

        imageContext.drawImage( video, 0, 0 );
        if ( texture ) texture.needsUpdate = true;
    }
*/
    // UPDATE THE SCENE ACCORDING TO THE ELAPSED TIME

        // UPDATE THE SCENE ACCORDING TO THE ELAPSED TIME
        const rotation = ( delta * Math.PI * 2 ) / 24;
        wall.rotation.y += rotation;

    // Render the scene
    renderer.render( scene, camera );

    // Request the browser to execute the animation-rendering loop
    requestAnimationFrame( animate );
};