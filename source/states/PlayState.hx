package states;

import flixel.FlxG;
import flixel.FlxObject;
import flixel.FlxSprite;
import flixel.FlxState;
import flixel.effects.particles.FlxEmitter;
import flixel.group.FlxGroup;
import flixel.math.FlxMath;
import flixel.math.FlxRandom;
import flixel.text.FlxText;
import flixel.tweens.FlxTween;
import flixel.tweens.FlxEase;
import flixel.util.FlxColor;
import flixel.util.FlxTimer;
import objects.Player;
import objects.Obstacle;
import objects.Coin;
import objects.ParticleExplosion;
import objects.CloudSpawner;

/**
 * Main gameplay state — faithful HaxeFlixel port of the Kaplay original.
 *
 * Difficulty parameters mirror the original:
 *   easy:       velocity=1,  spawn=0.5, coinsSpawn=1
 *   normal:     velocity=0.5, spawn=1,  coinsSpawn=0.4
 *   hard:       velocity=3,  spawn=6,   coinsSpawn=1.2
 *   impossible: velocity=2,  spawn=3,   coinsSpawn=2
 */
class PlayState extends FlxState
{
	// ── Difficulty parameters ─────────────────────────────────────────────────
	var _velocity:Float;
	var _spawn:Float;
	var _coinsSpawn:Float;
	var _impulso:Float = 1.0;

	// ── Player ────────────────────────────────────────────────────────────────
	var _player:Player;

	// ── Object groups ─────────────────────────────────────────────────────────
	var _obstacles:FlxGroup;   // rockets + UFOs
	var _dots:FlxGroup;        // tiny white particles (Rect in original)
	var _coins:FlxGroup;
	var _starBg:FlxGroup;      // decorative scrolling stars (bg layer)
	var _clouds:CloudSpawner;

	// ── HUD ───────────────────────────────────────────────────────────────────
	var _scoreTxt:FlxText;
	var _coinsTxt:FlxText;
	var _currentScore:Int  = 0;
	var _currentCoins:Int  = 0;
	var _newBest:Bool      = false;

	// ── Spawn timers ──────────────────────────────────────────────────────────
	var _dotTimer:Float      = 0;
	var _dotInterval:Float;
	var _obsTimer:Float      = 0;
	var _obsInterval:Float;
	var _coinTimer:Float     = 0;
	var _coinInterval:Float;
	var _planeTimer:Float    = 0;
	var _planeInterval:Float;
	var _starTimer:Float     = 0;
	var _starInterval:Float  = 0.5;
	var _impulsoTimer:Float  = 20.0; // first impulso powerup at 20s

	// ── State flags ───────────────────────────────────────────────────────────
	var _dead:Bool    = false;
	var _deathTimer:Float = 0;

	// ── RNG ───────────────────────────────────────────────────────────────────
	var _rng:FlxRandom = new FlxRandom();

	// ─────────────────────────────────────────────────────────────────────────

	override public function create():Void
	{
		super.create();
		FlxG.cameras.bgColor = FlxColor.fromRGB(16, 52, 175);

		_applyDifficulty();

		// ── Background ────────────────────────────────────────────────────
		var bg = new FlxSprite();
		bg.makeGraphic(FlxG.width, FlxG.height, FlxColor.fromRGB(16, 52, 175));
		add(bg);

		// Subtle grid texture drawn on the background
		_drawBgGrid(bg);

		// ── Decorative scrolling stars (behind everything) ────────────────
		_starBg = new FlxGroup();
		add(_starBg);
		for (i in 0...30)
			_spawnBgStar(true);

		// ── Clouds ────────────────────────────────────────────────────────
		_clouds = new CloudSpawner();
		add(_clouds);

		// ── Object groups ─────────────────────────────────────────────────
		_dots      = new FlxGroup();
		_obstacles = new FlxGroup();
		_coins     = new FlxGroup();
		add(_dots);
		add(_coins);
		add(_obstacles);

		// ── Player ────────────────────────────────────────────────────────
		_player = new Player(Reg.currentSkin);
		_player.setPosition(FlxG.width / 2, 100);
		add(_player);

		// ── HUD ───────────────────────────────────────────────────────────
		_buildHud();

		// ── Coin spawner (starts after 1 second, as in original) ──────────
		_coinTimer = -1.0; // will go positive after 1s

		// ── Impulso powerup (after 20s) ───────────────────────────────────
		// handled via _impulsoTimer
	}

