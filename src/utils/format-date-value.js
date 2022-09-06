export const formatDateValue = (dateString) => {
  const date = new Date(dateString).toLocaleString('default', { month: '2-digit', year: '2-digit' }).split('/');

  return {
    m: date[0],
    y: date[1]
  };
};
