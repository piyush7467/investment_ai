const FREE_LIMIT = 5;
const FREE_CHAT_LIMIT = 5;

// Helper to check and reset if the day has changed
const checkDailyReset = () => {
  const today = new Date().toDateString();
  const storedDate = localStorage.getItem("guestUsageDate");

  if (storedDate !== today) {
    localStorage.setItem("guestUsageDate", today);
    localStorage.setItem("guestSearchCount", "0");
    localStorage.setItem("guestChatCount", "0");
  }
};

export const getGuestSearchCount = () => {
  checkDailyReset();
  return Number(localStorage.getItem("guestSearchCount") || 0);
};

export const incrementGuestSearch = () => {
  checkDailyReset();
  const count = getGuestSearchCount() + 1;
  localStorage.setItem("guestSearchCount", count);
  return count;
};

export const getRemainingSearches = () => {
  return Math.max(0, FREE_LIMIT - getGuestSearchCount());
};

export const hasReachedLimit = () => {
  return getGuestSearchCount() >= FREE_LIMIT;
};

export const getGuestChatCount = () => {
  checkDailyReset();
  return Number(localStorage.getItem("guestChatCount") || 0);
};

export const incrementGuestChat = () => {
  checkDailyReset();
  const count = getGuestChatCount() + 1;
  localStorage.setItem("guestChatCount", count);
  return count;
};

export const getRemainingChats = () => {
  return Math.max(0, FREE_CHAT_LIMIT - getGuestChatCount());
};

export const hasReachedChatLimit = () => {
  return getGuestChatCount() >= FREE_CHAT_LIMIT;
};

export const resetGuestUsage = () => {
  localStorage.removeItem("guestSearchCount");
  localStorage.removeItem("guestChatCount");
  localStorage.removeItem("guestUsageDate");
};