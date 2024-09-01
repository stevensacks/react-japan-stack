import {pick} from 'accept-language-parser';
import {set} from 'date-fns';
import {LANGUAGES} from '~/languages';

export const getLanguage = (request: Request) =>
  pick(LANGUAGES, request.headers.get('Accept-Language') ?? 'en') ?? 'en';

const base = set(new Date(), {
  date: 1,
  hours: 12,
  milliseconds: 0,
  minutes: 0,
  month: 0,
  seconds: 0,
  year: new Date().getFullYear() + 1,
});

type DateValues = Parameters<typeof set>[1];

const date = (values?: DateValues): Date => (values ? set(base, values) : base);

export default date;
