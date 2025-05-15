import { baseUrl } from "../constants";
const transactionsUrl = "collections/transactions/records";

export function getAllTransactionsForMonth(month, includeBudgetItems) {
  let startDate = new Date(month.getYear() + 1900, month.getMonth(), 1);
  console.log(startDate.toLocaleDateString("en-GB"));
  startDate = startDate.toLocaleDateString("en-GB").replaceAll("/", "-");
  let endDate = new Date(month.getYear() + 1900, month.getMonth() + 1, 0);
  endDate = endDate.toLocaleDateString("en-GB").replaceAll("/", "-");
  let query = `?filters=(transactions>=${startDate} && transactions<=${endDate})&skipTotal=true&perPage=100`;
  if (includeBudgetItems) {
    query += `&expand=category`;
  }

  return fetch(baseUrl + transactionsUrl + query);
}
