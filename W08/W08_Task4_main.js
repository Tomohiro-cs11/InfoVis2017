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
    camera.position.set( 0, 0, 6 );
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
        vertexShader: document.getElementById('Cook_Torrance.vert').text,
        fragmentShader: document.getElementById('Cook_Torrance.frag').text,
        uniforms: {
            light_position: { type: 'v3', value: light.position },
            C_color :{ type: 'v3', value: new THREE.Vector3( 230.0/255.0, 180.0/255.0, 34.0/255.0 ) }
        }
    });
    
    var torus_knot = new THREE.Mesh( geometry, material );
    //torus_knot.scale.set(0.5,0.5,0.5); 
    scene.add( torus_knot );


    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        torus_knot.rotation.x += 0.01;
        torus_knot.rotation.y += 0.01;
        renderer.render( scene, camera );
    }
}
