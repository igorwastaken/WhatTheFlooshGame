import kaboom from 'kaboom'
const items = [
  {
    sprite: "bean",
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
    const i = add([
      sprite(item.sprite),
      pos(width()/2.3, 2*index),
      area(),
      item.name
    ])
    console.log(i)
  })
  add([
    text("Voltar", {
      size: 14
  }),
    pos(10, 10),
    area(),
    "backbtn"
  ])
  onClick("backbtn", () => {
    go("menu")
  })
}
