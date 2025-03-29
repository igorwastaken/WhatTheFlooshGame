export default function Settings() {
  const padding = 20;
  add([text("Em breve..."), pos(20, 20)]);

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
}
