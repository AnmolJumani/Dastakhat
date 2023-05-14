import admin from '../models/adminSchema.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
// import Admin from '../models/adminSchema.js'
import users from '../models/userSchema.js'

export const register = (req, res, next)=>{
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if (err){
            res.json({error: err})
        }
        let Admin = new admin({
            username: req.body.username,
            email_id: req.body.email_id,
            phone_no: req.body.phone_no,
            password: hashedPass
        })
        Admin.save().then(Admin=>{
            res.json({message: ' Admin added successfully'})
        }).catch(error =>{
            res.json({
                message: 'error occured in adding admin'
            })
        })
    })
    
}

// export const registerUser = (req,res, next)=>{
//     bcrypt.hash(req.body.password, 10, function(err, hashedPass){
//         if (err){
//             res.json({error: err})
//         }
//         let Admin = new users({
//             username: req.body.username,
//             email_id: req.body.email_id,
//             phone_no: req.body.phone_no,
//             password: hashedPass
//         })
//         Admin.save().then(Admin=>{
//             res.json({message: ' Admin added successfully'})
//         }).catch(error =>{
//             res.json({
//                 message: 'error occured in adding admin'
//             })
//         })
//     })
// }

export const login = (req, res, next)=>{
    var email_id = req.body.email;
    var password = req.body.password;

    admin.findOne({email_id: email_id})
    .then(admin=>{
        if(admin){
            bcrypt.compare(password, admin.password, function(err, result){
                if(err){
                    res.status(422)
                    res.json({
                        error: err
                    })
                }
                if(result){
                    let token= jwt.sign({username: admin.username}, 'dastakhat', {expiresIn: '1h'})
                    res.status(201)
                    res.json({
                        message: 'Login Sucessful',
                        token: token
                    })
                }else{
                    res.status(404)
                    res.json({
                        message: 'Invalid password'
                    })
                }
            })
        }else{
            console.log(email_id, password);
            res.status(404);
            res.json({
                message: 'Invalid user'
            })
        }
    })

}

export const loginUser = (req, res, next)=>{
    var email_id = req.body.email_id;
    var password = req.body.password;

    users.findOne({email_id: email_id})
    .then(users=>{
        if(users){
            bcrypt.compare(password, users.password, function(err, result){
                if(err){
                    res.status(422)
                    res.json({
                        error: err
                    })
                }
                if(result){
                    let token= jwt.sign({username: users.username}, 'dastakhat', {expiresIn: '1h'})
                    res.status(201)
                    res.json({
                        message: 'Login Sucessful',
                        token: token
                    })
                }else{
                    res.status(404)
                    res.json({
                        message: 'Invalid password'
                    })
                }
            })
        }else{
            console.log(email_id, password);
            res.json({
                message: 'Invalid user'
            })
        }
    })

}



export const authenticate = (req, res, next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'dastakhat')

        req.email_id = decode
        next()
    }
    catch(error){
        res.json({
            message: 'Authentication Failed'
        })
    }
}

