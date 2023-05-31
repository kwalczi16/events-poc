import React, { useEffect } from 'react'
import * as d3 from 'd3'
import { data } from '../data'

const CHART_WIDTH = 600
const CHART_HEIGHT = 400

const START = 0
const END = 30

export const BarChart = () => {

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
      .range([CHART_HEIGHT - 50, 0])


  
    const svg = d3.select('svg')
      .attr('width', CHART_WIDTH)
      .attr('height', CHART_HEIGHT)
      .style('background-color', 'lightgrey')

    svg.selectAll("*").remove()

    const container = svg.append('g')
      .attr('class', 'container')
      .attr('transform', `translate(50, 0)`)
      .attr('width', CHART_WIDTH - 50)
      .attr('height', CHART_HEIGHT - 50)


    const barsWrapper = container.append('g').attr('class', 'bars')
    const xAxis = container.append('g').attr('class', 'xaxis')
    const yAxis = container.append('g').attr('class', 'yaxis')
    
    const bars = barsWrapper.selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'barWrapper')

    bars
      .append('rect')
      .attr('y', (d, i) => yScale(d.name))
      .attr('x', (d, i) => xScale( d.start))
      .attr('height', () => yScale.bandwidth())
      .attr('width', (d, i) => xScale(d.end - d.start))
      .attr('fill', (d) => d.type === 'A' ? 'red' : d.type === 'B' ? 'blue' : 'green')
      .attr('class', d => `bar ${d.name} ${d.type}`)
    
    bars
      .append('text')
      .attr('x', (d, i) => xScale(d.start) + 5)
      .attr('y', (d, i) => yScale(d.name) + 15)
      .text((d) => `${d.start} - ${d.end}`)
      .attr('fill', 'white')
      .attr('font-size', 10)

      bars.on('mouseenter', (e) => {
        // console.log(e.target)
        d3.select(e.target).raise()
      })
      .on('mouseout', () => bars.order()
      )
    

    xAxis.call(d3.axisBottom(xScale)).attr('transform', `translate(0, ${CHART_HEIGHT - 50})`)
    yAxis.call(d3.axisLeft(yScale))//.attr('transform', `translate(50, 0)`)

  }

  useEffect(() => {
    drawChart()
  }, [])

  return (
    <svg></svg>
  )
}
