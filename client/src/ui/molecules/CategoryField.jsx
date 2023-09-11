import { MenuItem, TextField } from '@mui/material';
import { CategoryCell } from './CategoryCell';

export const CategoryField = ({
  value,
  onChange,
  categories,
  ...inputProps
}) => {
  return (
    <TextField
      select
      label="Kategoria"
      value={value}
      onChange={onChange}
      {...inputProps}
    >
      {categories.map(({ color, name, id }) => (
        <MenuItem key={id} value={id}>
          <CategoryCell color={color} name={name} />
        </MenuItem>
      ))}
    </TextField>
  );
};
