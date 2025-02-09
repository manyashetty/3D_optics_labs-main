let radius = 12.7 / 10;
//different lenses
const lensb = [51.68 / 10, 4.585 / 10];
//const lensa = [25.943 / 10, 6.3213 / 10];
const lensa = [19.69 / 10, 7.643 / 10];
//const lensb = [77.52 / 10, 4.047 / 10];
//const lensb = [103.36 / 10, 3.783 / 10];
//const lensc = [102.577 / 10, 4.578 / 10];
const lensc = [50.806 / 10, 6.226 / 10];
//const lensc = [38.085/ 10, 7.360/ 10];

function makeBoard() {
    const groundmesh = new THREE.Mesh(new THREE.PlaneGeometry(6, 60));
    const loader = new THREE.TextureLoader();
    loader.load('board.jpg', (texture) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.NearestFilter;
        texture.repeat.set(6, 60);
        groundmesh.material = new THREE.MeshBasicMaterial({ map: texture });
        render();
    });
    return groundmesh;
}

function makeTable() {
    const geometry = new THREE.PlaneGeometry(26, 60);
    const mat = new THREE.MeshBasicMaterial({ color: 0xa10d21 });
    const tablemesh = new THREE.Mesh(geometry, mat);
    return tablemesh;
}

function makeHolderblock() {
    const geometry = new THREE.BoxGeometry(2, 2, 24);
    const mat = new THREE.MeshBasicMaterial({ color: 0xcc3608 });
    const box = new THREE.Mesh(geometry, mat);
    const cgeometry = new THREE.CircleGeometry(0.3, 32);
    const circle1 = new THREE.Mesh(cgeometry, mat0);
    circle1.rotation.x = Math.PI / 2.
    circle2 = circle1.clone();
    circle3 = circle1.clone();
    circle1.position.set(0, 1.02, 10);
    circle2.position.set(0, 1.02, 0);
    circle3.position.set(0, 1.02, -10);
    box.add(circle1);
    box.add(circle2);
    box.add(circle3)
    return box;
}

function holderText() {
    const geometry = new THREE.PlaneGeometry(2, 1);
    const holderplaque = new THREE.Mesh(geometry);
    return holderplaque;
}

function makeRailbox() {
    const geometry = new THREE.BoxGeometry(6.2, 0.25, 60);
    const box = new THREE.Mesh(geometry, mat0);
    return box;
}

function makeRail() {
    const railmesh = new THREE.Mesh(new THREE.BoxGeometry(1, 0.5, 60));
    const loader = new THREE.TextureLoader();
    // load a resource
    loader.load("scale.jpg", (texture1) => {
        texture1.wrapS = THREE.RepeatWrapping;
        texture1.wrapT = THREE.RepeatWrapping;
        texture1.magFilter = THREE.NearestFilter;
        texture1.repeat.set(1, 60);
        mat8.map = texture1;
        const railmaterial = [
            mat00,
            mat00,
            mat8,
            mat00,
            mat00,
            mat00,
        ];
        railmesh.material = railmaterial;
        render();
    });
    return railmesh;
}

function makeBase(x, z, w) {
    const geometry = new THREE.BoxGeometry(4, 0.25, w);
    const material = [
        mat00,
        mat00,
        mat1,
        mat00,
        mat00,
        mat00,
    ];
    const obj1 = new THREE.Mesh(geometry, material);
    obj1.position.y = 0.125;  //bottom of base is at ground
    obj1.position.x = x;
    obj1.position.z = z;
    return obj1;
}

