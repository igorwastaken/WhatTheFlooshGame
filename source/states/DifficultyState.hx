package states;

import flixel.FlxG;
import flixel.FlxState;
import flixel.text.FlxText;
import flixel.tweens.FlxTween;
import flixel.tweens.FlxEase;
import flixel.util.FlxColor;
import objects.StarField;

class DifficultyState extends FlxState
{
	var _selectedIndex:Int = 1; // default Normal
	var _btnTexts:Array<FlxText> = [];

	static var DIFFS = [
		{label: "Fácil",      key: "easy"},
		{label: "Normal",     key: "normal"},
		{label: "Difícil",    key: "hard"},
		{label: "Impossível", key: "impossible"},
	];

	override public function create():Void
	{
		super.create();
		FlxG.cameras.bgColor = FlxColor.fromRGB(16, 52, 175);

		add(new StarField(50));

		var title = new FlxText(0, Std.int(FlxG.height * 0.22), FlxG.width, "Escolha a Dificuldade", 22);
		title.alignment = CENTER;
		title.font  = "assets/fonts/Pixellari.ttf";
		title.color = FlxColor.WHITE;
		title.setBorderStyle(SHADOW, FlxColor.fromRGB(0,0,80), 2, 1);
		title.alpha = 0;
		FlxTween.tween(title, {alpha: 1}, 0.4, {ease: FlxEase.quadOut});
		add(title);

		for (i in 0...DIFFS.length)
		{
			var yPos = Std.int(FlxG.height * (0.38 + i * 0.12));
			var t = new FlxText(0, yPos, FlxG.width, DIFFS[i].label, 18);
			t.alignment = CENTER;
			t.font  = "assets/fonts/Pixellari.ttf";
			t.alpha = 0;
			FlxTween.tween(t, {alpha: 1}, 0.4, {startDelay: 0.1 + i * 0.06, ease: FlxEase.quadOut});
			_btnTexts.push(t);
			add(t);
		}

		// Back button
		var back = new FlxText(20, FlxG.height - 40, 0, "← Voltar", 15);
		back.font  = "assets/fonts/Pixellari.ttf";
		back.color = FlxColor.fromRGB(180, 200, 255);
		back.ID    = 999;
		_btnTexts.push(back);
		add(back);

		updateSelection();
	}

	function updateSelection():Void
	{
		for (i in 0...DIFFS.length)
		{
			var t = _btnTexts[i];
			if (i == _selectedIndex)
			{
				t.size  = 22;
				t.color = FlxColor.fromRGB(255, 220, 80);
				t.setBorderStyle(SHADOW, FlxColor.fromRGB(120, 80, 0), 2, 1);
			}
			else
			{
				t.size  = 18;
				t.color = FlxColor.WHITE;
				t.setBorderStyle(NONE);
			}
		}
	}

	override public function update(elapsed:Float):Void
	{
		super.update(elapsed);

		// Keyboard navigation
		if (FlxG.keys.justPressed.UP)
		{
			_selectedIndex = (_selectedIndex - 1 + DIFFS.length) % DIFFS.length;
			updateSelection();
		}
		if (FlxG.keys.justPressed.DOWN)
		{
			_selectedIndex = (_selectedIndex + 1) % DIFFS.length;
			updateSelection();
		}
		if (FlxG.keys.justPressed.ENTER || FlxG.keys.justPressed.SPACE)
			launchGame(_selectedIndex);

		if (FlxG.keys.justPressed.ESCAPE)
			FlxG.switchState(new MenuState());

		// Mouse hover & click on difficulty buttons
		for (i in 0...DIFFS.length)
		{
			var t = _btnTexts[i];
			if (t.overlapsPoint(FlxG.mouse.getWorldPosition()))
			{
				if (i != _selectedIndex) { _selectedIndex = i; updateSelection(); }
				if (FlxG.mouse.justPressed) launchGame(i);
			}
		}

		// Back button
		var backBtn = _btnTexts[_btnTexts.length - 1];
		if (backBtn.overlapsPoint(FlxG.mouse.getWorldPosition()))
		{
			backBtn.color = FlxColor.WHITE;
			if (FlxG.mouse.justPressed)
				FlxG.switchState(new MenuState());
		}
		else
			backBtn.color = FlxColor.fromRGB(180, 200, 255);
	}

	function launchGame(index:Int):Void
	{
		Reg.selectedDifficulty = DIFFS[index].key;
		FlxG.switchState(new PlayState());
	}
}
