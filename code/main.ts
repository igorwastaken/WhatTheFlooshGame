import kaboom from "kaboom"
import "kaboom/global"
import Game from './scenes/game'
import Menu from './scenes/menu'
import Credits from './scenes/credits'
// initialize context
kaboom({
	backgroundAudio: true,
	background: [23,139,225],
	loadingScreen: false
})
if(!localStorage.getItem("score")) {
	localStorage.setItem("score", 0)
}
onLoading((progress) => {
    console.log(progress)
	// Black background
	drawRect({
		width: width(),
		height: height(),
		color: rgb(0, 0, 0),
	})

	// A pie representing current load progress
	/*drawCircle({
		pos: center(),
		radius: 32,
		end: map(progress, 0, 1, 0, 360),
	})

	drawText({
		text: "loading" + ".".repeat(wave(1, 4, time() * 12)),
		font: "monospace",
		size: 24,
		anchor: "center",
		pos: center().add(0, 70),
	})*/
})
const effects = {
	vhs: () => ({
		"u_intensity": 125,
	})
}

let curEffect = 0
// load assets
loadSprite("bean", "sprites/bean.png")
loadSprite("cloud", "sprites/clouds.png")
loadSound("20190724", "sounds/20190724.mp3")

loadSound("20190724 2", "sounds/20190724 2.mp3")

burp()

const menumusic = play("20190724 2", {
	loop: true,
	volume: 0,
})
const gamemusic = play("20190724", {
	loop: true,
	volume: 0,
})
const label = add([
	  pos(8, 8),
	  text("0"),
])


// gamemusic.play()
// menumusic.play()
// record(60)
scene("game", () => {
	gamemusic.play()
	menumusic.volume = 0
	gamemusic.volume = 1
	debug.log("Como se fosse aquele jogo do Pou")
	debug.log(`Use o touch e/ou o mouse para mover o Floosh.`)
	/*setTimeout(() => {
	  debug.log("Como se fosse aquele joguinho do Pou")
	}, 500)*/
	Game(effects, curEffect);
})
scene("menu", () => {
	burp()
	// menumusic.play()
	menumusic.volume = 1
	gamemusic.volume = 0
	Menu();
})
scene("credits", () => {
	Credits();
})
scene("loading", () => {
	var progress = 0
	const interval = setInterval((t) => {
		console.log(progress)
		progress++;
		if(progress>99) {
			console.log("Done!")
			go("menu")
			clearInterval(interval)
		}
	// Black background
	drawRect({
		width: width(),
		height: height(),
		color: rgb(0, 0, 0),
	})

	// A pie representing current load progress
	drawCircle({
		pos: center(),
		radius: 32,
		end: map(progress, 0, 1, 0, 360),
	})

	drawText({
		text: "loading" + ".".repeat(wave(1, 4, time() * 12)),
		font: "monospace",
		size: 24,
		anchor: "center",
		pos: center().add(0, 70),
	})
	})
})
scene("notmobile", () => {
	add([
		pos(center()),
		sprite("bean"),
		area(),
		body()
	])
	add([
        text(`Desculpe, mas o jogo só funciona em touch`, {
            size: 16,
            width: width(),
            // font: "breakout"
        }),
        pos(0, height()*(3/4)),
    ]);
})
go("loading")
/*if(kaboom.isTouch()) {
  go("menu")
} else {
	go("notmobile")
}
*/
debug.inspect = window.location.hash==="#debug"