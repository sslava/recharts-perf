import { ChartType } from './charts';

type ChartCardProps = {
  id: string;
  type: ChartType;
};

export default function ChartImgCard({ id, type }: ChartCardProps) {
  return (
    <div className="shadow-md p-4 bg-white rounded-lg max-h-96">
      <img
        src={`http://localhost:8080/api/charts-svg/${id}?type=${type}`}
        alt={`Preview of ${id}`}
      />
    </div>
  );
}