	// ── Difficulty config ────────────────────────────────────────────────────

	function _applyDifficulty():Void
	{
		switch (Reg.selectedDifficulty)
		{
			case "easy":
				_velocity    = 1.0;  _spawn = 0.5; _coinsSpawn = 1.0;
			case "hard":
				_velocity    = 3.0;  _spawn = 6.0; _coinsSpawn = 1.2;
			case "impossible":
				_velocity    = 2.0;  _spawn = 3.0; _coinsSpawn = 2.0;
			default: // normal
				_velocity    = 0.5;  _spawn = 1.0; _coinsSpawn = 0.4;
		}

		_dotInterval   = _rng.float(0.1, 0.2) * _spawn;
		_obsInterval   = _rng.float(0.9, 2.0) / _spawn;
		_coinInterval  = _rng.float(0.5, 1.5) * _coinsSpawn;
		_planeInterval = _rng.float(2.0, 7.0) / _spawn;
	}

	// ── HUD build ────────────────────────────────────────────────────────────

	function _buildHud():Void
	{
		// Coin icon (yellow square placeholder)
		var coinIcon = new FlxSprite(20, 20);
		coinIcon.makeGraphic(16, 16, FlxColor.YELLOW);
		coinIcon.scrollFactor.set(0, 0);
		add(coinIcon);

		_coinsTxt = new FlxText(40, 18, 120, "0", 18);
		_coinsTxt.font  = "assets/fonts/Pixellari.ttf";
		_coinsTxt.color = FlxColor.YELLOW;
		_coinsTxt.scrollFactor.set(0, 0);
		add(_coinsTxt);

		// Clock icon (cyan square placeholder)
		var clockIcon = new FlxSprite(20, 50);
		clockIcon.makeGraphic(14, 14, FlxColor.CYAN);
		clockIcon.scrollFactor.set(0, 0);
		add(clockIcon);

		_scoreTxt = new FlxText(40, 48, 200, "0", 18);
		_scoreTxt.font  = "assets/fonts/Pixellari.ttf";
		_scoreTxt.color = FlxColor.WHITE;
		_scoreTxt.scrollFactor.set(0, 0);
		add(_scoreTxt);

		// Difficulty label (top right)
		var diffLbl = new FlxText(0, 18, FlxG.width - 10, Reg.diffLabel(Reg.selectedDifficulty), 13);
		diffLbl.alignment = RIGHT;
		diffLbl.font  = "assets/fonts/Pixellari.ttf";
		diffLbl.color = FlxColor.fromRGB(180, 200, 255);
		diffLbl.scrollFactor.set(0, 0);
		add(diffLbl);
	}

	// ── Update loop ──────────────────────────────────────────────────────────

	override public function update(elapsed:Float):Void
	{
		super.update(elapsed);

		if (_dead)
		{
			_deathTimer += elapsed;
			if (_deathTimer >= 2.0)
				FlxG.switchState(new GameOverState(_currentScore));
			return;
		}

		_handleInput(elapsed);
		_updateVelocity(elapsed);
		_updateSpawners(elapsed);
		_checkCollisions();
		_updateScore(elapsed);
		_updateImpulso(elapsed);
	}

	// ── Input ────────────────────────────────────────────────────────────────

	function _handleInput(elapsed:Float):Void
	{
		// Follow mouse / touch on X axis
		var targetX = FlxG.mouse.x - _player.width / 2;
		_player.x = FlxMath.lerp(_player.x, targetX, 0.25);

		// Keyboard override
		if (FlxG.keys.pressed.LEFT)  _player.x -= Reg.PLAYER_SPEED * elapsed;
		if (FlxG.keys.pressed.RIGHT) _player.x += Reg.PLAYER_SPEED * elapsed;

		// Clamp to screen
		_player.x = FlxMath.bound(_player.x, 0, FlxG.width - _player.width);
	}

	// ── Velocity progression ─────────────────────────────────────────────────

	function _updateVelocity(elapsed:Float):Void
	{
		// Mirror original: only ramp up if below threshold
		if (_velocity >= 1.5 && _velocity < 5)
			_velocity += 0.0001 * elapsed * 60;
		else if (_velocity < 1.5)
			_velocity += 0.5 * elapsed;
	}

