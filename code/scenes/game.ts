import 'kaboom/global'
import kaboom from 'kaboom'

export default function Game(effects, curEffect) {
	var currentScore = 0;
	const player = add([
		sprite("bean"),
        pos(100, 200),
        area(),
        body(),
		offscreen({ destroy: true }),
		
	])
    const score = add([
		text(currentScore),
		pos(10,10),
		area()
	])
	/*onKeyDown('left', () => {
		player.moveTo(-80, 200)
	})
	onKeyDown('right', () => {
		player.moveTo(80, 200)
	})*/
	onTouchMove((_, pos) => {
		player.moveTo(pos.clientX, 200)
		/*const list = Object.keys(effects)
		curEffect = curEffect === 0 ? list.length - 1 : curEffect - 1*/
	   // label.text = list[curEffect]
	})
	onMouseMove((pos) => {
		// console.log(pos.x)
		player.moveTo(pos.x, 200)
	})
	function spawnRect() {
	    const recta = add([
            pos(rand(width()), height()),
		    circle(5, 5),
            outline(2),
            area(),
			offscreen({destroy:true}),
			"Rect"
        ])
		onUpdate(() => {recta.move(0, -150)})
		wait(rand(0.5, 0.8), spawnRect);
		// wait(0.3, spawnRect);
		recta.onCollide("clouds", () => {
			destroy(recta)
		})
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
            //outline(2),
			scale(0.3),
            area(),
			"clouds"
        ])
		onUpdate(() => {recta.move(0, -150)})
		//wait(rand(0.3, 0.7), spawnRect);
		wait(0.6, spawnClouds);
		recta.onUpdate(() => {
		if (recta.pos.y > height()) {
			destroy(recta)
			addKaboom(recta.pos)
		}
	})
	}
	spawnClouds()
	
	spawnRect()
	player.onCollide("clouds", () => {
		addKaboom(player.pos)
		burp()
		shake(50)
		destroy(player)
		wait(rand(0.5, 2), () => {
			// readd(player)
			//spawnRect()
			go("menu")
		})
	})
	player.onCollide("Rect", (c) => {
		currentScore++;
		score.text=currentScore;
		if(currentScore > localStorage.getItem("score")) { localStorage.setItem("score", currentScore) }
		destroy(c)
	})
	
}