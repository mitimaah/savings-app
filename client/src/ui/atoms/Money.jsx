import { formatCentsToDollars } from 'utils';

export const Money = ({ inCents}) => {
  return (
    <>
      {formatCentsToDollars(inCents)} PLN
    </>
  );
};
