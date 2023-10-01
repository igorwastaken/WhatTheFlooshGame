import kaboom from "kaboom"
import "kaboom/global"
import Game from './scenes/game'
import Menu from './scenes/menu'
// initialize context
kaboom({
	backgroundAudio: true,
	background: [0,0,0]
})

// load assets
loadSprite("bean", "sprites/bean.png")
loadSound("20190724", "sounds/20190724.mp3")

loadSound("20190724 2", "sounds/20190724 2.mp3")
const menumusic = play("20190724 2", {
	loop: true,
	volume: 0
})
const gamemusic = play("20190724", {
	loop: true,
	volume: 0
})
gamemusic.play()
menumusic.play()
// record(60)
scene("game", () => {
	menumusic.volume = 0
	gamemusic.volume = 1
	debug.log("Como se fosse aquele jogo do Pou")
	debug.log(`Use o touch e/ou o mouse para mover o Floosh.`)
	/*setTimeout(() => {
	  debug.log("Como se fosse aquele joguinho do Pou")
	}, 500)*/
	Game();
})
scene("menu", () => {
	menumusic.volume = 1
	gamemusic.volume = 0
	Menu();
})

go("menu")

debug.inspect = window.location.hash==="#debug"

/*const recor = record(60)

setTimeout(() => {
   // recor.stop()
   recor.download()
}, 30000)*/