export const timeConverter = (epoch) => {
  const date = new Date(epoch * 1000);
  const options = { day: '2-digit', month: 'long', year: 'numeric' };
  const timestamp = date.toLocaleDateString('en-US', options);
  return timestamp;
};
