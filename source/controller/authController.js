import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient();

export const Register = async (req,res) => {
    const {email , password, name } = req.body;
    try {
        const existingUser = await prisma.User.findUnique({
            where : {email}
        })

        if (existingUser) return res.status(400).json({message : "User Already Exist"})
        const HashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.User.create(
             { data : {email , name, password : HashedPassword}
        });
        console.log(user)
        req.session.user = {
            id : user.userid,
            email : user.email,
            name : user.name
        }
        res.status(200).json({message : 'User Created', user :{ id:user.userid, email: user.email}});
    } catch (err) {
        res.status(500).json({message : 'Server Error'})
    }
    
}

export const Login = async (req,res) => {
    const {email, password} = req.body;
    console.log(email)
    try {
        const user = await prisma.User.findUnique({
            where : {email}
        });
        if(!user) res.status(400).json({message : "No user Found"});
        const valid = await bcrypt.compare(password, user.password)
        if(!valid) res.status(400).json({message : "Invalid Credentials"})
        req.session.user = {
            id : user.userid,
            email : user.email,
            name : user.name
        }
        res.status(200).json({message: 'Logged In'})
    }
    catch (err) {
        console.error('Login error:', err);
    
        // This won't get called unless an error occurs before res was sent
        if (!res.headersSent) {
          res.status(500).json({ message: 'Server Error' });
        }
    }
}

export const Logout = async (req,res) => {
    const userSession = req.session.user
    console.log('Session:', req.session);
    console.log('Logged in user:', req.session.user);
    if(!userSession) {
            res.status(400).json({message : "Not Logged In Yet"})
    } else {
        req.session.destroy((err) => {
        if(err) return res.status(500).json({message: "Logout Failed"})
        res.clearCookie('connect.sid')
        res.status(200).json({message:"Logout Success"})
        })
    }
   
}