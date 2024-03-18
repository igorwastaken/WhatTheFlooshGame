import kaboom from "kaboom"
// import "kaboom/global"
import Game from './scenes/game.mjs'
import NewGame from './scenes/newGame.mjs'
import Menu from './scenes/menu.mjs'
import Credits from './scenes/credits.mjs'
import Dev from './scenes/devScreen.mjs'
import Shop from './scenes/shop.mjs'
import AFK from './scenes/afk.mjs'
import Difficulty from "./scenes/difficulty.mjs"
import Settings from "./scenes/settings.mjs"
// initialize context
kaboom({
    global: true,
    stretch: false,
    letterbox: true,
    width: window.innerWidth,
    height: window.innerHeight,
    fullscreen: true,
    backgroundAudio: true,
    background: [0, 20, 102],
    loadingScreen: false,
    canvas: document.getElementById("gamecanvas")
})

if (!localStorage.getItem("score")) {
    localStorage.setItem("score", 0)
}
if (!localStorage.getItem("coins")) {
    localStorage.setItem("coins", 0)
}
if (!localStorage.getItem("qt")) {
    localStorage.setItem("qt", false)
}
if (localStorage.getItem("qt") === "true") {
    localStorage.setItem("skin", "burbur")
}
if (!localStorage.getItem("skin")) {
    localStorage.setItem("skin", "bean")
}
if (!localStorage.getItem("settings:fullscreen")) {
    localStorage.setItem("settings:fullscreen", 0)
}
if (!localStorage.getItem("settings:muted")) {
    localStorage.setItem("settings:muted", 0)
}
// load assets
loadSprite("bean", "sprites/bean.png")
loadSprite("cloud", "sprites/elements/clouds.png")
loadSprite("plane", "sprites/elements/plane.png")
loadSprite("star", "sprites/elements/star.png")
loadSprite("coin", "sprites/elements/coins.gif")
loadSprite("rocket", "sprites/elements/rockets.png")
loadSprite("rocket2", "sprites/elements/rockets2.png")
loadSprite("rocket3", "sprites/elements/rockets3.png")
loadSprite("ufo", "sprites/elements/ufo.png")
loadSprite("clock", "sprites/elements/clock.png")
loadSprite("empadinhalogo", "sprites/elements/empadinhalogo.png")

// sounds
loadSound("20190724", "sounds/20190724.mp3")
loadSound("score", "sounds/score.mp3")
loadSound("20210616", "sounds/20210616.mp3")
loadSound("20190724 2", "sounds/20190724 2.mp3")
loadSound("20210511", "sounds/20210511.mp3")

// Skins
loadSprite("nerd", "sprites/skins/nerd.png")
loadSprite("skull", "sprites/skins/skull.png")
loadSprite("burbur", "sprites/skins/burbur.png")
loadSprite("poop", "sprites/skins/poop.png")

// Icons
loadSprite("instagram", "sprites/icons/instagram.png")
loadSprite("settings", "sprites/icons/settings.png")
loadSprite("cl:AL", "sprites/icons/Cl-AL.png")


