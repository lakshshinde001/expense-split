import {Expense} from '../models/expense.model.js'

export const addExpense = async (req, res) => {
  const { description, totalAmount, splitMethod, participants } = req.body;

  if (splitMethod === "equal") {
    const perPersonAmount = totalAmount / participants.length;
    participants.forEach((p) => (p.amount = perPersonAmount));
  } else if (splitMethod === "percentage") {
    const totalPercentage = participants.reduce(
      (sum, p) => sum + (p.percentage || 0),
      0
    );
    if (totalPercentage !== 100) {
      return res.status(400).json({ error: "Percentages must add up to 100%" });
    }
    participants.forEach(
      (p) => (p.amount = (p.percentage / 100) * totalAmount)
    );
  } else if (splitMethod === "exact") {
    const totalExact = participants.reduce((sum, p) => sum + p.amount, 0);
    if (totalExact !== totalAmount) {
      return res
        .status(400)
        .json({ error: "Exact amounts must add up to the total amount" });
    }
  }

  try {
    const expense = new Expense({
      description,
      totalAmount,
      splitMethod,
      participants,
    });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getExpense = async (req, res) => {
    const { userId, name } = req.query;
  
  let filter = {};
  if (userId) {
    filter = { "participants.userId": userId };
  } else if (name) {
    filter = { "participants.name": name };
  }

  try {
    const expenses = await Expense.find(filter);
    res.json(expenses);
  } catch (error) {
    res.status(404).json({ error: 'No expenses found' });
  } 
}
