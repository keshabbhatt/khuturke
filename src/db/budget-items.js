import db from "./db";

export function createBudgetItem(newBudgetItem) {
	return db.budgetItems.add(newBudgetItem);
}

export function getBudgetItemsByIds(ids) {
	return db.budgetItems.where("id").anyOf(ids).toArray();
}

export function getBudgetItemsByType(type) {
	return db.budgetItems.where("type").equals(type);
}

export function getAllBudgetItems() {
	return db.table("budgetItems").toArray();
}

export function updateBudgetItem(budgetItem) {
	return db.budgetItems.put(budgetItem);
}

export function deleteBudgetItem(budgetItemId) {
	return db.budgetItems.delete(budgetItemId);
}

export function getBudgetItemById(budgetItemId) {
	return db.budgetItems.get(budgetItemId);
}
