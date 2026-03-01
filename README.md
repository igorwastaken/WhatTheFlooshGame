# What The Floosh Game — HaxeFlixel Port

Port do jogo original em Kaplay.js para **HaxeFlixel**.

---

## Estrutura do Projeto

```
wtfl-haxe/
├── Project.xml              ← Configuração OpenFL/Lime
├── source/
│   ├── Main.hx              ← Entry-point (abre o FlxGame)
│   ├── Reg.hx               ← Registro global + save data (FlxSave)
│   ├── states/
│   │   ├── MenuState.hx     ← Menu principal
│   │   ├── DifficultyState.hx
│   │   ├── PlayState.hx     ← Loop de gameplay principal ★
│   │   ├── GameOverState.hx
│   │   ├── CreditsState.hx
│   │   ├── StatsState.hx
│   │   └── AfkState.hx
│   └── objects/
│       ├── Player.hx        ← Bean controlado pelo mouse
│       ├── Obstacle.hx      ← Rockets e UFOs
│       ├── Coin.hx          ← Moedas coletáveis
│       ├── StarField.hx     ← Estrelas de fundo estáticas
│       ├── CloudSpawner.hx  ← Nuvens com scroll
│       └── ParticleExplosion.hx ← Explosão de morte
├── assets/
│   ├── fonts/
│   │   └── Pixellari.ttf   ← Copie do projeto original
│   ├── images/              ← Copie os PNGs do projeto original
│   │   ├── bean.png
│   │   ├── rocket.png  (rocket.png / rocket2.png / rocket3.png)
│   │   ├── ufo.png
│   │   ├── coin.png
│   │   ├── cloud.png
│   │   └── ...
│   └── sounds/              ← Copie os arquivos de áudio (converta para .ogg)
│       ├── coin.ogg
│       └── burp.ogg
```

---

## Pré-requisitos

```bash
# 1. Instale o Haxe (https://haxe.org/download/)
# 2. Instale as libs via haxelib
haxelib install flixel
haxelib install flixel-addons
haxelib install flixel-ui
haxelib run lime setup         # instala OpenFL / Lime
```

---

## Como Compilar

```bash
cd wtfl-haxe

# Desktop (nativo — recomendado para desenvolvimento)
lime test neko
lime test hl         # HashLink (mais rápido)
lime test cpp        # C++ nativo (produção)

# HTML5 (navegador)
lime test html5

# Modo debug com HaxeFlixel debugger
lime test neko -debug
```

---

## Mapeamento do Original → Port

| Kaplay (JS/TS)                     | HaxeFlixel (Haxe)                        |
|------------------------------------|------------------------------------------|
| `kaboom({ ... })`                  | `new FlxGame(480, 640, MenuState)`       |
| `scene("menu", () => Menu())`      | `MenuState extends FlxState`             |
| `scene("game:normal", () => ...)`  | `PlayState` + `Reg.selectedDifficulty`   |
| `add([sprite("bean"), ...])`       | `new Player("bean")` (FlxSprite)         |
| `onMouseMove(pos => player...)`    | `FlxG.mouse.x` no `update()`            |
| `localStorage`                     | `FlxSave` (Reg.hx)                       |
| `tween(obj, target, time, cb)`     | `FlxTween.tween(obj, {prop: val}, time)` |
| `onCollide("Rectred", cb)`         | `FlxG.overlap(player, obstacles, cb)`    |
| `play("coin")`                     | `FlxG.sound.play("assets/sounds/...")`   |
| `addKaboom(pos)`                   | `ParticleExplosion` (FlxEmitter)         |

---

## Parâmetros de Dificuldade (Idênticos ao Original)

| Dificuldade | velocity | spawn | coinsSpawn |
|-------------|----------|-------|------------|
| Fácil       | 1.0      | 0.5   | 1.0        |
| Normal      | 0.5      | 1.0   | 0.4        |
| Difícil     | 3.0      | 6.0   | 1.2        |
| Impossível  | 2.0      | 3.0   | 2.0        |

---

## Assets

Os assets gráficos e sonoros **não estão incluídos** por questões de direitos autorais.
Copie-os do projeto original:

- `public/sprites/**/*.png` → `assets/images/`
- `public/sounds/**/*.mp3|wav` → `assets/sounds/` (converta para `.ogg` com ffmpeg)
- `public/fonts/Pixellari.ttf` → `assets/fonts/`

```bash
# Converter áudio para .ogg (requer ffmpeg)
ffmpeg -i 20190724-Remake.wav  -c:a libvorbis game_music.ogg
ffmpeg -i coin.mp3             -c:a libvorbis coin.ogg
```

---

## Fallback Procedural

Quando os assets **não são encontrados**, o jogo usa sprites desenhados
proceduralmente em código (pixel-by-pixel), garantindo que o jogo rode
mesmo sem os arquivos de imagem. Isso é tratado nos `catch` de cada classe em `objects/`.

---

## Licença

Port desenvolvido como exercício. O jogo original pertence a **igorwastaken**.
