import kaboom from 'kaboom'
const items = [
  {
    sprite: "floosh",
    name: "Floosh",
    price: 0
  },
  {
    sprite: "nerd",
    name: "Nerd",
    price: 100
  }
]
export default function Shop() {
  items.map((item, index) => {
    add([
      sprite(item.sprite),
      pos(height()/2, 2*index),
      area(),
      item.name
    ])
  })
  add([
    text("Voltar"),
    pos(10, 10),
    area(),
    "backbtn"
  ])
  onClick("backbtn", () => {
    go("menu")
  })
}
