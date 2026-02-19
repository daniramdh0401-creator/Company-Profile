/**
 * Three.js - Journey to the City (Company Profile Dany Ramadhan)
 * Konsep game: berjalan menuju kota futuristik (skyline + jalan bergerak)
 */
(function () {
  'use strict';

  var scene, camera, renderer, worldGroup;
  var buildings = [];
  var roadSegments = [];
  var groundPlanes = [];
  var cityLights = [];
  var gateArch = null;
  var speed = 0.22;
  var clock = { start: 0 };
  var animationId = null;
  var container = null;
  var BUILDING_COUNT = 45;
  var ROAD_SEGMENT_LENGTH = 35;
  var LIGHT_COUNT = 120;

  var PRIMARY = 0x00f5ff;
  var SECONDARY = 0x6366f1;
  var BG = 0x0b0f19;

  function init() {
    container = document.getElementById('hero-canvas-wrap');
    if (!container || typeof THREE === 'undefined') return;

    var width = container.offsetWidth;
    var height = container.offsetHeight;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(BG);
    scene.fog = new THREE.Fog(BG, 15, 85);

    camera = new THREE.PerspectiveCamera(58, width / height, 0.1, 500);
    camera.position.set(0, 2.2, 12);
    camera.lookAt(0, 0.5, -40);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    if (renderer.toneMapping !== undefined) {
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 0.9;
    }
    if (renderer.outputColorSpace !== undefined) renderer.outputColorSpace = THREE.SRGBColorSpace;
    else if (renderer.outputEncoding !== undefined) renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    worldGroup = new THREE.Group();
    scene.add(worldGroup);

    createGround();
    createRoad();
    createCityGate();
    createCity();
    createCityLights();
    createDistantSkyline();

    clock.start = performance.now() / 1000;

    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, { passive: true });

    animate();
  }

  function createGround() {
    var segs = 3;
    for (var s = 0; s < segs; s++) {
      var geom = new THREE.PlaneGeometry(120, 140);
      var mat = new THREE.MeshBasicMaterial({
        color: 0x050810,
        transparent: true,
        opacity: 0.95,
        side: THREE.DoubleSide,
      });
      var ground = new THREE.Mesh(geom, mat);
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -0.6;
      ground.position.z = -80 - s * 140;
      worldGroup.add(ground);
      groundPlanes.push(ground);
    }
  }

  function createRoad() {
    var segmentCount = 6;
    for (var s = 0; s < segmentCount; s++) {
      var geom = new THREE.PlaneGeometry(5.5, ROAD_SEGMENT_LENGTH);
      var mat = new THREE.MeshBasicMaterial({
        color: 0x0d1220,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
      });
      var road = new THREE.Mesh(geom, mat);
      road.rotation.x = -Math.PI / 2;
      road.position.y = -0.5;
      road.position.z = -s * ROAD_SEGMENT_LENGTH - 15;
      road.userData.baseZ = road.position.z;
      worldGroup.add(road);
      roadSegments.push(road);

      var lineGeom = new THREE.PlaneGeometry(0.12, ROAD_SEGMENT_LENGTH);
      var lineMat = new THREE.MeshBasicMaterial({
        color: PRIMARY,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide,
      });
      var line = new THREE.Mesh(lineGeom, lineMat);
      line.rotation.x = -Math.PI / 2;
      line.position.y = -0.45;
      line.position.z = road.position.z;
      line.userData.baseZ = line.position.z;
      worldGroup.add(line);
      roadSegments.push(line);
    }
  }

  function createCityGate() {
    var gateGroup = new THREE.Group();
    var pillarGeom = new THREE.BoxGeometry(0.8, 5, 0.6);
    var topGeom = new THREE.BoxGeometry(5, 0.5, 0.6);
    var matPrimary = new THREE.MeshBasicMaterial({
      color: PRIMARY,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    var matSecondary = new THREE.MeshBasicMaterial({
      color: SECONDARY,
      transparent: true,
      opacity: 0.2,
    });
    var left = new THREE.Mesh(pillarGeom, matPrimary.clone());
    left.position.set(-2.5, 2.5, 0);
    gateGroup.add(left);
    var right = new THREE.Mesh(pillarGeom, matPrimary.clone());
    right.position.set(2.5, 2.5, 0);
    gateGroup.add(right);
    var top = new THREE.Mesh(topGeom, matSecondary);
    top.position.set(0, 5.2, 0);
    gateGroup.add(top);
    gateGroup.position.set(0, 0, -35);
    worldGroup.add(gateGroup);
    gateArch = gateGroup;
  }

  function createCity() {
    var i, w, h, d, x, z, mesh, geom, mat, isWire;
    for (i = 0; i < BUILDING_COUNT; i++) {
      w = 1.2 + Math.random() * 2.5;
      h = 2 + Math.random() * 8;
      d = 1.2 + Math.random() * 2.2;
      x = (Math.random() - 0.5) * 14;
      z = -15 - Math.random() * 110;
      isWire = Math.random() > 0.5;

      geom = new THREE.BoxGeometry(w, h, d);
      if (isWire) {
        mat = new THREE.MeshBasicMaterial({
          color: Math.random() > 0.5 ? PRIMARY : SECONDARY,
          wireframe: true,
          transparent: true,
          opacity: 0.35,
        });
      } else {
        mat = new THREE.MeshBasicMaterial({
          color: Math.random() > 0.5 ? PRIMARY : SECONDARY,
          transparent: true,
          opacity: 0.12,
        });
      }
      mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(x, h / 2, z);
      mesh.userData.baseZ = z;
      mesh.userData.speed = speed;
      worldGroup.add(mesh);
      buildings.push(mesh);
    }
  }

  function createCityLights() {
    var positions = new Float32Array(LIGHT_COUNT * 3);
    var colors = new Float32Array(LIGHT_COUNT * 3);
    var i, r1, g1, b1, r2, g2, b2, t;
    r1 = ((PRIMARY >> 16) & 255) / 255;
    g1 = ((PRIMARY >> 8) & 255) / 255;
    b1 = (PRIMARY & 255) / 255;
    r2 = ((SECONDARY >> 16) & 255) / 255;
    g2 = ((SECONDARY >> 8) & 255) / 255;
    b2 = (SECONDARY & 255) / 255;

    for (i = 0; i < LIGHT_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = Math.random() * 12 + 0.5;
      positions[i * 3 + 2] = -Math.random() * 120 - 10;
      t = Math.random();
      colors[i * 3] = r1 * t + r2 * (1 - t);
      colors[i * 3 + 1] = g1 * t + g2 * (1 - t);
      colors[i * 3 + 2] = b1 * t + b2 * (1 - t);
    }
    var geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    var mat = new THREE.PointsMaterial({
      size: 0.25,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    var points = new THREE.Points(geom, mat);
    points.position.z = 0;
    worldGroup.add(points);
    cityLights.push({ points: points, positions: positions });
  }

  function createDistantSkyline() {
    var i, w, h, z, mesh, geom, mat;
    for (i = 0; i < 25; i++) {
      w = 3 + Math.random() * 5;
      h = 8 + Math.random() * 18;
      z = -90 - Math.random() * 60;
      geom = new THREE.BoxGeometry(w, h, 2);
      mat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? PRIMARY : SECONDARY,
        wireframe: true,
        transparent: true,
        opacity: 0.15,
      });
      mesh = new THREE.Mesh(geom, mat);
      mesh.position.set((Math.random() - 0.5) * 24, h / 2, z);
      mesh.userData.baseZ = z;
      worldGroup.add(mesh);
      buildings.push(mesh);
    }
  }

  function animate() {
    animationId = requestAnimationFrame(animate);
    var i, mesh;

    if (gateArch) {
      gateArch.position.z += speed;
      if (gateArch.position.z > 12) gateArch.position.z -= 130;
    }
    for (i = 0; i < groundPlanes.length; i++) {
      mesh = groundPlanes[i];
      mesh.position.z += speed;
      if (mesh.position.z > 30) mesh.position.z -= 140 * groundPlanes.length;
    }
    for (i = 0; i < buildings.length; i++) {
      mesh = buildings[i];
      mesh.position.z += speed;
      if (mesh.position.z > 12) mesh.position.z -= 130;
    }

    for (i = 0; i < roadSegments.length; i++) {
      mesh = roadSegments[i];
      mesh.position.z += speed;
      if (mesh.position.z > 12) mesh.position.z = -15 - ROAD_SEGMENT_LENGTH * 5;
    }

    if (cityLights.length > 0 && cityLights[0].positions) {
      var pos = cityLights[0].positions;
      for (i = 0; i < LIGHT_COUNT; i++) {
        pos[i * 3 + 2] += speed;
        if (pos[i * 3 + 2] > 15) pos[i * 3 + 2] -= 130;
      }
      cityLights[0].points.geometry.attributes.position.needsUpdate = true;
    }

    if (renderer && scene && camera) {
      renderer.render(scene, camera);
    }
  }

  function onResize() {
    if (!container || !camera || !renderer) return;
    var width = container.offsetWidth;
    var height = container.offsetHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  function onScroll() {
    var hero = document.getElementById('hero');
    if (!hero || !renderer) return;
    var rect = hero.getBoundingClientRect();
    var inView = rect.bottom > 0 && rect.top < window.innerHeight;
    renderer.domElement.style.opacity = inView ? '1' : '0';
    renderer.domElement.style.pointerEvents = inView ? 'auto' : 'none';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
