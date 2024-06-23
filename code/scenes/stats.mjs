import kaboom from "kaboom";
function formatCompactNumber(number) {
  const formatter = Intl.NumberFormat("en-US", { notation: "compact" });
  return formatter.format(Number(number));
}

export default function Stats() {
  const maxScoreEasy = formatCompactNumber(localStorage.getItem("score.easy"));
  const maxScoreNormal = formatCompactNumber(localStorage.getItem("score.normal"));
  const maxScoreHard = formatCompactNumber(localStorage.getItem("score.hard"));
  add([
    text("Pontos:", {
      size: 26,
      width: width(),
      align: "center",
    }),
    pos(0, height()/3.4),
  ]);
  add([
    text("Facil: "+ maxScoreEasy, {
      size: 14,
      width: width(),
      align: "center",
    }),
    pos(0, height() / 2.9),
  ]);
  add([
    text("Normal: "+ maxScoreNormal, {
      size: 14,
      width: width(),
      align: "center",
    }),
    pos(0, height() / 2.5),
  ]);
  add([
    text("Dificl: "+ maxScoreHard, {
      size: 14,
      width: width(),
      align: "center",
    }),
    pos(0, height() / 2.2),
  ]);
  add([
    text("Voltar", {
      size: 14,
    }),
    pos(10, 10),
    area(),
    "backbtn",
  ]);
  onClick("backbtn", () => {
    go("menu");
  });
  var clouds = 0;
  for (clouds = 0; clouds < 50; clouds++) {
    const clouds = add([
      sprite("star"),
      area(),
      pos(rand(width()), rand(height())),
      scale(rand(0.1, 0.3)),
      rotate(rand(0, 360)),
      "stars",
      z(0.5)
    ]);
  }
}