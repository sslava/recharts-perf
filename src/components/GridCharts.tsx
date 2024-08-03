import ChartCard from './ChartCard';

import { ChartInfo } from './charts';

export default function GridCharts({ data }: { data?: ChartInfo[] }) {
  return (
    <div className="grid sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data?.map((c) => (
        <ChartCard key={c.id} id={c.id} type={c.type} name={c.name} />
      ))}
    </div>
  );
}
