import kaboom, { Color } from "kaplay";
import "kaplay/global";
import Game from "./scenes/game.js";
import Menu from "./scenes/menu.js";
import Credits from "./scenes/credits.js";
import Dev from "./scenes/devScreen.js";
import Shop from "./scenes/shop.js";
import AFK from "./scenes/afk.js";
import Difficulty from "./scenes/difficulty.js";
import Settings from "./scenes/settings.js";
import Stats from "./scenes/stats.js";
import { CSSColor } from "kaplay/dist/declaration/math/color.js";

// Get canvas element and initialize kaboom
const canvas = document.getElementById("gamecanvas");
const k = kaboom({
    global: true,
    width: window.innerWidth,
    height: window.innerHeight,
    background: [16, 52, 175],
    loadingScreen: true,
    font: "pixellari",
});

loadSprite("cursor", "sprites/cursor/default.png");
const MOUSE_VEL = 200;

// Custom cursor that follows the mouse
const cursor = add([
    sprite("cursor"),
    pos(),
    fakeMouse({ followMouse: true }),
]);

// Custom loading screen using draw functions and tweened transitions
onLoading((progress) => {
    drawRect({
        width: width(),
        height: height(),
        color: rgb(16, 52, 175),
    });
    drawText({
        text: "What The Floosh Game",
        font: "pixellari",
        size: 24,
        anchor: "center",
        pos: center().add(0, 70),
    });
    drawText({
        text: "Criado com Kaplay.js",
        font: "pixellari",
        size: 20,
        anchor: "center",
        pos: center().add(0, 120),
    });
});

// Set localStorage defaults
const defaultSettings = {
    "score.easy": "0",
    "score.normal": "0",
    "score.hard": "0",
    "score.impossible": "0",
    "coins": "0",
    "qt": "false",
    "skin": "bean",
    "settings:fullscreen": "0",
    "settings:muted": "0",
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
        bean: "./sprites/bean.png",
        cloud: "./sprites/elements/clouds.png",
        plane: "./sprites/elements/plane.png",
        star: "./sprites/elements/star.png",
        coin: "./sprites/elements/coins.png",
        impulse: "./sprites/elements/impulse.png",
        rocket: "./sprites/elements/rockets.png",
        rocket2: "./sprites/elements/rockets2.png",
        rocket3: "./sprites/elements/rockets3.png",
        ufo: "./sprites/elements/ufo.png",
        clock: "./sprites/elements/clock.png",
        kaplay: "./sprites/kaplay.webp",
        nerd: "./sprites/skins/nerd.png",
        skull: "./sprites/skins/skull.png",
        burbur: "./sprites/skins/burbur.png",
        poop: "./sprites/skins/poop.png",
        instagram: "./sprites/icons/instagram.png",
        settings: "./sprites/icons/settings.png",
        "cl:AL": "./sprites/icons/Cl-AL.png",
        background: "./sprites/elements/bg.png",
        pointer: "./sprites/icons/cursor_pointer.png",
        like: "./sprites/icons/like.png",
    },
    sounds: {
        // "20190724-old": "./sounds/20190724.mp3",
        "20190724": "./sounds/20190724-Remake.wav",
        score: "./sounds/score.mp3",
        "20210616": "./sounds/20210616.mp3",
        // "20190724 2-old": "./sounds/20190724 2.mp3",
        "20190724 2": "./sounds/20190724-Menu.wav",
        // intro: "./sounds/20190724-2-_intro-loop_.mp3",
        "20210511": "./sounds/20210511.mp3",
        coin: "./sounds/ui/retro-game-coin-pickup-jam-fx-1-00-03.mp3",
        "ui:click": "./sounds/ui/click.mp3",
        powerup: "./sounds/ui/click.mp3",
    },
};

loadFont("pixellari", "./fonts/Pixellari.ttf");
for (const [key, value] of Object.entries(assets.sprites)) {
    loadSprite(key, value);
}
for (const [key, value] of Object.entries(assets.sounds)) {
    loadSound(key, value)
        .then(() => {
            console.log(`${key} carregado com sucesso`);
        })
        .catch((err) => {
            console.error(`Erro ao carregar ${key}:`, err);
        });
}

