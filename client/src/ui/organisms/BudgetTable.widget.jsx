import { BudgetService } from 'api';
import { BUDGET_QUERY, PARTIAL_CATEGORIES_QUERY } from 'queryKeys';
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
      queryClient.invalidateQueries({ queryKey: [PARTIAL_CATEGORIES_QUERY] });
    },
  });

  const deleteRecords = (ids) => mutation.mutate(ids);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    queryClient.invalidateQueries({ queryKey: [BUDGET_QUERY] });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    queryClient.invalidateQueries({ queryKey: [BUDGET_QUERY] });
  };

  const tableDefinition = [
    {
      id: 'name',
      label: 'Nazwa',
      renderCell: (row) => (
        <CategoryCell color={row.category.color} name={row.category.name} />
      ),
    },
    {
      id: 'amount',
      label: 'Planowane wydatki',
      renderCell: (row) => <Money inCents={row.amountInCents} />,
    },
    {
      id: 'current-amount',
      label: 'Obecna kwota',
      renderCell: (row) => <Money inCents={row.currentSpending} />,
    },
    {
      id: 'status',
      label: 'Status',
      renderCell: (row) => {
        return row.currentSpending === row.amountInCents
          ? 'Wykorzystany'
          : row.currentSpending > row.amountInCents
          ? 'Przekroczone'
          : 'W normie';
      },
    },
    {
      id: 'createdAt',
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
      headCells={tableDefinition}
      rows={data}
      getUniqueId={(row) => row.id}
      deleteRecords={deleteRecords}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      totalRows={total}
    />
  );
};
