package objects;

import flixel.effects.particles.FlxEmitter;
import flixel.effects.particles.FlxParticle;
import flixel.util.FlxColor;
import flixel.math.FlxRandom;

/**
 * Burst particle explosion used when the player dies.
 * Matches the addKaboom() effect from the Kaplay original.
 */
class ParticleExplosion extends FlxEmitter
{
	public function new(x:Float, y:Float)
	{
		super(x, y, 30);

		var rng = new FlxRandom();

		for (i in 0...30)
		{
			var p = new FlxParticle();
			var sz = Std.int(rng.float(4, 10));

			var colors = [
				FlxColor.fromRGB(255, 80,  40),
				FlxColor.fromRGB(255, 200, 40),
				FlxColor.fromRGB(255, 255, 120),
				FlxColor.fromRGB(200, 80,  255),
				FlxColor.WHITE
			];
			p.makeGraphic(sz, sz, colors[i % colors.length]);
			add(p);
		}

		velocity.set(-180, -300, 180, -80);
		lifespan.set(0.4, 1.0);
		alpha.set(1, 1, 0, 0);
		scale.set(1, 1, 0.1, 0.1);
		acceleration.set(0, 200, 0, 400);
		angularVelocity.set(-360, 360);
	}
}
