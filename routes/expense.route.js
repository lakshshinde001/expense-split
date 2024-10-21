import express from 'express'

import { addExpense, getExpense } from '../controllers/expense.controller.js'

const router = express.Router();

router.route('/addexpense').post(addExpense);
router.route('/getexpense').get(getExpense);

export default router;
