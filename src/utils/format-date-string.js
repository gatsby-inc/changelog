export const formatDateString = (dateString) =>
  new Date(dateString).toLocaleString('default', { month: '2-digit', year: '2-digit' });