	// ── Spawners ─────────────────────────────────────────────────────────────

	function _updateSpawners(elapsed:Float):Void
	{
		// ── Dot particles ──────────────────────────────────────────────────
		_dotTimer += elapsed;
		if (_dotTimer >= _dotInterval)
		{
			_dotTimer = 0;
			_dotInterval = _rng.float(0.1, 0.2) * _spawn;
			_spawnDot();
		}

		// ── Obstacles (rockets / UFOs) ──────────────────────────────────
		_obsTimer += elapsed;
		if (_obsTimer >= _obsInterval)
		{
			_obsTimer = 0;
			_obsInterval = _rng.float(0.9, 2.0) / _spawn;
			var useUfo = _rng.bool(0.2); // 20% chance UFO
			_spawnObstacle(useUfo);
		}

		// ── Coins ────────────────────────────────────────────────────────
		_coinTimer += elapsed;
		if (_coinTimer >= _coinInterval)
		{
			_coinTimer = 0;
			_coinInterval = _rng.float(0.5, 1.5) * _coinsSpawn;
			_spawnCoin();
		}

		// ── Planes (UFOs moving horizontally) ────────────────────────────
		_planeTimer += elapsed;
		if (_planeTimer >= _planeInterval)
		{
			_planeTimer = 0;
			_planeInterval = _rng.float(2.0, 7.0) / _spawn;
			_spawnPlane();
		}

		// ── Decorative bg stars ───────────────────────────────────────────
		_starTimer += elapsed;
		if (_starTimer >= _starInterval)
		{
			_starTimer = 0;
			_spawnBgStar(false);
		}

		// ── Impulso powerup ───────────────────────────────────────────────
		_impulsoTimer -= elapsed;
		if (_impulsoTimer <= 0)
		{
			_impulsoTimer = _rng.float(30, 90);
			_spawnImpulso();
		}
	}

	// ── Spawn helpers ────────────────────────────────────────────────────────

	function _spawnDot():Void
	{
		var d = new FlxSprite(_rng.float(0, FlxG.width - 6), FlxG.height);
		d.makeGraphic(6, 6, FlxColor.WHITE);
		d.velocity.y = -_rng.float(100, 150) * (_velocity / _spawn) * _impulso;
		_dots.add(d);
	}

	function _spawnObstacle(isUfo:Bool = false):Void
	{
		var o = new Obstacle(_rng.float(0, FlxG.width - 32), FlxG.height, isUfo ? "ufo" : "rocket");
		var speedY = -200.0 * _velocity * _impulso;
		var speedX = isUfo ? _rng.float(50, 200) * _velocity * _impulso : 0;
		if (isUfo) speedY = -120 * _velocity * _impulso;
		o.velocity.set(speedX, speedY);
		_obstacles.add(o);
	}

	function _spawnPlane():Void
	{
		// UFO enters from left side, moves right and up
		var o = new Obstacle(-60, _rng.float(FlxG.height * 0.2, FlxG.height * 0.8), "ufo");
		o.velocity.x = _rng.float(50, 200) * _velocity * _impulso;
		o.velocity.y = -120 * _velocity * _impulso;
		_obstacles.add(o);
	}

	function _spawnCoin():Void
	{
		var c = new Coin(_rng.float(0, FlxG.width - 20), FlxG.height);
		c.velocity.y = -_rng.float(100, 150) * _velocity * _impulso;
		_coins.add(c);
	}

	function _spawnImpulso():Void
	{
		var imp = new FlxSprite(_rng.float(0, FlxG.width - 24), FlxG.height);
		imp.makeGraphic(24, 24, FlxColor.fromRGB(255, 140, 0));
		imp.ID = 1; // mark as impulso
		imp.velocity.y = -_rng.float(100, 150) * (_velocity / _spawn) * _impulso;
		_dots.add(imp); // reuse group for simplicity
	}

	function _spawnBgStar(instant:Bool):Void
	{
		var s = new FlxSprite(
			_rng.float(0, FlxG.width),
			instant ? _rng.float(0, FlxG.height) : FlxG.height
		);
		var sz = Std.int(_rng.float(2, 6));
		s.makeGraphic(sz, sz, FlxColor.fromRGBFloat(1, 1, 1, _rng.float(0.3, 0.8)));
		s.velocity.y = -_rng.float(40, 100);
		_starBg.add(s);
	}

