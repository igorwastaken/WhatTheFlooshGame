import kaboom from "kaboom";

// Functions
function formatCompactNumber(number) {
  const formatter = Intl.NumberFormat("en-US", { notation: "compact" });
  return formatter.format(Number(number));
}

// Main
export default function MainMenu() {
  const padding = 20; // Define o valor do padding
  const maxScore = formatCompactNumber(localStorage.getItem("score"));
  
  var afkTimeout = 0;
  var selectedButtonIndex = 0;
  let back = add([
      sprite("background", {width: width(), height: height()}),
      layer("bg"),
      fixed(),
  ]);
  // Main title
  add([
    text(`What The Floosh Game`, {
      size: 24,
      width: width() - padding * 2, // Reduz a largura do texto pelo padding
      align: "center",
    }),
    pos(width() / 2, height() * 0.35 - padding), // Ajusta a posição vertical pelo padding
    anchor("center"),
    z(3),
  ]);
  
add([
  sprite("coin"), 
  pos(padding, padding), 
  scale(0.25),
  "coins",
  z(3),
]);

add([
  text(formatCompactNumber(localStorage.getItem("coins")), {
    size: 18,
  }),
  pos(padding + 30, padding + 3), // Ajuste aqui para centralizar verticalmente
  "coins",
  z(3),
]);

  // Menu buttons
  const buttons = [
    { label: "Jogar", scene: "difficulty", y: height() * 0.4 },
    { label: "Créditos", scene: "credits", y: height() * 0.5 },
    { label: "Estatísticas", scene: "stats", y: height() * 0.6 },
  ];

  buttons.forEach(({ label, scene, y }, index) => {
    const btn = add([
      text(label, {
        size: 16,
        width: width() - padding * 2, // Reduz a largura do texto pelo padding
        align: "center",
      }),
      pos(width() / 2, y),
      anchor("center"),
      area(),
      "btn",
      z(3),
      {
        clickAction: scene,
      },
      { selected: index === selectedButtonIndex }
    ]);

    btn.onUpdate(() => {
      btn.textSize = btn.selected ? 18 : 16;
    });

    // Add touch support for mobile devices
    btn.onClick(() => {
      go(scene);
      play("ui:click");
    });
  });

  function updateButtonSelection() {
    buttons.forEach((_, index) => {
      const btn = get("btn")[index];
      btn.selected = index === selectedButtonIndex;
    });
  }

  function activateSelectedButton() {
    const btn = get("btn")[selectedButtonIndex];
    go(btn.clickAction);
    play("ui:click");
  }

  onKeyPress("enter", activateSelectedButton);
  onKeyPress("space", activateSelectedButton);
  onKeyPress("up", () => {
    selectedButtonIndex = (selectedButtonIndex - 1 + buttons.length) % buttons.length;
    updateButtonSelection();
  });
  onKeyPress("down", () => {
    selectedButtonIndex = (selectedButtonIndex + 1) % buttons.length;
    updateButtonSelection();
  });

  updateButtonSelection();

  // Clouds and stars background
  for (let clouds = 0; clouds < 50; clouds++) {
    add([
      sprite("star"),
      area(),
      pos(rand(padding, width() - padding), rand(padding, height() - padding)),
      scale(rand(0.1, 0.3)),
      rotate(rand(0, 360)),
      "stars",
    ]);
  }

  function spawnClouds() {
    const recta = add([
      pos(width(), rand(height())),
      sprite("cloud"),
      scale(0.3),
      area(),
      offscreen({
        destroy: true,
      }),
      "clouds",
      z(rand(0, 2)),
    ]);
    onUpdate(() => {
      recta.move(rand(-150, -100), 0);
    });
    wait(0.3, spawnClouds);
  }

  const currentYear = new Date().getUTCFullYear();
  add([
    text(currentYear + " © igorwastaken", {
      size: 15,
      width: width() - padding * 2,
    }),
    pos(padding, height() - padding - 15),
    area(),
    "ee",
  ]);

  // Settings button
 /* add([
    sprite("settings"),
    pos(width() - padding - 30, height() - padding - 30),
    scale(0.5),
    area(),
    "settings",
  ]);*/
  function spawnSnowflake() {
    const snowflake = add([
      pos(rand(0, width()), 0), // Começa no topo da tela em uma posição horizontal aleatória
      rect(4, 4), // Cada floco é um quadrado branco de 4x4 pixels (você pode mudar o tamanho)
      color(255, 255, 255), // Cor branca para os flocos de neve
      opacity(0.8), // Transparência para suavizar o visual
      move(DOWN, rand(20, 60)), // Velocidade vertical aleatória para cada floco
      "snowflake",
    ]);

    // Anima o floco para que ele também tenha movimento horizontal leve
    snowflake.onUpdate(() => {
      snowflake.move(rand(-1, 1), 0); // Move um pouco para a esquerda ou direita para um efeito mais natural
      if (snowflake.pos.y > height()) {
        snowflake.pos.y = 0; // Reposiciona o floco no topo ao sair da tela
        snowflake.pos.x = rand(0, width());
      }
    });
  }

  // Configura um loop para gerar novos flocos de neve constantemente
  loop(0.1, () => {
    spawnSnowflake();
  });
  spawnClouds();
  var clicked = 0;
  onClick("ee", () => {
    clicked++;
    if (clicked === 2) {
      clicked = 0;
      // window.open("https://apenasigordev.github.io/FastPungentFactors/");
    }
  });
 
  onClick("settings", () => {
    go("settings");
    play("ui:click");
  });

  onMouseMove(() => {
    afkTimeout = 0;
  });

  onTouchMove(() => {
    afkTimeout = 0;
  });

  loop(1, () => {
    afkTimeout++;
  });

  onUpdate(() => {
    if (afkTimeout === 60) {
      go("afk");
    }
  });
  add([
    sprite("instagram"),
    pos(width() / 2, height() * 0.7),
    scale(0.4),
    area(),
    anchor("center"),
    "social:Instagram",
  ]);

  const socials = [
    {
      id: "Instagram",
      link: "https://instagram.com/wtfl.game",
    },
  ];

  socials.forEach((s) => {
    onClick(`social:${s.id}`, () => window.open(s.link));
  });

  onUpdate(() => {
    if (window.location.hash === "#kaboom") {
      destroyAll("stars");
    }
  });

  onDestroy("stars", (s) => {
    addKaboom(s.pos);
  });
}
