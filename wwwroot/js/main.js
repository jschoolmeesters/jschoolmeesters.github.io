window.addEventListener("scroll", function() {
    var elementTarget = document.getElementById("navbar-trigger");
    if (window.scrollY > (elementTarget.offsetTop)) { // 4.5rem = 72px of the navbar
        var element = document.getElementById("navbar");
        element.classList.add("navbar-bg");
    } else {
        var element = document.getElementById("navbar");
        element.classList.remove("navbar-bg");
    }
});

var canvas = null;
var engine = null;

var createScene = async function () {
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);

    var scene = new BABYLON.Scene(engine);
    // Set the scene's clear color to transparent
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);  // RGBA value with alpha = 0
    scene.useRightHandedSystem = true;
    scene.enablePhysics(new BABYLON.Vector3(0, -2, 0), new BABYLON.CannonJSPlugin());

    // Create a camera
    var camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 2, -Math.PI / 2, 50, BABYLON.Vector3.Zero(), scene);
    //camera.attachControl(canvas, true);

	var lensEffect = new BABYLON.LensRenderingPipeline('lens', {
		//edge_blur: 3,
		chromatic_aberration: 0.2,
		//distortion: 1.0,
		//dof_focus_distance: 50,
		dof_aperture: 3.0,			// set this very high for tilt-shift effect
		grain_amount: 1.0,
		dof_pentagon: true,
		dof_gain: 100.0,
		dof_threshold: 1.0,
		dof_darken: -1 // was 0.25
	}, scene, 1.0, camera);

    //Adding a light
    var light = new BABYLON.HemisphericLight("omni", new BABYLON.Vector3(0, 1, 0.1), scene);
	light.diffuse = new BABYLON.Color3(0.1, 0.1, 0.17);
	light.specular = new BABYLON.Color3(0.1, 0.1, 0.1);
    var light2 = new BABYLON.HemisphericLight("dirlight", new BABYLON.Vector3(1, 0, 1), scene);
	light2.diffuse = new BABYLON.Color3(1, 1, 1);
	light2.specular = new BABYLON.Color3(0.58, 0.49, .5);

    var light3 = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(10, 2, 2), new BABYLON.Vector3(-1, 0, 0), Math.PI / 3, 2, scene);
    light3.diffuse = new BABYLON.Color3(1, 1, 1);
	light3.specular = new BABYLON.Color3(0.58, 0.49, .5);

    // Create walls
    var wallMaterial = new BABYLON.StandardMaterial("wallMat", scene);
    wallMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);
    wallMaterial.alpha = 0;

    var createWall = function (width, height, depth, position) {
        var wall = BABYLON.MeshBuilder.CreateBox("wall", { width: width, height: height, depth: depth }, scene);
        wall.position = position;
        wall.material = wallMaterial;
        wall.physicsImpostor = new BABYLON.PhysicsImpostor(wall, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.3, friction: 0.5 }, scene);
    };

    // slope
    createWall(0.2, 20, 10, new BABYLON.Vector3(5, 5, 0));  // Right wall
    createWall(0.2, 20, 10, new BABYLON.Vector3(-5, 5, 0)); // Left wall
    createWall(10, 5, 20, new BABYLON.Vector3(0, -2, 0)); // Bottom wall
    createWall(10, 0.2, 10, new BABYLON.Vector3(0, 15, 0)); // Bottom wall

    // Create front wall
    var frontWall = BABYLON.MeshBuilder.CreateBox("wall", { width: 10, height: 10, depth: 0.1 }, scene);
    frontWall.position = new BABYLON.Vector3(0, 5, 2);
    frontWall.material = wallMaterial;
    frontWall.physicsImpostor = new BABYLON.PhysicsImpostor(frontWall, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.3, friction: 0.5 }, scene);
    frontWall.showBoundingBox = true;
    camera.setTarget(frontWall);

    frontWall.showBoundingBox = true;

    // Calculate the appropriate camera FOV to fit the front wall
    var vertSize = frontWall.scaling.y * 0.5;
    var distance = frontWall.position.z - frontWall.scaling.z * 0.5 - camera.position.z;
    var hypothenus = Math.sqrt(vertSize * vertSize + distance * distance);
    var cosine = distance / hypothenus;
    var halfAngle = Math.acos(cosine);
    var angle = halfAngle * 2.079; // with some margin

    camera.fov = angle;


    camera.alpha = BABYLON.Tools.ToRadians(62); // Horizontal angle
    camera.beta = BABYLON.Tools.ToRadians(60);  // Vertical angle
    
    window.addEventListener("scroll", function () {
        var prop = 1 + (this.window.scrollY / this.window.innerHeight)/2.5;
        camera.radius = 22 * prop;
        camera.beta = BABYLON.Tools.ToRadians(60 + (this.window.scrollY/12)); // Horizontal angle
    });

    camera.radius = 22; // Distance from the target


    // Create falling blocks
    var boxMaterial = new BABYLON.StandardMaterial("boxMat", scene);
    boxMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);
    
    var box = BABYLON.MeshBuilder.CreateBox("box", { width:2,height:8,depth:2 }, scene);
        var mat = new BABYLON.StandardMaterial("mat", scene);
        var videoTexture = new BABYLON.VideoTexture(
            "video",
            ["../media/test.mp4", "../media/test.mp4"],
            scene,
            false,
            false,
            BABYLON.VideoTexture.TRILINEAR_SAMPLINGMODE,
            {
                autoPlay:true,
                autoUpdateTexture:true
            }
        );
        mat.diffuseTexture = videoTexture;
        mat.diffuseTexture.uScale = -1
        box.material = mat;
        box.rotate(new BABYLON.Vector3(0, 0, 1), -1.8);
        box.position = new BABYLON.Vector3(0, 3.8, 0);
        //box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.6, friction: 0.5 }, scene);


    BABYLON.SceneLoader.ImportMesh("", "../media/", "model-glasses.glb", scene, function (newMeshes) {
        // Scale loaded mesh
        var mesh = newMeshes[0];
        mesh.scaling.scaleInPlace(1);
        mesh.position.set(0,-3.4,-1.8);

        // Create a physics root and add all children
        var physicsRoot = new BABYLON.Mesh("", scene);
        physicsRoot.addChild(mesh);
        
        
        // Create a box collider
        var boxCollider = BABYLON.MeshBuilder.CreateBox("box1", { width:3,height:0.7,depth:0.5 }, scene);
        boxCollider.position.y = 0;
        boxCollider.position.z = 0;
        boxCollider.isVisible = false; // Set to false to make the collider invisible
        
        // Add the boxCollider to the physicsRoot
        physicsRoot.addChild(boxCollider);
        physicsRoot.rotate(new BABYLON.Vector3(0, 1, 0), 1);

        // Enable physics on the colliders first, then the physics root of the mesh
        boxCollider.physicsImpostor = new BABYLON.PhysicsImpostor(boxCollider, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
        //physicsRoot.physicsImpostor = new BABYLON.PhysicsImpostor(physicsRoot, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0.5,restitution:1 }, scene);

        physicsRoot.position = new BABYLON.Vector3(-0.2, 5.5, 3);
        //physicsRoot.rotation.z = Math.PI / 6;
    });
    

    BABYLON.SceneLoader.ImportMesh("", "../media/", "model-rocks.glb", scene, function (newMeshes) {
        
        // Scale loaded mesh
        newMeshes[0].scaling.scaleInPlace(0.45);
        newMeshes[0].position.set(0,0,0);

        // Create a physics root and add all children
        var physicsRoot = new BABYLON.Mesh("", scene);
        physicsRoot.addChild(newMeshes[0]);
        //physicsRoot.rotate(new BABYLON.Vector3(-1, 0, 0), 30);
        //physicsRoot.rotate(new BABYLON.Vector3(0, -1, 0), 0.25);
        //physicsRoot.rotate(new BABYLON.Vector3(0, 1, 0), 0.5);
        physicsRoot.rotate(new BABYLON.Vector3(0, 1, 0), 1);
        physicsRoot.rotate(new BABYLON.Vector3(0, 1, 0), 0.2);

        // Create a box collider
        var boxCollider = BABYLON.MeshBuilder.CreateBox("box1", { width:4,height:1.5,depth:2.2 }, scene);
        boxCollider.position.y = 0;
        boxCollider.position.z = 0;
        boxCollider.isVisible = false; // Set to false to make the collider invisible

        // Add the boxCollider to the physicsRoot
        physicsRoot.addChild(boxCollider);

        // Enable physics on the colliders first, then the physics root of the mesh
        boxCollider.physicsImpostor = new BABYLON.PhysicsImpostor(boxCollider, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
        //physicsRoot.physicsImpostor = new BABYLON.PhysicsImpostor(physicsRoot, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0.5,restitution:1 }, scene);

        physicsRoot.position = new BABYLON.Vector3(-1.8, 2, 1.6);
       
    });

    engine.runRenderLoop(function () {
        scene.render();
    });

    window.addEventListener("resize", function () {
        engine.resize();
    });
}



function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    });
}


waitForElm("#renderCanvas").then(() => {
    createScene();
});


