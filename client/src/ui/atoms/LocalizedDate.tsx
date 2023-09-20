// eslint-disable-next-line no-unused-vars
import { getBrowserLocales } from 'utils';

type LocalizedDateProps = {
  date: string;
};

export const LocalizedDate = ({ date: rawDate }: LocalizedDateProps) => {
  const browserLocale = getBrowserLocales();
  return (
    <>
      {new Date(rawDate).toLocaleString(
        browserLocale ? browserLocale[0] : 'en-GB',
      )}
    </>
  );
};
