import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Grid } from '@mui/material';
import { BudgetService } from 'api';
import { useMutation, useQuery, useQueryClient } from 'react-query';
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
      } else if (row.currentSpending > row.amountInCents) {
        return 'Przekroczone';
      } else if (row.currentSpending < row.amountInCents) {
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

export const BudgetPage = () => {
  const { isLoading, error, isSuccess, data } = useQuery({
    queryKey: ['budget'],
    queryFn: BudgetService.findAll,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (selected) => {
      return BudgetService.remove({ ids: selected });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budget'] });
    },
  });

  const getUniqueId = (row) => {
    return row.id;
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
                color={'primary'}
              >
                Zdefiniuj budżet
              </Button>
            )}
          />
        }
      >
        <Grid container>
          <Grid item xs={12}>
            {isLoading && <Loader />}
            {error && <Error />}
            {isSuccess && data.length === 0 && <NoContent />}
            {isSuccess && data.length > 0 && (
              <Table
                headCells={headCells}
                rows={data}
                getUniqueId={getUniqueId}
                deleteRecords={mutation.mutate}
              />
            )}
          </Grid>
        </Grid>
      </Card>
    </Page>
  );
};
