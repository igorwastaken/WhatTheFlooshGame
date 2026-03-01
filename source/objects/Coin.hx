package objects;

import flixel.FlxSprite;
import flixel.util.FlxColor;

class Coin extends FlxSprite
{
	var _angle:Float = 0;

	public function new(x:Float, y:Float)
	{
		super(x, y);
		try
		{
			loadGraphic("assets/images/coin.png");
			setGraphicSize(20, 20);
			updateHitbox();
		}
		catch (e:Dynamic)
		{
			_draw();
		}
	}

	function _draw():Void
	{
		makeGraphic(18, 18, FlxColor.TRANSPARENT);
		var px = pixels;
		px.lock();
		for (iy in 0...18)
			for (ix in 0...18)
			{
				var cx = ix - 9.0;
				var cy = iy - 9.0;
				if (cx * cx + cy * cy <= 64) // r=8
					px.setPixel32(ix, iy, FlxColor.YELLOW);
				if (cx * cx + cy * cy <= 25) // r=5 inner lighter
					px.setPixel32(ix, iy, FlxColor.fromRGB(255, 240, 100));
			}
		px.unlock();
		dirty = true;
		updateHitbox();
	}

	override public function update(elapsed:Float):Void
	{
		super.update(elapsed);
		_angle = (_angle + elapsed * 180) % 360;
		// Simulate 3-D coin spin by scaling X
		scale.x = Math.cos(_angle * Math.PI / 180);

		if (y < -20 || x > flixel.FlxG.width + 20)
			kill();
	}
}
