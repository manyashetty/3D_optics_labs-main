﻿"use strict";
//materials
const mat0 = new THREE.MeshBasicMaterial({ color: "black", side: THREE.DoubleSide });
const mat00 = new THREE.MeshBasicMaterial({ color: "black" });
const mat1 = new THREE.MeshBasicMaterial({ color: 0x04090a }); //postholder outside color
const mat2 = new THREE.MeshBasicMaterial({ color: 0x05256b, side: THREE.DoubleSide });  //bluegray
const mat3 = new THREE.MeshBasicMaterial({ color: "red" });
const mat4 = new THREE.MeshBasicMaterial({ color: 0x515659 }); // postcolor
const mat5 = new THREE.MeshBasicMaterial({ color: 0xe68065 }); //grey
const mat7 = new THREE.MeshBasicMaterial({ color: 0x011317, side: THREE.DoubleSide }); //postholder outside color
const mat8 = new THREE.MeshBasicMaterial();
const mat10 = new THREE.MeshBasicMaterial({ color: 0xc9dbdc, transparent: true, opacity: 0.8 }); //lens material grey
const mat_burlywood = new THREE.MeshBasicMaterial({ color: 0xDEB887 });

//define global variables related to mouse action
let rotate = false;  //should the mouse rotate the view or drag the object?
let dragItem, dragItem0, dragItem1, dragItem2;  //the object to be dragged
let active;  //element selected by the mouse
let dragging = false;  // is an object being dragged?
let deltax, deltaz, deltay;  //difference in the world coordinates of the object and the intersection point
let startX, startY, prevX, prevY;  //used for determining the rotation direction
const raycaster = new THREE.Raycaster();  //add the raycaster for picking objects with the mouse
const targetForDragging = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshBasicMaterial());
targetForDragging.rotation.x = -Math.PI * 0.5;
targetForDragging.material.visible = false;

//# of bases for elements
const elements = 3;

//arrays, so that an element can have the same index as its base
const base = new Array(elements);
const posthold = new Array(elements);
const plaque = new Array(3);
const lens = new Array(3);
const lensholder = new Array(3);
const newholder = new Array(3);

let angle;
let basetexture;
let baseangle = 0;
