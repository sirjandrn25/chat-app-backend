
import {validationResult} from 'express-validator'
import {Response,Request,NextFunction} from 'express'

const validate = (req:Request,res:Response,next:NextFunction)=>{
    const errors = validationResult(req)
    if(errors.isEmpty()){
        return next()
    }

    const extractedErrors:any = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
    return res.status(400).json({
        errors: extractedErrors,
      })
}

export default validate