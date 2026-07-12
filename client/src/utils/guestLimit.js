const FREE_LIMIT = 30;

export const getGuestSearchCount = () => {
  return Number(localStorage.getItem("guestSearchCount") || 0);
};

export const incrementGuestSearchCount = () => {
  const count = getGuestSearchCount() + 1;
  localStorage.setItem("guestSearchCount", count);
  return count;
};

export const hasReachedGuestLimit = () => {
  return getGuestSearchCount() >= FREE_LIMIT;
};

export const getRemainingGuestSearches = () => {
  return Math.max(0, FREE_LIMIT - getGuestSearchCount());
};

export const resetGuestSearchCount = () => {
  localStorage.removeItem("guestSearchCount");
};