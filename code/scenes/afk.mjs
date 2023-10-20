import kaboom from 'kaboom'

export default function AFK() {
  const player = add([
		pos(rand(width()), rand(height())),
		sprite(localStorage.getItem("skin")),
		area(),
		body(),
		"btn",
		z(1),
	])

  onUpdate(() => {
    player.move(rand(-1, 1), 0)
  })
}
