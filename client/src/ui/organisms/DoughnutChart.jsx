import { Box, Typography } from '@mui/material';
import { SummaryService } from 'api';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { SUMMARY_QUERY } from 'queryKeys';
import { Doughnut } from 'react-chartjs-2';
import { useQuery } from 'react-query';
import { Card, ColorBox, Money, NoContent } from 'ui';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
};

const LegendItem = (item) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <ColorBox color={item.color} />
      <Typography>{item.label}</Typography>
    </Box>
  );
};

const DoughnutChart = () => {
  const { isSuccess, data } = useQuery({
    queryKey: [SUMMARY_QUERY],
    queryFn: SummaryService.findAll,
  });

  const transformedData = data?.spending;

  const doughnutData = {
    labels: data?.spending.map((item) => item.categoryName),
    datasets: [
      {
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
      {isSuccess && Object.keys(doughnutData).length === 0 && <NoContent />}
      {isSuccess && Object.keys(doughnutData).length > 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ width: '100%', height: 'auto' }}>
            <Doughnut
              style={{ margin: '2rem 6rem' }}
              data={doughnutData}
              options={options}
            />
            <div style={{ marginTop: '20px', alignItems: 'left' }}>
              {transformedData?.map((item) => (
                <LegendItem
                  key={item.categoryId}
                  label={item.categoryName}
                  color={item.categoryColor}
                ></LegendItem>
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
export default DoughnutChart;
