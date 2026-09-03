import test from 'node:test'
import assert from 'node:assert/strict'
import { connectedTiles, isSolved } from '../src/connectedTiles.js'

const reach = (solution, rotations = solution.map(() => 0), source = 0, size = 3) =>
  connectedTiles({ size, source, solution, rotations })

test('returns the source when no neighboring connector matches', () => {
  const result = reach(['E', 'E', '', '', '', '', '', '', ''])

  assert.deepEqual([...result], [0])
})

test('follows only reciprocal connections from the source', () => {
  const result = reach(['ES', 'SW', 'S', 'N', '', '', '', '', ''])

  assert.deepEqual([...result].sort((a, b) => a - b), [0, 1, 3])
})

test('rotations change which tiles are reachable', () => {
  const solution = ['E', 'W', '', '', '', '', '', '', '']
  const rotations = [1, 0, 0, 0, 0, 0, 0, 0, 0]

  assert.deepEqual([...reach(solution, rotations)], [0])
})

const solved = (solution, size = 2, source = 0, rotations = solution.map(() => 0)) =>
  isSolved({ size, source, solution, rotations })

test('isSolved returns true for a complete circuit', () => {
  assert.equal(solved(['ES', 'SW', 'NE', 'NW']), true)
})

test('isSolved returns false when a tile is unreachable', () => {
  assert.equal(solved(['E', 'W', '', '']), false)
})

test('isSolved returns true when every tile is reached', () => {
  assert.equal(solved(['ESN', 'SW', 'NE', 'NW']), true)
})
