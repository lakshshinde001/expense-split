import express from 'express'

import { addExpense, getExpenses, getExpense, getUserOverallExpense, downloadBalanceSheet } from '../controllers/expense.controller.js'
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.route('/addexpense').post(isAuthenticated, addExpense);
router.route('/getexpenses').get(getExpenses);
router.route('/getexpense/participant').get(getExpense);
router.route('/getoveralluserexpense').get(isAuthenticated, getUserOverallExpense);
router.route('/download-balance-sheet').get(isAuthenticated, downloadBalanceSheet);

export default router;
