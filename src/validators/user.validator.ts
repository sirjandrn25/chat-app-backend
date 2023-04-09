import {body} from 'express-validator'
import {  PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


const userProfileValidator = (()=>{
    return [ 
 
      body('profile.first_name').notEmpty().isLength({min:4}),
      body('profile.last_name').notEmpty().isLength({min:4}),]
})()

export const LoginValidator = ()=>{
    return [
        body('email').notEmpty().isEmail(),
        body('password').notEmpty(),
    ]
}

export const RegisterValitor = ()=>{
    return [
        ...userProfileValidator,
        body('email').notEmpty().isEmail().custom(async (value)=>{
            try{
              const user = await prisma.user.findUnique({
                  where:{
                      email:value
                  }
              })
              if(user){
                  return Promise.reject("this e-mail id already exist !!!")
              }
            }catch(error){
              return Promise.reject("Something is wrong")
            }
          }),
        body('password').notEmpty().isLength({ min: 7,max:50 }),
     
    ]
}

export const UserUpdateValidator= ()=>{
    return [...userProfileValidator,body('profile.gender').isIn(['M','F','O'])]
}

