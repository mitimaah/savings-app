import { Checkbox, TableCell, TableHead, TableRow } from '@mui/material';

export function EnhancedTableHead({
  onSelectAllClick,
  numSelected,
  rowCount,
  headCells,
}) {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headCells.map(({id, disablePadding, label}) => (
          <TableCell
            key={id}
            align={'left'}
            padding={disablePadding ? 'none' : 'normal'}
          >
            {label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
