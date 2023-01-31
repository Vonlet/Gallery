import * as THREE from '../build/three.module.js';

			import Stats from './jsm/libs/stats.module.js';

			var container, stats;
			var camera, scene, raycaster, renderer, parentTransform, sphereInter;

			var mouse = new THREE.Vector2();
			var radius = 100, theta = 0;

			init();
			animate();

			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				var info = document.createElement( 'div' );
				info.style.position = 'absolute';
				info.style.top = '10px';
				info.style.width = '100%';
				info.style.textAlign = 'center';
				info.innerHTML = '<a href="https://threejs.org" target="_blank" rel="noopener">three.js</a> webgl - interactive lines';
				container.appendChild( info );

				camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xf0f0f0 );

				var geometry = new THREE.SphereBufferGeometry( 5 );
				var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );

				sphereInter = new THREE.Mesh( geometry, material );
				sphereInter.visible = false;
				scene.add( sphereInter );

				var lineGeometry = new THREE.BufferGeometry();
				var points = [];

				var point = new THREE.Vector3();
				var direction = new THREE.Vector3();

				for ( var i = 0; i < 50; i ++ ) {

					direction.x += Math.random() - 0.5;
					direction.y += Math.random() - 0.5;
					direction.z += Math.random() - 0.5;
					direction.normalize().multiplyScalar( 10 );

					point.add( direction );
					points.push( point.x, point.y, point.z );

				}

				lineGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( points, 3 ) );

				parentTransform = new THREE.Object3D();
				parentTransform.position.x = Math.random() * 40 - 20;
				parentTransform.position.y = Math.random() * 40 - 20;
				parentTransform.position.z = Math.random() * 40 - 20;

				parentTransform.rotation.x = Math.random() * 2 * Math.PI;
				parentTransform.rotation.y = Math.random() * 2 * Math.PI;
				parentTransform.rotation.z = Math.random() * 2 * Math.PI;

				parentTransform.scale.x = Math.random() + 0.5;
				parentTransform.scale.y = Math.random() + 0.5;
				parentTransform.scale.z = Math.random() + 0.5;

				for ( var i = 0; i < 50; i ++ ) {

					var object;

					var lineMaterial = new THREE.LineBasicMaterial( { color: Math.random() * 0xffffff } );

					if ( Math.random() > 0.5 ) {

						object = new THREE.Line( lineGeometry, lineMaterial );

					} else {

						object = new THREE.LineSegments( lineGeometry, lineMaterial );

					}

					object.position.x = Math.random() * 400 - 200;
					object.position.y = Math.random() * 400 - 200;
					object.position.z = Math.random() * 400 - 200;

					object.rotation.x = Math.random() * 2 * Math.PI;
					object.rotation.y = Math.random() * 2 * Math.PI;
					object.rotation.z = Math.random() * 2 * Math.PI;

					object.scale.x = Math.random() + 0.5;
					object.scale.y = Math.random() + 0.5;
					object.scale.z = Math.random() + 0.5;

					parentTransform.add( object );

				}

				scene.add( parentTransform );

				raycaster = new THREE.Raycaster();
				raycaster.params.Line.threshold = 3;

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				stats = new Stats();
				container.appendChild( stats.dom );

				document.addEventListener( 'mousemove', onDocumentMouseMove, false );

				//

				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function onDocumentMouseMove( event ) {

				event.preventDefault();

				mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
				mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

			}

			//

			function animate() {

				requestAnimationFrame( animate );

				render();
				stats.update();

			}

			function render() {

				theta += 0.1;

				camera.position.x = radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
				camera.position.y = radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
				camera.position.z = radius * Math.cos( THREE.MathUtils.degToRad( theta ) );
				camera.lookAt( scene.position );

				camera.updateMatrixWorld();

				// find intersections

				raycaster.setFromCamera( mouse, camera );

				var intersects = raycaster.intersectObjects( parentTransform.children, true );

				if ( intersects.length > 0 ) {

					sphereInter.visible = true;
					sphereInter.position.copy( intersects[ 0 ].point );

				} else {

					sphereInter.visible = false;

				}

				renderer.render( scene, camera );

			}
