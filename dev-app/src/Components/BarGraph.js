import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from "recharts";

function BarGraph(data, x_axis, y_axis) {
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
            bottom: 5
        }}
        >
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis type="number"/>
        <YAxis type="category" tick={{fontSize: 7}} width={300} dataKey={y_axis} interval={1}/>
        <Tooltip />
        <Bar dataKey={x_axis} fill="blue" />
    </BarChart>
  );
}
export default BarGraph;