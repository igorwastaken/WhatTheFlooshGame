function formatCompactNumber(number) {
  const formatter = Intl.NumberFormat("en-US", { notation: "compact" });
  return formatter.format(Number(number));
}

export default function Stats() {
  let back = add([
      sprite("background", {width: width(), height: height()}),
      layer("bg"),
      fixed(),
  ]);
  const padding = 20;
  const maxScoreEasy = formatCompactNumber(localStorage.getItem("score.easy"));
  const maxScoreNormal = formatCompactNumber(localStorage.getItem("score.normal"));
  const maxScoreHard = formatCompactNumber(localStorage.getItem("score.hard"));

  // Constantes para tamanhos e espaçamentos
  const titleSize = 20;
  const textSize = 14;
  const spacing = 30;
  const marginTop = height() * 0.4;
  // Titulo jogo
  add([
    text(`What The Floosh Game`, {
      size: 24,
      width: width(),
      align: "center",
    }),
    pos(width() / 2, height() * 0.3),
    anchor("center"),
    z(3),
  ]);
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
      size: 15,
      width: width() - padding * 2,
    }),
    pos(padding, height() - padding - 15),
    area(),
    "backbtn",
  ]);

  onClick("backbtn", () => {
    go("menu");
  });
  onKeyPress("space", () => go("menu"))
  onKeyPress("enter", () => go("menu"))
  
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
      layer("bg")
    ]);
  }
}
