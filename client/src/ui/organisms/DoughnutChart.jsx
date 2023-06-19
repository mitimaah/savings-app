import { Box, Typography } from '@mui/material';
import { SummaryService } from 'api';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { SUMMARY_QUERY } from 'queryKeys';
import { Doughnut } from 'react-chartjs-2';
import { useQuery } from 'react-query';
import { Card, Money } from 'ui';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  plugins: {
    legend: {
      display: true,
      position: 'left',
      align: 'end',
      labels: { usePointStyle: true },
    },
  },
};

const DoughnutChart = () => {
  const { data } = useQuery({
    queryKey: [SUMMARY_QUERY],
    queryFn: SummaryService.findAll,
  });

  const doughnutData = {
    labels: data?.spending.map((item) => item.categoryName),
    datasets: [
      {
        label: 'spending-categories',
        data: data?.spending.map((item) => item.amountInCents),
        backgroundColor: data?.spending.map((item) => item.categoryColor),
        borderWidth: 0,
      },
    ],
  };

  return (
    <Card
      title={
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}
        >
          <Typography>{'Saldo'}</Typography>
          <Money inCents={data?.balance} />
        </Box>
      }
      subheader={'Pozostała kwota'}
    >
      <Doughnut data={doughnutData} options={options} />
    </Card>
  );
};
export default DoughnutChart;
