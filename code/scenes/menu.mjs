// import 'kaboom/global'
import kaboom from 'kaboom'

export default function MainMenu() {
	const maxScore = localStorage.getItem("score");
	
	add([
        text(`What The Floosh Game`, {
            size: 28,
            width: width(),
            // font: "breakout"
        }),
        pos(10, 10),
		z(3)
    ]);
	add([
		text("Seu maior ponto foi: " + maxScore, {
			size: 18
		}),
		pos(10, 60),
		"score",
		z(3)
	])
	add([
		pos(center()),
		sprite("bean"),
		area(),
		body(),
		"btn",
		z(1)
	])
	add([
        text(`Jogar`, {
            size: 16,
            width: width(),
			align: "center"
            // font: "breakout"
        }),
        pos(0, height()*(6/9)),
		area(),
		"btn",
		z(3),
		// outline(10, BLACK)
    ]);
	add([
		text(`Créditos`, {
			size: 16,
			width: width(),
			align: "center"
		}),
		pos(0, height()*(4/6)),
		area(),
		"credits",
		z(3)
	])
	add([
		text("Loja", {
			size: 16,
			width: width(),
			align:"center"
		}),
		pos(0,height()*(3/4))
	])
    var clouds = 0
	for(clouds=0; clouds < 50; clouds++) {
		const clouds = add([
			sprite("star"),
			area(),
			pos(rand(width()), rand(height())),
			scale(rand(0.1, 0.3)),
			rotate(rand(0,360)),
			"stars"
		])
		/*clouds.onCollide("score", () => destroy(clouds))*/
	}
	function spawnClouds() {
	    const recta = add([
            pos(width(), rand(height())),
		    sprite("cloud"),
            //outline(2),
			scale(0.3),
            area(),
			offscreen({destroy:true}),
			"clouds",
			z(rand(0, 2))
        ])
		onUpdate(() => {recta.move(rand(-150,-100),0)})
		//wait(rand(0.3, 0.7), spawnRect);
		wait(0.3, spawnClouds);
		recta.onUpdate(() => {
		if (recta.pos.x > width()) {
			destroy(recta)
			// addKaboom(recta.pos)
		}
	})
	}
	add([
		text("2023 © Igor Figueiredo", {
			size: 15,
			width: width()
		}),
		pos(10, height()-30)
	])
	spawnClouds()
	onCollide("btn", (e) => {
		destroy(e)
	})
	onCollide("stars", "stars", (s) => {
		destroy(s)
	})
	onCollide("credits", (e) => {
		destroy(e)
	})
	onClick("btn", () => {
		go("game")
	})
	onClick("credits", () => {
		go("credits")
	})
}
