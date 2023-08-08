const {response} = require('express');
const User = require('../models/models_mongo/users.js');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate.JWT.js');

const login = async(req, res=response)=>{

    const {username, password} = req.body;
    try {

        const user = await User.findOne({username});

        if (!user){
            return res.status(400).json({
                msg:"Username or Password is incorrect"
            })
        }


        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword){
            return res.status(400).json({
                msg:"Password Incorrect"
            })
        }

        const token = await generateJWT(user.id)

        res.json({
           user,
           token
        })
        
    } catch (error) {
        console.log(error);
        return res.json({
            msg:"Contact Technical Service"
        })
    }
}

module.exports = {
    login
}