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
import { Card } from 'ui';

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
  const { data } = useQuery({
    queryKey: [BUDGET_QUERY],
    queryFn: BudgetService.findAll,
  });

  const barChartData = {
    labels: data?.map((item) => item.category.name),
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
      <Bar options={options} data={barChartData} />
    </Card>
  );
};

export default HorizontalBarChart;
