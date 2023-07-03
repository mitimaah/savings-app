import { TablePagination } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import { EnhancedTableHead } from './components/EnhancedTableHead';
import { EnhancedTableToolbar } from './components/EnhancedTableToolbar';

export const Table = ({
  headCells,
  rows,
  getUniqueId,
  deleteRecords,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  totalRows
}) => {
  const [selected, setSelected] = useState([]);

  const handleSelectAllClick = (event) => {
    setSelected(event.target.checked ? rows.map((n) => getUniqueId(n)) : []);
  };

  const handleClick = (event, id) => {
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
                  {headCells.map((head) => {
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
