import express from 'express'

import { addExpense, getExpenses, getExpense, getUserOverallExpense, downloadBalanceSheet } from '../controllers/expense.controller.js'

const router = express.Router();

router.route('/addexpense').post(addExpense);
router.route('/getexpenses').get(getExpenses);
router.route('/getexpense/participant').get(getExpense);
router.route('/getoveralluserexpense').get(getUserOverallExpense);
router.route('/download-balance-sheet').get(downloadBalanceSheet);

export default router;
