import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  Area,
  AreaChart,
} from 'recharts';

function LineChartContainer({ data }) {
  return (
    <LineChart width={500} height={300} data={data ?? []}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Line
        isAnimationActive={false}
        type="monotone"
        dataKey="pv"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line
        type="monotone"
        dataKey="uv"
        stroke="#82ca9d"
        isAnimationActive={false}
      />
    </LineChart>
  );
}

function BarChartContainer({ data }) {
  return (
    <BarChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Bar dataKey="pv" fill="#8884d8" isAnimationActive={false} />
      <Bar dataKey="uv" fill="#82ca9d" isAnimationActive={false} />
    </BarChart>
  );
}

function AreaChartContainer({ data }) {
  return (
    <AreaChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Area
        type="monotone"
        isAnimationActive={false}
        dataKey="uv"
        stackId="1"
        stroke="#8884d8"
        fill="#8884d8"
      />
      <Area
        type="monotone"
        isAnimationActive={false}
        dataKey="pv"
        stackId="1"
        stroke="#82ca9d"
        fill="#82ca9d"
      />
    </AreaChart>
  );
}

const stripOuterDiv =
  /<div(?:\s+[a-z,-]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)))*\s*>([\S\s]*)<\/div>/i;

export const decorateRechartSvg = (rechartsSvg) => {
  const stripped = rechartsSvg.replace(stripOuterDiv, '$1');
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ${stripped.substring(
    5,
  )}`;
};

export function Preview({ data, type }) {
  if (type === 'line') {
    return <LineChartContainer data={data} />;
  }
  if (type === 'bar') {
    return <BarChartContainer data={data} />;
  }
  if (type === 'area') {
    return <AreaChartContainer data={data} />;
  }
  return 'not supported';
}
