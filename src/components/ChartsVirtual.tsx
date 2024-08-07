import { useRef, useEffect, useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useWindowVirtualizer } from '@tanstack/react-virtual';

import ChartCard from './ChartCard';

import { useWindowSize } from './useWindowSize';

import { getCharts } from '../api';

export default function ChartsVirtual() {
  const listRef = useRef<HTMLDivElement | null>(null);

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['charts-paginated'],
      queryFn: ({ pageParam }) => getCharts(pageParam),
      initialPageParam: 0,
      getNextPageParam: (_, __, lastPage) => lastPage + 1,
    });

  const rows = useMemo(
    () => data?.pages.flatMap((d) => d) ?? [],
    [data?.pages],
  );

  const { width } = useWindowSize();
  const cols = width < 640 ? 1 : width < 1024 ? 2 : 3;

  const virtualizer = useWindowVirtualizer({
    count: Math.ceil(rows.length / cols),
    estimateSize: () => 350,
  });

  const virtualItems = virtualizer.getVirtualItems();

  useEffect(() => {
    const lastItem = [...virtualItems].pop();
    if (
      lastItem &&
      (lastItem.index + 1) * cols >= rows.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    cols,
    hasNextPage,
    fetchNextPage,
    rows.length,
    isFetchingNextPage,
    virtualItems,
  ]);

  return (
    <div ref={listRef}>
      <div
        className="width-full relative"
        style={{ height: `${virtualizer.getTotalSize()}px` }}
      >
        {virtualItems.map((vr) => (
          <div
            key={vr.key}
            className="absolute top-0 left-0 w-full flex justify-start gap-4"
            style={{
              height: `${vr.size}px`,
              transform: `translateY(${vr.start}px)`,
            }}
          >
            {Array.from({ length: cols }).map((_, i) => {
              const c = rows[vr.index * cols + i];
              return (
                <div className="w-full" key={c?.id}>
                  {c && <ChartCard id={c.id} type={c.type} name={c.name} />}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
