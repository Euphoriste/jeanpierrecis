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

    /* =========================
       SCENE / CAMERA / RENDER
    ========================== */

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0e0c0a);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(3.6, 3.1, 3.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    /* =========================
       CANVAS TEXTURE — PIERRE
    ========================== */

    function createStoneTexture(drawGlyph) {
      const size = 1024;
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = size;
      const ctx = canvas.getContext("2d");

      // base pierre sable
      ctx.fillStyle = "#9b907b";
      ctx.fillRect(0, 0, size, size);

      // variations larges (aucun pixel isolé)
      for (let i = 0; i < 25; i++) {
        ctx.fillStyle = `rgba(140,130,110,${Math.random() * 0.06})`;
        ctx.beginPath();
        ctx.arc(
          Math.random() * size,
          Math.random() * size,
          250 + Math.random() * 300,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      // glyphes gravés très doux
      ctx.save();
      ctx.translate(size / 2, size / 2);
      ctx.strokeStyle = "rgba(70,60,50,0.35)";
      ctx.lineWidth = 14;
      ctx.lineCap = "round";
      drawGlyph(ctx);
      ctx.restore();

      const texture = new THREE.CanvasTexture(canvas);
      texture.anisotropy = 16;
      return texture;
    }

    /* =========================
       GLYPHES MEDIEVAUX
    ========================== */

    const glyphs = [
      ctx => {
        ctx.beginPath();
        ctx.arc(0, 0, 220, 0, Math.PI * 2);
        ctx.stroke();
      },
      ctx => {
        ctx.beginPath();
        ctx.moveTo(-200, 0);
        ctx.lineTo(200, 0);
        ctx.moveTo(0, -200);
        ctx.lineTo(0, 200);
        ctx.stroke();
      },
      ctx => {
        ctx.beginPath();
        ctx.moveTo(0, -220);
        ctx.lineTo(190, 160);
        ctx.lineTo(-190, 160);
        ctx.closePath();
        ctx.stroke();
      },
      ctx => {
        ctx.beginPath();
        ctx.arc(0, 0, 160, 0, Math.PI * 1.5);
        ctx.stroke();
      },
      ctx => {
        ctx.beginPath();
        ctx.rect(-180, -180, 360, 360);
        ctx.stroke();
      },
      ctx => {
        ctx.beginPath();
        ctx.moveTo(-160, -160);
        ctx.lineTo(160, 160);
        ctx.moveTo(160, -160);
        ctx.lineTo(-160, 160);
        ctx.stroke();
      }
    ];

    const materials = glyphs.map(glyph =>
      new THREE.MeshStandardMaterial({
        map: createStoneTexture(glyph),
        roughness: 0.96,
        metalness: 0.0
      })
    );

    /* =========================
       GEOMETRY — SIMPLE + USURE
    ========================== */

    const geometry = new THREE.BoxGeometry(2.4, 2.4, 2.4, 2, 2, 2);
    const pos = geometry.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const d = (Math.random() - 0.5) * 0.03;
      pos.setXYZ(
        i,
        pos.getX(i) + d,
        pos.getY(i) + d,
        pos.getZ(i) + d
      );
    }
    geometry.computeVertexNormals();

    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

    /* =========================
       LUMIÈRE MÉDIÉVALE DOUCE
    ========================== */

    scene.add(new THREE.AmbientLight(0x2a2a2a, 0.95));

    const warm = new THREE.PointLight(0xffe0b8, 1.1, 20);
    warm.position.set(5, 4, 3);
    scene.add(warm);

    const cold = new THREE.PointLight(0x7f8fa3, 0.35, 20);
    cold.position.set(-5, -4, -5);
    scene.add(cold);

    /* =========================
       CONTROLS / RESIZE
    ========================== */

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;

    window.addEventListener("resize", () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });

    /* =========================
       ANIMATION
    ========================== */

    function animate() {
      requestAnimationFrame(animate);
      cube.rotation.y += 0.0009;
      cube.rotation.x += 0.0005;
      controls.update();
      renderer.render(scene, camera);
    }

    animate();
  }
});
