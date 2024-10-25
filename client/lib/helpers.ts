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

export function formatDate(dateString: string | undefined): string {
  const date = new Date(dateString!);
  const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if needed
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
