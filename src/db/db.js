import Dexie from "dexie";

export const db = new Dexie("expense-tracker");
db.version(11).stores({
	transactions: "++id, date, amount, category, type",
	budgetItems: "++id, amount, category, budget",
	bugetCategories: "++id, name, type",
	budgets: "++id, name, income, expense",
	notes: "++id, content, updatedAt, title",
	habits: "++id, name",
	habitEntries: "++id, habit, date"
});

export default db;
