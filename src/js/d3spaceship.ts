console.log('Drawing a d3 spaceship')

import * as d3 from 'd3'
// import * as d3 from 'd3-selection-multi'

export function setup(options) {
  console.log('Running setup()')
  const width = options.width,
        height = options.height;

  const svg = d3
    .select('#screen')
    .append('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)

    svg.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('height', height)
      .attr('width', width)
      .attr('fill', '#8357a4')
}

export function drawSpaceship() {
  console.log('drawing')
  console.log(d3)
}

export default {
  setup,
  drawSpaceship,
}
