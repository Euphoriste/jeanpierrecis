$(document).ready(function () {

  /* =========================
     CONFIG
  ========================== */

  const correctPassword = "LUZ";
  let cubeInitialized = false;

  let currentLang = "pt";
  let narrationAudio = null;
  let backgroundAudio = null;

  let typingTimeout = null;
  let cursorInterval = null;
  let isTyping = false;

  const ui = {
    fr: {
      subtitle: "ENTREZ LE SECRET",
      button: "ACCÈS",
      error: "INCORRECT",
      cube: "ACCÉDER AU CUBE",
      title: "LE CUBE DES SILENCES",
      warning: "Activez l’audio avant de poursuivre l’expérience.",
      continue: "ENTRER DANS LE RÉCIT"
    },
    pt: {
      subtitle: "INSIRA O SEGREDO",
      button: "ACESSAR",
      error: "INCORRETO",
      cube: "ACESSAR O CUBO",
      title: "O CUBO DOS SILÊNCIOS",
      warning: "Ative o áudio antes de continuar a experiência.",
      continue: "ENTRAR NO RELATO"
    }
  };
  
  const storyImages = {
    STORY1: "story1.png",
    STORY2: "story2.png",
    STORY3: "story3.png",
    STORY4: "story4.png",
    STORY5: "story5.png",
    STORY6: "story6.png",
    STORY7: "story7.png",
    STORY8: "story8.png",
  };

  const storySVGs = {
    SVG1: "rato-cis.svg"
  };
  

  // ✅ PRELOAD STORY IMAGES
const preloadedImages = {};

Object.values(storyImages).forEach(src => {
  const img = new Image();
  img.src = src;
  preloadedImages[src] = img;
});


  const texts = {
    fr: `
  On raconte qu’il fut un temps ancien où la France n’avait pas encore appris à sourire à ce qui venait de loin.
  
  Les routes étaient étroites et boueuses, les villes closes sur elles-mêmes, et la vie suivait un ordre immuable fait de travail, de silence et de saisons répétées. En ces jours-là, nul n’imaginait qu’un simple jeu pût bouleverser l’équilibre du royaume.
  STORY1
  C’est alors qu’apparut un étranger venu d’au-delà des mers, d’une terre que les cartes ne savaient encore nommer. Il venait d’un pays chaud et verdoyant, où l’océan rencontrait la forêt sans fin : le Brésil.
  STORY2
  Son nom, transmis par les murmures et les récits déformés, était Ronaldinho Bruxoh.
  
  Il n’arriva ni en conquérant ni en marchand. Il ne portait ni or ni arme. Dans sa besace, il n’y avait qu’une sphère de cuir cousu. Mais sous ses pieds, cette sphère prenait vie.
  Il la faisait courir, bondir, tournoyer, comme si elle obéissait à une musique invisible. Et lorsqu’il jouait, les hommes s’arrêtaient.
  
  Les enfants accoururent les premiers. Puis les paysans, les soldats, les artisans. Bientôt, dans les champs comme sur les places, on se mit à courir derrière la balle. On cria, on rit, on tomba, on recommença.
  Une joie nouvelle se répandit dans le royaume, simple et partagée, sans distinction de rang ni de fortune.
  
  Ainsi entra en France le jeu du football, et avec lui une légèreté que le pays ne connaissait plus.
  STORY3
  Mais cette joie eut un prix.
  
  Car les hommes, désormais, passaient plus de temps à jouer qu’à travailler. Les fromagers, surtout, furent les premiers à céder à cette passion nouvelle. Ils quittèrent leurs caves trop tôt, laissèrent les meules sans surveillance, oublièrent les gestes précis et patients que demande le fromage.
  Les croûtes furent moins soignées, les affinages négligés, et dans les profondeurs fraîches, quelque chose se dérégla.
  
  Et nul ne le remarqua… sauf ceux qui vivaient là.
  
  Dans les murs, sous les planchers, dans les caves humides, vivaient les souris.
  Parmi elles se trouvait une créature singulière, ancienne et orgueilleuse, dotée d’un esprit plus aiguisé que celui de bien des hommes. Son nom était Jean-Pierre Cis.
  STORY4
  Jean-Pierre Cis détestait le bruit, la nouveauté, et plus encore la joie venue d’ailleurs. Il observait les hommes rire, courir, oublier leurs devoirs, et voyait les fromages se détériorer, les réserves diminuer, l’ordre ancien se dissoudre.
  Pour lui, ce n’était pas un jeu : c’était une profanation.
  
  Car Jean-Pierre Cis n’était pas une souris ordinaire. Il était enchanteur, héritier d’une magie ancienne née dans l’ombre des pierres. Et dans son cœur sec et jaloux, il décida que cet étranger avait trop donné à la France… et trop pris en retour.
  
  Une nuit sans lune, alors que les cloches dormaient, Jean-Pierre Cis grimpa jusqu’au sommet d’une cathédrale encore inachevée. Le vent se leva, les poutres gémirent, et le silence pesa comme une menace.
  Là, face au ciel obscur, il prononça les paroles qui devaient marquer les siècles.
  
  Il maudit toutes les souris de France, et toutes celles qui naîtraient après elles, afin qu’elles portent en elles une aversion instinctive pour chaque Brésilien posant le pied sur cette terre.
  Il ordonna qu’elles troublent leurs pas, dérèglent leur chance, multiplient contretemps et malheurs légers mais incessants. Non pour tuer, non pour détruire, mais pour fatiguer, user, décourager.
  STORY5
  De cette malédiction naquit un mot, forgé dans l’ombre même de son esprit, mêlant langues et rancunes anciennes :
  SVG1
  Le sort s’enracina profondément. Il entra dans les pierres des villes, dans les caves, dans les murs, dans les ombres. Et lorsque Ronaldinho Bruxoh quitta la France, la magie resta.
  
  Les siècles passèrent. Les royaumes changèrent. Les guerres vinrent et s’en allèrent. Les hommes oublièrent l’origine du jeu, mais le football demeura, tout comme la malédiction.
  Et chaque fois qu’un Brésilien arrivait en France, quelque chose semblait se dérégler. Rien de grand, rien de tragique, mais toujours ces incidents absurdes, ces résistances invisibles, comme si le monde lui-même hésitait à l’accueillir.
  STORY6
  STORY7
  STORY8
  Jean-Pierre Cis vécut longtemps, nourri par la persistance de son sort. Puis un jour, même sa magie céda au poids du temps.
  On retrouva son corps dans des circonstances trop étranges pour être comprises. On l’enterra finalement dans un lieu réservé aux existences singulières : le cimetière du Père-Lachaise.
  
  Sa tombe existe encore, dit-on. Discrète. Silencieuse.
  
  Mais la légende ne s’arrête pas là.
  
  Car Jean-Pierre Cis avait lié sa malédiction à un objet.
  Non pas une relique sacrée, ni une arme, ni un grimoire.
  Un simple cube.
  
  La légende ne dit rien de plus. Elle n’explique pas. Elle suggère.
  
  Tant que le cube restera sans couleur, l’ombre persistera.
  
  Lorsque, par des liens nés sans contrainte entre des terres éloignées,
  ses faces recommenceront à se souvenir,
  alors ce qui pèse s’effacera
  — sans bruit, sans témoin, sans retour.
  
  Ainsi, encore aujourd’hui, les souris veillent.
  Et la France, sans le savoir, porte toujours la trace d’un jeu qui apporta la joie…
  et d’une colère qui ne sut jamais apprendre à la partager.
  `,
  
    pt: `
  Conta-se que houve um tempo antigo em que a França ainda não havia aprendido a sorrir para aquilo que vinha de longe.
  
  As estradas eram estreitas e lamacentas, as cidades fechadas sobre si mesmas, e a vida seguia uma ordem imutável feita de trabalho, silêncio e estações que se repetiam. Naqueles dias, ninguém imaginava que um simples jogo pudesse abalar o equilíbrio do reino.
  STORY1
  Foi então que surgiu um estrangeiro vindo de além-mar, de uma terra que os mapas ainda não sabiam nomear. Ele vinha de um país quente e verdejante, onde o oceano encontra a floresta sem fim: o Brasil.
  STORY2
  Seu nome, transmitido por murmúrios e relatos distorcidos, era Ronaldinho Bruxoh.
  
  Ele não chegou como conquistador nem como mercador. Não trazia ouro nem armas. Em sua sacola, havia apenas uma esfera de couro costurado. Mas sob seus pés, essa esfera ganhava vida.
  Ele a fazia correr, saltar, girar, como se obedecesse a uma música invisível. E quando jogava, os homens paravam.
  
  As crianças foram as primeiras a correr. Depois vieram os camponeses, os soldados, os artesãos. Logo, nos campos e nas praças, todos passaram a correr atrás da bola. Gritava-se, ria-se, caía-se, recomeçava-se.
  Uma alegria nova espalhou-se pelo reino, simples e compartilhada, sem distinção de posição ou fortuna.
  
  Assim entrou na França o jogo do futebol, e com ele uma leveza que o país já não conhecia.
  STORY3
  Mas essa alegria teve um preço.
  
  Pois os homens, a partir de então, passaram mais tempo jogando do que trabalhando. Os queijeiros, sobretudo, foram os primeiros a ceder a essa nova paixão. Abandonaram suas caves cedo demais, deixaram as rodas de queijo sem vigilância, esqueceram os gestos precisos e pacientes que o queijo exige.
  As cascas foram menos cuidadas, as maturações negligenciadas, e nas profundezas frescas algo se desajustou.
  
  E ninguém percebeu… exceto aqueles que viviam ali.
  
  Nos muros, sob os assoalhos, nas caves úmidas, viviam os ratos.
  Entre eles havia uma criatura singular, antiga e orgulhosa, dotada de um espírito mais afiado do que o de muitos homens. Seu nome era Jean-Pierre Cis.
  STORY4
  Jean-Pierre Cis detestava o barulho, a novidade e, mais ainda, a alegria vinda de fora. Observava os homens rirem, correrem, esquecerem seus deveres, e via os queijos se deteriorarem, as reservas diminuírem, a antiga ordem se dissolver.
  Para ele, não era um jogo: era uma profanação.
  
  Pois Jean-Pierre Cis não era um rato comum. Ele era um encantador, herdeiro de uma magia antiga nascida à sombra das pedras. E em seu coração seco e invejoso, decidiu que aquele estrangeiro havia dado demais à França… e tomado demais em troca.
  
  Numa noite sem lua, enquanto os sinos dormiam, Jean-Pierre Cis subiu até o topo de uma catedral ainda inacabada. O vento se ergueu, as vigas gemeram, e o silêncio pesou como uma ameaça.
  Ali, diante do céu escuro, ele pronunciou as palavras que marcariam os séculos.
  
  Ele amaldiçoou todos os ratos da França, e todos aqueles que nasceriam depois deles, para que carregassem em si uma aversão instintiva a cada brasileiro que pisasse nessa terra.
  Ordenou que perturbassem seus passos, desregulassem sua sorte, multiplicassem contratempos e pequenos infortúnios constantes. Não para matar, não para destruir, mas para cansar, desgastar, desencorajar.
  STORY5
  Dessa maldição nasceu uma palavra, forjada na própria sombra de seu espírito, misturando línguas e rancores antigos:
  SVG1
  O feitiço criou raízes profundas. Entrou nas pedras das cidades, nas caves, nos muros, nas sombras. E quando Ronaldinho Bruxoh deixou a França, a magia permaneceu.
  
  Os séculos passaram. Os reinos mudaram. As guerras vieram e se foram. Os homens esqueceram a origem do jogo, mas o futebol permaneceu, assim como a maldição.
  E cada vez que um brasileiro chegava à França, algo parecia se desregular. Nada grandioso, nada trágico, mas sempre esses incidentes absurdos, essas resistências invisíveis, como se o próprio mundo hesitasse em acolhê-lo.
  STORY6
  STORY7
  STORY8
  Jean-Pierre Cis viveu muito tempo, alimentado pela persistência de seu feitiço. Depois, um dia, até mesmo sua magia cedeu ao peso do tempo.
  Seu corpo foi encontrado em circunstâncias estranhas demais para serem compreendidas. Acabaram por enterrá-lo num lugar reservado às existências singulares: o cemitério do Père-Lachaise.
  
  Sua tumba ainda existe, dizem. Discreta. Silenciosa.
  
  Mas a lenda não termina aí.
  
  Pois Jean-Pierre Cis havia ligado sua maldição a um objeto.
  Não uma relíquia sagrada, nem uma arma, nem um grimório.
  Um simples cubo.
  
  A lenda não diz mais nada. Ela não explica. Ela sugere.
  
  Enquanto o cubo permanecer sem cor, a sombra persistirá.
  
  Quando, por laços nascidos sem imposição entre terras distantes,
  suas faces começarem a se lembrar,
  então aquilo que pesa se apagará
  — sem ruído, sem testemunha, sem retorno.
  
  E assim, ainda hoje, os ratos vigiam.
  E a França, sem o saber, continua a carregar a marca de um jogo que trouxe alegria…
  e de uma cólera que nunca aprendeu a compartilhá-la.
  `
  };
  

  /* =========================
     APPLY LANGUAGE
  ========================== */
  function startBackgroundMusic() {
  if (backgroundAudio) return;

  backgroundAudio = new Audio("background.mp3");
  backgroundAudio.volume = 0.09;
  backgroundAudio.loop = false; // IMPORTANT: disable native loop

  // 🔁 Manual loop (works everywhere)
  backgroundAudio.addEventListener("ended", () => {
    backgroundAudio.currentTime = 0;
    backgroundAudio.play().catch(() => {});
  });

  backgroundAudio.play().catch(() => {
    // autoplay blocked until user interaction
  });
}

  

  function applyLanguage() {
    $(".subtitle").text(ui[currentLang].subtitle);
    $("#submit-btn").text(ui[currentLang].button);
    $("#cube-btn").text(ui[currentLang].cube);
    $("#story-title-img").fadeOut(150, function () {
  $(this)
    .attr("src", currentLang === "fr" ? "titreFR.png" : "titreBR.png")
    .fadeIn(300);
});

$(".intro-text").text(ui[currentLang].warning);
$("#intro-btn").text(ui[currentLang].continue);


    $(".lang-flag").removeClass("active");
    currentLang === "pt"
      ? $("#flag-pt").addClass("active")
      : $("#flag-fr").addClass("active");
  }

  applyLanguage();

  /* =========================
     LOGIN
  ========================== */

  $("#submit-btn").on("click", checkPassword);
  $("#password-input").on("keypress", function (e) {
    if (e.which === 13) checkPassword();
  });

  function checkPassword() {
    $("#return-btn").hide();
    const enteredPassword = $("#password-input").val();

    if (enteredPassword.trim().toUpperCase() === correctPassword) {
      startBackgroundMusic();
      $("#login-screen").fadeOut(800, function () {
        $("#intro-screen").removeClass("hidden").fadeIn(800);
      });      
    } else {
      $("#error-message")
        .text(ui[currentLang].error)
        .fadeIn()
        .delay(1500)
        .fadeOut();

      $("#password-input").val("").focus();
    }
  }

  $("#intro-btn").on("click", function () {
  
    $("#intro-screen").fadeOut(800, function () {
      $("#text-screen").removeClass("hidden").fadeIn(800);
      $("#return-btn").fadeIn(600); // 👈 affiché ici aussi
      startTyping();
    });
  });
  
  

  /* =========================
     TYPEWRITER + SKIP
  ========================== */

  function playNarration() {
    if (backgroundAudio) {
      backgroundAudio.volume = 0.09;
    }

    // 🔒 Sécurité absolue : audio uniquement sur l'écran du texte
    if (!$("#text-screen").is(":visible")) return;
  
    stopNarration();
  
    const audioSrc =
      currentLang === "fr" ? "audioFR.mp3" : "audioBR.mp3";
  
    narrationAudio = new Audio(audioSrc);
    narrationAudio.volume = 0.9;
  
    narrationAudio.play().catch(() => {
      // silence volontaire (autoplay policy)
    });
  }
  
  
  function stopNarration() {
    if (backgroundAudio) {
      backgroundAudio.volume = 0.09;
    }
    if (narrationAudio) {
      narrationAudio.pause();
      narrationAudio.currentTime = 0;
      narrationAudio = null;
    }
  }

  
  function insertStoryImage(target, key, cursor) {
    const wrapper = $("<div>")
      .addClass("story-image-wrapper");
  
    const img = $("<img>")
      .attr("src", storyImages[key])
      .addClass("story-image")
      .attr("alt", key);
  
    wrapper.append(img);
  
    if (cursor && cursor.length) {
      cursor.before(wrapper);
    } else {
      target.append(wrapper);
    }
  }
  
  function insertStorySVG(target, key, cursor) {
    const wrapper = $("<div>")
      .addClass("story-image-wrapper story-svg-wrapper");
  
    $.get(storySVGs[key], function (data) {
      const svg = $(data).find("svg");
      wrapper.append(svg);
    });
  
    if (cursor && cursor.length) {
      cursor.before(wrapper);
    } else {
      target.append(wrapper);
    }
  }

  function renderFullStory() {
    isTyping = false;
    clearTimeout(typingTimeout);
    stopCursorBlink();
    stopNarration();
  
    const target = $("#manuscript");
    const manuscriptText = texts[currentLang];
  
    target.empty();
  
    let index = 0;
  
    while (index < manuscriptText.length) {
      let matched = false;
  
      // SVGs
      for (const key in storySVGs) {
        if (manuscriptText.startsWith(key, index)) {
          insertStorySVG(target, key, null);
          index += key.length;
          matched = true;
          break;
        }
      }
      if (matched) continue;
  
      // Images
      for (const key in storyImages) {
        if (manuscriptText.startsWith(key, index)) {
          insertStoryImage(target, key, null);
          index += key.length;
          matched = true;
          break;
        }
      }
      if (matched) continue;
  
      // Normal text
      target.append(manuscriptText.charAt(index));
      index++;
    }
  
    $("#cursor").remove();
    $("#skip-btn").hide();
    $("#cube-btn").fadeIn(800);
  }
  
  

  
  function startTyping() {
    playNarration();

    const target = $("#manuscript");
    const manuscriptText = texts[currentLang];

    target.empty();
    clearInterval(cursorInterval);
    clearTimeout(typingTimeout);

    $("#cube-btn").hide();
    $("#skip-btn").show();

    isTyping = true;

    const cursor = $("<span>").attr("id", "cursor").text("▍");
    target.append(cursor);

    let index = 0;

    function typeChar() {
      if (!isTyping) return;

      if (index >= manuscriptText.length) {
        finishTyping();
        return;
      }

      for (const key in storyImages) {
        if (manuscriptText.startsWith(key, index)) {
          insertStoryImage(target, key, cursor);
          index += key.length;
          typingTimeout = setTimeout(typeChar, 600);
          return;
        }
      }
      for (const key in storySVGs) {
        if (manuscriptText.startsWith(key, index)) {
          insertStorySVG(target, key, cursor);
          index += key.length;
          typingTimeout = setTimeout(typeChar, 800);
          return;
        }
      }
      
      // Normal character typing
      const char = manuscriptText.charAt(index);
      cursor.before(char);
      index++;

      let delay = 68;
      if (char === "\n") delay = 300;
      else if (char === ".") delay = 300;
      else if (char === ",") delay = 150;

      typingTimeout = setTimeout(typeChar, delay);
    }

    function finishTyping() {
      isTyping = false;
      clearTimeout(typingTimeout);
      stopCursorBlink();
      stopNarration();
    
      $("#skip-btn").hide();
      $("#cube-btn").fadeIn(1200);
      $("#cursor").remove();
    }
    

    $("#skip-btn").off("click").on("click", renderFullStory);

    startCursorBlink();
    typeChar();
  }

  function startCursorBlink() {
    const cursor = $("#cursor");
    cursorInterval = setInterval(() => {
      cursor.css("opacity", cursor.css("opacity") === "0" ? "1" : "0");
    }, 500);
  }

  function stopCursorBlink() {
    clearInterval(cursorInterval);
    $("#cursor").css("opacity", "1");
  }

  /* =========================
     LANGUAGE SWITCH
  ========================== */

  $("#flag-pt").on("click", function () {
    stopNarration();
    if (currentLang !== "pt") {
      currentLang = "pt";
      applyLanguage();
      if (!$("#text-screen").hasClass("hidden")) startTyping();
    }
  });

  $("#flag-fr").on("click", function () {
    stopNarration();
    if (currentLang !== "fr") {
      currentLang = "fr";
      applyLanguage();
      if (!$("#text-screen").hasClass("hidden")) startTyping();
    }
  });

  /* =========================
     BUTTON → CUBE
  ========================== */

  $("#cube-btn").on("click", function () {
    stopNarration();
    $("#text-screen").fadeOut(800, function () {
      $(".lang-flag").fadeOut(100);
      $("#hello-screen").fadeIn(800);
  
      showCubePhrase(currentLang); // 👈 ICI
  
      if (!cubeInitialized) {
        initCube();
        cubeInitialized = true;
      }
    });
  });
  

  $("#return-btn").on("click", function () {

    // 🔁 Si on est sur le cube → retour au texte
    if ($("#hello-screen").is(":visible")) {
  
      $("#hello-screen").fadeOut(600, function () {
        $(".lang-flag").fadeIn(400);
        $("#text-screen").fadeIn(800);
      });
  
    } 
    // 🔁 Si on est sur le texte → retour à l’intro
    else if ($("#text-screen").is(":visible")) {
  
      stopNarration(); // coupe l’audio si en cours
  
      $("#text-screen").fadeOut(600, function () {
        $("#return-btn").fadeOut(2);
        $("#intro-screen").fadeIn(800);
      });
  
    }
  
  });
  
  
  

  /* =========================
     THREE.JS CUBE (IMAGES)
  ========================== */

  function initCube() {
    const container = document.getElementById("cube-container");

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0e0c0a);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(3.6, 3.1, 3.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);



/* ===== TEXTURES ===== */

const loader = new THREE.TextureLoader();

const textures = [
  loader.load("cube1.png"), // droite
  loader.load("cube2.png"), // gauche
  loader.load("cube3.png"), // haut
  loader.load("cube4.png"), // bas
  loader.load("cube5.png"), // devant
  loader.load("cube6.png")  // derrière
];

textures.forEach(texture => {
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
});

/* ===== MATERIALS ===== */

const materials = textures.map(texture =>
  new THREE.MeshBasicMaterial({ map: texture })
);


    /* ===== GEOMETRY ===== */

    const geometry = new THREE.BoxGeometry(2.4, 2.4, 2.4);
    const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);

function updateResponsiveCube() {
  const w = window.innerWidth;

  if (w <= 600) {
    // 📱 Mobile
    cube.scale.set(0.6, 0.6, 0.6);
    camera.position.set(4.2, 3.8, 4.2);

  } else if (w <= 1024) {
    // 📱 Tablette
    cube.scale.set(0.85, 0.85, 0.85);
    camera.position.set(3.6, 3.3, 3.6);

  } else {
    // 💻 Desktop
    cube.scale.set(1, 1, 1);
    camera.position.set(3.6, 3.1, 3.5);
  }

  camera.lookAt(0, 0, 0);
}


updateResponsiveCube();

    /* ===== CONTROLS ===== */

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;

    window.addEventListener("resize", () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      updateResponsiveCube();
    });
    

    /* ===== ANIMATION ===== */

    function animate() {
      requestAnimationFrame(animate);
      cube.rotation.y += 0.0009;
      cube.rotation.x += 0.0005;
      controls.update();
      renderer.render(scene, camera);
    }

    animate();
  }

  $("#password-input").focus();

});

function showCubePhrase(lang) {
  const phraseFR = "NAS LEMBRANÇAS A LUZ NASCERÁ";
  const phrasePT = "NAS LEMBRANÇAS A LUZ NASCERÁ";

  const phrase = lang === "fr" ? phraseFR : phrasePT;

  const container = $("#cube-phrase");
  container.show().empty();

  [...phrase].forEach((char, i) => {
    const span = $("<span>")
      .addClass("cube-letter")
      .text(char === " " ? "\u00A0" : char)
      .css("animation-delay", `${i * 0.12}s`);

    container.append(span);
  });
}





