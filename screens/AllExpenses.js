import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-contex";

function AllExpenses() {
  const expensesCTX = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      expenses={expensesCTX.expenses}
      expensesPeriod="Total"
      fallbackText="No expenses registered."
    />
  );
}

export default AllExpenses;
