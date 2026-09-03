const directions = { N: [0, -1], E: [1, 0], S: [0, 1], W: [-1, 0] }
const opposite = { N: 'S', E: 'W', S: 'N', W: 'E' }

export function connectedTiles({ size, source, solution, rotations }) {
  const tileConnections = (index) => solution[index].split('').map((direction) => 'NESW'[('NESW'.indexOf(direction) + rotations[index]) % 4])
  const reached = new Set([source])
  const queue = [source]

  while (queue.length) {
    const index = queue.shift()
    const x = index % size
    const y = Math.floor(index / size)

    for (const direction of tileConnections(index)) {
      const [dx, dy] = directions[direction]
      const nextX = x + dx
      const nextY = y + dy
      if (nextX < 0 || nextX >= size || nextY < 0 || nextY >= size) continue

      const next = nextY * size + nextX
      if (tileConnections(next).includes(opposite[direction]) && !reached.has(next)) {
        reached.add(next)
        queue.push(next)
      }
    }
  }

  return reached
}

export function isSolved({ size, source, solution, rotations }) {
  const reached = connectedTiles({ size, source, solution, rotations })
  return reached.size === size * size
}
