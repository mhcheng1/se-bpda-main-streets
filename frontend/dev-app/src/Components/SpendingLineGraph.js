import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";

function LineGraph(data, x_axis, y_axis) {
  // Input:  data is a Python dictionary that contains information on the spending distribution of a Main Street;
  //         x_axis is a key to the data dictionary that will give the x values for the graph;
  //         y_axis is a key to the data dictionary that will give the y values for the graph;
  // Output: A line graph that visualizes the distribution of spending over a set of time

  return (
    <LineChart
      width={700}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 20,
      }}
    >
      {/* tickCount={20} */}
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        type="category"
        dataKey={x_axis}
        interval={10}
        label={{ value: "Dates", position: "bottom" }}
      />
      <YAxis
        type="number"
        tickFormatter={(tick) => `${tick}%`}
        domain={[-70, "dataMax"]}
        tickCount={30}
        label={{ value: "Spending", position: "left", angle: -90 }}
      />
      <ReferenceLine y={0} stroke="black" />
      <Tooltip />
      <Line dataKey={y_axis} stroke="#82ca9d" />
    </LineChart>
  );
}
export default LineGraph;
