import 'kaboom/global'
import kaboom from 'kaboom'

export default function DevOptions() {
	add([
		text("Página do desenvolvedor", {
			size: 20
		}),
		pos(10,10),
		area(),
		"back"
	])
	/*add([
		text("Voltar", {
			size: 18
		}),
		pos(width()-30, 10),
		area(),
		"back"
	])*/
	const debugBtn = add([
		text("Ativar debug", {
			size: 18
		}),
		pos(10,60),
		area(),
		"debug"
	])
	onClick("back", () => go("menu"));

	onClick("debug", () => {
		debug.inspect = !debug.inspect
	})
}
