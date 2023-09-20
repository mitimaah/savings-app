import {
  Box,
  Checkbox,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@mui/material';
import MuiTable from '@mui/material/Table';
import { useState } from 'react';
import { EnhancedTableHead } from './components/EnhancedTableHead';
import { EnhancedTableToolbar } from './components/EnhancedTableToolbar';

interface CategoryType {
  id: string;
  budgetId: string;
  color: string;
  name: string;
  ledgerIds: string[];
}

export interface RowType {
  id: string;
  title: string;
  mode: 'INCOME' | 'EXPENSE';
  createdAt: string;
  categoryId: string;
  amountInCents: number;
  category: CategoryType;
}

interface HeadType {
  id: string;
  label: string;
  renderCell: (row: RowType) => React.ReactNode;
}

interface TablePropsTypes {
  headCells: HeadType[];
  rows: RowType[];
  getUniqueId: (row: RowType) => string;
  deleteRecords: (n: string[]) => void;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  totalRows: number;
}

export const Table = ({
  headCells,
  rows,
  getUniqueId,
  deleteRecords,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  totalRows,
}: TablePropsTypes) => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(event.target.checked ? rows.map((n) => getUniqueId(n)) : []);
  };

  const handleClick = (event: React.MouseEvent, id: string) => {
    setSelected(
      selected.includes(id)
        ? selected.filter((selectedId) => selectedId !== id)
        : [...selected, id],
    );
  };

  const onDelete = () => {
    deleteRecords(selected);
    setSelected([]);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <EnhancedTableToolbar selected={selected} onDelete={onDelete} />
      <TableContainer>
        <MuiTable aria-labelledby="tableTitle" size="medium">
          <EnhancedTableHead
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={rows.length}
            headCells={headCells}
          />
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row, index) => {
              const uniqueId = getUniqueId(row);
              const isItemSelected = selected.includes(uniqueId);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  key={uniqueId}
                  onClick={(event) => handleClick(event, uniqueId)}
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      inputProps={{
                        'aria-labelledby': labelId,
                      }}
                    />
                  </TableCell>
                  {headCells.map((head: HeadType) => {
                    const renderedRow = head.renderCell(row) || '';

                    return (
                      <TableCell key={head.id} align="left">
                        {renderedRow}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </MuiTable>
      </TableContainer>
      <TablePagination
        sx={{
          borderBottom: 'none',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
        rowsPerPageOptions={[10, 20, 50]}
        count={totalRows}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        showFirstButton={true}
        showLastButton={true}
      />
    </Box>
  );
};
