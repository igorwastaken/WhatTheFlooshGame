import kaboom from 'kaboom'
const items = [{
        sprite: "bean",
        name: "Floosh",
        price: 0
    },
    {
        sprite: "nerd",
        name: "Nerd",
        price: 1000
    },
    {
        sprite: "skull",
        name: "Skull",
        price: 3500
    },
    {
        sprite: "poop",
        name: "Poop",
        price: 5000
    },
    /*{
        sprite: "burbur",
        name: "Qt Little Burbur",
        price: 9999999999999999999999
    }*/
]
export default function Shop() {
    items.map((item, index) => {
        const i = add([
            sprite(item.sprite),
            pos(width() / 2.3, 55 * (index)),
            area(),
            opacity(localStorage.getItem("score") >= item.price ? 1 : 0.5),
            item.name
        ])
        onClick(item.name, () => {
            if (localStorage.getItem("score") >= item.price) {
                localStorage.setItem("skin", item.sprite)
                go("menu")
            } else {
                alert(`Desculpe, mas você não tem pontos suficientes (${item.price}) para comprar esse item.`)
            }
        })
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
