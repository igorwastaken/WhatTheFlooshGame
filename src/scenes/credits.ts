export default function Credits() {
  let back = add([
    sprite("background", {width: width(), height: height()}),
    layer("bg"),
    fixed(),
  ]);

  // Constantes para tamanhos e espaçamentos
  const titleSize = 24;
  const sectionTitleSize = 20;
  const textSize = 14;
  const spacing = 30;
  const marginTop = 30;
  const padding = 20;

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
  //  go("devOptions");
  });

  // Criadores
  add([
    text("Contribuidores:", {
      size: sectionTitleSize,
      width: width(),
      align: "center",
    }),
    pos(width() / 2, marginTop + spacing),
    anchor("center"),
  ]);

  const creators = [
    "Igor (Creator, Coder)",
    "Luminnum (Art Creator, Contributor)"
  ];

  creators.forEach((creator, index) => {
    add([
      text(creator, {
        size: textSize,
        width: width(),
        align: "center",
      }),
      area(),
      pos(width() / 2, marginTop + spacing * (2 + index)),
      anchor("center"),
      "creator-"+index
    ]);
    onClick("creator-0", () => {
       window.open("https://www.instagram.com/notigorwastaken")
    })
    onClick("creator-1", () => {
       window.open("https://www.roblox.com/groups/32974679/luminnum")
    })
  });

  // Músicas
  add([
    text("Músicas:", {
      size: sectionTitleSize,
      width: width(),
      align: "center",
    }),
    pos(width() / 2, marginTop + spacing * (2 + creators.length)),
    anchor("center"),
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

  // Voltar botão
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

  onClick("kaboomgit", () => {
    window.open("https://kaplayjs.com/");
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
