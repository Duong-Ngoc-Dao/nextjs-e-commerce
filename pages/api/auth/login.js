import connectDb from "../../../utils/connectDB";
import Users from "../../../models/userModel";
import bcrypt from 'bcrypt'; 
import {createAccessToken, createRefreshToken} from '../../../utils/generateToken'

connectDb()

export default async (req, res) => {
    switch(req.method){
        case "POST":
            await login(req, res)
            break;
    }
}

const login = async (req,res) => {
    try{
        const{  email, password } = req.body
        

        const user = await Users.findOne({ email })
        if(!user) return res.status(400).json({err: 'Tai khoan khong chinh xac!'})

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch) return res.status(400).json({err: 'Mat khau khong chinh xac!'})

        const access_token = createAccessToken({id: user._id})
        const refresh_token = createRefreshToken({id: user._id})

        res.json({
            msg: "Dang nhap thanh cong!",
            refresh_token,
            access_token,
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
                root: user.root
            }
        })
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}

