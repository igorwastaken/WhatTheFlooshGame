package objects;

import flixel.FlxSprite;
import flixel.util.FlxColor;
import flixel.math.FlxPoint;

/**
 * The player bean. Moves horizontally via mouse / keyboard.
 * Rendered as a procedurally-drawn sprite until real sprites are wired in.
 */
class Player extends FlxSprite
{
	public var skinName(default, null):String;

	public function new(skin:String = "bean")
	{
		super();
		skinName = skin;

		// Try to load sprite; fall back to a drawn shape
		try
		{
			loadGraphic("assets/images/" + skin + ".png");
			setGraphicSize(32, 32);
			updateHitbox();
		}
		catch (e:Dynamic)
		{
			_makeProceduralSkin(skin);
		}

		// Anchor at center-bottom for "flying in from below"
		offset.set(width / 2, height);
	}

	function _makeProceduralSkin(skin:String):Void
	{
		var color = switch (skin)
		{
			case "nerd":    FlxColor.fromRGB(160, 220, 90);
			case "skull":   FlxColor.fromRGB(220, 220, 220);
			case "burbur":  FlxColor.fromRGB(255, 160, 60);
			case "poop":    FlxColor.fromRGB(120, 80, 40);
			default:        FlxColor.fromRGB(255, 200, 80); // bean yellow
		};

		makeGraphic(28, 28, FlxColor.TRANSPARENT);

		// Draw a rounded-ish blob
		var px = pixels;
		px.lock();
		for (y in 0...28)
		{
			for (x in 0...28)
			{
				var cx = x - 14.0;
				var cy = y - 14.0;
				// Slightly squashed ellipse for the bean shape
				if ((cx * cx) / (13 * 13) + (cy * cy) / (11 * 11) <= 1)
					px.setPixel32(x, y, color);
			}
		}
		// Two dark "eyes"
		px.setPixel32(10, 10, 0xFF000000);
		px.setPixel32(11, 10, 0xFF000000);
		px.setPixel32(17, 10, 0xFF000000);
		px.setPixel32(18, 10, 0xFF000000);
		px.unlock();
		dirty = true;

		updateHitbox();
		// Shrink hitbox slightly for fairness
		width  -= 6;
		height -= 6;
		offset.set(3, 3);
	}

	override public function update(elapsed:Float):Void
	{
		super.update(elapsed);

		// Keep player inside screen bounds
		if (x < 0)              x = 0;
		if (x + width > flixel.FlxG.width)
			x = flixel.FlxG.width - width;
	}
}
