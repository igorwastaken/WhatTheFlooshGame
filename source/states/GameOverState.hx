package states;

import flixel.FlxG;
import flixel.FlxSprite;
import flixel.FlxState;
import flixel.text.FlxText;
import flixel.tweens.FlxTween;
import flixel.tweens.FlxEase;
import flixel.util.FlxColor;
import objects.StarField;

class GameOverState extends FlxState
{
	var _score:Int;

	public function new(score:Int)
	{
		super();
		_score = score;
	}

	override public function create():Void
	{
		super.create();
		FlxG.cameras.bgColor = FlxColor.fromRGB(16, 52, 175);

		add(new StarField(40));

		var best = Reg.getBestScore();
		var isNewBest = (_score >= best && best > 0) || (best == 0 && _score > 0);

		// Title
		var title = new FlxText(0, Std.int(FlxG.height * 0.18), FlxG.width, "Game Over", 32);
		title.alignment = CENTER;
		title.font  = "assets/fonts/Pixellari.ttf";
		title.color = FlxColor.fromRGB(255, 80, 80);
		title.setBorderStyle(SHADOW, FlxColor.fromRGB(100, 0, 0), 3, 1);
		title.alpha = 0;
		FlxTween.tween(title, {alpha: 1}, 0.5, {ease: FlxEase.backOut});
		add(title);

		// Score
		var scoreTxt = new FlxText(0, Std.int(FlxG.height * 0.35), FlxG.width,
			"Pontuação: " + _score, 22);
		scoreTxt.alignment = CENTER;
		scoreTxt.font  = "assets/fonts/Pixellari.ttf";
		scoreTxt.color = FlxColor.WHITE;
		scoreTxt.alpha = 0;
		FlxTween.tween(scoreTxt, {alpha: 1}, 0.5, {startDelay: 0.2, ease: FlxEase.quadOut});
		add(scoreTxt);

		// Best
		var bestColor = isNewBest ? FlxColor.fromRGB(255, 220, 80) : FlxColor.fromRGB(180, 200, 255);
		var bestLabel = isNewBest ? "🏆 Novo Recorde: " : "Melhor: ";
		var bestTxt = new FlxText(0, Std.int(FlxG.height * 0.44), FlxG.width,
			bestLabel + Reg.getBestScore(), 18);
		bestTxt.alignment = CENTER;
		bestTxt.font  = "assets/fonts/Pixellari.ttf";
		bestTxt.color = bestColor;
		bestTxt.alpha = 0;
		FlxTween.tween(bestTxt, {alpha: 1}, 0.5, {startDelay: 0.35, ease: FlxEase.quadOut});
		add(bestTxt);

		// Difficulty
		var diffTxt = new FlxText(0, Std.int(FlxG.height * 0.52), FlxG.width,
			"Dificuldade: " + Reg.diffLabel(Reg.selectedDifficulty), 15);
		diffTxt.alignment = CENTER;
		diffTxt.font  = "assets/fonts/Pixellari.ttf";
		diffTxt.color = FlxColor.fromRGB(180, 200, 255);
		diffTxt.alpha = 0;
		FlxTween.tween(diffTxt, {alpha: 1}, 0.4, {startDelay: 0.45});
		add(diffTxt);

		// Buttons
		_addBtn("Jogar Novamente", Std.int(FlxG.height * 0.65), 0.55, function() {
			FlxG.switchState(new PlayState());
		});
		_addBtn("Menu Principal", Std.int(FlxG.height * 0.75), 0.65, function() {
			FlxG.switchState(new MenuState());
		});
	}

	var _btns:Array<{t:FlxText, cb:Void->Void}> = [];

	function _addBtn(label:String, y:Int, delay:Float, cb:Void->Void):Void
	{
		var t = new FlxText(0, y, FlxG.width, label, 18);
		t.alignment = CENTER;
		t.font  = "assets/fonts/Pixellari.ttf";
		t.color = FlxColor.WHITE;
		t.alpha = 0;
		FlxTween.tween(t, {alpha: 1}, 0.4, {startDelay: delay, ease: FlxEase.quadOut});
		add(t);
		_btns.push({t: t, cb: cb});
	}

	override public function update(elapsed:Float):Void
	{
		super.update(elapsed);

		for (b in _btns)
		{
			if (b.t.overlapsPoint(FlxG.mouse.getWorldPosition()))
			{
				b.t.color = FlxColor.fromRGB(200, 230, 255);
				b.t.size  = 21;
				if (FlxG.mouse.justPressed) b.cb();
			}
			else
			{
				b.t.color = FlxColor.WHITE;
				b.t.size  = 18;
			}
		}

		if (FlxG.keys.justPressed.ENTER || FlxG.keys.justPressed.SPACE)
			FlxG.switchState(new PlayState());
		if (FlxG.keys.justPressed.ESCAPE)
			FlxG.switchState(new MenuState());
	}
}
