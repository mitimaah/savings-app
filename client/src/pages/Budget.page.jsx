import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Grid } from '@mui/material';
import { BudgetService } from 'api';
import { useMutation, useQuery } from 'react-query';
import {
  ActionHeader,
  Button,
  Card,
  CategoryCell,
  Error,
  Loader,
  LocalizedDate,
  Money,
  NoContent,
  Page,
  Table,
} from 'ui';

export const BudgetPage = () => {
  // const { isLoading, error, data } = useQuery('budgetData', () => {
  //   return BudgetService.findAll();
  // });

  const getBudgetData = async () => {
    const res = await BudgetService.findAll();
    return res;
  };
  const { data, error, isLoading } = useQuery('budgetData', getBudgetData);

  const deleteMutation = useMutation((ids) => {
    return BudgetService.remove(ids);
  });

  const getUniqueId = (row) => {
    return row.id;
  };

  const deleteRecords = (selectedIds) => {
    deleteMutation.mutate(selectedIds);
    console.log('deleted row', selectedIds);
    getBudgetData();
  };

  const headCells = [
    {
      id: '1',
      label: 'Nazwa',
      renderCell: (row) => (
        <CategoryCell color={row.category.color} name={row.category.name} />
      ),
    },
    {
      id: '2',
      label: 'Planowane wydatki',
      renderCell: (row) => <Money inCents={row.amountInCents} />,
    },
    {
      id: '3',
      label: 'Obecna kwota',
      renderCell: (row) => <Money inCents={row.currentSpending} />,
    },
    {
      id: '4',
      label: 'Status',
      renderCell: (row) => {
        if (row.currentSpending === row.amountInCents) {
          return 'Wykorzystany';
        }
        if (row.currentSpending > row.amountInCents) {
          return 'Przekroczone';
        }
        if (row.currentSpending < row.amountInCents) {
          return 'W normie';
        }
      },
    },
    {
      id: '5',
      label: 'Data utworzenia',
      renderCell: (row) => <LocalizedDate date={row.createdAt} />,
    },
  ];

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
                color={'primary'}
              >
                Zdefiniuj budżet
              </Button>
            )}
          />
        }
      >
        {isLoading && <Loader />}
        {error && <Error />}
        {data ? (
          <Grid container>
            <Grid item xs={12}>
              <Table
                headCells={headCells}
                rows={data}
                getUniqueId={getUniqueId}
                deleteRecords={deleteRecords}
              />
            </Grid>
          </Grid>
        ) : (
          <NoContent />
        )}
      </Card>
    </Page>
  );
};
