import kaboom from "kaboom";

function formatCompactNumber(number) {
  const formatter = Intl.NumberFormat("en-US", { notation: "compact" });
  return formatter.format(Number(number));
}

export default function Stats() {
  const maxScoreEasy = formatCompactNumber(localStorage.getItem("score.easy"));
  const maxScoreNormal = formatCompactNumber(localStorage.getItem("score.normal"));
  const maxScoreHard = formatCompactNumber(localStorage.getItem("score.hard"));

  // Constantes para tamanhos e espaçamentos
  const titleSize = 26;
  const textSize = 14;
  const spacing = 30;
  const marginTop = height() / 3.4;

  // Título Pontos
  add([
    text("Pontos:", {
      size: titleSize,
      width: width(),
      align: "center",
    }),
    pos(width() / 2, marginTop),
    anchor("center"),
  ]);

  // Pontuação Fácil
  add([
    text("Fácil: " + maxScoreEasy, {
      size: textSize,
      width: width(),
      align: "center",
    }),
    pos(width() / 2, marginTop + spacing),
    anchor("center"),
  ]);

  // Pontuação Normal
  add([
    text("Normal: " + maxScoreNormal, {
      size: textSize,
      width: width(),
      align: "center",
    }),
    pos(width() / 2, marginTop + spacing * 2),
    anchor("center"),
  ]);

  // Pontuação Difícil
  add([
    text("Difícil: " + maxScoreHard, {
      size: textSize,
      width: width(),
      align: "center",
    }),
    pos(width() / 2, marginTop + spacing * 3),
    anchor("center"),
  ]);

  // Botão Voltar
  add([
    text("Voltar", {
      size: textSize,
    }),
    pos(10, height() - 30),
    area(),
    "backbtn",
  ]);

  onClick("backbtn", () => {
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
