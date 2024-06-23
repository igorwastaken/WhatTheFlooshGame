import kaboom from "kaboom";

export default function Credits() {
  add([
    text(`What The Floosh Game`, {
      size: 24,
      width: width(),
      align: "center",
    }),
    pos(10, 10),
    area(),
    "devBtn",
  ]);
  onHoverEnd("devBtn", () => {
    go("devOptions");
  });
  add([
    text("Criadores:", {
      size: 20,
      width: width(),
      align: "center",
    }),
    pos(0, 40),
  ]);
  add([
    text("- Igor (Coder, art creator)", {
      size: 14,
      width: width(),
      align: "center",
    }),
    pos(0, 70),
  ]);
  add([
    text("Músicas:", {
      size: 20,
      width: width(),
      align: "center",
    }),
    pos(0, 110),
  ]);
  add([
    text("20190724 - Mac Demarco", {
      size: 14,
      width: width(),
      align: "center",
    }),
    pos(0, 140),
  ]);
  add([
    text("20190724 2 - Mac Demarco", {
      size: 14,
      width: width(),
      align: "center",
    }),
    pos(0, 160),
  ]);
  add([
    text("20210511 - Mac Demarco", {
      size: 14,
      width: width(),
      align: "center",
    }),
    pos(0, 180),
  ]);
  add([
    text("20210616 - Mac Demarco", {
      size: 14,
      width: width(),
      align: "center",
    }),
    pos(0, 200),
  ]);
  add([
    text("Criado com Kaboom.js", {
      //smh
      size: 20,
      width: width(),
      align: "center",
    }),
    pos(0, 230),
    area(),
    "kaboomgit",
  ]);
  add([
    text("Voltar", {
      size: 14,
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