const menumusic = play("20190724 2", {
    loop: true,
    volume: 1,
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

scene("game:easy", () => {
    if (localStorage.getItem("settings:muted") == 0) {
        gamemusic.play()
        menumusic.volume = 0
        creditsmusic.volume = 0
        if (localStorage.getItem("qt") === "true") {
            gamemusic.volume = 5
        } else {
            gamemusic.volume = 1
        }
    } else {
        menumusic.volume = 0
        creditsmusic.volume = 0
        gamemusic.volume = 0
    }
    Game(0.5, 0.5, 2.2);
})
scene("game:impossible", () => {
    if (localStorage.getItem("settings:muted") == 0) {
        gamemusic.play()
        menumusic.volume = 0
        creditsmusic.volume = 0
        if (localStorage.getItem("qt") === "true") {
            gamemusic.volume = 5
        } else {
            gamemusic.volume = 1
        }
    } else {
        menumusic.volume = 0
        creditsmusic.volume = 0
        gamemusic.volume = 0
    }
    NewGame(2, 3, 2);
})
scene("game:normal", () => {
    if (localStorage.getItem("settings:muted") == 0) {
        gamemusic.play()
        console.log("Can play song")
        menumusic.volume = 0
        creditsmusic.volume = 0
        if (localStorage.getItem("qt") === "true") {
            gamemusic.volume = 5
        } else {
            gamemusic.volume = 1
        }
    } else {
        console.log("Can't play song")
        menumusic.volume = 0
        creditsmusic.volume = 0
        gamemusic.volume = 0
    }
    Game(1, 1, 1);
})
scene("game:hard", () => {
    if (localStorage.getItem("settings:muted") == 0) {
        gamemusic.play()
        console.log("Can play song")
        menumusic.volume = 0
        creditsmusic.volume = 0
        if (localStorage.getItem("qt") === "true") {
            gamemusic.volume = 5
        } else {
            gamemusic.volume = 1
        }
    } else {
        console.log("Cannot play song")
        menumusic.volume = 0
        creditsmusic.volume = 0
        gamemusic.volume = 0
    }
    Game(3, 6, 2);
})
scene("settings", () => {
    Settings()
    setCursor("default")
})
scene("afk", () => {
    setCursor("none")
    AFK(1);
})
scene("difficulty", () => {
    setCursor("default")
    Difficulty()
})
scene("devOptions", () => {
    setCursor("default")
    Dev()
})
scene("menu", () => {
   // setFullscreen()
    setCursor("default")
    setTimeout(function(){window.scrollTo(0,0);},1);
    document.getElementById("gamecanvas").style.width = "100%"
    document.getElementById("gamecanvas").style.height = "100%"
    // burp()
    // play("score")
    if (localStorage.getItem("settings:muted") == 0) {
        menumusic.play()
        console.log("Can play song")
        menumusic.volume = 1
        creditsmusic.volume = 0
        gamemusic.volume = 0
    } else {
        console.log("Cannot play song")
        menumusic.volume = 0
        creditsmusic.volume = 0
        gamemusic.volume = 0
    }
    Menu();
})
scene("credits", () => {
    setCursor("default")
    /*creditsmusic.play()
    creditsmusic.volume = 1
    menumusic.volume = 0
    gamemusic.volume = 0*/
    Credits();
})
scene("shop", () => {
    setCursor("default")
    if (localStorage.getItem("settings:muted") == 0) {
        creditsmusic.play()
        creditsmusic.volume = 1
        menumusic.volume = 0
        gamemusic.volume = 0
    } else {
        menumusic.volume = 0
        creditsmusic.volume = 0
        gamemusic.volume = 0
    }
    Shop();
})
scene("loading", () => {
    setCursor("none")
    var progress = 0
   /* add([
        sprite("empadinhalogo"),
        pos(width()/4.8, height()/4.8),
        scale(0.5),
        area()
    ]) */
    const interval = setInterval((t) => {
        //console.log(progress)
        progress++;
        if (progress > 99) {
            console.log("Done!")
            go("warning")
           // burp()
            clearInterval(interval)
            // alert("O jogo está instável no momento, mas ainda é jogável (:")
            /*alert("AVISO: Tente o máximo NÃO soltar seu dedo, o personagem pode teleportar para exatamente onde você clicar. Isso pode gerar um problema e você pode até mesmo morrer entre as estrelas. Enquanto no computador, tente jogar em tela cheia (F11 + F5)")*/
        }
        // protext.text=`Carregando... (${progress})`
    }, rand(0.4, 1))
    /*const cl = add([
        pos(10, 10),
        sprite("cl:AL"),
        scale(0.3),
        area(),
        opacity(1)
    ])*/
    
})
scene("warning", () => {
    setCursor("default")
  //  if(localStorage.getItem("settings:muted") == 0) burp()
    if (!localStorage.getItem("language")) {
        const firstText = add([
            text("Welcome, first of all, choose your language.", {
                size: 20,
                width: width(),
                align: "center"
            }),
            pos(0,10),
            area()
        ])
        const portuguese = add([
            text("Português", {
                size: 16,
                width: width(),
                align: "center"
            }),
            pos(0,60),
            area()
        ])
        const english = add([
            text("English", {
                size: 16,
                width: width(),
                align: "center"
            }),
            pos(0,100),
            area()
        ])
        portuguese.onClick(() => {
            localStorage.setItem("language", "pt-br")
            go("warning")
        })
        english.onClick(() => {
            localStorage.setItem("language", "en")
            go("warning")
        })
    } else {
    const firstText = add([
        text("Novidades:", {
            size: 26
        }),
        pos(10, 10),
        area(),
        scale(2)
    ])
    const secondText = add([
        text("• Agora estamos trabalhando na versão 3.0 do WTFL!\n• Música de menu atualizado.\n• Correção e melhorias\n• Última atualização: 18/02/2024", {
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
        pos(10, height() - 100),
        // scale(1),
        area()
    ])
    onClick(() => { 
        if(localStorage.getItem("settings:muted") == 0) burp(); 
        go("menu")
        /*const c = confirm("Desculpe, mas o jogo não pode ser acessado agora.\nClique \"OK\" para saber mais.");
        if(c == true) { window.location.href = "https://status.igor.mom/incident/291358" }*/
    })
    onKeyPress(() => { 
        if(localStorage.getItem("settings:muted") == 0) burp(); 
        go("menu") 
        // confirm("Desculpe, mas o jogo não pode ser acessado agora.\nClique \"OK\" para saber mais.");
        /*const c = confirm("Desculpe, mas o jogo não pode ser acessado agora.\nClique \"OK\" para saber mais.");
        if(c == true) { window.location.href = "https://status.igor.mom/incident/291358" }*/
    })
    }
})

go("loading")
debug.inspect = window.location.hash === "#debug"

onDestroy((e) => {
    debug.log("Item destruído")
})
