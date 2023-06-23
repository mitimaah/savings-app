import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { CategoryService, LedgerService } from 'api';
import {
  BUDGET_QUERY,
  CATEGORIES_QUERY,
  LEDGER_QUERY,
  SUMMARY_QUERY,
} from 'queryKeys';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { CategoryCell } from 'ui';
import BasicModal from 'ui/molecules/Modal';

const defaultValues = {
  name: '',
  amount: '',
  category: '',
};

const AddNewLedgerRecord = ({ open, type, onClose }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm({
    defaultValues: defaultValues,
  });

  const { data } = useQuery({
    queryKey: [CATEGORIES_QUERY],
    queryFn: () => CategoryService.findAll(),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: LedgerService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LEDGER_QUERY] });
      queryClient.invalidateQueries({ queryKey: [SUMMARY_QUERY] });
      queryClient.invalidateQueries({ queryKey: [BUDGET_QUERY] });
    },
  });

  const createRecord = (record) => {
    mutation.mutate({ requestBody: record });
  };

  const onSubmit = (record) => {
    createRecord({
      mode: type,
      title: record.name,
      amountInCents: record.amount * 100,
      categoryId: record.category,
    });
    onClose();
    reset();
  };

  const modalHeader = (type) => {
    if (type === 'INCOME') {
      return 'Dodaj wpływ';
    } else if (type === 'EXPENSE') {
      return 'Dodaj wydatek';
    }
  };

  return (
    <BasicModal
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      description={modalHeader(type)}
      disabled={!isValid}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          padding: '2rem 0',
        }}
      >
        <Controller
          name="name"
          control={control}
          rules={{
            required: 'Nazwa nie może być pusta',
            validate: (value) =>
              value.trim().length > 0 || 'Nazwa nie może być pusta',
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              InputLabelProps={{
                style: { color: '#1F2633' },
              }}
              label="Nazwa"
              variant="outlined"
              type="text"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
        />
        <Controller
          name="amount"
          control={control}
          rules={{
            required: 'Kwota nie może być pusta',
            validate: (value) => {
              if (value <= 0) {
                return 'Kwota musi być większa niż 0';
              } else if (value > 1000000)
                return 'Kwota nie może być większa niż 1000000';
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              InputLabelProps={{
                style: { color: '#1F2633' },
                // shrink: false,
              }}
              label="Kwota"
              variant="outlined"
              type="number"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
        />
        {type === 'EXPENSE' && (
          <FormControl fullWidth>
            <InputLabel>Wybierz kategorię</InputLabel>
            <Controller
              control={control}
              name="category"
              render={({ field: { onChange, value } }) => (
                <Select
                  value={value}
                  onChange={onChange}
                  IconComponent={KeyboardArrowDownRoundedIcon}
                  label="Wybierz kategorię"
                >
                  {data.map(({ color, name, id }) => (
                    <MenuItem key={id} value={id}>
                      <CategoryCell color={color} name={name} />
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        )}
      </Box>
    </BasicModal>
  );
};

export default AddNewLedgerRecord;
