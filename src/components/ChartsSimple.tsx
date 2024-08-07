import { useQuery } from '@tanstack/react-query';
import ChartCard from './ChartCard';
import { getCharts } from '../api';

export default function ChartsSimple() {
  const { data } = useQuery({
    queryKey: ['charts'],
    queryFn: () => getCharts(),
  });

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data?.map((c) => <ChartCard key={c.id} id={c.id} type={c.type} />)}
    </div>
  );
}
