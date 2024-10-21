export const generateShopId = () => {
  const prefix = "shop";
  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  return prefix + randomNumber;
};

export const generateUserId = () => {
  const prefix = "user";
  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  return prefix + randomNumber;
};
