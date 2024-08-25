import axios from "axios";

const baseURL =
  "https://react-native-expense-tra-212b6-default-rtdb.firebaseio.com/";

export function storeExpense(expenseData) {
  axios.post(`${baseURL}/expenses.json`, expenseData);
}

export async function fetchExpenses() {
  const response = await axios.get(`${baseURL}/expenses.json`);

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }
  return expenses;
}
