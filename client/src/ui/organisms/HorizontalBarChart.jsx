import { BudgetService } from 'api';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { BUDGET_QUERY } from 'queryKeys';
import { Bar } from 'react-chartjs-2';
import { useQuery } from 'react-query';
import { Card, NoContent } from 'ui';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  indexAxis: 'y',
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const HorizontalBarChart = () => {
  const { isSuccess, data } = useQuery({
    queryKey: [BUDGET_QUERY],
    queryFn: BudgetService.findAll,
  });

  const labels = data?.map((item) => item.category.name);
  const transformedLabels = labels?.map((label) => label + ' %');

  const barChartData = {
    labels: transformedLabels,
    datasets: [
      {
        label: 'spending-categories',
        data: data?.map((item) => item.currentSpendingPercent),
        backgroundColor: data?.map((item) => item.category.color),
      },
    ],
  };

  return (
    <Card title={'Budżet'} subheader={'Podsumowanie wydatków'}>
      {isSuccess && Object.keys(barChartData).length === 0 && <NoContent />}
      {isSuccess && Object.keys(barChartData).length > 0 && (
        <Bar options={options} data={barChartData} />
      )}
    </Card>
  );
};

export default HorizontalBarChart;
