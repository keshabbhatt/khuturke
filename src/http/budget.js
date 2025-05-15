import { baseUrl } from "../constants";
const budgetItemsUrl = "collections/budget_items/records";

export function createBudgetItem(budgetItem) {
  return fetch(baseUrl + budgetItemsUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(budgetItem),
  });
}

export function editBudgetItem(budgetItem) {
  return fetch(baseUrl + budgetItemsUrl + `/${budgetItem.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(budgetItem),
  });
}

export function deleteBudgetItem(budgetItemId) {
  return fetch(baseUrl + budgetItemsUrl + `/${budgetItemId}`, {
    method: "DELETE",
  });
}

export function getAllBudgetItemsForMonth(month, includeTransactions) {
  let startDate = new Date(month.getYear() + 1900, month.getMonth(), 1);
  startDate = startDate.toLocaleDateString("en-GB").replaceAll("/", "-");
  let endDate = new Date(month.getYear() + 1900, month.getMonth() + 1, 0);
  endDate = endDate.toLocaleDateString("en-GB").replaceAll("/", "-");
  let query = `?filters=(created>=${startDate} && created<=${endDate})&skipTotal=true&perPage=100`;

  if (includeTransactions) {
    query += "&expand=transactions";
  }

  return fetch(baseUrl + budgetItemsUrl + query);
}
