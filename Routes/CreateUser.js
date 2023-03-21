const express = require('express')
const User = require('../models/User')

const router = express.Router()

const user = require('../models/User')

const { body, validationResult } = require('express-validator');

const jwt = require ("jsonwebtoken");

const bcrypt = require("bcryptjs");

const jwtSecret = "MyNameIsSachinTiwariBuildingThisForYou"



router.post("/createuser",

    body('email').isEmail(),
    // password must be at least 5 chars long

    body('Name').isLength({ min: 5 }),
    body('password','Incorrect Password').isLength({ min: 5 }), 
    async (req, res) => {


        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        let email = req.body.email;

        try{
            let userData = await User.findOne({email});

            if(!userData){
                return res.status(400).json({errors : "Try Logging with correct credentials"})
            }

            const pwdCompare = await bcrypt.compare(req.body.password,userDate.password) //to check for the hashed paasworrd coming from the bcrypt

            if(!pwdCompare){
                return res.status(400).json({error: "Try Logging with correct credentials"})
            }

            const data = {

                user: {

                    id:userData.id //it will be fetched to us by the backend
                }
            }

            const authToken = jwt.sign(data,jwtSecret)  // header,data,payload are three parameters of auth token 

            return res.json({sucess:true,authToken})  

        } catch(error){
            console.log(error)
            res.json({sucess:false});
        }

        const salt = await bcrypt.genSalt(10);

        let secPassword = await bcrypt.hash(req.body.password,salt)

        try {

            await User.create({
                name: req.body.name,  // used with the hitting of the api(dynamic manner)
                password: secPassword,
                email: req.body.email,
                location: req.body.location  // all gives the dynamic data as per the dynamic changes in the api as used by the server 
            })

            res.json({ sucess: true });

        }

        catch (error) {
            console.log(error)

            res.json({ sucess: false });


        }

    })

module.exports = router;