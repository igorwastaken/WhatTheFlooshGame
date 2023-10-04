import 'kaboom/global'
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
    ]);
	add([
		text("Seu maior ponto foi: " + maxScore, {
			size: 18
		}),
		pos(10, 60),
		"score"
	])
	add([
		pos(center()),
		sprite("bean"),
		area(),
		body(),
		"btn"
	])
	add([
        text(`Clique aqui para começar`, {
            size: 16,
            width: width(),
            // font: "breakout"
        }),
        pos(0, height()*(4/6)),
		area(),
		"btn"
    ]);
	add([
		text(`Créditos`, {
			size: 16,
			width: width()
		}),
		pos(0, height()*(3/4)),
		area(),
		"credits"
	])
    /*var clouds = 0
	for(clouds=0; clouds < 11; clouds++) {
		const clouds = add([
			sprite("cloud"),
			area(),
			pos(rand(width()), rand(height())),
			scale(0.3)
		])
		clouds.onCollide("score", () => destroy(clouds))
	}*/
	function spawnClouds() {
	    const recta = add([
            pos(width(), rand(height())),
		    sprite("cloud"),
            //outline(2),
			scale(0.3),
            area(),
			offscreen({destroy:true}),
			"clouds"
        ])
		onUpdate(() => {recta.move(rand(-150,-130),0)})
		//wait(rand(0.3, 0.7), spawnRect);
		wait(0.6, spawnClouds);
		recta.onUpdate(() => {
		if (recta.pos.x > width()) {
			destroy(recta)
			// addKaboom(recta.pos)
		}
	})
	}
	spawnClouds()
	onClick("btn", () => {
		go("game")
	})
	onClick("credits", () => {
		go("credits")
	})
}