	function _drawBgGrid(bg:FlxSprite):Void
	{
		// Draws faint grid lines directly onto the background sprite pixels
		// (purely decorative, gives depth)
		var pixels = bg.pixels;
		pixels.lock();
		var gridColor = 0x05_FFFFFF;
		for (gx in 0...16)
		{
			var x = Std.int(gx * FlxG.width / 15);
			for (y in 0...FlxG.height)
				pixels.setPixel32(x < FlxG.width ? x : FlxG.width - 1, y, gridColor);
		}
		for (gy in 0...24)
		{
			var y = Std.int(gy * FlxG.height / 23);
			for (x in 0...FlxG.width)
				pixels.setPixel32(x, y < FlxG.height ? y : FlxG.height - 1, gridColor);
		}
		pixels.unlock();
		bg.dirty = true;
	}

	// ── Collision detection ──────────────────────────────────────────────────

	function _checkCollisions():Void
	{
		// Player vs obstacles → death (unless impulso active)
		FlxG.overlap(_player, _obstacles, function(p, o) {
			if (_impulso >= 1.8) return; // invincible during impulso
			_killPlayer();
		});

		// Player vs dots (score boost — original "Rect")
		FlxG.overlap(_player, _dots, function(p, d:FlxSprite) {
			if (d.ID == 1) // impulso pickup
			{
				d.kill();
				_activateImpulso();
			}
			else
			{
				d.kill();
				_currentScore++;
				_updateScoreText();
			}
		});

		// Player vs coins
		FlxG.overlap(_player, _coins, function(p, c) {
			c.kill();
			_currentCoins++;
			Reg.coins++;
			Reg.persist();
			_coinsTxt.text = Std.string(_currentCoins);
			FlxG.sound.play("assets/sounds/coin.ogg", 0.7);
		});

		// Coins vs obstacles → destroy coin
		FlxG.overlap(_coins, _obstacles, function(c, o) {
			c.kill();
		});
	}

	// ── Score ────────────────────────────────────────────────────────────────

	function _updateScore(elapsed:Float):Void
	{
		// Continuous score increment (every frame, scaled to 60 fps)
		_currentScore += Std.int(elapsed * 60);
		_updateScoreText();
		Reg.trySetBestScore(_currentScore);
	}

	function _updateScoreText():Void
	{
		var best = Reg.getBestScore();
		if (_currentScore >= best && best > 0)
		{
			_scoreTxt.text  = Std.string(_currentScore) + " ★";
			_scoreTxt.color = FlxColor.fromRGB(255, 220, 80);
		}
		else
		{
			_scoreTxt.text  = Std.string(_currentScore);
			_scoreTxt.color = FlxColor.WHITE;
		}
	}

	// ── Impulso ───────────────────────────────────────────────────────────────

	function _activateImpulso():Void
	{
		_impulso += 14;
		FlxG.cameras.shake(0.01, 0.3);
	}

	function _updateImpulso(elapsed:Float):Void
	{
		if (_impulso > 1.8)
		{
			_currentScore += Std.int(50 * elapsed * 60 / 60);
			FlxG.cameras.shake(0.003, 0.05);
			_impulso -= 0.5 * elapsed;

			// Flash the HUD
			_scoreTxt.color = (_currentScore % 2 == 0)
				? FlxColor.fromRGB(255, 80, 40)
				: FlxColor.fromRGB(255, 220, 80);
		}
		else
		{
			_impulso = 1.0;
		}
	}

	// ── Death ─────────────────────────────────────────────────────────────────

	function _killPlayer():Void
	{
		if (_dead) return;
		_dead = true;

		FlxG.cameras.shake(0.04, 0.5);

		// Spawn explosion particles
		var exp = new ParticleExplosion(_player.getMidpoint().x, _player.getMidpoint().y);
		add(exp);
		exp.start(true, 0.8, 30);

		_player.kill();
		FlxG.sound.play("assets/sounds/burp.ogg", 0.5);

		Reg.trySetBestScore(_currentScore);
	}

	// ── Cleanup ───────────────────────────────────────────────────────────────

	override public function destroy():Void
	{
		super.destroy();
	}
}
