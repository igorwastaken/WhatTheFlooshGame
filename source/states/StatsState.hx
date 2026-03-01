package states;

import flixel.FlxG;
import flixel.FlxState;
import flixel.text.FlxText;
import flixel.tweens.FlxTween;
import flixel.tweens.FlxEase;
import flixel.util.FlxColor;
import objects.StarField;

class StatsState extends FlxState
{
	override public function create():Void
	{
		super.create();
		FlxG.cameras.bgColor = FlxColor.fromRGB(16, 52, 175);
		add(new StarField(50));

		function fmt(n:Int):String
			return n >= 1000 ? Std.string(Math.round(n / 100) / 10) + "K" : Std.string(n);

		var rows:Array<{label:String, val:String}> = [
			{label: "Fácil",      val: fmt(Reg.scoreEasy)},
			{label: "Normal",     val: fmt(Reg.scoreNormal)},
			{label: "Difícil",    val: fmt(Reg.scoreHard)},
			{label: "Impossível", val: fmt(Reg.scoreImpossible)},
		];

		var title = new FlxText(0, Std.int(FlxG.height * 0.20), FlxG.width, "What The Floosh Game", 24);
		title.alignment = CENTER;
		title.font  = "assets/fonts/Pixellari.ttf";
		title.color = FlxColor.WHITE;
		title.alpha = 0;
		FlxTween.tween(title, {alpha: 1}, 0.4, {ease: FlxEase.backOut});
		add(title);

		var ptTitle = new FlxText(0, Std.int(FlxG.height * 0.33), FlxG.width, "Pontuações:", 20);
		ptTitle.alignment = CENTER;
		ptTitle.font  = "assets/fonts/Pixellari.ttf";
		ptTitle.color = FlxColor.fromRGB(200, 220, 255);
		ptTitle.alpha = 0;
		FlxTween.tween(ptTitle, {alpha: 1}, 0.4, {startDelay: 0.1});
		add(ptTitle);

		for (i in 0...rows.length)
		{
			var yp  = 0.41 + i * 0.10;
			var row = rows[i];
			var t   = new FlxText(0, Std.int(FlxG.height * yp), FlxG.width,
				row.label + ":  " + row.val, 16);
			t.alignment = CENTER;
			t.font  = "assets/fonts/Pixellari.ttf";
			t.color = FlxColor.WHITE;
			t.alpha = 0;
			FlxTween.tween(t, {alpha: 1}, 0.35, {startDelay: 0.15 + i * 0.07});
			add(t);
		}

		// Coins total
		var coinTxt = new FlxText(0, Std.int(FlxG.height * 0.82), FlxG.width,
			"Total de Moedas: " + Reg.coins, 16);
		coinTxt.alignment = CENTER;
		coinTxt.font  = "assets/fonts/Pixellari.ttf";
		coinTxt.color = FlxColor.YELLOW;
		coinTxt.alpha = 0;
		FlxTween.tween(coinTxt, {alpha: 1}, 0.35, {startDelay: 0.5});
		add(coinTxt);

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
