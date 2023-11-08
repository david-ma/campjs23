console.log('Drawing a d3 spaceship')

import { Asteroid } from './asteroid'
import { Game } from './game'
import * as d3 from 'd3'
import { SpaceShip } from './gameSpaceShip'
import { DebugRenderBuffers } from '@dimforge/rapier2d'

// import * as d3 from 'd3-selection-multi'
let width = 960,
  height = 600

const screen = d3.select('#screen').append('svg')
let shields = null
let globalGame = null

export function setup(options) {
  console.log('Running setup()')
  width = options.width
  height = options.height

  const svg = screen.attr('viewBox', `0 0 ${width} ${height}`)

  svg
    .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('height', height)
    .attr('width', width)
    .attr('fill', '#8357a4')

  return screen
}

export function drawSpaceship(spaceship: SpaceShip) {
  // console.log('drawing ship')
  // console.log(d3)
  const options = spaceship.Position

  const ship = screen
    .append('g')
    .attr('id', 'enterprise')
    .attr('transform', `translate(${options.x}, ${options.y})`)

  const spaceshipShape = [
    [-50, 50],
    [100, 0],
    [-50, -50],
    [-25, 0],
    [-50, 50],
  ]

  ship
    .append('polyline')
    .attr('points', spaceshipShape.map((d) => d.join(',')).join(' '))
    .attr('stroke', 'white')
    .attr('stroke-width', 3)
    .attr('fill', 'none')

  // Shields?
  shields = ship
    .append('circle')
    .attr('id', 'shields')
    .attr('cx', 10)
    .attr('r', spaceship.shieldRad)
    .attr('stroke-width', 3)
    .attr('stroke', 'white')
    .attr('fill', 'none')
}

var shieldVal = 0
function tuneShields(val) {
  console.log(val)
  if (shieldVal) {
    shields.attr('stroke-width', val)
  } else {
    shieldVal = 1
  }
}

export function drawAsteroids(asteroids) {
  console.log('drawing asteroids')
}

export default {
  setup,
  drawSpaceship,
  drawAsteroids,
  init,
  update,
  welcome,
}

function welcome(callback) {
  const welcome = screen.append('g')

  welcome
    .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('height', height)
    .attr('width', width)
    .attr('fill', '#b91321')

  welcome
    .append('image')
    .attr('href', '/image/welcome.png')
    .attr('x', 100)
    .attr('y', 10)
    // .attr('preserveAspectRatio', 1)
    .attr('height', '500')
    .attr('width', '800')
  // .attr('height')

  welcome.on('click', function (d) {
    welcome.remove()
    callback()
  })
}

export function draw_debug(buffer: DebugRenderBuffers) {

  for (let i = 0; i < buffer.vertices.length; i += 4) {
    const line = [[buffer.vertices[i], buffer.vertices[i + 1]], [buffer.vertices[i + 2], buffer.vertices[i + 3]]]
    screen
      .append('line')
      .attr('points', line.map((d) => d.join(',')).join(' '))
      .attr('stroke', 'black')
      .attr('stroke-width', 6)
      .attr('fill', 'none')
  }
}

function init(game) {
  drawSpaceship(game.spaceship)
  globalGame = game

  game.asteroids.forEach((asteroid) => {
    drawAsteroids(asteroid)
  })
}

function update(game: Game) {
  console.log('Updating game')
  // console.log(game.asteroids)
  // Do stuff to update the game... nothing for now.
  const ship = game.spaceship.Position
  d3.select('#enterprise')
    .transition()
    .attr('transform', `translate(${ship.x}, ${ship.y})`)

  const asteroids = screen
    .selectAll('g.asteroid')
    .data(game.asteroids, (d: Asteroid) => {
      return d.uniqueID
    })

  asteroids
    .enter()
    .append('g')
    .classed('asteroid', true)
    .attr('transform', (d) => {
      return `translate(${d.Position.x}, ${d.Position.y})`
    })
    .append('circle')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', (d) => {
      return d.radius || 20
    })
    .attr('fill', 'none')
    .attr('stroke', 'red')
    .attr('stroke-width', 3)

  // circle.transition()
  // .duration(500)
  // .attr("cx", place_circle)
  // .attr("cy", baseLine.y)
  // .attr("r", (d,i) => d);
  asteroids
    .transition()
    .duration(16)
    .attr('transform', (d) => {
      return `translate(${d.Position.x}, ${d.Position.y})`
    })
  // .attr('cx', (d) => {
  //   console.log(`Spawning new asteroid: ${d.uniqueID}`)
  //   return d.Position.x
  // })
  // .attr('cy', (d) => {
  //   return d.Position.y
  // })
}

let midi = null // global MIDIAccess object

globalThis.midiButton = function () {
  console.log('hey we pushed a midi button')
  // @ts-ignore
  navigator.permissions.query({ name: 'midi', sysex: true }).then((result) => {
    if (result.state === 'granted') {
      // Access granted.
      console.log('Acceds granted')
    } else if (result.state === 'prompt') {
      // Using API will prompt for permission
      console.log('we should prompt?')
      function onMIDISuccess(midiAccess) {
        console.log('MIDI ready!')
        midi = midiAccess // store in the global (in real usage, would probably keep in an object instance)
        listInputsAndOutputs(midi)
        startLoggingMIDIInput(midi, 0)
      }

      function onMIDIFailure(msg) {
        console.error(`Failed to get MIDI access - ${msg}`)
      }

      navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure)
    }
    // Permission was denied by user prompt or permission policy
  })
}

function listInputsAndOutputs(midiAccess) {
  for (const entry of midiAccess.inputs) {
    const input = entry[1]
    console.log(
      `Input port [type:'${input.type}']` +
      ` id:'${input.id}'` +
      ` manufacturer:'${input.manufacturer}'` +
      ` name:'${input.name}'` +
      ` version:'${input.version}'`
    )
  }

  for (const entry of midiAccess.outputs) {
    const output = entry[1]
    console.log(
      `Output port [type:'${output.type}'] id:'${output.id}' manufacturer:'${output.manufacturer}' name:'${output.name}' version:'${output.version}'`
    )
  }
}


let green = 64;
function onMIDIMessage(event) {
  let str = `MIDI message received at timestamp ${event.timeStamp}[${event.data.length} bytes]: `
  let signal = ''
  let val = 0
  for (const character of event.data) {
    // console.log('char', character)
    str += `0x${character.toString(16)} `
    signal += `0x${character.toString(16)} `
    val = character
  }
  if (signal != '0xf8 ') {
    // ignore the clock signal 0xf8
    console.log(str)
    console.log(signal)

    if (signal.slice(0, 8) == '0xb0 0x1') {
      console.log('heyyy')
      tuneShields(val)
    }

    if (signal.slice(0, 8) == '0xb0 0x2') {
      if(green > val) {
        globalGame.spaceship.move('up')
      } else {
        globalGame.spaceship.move('down')        
      }
      green = val
      // console.log('move ship')
      // tuneShields(val)
    }
  }
  // 0xb0 0x2 0xc
  // if (signal === '0xb0') { // This is
  //   // blue toggle?
  //   console.log("hey")
  // }
}

function startLoggingMIDIInput(midiAccess, indexOfPort) {
  midiAccess.inputs.forEach((entry) => {
    entry.onmidimessage = onMIDIMessage
  })
}
