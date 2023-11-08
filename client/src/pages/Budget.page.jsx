import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Grid } from '@mui/material';
import { useModal } from 'hooks/useModal';

import {
  ActionHeader,
  AddNewBudgetRecordModal,
  BudgetTableWidget,
  Button,
  Card,
  Page,
} from 'ui';

export const BudgetPage = () => {
  const { modalVisible, handleOpen, handleClose, handleSubmit } = useModal();

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
      <AddNewBudgetRecordModal
        onClose={handleClose}
        onSubmit={handleSubmit}
        open={modalVisible}
      />
    </Page>
  );
};
