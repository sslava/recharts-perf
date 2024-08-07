import { Fragment } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import ChartCard from './ChartCard';
import { getCharts } from '../api';

export default function ChartsPaginated() {
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['charts-paginated'],
      queryFn: ({ pageParam }) => getCharts(pageParam),
      initialPageParam: 0,
      getNextPageParam: (_, __, lastPage) => lastPage + 1,
    });

  return (
    <>
      <div className="grid sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.pages.map((page, index) => (
          <Fragment key={index}>
            {page?.map((c) => <ChartCard key={c.id} id={c.id} type={c.type} />)}
          </Fragment>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {hasNextPage && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? 'Loading more...' : 'Load More'}
          </button>
        )}
      </div>
    </>
  );
}
