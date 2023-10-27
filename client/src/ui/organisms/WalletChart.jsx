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

export const WalletChart = () => {
  const { isSuccess, isLoading, error, data } = useQuery({
    queryKey: [SUMMARY_QUERY],
    queryFn: SummaryService.findAll,
  });

  const transformedData = data?.spending;

  const doughnutData = {
    labels: transformedData?.map(({ categoryName }) => categoryName),
    datasets: [
      {
        data: transformedData?.map(({ amountInCents }) => amountInCents),
        backgroundColor: transformedData?.map(
          ({ categoryColor }) => categoryColor,
        ),
        borderWidth: 0,
      },
    ],
  };

  const displayNoResult = (isSuccess, noResult) => {
    return isSuccess && noResult && <Typography>Brak wyników</Typography>;
  };

  const displayResult = (isSuccess, areResults) => {
    return (
      isSuccess &&
      areResults && (
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
            {transformedData?.map(
              ({ categoryId, categoryName, categoryColor }) => (
                <CustomChartLegendItem
                  key={categoryId}
                  name={categoryName}
                  color={categoryColor}
                ></CustomChartLegendItem>
              ),
            )}
          </Grid>
        </>
      )
    );
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
          <Typography variant="h4">{'Saldo'}</Typography>
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
        {displayNoResult(isSuccess, Object.keys(doughnutData).length === 0) ||
          displayResult(isSuccess, Object.keys(doughnutData).length > 0)}
      </Grid>
    </Card>
  );
};
