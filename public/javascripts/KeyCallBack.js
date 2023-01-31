// w:87, a:65, s:83, d:68, space:32, ctrl:17, left:37, right:39, up:38, down:40
//押されている:1, 押されてない:0
//すべて　0で初期化
key_on = new Array(256);
key_on.fill(0);

Pi = 3.141592;
function keyCallBack_on(e) {
	if ( e && e.keyCode ) { keycode = e.keyCode;
	} else if ( e && e.keyCode ) { keycode = e.keyCode; }
		key_on[keycode] = 1;
		cameraMove(keycode, camera);
}

function keyCallBack_off(e) {
	if ( e && e.keyCode ) { keycode = e.keyCode;
	} else if ( e && e.keyCode ) { keycode = e.keyCode; }
		key_on[keycode] = 0;
}

function cameraMove(key, object){
	if(key == 87){ //87 is W
		console.log("W");
		camera.position.z -= 1;
	}else if(key == 65){ //65 is A
		console.log("A");
		camera.position.x -= 1;
	}else if(key == 83){ //83 is S
		console.log("S");
		camera.position.z += 1;
	}else if(key == 68){ //68 is D
		console.log("D");
		camera.position.x += 1;
	}else if(key == 32){ //32 is Space
		console.log("Space");
	}else if(key == 17){ //17 is Ctrl
		console.log("Ctrl");
	}else if(key == 37){ //37 is Left
		console.log("←");
	}else if(key == 39){ //39 is Right
		console.log("→");
	}else if(key == 38){ //38 is Up
		console.log("↑");
	}else if(key == 40){ //40 is Down
		console.log("↓");
	}
}

//押したらkeyCallBack_on関数が呼ばれる
document.onkeydown = keyCallBack_on; 

//離したらkeyCallBack_off関数が呼ばれる
document.onkeyup = keyCallBack_off; 