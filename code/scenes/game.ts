import 'kaboom/global'
import kaboom from 'kaboom'

export default function Game() {
	const player = add([
		sprite("bean"),
        pos(100, 200),
        area(),
        body(),
	])

	onMouseMove((_, pos) => {
		player.moveTo(pos.x, 200)
		// console.log(pos)
	})
	onTouchMove((_, pos) => {
		player.moveTo(pos.clientX, 200)
	})
	function spawnRect() {
	    const recta = add([
            pos(rand(width()), height()),
		    rect(100, 20),
            outline(2),
            area(),
			"Rect"
        ])
		onUpdate(() => {recta.move(0, -150)})
		wait(rand(0.5, 2), spawnRect);
	}
	spawnRect()
	player.onCollide("Rect", () => {
		addKaboom(player.pos)
		destroy(player)
		destroyAll("Rect")
		wait(rand(0.4, 0.7), () => {
			// readd(player)
			//spawnRect()
			go("menu")
		})
	})
	onUpdate("Rect", (recta) => {
		if (recta.pos.y > height() + 30) {
			destroy(recta)
		}
	})
}