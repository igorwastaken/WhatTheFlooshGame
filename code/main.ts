import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs"
// import "kaboom/global"
import Game from '/scenes/game'
import Menu from '/scenes/menu'
import Credits from '/scenes/credits'
import Dev from '/scenes/devScreen'
// initialize context
kaboom({
	width: window.innerWidth,
	height: window.innerHeight,
	backgroundAudio: true,
	background: [0,20,102],
	loadingScreen: false,
	canvas: document.getElementById("gamecanvas")
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
loadSprite("plane", "sprites/plane.png")
loadSprite("star", "sprites/star.png")
loadSound("20190724", "sounds/20190724.mp3")
loadSound("score", "sounds/score.mp3")
loadSound("20190724 2", "sounds/20190724 2.mp3")
loadSound("20210511", "sounds/20210511.mp3")
loadShaderURL("vhs", null, "shaders/vhs.frag")


const menumusic = play("20190724 2", {
	loop: true,
	volume: 0,
})
const gamemusic = play("20190724", {
	loop: true,
	volume: 0,
})
const creditsmusic = play("20210511", {
	loop: true,
	volume: 0
})
const label = add([
	  pos(8, 8),
	  text("0"),
	  area()
])


// gamemusic.play()
// menumusic.play()
// record(60)

add([
	uvquad(width(), height()),
	shader("vhs")
])

scene("game", () => {
	gamemusic.play()
	menumusic.volume = 0
	creditsmusic.volume = 0
	gamemusic.volume = 1
	debug.log("Como se fosse aquele jogo do Pou")
	debug.log(`Use o touch e/ou o mouse para mover o Floosh.`)
	/*setTimeout(() => {
	  debug.log("Como se fosse aquele joguinho do Pou")
	}, 500)*/
	Game(effects, curEffect);
})

burp()
scene("devOptions", () => {
	Dev()
})
scene("menu", () => {
	// burp()
	// play("score")
	menumusic.play()
	menumusic.volume = 1
	creditsmusic.volume = 0
	gamemusic.volume = 0
	Menu();
})
scene("credits", () => {
	creditsmusic.play()
	creditsmusic.volume = 1
	menumusic.volume = 0
	gamemusic.volume = 0
	Credits();
})
scene("loading", () => {
	var progress = 0
	const interval = setInterval((t) => {
		console.log(progress)
		progress++;
		if(progress>99) {
			console.log("Done!")
			go("warning")
			clearInterval(interval)
			alert("O jogo está instável no momento, mas ainda é jogável (:")
			/*alert("AVISO: Tente o máximo NÃO soltar seu dedo, o personagem pode teleportar para exatamente onde você clicar. Isso pode gerar um problema e você pode até mesmo morrer entre as estrelas. Enquanto no computador, tente jogar em tela cheia (F11 + F5)")*/
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
scene("warning", () => {
	burp()
	const firstText = add([
		text("AVISO!", {
			size: 26
		}),
		pos(10,10),
		area(),
		scale(2)
	])
	const secondText = add([
		text("Tente NÃO tirar o seu dedo enquanto estiver jogando, assim o Flush irá mover rapidamente para outro lado, e assim você pode bater em uma estrela e perder o jogo. Enquanto no computador, para evitar isso, tente jogar em tela cheia (F11 + F5).", {
			size: 18,
			width: width()
		}),
		pos(10, 60),
		area()
	])
	const OK = add([
		text("Clique em qualquer lugar ou em qualquer tecla para jogar", {
			size: 14,
			width: width()
		}),
		pos(10, height()-100),
		// scale(1),
		area()
	])
	onClick(() => go("menu"))
	onKeyPress(() => go("menu"))
})
scene("notfull", () => {
	add([
		pos(center()),
		sprite("bean"),
		area(),
		body()
	])
	add([
        text(`O jogo funciona melhor com tela cheia. Clique em F11 e/ou recarregue a página`, {
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
// setFullscreen()
/*onUpdate(() => {
	if(!isFullscreen) {
		go("notFull")
	}
})*/

onDestroy((e) => {
	debug.log("Item destruído")
})

