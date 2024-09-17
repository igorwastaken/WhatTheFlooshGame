import kaboom from "kaboom";

export default function AFK(v) {
  let back = add([
      sprite("background", {width: width(), height: height()}),
      layer("bg"),
      fixed(),
  ]);
  function spawnRect() {
    const recta = add([
      pos(rand(width()), height()),
      circle(5, 5),
      outline(2),
      area(),
      offscreen({
        destroy: true,
      }),
      "Rect",
    ]);
    onUpdate(() => {
      recta.move(0, rand(-150 * v, -100 * v));
    });
    wait(rand(0.1, 0.2), spawnRect);
    // wait(0.3, spawnRect);
    /*recta.onCollide("clouds", () => {
        	destroy(recta)
        })*/
    recta.onUpdate(() => {
      if (recta.pos.y > height()) {
        destroy(recta);
        addKaboom(recta.pos);
      }
    });
  }

  function spawnCoins() {
    const recta = add([
      pos(rand(width()), height()),
      sprite("coin"),
      scale(0.15),
      area(),
      offscreen({
        destroy: true,
      }),
      "Coins",
    ]);
    onUpdate(() => {
      recta.move(0, rand(-150 * v, -100 * v));
    });
    wait(rand(0.5, 1.5), spawnCoins);
    // wait(0.3, spawnRect);
    /*recta.onCollide("clouds", () => {
        	destroy(recta)
        })*/
    recta.onUpdate(() => {
      if (recta.pos.y > height()) {
        destroy(recta);
        addKaboom(recta.pos);
      }
    });
  }

  function spawnRedRect() {
    const recta = add([
      pos(rand(width()), height()),
      /*color(255,0,0),
		    circle(10, 10),
            outline(2),*/
      sprite("star"),
      area(),
      offscreen({
        destroy: true,
      }),
      "Rectred",
      // z(rand(0.5, 1)),
      scale(0.4),
      rotate(rand(0, 360)),
      scale(rand(0.2, 0.5)),
    ]);
    onUpdate(() => {
      recta.move(0, -150 * v);
    });
    wait(rand(0.9, 2), spawnRedRect);
    // wait(0.3, spawnRect);
    /*recta.onCollide("clouds", () => {
        	destroy(recta)
        })*/
    recta.onUpdate(() => {
      if (recta.pos.y > height()) {
        destroy(recta);
        addKaboom(recta.pos);
      }
    });
  }

  function spawnPlanes() {
    const recta = add([
      pos(-100, rand(height())),
      sprite("ufo", {
        flipX: false,
      }),
      scale(1),
      area(),
      offscreen({
        destroy: true,
      }),
      "Rectred",
    ]);
    onUpdate(() => {
      recta.move(rand(200, 50) * v, -120 * v);
    });
    wait(rand(2, 7), spawnPlanes);
    // wait(0.3, spawnRect);
    /*recta.onCollide("Rectred", (a) => {
        	destroy(recta)
        	addKaboom(a.pos)
        })*/
    recta.onUpdate(() => {
      if (recta.pos.y > height()) {
        destroy(recta);
        addKaboom(recta.pos);
      }
    });
  }

  function spawnClouds() {
    const recta = add([
      pos(rand(width()), height()),
      sprite("cloud"),
      //outline(2),
      scale(0.3),
      area(),
      offscreen({
        destroy: true,
      }),
      "clouds",
      z(rand(0, 2)),
    ]);
    onUpdate(() => {
      recta.move(rand(-100, -50) * v, -150 * v);
    });
    //wait(rand(0.3, 0.7), spawnRect);
    wait(0.6, spawnClouds);
    recta.onUpdate(() => {
      if (recta.pos.y > height()) {
        destroy(recta);
        addKaboom(recta.pos);
      }
    });
  }
  spawnClouds();
  spawnRedRect();
  //spawnRect()
  wait(1, spawnCoins);
  wait(1, spawnPlanes);
  onKeyDown(() => {
    go("menu");
  });
  onClick(() => {
    go("menu");
  });
}
