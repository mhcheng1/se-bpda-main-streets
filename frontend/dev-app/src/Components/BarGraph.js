import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

function BarGraph(data, intv, font, x_axis, y_axis) {
  // Input:  data is a Python dictionary that contains information about a Main Street;
  //         intv is an int that limits the number of ticks shown in an axis;
  //         font is an int that will be used to set the font size of a label;
  //         x_axis is a key to the data dictionary that will give the x values for the graph;
  //         y_axis is a key to the data dictionary that will give the y values for the graph
  // Output: A bar graph that visualizes the information given in the data dictionary

  return (
    <BarChart
      width={600}
      height={200}
      data={data}
      barGap={2}
      layout="vertical"
      barCategoryGap="20%"
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" />
      <YAxis
        type="category"
        tick={{ fontSize: font }}
        width={300}
        dataKey={y_axis}
        interval={intv}
      />
      <Tooltip />
      <Bar dataKey={x_axis} fill="blue" />
    </BarChart>
  );
}
export default BarGraph;
