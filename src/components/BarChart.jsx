import React, { useEffect } from 'react'
import * as d3 from 'd3'

const CHART_WIDTH = 600
const CHART_HEIGHT = 400

const START = 0
const END = 30

export const BarChart = () => {

  const data = [
    {
      name: 'first',
      start: 12, 
      end: 25,
      type: 'A'
    },
    {
      name: 'third',
      start: 6, 
      end: 22,
      type: 'A'
    },
    {
      name: 'second',
      start: 5, 
      end: 10,
      type: 'B'
    },
    {
      name: 'second',
      start: 1, 
      end: 4,
      type: 'C'
    },
    {
      name: 'second',
      start: 9, 
      end: 10,
      type: 'C'
    },
    {
      name: 'first',
      start: 10, 
      end: 15,
      type: 'B'
    },
    {
      name: 'third',
      start: 11, 
      end: 14,
      type: 'B'
    }
  ]

  const compare = (key) => (a, b) => {
    if (a[key] < b[key]) {
      return -1
    }
    if (a[key] > b[key]) {
      return 1
    }
    return 0
  }

  
  const drawChart = () => {
    
    data.sort(compare('start'))
    data.sort(compare('name'))

    const xScale = d3.scaleLinear()
      .domain([START, END])
      .range([0, CHART_WIDTH])
    
    const yScale = d3.scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, CHART_HEIGHT])


  
    const svg = d3.select('svg')
      .attr('width', CHART_WIDTH)
      .attr('height', CHART_HEIGHT)
      .style('background-color', 'lightgrey')

    const wrapper = svg.append('g').attr('class', 'bars')
    
    const bars = wrapper.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('y', (d, i) => yScale(d.name))
      .attr('x', (d, i) => xScale( d.start))
      .attr('height', () => yScale.bandwidth())
      .attr('width', (d, i) => xScale(d.end - d.start))
      .attr('fill', (d) => d.type === 'A' ? 'red' : d.type === 'B' ? 'blue' : 'green')
      .attr('class', d => `bar ${d.name} ${d.type}`)
    
    bars.on('mouseover', (e) => {
      d3.select(e.target).raise()
    })
    .on('mouseout', () => bars.order()
    )
  }

  useEffect(() => {
    drawChart()
  }, [])

  return (
    <svg></svg>
  )
}
