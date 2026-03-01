package objects;

import flixel.FlxG;
import flixel.FlxSprite;
import flixel.group.FlxGroup;
import flixel.math.FlxRandom;
import flixel.util.FlxColor;

/**
 * A static group of randomly-placed star sprites used across menu states.
 */
class StarField extends FlxGroup
{
	var _rng:FlxRandom = new FlxRandom();

	public function new(count:Int = 50)
	{
		super();
		for (i in 0...count)
		{
			var s = new FlxSprite(
				_rng.float(0, FlxG.width),
				_rng.float(0, FlxG.height)
			);
			var sz = Std.int(_rng.float(2, 5));
			s.makeGraphic(sz, sz, FlxColor.fromRGBFloat(1, 1, 1, _rng.float(0.4, 0.9)));
			s.angle = _rng.float(0, 360);
			add(s);
		}
	}
}
