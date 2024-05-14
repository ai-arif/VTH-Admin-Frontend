// Format date function
export const formatDate = (dateString) => {
  const options = { weekday: "long", month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric", hour12: true };
  return new Date(dateString).toLocaleString("en-US", options);
};
