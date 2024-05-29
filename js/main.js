var canvas = null;
var engine = null;

var createScene = async function () {
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);

    var scene = new BABYLON.Scene(engine);
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
    var light2 = new BABYLON.HemisphericLight("dirlight", new BABYLON.Vector3(1, -0.75, 0.25), scene);
	light2.diffuse = new BABYLON.Color3(1, 1, 1);
	light.specular = new BABYLON.Color3(0.58, 0.49, .5);
    
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

    BABYLON.SceneLoader.ImportMesh("", "../media/", "model-genelec.glb", scene, function (newMeshes) {
        // Scale loaded mesh
        newMeshes[0].scaling.scaleInPlace(2.5);
        newMeshes[0].position.set(0,0,0);

        // Create a physics root and add all children
        var physicsRoot = new BABYLON.Mesh("", scene);
        physicsRoot.addChild(newMeshes[0]);
        
        // Create a box collider
        var boxCollider = BABYLON.MeshBuilder.CreateBox("box1", { width:1.9,height:3,depth:2 }, scene);
        //boxCollider.position.y = 0;
        //boxCollider.position.z = 0;
        boxCollider.isVisible = false; // Set to false to make the collider invisible

        // Add the boxCollider to the physicsRoot
        physicsRoot.addChild(boxCollider);

        // Enable physics on the colliders first, then the physics root of the mesh
        boxCollider.physicsImpostor = new BABYLON.PhysicsImpostor(boxCollider, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
        //physicsRoot.physicsImpostor = new BABYLON.PhysicsImpostor(physicsRoot, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0.5,restitution:0.8 }, scene);
        physicsRoot.rotate(new BABYLON.Vector3(0, 0, -1), 29.85);
        physicsRoot.position = new BABYLON.Vector3(-3, 2, 0);
        //physicsRoot.rotation.z = Math.PI / 6;
    });

    BABYLON.SceneLoader.ImportMesh("", "../media/", "model-keyboard.glb", scene, function (newMeshes) {
        // Scale loaded mesh
        newMeshes[0].scaling.scaleInPlace(8);
        newMeshes[0].position.set(0,-0.2,0);

        // Create a physics root and add all children
        var physicsRoot = new BABYLON.Mesh("", scene);
        physicsRoot.addChild(newMeshes[0]);
        physicsRoot.rotate(new BABYLON.Vector3(-1, 0, 0), 30);
        physicsRoot.rotate(new BABYLON.Vector3(0, -1, 0), 0.25);
        
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

        physicsRoot.position = new BABYLON.Vector3(-0.5, 6, 0.2);
       
    });

    BABYLON.SceneLoader.ImportMesh("", "../media/", "model-glasses.glb", scene, function (newMeshes) {
        // Scale loaded mesh
        newMeshes[0].scaling.scaleInPlace(2);
        newMeshes[0].position.set(0,-3.4,-1.8);

        // Create a physics root and add all children
        var physicsRoot = new BABYLON.Mesh("", scene);
        physicsRoot.addChild(newMeshes[0]);
        
        
        // Create a box collider
        var boxCollider = BABYLON.MeshBuilder.CreateBox("box1", { width:3,height:0.7,depth:0.5 }, scene);
        boxCollider.position.y = 0;
        boxCollider.position.z = 0;
        boxCollider.isVisible = false; // Set to false to make the collider invisible
        
        // Add the boxCollider to the physicsRoot
        physicsRoot.addChild(boxCollider);
        physicsRoot.rotate(new BABYLON.Vector3(0, 1, 0), 0.1);

        // Enable physics on the colliders first, then the physics root of the mesh
        boxCollider.physicsImpostor = new BABYLON.PhysicsImpostor(boxCollider, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
        //physicsRoot.physicsImpostor = new BABYLON.PhysicsImpostor(physicsRoot, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0.5,restitution:1 }, scene);

        physicsRoot.position = new BABYLON.Vector3(-2.5, 1, 1);
        //physicsRoot.rotation.z = Math.PI / 6;
    });

    BABYLON.SceneLoader.ImportMesh("", "../media/", "model-hold.glb", scene, function (newMeshes) {
        // Scale loaded mesh
        newMeshes[0].scaling.scaleInPlace(0.025);
        newMeshes[0].position.set(-0.2,0,-0.7);

        // Create a physics root and add all children
        var physicsRoot = new BABYLON.Mesh("", scene);
        physicsRoot.addChild(newMeshes[0]);
        physicsRoot.rotate(new BABYLON.Vector3(0, 1, 0), 0.6);
        
        // Create a box collider
        var boxCollider = BABYLON.MeshBuilder.CreateBox("box1", { width:2.8,height:2,depth:1.6 }, scene);
        boxCollider.position.y = 0;
        boxCollider.position.z = 0;
        boxCollider.isVisible = false; // Set to false to make the collider invisible
        physicsRoot.addChild(boxCollider);

        // Enable physics on the colliders first, then the physics root of the mesh
        boxCollider.physicsImpostor = new BABYLON.PhysicsImpostor(boxCollider, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
        //physicsRoot.physicsImpostor = new BABYLON.PhysicsImpostor(physicsRoot, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0.5,restitution:1 }, scene);



        physicsRoot.position = new BABYLON.Vector3(0.7, 2, 0);
       
    });

    engine.runRenderLoop(function () {
        scene.render();
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

window.addEventListener("resize", function () {
    engine.resize();
});
