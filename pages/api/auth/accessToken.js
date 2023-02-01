import connectDb from "../../../utils/connectDB";
import Users from "../../../models/userModel";
import { jwt } from "jsonwebtoken";
import { createAccessToken } from '../../../utils/generateToken';

connectDb()

export default async (req, res) => {
    try {
        const rf_token = req.cookies.refreshToken;
        if (!rf_token) return res.status(400).json({ err: 'Vui long dang nhap !' })

        const result = jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET)
        if (!result) return res.status(400).json({ err: 'Ma truy cap cua ban khong chinh xac hoac da het han truy cap.' })


        const user = await Users.findById(result.id)
        if(!user) return res.status(400).json({err: 'nguoi dung khong ton tai.'})

        const access_token = createAccessToken({id: user_id})

        res.json({
            access_token,
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
                root: user.root
            }
        })
    } catch(err) {
        return res.status(500).json({err: err.message})
    }
}

