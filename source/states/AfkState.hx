package states;

import flixel.FlxG;
import flixel.FlxSprite;
import flixel.FlxState;
import flixel.math.FlxRandom;
import flixel.group.FlxGroup;
import flixel.text.FlxText;
import flixel.util.FlxColor;

class AfkState extends FlxState
{
	var _rng:FlxRandom = new FlxRandom();
	var _particles:FlxGroup;
	var _spawnTimer:Float = 0;

	override public function create():Void
	{
		super.create();
		FlxG.cameras.bgColor = FlxColor.fromRGB(8, 28, 100);

		_particles = new FlxGroup();
		add(_particles);

		var hint = new FlxText(0, FlxG.height - 40, FlxG.width, "Toque para voltar", 16);
		hint.alignment = CENTER;
		hint.font  = "assets/fonts/Pixellari.ttf";
		hint.color = FlxColor.fromRGB(120, 150, 255);
		add(hint);
	}

	override public function update(elapsed:Float):Void
	{
		super.update(elapsed);

		// Spawn rising particles
		_spawnTimer += elapsed;
		if (_spawnTimer >= 0.12)
		{
			_spawnTimer = 0;
			var p = new FlxSprite(_rng.float(0, FlxG.width), FlxG.height);
			var sz = Std.int(_rng.float(3, 10));
			p.makeGraphic(sz, sz, FlxColor.fromRGBFloat(
				_rng.float(0.5, 1), _rng.float(0.5, 1), 1, 0.7));
			p.velocity.y = _rng.float(-100, -150);
			p.velocity.x = _rng.float(-20, 20);
			_particles.add(p);
		}

		if (FlxG.mouse.justPressed || FlxG.keys.anyJustPressed([ANY]))
			FlxG.switchState(new MenuState());
	}
}
