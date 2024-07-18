import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const hoursToSubtract = 6;
  const timeZone = "Asia/Dhaka"; // Specify the timezone for Dhaka, Bangladesh
  const zonedDate = toZonedTime(date, timeZone, `UTC${-hoursToSubtract}`);

  // Format the date and time as "Jul 18, 2024, 1:00 PM"
  const formattedDate = format(zonedDate, "MMM d, yyyy, h:mm a");

  return formattedDate;
};
