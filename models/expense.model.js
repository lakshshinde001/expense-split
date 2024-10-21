import mongoose  from "mongoose";

const expenseSchema = new mongoose.Schema({
    description : String,
    totalAmount : Number, 
    splitMethod : {
        type : String, 
        enum : [
            'equal',
            'exact',
            'percentage'
        ]
    },
    participants : [
        {
            name : String,
            //When the participant is a registered user we are referring to them in current user
            // we can give id of the user in post request 
            userId : {
                type : mongoose.Schema.Types.ObjectId, ref : 'User',
                required : false
            },
            amount : Number,
            percentage: Number 
        }
    ],
    createdAt : {
        type : Date,
        default : Date.now
    }
});

export const Expense = mongoose.model('Expense', expenseSchema);
// export const User = mongoose.model('User', userSchema)