import { ChartData, ChartInfo } from './components/charts';

export async function getCharts(): Promise<ChartInfo[]> {
  const resp = await fetch(`http://localhost:8080/api/charts`);
  return (await resp.json()) as ChartInfo[];
}

export async function getChartData(id: string): Promise<ChartData[]> {
  const resp = await fetch(`http://localhost:8080/api/data/${id}`);
  return (await resp.json()) as ChartData[];
}
