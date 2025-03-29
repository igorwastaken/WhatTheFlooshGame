export default function Difficulty() {
  let back = add([
      sprite("background", {width: width(), height: height()}),
      layer("bg"),
      fixed(),
  ]);
  const padding = 20; // Define o valor do padding
  const stars = [];
  const starCount = 50;
  var selectedButtonIndex = 0;

  // Create background stars
  for (let i = 0; i < starCount; i++) {
    stars.push(add([
      sprite("star"),
      pos(rand(padding, width() - padding), rand(padding, height() - padding)),
      scale(rand(0.1, 0.3)),
      rotate(rand(0, 360)),
      "star",
      layer("bg")
    ]));
  }

  // Add title text
  const title = add([
    text("What The Floosh Game", {
      size: 24,
      width: width() - padding * 2, // Reduz a largura do texto pelo padding
      align: "center",
    }),
    pos(width() / 2, height() * 0.3 - padding), // Ajusta a posição vertical pelo padding
    anchor("center"),
    z(2),
  ]);
  const titleHeight = title.height;

  // Add difficulty options
  const buttons = [
    { label: "Fácil", scene: "game:easy", y: height() * 0.4 },
    { label: "Normal", scene: "game:normal", y: height() * 0.5 },
    { label: "Difícil", scene: "game:hard", y: height() * 0.6 },
    { label: "Impossivel", scene: "game:impossible", y: height() * 0.7 },
    { label: "Voltar", scene: "menu", y: height() - padding - 15},
  ];
  const spaceBelowTitle = height() - (title.pos.y + titleHeight / 2);

  const availableHeightForButtons = spaceBelowTitle / (buttons.length + 1);

  buttons.forEach(({ label, scene, y }, index) => {
    if(scene !== "menu") {
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
    } else {
      const btn = add([
        text("Voltar", {
          size: 15,
          width: width() - padding * 2,
        }),
        pos(padding, height() - padding - 15),
        area(),
        "btn",
        z(3),
        {
          clickAction: scene,
        },
        { selected: index === selectedButtonIndex }
      ]);

      btn.onUpdate(() => {
        btn.textSize = btn.selected ? 17 : 15;
      });

      // Add touch support for mobile devices
      btn.onClick(() => {
        go(scene);
        play("ui:click");
      });
    }
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
}
