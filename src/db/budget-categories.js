import db from "./db";

export function createBudgetCategory(newBudgetCategory) {
	return db.bugetCategories.add(newBudgetCategory);
}

export function getBudgetCategoriesByIds(ids) {
	return db.bugetCategories.where("id").anyOf(ids).toArray();
}

export function getBudgetCategoriesByType(type) {
	return db.bugetCategories.where("type").equals(type);
}

export function getAllBudgetCategories() {
	return db.table("bugetCategories").toArray();
}

export function updateBudgetCategory(budgetCategory) {
	return db.bugetCategories.put(budgetCategory);
}

export function deleteBudgetCategory(budgetCategoryId) {
	return db.bugetCategories.delete(budgetCategoryId);
}

export function getBudgetCategoryById(budgetCategoryId) {
	return db.bugetCategories.get(budgetCategoryId);
}