// Music configuration with tweened volume changes for smooth transitions
const musicConfig: Record<string, any> = {
    menu: play("20190724 2", { loop: true, volume: 0 }),
    game: play("20190724", { loop: true, volume: 0 }),
    credits: play("20210511", { loop: true, volume: 0 }),
    stats: play("20210616", { loop: true, volume: 0 }),
    intro: play("intro", { loop: true, volume: 0 }),
};

let oldScene: string | undefined = undefined;
function configureMusic(scene: string) {
    if (localStorage.getItem("settings:muted") === "0") {
        if (oldScene !== undefined && musicConfig[oldScene]) {
            // Tween volume down for previous scene
            tween(musicConfig[oldScene], { volume: 0 }, 0.5, (v) => {
                musicConfig[oldScene].volume = v.volume;
            });
        }
        if (oldScene !== scene && musicConfig[scene]) {
            musicConfig[scene].play();
        }
        tween(musicConfig[scene], { volume: 1 }, 0.5, (v) => {
            musicConfig[scene].volume = v.volume;
        });
    } else {
        // Mute all sounds
        Object.keys(musicConfig).forEach((key) => (musicConfig[key].volume = 0));
        console.log(scene);
    }
    oldScene = scene;
}

// Background color transition using lerp
const setBackground = (target: string | Color) => {
    let currentBg = k.getBackground();
    if (typeof currentBg === "string") currentBg = k.rgb(currentBg);
    const targetColor: Color = typeof target === "string" ? k.rgb(target) : target;
    if (!targetColor || currentBg === targetColor) return;

    let t = 0;
    const speedFactor = 1.0;
    const lerpUpdate = onUpdate(() => {
        t = Math.min(t + dt() * speedFactor, 1);
        k.setBackground(lerp(currentBg, targetColor, t));
        if (t >= 1) lerpUpdate.cancel();
    });
    return lerpUpdate;
};

// Scene definitions
scene("block-example-1", async () => {
    if (volume() === 0) canvas?.classList.remove("pointer-events-none");

    onSceneLeave(() => {
        if (k.volume() === 0) canvas?.classList.add("pointer-events-none");
    });

    const bgLerp = setBackground("salmon");
    let inner;
    
    // Create animated pointer circle with nested elements
    const circlePointer = add([
        anchor("center"),
        pos(center().sub(0, 26)),
        circle(186, { fill: true }),
        color("lightsalmon"),
        scale(0),
        {
            add() {
                inner = this.add([
                    k.anchor("center"),
                    k.pos(0),
                    k.circle(100),
                    k.color(k.WHITE),
                    k.outline(38, k.rgb("#a32858")),
                    k.scale(1),
                ]);
            },
        },
        animate(),
        "animateCircle",
    ]);

    const pointer = circlePointer.add([
        anchor("center"),
        sprite("pointer"),
        scale(0),
        rotate(60),
    ]);
    const like = circlePointer.add([
        anchor("center"),
        sprite("like"),
        scale(0),
        rotate(60),
    ]);
    const bubble = add([
        anchor("center"),
        pos(center().add(0, circlePointer.radius - 24)),
        rect(Math.min(380, width() - 60), 80, { radius: 12 }),
        color(WHITE),
        outline(4, BLACK),
        scale(0),
        "animateBubble",
    ]);
    const texto = bubble.add([
        anchor("center"),
        pos(0),
        text(`${isTouchscreen() ? "Tap" : "Click"} to enable sound!`, {
            size: 24,
            width: bubble.width - 60,
            align: "center",
        }),
        color(BLACK),
    ]);

    // Tween animations for smooth scale and rotation changes
    tween(circlePointer.scale, vec2(1), 0.33, (v) => (circlePointer.scale = v), easings.easeOutBack);
    tween(pointer.angle, 0, 0.4, (v) => (pointer.angle = v), easings.easeOutBack);
    tween(pointer.scale, vec2(3), 0.5, (v) => (pointer.scale = v), easings.easeOutBack);

    if (!k.volume()) {
        await wait(0.05);
        await tween(bubble.scale, vec2(1), 0.55, (v) => (bubble.scale = v), easings.easeOutBack);
        /*circlePointer.use({
            update() {
                // Continuous scale pulsing animation
                circlePointer.scale = vec2(
                    (Math.sin(time() * 2), 0.06, 1)
                );
            },
        });*/
    }

    async function onSoundEnabled() {
        if (k.volume() === 0) k.volume(1);
        play("powerup", { detune: 400, volume: 0.6 });
        tween(pointer.scale, vec2(0), 0.33, (v) => (pointer.scale = v), easings.easeOutQuad);
        tween(bubble.scale, vec2(0), 0.33, (v) => (bubble.scale = v), easings.easeOutQuad);
        tween(like.angle, 0, 0.4, (v) => (like.angle = v), easings.easeOutBack);
        tween(like.scale, vec2(3), 0.5, (v) => (like.scale = v), easings.easeOutBack);
        tween(circlePointer.pos, center(), 0.33, (v) => (circlePointer.pos = v), easings.easeOutQuad);
        circlePointer.unuse("animateCircle");
        tween(inner.scale, vec2(1.2), 0.55, (v) => (inner.scale = v), easings.easeOutBack);
        tween(inner.outline.color, rgb("#abdd64"), 0.55, (v) => (inner.outline.color = v), easings.easeOutBack);
        tween(circlePointer.color, rgb("#6bc96c"), 0.55, (v) => (circlePointer.color = v), easings.easeOutBack);
        bgLerp?.cancel();
        setBackground(rgb("#5ba675"));
        setTimeout(() => go("warning"), 2000);
    }
    onClick(onSoundEnabled);
});

