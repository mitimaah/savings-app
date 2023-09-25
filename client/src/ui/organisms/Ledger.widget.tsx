import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { Box, Typography } from '@mui/material';
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
  AddNewLedgerRecordModal,
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
import { LedgerModeType, RowType } from 'ui/molecules/table/Table';

const headCells = [
  {
    id: 'title',
    label: 'Nazwa',
    disablePadding: false,
    renderCell: (row: RowType) => row.title,
  },
  {
    id: 'categoryName',
    label: 'Kategoria',
    renderCell: (row: RowType) => (
      <CategoryCell color={row.category.color} name={row.category.name} />
    ),
  },
  {
    id: 'createdAt',
    label: 'Data',
    disablePadding: false,
    renderCell: (row: RowType) => <LocalizedDate date={row.createdAt} />,
  },
  {
    id: 'amountInCents',
    label: 'Kwota',
    disablePadding: false,
    renderCell: (row: RowType) =>
      row.mode === 'EXPENSE' ? (
        <Typography variant="inherit" color={'error.main'}>
          - <Money inCents={row.amountInCents} />
        </Typography>
      ) : (
        <Typography variant="inherit" color={'success.main'}>
          + <Money inCents={row.amountInCents} />
        </Typography>
      ),
  },
];

export const LedgerWidget = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModalType, setOpenModalType] = useState<'' | LedgerModeType>(
    '',
  );
  const { isLoading, error, data } = useQuery<boolean, Error, any>({
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

  const handleClose = () => {
    setOpenModalType('');
  };

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
    queryClient.invalidateQueries({ queryKey: [LEDGER_QUERY] });
  };

  const handleRowsPerPageChange = (
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
                onClick={() => setOpenModalType('INCOME')}
              >
                Wpłać
              </Button>
              <Button
                variant={'outlined'}
                startIcon={<RemoveRoundedIcon />}
                color={'primary'}
                onClick={() => setOpenModalType('EXPENSE')}
              >
                Wypłać
              </Button>
            </Box>
          )}
        />
      }
    >
      {isLoading && <Loader />}
      {error && <Error error={error} />}
      {!isLoading && !error && !data && <NoContent />}
      {!isLoading && !error && !!data?.length && (
        <Table
          headCells={headCells}
          rows={data}
          getUniqueId={getUniqueId}
          deleteRecords={deleteRecords}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          totalRows={total}
        />
      )}
      <AddNewLedgerRecordModal
        onClose={handleClose}
        open={!!openModalType}
        type={openModalType}
      />
    </Card>
  );
};
