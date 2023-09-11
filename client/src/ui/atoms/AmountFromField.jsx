import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

export const AmountFormField = ({ control, value, field, error }) => {
  return (
    <Controller
      name="amount"
      control={control}
      type="number"
      rules={{
        required: 'Kwota nie może być pusta',
        validate: {
          greaterThanZero: (value) =>
            value > 0 || 'Kwota musi być większa niż 0',
          lessThanMillion: (value) =>
            value < 1000000 || 'Kwota nie może być większa niż 1000000',
        },
      }}
      render={({ field }) => (
        <TextField
          {...field}
          label="Kwota"
          error={!!error.amount}
          helperText={error.amount?.message}
        />
      )}
    />
  );
};
