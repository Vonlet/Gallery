var scene, camera, renderer, axes;
var gui, controls;
var planeGeometry, planeMaterial, plane;
var cubeGeometry, cubeMaterial, cube;

window.addEventListener( 'resize', onWindowResize, false );

main();

function main(){
  init();
  building(0xaf5b04,0,-50,0);
  building(0x04af26,0,50,0);
  debug_ball();
  animate();
  controls = new PointerLockControls( camera, document.body );
  controls.addEventListener('lock', () => (menuPanel.style.display = 'none'))
  controls.addEventListener('unlock', () => (menuPanel.style.display = 'block'))
}

/*
function makeGUI(object, name){
  const gui = new dat.GUI();
  const Folder = gui.addFolder(name);
  Folder.add(object.position, 'x', -100, 100);
  Folder.add(object.position, 'y', -100, 100);
  Folder.add(object.position, 'z', -100, 100);
  Folder.open();
}*/

function building(color,x,y,z){
  var floorGeonmetry = new THREE.BoxGeometry(1000,1,1000);
  var floorMaterial = new THREE.MeshBasicMaterial({color: color});
  var floor = new THREE.Mesh( floorGeonmetry, floorMaterial );
  floor.position.set(x,y,z);
  scene.add( floor );
  console.log("Do");
}


function init(){ 
  scene = new THREE.Scene();
  cameraSettings();
  render();
}

function cameraSettings(){
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 0);
  camera.lookAt(scene.position);
}

function render(){
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xEEEEEE));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 1);
}

function animate() {
  window.requestAnimationFrame( animate );
  // シーンを描画
  document.getElementById("WebGL-output").appendChild(renderer.domElement);
  renderer.render( scene, camera );
}

function onWindowResize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth,window.innerHeight);
}