package objects;

import flixel.FlxSprite;
import flixel.util.FlxColor;

/**
 * An obstacle (rocket or UFO) that the player must dodge.
 * Tries to load real asset; falls back to a procedurally drawn shape.
 */
class Obstacle extends FlxSprite
{
	public var obstacleType(default, null):String;

	public function new(x:Float, y:Float, type:String = "rocket")
	{
		super(x, y);
		obstacleType = type;

		try
		{
			loadGraphic("assets/images/" + type + ".png");
			setGraphicSize(type == "ufo" ? 40 : 20, type == "ufo" ? 20 : 40);
			updateHitbox();
		}
		catch (e:Dynamic)
		{
			_draw(type);
		}
	}

	function _draw(type:String):Void
	{
		if (type == "ufo")
		{
			// Flat ellipse shape
			makeGraphic(44, 22, FlxColor.TRANSPARENT);
			var px = pixels;
			px.lock();
			for (iy in 0...22)
				for (ix in 0...44)
				{
					var cx = (ix - 22.0) / 20;
					var cy = (iy - 11.0) / 9;
					if (cx * cx + cy * cy <= 1)
						px.setPixel32(ix, iy, FlxColor.fromRGB(180, 220, 255));
				}
			// Dome
			for (iy in 0...10)
				for (ix in 10...34)
				{
					var cx = (ix - 22.0) / 10;
					var cy = (iy - 5.0) / 5;
					if (cx * cx + cy * cy <= 1)
						px.setPixel32(ix, iy, FlxColor.fromRGB(100, 180, 255));
				}
			px.unlock();
			dirty = true;
		}
		else
		{
			// Rocket — tall narrow triangle + body
			makeGraphic(16, 40, FlxColor.TRANSPARENT);
			var px = pixels;
			px.lock();
			for (iy in 0...40)
				for (ix in 0...16)
				{
					var nx = ix - 8.0;
					// Body
					if (iy > 10 && iy < 36 && Math.abs(nx) <= 5)
						px.setPixel32(ix, iy, FlxColor.fromRGB(220, 80, 60));
					// Nose cone
					if (iy <= 10 && Math.abs(nx) <= (10 - iy) * 0.5)
						px.setPixel32(ix, iy, FlxColor.fromRGB(255, 120, 80));
					// Fins
					if (iy >= 30 && iy < 40)
					{
						if (ix < 3 || ix > 13)
							px.setPixel32(ix, iy, FlxColor.fromRGB(180, 60, 40));
					}
					// Exhaust
					if (iy >= 36 && Math.abs(nx) <= 3)
						px.setPixel32(ix, iy, FlxColor.fromRGB(255, 200, 40));
				}
			px.unlock();
			dirty = true;
		}
		updateHitbox();
		// Slim hitbox
		width  = Math.max(width  - 4, 8);
		height = Math.max(height - 4, 8);
		offset.set(2, 2);
	}

	override public function update(elapsed:Float):Void
	{
		super.update(elapsed);
		// Auto-destroy when well off-screen
		if (y < -height - 10 || x > flixel.FlxG.width + 80)
			kill();
	}
}
