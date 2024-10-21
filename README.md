# expense-split




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