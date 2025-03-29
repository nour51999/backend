import { body ,param ,  validationResult} from 'express-validator';
import { BadRequestError , NotFoundError, UnauthenticatedError, UnauthorizedError} from '../errors/customErrors.js';
import { JOB_STATUS,JOB_TYPE } from '../utils/constants.js';
import mongoose from 'mongoose';
import Job from '../models/jobModel.js'
import User from '../models/UserModel.js'


const withValidationErrors = (validateValues) => {
    return [
      validateValues,
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          const errorMessages = errors.array().map((error) => error.msg);
          if (errorMessages[0].startsWith('no job')) {
            throw new NotFoundError(errorMessages);
          }
          if (errorMessages[0].startsWith('not autorized')) {
            throw new UnauthorizedError(errorMessages);
          }
          
          throw new BadRequestError(errorMessages);
        }
        next();
      },
    ];
};
  
export const validateJobInput = withValidationErrors([
  body('company').notEmpty().withMessage('company is required'),
  body('position').notEmpty().withMessage('position is required'),
  body('jobLocation').notEmpty().withMessage('job location is required'),
  body('jobStatus')
    .isIn(Object.values(JOB_STATUS))
    .withMessage('invalid status value'),
  body('jobType').isIn(Object.values(JOB_TYPE)).withMessage('invalid job type'),
]);

export const validateIdParam = withValidationErrors([
  param('id').custom(async (value) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError('invalid MongoDB id');
    const job = await Job.findById(value);
    if (!job) throw new NotFoundError(`no job with id : ${value}`);
    const isadmin=req.unse.role=== 'admin'
    const isOwner=req.user.userID === job.createdBy.tostring();
    if(!isAdmin && !isOwner)
    throw new UnauthenticatedError ("not autorized to acess this route")
  }),
]);

export const validateRegisterInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError('email already exists');
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 characters long'),
  body('location').notEmpty().withMessage('location is required'),
  body('lastName').notEmpty().withMessage('last name is required'),
]);

export const validateLoginInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format'),
  body('password').notEmpty().withMessage('password is required'),
]);
export const validateUpdateUserInput = withValidationErrors((
  body('name').notEmpty().withMessage('name is required'),
  body('email').notEmpty().withMessage('email is required').isEmail().withMessage('invalide email format').custom(async(email,{req})=>{

const user = await User.findOne({email})
if(user && user._id.toString()!== req.user.userID){
  throw new BadRequestError('email already exists')
}
}
),
  body('name').notEmpty().withMessage('name is required'),
  body('name').notEmpty().withMessage('name is required')


))