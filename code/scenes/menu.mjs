import kaboom from "kaboom";

// Functions
function formatCompactNumber(number) {
  const formatter = Intl.NumberFormat("en-US", { notation: "compact" });
  return formatter.format(Number(number));
}

// Main
export default function MainMenu() {
  const maxScore = formatCompactNumber(localStorage.getItem("score"));

  var afkTimeout = 0;

  // Main title
  add([
    text(`What The Floosh Game`, {
      size: 24,
      width: width(),
      align: "center",
    }),
    pos(width() / 2, height() / 3.4),
    anchor("center"),
    z(3),
  ]);

  // Coin display
  add([
    text(formatCompactNumber(localStorage.getItem("coins")), {
      size: 18,
    }),
    pos(40, 13),
    "coins",
    z(3),
  ]);

  add([sprite("coin"), pos(10, 10), "coins", z(3), scale(0.1)]);

  // Menu buttons
  const buttons = [
    { label: "Jogar", scene: "difficulty", y: height() / 2.5 },
    { label: "Créditos", scene: "credits", y: height() / 2.1 },
    { label: "Loja", scene: "shop", y: height() / 1.85 },
    { label: "Estatísticas", scene: "stats", y: height() / 1.65 },
    { label: "Mobile App", scene: "menu", y: height() / 1.5 }
  ];

  buttons.forEach(({ label, scene, y }) => {
    const btn = add([
      text(label, {
        size: 16,
        width: width(),
        align: "center",
      }),
      pos(width() / 2, y),
      anchor("center"),
      area(),
      `${label}`,
      z(3),
      {
        clickAction: scene,
      }
    ]);

    btn.onClick(() => {
      go(scene);
      play("ui:click");
    });

    btn.onHover(() => {
      btn.textSize = 18;
      setCursor("pointer");
    });

    btn.onHoverEnd(() => {
      btn.textSize = 16;
      setCursor("default");
    });
  });
  onClick("Mobile App", () => {
    window.open("/internal/files/WTFLGameMobile-V1.apk")
  })
  // Clouds and stars background
  for (let clouds = 0; clouds < 50; clouds++) {
    add([
      sprite("star"),
      area(),
      pos(rand(width()), rand(height())),
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
      width: width(),
    }),
    pos(10, height() - 30),
    area(),
    "ee",
  ]);

  // Settings button
  add([
    sprite("settings"),
    pos(width() - 30, height() - 30),
    scale(0.5),
    area(),
    "settings",
  ]);

  spawnClouds();

  var clicked = 0;
  onClick("ee", () => {
    clicked++;
    if (clicked === 2) {
      clicked = 0;
      window.open("https://apenasigordev.github.io/FastPungentFactors/");
    }
  });

  onClick("settings", () => {
    go("settings");
    play("ui:click");
  });

  onKeyPress("space", () => {
    go("game:normal");
    play("ui:click");
  });

  onGamepadButtonDown("dpad-down", () => {
    go("game:normal");
    play("ui:click");
  });

  onKeyPress("down", () => {
    go("game:normal");
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
