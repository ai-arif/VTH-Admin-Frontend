// Format date function
export const formatDate = (dateString) => {
  // FIRST TIME CHANGE
  // const options = { weekday: "long", month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric", hour12: true };
  // return new Date(dateString).toLocaleString("en-US", options);

  // SECOND TIME CHANGE
  // const date = new Date(dateString);
  // const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000); // Convert UTC to local time
  // const options = {
  //   weekday: "long",
  //   month: "long",
  //   day: "numeric",
  //   year: "numeric",
  //   hour: "numeric",
  //   minute: "numeric",
  //   hour12: true,
  // };
  // return localDate.toLocaleString("en-US", options);

  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  const localDate = new Date(dateString).toLocaleDateString(undefined, options);

  return localDate;
};
