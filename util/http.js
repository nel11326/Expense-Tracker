import axios from "axios";

const baseURL =
  "https://react-native-expense-tra-212b6-default-rtdb.firebaseio.com/";

export function storeExpense(expenseData) {
  axios.post(`${baseURL}/expenses.json`, expenseData);
}
