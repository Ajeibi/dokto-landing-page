import { navItems } from "@/components/dashboard/nav-items";
import { AxiosError } from "axios";
import { type ClassValue, clsx } from "clsx";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Variant = "default" | "secondary";

export const displayErrorMessage = (
  errorData: AxiosError<any>,
  toastId?: string | number
) => {
  if (errorData.message === "Network Error") {
    toast.error("Please check your internet connection");
    return;
  }

  const { message } = errorData.response?.data || {};

  toast.error(capitalizeFirstLetter(message), {
    id: toastId ?? "",
  });
};

export const logout = () => {
  Cookies.remove("dokto-token");

  location.reload();
};

export const convertCurrency = (input: number) => {
  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  });

  return formatter?.format(input);
};

type BadgeVariants =
  | "success"
  | "warning"
  | "destructive"
  | "info"
  | "outline"
  | "secondary"
  | "default";

export const badgeColorMapper = (status: string): BadgeVariants => {
  switch (status) {
    case "successful":
    case "settled":
    case "active":
    case "assigned":
    case "approved":
      return "success";
    case "pending":
      return "info";
    case "failed":
    case "unassigned":
      return "destructive";
    default:
      return "default";
  }
};

export function getFirstLetter(string = "") {
  return string.charAt(0);
}

export function capitalizeFirstLetter(string = "") {
  string = String(string);

  return getFirstLetter(string)?.toUpperCase() + string.toLowerCase()?.slice(1);
}

export const getFullNameInitials = (fullName: string): string => {
  return (
    fullName
      .split(" ")
      .map((name) => name[0])
      .join("")
      .slice(0, 2) || "RV"
  );
};

export function splitAndCapitalize(string = "") {
  return string
    .split("_")
    .map((word) => capitalizeFirstLetter(word))
    .join(" ");
}

export function formatText(str: string, isStringed = false) {
  if (!str) return "--";
  const words = str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/_/g, " ")
    .replace(/\./g, " ")
    .replace(/-/g, " ")
    .split(" ");

  const newWords = words.map((x) => {
    return x.charAt(0).toUpperCase() + x.slice(1).toLowerCase();
  });

  return isStringed ? `"${newWords.join(" ")}"` : newWords.join(" ");
}

export function copyToClipboard(value: string) {
  navigator.clipboard.writeText(value);
}

export function formatAmount(amount: number) {
  const numericAmount = Number(amount);

  if (isNaN(numericAmount)) {
    return "Invalid Amount";
  }

  const formattedAmount = numericAmount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formattedAmount;
}

export function formatAmountWithCurrency(amount: number, currency: string) {
  const numFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return numFormat.format(amount);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  // Extract components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export function extractTime(dateString: string): string {
  const dateObj = new Date(dateString);
  const extractedTime = dateObj.toLocaleTimeString([], {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return extractedTime;
}

export function updateUrl(
  param: string,
  value: number | string,
  removeItems?: string[]
) {
  if (typeof window === "undefined") return "";

  const parsedUrl = new URL(window.location.href);

  parsedUrl.searchParams.set(param, value.toString());

  removeItems?.map((item) => {
    parsedUrl.searchParams.delete(item);
  });

  return parsedUrl.toString();
}

export const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function getAllDaysInMonth(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];

  for (let date = 1; date <= daysInMonth; date++) {
    const currentDate = new Date(year, month, date);
    const day = currentDate.toLocaleString("default", { weekday: "short" });
    days.push({ day, date: currentDate });
  }

  return days;
}

export function showSuccess(message: string) {
  toast.success(message);
}

export function parseAppointmentStep(step: string) {
  const currStep = parseInt(step);

  if (currStep < 0) {
    return 0;
  } else if (currStep > 6) {
    return 6;
  }

  return Math.ceil(currStep);
}

export function parseAppointmentTabs<T extends readonly string[]>(
  tabs: T,
  tab: string
): T[number] {
  if (tabs.includes(tab?.toLowerCase() as T[number])) {
    return tab.toLowerCase() as T[number];
  } else {
    return tabs[0];
  }
}

// export function parseTabs<T extends readonly string[]>(
//   tabs: T,
//   tab: string
// ): T[number] {
//   if (tabs.includes(tab?.toLowerCase() as T[number])) {
//     return tab.toLowerCase() as T[number];
//   } else {
//     return tabs[0];
//   }
// }

export function parseTabs<T extends readonly string[]>(
  tabs: T,
  tab: string
): T[number] {
  if (tabs.includes(tab as T[number])) {
    return tab as T[number];
  } else {
    return tabs[0];
  }
}

export function parseAppointmentFilterItems<T extends readonly string[]>(
  items: T,
  tab: string
): T[number] {
  if (items.includes(tab as T[number])) {
    return tab as T[number];
  } else {
    return items[0];
  }
}

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

export const formatTime = (time: string) => {
  let [hours, minutes] = time.split(":").map(Number);

  const suffix = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return `${hours}:${minutes.toString().padStart(2, "0")} ${suffix}`;
};

export const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) return "Good Morning";
  else if (currentHour < 18) return "Good Afternoon";
  return "Good Evening";
};

export const getAppointmentCounts = (appointments: any[]) => {
  const today = new Date().toDateString();

  const todayCount = appointments.filter(
    (appointment) => new Date(appointment.appointmentDate).toDateString() === today
  ).length;

  const upcomingCount = appointments.filter(
    (appointment) => new Date(appointment.appointmentDate) > new Date()
  ).length;

  const completedCount = appointments.filter(
    (appointment) => appointment.status === "COMPLETED"
  ).length;

  return { today: todayCount, upcoming: upcomingCount, completed: completedCount };
};

export const getCurrentPageName = (pathname: string) => {
  const currentItem = navItems.find((item) => pathname.includes(item.link));
  if (currentItem) return currentItem.label;
  if (pathname.includes("/dashboard/slot")) {
    return "Slot Management";
  }

  return "Dashboard";
};
