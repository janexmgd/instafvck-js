export const epochConverter = (epoch) => {
  const date = new Date(epoch * 1000);
  const options = { day: '2-digit', month: 'long', year: 'numeric' };
  const timestamp = date.toLocaleDateString('en-US', options);
  return timestamp;
};
export const msConverter = (ms) => {
  const time = (parseFloat(ms) * 1000) / 1000;
  const data = `${time} second`;
  return data;
};
export const epochNow = () => {
  const now = new Date();
  return now.getTime();
};
