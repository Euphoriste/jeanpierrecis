$(document).ready(function () {
  const correctPassword = "ttt";
  let cubeInitialized = false;

  $("#submit-btn").on("click", checkPassword);
  $("#password-input").on("keypress", function (e) {
    if (e.which === 13) checkPassword();
  });

  function checkPassword() {
    const enteredPassword = $("#password-input").val();

    if (enteredPassword === correctPassword) {
      $("#login-screen").fadeOut(800, function () {
        $("#hello-screen").fadeIn(800);

        if (!cubeInitialized) {
          initCube();
          cubeInitialized = true;
        }
      });
    } else {
      $("#error-message")
        .text("CE MOT N’EXISTE PAS")
        .fadeIn()
        .delay(1500)
        .fadeOut();

      $("#password-input").val("");
    }
  }

  function initCube() {
    const container = document.getElementById("cube-container");

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(#ff0000);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(2.5, 2.5, 2.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Geometry
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
      color: 0x2a231d,
      roughness: 0.8,
      metalness: 0.2
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Lights (very important for mood)
    const ambientLight = new THREE.AmbientLight(0x404040, 1.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x8b0000, 1, 10);
    pointLight.position.set(3, 3, 3);
    scene.add(pointLight);

    // Controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;

    // Resize
    window.addEventListener("resize", () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    });

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }

    animate();
  }
});

