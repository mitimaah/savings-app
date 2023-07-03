import { BudgetService } from 'api';
import { BUDGET_QUERY, CATEGORIES_QUERY } from 'queryKeys';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import {
  CategoryCell,
  Error,
  Loader,
  LocalizedDate,
  Money,
  NoContent,
  Table,
} from 'ui';

export const BudgetTableWidget = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: [BUDGET_QUERY],
    queryFn: BudgetService.findAll,
  });

  const total = data?.length;

  const mutation = useMutation({
    mutationFn: (selected) => {
      return BudgetService.remove({ ids: selected });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BUDGET_QUERY] });
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERY] });
    },
  });

  const deleteRecords = (ids) => mutation.mutate(ids);

  const getUniqueId = (row) => {
    return row.id;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    queryClient.invalidateQueries({ queryKey: [BUDGET_QUERY] });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    queryClient.invalidateQueries({ queryKey: [BUDGET_QUERY] });
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

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error error={error} />;
  }

  if (!data?.length) {
    return <NoContent />;
  }

  return (
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
  );
};
