import { StyleSheet, View, Text, Alert } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";

function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, defaultValues }) {
  const [inputValue, setInputValue] = useState({
    amount: defaultValues ? defaultValues.amount.toString() : "",
    date: defaultValues ? getFormattedDate(defaultValues.date) : "",
    description: defaultValues ? defaultValues.description : "",
  });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputValue((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  function onSubmitHandler() {
    const expenseData = {
      amount: +inputValue.amount,
      date: new Date(inputValue.date),
      description: inputValue.description,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      Alert.alert("Invalid input", "Please check your input values");
      return;
    }

    onSubmit(expenseData);
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputValue.amount,
          }}
        />
        <Input
          style={styles.rowInput}
          label="date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputValue.date,
          }}
        />
      </View>
      <Input
        label="description"
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputValue.description,
          // autoCorrect: false,
          // autoCapitalize: "none",
        }}
      />
      <View style={styles.buttons}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={onSubmitHandler} style={styles.button}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
    marginVertical: 2,
  },
});
