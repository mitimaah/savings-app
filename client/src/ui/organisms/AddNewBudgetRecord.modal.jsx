import { Box, TextField, Typography } from '@mui/material';
import { BudgetService, CategoryService } from 'api';
import { BUDGET_QUERY, PARTIAL_CATEGORIES_QUERY } from 'queryKeys';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Error, Loader, Modal } from 'ui';
import { CategoryField } from 'ui/molecules/CategoryField';
import { formatDollarsToCents } from 'utils';

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
  } = useQuery(PARTIAL_CATEGORIES_QUERY, () => CategoryService.findAll(true));

  const mutation = useMutation({
    mutationFn: BudgetService.create,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [BUDGET_QUERY] });
      queryClient.refetchQueries({ queryKey: [PARTIAL_CATEGORIES_QUERY] });
    },
  });

  const createRecord = (record) => {
    mutation.mutate({ requestBody: record });
  };

  const onSubmit = (record) => {
    createRecord({
      amountInCents: formatDollarsToCents(record.amount),
      categoryId: record.categoryId,
    });
    onClose();
    reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <form>
      <Modal
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit(onSubmit)}
        title={'Zdefiniuj budżet'}
        disabled={!isValid}
        isToSave={!!categories?.length}
      >
        {isLoading && <Loader />}
        {error && <Error error={error} />}
        {!isLoading && !error && !categories?.length ? (
          <Typography sx={{ mt: '1rem' }}>
            Wszystkie kategorie są przypisane do budżetu. Aby zredefiniować usuń
            jeden z wpisów.
          </Typography>
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
              // defaultValue=""
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
              name="categoryId"
              rules={{
                required: { value: true, message: 'Wybierz kategorię' },
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <CategoryField
                  categories={categories}
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
            />
          </Box>
        )}
      </Modal>
    </form>
  );
};
