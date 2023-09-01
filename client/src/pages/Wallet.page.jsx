import { Grid } from '@mui/material';
import { DoughnutChart, HorizontalBarChart, LedgerWidget, Page } from 'ui';

export const WalletPage = () => (
  <Page title={'Portfel'}>
    <Grid container spacing={{ xs: 3, md: 6 }}>
      <Grid item xs={12} md={8}>
        <LedgerWidget />
      </Grid>
      <Grid
        container
        item
        xs={12}
        md={4}
        spacing={3}
        style={{ display: 'block', paddingLeft: '24px' }}
      >
        <Grid
          item
          xs={12}
          data-test-id={'wallet-top-sidebar'}
          // className={'wallet-sidebar'}
          sx={{ height: 'fit-content' }}
        >
          <DoughnutChart />
        </Grid>
        <Grid
          item
          xs={12}
          data-test-id={'wallet-bottom-sidebar'}
          // className={'wallet-sidebar'}
          sx={{ height: 'fit-content' }}
        >
          <HorizontalBarChart />
        </Grid>
      </Grid>
    </Grid>
  </Page>
);
