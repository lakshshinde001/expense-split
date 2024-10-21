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

export const getExpenses = async (req, res) => {
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


export const getExpense = async (req, res) => {
    const { userId, name } = req.query;
  
  if (!userId && !name) {
    return res.status(400).json({ error: 'Please provide either userId or name' });
  }
  
  let filter = {};
  if (userId) {
    filter = { "participants.userId": userId };
  } else if (name) {
    filter = { "participants.name": name };
  }

  try {
    const expenses = await Expense.find(filter);
    const participantExpenses = expenses.map(expense => {
      // Find the participant details in the expense
      const participant = expense.participants.find(p => 
        (userId && p.userId == userId) || (name && p.name === name)
      );
      return {
        description: expense.description,
        totalAmount: expense.totalAmount,
        splitMethod: expense.splitMethod,
        participantAmount: participant.amount, // The amount the participant owes
        percentage: participant.percentage || null, // Only for percentage split
        createdAt: expense.createdAt
      };
    });
    
    res.json(participantExpenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
} 

export const getUserOverallExpense = async (req,res) => {
    const { userId } = req.query;

  // Validate if userId is provided
  if (!userId) {
    return res.status(400).json({ error: 'Please provide userId' });
  }

  try {
    // Find all expenses where the user is a participant
    const expenses = await Expense.find({ "participants.userId": userId });

    // If no expenses are found, return 0
    if (expenses.length === 0) {
      return res.json({ userId, overallExpense: 0 });
    }

    // Calculate the total amount the user is responsible for across all expenses
    const overallExpense = expenses.reduce((total, expense) => {
      const participant = expense.participants.find(p => p.userId == userId);
      return total + participant.amount;
    }, 0);

    // Return the userId and overall expense
    res.json({ userId, overallExpense });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}