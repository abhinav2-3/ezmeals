export const generateShopId = () => {
  const prefix = "SHOP";
  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  return prefix + randomNumber;
};

export const generateUserId = () => {
  const prefix = "USER";
  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  return prefix + randomNumber;
};
