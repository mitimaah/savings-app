import { Box, TextField } from '@mui/material';
import { CategoryService, LedgerService } from 'api';
import * as PropTypes from 'prop-types';
import {
  BUDGET_QUERY,
  CATEGORIES_QUERY,
  LEDGER_QUERY,
  SUMMARY_QUERY,
} from 'queryKeys';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Error, Loader, Modal, NoContent } from 'ui';
import { CategoryField } from 'ui/molecules/CategoryField';
import { formatDollarsToCents } from 'utils';

const translationKeys = {
  income: 'wpływ',
  expense: 'wydatek',
};

export const AddNewLedgerRecordModal = ({ open, type, onClose }) => {
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
  } = useQuery({
    queryKey: [CATEGORIES_QUERY],
    queryFn: () => CategoryService.findAll(),
  });

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
    <Modal
      open={open}
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      title={`Dodaj ${translationKeys[type?.toLowerCase()]}`}
      disabled={!isValid}
    >
      {isLoading && <Loader />}
      {error && <Error error={error} />}
      {!isLoading && !error && !categories?.length ? (
        <NoContent />
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
            type="number"
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
            <Controller
              name="categoryId"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <CategoryField
                  margin={'normal'}
                  fullWidth
                  categories={categories}
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: 'Wybierz kategorię',
                },
              }}
            />
          )}
        </Box>
      )}
    </Modal>
  );
};

AddNewLedgerRecordModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  type: PropTypes.string,
};
