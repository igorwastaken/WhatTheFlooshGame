import kaboom from 'kaboom'

export default function MainMenu() {
    const maxScore = localStorage.getItem("score");
    var afkTimeout = 0;
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
        sprite("clock"),
        pos(10, 60),
        z(3),
        scale(0.3)
    ])
    add([
        text(maxScore, {
            size: 18
        }),
        pos(40, 63),
        "score",
        z(3)
    ])
    add([
        text(localStorage.getItem("coins"), {
            size: 18
        }),
        pos(40, 93),
        "coins",
        z(3)
    ])
    add([
        sprite("coin"),
        pos(10, 90),
        "coins",
        z(3),
        scale(0.1)
    ])
    /*add([
        pos(width()-50,50),
        sprite(localStorage.getItem("skin")),
        area(),
        body(),
        "btn",
        z(1),
    ])*/
    add([
        pos(10,10),
        sprite(localStorage.getItem("skin")),
        area(),
        "btn",
        z(3),
        scale(0.5)
    ])
    add([
        text(`Jogar`, {
            size: 16,
            width: width(),
            align: "center"
        }),
        pos(0, height() / 2.9),
        area(),
        "btn",
        z(3),
    ]);
    add([
        text(`Créditos`, {
            size: 16,
            width: width(),
            align: "center"
        }),
        pos(0, height() / 2.5),
        area(),
        "credits",
        z(3)
    ])
    add([
        text("Loja", {
            size: 16,
            width: width(),
            align: "center"
        }),
        pos(0, height() / 2.2),
        area(),
        "shop",
        z(3)
    ])
    add([
        sprite("instagram"),
        pos(width()/2.1, height()/2),
        area(),
        "social:Instagram",
        z(3),
        scale(0.3)
    ])
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

    function spawnClouds() {
        const recta = add([
            pos(width(), rand(height())),
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
            recta.move(rand(-150, -100), 0)
        })
	    wait(0.3, spawnClouds);
        recta.onUpdate(() => {
            if (recta.pos.x > width()) {
                destroy(recta)
            }
        })
    }
    add([
        text("2023 © Igor Figueiredo", {
            size: 15,
            width: width()
        }),
        pos(10, height() - 30),
	    area(),
		"ee"
    ])
    spawnClouds()
	var clicked = 0;
    onClick("ee", () => {
		clicked++;
		if(clicked===2) {
			clicked=0;
		    window.open("https://apenasigordev.github.io/FastPungentFactors/")
		}
	})
    onCollide("btn", (e) => {
        destroy(e)
    })
    /*onCollide("stars", "stars", (s) => {
        destroy(s)
    })*/
    onCollide("credits", (e) => {
        destroy(e)
    })
    onClick("btn", () => {
        go("difficulty")
    })
    onClick("credits", () => {
        go("credits")
    })
    onClick("shop", () => {
        go("shop")
    })
    onMouseMove(() => {
        afkTimeout = 0;
    })
    onTouchMove(() => {
        afkTimeout = 0;
    })
    loop(1, () => {
        afkTimeout++;
    })
    onUpdate(() => {
        console.log(afkTimeout);
        if (afkTimeout === 60) {
            go("afk")
        }
    })

    const socials = [
        {
            id: "Instagram",
            link: "https://instagram.com/wtfl.game"
        }
    ]

    socials.forEach((s) => {
        onClick(`social:${s.id}`, () => window.open(s.link))
    })

    onUpdate(() => {
        if(window.location.hash==="#kaboom")
        { 
            destroyAll("stars")
            //destroyAll("clouds")

        }
    })
    onDestroy("stars", (s) => {
        addKaboom(s.pos)
    })
}
