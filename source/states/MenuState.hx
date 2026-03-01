package states;

import flixel.FlxG;
import flixel.FlxSprite;
import flixel.FlxState;
import flixel.group.FlxGroup;
import flixel.math.FlxRandom;
import flixel.text.FlxText;
import flixel.tweens.FlxTween;
import flixel.tweens.FlxEase;
import flixel.ui.FlxButton;
import flixel.util.FlxColor;
import flixel.util.FlxTimer;
import objects.StarField;
import objects.CloudSpawner;

class MenuState extends FlxState
{
	var _stars:StarField;
	var _clouds:CloudSpawner;
	var _afkTimer:Float = 0;
	var _afkLimit:Float = 60; // seconds before AFK screen

	override public function create():Void
	{
		super.create();
		Reg.init();

		FlxG.cameras.bgColor = FlxColor.fromRGB(16, 52, 175);

		// ── Background stars ──────────────────────────────────────────────
		_stars  = new StarField(50);
		add(_stars);

		// ── Scrolling clouds ──────────────────────────────────────────────
		_clouds = new CloudSpawner();
		add(_clouds);

		// ── Title ─────────────────────────────────────────────────────────
		var title = new FlxText(0, 0, FlxG.width, "What The Floosh Game", 24);
		title.alignment = CENTER;
		title.font  = "assets/fonts/Pixellari.ttf";
		title.color = FlxColor.WHITE;
		title.setBorderStyle(SHADOW, FlxColor.fromRGB(0,0,80), 2, 1);
		title.screenCenter(X);
		title.y = Std.int(FlxG.height * 0.25);
		add(title);

		// Entrance tween
		title.alpha = 0;
		title.y -= 20;
		FlxTween.tween(title, {alpha: 1, y: title.y + 20}, 0.6, {ease: FlxEase.backOut});

		// ── Coin display ──────────────────────────────────────────────────
		var coinIcon = new FlxSprite(20, 16);
		coinIcon.makeGraphic(14, 14, FlxColor.YELLOW);
		add(coinIcon);

		var coinTxt = new FlxText(38, 14, 120, Std.string(Reg.coins), 18);
		coinTxt.font  = "assets/fonts/Pixellari.ttf";
		coinTxt.color = FlxColor.YELLOW;
		add(coinTxt);

		// ── Menu buttons ──────────────────────────────────────────────────
		var labels  = ["Jogar", "Créditos", "Estatísticas"];
		var actions = [
			function() { FlxG.switchState(new DifficultyState()); },
			function() { FlxG.switchState(new CreditsState());    },
			function() { FlxG.switchState(new StatsState());      }
		];

		for (i in 0...labels.length)
		{
			var yPos = Std.int(FlxG.height * (0.42 + i * 0.12));
			var btn  = makeMenuButton(labels[i], yPos, actions[i], i * 0.08);
			add(btn);
		}

		// ── Footer ────────────────────────────────────────────────────────
		var year = DateTools.format(Date.now(), "%Y");
		var footer = new FlxText(20, FlxG.height - 36, 0, year + " © igorwastaken", 13);
		footer.font  = "assets/fonts/Pixellari.ttf";
		footer.color = FlxColor.fromRGB(150, 170, 220);
		add(footer);
	}

	// ── Helpers ──────────────────────────────────────────────────────────────

	function makeMenuButton(label:String, yPos:Int, cb:Void->Void, delay:Float = 0):FlxText
	{
		var t = new FlxText(0, yPos, FlxG.width, label, 18);
		t.alignment = CENTER;
		t.font  = "assets/fonts/Pixellari.ttf";
		t.color = FlxColor.WHITE;
		t.setBorderStyle(SHADOW, FlxColor.fromRGB(0,0,80), 1, 1);

		// Fade-in with stagger
		t.alpha = 0;
		FlxTween.tween(t, {alpha: 1}, 0.5, {startDelay: 0.3 + delay, ease: FlxEase.quadOut});

		// Store callback for update detection
		t.ID = _btnCallbacks.length;
		_btnCallbacks.push(cb);
		_btnTexts.push(t);
		return t;
	}

	var _btnCallbacks:Array<Void->Void> = [];
	var _btnTexts:Array<FlxText>        = [];

	override public function update(elapsed:Float):Void
	{
		super.update(elapsed);

		// Mouse hover & click on buttons
		for (i in 0..._btnTexts.length)
		{
			var t = _btnTexts[i];
			if (t.overlapsPoint(FlxG.mouse.getWorldPosition()))
			{
				t.size  = 21;
				t.color = FlxColor.fromRGB(200, 230, 255);
				if (FlxG.mouse.justPressed)
				{
					_btnCallbacks[i]();
					return;
				}
			}
			else
			{
				t.size  = 18;
				t.color = FlxColor.WHITE;
			}
		}

		// AFK detection
		if (FlxG.mouse.moved || FlxG.keys.anyJustPressed([ANY]))
			_afkTimer = 0;
		else
			_afkTimer += elapsed;

		if (_afkTimer >= _afkLimit)
			FlxG.switchState(new AfkState());
	}
}
