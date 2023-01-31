function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function debug_ball(){
  orb(0x36ff1f, 0,0,30); // back Green
  orb(0xff1f28, 0,0,-30); // forward red
  orb(0x1fffe8, 0,30,0); // up light blue
  orb(0xffee1f, 0,-30,0); // down yellow
  orb(0xff1ffa, 30,0,0); //  right pink
  orb(0xff921f, -30,0,0); // left orange
}

function orb(color,x,y,z){
  var sphereGeometry = new THREE.SphereGeometry(2, 10, 10);
  var sphereMaterial = new THREE.MeshBasicMaterial({color: color});
  var sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
  sphere.position.set(x, y, z);
  scene.add(sphere);
}

function QCube(color,x,y,z){
  cubeGeonmetry = new THREE.BoxGeometry(4,4,4);
  cubeMaterial = new THREE.MeshBasicMaterial({color: color, wireframe:true});
  cube = new THREE.Mesh( cubeGeonmetry, cubeMaterial );
  cube.position.set(x,y,z);
  scene.add( cube );
}