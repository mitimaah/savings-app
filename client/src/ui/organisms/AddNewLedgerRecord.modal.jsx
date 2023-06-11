import BasicModal from 'ui/molecules/Modal';

const AddNewLedgerRecord = ({ open, type, onClose, onSubmit }) => {
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
      onSubmit={onSubmit}
      description={modalHeader(type)}
    />
  );
};

export default AddNewLedgerRecord;
