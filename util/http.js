import axios from "axios";

const baseURL =
  "https://react-native-expense-tra-212b6-default-rtdb.firebaseio.com/";

export async function storeExpense(expenseData) {
  const response = await axios.post(`${baseURL}/expenses.json`, expenseData);
  const id = response.data.name;
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(`${baseURL}/expenses.json`);

  const expenses = [];

  for (const key in response.data) {
    const expenseData = response.data[key];
    const expenseObj = {
      id: key,
      amount: expenseData.amount,
      date: new Date(expenseData.date),
      description: expenseData.description,
    };
    expenses.push(expenseObj);
  }
  return expenses;
}

export function updateExpense(id, expenseData) {
  return axios.put(`${baseURL}/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
  return axios.delete(`${baseURL}/expenses/${id}.json`);
}
