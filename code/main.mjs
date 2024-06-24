import kaboom from "kaboom";
import Game from "./scenes/game.mjs";
import NewGame from "./scenes/newGame.mjs";
import Menu from "./scenes/menu.mjs";
import Credits from "./scenes/credits.mjs";
import Dev from "./scenes/devScreen.mjs";
import Shop from "./scenes/shop.mjs";
import AFK from "./scenes/afk.mjs";
import Difficulty from "./scenes/difficulty.mjs";
import Settings from "./scenes/settings.mjs";
import Stats from "./scenes/stats.mjs";

// Initialize kaboom context
kaboom({
  global: true,
  width: window.innerWidth,
  height: window.innerHeight,
  fullscreen: true,
  background: [0, 20, 102],
  canvas: document.getElementById("gamecanvas"),
});

// Initialize localStorage defaults
const defaultSettings = {
  "score.easy": 0,
  "score.normal": 0,
  "score.hard": 0,
  "coins": 0,
  "qt": false,
  "skin": "bean",
  "settings:fullscreen": 0,
  "settings:muted": 0,
};

for (const [key, value] of Object.entries(defaultSettings)) {
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, value);
  }
}

if (localStorage.getItem("qt") === "true") {
  localStorage.setItem("skin", "burbur");
}

// Load assets
const assets = {
  sprites: {
    "bean": "sprites/bean.png",
    "cloud": "sprites/elements/clouds.png",
    "plane": "sprites/elements/plane.png",
    "star": "sprites/elements/star.png",
    "coin": "sprites/elements/coins.gif",
    "rocket": "sprites/elements/rockets.png",
    "rocket2": "sprites/elements/rockets2.png",
    "rocket3": "sprites/elements/rockets3.png",
    "ufo": "sprites/elements/ufo.png",
    "clock": "sprites/elements/clock.png",
    "empadinhalogo": "sprites/elements/empadinhalogo.png",
    "nerd": "sprites/skins/nerd.png",
    "skull": "sprites/skins/skull.png",
    "burbur": "sprites/skins/burbur.png",
    "poop": "sprites/skins/poop.png",
    "instagram": "sprites/icons/instagram.png",
    "settings": "sprites/icons/settings.png",
    "cl:AL": "sprites/icons/Cl-AL.png",
  },
  sounds: {
    "20190724": "sounds/20190724.mp3",
    "score": "sounds/score.mp3",
    "20210616": "sounds/20210616.mp3",
    "20190724 2": "sounds/20190724 2.mp3",
    "intro": "sounds/20190724-2-_intro-loop_.mp3",
    "20210511": "sounds/20210511.mp3",
    "coin": "sounds/ui/retro-game-coin-pickup-jam-fx-1-00-03.mp3",
    "ui:click": "sounds/ui/click.mp3",
  }
};

for (const [key, value] of Object.entries(assets.sprites)) {
  loadSprite(key, value);
}

for (const [key, value] of Object.entries(assets.sounds)) {
  loadSound(key, value);
}

// Initialize and configure background music
const musicConfig = {
  "menu": play("20190724 2", { loop: true, volume: 0 }),
  "game": play("20190724", { loop: true, volume: 0 }),
  "credits": play("20210511", { loop: true, volume: 0 }),
  "intro": play("intro", { loop: true, volume: 1 })
};

// Scene definitions
scene("game:easy", () => {
  configureMusic("game");
  Game(1, 0.5, 1, "easy");
});

scene("game:normal", () => {
  configureMusic("game");
  Game(1.5, 1, 0.4, "normal");
});

scene("game:hard", () => {
  configureMusic("game");
  Game(3, 6, 1.2, "hard");
});

scene("game:impossible", () => {
  configureMusic("game");
  NewGame(2, 3, 2);
});

scene("settings", () => {
  Settings();
  setCursor("default");
});

scene("afk", () => {
  setCursor("none");
  AFK(1);
});

scene("difficulty", () => {
  setCursor("default");
  Difficulty();
});

scene("devOptions", () => {
  setCursor("default");
  Dev();
});

scene("menu", () => {
  configureMusic("menu");
  setCursor("default");
  document.getElementById("gamecanvas").style.width = "100%";
  document.getElementById("gamecanvas").style.height = "100%";
  Menu();
});

scene("credits", () => {
  setCursor("default");
  configureMusic("credits");
  Credits();
});

scene("shop", () => {
  setCursor("default");
  configureMusic("credits");
  Shop();
});

scene("stats", () => {
  setCursor("default");
  configureMusic("credits");
  Stats();
});

scene("loading", () => {
  setCursor("none");
  var progress = 0;
  const interval = setInterval(() => {
    progress++;
    if (progress > 99) {
      go("warning");
      clearInterval(interval);
    }
  }, rand(0.4, 1));
});

scene("warning", () => {
  setCursor("default");
  startmusic.volume = 1;
  startmusic.play();
  if (!localStorage.getItem("language")) {
    showLanguageSelection();
  } else {
    showUpdateNotice();
  }
});

function configureMusic(scene) {
  if (localStorage.getItem("settings:muted") == 0) {
    musicConfig[scene].play();
    musicConfig["menu"].volume = 0;
    musicConfig["credits"].volume = 0;
    musicConfig["game"].volume = localStorage.getItem("qt") === "true" ? 5 : 1;
  } else {
    musicConfig["menu"].volume = 0;
    musicConfig["credits"].volume = 0;
    musicConfig["game"].volume = 0;
  }
}

function showLanguageSelection() {
  const firstText = add([
    text("Welcome, first of all, choose your language.", { size: 20, width: width(), align: "center" }),
    pos(0, 10),
    area(),
  ]);
  const portuguese = add([
    text("Português", { size: 16, width: width(), align: "center" }),
    pos(0, 60),
    area(),
  ]);
  const english = add([
    text("English", { size: 16, width: width(), align: "center" }),
    pos(0, 100),
    area(),
  ]);
  portuguese.onClick(() => {
    localStorage.setItem("language", "pt-br");
    go("menu");
  });
  english.onClick(() => {
    localStorage.setItem("language", "en");
    go("menu");
  });
}

function showUpdateNotice() {
  const firstText = add([
    text("Novidades:", { size: 26 }),
    pos(10, 10),
    area(),
    scale(2),
  ]);
  const secondText = add([
    text("• Agora estamos trabalhando na versão 3.0 do WTFL!\n• Música de menu atualizado.\n• Correção e melhorias\n• Última atualização: 18/02/2024", {
      size: 18,
      width: width(),
    }),
    pos(10, 60),
    area(),
  ]);
  const OK = add([
    text("Clique em qualquer lugar ou em qualquer tecla para jogar", { size: 14, width: width() }),
    pos(10, height() - 100),
    area(),
  ]);
  onClick(() => {
    if (localStorage.getItem("settings:muted") == 0) burp();
    go("menu");
  });
  onKeyPress(() => {
    if (localStorage.getItem("settings:muted") == 0) burp();
    go("menu");
  });
}

go("loading");
debug.inspect = window.location.hash === "#debug";