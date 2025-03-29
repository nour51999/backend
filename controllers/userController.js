import {StatusCodes} from'http-status-codes';
import job from '../models/jobModel.js';
import User from'../models/UserModel.js';

export const getCurrentUser= async(req,res)=>{
    const user = await User.findOne({
        _id:req.user.userID
    })
    const userWithoutPassword=user.toJSON()
res.status(StatusCodes.OK).json({user:userWithoutPassword})
}
// export const getApplicationStats=async(req,res)=>{
//     const user=await user.countDocument()
//     const jobs=await user.countDocument()
//     res.status(StatusCode)

// }

export const getApplicationStats = async (req, res) => {
    try {
        const usersCount = await User.countDocuments();
        const jobsCount = await Job.countDocuments();

        res.status(StatusCodes.OK).json({ usersCount, jobsCount });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};
export const updateUser=async(req,res)=>{
    const updateUser=await User.findByIdAndUpdate(req,res.user,userID,req.body)
    res.status(StatusCode.OK).json({
        message:'user updates'
    })
    
}

