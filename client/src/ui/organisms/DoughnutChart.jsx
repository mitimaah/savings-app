import { Box, Grid, Typography } from '@mui/material';
import { SummaryService } from 'api';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { SUMMARY_QUERY } from 'queryKeys';
import { Doughnut } from 'react-chartjs-2';
import { useQuery } from 'react-query';
import { Card, Error, Loader, Money } from 'ui';
import { CustomChartLegendItem } from 'ui/molecules/CustomChartLegendItem';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
};

export const DoughnutChart = () => {
  const { isSuccess, isLoading, error, data } = useQuery({
    queryKey: [SUMMARY_QUERY],
    queryFn: SummaryService.findAll,
  });

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
          }}
        >
          <Typography variant={'h4'}>{'Saldo'}</Typography>
          <Typography
            component="h3"
            variant="h4"
            marginBottom={1}
            fontWeight="bold"
          >
            <Money inCents={data?.balance} />
          </Typography>
        </Box>
      }
      subheader={'Pozostała kwota'}
    >
      {isLoading && <Loader />}
      {!isLoading && error && <Error error={error} />}
      <Grid container mt={4}>
        {isSuccess && Object.keys(doughnutData).length === 0 && (
          <Typography>Brak wyników</Typography>
        )}
        {isSuccess && Object.keys(doughnutData).length > 0 && (
          <>
            <Grid item xs={12} alignItems={'center'}>
              <Doughnut
                data={doughnutData}
                height={200}
                width={200}
                options={options}
              />
            </Grid>
            <Grid item xs={12} mt={3}>
              {data?.spending?.map((item) => (
                <CustomChartLegendItem
                  key={item.categoryId}
                  name={item.categoryName}
                  color={item.categoryColor}
                ></CustomChartLegendItem>
              ))}
            </Grid>
          </>
        )}
      </Grid>
    </Card>
  );
};
