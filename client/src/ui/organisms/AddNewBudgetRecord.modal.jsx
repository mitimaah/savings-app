import BasicModal from 'ui/molecules/Modal';

const AddNewBudgetRecord = ({ open, onClose, onSubmit }) => {
  return (
    <BasicModal
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      description={'Zdefiniuj budżet'}
    />
  );
};

export default AddNewBudgetRecord;
