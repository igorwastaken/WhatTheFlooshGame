export default async function Game(velocity = 0.5, spawn = 1, coinsSpawn = 1, difficulty = "normal", impulso = 1, slowmode = true) {
    const padding = 20;
    var currentScore = 0;
    var currentCoins = 0;
    var SPEED = 400;

    let back = add([
        sprite("background", { width: width(), height: height() }),
        layer("bg"),
        fixed(),
    ]);

    const player = add([
        sprite(localStorage.getItem("skin")),
        pos(mousePos().x, 0),
        area(),
        body(),
        offscreen({
            destroy: false,
            distance: 0
        }),
        z(1),
        scale(0.3),
        "player",
        layer("game")
    ]);

    add([
        sprite("coin"),
        pos(padding, padding),
        z(3),
        scale(0.25),
        fixed()
    ]);

    const coins = add([
        text(currentCoins, {
            size: 18
        }),
        pos(padding + 30, padding + 3),
        area(),
        fixed()
    ]);

    add([
        sprite("clock"),
        pos(padding, padding + 30),
        z(3),
        scale(0.3),
        fixed()
    ]);

    const score = add([
        text(currentScore, {
            size: 18
        }),
        pos(padding + 30, padding + 35),
        area(),
        "score",
        fixed()
    ]);


    player.onUpdate(() => {
        if (player.pos.y < 100) {
            player.move(0, 200);
        }

        if (velocity >= 1.5) {
            velocity += 0.0001;
        } else if (velocity >= 5) { } else {
            velocity += 0.5;
        }
    });


    onTouchMove((_, pos) => {
        player.moveTo(pos.clientX, player.pos.y, 500);
    });

    onMouseMove((pos) => {
        player.moveTo(pos.x, player.pos.y);
    });

    onKeyDown('left', () => {
        player.move(-SPEED, 0);
    });

    onKeyDown('right', () => {
        player.move(SPEED, 0);
    });

    onGamepadButtonDown('dpad-left', () => {
        player.move(-SPEED, 0);
    });

    onGamepadButtonDown('dpad-right', () => {
        player.move(SPEED, 0);
    });


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
        ]);
        onUpdate(() => {
            recta.move(0, rand(-150, -100) * (velocity / spawn) * impulso);
        });
        wait(rand(0.1, 0.2) * spawn, spawnRect);
        recta.onUpdate(() => {
            if (recta.pos.y > height()) {
                destroy(recta);
                addKaboom(recta.pos);
            }
        });
    }

    function spawnImpulso() {
        const recta = add([
            pos(rand(width()), height()),
            sprite("impulse"),
            z(3),
            scale(0.15),
            outline(2),
            area(),
            color(),
            offscreen({
                destroy: true
            }),
            "impulso"
        ]);
        onUpdate(() => {
            // recta.rotateBy(100);
            recta.move(0, rand(-150, -100) * (velocity / spawn) * impulso);
        });
        wait(rand(10, 60) * spawn, spawnImpulso);
        recta.onUpdate(() => {
            if (recta.pos.y > height()) {
                destroy(recta);
                addKaboom(recta.pos);
            }
        });
    }
    function spawnCoins() {
        const recta = add([
            pos(rand(width()), height()),
            sprite("coin"),
            scale(0.3),
            area(),
            offscreen({
                destroy: true,
            }),
            "Coins",
        ]);
        onUpdate(() => {
            recta.move(0, rand(-150, -100) * velocity * impulso);
        });
        wait(rand(0.5, 1.5) * coinsSpawn, spawnCoins);
        recta.onUpdate(() => {
            if (recta.pos.y > height()) {
                destroy(recta);
                addKaboom(recta.pos);
            }
        });
    }

    function spawnRedRect() {
        const sprites = ["rocket", "rocket2", "rocket3"];
        const random = sprites[Math.floor(Math.random() * sprites.length)];
        const recta = add([
            pos(rand(width()), height()),
            sprite(random),
            area(),
            offscreen({
                destroy: true
            }),
            "Rectred",
            rotate(0),
            scale(rand(0.5, 0.8))
        ]);
        onUpdate(() => {
            recta.move(0, -200 * (velocity) * impulso);
        });
        wait(rand(0.9, 2) / spawn, spawnRedRect);
        recta.onUpdate(() => {
            if (recta.pos.y > height()) {
                destroy(recta);
                addKaboom(recta.pos);
            }
        });
    }

    function spawnPlanes() {
        const recta = add([
            pos(-100, rand(height())),
            sprite("ufo", {
                flipX: false,
            }),
            scale(1),
            area(),
            offscreen({
                destroy: true,
            }),
            "Rectred",
        ]);
        onUpdate(() => {
            recta.move(rand(200, 50) * velocity * impulso, -120 * velocity * impulso);
        });
        wait(rand(2, 7) / spawn, spawnPlanes);
        recta.onUpdate(() => {
            if (recta.pos.y > height()) {
                destroy(recta);
                addKaboom(recta.pos);
            }
        });
    }

    function spawnStars() {
        const recta = add([
            pos(rand(width()), height()),
            sprite("star"),
            scale(rand(0.3, 0.5)),
            area(),
            offscreen({
                destroy: true,
            }),
            "Clouds",
            z(-1),
            rotate(rand(0, 360)),
        ]);
        onUpdate(() => {
            recta.move(0, rand(-100, -50) * velocity * impulso);
        });
        wait(rand(0.4, 1), spawnStars);
    }

    function spawnClouds() {
        const recta = add([
            pos(rand(width()), height()),
            sprite("cloud"),
            scale(0.5),
            area(),
            offscreen({
                destroy: true,
            }),
            "clouds",
            z(rand(0, 2)),
        ]);
        onUpdate(() => {
            recta.move(rand(-100, -50) * velocity * impulso, -150 * velocity * impulso);
        });
        wait(0.6, spawnClouds);
        recta.onUpdate(() => {
            if (recta.pos.y > height()) {
                destroy(recta);
                addKaboom(recta.pos);
            }
        });
    }
    player.onCollide("impulso", (imp) => {
        destroy(imp)
        impulso += 14
        wait(1, spawnClouds);
        wait(0.5, spawnRedRect);
        wait(1, spawnStars);

    })
    player.onUpdate((imp) => {

        console.log(impulso)
        if (impulso > 1.8) {
            currentScore += 50
            shake(0.5)

            impulso -= 0.5;
        } else {

        }
    })
    spawnClouds();
    spawnRedRect();
    wait(20, spawnImpulso);
    spawnStars();
    wait(1, spawnCoins);
    wait(1, spawnPlanes);

    player.onCollide("Rectred", (re) => {
        if (impulso >= 1.8) return;
        const kaaboom = addKaboom(player.pos);
        kaaboom.move(0, -150);
        if (localStorage.getItem("muted") === 0) burp();
        shake(50);
        burp();
        destroy(player);
        destroy(re);
        setCursor("default");
        wait(2, () => {
            go("menu", {
                score: currentScore
            });
        });
    });

    onCollide("Coins", "Rectred", (c) => {
        destroy(c);
        addKaboom(c.pos);
    });

    player.onCollide("Rect", (c) => {
        currentScore++;
        score.text = currentScore;
        if (currentScore > localStorage.getItem("score")) {
            localStorage.setItem("score", currentScore);
            score.color = GREEN;
        }
        destroy(c);
    });

    player.onUpdate(() => {
        currentScore++;
        score.text = currentScore;
        if (currentScore > localStorage.getItem("score." + difficulty)) {
            localStorage.setItem("score." + difficulty, currentScore);
            score.color = GREEN;
        }
    });

    player.onCollide("Coins", (c) => {
        currentCoins++;
        coins.text = currentCoins;

        if (localStorage.getItem("qt") === "true") {
            localStorage.setItem(
                "coins",
                Math.floor(localStorage.getItem("coins")) * 100,
            );
        } else {
            localStorage.setItem(
                "coins",
                Math.floor(localStorage.getItem("coins")) + 1,
            );
        }
        destroy(c);
        play("coin", {
            volume: 0.7,
            detune: randi(0, 1.5) * 100
        });
    });
}
