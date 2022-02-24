import * as THREE from 'three';
import WEBGL from 'three/examples/jsm/capabilities/WebGL.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min';
import Stats from 'three/examples/jsm/libs/stats.module';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';

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
camera.position.set( 0, 25, 300 );
const listener = new THREE.AudioListener();
camera.add( listener );

const helper = new THREE.GridHelper( 800, 40, 0x444444, 0x444444 );
helper.position.y = 0.1;
scene.add(helper);


const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xf0f0f0, 0.6 );
hemiLight.position.set( 0, 500, 0 );
scene.add( hemiLight );


const geometry = new THREE.BoxGeometry( 50, 50, 50 );

const textureLoader = new THREE.TextureLoader( );  // The object used to load textures

    const specialFaceMaterial = new THREE.MeshPhongMaterial(
        {
            map: textureLoader.load( "../textures/specialtexture.png" ),
            bumpMap: textureLoader.load( "../textures/specialtexturetopologico.png" )
        } );// Material for a face
    const regularFaceMaterial = new THREE.MeshPhongMaterial(
        {
            map: textureLoader.load( "../textures/brick.jpg" ),
            bumpMap: textureLoader.load( "../textures/brick-map.jpg" )
        } );// Material for the rest of the faces
    const specialFaceMaterialOff = new THREE.MeshPhongMaterial(
        {
            map: textureLoader.load( "../textures/texturaon.png" ),
            bumpMap: textureLoader.load( "../textures/specialtexturetopologico.png" )
        } );// Material for a face

    // A box has 6 faces
    const materials = [
        specialFaceMaterial,
        regularFaceMaterial,
        regularFaceMaterial,
        regularFaceMaterial,
        regularFaceMaterial,
        regularFaceMaterial,
    ];

    const materials2 = [
        specialFaceMaterial,
        regularFaceMaterial,
        regularFaceMaterial,
        regularFaceMaterial,
        regularFaceMaterial,
        regularFaceMaterial,
    ];

const controlData = {
    bumpScale: materials.bumpScale
}

const controlData2 = {
    bumpScale: materials.bumpScale
}

const stats = new Stats( );
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '0px';
document.body.appendChild( stats.domElement );


const controls = new FirstPersonControls( camera );
controls.movementSpeed = 70;
controls.lookSpeed = 0.05;
controls.noFly = false;
controls.lookVertical = false;

//const gui = new GUI( );
//gui.add( controlData, 'bumpScale', -4, 4 ).step(0.1).name( 'bumpScale' );
const audioLoader = new THREE.AudioLoader();
const sound = new THREE.PositionalAudio( listener );
audioLoader.load( "../sounds/gato.ogg", ( buffer ) => {
    sound.setBuffer( buffer );
    sound.setRefDistance( 20 );
    sound.setLoop( true );
    sound.setRolloffFactor( 0 );
    //sound.play(); // Modern browsers do not allow sound to start without user interaction
});

const audioLoader2 = new THREE.AudioLoader();
const sound2 = new THREE.PositionalAudio( listener );
audioLoader2.load( "../sounds/perro.ogg", ( buffer ) => {
    sound2.setBuffer( buffer );
    sound2.setRefDistance( 20 );
    sound2.setLoop( true );
    sound2.setRolloffFactor( 0 );
    //sound2.play(); // Modern browsers do not allow sound to start without user interaction
});

const box1 = new THREE.Mesh( geometry, materials  );
box1.position.set(-150,25,0);
box1.rotation.set( 0, 0, 0 );
box1.add( sound );
box1.name="caja1";

const box2 = new THREE.Mesh( geometry, materials2  );
box2.position.set(150,25,0);
box2.rotation.set( 0, Math.PI,0 );
box2.add( sound2 );
box2.name="caja2";

scene.add( box1 );
scene.add( box2 );

const rayCaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let intersectedObject = null;

document.body.addEventListener( 'mousemove', ( event ) => {
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}, false );


document.body.addEventListener( 'keydown', ( event ) => {

    // Space key code
    const spaceKeyCode = 32;

    // Space pressed and intersected object
    if ( event.keyCode === spaceKeyCode && intersectedObject ) {

        if(intersectedObject.name=="caja1"){

            if ( sound.isPlaying === true ){

                sound.pause();
                // The first face is the one with the button
                box1.material[ 0 ] = specialFaceMaterial;
                box1.material.needsUpdate = true;
            }
            else{
                sound.play();
                // The first face is the one with the button
                box1.material[ 0 ] = specialFaceMaterialOff;
                box1.material.needsUpdate = true;
            }
        }
        else{

            if(intersectedObject.name=="caja2"){

                if ( sound2.isPlaying === true ){
                   sound2.pause();
                   box2.material[ 0 ] = specialFaceMaterial;
                   box2.material.needsUpdate = true;
                }
                else{
                    sound2.play();
                    // The first face is the one with the button
                    box2.material[ 0 ] = specialFaceMaterialOff;
                    box2.material.needsUpdate = true;
                }
            }

        }

    }
}, false );


renderer.render( scene, camera );

const clock = new THREE.Clock( );

animate();

function animate( ) {

    const delta = clock.getDelta( ); // Elapsed time in seconds

    // UPDATE THE SCENE ACCORDING TO THE ELAPSED TIME

        // UPDATE THE SCENE ACCORDING TO THE ELAPSED TIME
        //const rotation = ( delta * Math.PI * 2 ) / 24;
        //box1.rotation.y += rotation;
        //box2.rotation.y += rotation;
        controls.update( delta );
        materials.bumpScale = controlData.bumpScale;
        materials2.bumpScale = controlData2.bumpScale;
        stats.update( );
    // Render the scene

    rayCaster.setFromCamera( mouse, camera );

    // Look for all the intersected objects
    const intersects = rayCaster.intersectObjects( scene.children );
    if ( intersects.length > 0 ) {
    
        // Sorted by Z (close to the camera)
        if ( intersectedObject != intersects[ 0 ].object ) {
    
            intersectedObject = intersects[ 0 ].object;
            console.log( 'New intersected object: ' + intersectedObject.name );
        }
    } else {
    
        intersectedObject = null;
    }


    renderer.render( scene, camera );

    // Request the browser to execute the animation-rendering loop
    requestAnimationFrame( animate );
};