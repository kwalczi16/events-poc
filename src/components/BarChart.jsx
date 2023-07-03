import React, { useEffect } from "react";
import * as d3 from "d3";
import { data } from "../data";
import { icon, icon2 } from "./icons.js";

const CHART_WIDTH = 600;
const CHART_HEIGHT = 400;

const START = 2;
const END = 30;

const MARGIN = {
  top: 10,
  right: 10,
  bottom: 30,
  left: 50,
};

export const BarChart = () => {
  const compare = (key) => (a, b) => {
    if (a[key] < b[key]) {
      return -1;
    }
    if (a[key] > b[key]) {
      return 1;
    }
    return 0;
  };

  const drawChart = () => {
    data.sort(compare("start"));
    data.sort(compare("name"));

    const xScale = d3
      .scaleLinear()
      .domain([START, END])
      .range([0, CHART_WIDTH - (MARGIN.left + MARGIN.right)]);

    const yScale = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([CHART_HEIGHT - (MARGIN.top + MARGIN.bottom), 0]);

    const svg = d3
      .select("svg")
      .attr("width", CHART_WIDTH)
      .attr("height", CHART_HEIGHT)
      .style("background-color", "lightgrey");

    svg.selectAll("*").remove();

    const container = svg
      .append("g")
      .attr("class", "container")
      .attr("transform", `translate(${MARGIN.left}, ${MARGIN.top})`)
      .attr("width", CHART_WIDTH)
      .attr("height", CHART_HEIGHT);

    const barsWrapper = container.append("g").attr("class", "bars");
    const xAxis = container.append("g").attr("class", "xaxis");
    const yAxis = container.append("g").attr("class", "yaxis");

    const bars = barsWrapper
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "barWrapper")
      .attr(
        "transform",
        (d, i) =>
          `translate(${xScale(d.start > START ? d.start : START)}, ${yScale(
            d.name
          )})`
      );

    bars
      .append("rect")
      // .attr("y", (d, i) => yScale(d.name) + 20 / 2)
      // .attr("x", (d, i) => xScale(d.start > START ? d.start : START))
      .attr("rx", 15)
      .attr("ry", 15)
      .attr("height", () => yScale.bandwidth() - 20)
      .attr("width", (d, i) =>
        xScale(d.start >= START ? d.end - d.start + START : d.end)
      )
      .attr("fill", (d) =>
        d.type === "A" ? "red" : d.type === "B" ? "blue" : "green"
      )
      .attr("class", (d) => `bar ${d.name} ${d.type}`);

    bars.each(function (d, i) {
      const this_ = d3.select(this);
      if (d.type === "A") {
        this_.append(() => icon.node().cloneNode(true));
      } else if (d.type === "B") {
        this_.append(() => icon2.node().cloneNode(true));
      }

      this_
        .attr("x", (d, i) => xScale(d.start > START ? d.start : START))
        .attr("y", (d, i) => yScale(d.name) + 20 / 2);
    });

    bars
      .append("text")
      // .attr("x", (d, i) => xScale(d.start > START ? d.start : START) + 5)
      // .attr("y", (d, i) => yScale(d.name) + 15 + 20 / 2)
      .attr("x", 5)
      .attr("y", 15 + 20 / 2)
      .text((d) => `${d.start} - ${d.end}`)
      .attr("fill", "white")
      .attr("font-size", 10);

    bars
      .on("mouseenter", (e) => {
        d3.select(e.target).raise();
      })
      .on("mouseout", () => bars.order());

    xAxis
      .call(d3.axisBottom(xScale))
      .attr(
        "transform",
        `translate(0, ${CHART_HEIGHT - MARGIN.top - MARGIN.bottom})`
      );
    yAxis.call(d3.axisLeft(yScale));
  };

  useEffect(() => {
    drawChart();
  }, []);

  return <svg></svg>;
};
