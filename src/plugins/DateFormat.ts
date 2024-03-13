import {format, parseISO} from 'date-fns';

export const formatDateString = (dateStr: string, dateFormat: string): string => {
    const date = parseISO(dateStr);
    return format(date, dateFormat);
}

