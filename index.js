import express from 'express'
import CookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import  connectDB from './config/db.js'
// import userRoutes from './routes/user.routes.js'
import userRoutes from './routes/userRouts.js'
import expenseRoutes from './routes/expense.route.js'


dotenv.config()
const app = express()
const PORT = process.env.PORT || 3001;
connectDB()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(CookieParser())

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/expense', expenseRoutes)

app.listen(PORT, (req,res) => {
    console.log(`Server is running on port ${PORT}`)
})


app.get('/home', (req,res) => {
    return res.status(200).json({
        message:"This is home page",
        success : true
    })
})