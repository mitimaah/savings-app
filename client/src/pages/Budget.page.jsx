import React from 'react';

import { Button, ActionHeader, Card, Page } from 'ui';
import { Grid } from '@mui/material';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import '../ui/atoms/Button.css';

export const BudgetPage = () => {
  return (
    <Page title="Budżet">
      <Card
        title={
          <ActionHeader
            variant={'h1'}
            title="Budżet"
            renderActions={() => null}
          />
        }
      >
        <Grid container>
          <Grid item xs={12}></Grid>
        </Grid>
      </Card>
    </Page>
  );
};
