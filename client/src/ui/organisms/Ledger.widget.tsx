import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { Box, Grid, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { LedgerService } from 'api';
import {
  BUDGET_QUERY,
  CATEGORIES_QUERY,
  LEDGER_QUERY,
  SUMMARY_QUERY,
} from 'queryKeys';
import { useState } from 'react';
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
  Table,
} from 'ui';
import AddNewLedgerRecord from './AddNewLedgerRecord.modal';

interface CategoryType {
  id: string;
  budgetId: string;
  color: string;
  name: string;
  ledgerIds: string[];
}

interface RowType {
  id: string;
  title: string;
  mode: string;
  createdAt: string;
  categoryId: string;
  amountInCents: number;
  category: CategoryType;
}

const headCells = [
  {
    id: '1',
    label: 'Nazwa',
    renderCell: (row: RowType) => (
      <Typography variant="inherit">{row.title}</Typography>
    ),
  },
  {
    id: '2',
    label: 'Kategoria',
    renderCell: (row: RowType) => (
      <CategoryCell color={row.category.color} name={row.category.name} />
    ),
  },
  {
    id: '3',
    label: 'Data',
    renderCell: (row: RowType) => <LocalizedDate date={row.createdAt} />,
  },
  {
    id: '4',
    label: 'Obecna kwota',
    renderCell: (row: RowType) => (
      <Money
        color={adjustColor(row)}
        inCents={row.amountInCents}
        sign={adjustSign(row)}
      />
    ),
  },
];

const adjustColor = (row: RowType) => {
  if (row.mode === 'INCOME') {
    return 'green';
  } else if (row.mode === 'EXPENSE') {
    return 'red';
  }
};

const adjustSign = (row: RowType) => {
  if (row.mode === 'INCOME') {
    return '+';
  } else if (row.mode === 'EXPENSE') {
    return '-';
  }
};

export const LedgerWidget = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [transactionType, setTransactionType] = useState('');
  const { isLoading, error, isSuccess, data } = useQuery({
    queryKey: [LEDGER_QUERY, rowsPerPage, page],
    queryFn: () => LedgerService.findAll(rowsPerPage, page * rowsPerPage),
  });

  const total = data?.length; //tutaj powinien być użyty total zwracany z (GET)ledger
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (selected: string[]) => {
      return LedgerService.remove(selected);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LEDGER_QUERY] });
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERY] });
      queryClient.invalidateQueries({ queryKey: [SUMMARY_QUERY] });
      queryClient.invalidateQueries({ queryKey: [BUDGET_QUERY] });
    },
  });

  const deleteRecords = (selected: string[]) => {
    mutation.mutate(selected);
  };

  const getUniqueId = (row: RowType) => {
    return row.id;
  };

  const handleOpen = (type: string) => {
    setOpen(true);
    setTransactionType(type);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
    queryClient.invalidateQueries({ queryKey: [LEDGER_QUERY] });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    queryClient.invalidateQueries({ queryKey: [LEDGER_QUERY] });
  };

  return (
    <Card
      subheader=""
      title={
        <ActionHeader
          variant={'h1'}
          title="Portfel"
          renderActions={() => (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '1rem',
                flexDirection: 'row',
              }}
            >
              <Button
                variant={'outlined'}
                startIcon={<AddRoundedIcon />}
                color={'primary'}
                onClick={() => handleOpen('INCOME')}
              >
                Wpłać
              </Button>
              <Button
                variant={'outlined'}
                startIcon={<RemoveRoundedIcon />}
                color={'primary'}
                onClick={() => handleOpen('EXPENSE')}
              >
                Wypłać
              </Button>
            </Box>
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
              deleteRecords={deleteRecords}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              totalRows={total}
            />
          )}
        </Grid>
      </Grid>
      <AddNewLedgerRecord
        onClose={handleClose}
        open={open}
        type={transactionType}
      />
    </Card>
  );
};
