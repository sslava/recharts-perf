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
      <LineChart data={data ?? []} height={300}>
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
    </ResponsiveContainer>
  );
}

function BarChartContainer({ data }: { data: ChartData[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} height={300}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="pv" fill="#8884d8" isAnimationActive={false} />
        <Bar dataKey="uv" fill="#82ca9d" isAnimationActive={false} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function AreaChartContainer({ data }: { data: ChartData[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} height={300}>
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
    </ResponsiveContainer>
  );
}

type ChartCardProps = {
  id: string;
  name: string;
  type: ChartType;
};

export default function ChartCard({ id, type }: ChartCardProps) {
  const { data } = useQuery({
    queryKey: ['chartData', id],
    queryFn: () => getChartData(id),
  });

  return (
    <div className="shadow-md p-4 bg-white rounded-lg max-h-96">
      <div>{type === 'line' && <LineChartContainer data={data ?? []} />}</div>
      <div>{type === 'bar' && <BarChartContainer data={data ?? []} />}</div>
      <div>{type === 'area' && <AreaChartContainer data={data ?? []} />}</div>
    </div>
  );
}
