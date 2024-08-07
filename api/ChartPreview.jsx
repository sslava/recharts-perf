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
        stroke="#42a5f6"
      />
      <Line
        type="monotone"
        dataKey="uv"
        stroke="#ff9f40"
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
      <Bar dataKey="pv" fill="#42a5f6" isAnimationActive={false} />
      <Bar dataKey="uv" fill="#ff9f40" isAnimationActive={false} />
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
        stroke="#42a5f6"
        fill="#42a5f6"
      />
      <Area
        type="monotone"
        isAnimationActive={false}
        dataKey="pv"
        stackId="1"
        stroke="#ff9f40"
        fill="#ff9f40"
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
