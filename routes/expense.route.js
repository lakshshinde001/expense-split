import express from 'express'

import { addExpense, getExpenses, getExpense, getUserOverallExpense } from '../controllers/expense.controller.js'

const router = express.Router();

router.route('/addexpense').post(addExpense);
router.route('/getexpenses').get(getExpenses);
router.route('/getexpense/participant').get(getExpense);
router.route('/getoveralluserexpense').get(getUserOverallExpense);

export default router;
