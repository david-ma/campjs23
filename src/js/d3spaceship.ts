console.log('Drawing a d3 spaceship')

import * as d3 from 'd3'
// import * as d3 from 'd3-selection-multi'
let width = 960,
  height = 600

const screen = d3.select('#screen').append('svg')

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
}

export function drawSpaceship(options) {
  console.log('drawing ship')
  console.log(d3)

  const ship = screen
    .append('g')
    .attr('transform', `translate(${options.x}, ${options.y})`)

  ship
    .append('line')
    .attr('x1', -50)
    .attr('y1', 50)
    .attr('x2', 100)
    .attr('y2', 0)
    .attr('stroke', 'white')
    .attr('stroke-width', 3)

  ship
    .append('line')
    .attr('x1', -50)
    .attr('y1', -50)
    .attr('x2', 100)
    .attr('y2', 0)
    .attr('stroke', 'white')
    .attr('stroke-width', 3)

  ship
    .append('line')
    .attr('x1', -50)
    .attr('y1', 50)
    .attr('x2', -25)
    .attr('y2', 0)
    .attr('stroke', 'white')
    .attr('stroke-width', 3)

  ship
    .append('line')
    .attr('x1', -50)
    .attr('y1', -50)
    .attr('x2', -25)
    .attr('y2', 0)
    .attr('stroke', 'white')
    .attr('stroke-width', 3)

  // Shields?
  ship
    .append('circle')
    .attr('cx', 10)
    .attr('r', 150)
    .attr('stroke-width', 3)
    .attr('stroke', 'white')
    .attr('fill', 'none')
}

export default {
  setup,
  drawSpaceship,
}