function makePostholder(height) {
    const singleGeometry = new THREE.Geometry();
    const geometry0 = new THREE.CylinderGeometry(0.25, 0.25, height, 16, 1, 1);
    const postholder0 = new THREE.Mesh(geometry0);  //inner cylinder
    postholder0.position.y = 0.4 + height / 2;  //bottom of postholdertube is 0.4 units above ground

    const geometry1 = new THREE.CylinderGeometry(0.5, 0.5, height, 16, 1, 1);
    const postholder1 = new THREE.Mesh(geometry1);  //outer cylinder
    postholder1.position.y = 0.4 + height / 2;

    const geometry2 = new THREE.RingGeometry(0.25, 0.5, 16);
    const postholder2 = new THREE.Mesh(geometry2);
    postholder2.position.y = height + 0.4;  //top cap
    postholder2.rotation.x = -Math.PI * 0.5;

    const geometry3 = new THREE.CylinderGeometry(0.25, 0.25, 0.2, 16, 1);
    const postholder3 = new THREE.Mesh(geometry3);  //knob
    postholder3.position.y = height;
    postholder3.position.z = 0.6;
    postholder3.rotation.x = -Math.PI * 0.5;

    const geometry4 = new THREE.CylinderGeometry(1, 1, 0.1, 16);
    const postholder4 = new THREE.Mesh(geometry4);  // bottom plate to hold angle scale
    postholder4.position.y = 0.3;

    postholder0.updateMatrix();
    postholder1.updateMatrix();
    postholder2.updateMatrix();
    postholder3.updateMatrix();
    postholder4.updateMatrix();
    singleGeometry.merge(postholder0.geometry, postholder0.matrix, 0);
    singleGeometry.merge(postholder1.geometry, postholder1.matrix, 1);
    singleGeometry.merge(postholder2.geometry, postholder2.matrix, 1);
    singleGeometry.merge(postholder3.geometry, postholder3.matrix, 3);
    singleGeometry.merge(postholder4.geometry, postholder4.matrix, 4);

    const postmaterial = [
        mat0,
        mat1,
        mat1,
        mat2,
        mat5,
        mat5,
    ];
    const holdermesh = new THREE.Mesh(singleGeometry, postmaterial);
    return holdermesh;
}

function makeScreenholder() {
    const singleGeometry = new THREE.Geometry();
    const geometry0 = new THREE.CylinderGeometry(0.24, 0.24, 3.2, 16, 1);
    const post0 = new THREE.Mesh(geometry0);  //this is the post
    post0.position.y = 2;  //the post is 3.2 units high and its bottom is at y = 0.4
    post0.updateMatrix();
    singleGeometry.merge(post0.geometry, post0.matrix);
    const holdermaterial = new THREE.MeshBasicMaterial({ color: 0x0f4780 });
    const postmesh = new THREE.Mesh(singleGeometry, holdermaterial);
    return postmesh;
}

function makeScreen() {
    const geometry1 = new THREE.BoxGeometry(4, 2, 0.2);
    const screenmesh = new THREE.Mesh(geometry1, screenmaterial);
    return screenmesh;
}
function makeLamp() {
    const singleGeometry = new THREE.Geometry();

    const geometry0 = new THREE.BoxGeometry(1.6, 2, 1.6);
    const box = new THREE.Mesh(geometry0);
    box.position.y = 4.6;
    box.position.z = 0.8;

    const geometry4 = new THREE.CylinderGeometry(0.24, 0.24, 2.8, 16);
    const pol4 = new THREE.Mesh(geometry4);
    pol4.position.y = 2.4;

    box.updateMatrix();
    pol4.updateMatrix();

    singleGeometry.merge(pol4.geometry, pol4.matrix, 0);
    singleGeometry.merge(box.geometry, box.matrix, 1);

    const lampmat = [
        mat00,
        mat1,
        mat1,
        mat00,
        mat00,
        mat00,
        mat00,

    ];

    const lmesh = new THREE.Mesh(singleGeometry, lampmat);
    const light = makeLight();
    lmesh.add(light);
    return lmesh;

}
function makeLight() {
    const geometry = new THREE.PlaneGeometry(1, 1);
    const lampmaterial = makeLamptexture();
    const lightmesh = new THREE.Mesh(geometry, lampmaterial);
    lightmesh.rotation.y = Math.PI;
    lightmesh.position.z = -0.01;
    lightmesh.position.y = 4.6;
    return lightmesh;
}


function makeLensholder() {
    const singleGeometry = new THREE.Geometry();

    const geometry0 = new THREE.CylinderGeometry(1.3, 1.3, 0.1, 16, 1, 1);
    const pol0 = new THREE.Mesh(geometry0);  //inner cylinder
    pol0.rotation.x = -Math.PI * 0.5;

    const geometry1 = new THREE.CylinderGeometry(1.4, 1.4, 0.1, 16, 1, 1);
    const pol1 = new THREE.Mesh(geometry1);  //outer cylinder
    pol1.rotation.x = -Math.PI * 0.5;

    const geometry2 = new THREE.RingGeometry(1.3, 1.4, 16);  //top cap
    const pol2 = new THREE.Mesh(geometry2);
    pol2.position.z = 0.05


    const geometry3 = new THREE.RingGeometry(1.3, 1.4, 16);  //bottom cap
    const pol3 = new THREE.Mesh(geometry3);
    pol3.position.z = -0.05

    const geometry4 = new THREE.CylinderGeometry(0.24, 0.24, 2.8, 16);
    const pol4 = new THREE.Mesh(geometry4);
    pol4.position.y = -2.8;  //the post is 2.8 units high and its bottom is at y = 0.4

    pol0.updateMatrix();
    pol1.updateMatrix();
    pol2.updateMatrix();
    pol3.updateMatrix();
    pol4.updateMatrix();

    singleGeometry.merge(pol4.geometry, pol4.matrix, 0);
    singleGeometry.merge(pol0.geometry, pol0.matrix, 1);
    singleGeometry.merge(pol1.geometry, pol1.matrix, 1);
    singleGeometry.merge(pol2.geometry, pol2.matrix, 1);
    singleGeometry.merge(pol3.geometry, pol3.matrix, 1);

    const polmaterial = [
        mat0,
        mat7,

    ];
    const pmesh = new THREE.Mesh(singleGeometry, polmaterial);
    return pmesh;
}

