// utils.js

// Utility function to format numbers as RS (Nepali Rupees)
export const formatCurrencyRS = (amount) => {
	// Check if the amount is a number and not NaN
	if (isNaN(amount)) return 'RS 0'; // Return RS 0 if the amount is not a number.
	
	// Format the number as RS followed by the amount, with commas as thousand separators
	return `RS ${Number(amount).toLocaleString()}`;
  };
  
  // Group by function (unchanged)
  export const groupBy = function (data, key) {
	return data.reduce(function (storage, item) {
	  var group = item[key];
	
	  storage[group] = storage[group] || [];
	  storage[group].push(item);
	
	  return storage;
	}, {});
  };
  
  // Get total expense (with currency formatting using RS symbol)
  export const getTotalExpense = (transactions) => {
	return transactions
	  .filter((transaction) => transaction.type === "expense")
	  .reduce((acc, curr) => acc + parseInt(curr.amount), 0);
  };
  
  // Get total income (with currency formatting using RS symbol)
  export const getTotalIncome = (transactions) => {
	return transactions
	  .filter((transaction) => transaction.type === "income")
	  .reduce((acc, curr) => acc + parseInt(curr.amount), 0);
  };
  
  // Get current month formatted as 'yyyy-mm'
  export const getMonth = (date) => {
	let currentMonth = date.getMonth() + 1;
	currentMonth = currentMonth < 10 ? "0" + currentMonth : currentMonth;
	return date.getFullYear() + "-" + currentMonth;
  };
  