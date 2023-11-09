import kaboom from 'kaboom'

export default function Game(velocity=1, spawn=1, coinsSpawn=1) {
    var currentScore = 0;
    var currentCoins = 0;
    var SPEED = 400
    console.log(velocity, spawn)
    const player = add([
        sprite(localStorage.getItem("skin")),
        pos(mousePos().x, 0),
        area(),
        body(),
        offscreen({
            destroy: true
        }),
        z(1),
	    scale(0.7),
	    "player"
    ])
    let targetX = player.pos.x;
    const score = add([
        text(currentScore, {
           // width: width(),
            // align: "right",
            size: 18
        }),
        pos(40, 43),
        area()
    ])
    add([
        sprite("coin"),
        pos(10, 10),
        z(3),
        scale(0.1)
    ])
    add([
        sprite("clock"),
        pos(10, 40),
        z(3),
        scale(0.3)
    ])
    const coins = add([
        text(currentCoins, {
            size: 18
        }),
        pos(40, 13),
        area()
    ])
	player.onUpdate(() => {
		// player.rotate(rand(100, 200))
		if(player.pos.y < 300) {
			player.move(0,200)
		}
	})
    onTouchMove((_, pos) => {
        player.moveTo(pos.clientX, player.pos.y)
	// targetX = pos.clientX;
    })
    onMouseMove((pos) => {
        player.moveTo(pos.x, player.pos.y)
	// targetX=pos.x
    })
    onKeyDown('left', () => {
        player.move(-SPEED, 0)
    })
    onKeyDown('right', () => {
        player.move(SPEED, 0)
    })
    onGamepadButtonDown('dpad-left', () => {
        player.move(-SPEED, 0)
    })
    onGamepadButtonDown('dpad-right', () => {
        player.move(SPEED, 0)
    })
    /*player.onUpdate(() => {
       player.moveTo(targetX, player.pos.y)
       player.rotate+=100
     });*/

    function spawnRect() {
        const recta = add([
            pos(rand(width()), height()),
            rect(5, 5),
            outline(2),
            area(),
            color(),
            offscreen({
                destroy: true
            }),
            "Rect"
        ])
        onUpdate(() => {
            recta.move(0, rand(-150, -100)*(velocity/spawn))
        })
        wait(rand(0.1, 0.2)*spawn, spawnRect);
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
            recta.move(0, rand(-150, -100)*(velocity))
        })
        wait(rand(0.5, 1.5)*coinsSpawn, spawnCoins);
        recta.onUpdate(() => {
            if (recta.pos.y > height()) {
                destroy(recta)
                addKaboom(recta.pos)
            }
        })
    }

    function spawnRedRect() {
        const sprites = [
            "rocket", "rocket2", "rocket3"
        ]

        const random = sprites[Math.floor(Math.random()*sprites.length)]
        const recta = add([
            pos(rand(width()), height()),
            sprite(random),
            area(),
            offscreen({
                destroy: true
            }),
            "Rectred",
           // scale(1),
            rotate(0),
            scale(rand(0.5, 0.8))
        ])
        onUpdate(() => {
            recta.move(0, -150*(velocity))
        })
        wait(rand(0.9, 2)/(spawn), spawnRedRect);
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
            sprite("ufo", {
                flipX: false
            }),
            scale(1),
            area(),
            offscreen({
                destroy: true
            }),
            "Rectred"
        ])
        onUpdate(() => {
            recta.move(rand(200, 50)*(velocity), -120*(velocity))
        })
        wait(rand(2, 7)/(spawn), spawnPlanes);
        recta.onUpdate(() => {
            if (recta.pos.y > height()) {
                destroy(recta)
                addKaboom(recta.pos)
            }
        })
    }
    function spawnStars() {
        const recta = add([
            pos(rand(width()), height()),
            sprite("star"),
            scale(rand(0.3, 0.5)),
            area(),
            offscreen({
                destroy: true
            }),
            "Rectred",
            z(-1),
            rotate(rand(0,360))
        ])
        onUpdate(() => {
            recta.move(0, rand(-100, -50))
        })
        wait(rand(0.4, 1), spawnStars)
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
            recta.move(rand(-100, -50)*(velocity), -150*(velocity))
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
    spawnStars()
   // spawnRect()
    wait(1, spawnCoins)
    wait(1, spawnPlanes)
    player.onCollide("Rectred", (re) => {
        const kaaboom = addKaboom(player.pos)
        kaaboom.move(0, -150)
        if(localStorage.getItem("muted") === 0) burp()
        shake(50)
        destroy(player)
        destroy(re)
        wait(2, () => {
            go("menu")
        })
    })
    onCollide("Coins", "Rectred", (c) => {
        destroy(c)
        addKaboom(c.pos)
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
    player.onUpdate(() => {
        currentScore++;
        score.text=currentScore;
        if(currentScore>localStorage.getItem("score")) {
            localStorage.setItem("score", currentScore);
            score.color=GREEN;
        }
    })
    player.onCollide("Coins", (c) => {
        currentCoins++;
        coins.text = currentCoins;

        if (localStorage.getItem("qt") === "true") {
            localStorage.setItem("coins", Math.floor(localStorage.getItem("coins")) * 100)
        } else {
            localStorage.setItem("coins", Math.floor(localStorage.getItem("coins")) + 1)
        }
        destroy(c)
    })
}
