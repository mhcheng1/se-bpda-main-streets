import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


function LineGraph(data, x_axis, y_axis) {
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
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="category" dataKey ={x_axis} interval={10} label={{value: 'Dates', position: 'bottom'}}/>
          <YAxis type="number" tickFormatter= {value => parseFloat(value).toFixed(0)} domain={['dataMin', 'dataMax']} tickCount={10} label={{value: 'Trips', position: 'left', angle:-90}}/>
          <Tooltip />
          <Line dataKey={y_axis} stroke="#82ca9d" />
        </LineChart>
    );
}
export default LineGraph;