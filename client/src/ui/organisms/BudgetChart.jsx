import { Box, Typography } from '@mui/material';
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

export const BudgetChart = () => {
  const { isSuccess, data } = useQuery({
    queryKey: [BUDGET_QUERY],
    queryFn: BudgetService.findAll,
  });

  const labels = data?.map(({category}) => category.name);
  const transformedLabels = labels?.map((label) => label + ' %');

  const barChartData = {
    labels: transformedLabels,
    datasets: [
      {
        label: 'spending-categories',
        data: data?.map(({currentSpendingPercent}) => currentSpendingPercent),
        backgroundColor: data?.map(({category}) => category.color),
      },
    ],
  };

  return (
    <Card
      title={
        <Typography sx={{ mb: 1 }} variant={'h4'}>
          {'Budżet'}
        </Typography>
      }
      subheader={'Podsumowanie wydatków'}
    >
      {isSuccess && Object.keys(barChartData).length === 0 && (
        <Typography>'Brak wyników'</Typography>
      )}
      {isSuccess && Object.keys(barChartData).length > 0 && (
        <Box sx={{ paddingTop: '1rem' }}>
          <Bar options={options} data={barChartData} />
        </Box>
      )}
    </Card>
  );
};
