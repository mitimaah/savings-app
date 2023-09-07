import { Box, MenuItem, TextField } from '@mui/material';
import { BudgetService, CategoryService } from 'api';
import { BUDGET_QUERY, CATEGORIES_QUERY } from 'queryKeys';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { CategoryCell, Error, Loader, Modal } from 'ui';

// const defaultValues = {
//   amount: '',
//   category: '',
// };

export const AddNewBudgetRecordModal = ({ open, onClose }) => {
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
  });

  const {
    isLoading,
    error,
    data: categories,
  } = useQuery(CATEGORIES_QUERY, () => CategoryService.findAll(true));

  const mutation = useMutation({
    mutationFn: BudgetService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BUDGET_QUERY] });
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERY] });
    },
  });

  const createRecord = (record) => {
    mutation.mutate({ requestBody: record });
  };

  const onSubmit = (record) => {
    createRecord({
      amountInCents: record.amount * 100,
      categoryId: record.category,
    });
    onClose();
    reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  console.log(categories);

  return (
    <form>
      <Modal
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit(onSubmit)}
        title={'Zdefiniuj budżet'}
        disabled={!isValid}
      >
        {isLoading && <Loader />}
        {error && <Error error={error} />}
        {!isLoading && !error && !categories?.length ? (
          'Wszystkie kategorie są przypisane do budżetu. Aby zredefiniować usuń jeden z wpisów.'
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
              padding: '2rem 0',
            }}
          >
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
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
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
            {/* <AmountFormField
            control={control}
            value={value}
            field={field}
            error={error}
          /> */}

            <Controller
              control={control}
              defaultValue=""
              name="category"
              rules={{
                required: { value: true, message: 'Wybierz kategorię' },
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  select
                  value={value}
                  onChange={onChange}
                  label="Kategoria"
                  error={!!error}
                  helperText={error ? error.message : null}
                >
                  {categories.map(({ color, name, id }) => (
                    <MenuItem key={id} value={id}>
                      <CategoryCell color={color} name={name} />
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Box>
        )}
      </Modal>
    </form>
  );
};
