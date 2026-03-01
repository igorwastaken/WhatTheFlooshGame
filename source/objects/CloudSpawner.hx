package objects;

import flixel.FlxG;
import flixel.FlxSprite;
import flixel.group.FlxGroup;
import flixel.math.FlxRandom;
import flixel.util.FlxColor;

/**
 * Spawns clouds from the bottom that float left-and-upward,
 * matching the behaviour in the original Kaplay game.
 */
class CloudSpawner extends FlxGroup
{
	var _rng:FlxRandom = new FlxRandom();
	var _timer:Float   = 0;
	static inline var INTERVAL:Float = 0.6;

	public function new()
	{
		super();
		// Pre-seed a few clouds already on screen
		for (i in 0...4)
			_spawn(_rng.float(0, FlxG.width), _rng.float(0, FlxG.height));
	}

	override public function update(elapsed:Float):Void
	{
		super.update(elapsed);
		_timer += elapsed;
		if (_timer >= INTERVAL)
		{
			_timer = 0;
			_spawn(_rng.float(0, FlxG.width), FlxG.height);
		}

		// Remove off-screen clouds
		forEachAlive(function(s:flixel.FlxBasic) {
			var sp = cast(s, FlxSprite);
			if (sp.y < -sp.height - 10) sp.kill();
		});
	}

	function _spawn(x:Float, y:Float):Void
	{
		var c = recycle(FlxSprite);
		c.x   = x;
		c.y   = y;

		// Draw a puffy cloud shape procedurally
		var w = Std.int(_rng.float(50, 90));
		var h = Std.int(_rng.float(20, 35));
		c.makeGraphic(w, h, FlxColor.TRANSPARENT);
		var px = c.pixels;
		px.lock();
		var alpha = Std.int(_rng.float(80, 140));
		var col   = (alpha << 24) | 0xFFFFFF;
		// Main body ellipse
		for (iy in 0...h)
			for (ix in 0...w)
			{
				var cx = (ix - w / 2.0) / (w * 0.45);
				var cy = (iy - h / 2.0) / (h * 0.45);
				if (cx * cx + cy * cy <= 1)
					px.setPixel32(ix, iy, col);
			}
		// Bump on top
		var bx = Std.int(w * 0.35);
		var br = Std.int(h * 0.6);
		for (iy in 0...br * 2)
			for (ix in 0...br * 2)
			{
				var cx = ix - br;
				var cy = iy - br;
				if (cx * cx + cy * cy <= br * br)
				{
					var px2 = bx + ix;
					var py2 = iy;
					if (px2 >= 0 && px2 < w && py2 >= 0 && py2 < h)
						px.setPixel32(px2, py2, col);
				}
			}
		px.unlock();
		c.dirty   = true;

		var speed = _rng.float(60, 100);
		c.velocity.x = -speed * 0.5;
		c.velocity.y = -speed;
		c.alpha = _rng.float(0.4, 0.75);
	}
}
