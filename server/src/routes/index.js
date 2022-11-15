const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user')
const bcrypt = require('bcrypt-nodejs')
const asyncHandler = require('express-async-handler')


router.post('/api/sign-up', async(req, res) =>{

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10)),
        isAdmin: req.body.isAdmin
    })
    
    
    await newUser.save()
    res.sendStatus(201)
})

router.post('/api/sign-in', asyncHandler(async (req, res) =>{
        const { email, password } = req.body
        user = await User.findOne({ email })
        if (user && (await user.comparePassword(password))){
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            })

        }else{
            res.status(401)
            throw new Error('Invalid email or password')
        }
    })
)

module.exports = router
