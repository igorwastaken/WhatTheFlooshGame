import kaboom from "kaboom";

export default function Difficulty() {
  const stars = [];
  const starCount = 50;

  // Create background stars
  for (let i = 0; i < starCount; i++) {
    stars.push(add([
      sprite("star"),
      pos(rand(width()), rand(height())),
      scale(rand(0.1, 0.3)),
      rotate(rand(0, 360)),
      "star",
    ]));
  }

  // Add title text
  add([
    text("What The Floosh Game", {
      size: 32,
      width: width(),
      align: "center",
    }),
    pos(width() / 2, height() / 4),
    anchor("center"),
    z(2),
  ]);

  // Add difficulty options
  const difficulties = [
    { label: "Fácil", scene: "game:easy" },
    { label: "Normal", scene: "game:normal" },
    { label: "Difícil", scene: "game:hard" },
    { label: "v3", scene: "game:impossible" },
    { label: "Voltar", scene: "menu" },
  ];

  difficulties.forEach((option, index) => {
    const button = add([
      text(option.label, {
        size: 24,
        width: width(),
        align: "center",
      }),
      pos(width() / 2, height() / 2.5 + index * 40),
      anchor("center"),
      area(),
      { option: option.scene },
      z(2),
    ]);

    button.onHover(() => {
      button.color = rgb(255, 255, 0);
      setCursor("pointer");
    }, () => {
      button.color = rgb(255, 255, 255);
      setCursor("default");
    });

    button.onClick(() => {
      go(option.scene);
    });
  });
}