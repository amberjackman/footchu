export const getAnonymousUserId = () => {
  let userId = localStorage.getItem("anonymousUserId");
  if (!userId) {
    userId = `user_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem("anonymousUserId", userId);
  }
  return userId;
};
