import * as d3 from "d3";

export const icon = d3.create("svg:g");
icon
  .append("path")
  .attr("d", "M 0 0 L 20 20 M 20 0 L 0 20")
  .attr("fill", "purple")
  .attr("stroke", "lime");

export const icon2 = d3.create("svg:g");
icon2
  .append("path")
  .attr("d", "M 0 0 L 0 20 L 20 20 L 20 0 Z")
  .attr("fill", "purple")
  .attr("stroke", "lime");
