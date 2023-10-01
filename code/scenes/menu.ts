import 'kaboom/global'
import kaboom from 'kaboom'

export default function MainMenu() {
	add([
		pos(center()),
		sprite("bean"),
		area(),
		body()
	])
	add([
        text(`Clique em qualquer lugar para começar`, {
            size: 16,
            width: width(),
            // font: "breakout"
        }),
        pos(0, height()*(3/4)),
    ]);
	onClick(() => {
		go("game")
	})
}