// Define additional scenes (game modes, settings, menu, credits, etc.)
scene("game:easy", () => {
    configureMusic("game");
    Game(1, 0.5, 1, "easy");
});
scene("game:normal", () => {
    configureMusic("game");
    Game(0.5, 1, 0.4, "normal");
});
scene("game:hard", () => {
    configureMusic("game");
    Game(3, 6, 1.2, "hard");
});
scene("game:impossible", () => {
    configureMusic("game");
    Game(2, 3, 2, "impossible");
});
scene("settings", () => Settings());
scene("afk", () => {
    configureMusic("menu");
    AFK(1);
});
scene("difficulty", () => Difficulty());
scene("devOptions", () => Dev());
scene("menu", () => {
    configureMusic("menu");
    Menu();
});
scene("credits", () => {
    configureMusic("credits");
    Credits();
});
scene("shop", () => {
    configureMusic("credits");
    Shop();
});
scene("stats", () => {
    configureMusic("stats");
    Stats();
});
scene("loading", () => {
    drawText({
        text: "What The Floosh Game",
        font: "pixellari",
        size: 24,
        anchor: "center",
        pos: center().add(0, 70),
    });
    drawText({
        text: "Criado com Kaplay.js",
        font: "pixellari",
        size: 20,
        anchor: "center",
        pos: center().add(0, 120),
    });
    let progress = 0;
    const interval = setInterval(() => {
        progress++;
        if (progress > 99) {
            go("block-example-1");
            clearInterval(interval);
        }
    }, rand(400, 1000) / 1000);
});
scene("warning", () => {
    configureMusic("menu");
    const padding = 20;
    add([
        sprite("background", { width: width(), height: height() }),
        layer("bg"),
        fixed(),
    ]);
    const player = add([
        sprite("bean"),
        pos(20, 20),
        area(),
        body(),
        offscreen({ destroy: false, distance: 0 }),
        z(1),
        scale(0.3),
        "player",
        layer("game"),
    ]);
    onClick(() => go("menu"));
    onKeyPress(() => go("menu"));
    onTouchMove((_, pos) => player.moveTo(pos.clientX, pos.clientY));
    onMouseMove((pos) => player.moveTo(pos.x, pos.y));
    add([
        text("What The Floosh Game", { size: 30, width: width() - padding * 2, align: "center" }),
        pos(width() / 2, height() * 0.5 - padding),
        anchor("center"),
        z(3),
    ]);
    add([
        text("Criado com kaplay.js", { size: 24, width: width() - padding * 2, align: "center" }),
        pos(width() / 2, height() * 0.6 - padding),
        anchor("center"),
        z(3),
    ]);
    add([
        text("Clique qualquer canto para iniciar", { size: 18, width: width() - padding * 2, align: "center" }),
        pos(width() / 2, height() - padding),
        anchor("center"),
        z(3),
    ]);
    for (let i = 0; i < 50; i++) {
        add([
            sprite("star"),
            area(),
            pos(rand(width()), rand(height())),
            scale(rand(0.1, 0.3)),
            rotate(rand(0, 360)),
            "stars",
            z(0.5),
            layer("bg"),
        ]);
    }
});

setLayers(["bg", "game", "ui"], "game");
go("block-example-1");
