import React, { useEffect } from 'react'
import * as d3 from 'd3'

const CHART_WIDTH = 600
const CHART_HEIGHT = 400

export const BarChart = () => {

  const data = [
    {
      start: 12, 
      end: 25,
      type: 'A'
    },
    {
      start: 5, 
      end: 10,
      type: 'B'
    },
    {
      start: 6, 
      end: 22,
      type: 'A'
    },
    {
      start: 9, 
      end: 12,
      type: 'C'
    },
    {
      start: 10, 
      end: 15,
      type: 'B'
    }
  ]
  const drawChart = () => {
    const scale = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d.end)])
      .range([0, CHART_WIDTH])

  
    const svg = d3.select('svg')
      .attr('width', CHART_WIDTH)
      .attr('height', CHART_HEIGHT)
      .style('background-color', 'lightgrey')

    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('y', (d, i) => i * 70)
      .attr('x', (d, i) => d.start * 10)
      .attr('height', 65)
      .attr('width', (d, i) => scale(d.end))
      .attr('fill', (d) => d.type === 'A' ? 'red' : d.type === 'B' ? 'blue' : 'green')
  }

  useEffect(() => {
    drawChart()
  }, [])

  return (
    <svg></svg>
  )
}
