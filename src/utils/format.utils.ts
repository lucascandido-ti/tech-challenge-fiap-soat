import { format as dateFnsFormat } from 'date-fns';

export function formatDate(date: Date | string, format = 'dd/MM/yyyy') {
  const parsedDate = date instanceof Date ? date : new Date(date);

  return dateFnsFormat(parsedDate, format);
}

export function formatDateTime(date: Date | string) {
  return formatDate(date, 'dd/MM/yyyy HH:mm:ss');
}
