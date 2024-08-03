import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCharts } from '../api';

import GridImgs from './GridImgs';
import GridCharts from './GridCharts';

export default function ChartsPage() {
  const { data } = useQuery({
    queryKey: ['charts'],
    queryFn: () => getCharts(),
  });
  const [showImgs, setShowImgs] = useState(true);

  return (
    <>
      <div className="flex gap-2 py-2">
        <button
          className={`p-2 min-w-20 ${showImgs && 'font-bold'}`}
          onClick={() => setShowImgs(true)}
        >
          Images
        </button>
        <button
          className={`p-2 min-w-20 ${!showImgs && 'font-bold'}`}
          onClick={() => setShowImgs(false)}
        >
          Charts
        </button>
      </div>
      {!showImgs && <GridCharts data={data} />}
      {showImgs && <GridImgs data={data} />}
    </>
  );
}
