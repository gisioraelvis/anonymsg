//Sort messages in asceding order of the latest
export const sortByDate = (obj) => {
  const sortedObj = obj.sort((a, b) => {
    let dateA = new Date(a.date);
    let dateB = new Date(b.date);
    return dateB - dateA;
  });
  return sortedObj;
};

//Given a date string return time in '14 Sep, 3:21 AM' format
export const formatDate = (date) => {
  const newDate = new Date(date);
  const options = {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    year: "numeric",
  };
  return newDate.toLocaleTimeString("en-US", options);
};
