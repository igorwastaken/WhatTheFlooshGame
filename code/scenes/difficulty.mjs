import kaboom from 'kaboom'


export default function Difficulty() {
    add([
        text(`What The Floosh Game`, {
            size: 24,
            width: width(),
            align: "center"
        }),
        pos(10, 10),
        z(3)
    ]);

    add([
        text(`Fácil`, {
            size: 14,
            width: width(),
            align: 'center'
        }),
        pos(0, height() / 2.9),
        area(),
        "easy",
        z(3),
    ])
    add([
        text(`Normal`, {
            size: 14,
            width: width(),
            align: 'center'
        }),
        pos(0, height() / 2.5),
        area(),
        "normal",
        z(3),
    ])
    add([
        text(`Dificil`, {
            size: 14,
            width: width(),
            align: 'center'
        }),
        pos(0, height() / 2.2),
        area(),
        "hard",
        z(3),
    ])
    add([
        text(`Voltar`, {
            size: 14, 
            width: width(),
            align: "center"
        }),
        pos(0,height()/2-10),
        area(),
        "back",
        z(3)
    ])
    onClick('easy', () => {
        go('game:easy')
    })
    onClick('normal', () => {
        go('game:normal')
    })
    onClick('hard', () => {
        go('game:hard')
    })
    onClick('back', () => {
        go("menu")
    });
    
    var clouds = 0
    for (clouds = 0; clouds < 50; clouds++) {
        const clouds = add([
            sprite("star"),
            area(),
            pos(rand(width()), rand(height())),
            scale(rand(0.1, 0.3)),
            rotate(rand(0, 360)),
            "stars"
        ])
    }
}
