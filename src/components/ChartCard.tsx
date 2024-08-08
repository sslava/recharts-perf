import { ChartData, ChartType } from './charts';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  Area,
  AreaChart,
} from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { getChartData } from '../api';

function LineChartContainer({ data }: { data: ChartData[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} height={300}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={false} />
        <YAxis />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="rgb(66, 165, 246)"
          isAnimationActive={false}
        />
        <Line
          type="monotone"
          dataKey="uv"
          stroke="rgb(153, 102, 255)"
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

function BarChartContainer({ data }: { data: ChartData[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} height={300}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={false} />
        <YAxis />
        <Bar dataKey="pv" fill="rgb(66, 165, 246)" isAnimationActive={false} />
        <Bar dataKey="uv" fill="rgb(153, 102, 255)" isAnimationActive={false} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function AreaChartContainer({ data }: { data: ChartData[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} height={300}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={false} />
        <YAxis />
        <Area
          type="monotone"
          dataKey="uv"
          stackId="1"
          stroke="rgb(66, 165, 246)"
          fill="rgb(66, 165, 246)"
          isAnimationActive={false}
        />
        <Area
          type="monotone"
          dataKey="pv"
          stackId="1"
          stroke="rgb(153, 102, 255)"
          fill="rgb(153, 102, 255)"
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

type ChartCardProps = {
  id: string;
  type: ChartType;
};

const components = {
  line: LineChartContainer,
  bar: BarChartContainer,
  area: AreaChartContainer,
};

export default function ChartCard({ id, type }: ChartCardProps) {
  const { data } = useQuery({
    queryKey: ['chartData', id],
    refetchOnMount: false,
    queryFn: () => getChartData(id),
  });

  const ChartComponent = components[type];
  if (!ChartComponent) {
    return null;
  }

  return (
    <div className="shadow-md p-4 bg-white rounded-lg max-h-96">
      <ChartComponent data={data ?? []} />
    </div>
  );
}
