import 'kaboom/global'
import kaboom from 'kaboom'

export default function Game(effects, curEffect) {
	const player = add([
		sprite("bean"),
        pos(100, 200),
        area(),
        body(),
		offscreen({ destroy: true }),
		
	])
    
	/*onKeyDown('left', () => {
		player.moveTo(-80, 200)
	})
	onKeyDown('right', () => {
		player.moveTo(80, 200)
	})*/
	onTouchMove((_, pos) => {
		player.moveTo(pos.clientX, 200)
		const list = Object.keys(effects)
		curEffect = curEffect === 0 ? list.length - 1 : curEffect - 1
	   // label.text = list[curEffect]
	})
	onMouseMove((pos) => {
		console.log(pos.x)
		player.moveTo(pos.x, 200)
	})
	function spawnRect() {
	    const recta = add([
            pos(rand(width()), height()),
		    rect(20, 20),
            outline(2),
            area(),
			"Rect"
        ])
		onUpdate(() => {recta.move(0, -150)})
		//wait(rand(0.3, 0.7), spawnRect);
		wait(0.2, spawnRect);
		recta.onUpdate(() => {
		if (recta.pos.y > height()) {
			destroy(recta)
			addKaboom(recta.pos)
		}
	})
	}
	spawnRect()
	player.onCollide("Rect", () => {
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
	
}