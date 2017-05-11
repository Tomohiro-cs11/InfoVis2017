function main()
{

    var width = 750;
    var height = 750;

    var scene = new THREE.Scene();

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 5 );
    scene.add( camera );

    var light = new THREE.PointLight();
    light.position.set( 5, 5, 5 );
    scene.add( light );

    var renderer = new THREE.WebGLRenderer();
    renderer.autoClear = false;
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    var geometry = new THREE.TorusKnotGeometry( 1, 0.3, 100, 20 );
    var material = new THREE.ShaderMaterial({
        vertexColors: THREE.VertexColors,
        vertexShader: document.getElementById('gouraud.vert').text,
        fragmentShader: document.getElementById('gouraud.frag').text,
        uniforms: {
            light_position: { type: 'v3', value: light.position }
        }
    });

    var torus_knot = new THREE.Mesh( geometry, material );
    torus_knot.position.x = -1;
    torus_knot.position.y = 0;
    torus_knot.position.z = 0;
    torus_knot.scale.set(0.5,0.5,0.5);                                          
    scene.add( torus_knot );

    //-------------------------------------------------------------------------------

    var geometry2 = new THREE.TorusKnotGeometry( 1, 0.3, 100, 20 );
    var material2 = new THREE.ShaderMaterial({
        vertexColors: THREE.VertexColors,
        vertexShader: document.getElementById('Phong.vert').text,
        fragmentShader: document.getElementById('Phong.frag').text,
        uniforms: {
            light_position: { type: 'v3', value: light.position }
        }
    });

    var torus_knot2 = new THREE.Mesh( geometry2, material2 );
    torus_knot2.position.x = 1;
    torus_knot2.position.y = 0;
    torus_knot2.position.z = 0;
    torus_knot2.scale.set(0.5,0.5,0.5); 
    scene.add( torus_knot2 );

    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        torus_knot.rotation.x += 0.01;
        torus_knot.rotation.y += 0.01;
        torus_knot2.rotation.x += 0.01;
        torus_knot2.rotation.y += 0.01;
        renderer.render( scene, camera );
    }
}
