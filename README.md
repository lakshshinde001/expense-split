# expense-split


JSON Request for user register 
Api-end-point = http://localhost:3000/api/v1/user/register
{
    "name" : "john",
    "email" : "john@gmail.com",
    "phoneNumber" : 1234567890,
    "password" : "password"
}


Post requests for adding expenses using name 
1)  #post request for adding expense with exact amount : 
{
    "description" : "chai bill",
    "totalAmount" : 3000,
    "participants" : [
        {
            "name" : "Alice",
            "amount" : 500

        }, {
            "name" : "Bob",
            "amount" : 1000
        }, {
            "name" : "John",
            "amount" : 1500
        }
    ],
    "splitMethod" : "exact"
}

2) Post request for adding expense with equal splitting 
{
    "description" : "Party Hard",
    "totalAmount" : 6000,
    "participants" : [
        {
            "name" : "laxman"
        }, {
            "name" : "akhilesh"
        }, {
            "name" : "vaibhav"
        }
    ],
    "splitMethod" : "equal"
}
3) Post request for adding expense with percentage of splitting 
{
    "description": "Party Hard",
    "totalAmount": 6000,
    "splitMethod": "percentage",
    "participants": [
        {
            "name": "laxman",
            "amount": 3000,
            "percentage": 50,
            "_id": "6716532b3b4ff852af0629a0"
        },
        {
            "name": "akhilesh",
            "amount": 1800,
            "percentage": 30,
            "_id": "6716532b3b4ff852af0629a1"
        },
        {
            "name": "vaibhav",
            "amount": 1200,
            "percentage": 20,
            "_id": "6716532b3b4ff852af0629a2"
        }
    ],
    "_id": "6716532b3b4ff852af06299f",
    "createdAt": "2024-10-21T13:12:11.956Z",
    "__v": 0
}
-> Post request body for adding expense using userID
{
    "description" : "31st Party",
    "totalAmount" : 3000,
    "participants" : [
        {
            "userId": "6715fc800d1483a90e35ec93",
            "amount" : 500

        }, {
            "userId" : "6716594ad5dc907ba42206ad",
            "amount" : 1000
        }, {
            "name" : "John",
            "amount" : 1500
        }
    ],
    "splitMethod" : "equal"
}



Get request for getting individual expense amount 
1) Using Participant Name : 
Api EndPoint - http://localhost:3000/api/v1/expense/getexpense/participant?name=laxman

2) Using User Id : 
Api EndPoint - http://localhost:3000/api/v1/expense/getexpense/participant?userId=6715fc800d1483a90e35ec93

--> Get request for getting overall expense 
http://localhost:3000/api/v1/expense/getoveralluserexpense?userId=6715fc800d1483a90e35ec93

-> Get request for getting user details (Individual)
http://localhost:3000/api/v1/user/getuserdetails?userId=6715fc800d1483a90e35ec93

-> Get All users 
http://localhost:3000/api/v1/user/getallusers

