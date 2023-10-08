// import 'kaboom/global'
import kaboom from 'kaboom'

export default function Game(effects, curEffect) {
	var currentScore = 0;
	const player = add([
		sprite("bean"),
        pos(100, 0),
        area(),
        body(),
		offscreen({ destroy: true }),
		z(1)
	])
    const score = add([
		text(currentScore),
		pos(10,10),
		area()
	])
	/*const fps = add([
		text(debug.fps()),
		pos(width()-100, 10),
		area()
	])
	onUpdate(() => {
		fps.text = debug.fps()
	})*/
	/*onKeyDown('left', () => {
		player.moveTo(-80, 200)
	})
	onKeyDown('right', () => {
		player.moveTo(80, 200)
	})*/
	player.onUpdate(() => {
		if(player.pos.y < 201) {
			player.move(0,100)
		}
	});
	onTouchMove((_, pos) => {
		player.moveTo(pos.clientX, player.pos.y)
		/*const list = Object.keys(effects)
		curEffect = curEffect === 0 ? list.length - 1 : curEffect - 1*/
	   // label.text = list[curEffect]
	})
	onMouseMove((pos) => {
		// console.log(pos.x)
		player.moveTo(pos.x, player.pos.y)
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
		onUpdate(() => {recta.move(0, rand(-150,-100))})
		wait(rand(0.1, 0.2), spawnRect);
		// wait(0.3, spawnRect);
		/*recta.onCollide("clouds", () => {
			destroy(recta)
		})*/
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
			/*color(255,0,0),
		    circle(10, 10),
            outline(2),*/
			sprite("star"),
            area(),
			offscreen({destroy:true}),
			"Rectred",
			// z(rand(0.5, 1)),
			scale(0.4),
			rotate(rand(0,360))
        ])
		onUpdate(() => {recta.move(0, -150)})
		wait(rand(0.4, 0.6), spawnRedRect);
		// wait(0.3, spawnRect);
		/*recta.onCollide("clouds", () => {
			destroy(recta)
		})*/
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
			color(255,0,0),
		    sprite("plane", {
				flipX: true
			}),
			scale(0.5),
            area(),
			offscreen({destroy:true}),
			"Rectred"
        ])
		onUpdate(() => {recta.move(rand(200, 50), -120)})
		wait(rand(5, 10), spawnPlanes);
		// wait(0.3, spawnRect);
		/*recta.onCollide("Rectred", (a) => {
			destroy(recta)
			addKaboom(a.pos)
		})*/
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
			offscreen({destroy:true}),
			"clouds",
			z(rand(0,2))
        ])
		onUpdate(() => {recta.move(rand(-100, -50), -150)})
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
	spawnRedRect()
	spawnRect()
	wait(1, spawnPlanes)
	player.onCollide("Rectred", (re) => {
		const kaaboom = addKaboom(player.pos)
		kaaboom.move(0, -150)
		burp()
		shake(50)
		destroy(player)
		destroy(re)
		wait(2, () => {
			// readd(player)
			//spawnRect()
			go("menu")
		})
	})
	player.onCollide("Rect", (c) => {
		
		currentScore++;
		score.text=currentScore;
		if(currentScore > localStorage.getItem("score")) { localStorage.setItem("score", currentScore); score.color=GREEN }
		destroy(c)
	})
	/*onUpdate(() => {
		if(currentScore === 20) {
			/*loadShader("invert", null, `
uniform float u_time;

vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
	vec4 c = def_frag();
	float t = (sin(u_time * 4.0) + 1.0) / 2.0;
	return mix(c, vec4(1.0 - c.r, 1.0 - c.g, 1.0 - c.b, c.a), t);
}
`)
			// console.log("20")
			loadShaderURL("invert", null, "shaders/invert.frag")
		}
	})*/
	// loadShaderURL("invert", null, "shaders/invert.frag")
	/*onUpdate(() => {
		shake(0.05)
	})*/
}
