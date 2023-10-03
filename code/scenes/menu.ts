import 'kaboom/global'
import kaboom from 'kaboom'

export default function MainMenu() {
	add([
        text(`What The Floosh Game`, {
            size: 28,
            width: width(),
            // font: "breakout"
        }),
        pos(10, 10),
    ]);
	add([
		pos(center()),
		sprite("bean"),
		area(),
		body()
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
	onClick("btn", () => {
		go("game")
	})
	onClick("credits", () => {
		go("credits")
	})
}