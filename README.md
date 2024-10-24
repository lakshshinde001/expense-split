

Daily Expenses Sharing Application

This is the backend service for a Daily Expenses Sharing Application. The application allows users to add expenses and split them based on three methods: equal splits, exact amounts, and percentages. Users can manage expenses, view their total expenditures, and download a balance sheet in Excel format.

Features

User Management: Register and retrieve user details.
Expense Management: Add and manage expenses, split across participants using equal, exact, or percentage methods.
Balance Sheet: Generate a balance sheet of expenses and download it as an Excel file.

Requirements
Ensure you have the following installed on your machine:

Node.js (v14 or higher)
MongoDB (local instance or MongoDB Atlas)
npm (comes with Node.js)

Installation
1. Clone the Repository
git clone https://github.com/yourusername/expenses-sharing-app.git
cd expenses-sharing-app

2. Install Dependencies
Run the following command to install the required npm packages:
npm install

3. Set Up Environment Variables
Create a .env file in the root of your project and add the following environment variables:
MONGO_URI=mongodb://localhost:27017/expensesdb  # Change to your MongoDB connection string
PORT=5000  # Specify the port the app will run on

4. Running the Application
You can start the application using:
npm run dev


For the API-End Points please refer following file 
Make Sure you do login and get authorized to hit apiend points. 

https://docs.google.com/document/d/1ia_kdmOGNQAX4m9W4_2J2MUuFwzah9ych4YGPX6Mu6Q/edit?usp=sharing


Thanks,
Laxman Shinde 
https://www.linkedin.com/in/laxman-shinde-2aa221235/
