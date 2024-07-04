export const getCsvFileName = (): string => {
  const currentDate = new Date();
  // Get the time zone offset in minutes, and convert it to hours and minutes
  const offset = -currentDate.getTimezoneOffset();
  const offsetHours = Math.floor(Math.abs(offset) / 60);
  const offsetMinutes = Math.abs(offset) % 60;
  // Format the offset to a string with a leading plus or minus and leading zeros
  const formattedOffset = `${offset >= 0 ? '+' : '-'}${offsetHours.toString().padStart(2, '0')}:${offsetMinutes.toString().padStart(2, '0')}`;
  // Format the date and time including the time zone offset
  const formattedDate =
    currentDate.toISOString().replace(/:/g, '-').replace(/\..+/, '') +
    formattedOffset;
  return `data-${formattedDate}.csv`;
};
