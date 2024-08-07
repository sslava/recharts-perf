import { useQuery } from '@tanstack/react-query';
import ChartImgCard from './ChartImgCard';
import { getCharts } from '../api';

export default function ChartsImages() {
  const { data } = useQuery({
    queryKey: ['charts'],
    queryFn: () => getCharts(),
  });

  return (
    <div className="grid sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data?.map((c) => <ChartImgCard key={c.id} id={c.id} type={c.type} />)}
    </div>
  );
}
