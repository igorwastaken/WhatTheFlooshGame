package states;

import flixel.FlxG;
import flixel.FlxState;
import flixel.text.FlxText;
import flixel.tweens.FlxTween;
import flixel.tweens.FlxEase;
import flixel.util.FlxColor;
import objects.StarField;

class CreditsState extends FlxState
{
	override public function create():Void
	{
		super.create();
		FlxG.cameras.bgColor = FlxColor.fromRGB(16, 52, 175);

		add(new StarField(50));

		var lines:Array<{text:String, size:Int, color:FlxColor, y:Float}> = [
			{text: "What The Floosh Game",  size: 24, color: FlxColor.WHITE,                   y: 0.10},
			{text: "Contribuidores:",        size: 20, color: FlxColor.fromRGB(200, 220, 255),  y: 0.22},
			{text: "Igor",                   size: 15, color: FlxColor.WHITE,                   y: 0.30},
			{text: "Creator, Coder",         size: 13, color: FlxColor.fromRGB(160,185,220),    y: 0.36},
			{text: "Luminnum",               size: 15, color: FlxColor.WHITE,                   y: 0.44},
			{text: "Art Creator, Contributor",size:13, color: FlxColor.fromRGB(160,185,220),    y: 0.50},
			{text: "Músicas:",               size: 20, color: FlxColor.fromRGB(200,220,255),    y: 0.58},
			{text: "Mac DeMarco",            size: 14, color: FlxColor.WHITE,                   y: 0.65},
			{text: "Feito com HaxeFlixel",   size: 16, color: FlxColor.fromRGB(255,220,80),     y: 0.76},
		];

		for (i in 0...lines.length)
		{
			var l = lines[i];
			var t = new FlxText(0, Std.int(FlxG.height * l.y), FlxG.width, l.text, l.size);
			t.alignment = CENTER;
			t.font  = "assets/fonts/Pixellari.ttf";
			t.color = l.color;
			t.alpha = 0;
			FlxTween.tween(t, {alpha: 1}, 0.4, {startDelay: i * 0.07, ease: FlxEase.quadOut});
			add(t);
		}

		var back = new FlxText(20, FlxG.height - 40, 0, "← Voltar", 15);
		back.font  = "assets/fonts/Pixellari.ttf";
		back.color = FlxColor.fromRGB(180, 200, 255);
		add(back);
	}

	override public function update(elapsed:Float):Void
	{
		super.update(elapsed);
		if (FlxG.keys.justPressed.ESCAPE || FlxG.keys.justPressed.SPACE || FlxG.keys.justPressed.ENTER
			|| FlxG.mouse.justPressed)
			FlxG.switchState(new MenuState());
	}
}
