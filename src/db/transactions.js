import db from "./db";

export function getTransactionsByMonthYear(month, year) {
	console.log(parseInt(month), parseInt(year));
	month = parseInt(month);
	year = parseInt(year);
	let monthStart = new Date(year, month - 1, 1);
	let monthEnd = new Date(year, month, 1);

	console.log(monthStart.toString(), monthEnd);

	return db.transactions
		.where("date")
		.between(monthStart, monthEnd, true, true)
		.toArray();
}

export function createTransaction(newTransaction) {
	return db.transactions.add(newTransaction);
}

export function editTransaction(transaction) {
	return db.transactions.put(transaction);
}

export function deleteTransaction(transactionId) {
	return db.transactions.delete(transactionId);
}

export function getTransaactionById(transactionId) {
	return db.transactions.get({ id: transactionId });
}
