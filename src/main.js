import { connectedTiles as findConnectedTiles, isSolved as checkSolved } from './connectedTiles.js'

const size = 5
const source = 12
const solution = ['ES', 'SW', 'ESW', 'SE', 'SW', 'NS', 'NES', 'NSW', 'NE', 'NS', 'NE', 'ESW', 'NESW', 'NW', 'NSW', 'NS', 'ES', 'NSW', 'ES', 'NW', 'NE', 'EW', 'NW', 'NE', 'NW']
let rotations = solution.map(() => Math.floor(Math.random() * 4))
let moves = 0
let startedAt = Date.now()

document.querySelector('#app').innerHTML = 
  `<main class="shell"><header class="topbar"><div class="brand"><span class="brand-mark">✦</span><span>Signal Garden</span></div><button class="icon-button" id="reset" type="button" aria-label="Reset puzzle" title="Reset puzzle">↻</button></header><section class="intro"><div><p class="eyebrow">Daily circuit · 03 September 2026</p><h1>Wake the garden.</h1><p class="subtitle">Rotate the tiles to carry the signal from the heart to every living node.</p></div><div class="stats"><div><strong id="moves">0</strong><span>moves</span></div><div><strong id="time">00:00</strong><span>time</span></div></div></section><section class="play-area"><div class="legend"><span><i class="dot source-dot"></i> source</span><span><i class="dot node-dot"></i> node</span><span class="hint">click tiles to rotate</span></div><div class="board-wrap"><div class="board" id="board" aria-label="Signal connection puzzle"></div><div class="win-panel" id="win-panel"><span class="win-symbol">✦</span><p class="eyebrow">Circuit complete</p><h2>The garden is awake.</h2><p id="win-copy"></p><button id="play-again" type="button">Grow another garden <span>→</span></button></div></div></section><footer><span>One connected system. No loose ends.</span><span>Signal Garden <b>·</b> v1.0</span></footer></main>`

const board = document.querySelector('#board')
const tileConnections = (index) => solution[index].split('').map((direction) => 'NESW'[('NESW'.indexOf(direction) + rotations[index]) % 4])
const connectedTiles = () => findConnectedTiles({ size, source, solution, rotations })

const isSolved = () => checkSolved({ size, source, solution, rotations })

function drawBoard() {
  const reached = connectedTiles()
  board.innerHTML = solution.map((_, index) => { const connections = tileConnections(index); const node = index % 2 === 0 || index === 7 || index === 17; const connected = reached.has(index); const paths = connections.map((direction) => `<span class="path path-${direction}"></span>`).join(''); return `<button class="tile ${index === source ? 'source' : ''} ${node ? 'node' : ''} ${connected ? 'connected' : ''}" data-index="${index}" style="--rotation: ${rotations[index] * 90}deg" aria-label="Rotate tile ${index + 1}">${paths}<span class="core"></span></button>` }).join('')
}

function updateStats() { document.querySelector('#moves').textContent = moves; const seconds = Math.floor((Date.now() - startedAt) / 1000); document.querySelector('#time').textContent = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}` }
board.addEventListener('click', (event) => { const tile = event.target.closest('.tile'); if (!tile) return; rotations[tile.dataset.index] = (rotations[tile.dataset.index] + 1) % 4; moves += 1; drawBoard(); updateStats(); if (isSolved()) { document.querySelector('#win-panel').classList.add('visible'); document.querySelector('#win-copy').textContent = `Connected in ${moves} moves.` } })
function reset() { rotations = solution.map(() => Math.floor(Math.random() * 4)); moves = 0; startedAt = Date.now(); document.querySelector('#win-panel').classList.remove('visible'); drawBoard(); updateStats() }
document.querySelector('#reset').addEventListener('click', reset)
document.querySelector('#play-again').addEventListener('click', reset)
drawBoard()
setInterval(updateStats, 1000)
