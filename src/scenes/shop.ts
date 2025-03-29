const items = [
  {
    sprite: "bean",
    name: "Floosh",
    price: 0,
  },
  {
    sprite: "nerd",
    name: "Nerd",
    price: 50,
  },
  {
    sprite: "skull",
    name: "Skull",
    price: 100,
  },
  {
    sprite: "poop",
    name: "Poop",
    price: 150,
  },
  /*{
        sprite: "burbur",
        name: "Qt Little Burbur",
        price: 9999999999999999999999
    }*/
];

export default function Shop() {
  // Get current coins from local storage or set to 0 if not available
  const coins = parseInt(localStorage.getItem("coins") || '0');

  items.map((item, index) => {
    const i = add([
      sprite(item.sprite),
      pos(width() / 2.3, 55 * index),
      area(),
      opacity(coins >= item.price ? 1 : 0.5),
      item.name,
    ]);

    onClick(item.name, () => {
      if (coins >= item.price) {
        localStorage.setItem("skin", item.sprite);
        localStorage.setItem("coins", (coins - item.price).toString()); // Deduct coins
        alert(`Você comprou ${item.name} por ${item.price} moedas.`);
        go("menu");
      } else {
        alert(`Desculpe, mas você não tem moedas suficientes (${item.price}) para comprar esse item.`);
      }
    });
  });

  // Display current coin count
  add([
    text(`Moedas: ${coins}`, {
      size: 18,
    }),
    pos(10, height() - 30),
    color(255, 255, 0),
  ]);

  // Add back button
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
}
