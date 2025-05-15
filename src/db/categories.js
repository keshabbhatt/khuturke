import db from "./db";

export function getAllCategories() {
	return db.categories.get().toArray();
}

export function createCategory(category) {
	return db.categories.add(category);
}

export function editCategory(category) {
	return db.categories.put(category);
}

export function deleteCategory(categoryId) {
	return db.categories.delete(categoryId);
}
