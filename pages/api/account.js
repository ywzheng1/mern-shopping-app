import User from '../../models/User';
import jwt from 'jsonwebtoken';
import connectDb from '../../utils/connectDb';

connectDb()

export default async (req, res) => {
    if(!("authorization" in req.headers)) {
        return res.status(401).send("Not authorization token")
    }

    try {
        const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: userId })
        if(user) {
            res.status(200).json(user)
        } else {
            res.status(404).send("user not round")
        }
    } catch(error) {
        res.status(403).send("Invalid token")
    }
}