function makePlanoconvex(lens) {
    R1 = lens[0];
    Tc = lens[1];
    const singleGeometry = new THREE.Geometry();
    const angle = Math.asin(radius / R1);
    const Te = Tc - R1 * (1 - Math.cos(angle));
    const position = Te / 2

    const geometry0 = new THREE.SphereGeometry(R1, 32, 32, 0, Math.PI * 2, 0, angle);
    const plan0 = new THREE.Mesh(geometry0);  //curved side
    plan0.rotation.x = Math.PI * 0.5;
    plan0.position.z = -R1 + Tc;


    const geometry1 = new THREE.CylinderGeometry(radius, radius, Te, 32);
    const plan1 = new THREE.Mesh(geometry1);  //plane side
    plan1.rotation.x = Math.PI * 0.5;
    plan1.position.z = position;

    plan0.updateMatrix();
    plan1.updateMatrix();

    singleGeometry.merge(plan0.geometry, plan0.matrix);
    singleGeometry.merge(plan1.geometry, plan1.matrix);

    const planmesh = new THREE.Mesh(singleGeometry, mat10);
    return planmesh;
}
function makeBiconvex(lens) {
    R1 = lens[0];
    Tc = lens[1];
    const singleGeometry = new THREE.Geometry();
    const angle = Math.asin(radius / R1);
    const Te = Tc - 2 * R1 * (1 - Math.cos(angle));
    //const position = Te / 2

    const geometry0 = new THREE.SphereGeometry(R1, 32, 32, 0, Math.PI * 2, 0, angle);
    const plan0 = new THREE.Mesh(geometry0);  //curved side
    plan0.rotation.x = Math.PI * 0.5;
    plan0.position.z = -R1 + Tc / 2;

    const plan3 = new THREE.Mesh(geometry0);
    plan3.rotation.x = -Math.PI * 0.5;
    plan3.position.z = R1 - Tc / 2;

    const geometry1 = new THREE.CylinderGeometry(radius, radius, Te, 32);
    const plan1 = new THREE.Mesh(geometry1);  //plane side
    plan1.rotation.x = Math.PI * 0.5;
    //plan1.position.z = position;

    plan0.updateMatrix();
    plan1.updateMatrix();
    plan3.updateMatrix();

    singleGeometry.merge(plan0.geometry, plan0.matrix);
    singleGeometry.merge(plan1.geometry, plan1.matrix);
    singleGeometry.merge(plan3.geometry, plan3.matrix);

    const planmesh = new THREE.Mesh(singleGeometry, mat10);
    return planmesh;
}
function makeApertureholder() {
    const ringplane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1.1));
    ringplane.material = mat7;
    ringplane.rotation.x = -Math.PI * 0.5;
    ringplane.position.y = 2.4;
    ringplane.position.z = 0.05;
    posthold[1].add(ringplane);

    const ringplane2 = new THREE.Mesh(new THREE.PlaneGeometry(1, 1));
    ringplane2.material = mat7;

    ringplane2.position.y = 2.85;
    ringplane2.position.z = 0.6;
    posthold[1].add(ringplane2);

    const cgeometry = new THREE.CircleGeometry(0.3, 32);
    const circle1 = new THREE.Mesh(cgeometry, mat0);
    circle1.rotation.x = Math.PI / 2.
    circle1.position.y = 2.42;
    posthold[1].add(circle1);
}
function makeRing() {
    const ringgeometry = new THREE.RingGeometry(beamradius, 1.4, 16);
    const ring = new THREE.Mesh(ringgeometry, mat7);
    ring.position.y = 4.6;
    ring.position.z = 0.6;
    return ring;
}