import kaboom from 'kaboom'

export default function Settings() {
    add([
        text("Em breve..."),
        pos(10,10)
    ])

    add([
        text("Voltar", {
            size:14,
            width:width()
        }),
        pos(10, 60),
        area(),
        "back"
    ])

    onClick("back", () => {
        go("menu")
    })
}