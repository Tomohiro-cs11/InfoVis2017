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
    
    var local = window.location;
    var url = local.origin
    
    dir = url + getDir(local); // 現在ディレクトリ
    file = dir + 'texture.jpg';
    function getDir(place, n) {
    return place.pathname.replace(new RegExp("(?:\\\/+[^\\\/]*){0," + ((n || 0) + 1) + "}$"), "/");
    }
    
    var geometry = new THREE.TorusKnotGeometry( 1, 0.3, 100, 20 );
    //var geometry = new THREE.BoxGeometry( 2, 2, 2 );
    var material = new THREE.ShaderMaterial({
        vertexColors: THREE.VertexColors,
        vertexShader: document.getElementById('ToonReflection.vert').text,
        fragmentShader: document.getElementById('ToonReflection.frag').text,
        uniforms: {
            light_position: { type: 'v3', value: light.position },
            texture: { type: 'sampler2D', value: THREE.ImageUtils.loadTexture(file) }
        }
    });
    
    material.side = THREE.DoubleSide;

    var torus_knot = new THREE.Mesh( geometry, material );                                    
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
