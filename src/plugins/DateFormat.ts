import {format, parseISO} from 'date-fns';

/**
 * 格式化日期
 * @param dateStr
 * @param dateFormat
 */
export const formatDateString = (dateStr: string, dateFormat: string): string => {
    const date = parseISO(dateStr);
    return format(date, dateFormat);
}


