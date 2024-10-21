import { User } from "../models/user.model.js";
import  bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {
    try {
        const {name, email, phoneNumber, password} = req.body;

        if(!name || !email || !phoneNumber) {
            return res.status(400).json({
                message: "Please fill in all fields",
                success : false
            })
        }

        const user = await User.findOne({email});

        if(user){
            return res.status(400).json({
                message: "user already exists",
                success : false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name,
            email,
            phoneNumber,
            password: hashedPassword
        });
        return res.status(200).json({
            message: "User created successfully",
            success : true
        })

    } catch (error) {
        console.log(error)
    }
}

export const loginUser = async (req,res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({
                message : "Enter all fields",
                success : false
            })
        };

        let user = await User.findOne({email})

        if(!user) {
            return res.status(400).json({
                message: "Incorrect Email or password",
                success : false
            })
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };

        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });
        user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
        }
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.name}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getUserDetails = async (req,res) => {
    const { userId } = req.query;

  // Validate if userId is provided
  if (!userId) {
    return res.status(400).json({ error: 'Please provide userId' });
  }

  try {
    // Find the user by userId
    const user = await User.findById(userId);

    // If the user is not found, return an error
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return user details (name, email, mobile)
    res.json({
      name: user.name,
      email: user.email,
      mobile: user.mobile
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


export const getAllUsers = async (req, res) => {
    try {
        // Find all users from the database
        const users = await User.find({}, 'name email mobile'); // Select only name, email, and mobile fields
    
        // If no users are found, return an empty array
        if (users.length === 0) {
          return res.json({ message: 'No users found' });
        }
    
        // Return the list of all users
        res.json(users);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}