export type ChartType = 'line' | 'bar' | 'area';

export type ChartInfo = {
  id: string;
  type: ChartType;
  name: string;
};

export type ChartData = {
  name: string;
  uv: number;
  pv: number;
};
