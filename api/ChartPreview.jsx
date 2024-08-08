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
      <XAxis dataKey="name" tick={false} />
      <YAxis />
      <Line
        isAnimationActive={false}
        type="monotone"
        dataKey="pv"
        stroke="rgb(66, 165, 246)"
      />
      <Line
        type="monotone"
        dataKey="uv"
        stroke="rgb(153, 102, 255)"
        isAnimationActive={false}
      />
    </LineChart>
  );
}

function BarChartContainer({ data }) {
  return (
    <BarChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" tick={false} />
      <YAxis />
      <Bar dataKey="pv" fill="rgb(66, 165, 246)" isAnimationActive={false} />
      <Bar dataKey="uv" fill="rgb(153, 102, 255)" isAnimationActive={false} />
    </BarChart>
  );
}

function AreaChartContainer({ data }) {
  return (
    <AreaChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" tick={false} />
      <YAxis />
      <Area
        type="monotone"
        isAnimationActive={false}
        dataKey="uv"
        stackId="1"
        stroke="rgb(66, 165, 246)"
        fill="rgb(66, 165, 246)"
      />
      <Area
        type="monotone"
        isAnimationActive={false}
        dataKey="pv"
        stackId="1"
        stroke="rgb(153, 102, 255)"
        fill="rgb(153, 102, 255)"
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

const components = {
  line: LineChartContainer,
  bar: BarChartContainer,
  area: AreaChartContainer,
};

export function Chart({ data, type }) {
  const Component = components[type];
  if (!Component) {
    return null;
  }
  return <Component data={data} />;
}
