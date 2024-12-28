// Track frame rendering time for CPU usage
let lastTime = performance.now();
let frameCount = 0;
let startTime = lastTime;

function render() {
    // Three.js rendering logic
    renderer.render(scene, camera);
    frameCount++;

    // Calculate CPU frame time
    const currentTime = performance.now();
    const elapsedTime = currentTime - lastTime;
    lastTime = currentTime;

    console.log(`Frame Time: ${elapsedTime.toFixed(2)} ms`);

    // Memory usage (Chrome-only)
    if (performance.memory) {
        const memory = performance.memory;
        console.log(`JS Heap Size: ${memory.usedJSHeapSize / 1024 / 1024} MB`);
    }

    // Request next frame
    requestAnimationFrame(render);
}

// Start rendering
render();
