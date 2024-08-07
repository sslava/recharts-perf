import { ChartData, ChartInfo } from './components/charts';

export async function getCharts(page?: number): Promise<ChartInfo[]> {
  const resp = await fetch(
    `http://localhost:8080/api/charts?page=${page ?? ''}`,
  );
  return (await resp.json()) as ChartInfo[];
}

export async function getChartData(id: string): Promise<ChartData[]> {
  const resp = await fetch(`http://localhost:8080/api/charts/${id}`);
  return (await resp.json()) as ChartData[];
}
