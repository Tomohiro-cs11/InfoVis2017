function main()
{
    var width = 500;
    var height = 500;

    var scene = new THREE.Scene();

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 5 );
    scene.add( camera );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    var vertices = [
	[-1, 1, 0], // v0
	[-1, -1, 0], // v1
	[1, -1, 0], // v2
	[1, 1, 0], //v3
	[-1, 1, 2],//v4
	[-1, -1, 2],//v5
	[1, -1, 2],//v6
	[1, 1, 2]//v7
    ];
    var faces = [
	[0,1,2], // f0: v0-v1-v2
	[0,2,3],
	[4,1,0],
	[4,5,1],
	[4,7,5],
	[7,6,5],
	[7,3,6],
	[3,2,6],
	[4,0,7],
	[0,3,7],
	[6,1,5],
	[1,6,2]
    ];
    var v0 = new THREE.Vector3().fromArray( vertices[0] );
    var v1 = new THREE.Vector3().fromArray( vertices[1] );
    var v2 = new THREE.Vector3().fromArray( vertices[2] );
    var v3 = new THREE.Vector3().fromArray( vertices[3] );
    var v4 = new THREE.Vector3().fromArray( vertices[4] );
    var v5 = new THREE.Vector3().fromArray( vertices[5] );
    var v6 = new THREE.Vector3().fromArray( vertices[6] );
    var v7 = new THREE.Vector3().fromArray( vertices[7] );
    var id = faces[0];
    var f0 = new THREE.Face3( id[0], id[1], id[2] );
    var id = faces[1];
    var f1 = new THREE.Face3( id[0], id[1], id[2] );
    var id = faces[2];
    var f2 = new THREE.Face3( id[0], id[1], id[2] );
    var id = faces[3];
    var f3 = new THREE.Face3( id[0], id[1], id[2] );
    var id = faces[4];
    var f4 = new THREE.Face3( id[0], id[1], id[2] );
    var id = faces[5];
    var f5 = new THREE.Face3( id[0], id[1], id[2] );
    var id = faces[6];
    var f6 = new THREE.Face3( id[0], id[1], id[2] );
    var id = faces[7];
    var f7 = new THREE.Face3( id[0], id[1], id[2] );
    var id = faces[8];
    var f8 = new THREE.Face3( id[0], id[1], id[2] );
    var id = faces[9];
    var f9 = new THREE.Face3( id[0], id[1], id[2] );
    var id = faces[10];
    var f10 = new THREE.Face3( id[0], id[1], id[2] );
    var id = faces[11];
    var f11 = new THREE.Face3( id[0], id[1], id[2] );
    var geometry = new THREE.Geometry();
    geometry.computeFaceNormals();
    geometry.vertices.push( v0 );
    geometry.vertices.push( v1 );
    geometry.vertices.push( v2 );
    geometry.vertices.push( v3 );
    geometry.vertices.push( v4 );
    geometry.vertices.push( v5 );
    geometry.vertices.push( v6 );
    geometry.vertices.push( v7 );
    geometry.faces.push( f0 );
    geometry.faces.push( f1 );
    geometry.faces.push( f2 );
    geometry.faces.push( f3 );
    geometry.faces.push( f4 );
    geometry.faces.push( f5 );
    geometry.faces.push( f6 );
    geometry.faces.push( f7 );
    geometry.faces.push( f8 );
    geometry.faces.push( f9 );
    geometry.faces.push( f10 );
    geometry.faces.push( f11 );
    var material = new THREE.MeshBasicMaterial();
    material.side = THREE.DoubleSide
    material.vertexColors = THREE.FaceColors;
    geometry.faces[0].color = new THREE.Color( 0, 0, 1 );
    geometry.faces[1].color = new THREE.Color( 0, 0, 1 );
    geometry.faces[2].color = new THREE.Color( 0, 0, 1 );
    geometry.faces[3].color = new THREE.Color( 0, 0, 1 );
    geometry.faces[4].color = new THREE.Color( 0, 0, 1 );
    geometry.faces[5].color = new THREE.Color( 0, 0, 1 );
    geometry.faces[6].color = new THREE.Color( 0, 0, 1 );
    geometry.faces[7].color = new THREE.Color( 0, 0, 1 );
    geometry.faces[8].color = new THREE.Color( 0, 0, 1 );
    geometry.faces[9].color = new THREE.Color( 0, 0, 1 );
    geometry.faces[10].color = new THREE.Color( 0, 0, 1 );
    geometry.faces[11].color = new THREE.Color( 0, 0, 1 );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    
    var mousedown = false;
    var mouse = {x: 0, y: 0};
    var targetList = [];
    targetList.push(cube);
    renderer.domElement.addEventListener('mousedown', function(e) {
        mousedown = true;
        prevPosition = {x: e.pageX, y: e.pageY};
        var rect = e.target.getBoundingClientRect();
        mouse.x =  e.clientX - rect.left;
        mouse.y =  e.clientY - rect.top;
        //マウス座標3D変換 width,height:画面サイズ
        mouse.x =  (mouse.x / width) * 2 - 1;           
        mouse.y = -(mouse.y / height) * 2 + 1;
        
        // マウスベクトル
        var vector = new THREE.Vector3( mouse.x, mouse.y ,1);

        // vector はスクリーン座標系なので, オブジェクトの座標系に変換
        vector.unproject(camera);

        // 始点, 向きベクトルを渡してレイを作成
        var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
        
        // クリック判定
        var intersects = ray.intersectObjects( targetList );
        
        if ( intersects.length > 0 ){
	    intersects[0].face.color.setRGB( 1, 0, 0 );
	    intersects[0].object.geometry.colorsNeedUpdate = true;
        }

    }, false);

    renderer.domElement.addEventListener('mousemove', function(e) {
        if (!mousedown) return;
        moveDistance = {x: prevPosition.x - e.pageX, y: prevPosition.y - e.pageY};
        cube.rotation.x += moveDistance.y * 0.01;
        cube.rotation.y -= moveDistance.x * 0.01;

        prevPosition = {x: e.pageX, y: e.pageY};
    }, false);

    renderer.domElement.addEventListener('mouseup', function(e) {
        mousedown = false;
    }, false);

    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        cube.rotation.x += 0.001;
        cube.rotation.y += 0.001;
        renderer.render( scene, camera );
    }

}
