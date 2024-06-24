import kaboom from "kaboom";

export default function Credits() {
  // Constantes para tamanhos e espaçamentos
  const titleSize = 24;
  const sectionTitleSize = 20;
  const textSize = 14;
  const spacing = 30;
  const marginTop = 30;

  // Título do jogo
  add([
    text("What The Floosh Game", {
      size: titleSize,
      width: width(),
      align: "center",
    }),
    pos(width() / 2, marginTop),
    anchor("center"),
    area(),
    "devBtn",
  ]);

  onHoverEnd("devBtn", () => {
    go("devOptions");
  });

  // Criadores
  add([
    text("Criadores:", {
      size: sectionTitleSize,
      width: width(),
      align: "center",
    }),
    pos(width() / 2, marginTop + spacing),
    anchor("center"),
  ]);

  add([
    text("- Igor (Coder, art creator)", {
      size: textSize,
      width: width(),
      align: "center",
    }),
    pos(width() / 2, marginTop + spacing * 2),
    anchor("center"),
  ]);

  // Músicas
  add([
    text("Músicas:", {
      size: sectionTitleSize,
      width: width(),
      align: "center",
    }),
    pos(width() / 2, marginTop + spacing * 3),
    anchor("center"),
  ]);

  const musicCredits = [
    "20190724 - Mac Demarco",
    "20190724 2 - Mac Demarco",
    "20210511 - Mac Demarco",
    "20210616 - Mac Demarco",
  ];

  musicCredits.forEach((credit, index) => {
    add([
      text(credit, {
        size: textSize,
        width: width(),
        align: "center",
      }),
      pos(width() / 2, marginTop + spacing * (4 + index)),
      anchor("center"),
    ]);
  });

  // Créditos ao Kaboom.js
  add([
    text("Criado com Kaboom.js", {
      size: sectionTitleSize,
      width: width(),
      align: "center",
    }),
    pos(width() / 2, marginTop + spacing * (4 + musicCredits.length)),
    anchor("center"),
    area(),
    "kaboomgit",
  ]);

  // Voltar botão
  add([
    text("Voltar", {
      size: textSize,
      width: width(),
    }),
    pos(10, height() - 30),
    area(),
    "voltar",
  ]);

  onClick("kaboomgit", () => {
    window.open("https://github.com/replit/kaboom");
  });

  onClick("voltar", () => {
    go("menu");
  });

  // Background stars
  for (let i = 0; i < 50; i++) {
    add([
      sprite("star"),
      area(),
      pos(rand(width()), rand(height())),
      scale(rand(0.1, 0.3)),
      rotate(rand(0, 360)),
      "stars",
      z(0.5),
    ]);
  }
}
