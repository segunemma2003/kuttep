import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export const convertTime  = (time) => {
  const date = new Date(time);
  const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString}`;
  return formattedDate;
}

export const shortenAddress = (address) => {
 return `${address?.slice(0,4)}...${address?.slice(address.length - 4)}`;
}

export function timeAgo(timestamp) {
  const now = new Date();
  const timeDifference = now - new Date(timestamp); // Difference in milliseconds

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days < 7) {
    return `${days} days ago`;
  } else if (weeks < 5) {
    return `${weeks} weeks ago`;
  } else if (months < 12) {
    return `${months} months ago`;
  } else {
    return `${years} years ago`;
  }
}


export function formatNumberWithCommas(number) {
  if (typeof number !== 'number' || isNaN(number)) {
    return '';  // Return an empty string or a suitable fallback if input is not a valid number
  }
  
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}