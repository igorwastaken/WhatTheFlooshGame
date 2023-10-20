import kaboom from 'kaboom'

export default function Game(effects, curEffect) {
    var currentScore = 0;
    var currentCoins = 0;
    const player = add([
        sprite(localStorage.getItem("skin")),
        pos(100, 0),
        area(),
        body(),
        offscreen({
            destroy: true
        }),
        z(1)
    ])
    const score = add([
        text(currentScore, {
            width: width(),
            align: "right"
        }),
        pos(0, 0),
        area()
    ])
    add([
        sprite("coin"),
        pos(10, 10),
        z(3),
        scale(0.1)
    ])
    const coins = add([
        text(currentCoins, {
            size: 18
        }),
        pos(40, 13),
        area()
    ])
    onTouchMove((_, pos) => {
        player.moveTo(pos.clientX, player.pos.y)
    })
    onMouseMove((pos) => {
        player.moveTo(pos.x, player.pos.y)
    })

    function spawnRect() {
        const recta = add([
            pos(rand(width()), height()),
            circle(5, 5),
            outline(2),
            area(),
            offscreen({
                destroy: true
            }),
            "Rect"
        ])
        onUpdate(() => {
            recta.move(0, rand(-150, -100))
        })
        wait(rand(0.1, 0.2), spawnRect);
        recta.onUpdate(() => {
            if (recta.pos.y > height()) {
                destroy(recta)
                addKaboom(recta.pos)
            }
        })
    }

    function spawnCoins() {
        const recta = add([
            pos(rand(width()), height()),
            sprite("coin"),
            scale(0.15),
            area(),
            offscreen({
                destroy: true
            }),
            "Coins"
        ])
        onUpdate(() => {
            recta.move(0, rand(-150, -100))
        })
        wait(rand(0.5, 1.5), spawnCoins);
        recta.onUpdate(() => {
            if (recta.pos.y > height()) {
                destroy(recta)
                addKaboom(recta.pos)
            }
        })
    }

    function spawnRedRect() {
        const recta = add([
            pos(rand(width()), height()),
            sprite("star"),
            area(),
            offscreen({
                destroy: true
            }),
            "Rectred",
            scale(0.4),
            rotate(rand(0, 360)),
            scale(rand(0.2, 0.5))
        ])
        onUpdate(() => {
            recta.move(0, -150)
        })
        wait(rand(0.9, 2), spawnRedRect);
        recta.onUpdate(() => {
            if (recta.pos.y > height()) {
                destroy(recta)
                addKaboom(recta.pos)
            }
        })
    }

    function spawnPlanes() {
        const recta = add([
            pos(-100, rand(height())),
            color(255, 0, 0),
            sprite("plane", {
                flipX: true
            }),
            scale(0.5),
            area(),
            offscreen({
                destroy: true
            }),
            "Rectred"
        ])
        onUpdate(() => {
            recta.move(rand(200, 50), -120)
        })
        wait(rand(2, 7), spawnPlanes);
        recta.onUpdate(() => {
            if (recta.pos.y > height()) {
                destroy(recta)
                addKaboom(recta.pos)
            }
        })
    }

    function spawnClouds() {
        const recta = add([
            pos(rand(width()), height()),
            sprite("cloud"),
            scale(0.3),
            area(),
            offscreen({
                destroy: true
            }),
            "clouds",
            z(rand(0, 2))
        ])
        onUpdate(() => {
            recta.move(rand(-100, -50), -150)
        })
        wait(0.6, spawnClouds);
        recta.onUpdate(() => {
            if (recta.pos.y > height()) {
                destroy(recta)
                addKaboom(recta.pos)
            }
        })
    }
    spawnClouds()
    spawnRedRect()
    spawnRect()
    wait(1, spawnCoins)
    wait(1, spawnPlanes)
    player.onCollide("Rectred", (re) => {
        const kaaboom = addKaboom(player.pos)
        kaaboom.move(0, -150)
        burp()
        shake(50)
        destroy(player)
        destroy(re)
        wait(2, () => {
            go("menu")
        })
    })
    onCollide("Coins", "Rectred", (c) => {
        destroy(c)
    })
    player.onCollide("Rect", (c) => {

        currentScore++;
        score.text = currentScore;
        if (currentScore > localStorage.getItem("score")) {
            localStorage.setItem("score", currentScore);
            score.color = GREEN
        }
        destroy(c)
    })
    player.onCollide("Coins", (c) => {
        currentCoins++;
        coins.text = currentCoins;

        localStorage.setItem("coins", Math.floor(localStorage.getItem("coins")) + 1)
        destroy(c)
    })
}
