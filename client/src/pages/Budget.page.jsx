import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Grid } from '@mui/material';
import { useState } from 'react';

import { ActionHeader, Button, Card, Page } from 'ui';
import AddNewBudgetRecord from 'ui/organisms/AddNewBudgetRecord.modal';
import { BudgetTableWidget } from 'ui/organisms/BudgetTable.widget';

export const BudgetPage = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = (type) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    // submit function - to do later
    setOpen(false);
  };

  return (
    <Page title="Budżet">
      <Card
        title={
          <ActionHeader
            variant={'h1'}
            title="Budżet"
            renderActions={() => (
              <Button
                variant={'contained'}
                startIcon={<AddRoundedIcon />}
                onClick={handleOpen}
              >
                Zdefiniuj budżet
              </Button>
            )}
          />
        }
      >
        <Grid container>
          <Grid item xs={12}>
            <BudgetTableWidget />
          </Grid>
        </Grid>
      </Card>
      <AddNewBudgetRecord
        onClose={handleClose}
        onSubmit={handleSubmit}
        open={open}
      />
    </Page>
  );
};
