package;

import flixel.util.FlxSave;

/**
 * Global registry for game-wide state, save data, and constants.
 */
class Reg
{
	// ─── Save / Persistent Data ───────────────────────────────────────────────
	public static var save:FlxSave;

	public static var coins:Int       = 0;
	public static var scoreEasy:Int   = 0;
	public static var scoreNormal:Int = 0;
	public static var scoreHard:Int   = 0;
	public static var scoreImpossible:Int = 0;
	public static var currentSkin:String  = "bean";
	public static var muted:Bool          = false;

	// ─── Session Data ─────────────────────────────────────────────────────────
	public static var selectedDifficulty:String = "normal";

	// ─── Game Constants ───────────────────────────────────────────────────────
	public static inline var PLAYER_SPEED:Float  = 400;
	public static inline var SCREEN_W:Int        = 480;
	public static inline var SCREEN_H:Int        = 640;

	public static function init():Void
	{
		save = new FlxSave();
		save.bind("WhatTheFloosh");

		if (save.data.coins != null)           coins            = save.data.coins;
		if (save.data.scoreEasy != null)       scoreEasy        = save.data.scoreEasy;
		if (save.data.scoreNormal != null)     scoreNormal      = save.data.scoreNormal;
		if (save.data.scoreHard != null)       scoreHard        = save.data.scoreHard;
		if (save.data.scoreImpossible != null) scoreImpossible  = save.data.scoreImpossible;
		if (save.data.skin != null)            currentSkin      = save.data.skin;
		if (save.data.muted != null)           muted            = save.data.muted;
	}

	public static function persist():Void
	{
		save.data.coins            = coins;
		save.data.scoreEasy        = scoreEasy;
		save.data.scoreNormal      = scoreNormal;
		save.data.scoreHard        = scoreHard;
		save.data.scoreImpossible  = scoreImpossible;
		save.data.skin             = currentSkin;
		save.data.muted            = muted;
		save.flush();
	}

	/** Returns the high-score for the current difficulty. */
	public static function getBestScore(?diff:String):Int
	{
		switch (diff != null ? diff : selectedDifficulty)
		{
			case "easy":       return scoreEasy;
			case "hard":       return scoreHard;
			case "impossible": return scoreImpossible;
			default:           return scoreNormal;
		}
	}

	/** Updates the high-score if the new score is better. */
	public static function trySetBestScore(score:Int, ?diff:String):Void
	{
		switch (diff != null ? diff : selectedDifficulty)
		{
			case "easy":
				if (score > scoreEasy) { scoreEasy = score; persist(); }
			case "hard":
				if (score > scoreHard) { scoreHard = score; persist(); }
			case "impossible":
				if (score > scoreImpossible) { scoreImpossible = score; persist(); }
			default:
				if (score > scoreNormal) { scoreNormal = score; persist(); }
		}
	}

	/** Returns a label string for the given difficulty. */
	public static function diffLabel(d:String):String
	{
		return switch (d) {
			case "easy":       "Fácil";
			case "hard":       "Difícil";
			case "impossible": "Impossível";
			default:           "Normal";
		};
	}
}
