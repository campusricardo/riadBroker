const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const {mongo} = require('mongoose');
const User = require('../models/models_mongo/users.js');
const WalletsSchema = require('../models/models_mongo/wallets.js');
const Trades = require('../models/models_mongo/trades.js');


const validateJWT = async(  req = request, res = response, next) => {

    const token = req.header('x-api-token-jwt');


    
    if ( !token ) {
        return res.status(401).json({
            msg: 'There is no token in the request'
        });
    }

    try {
    
        const {uid} = jwt.verify( token, process.env.SECRET_OR_PRIVATE_KEY );

         const user = await User.findById(uid );

        if( !user ) {
            return res.status(401).json({
                msg: 'This token has expired'
            })
        } 


        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }


}


const getDataUser = async (req = request, res = response, next)=> {
    const token = req.header('x-api-token-jwt');
    console.log(req.body);
    try {
    
        const {uid} = jwt.verify( token, process.env.SECRET_OR_PRIVATE_KEY );
         const user = await User.findById(uid);
         const {wallet} = user;
        const walletData = await WalletsSchema.findById(wallet);
        res.json(walletData)
        if( !user ) {
            return res.status(401).json({
                msg: 'This token has expired'
            })
        } 

        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }
}

const putDataUser = async (req = request, res = response, next)=> {
    const token = req.header('x-api-token-jwt');
    try {
        const {amount, money, price, type} = req.body;
        console.log(req.body);
        const {uid} = jwt.verify( token, process.env.SECRET_OR_PRIVATE_KEY );
         const user = await User.findById(uid);
         const {wallet} = user;

         const walletId = new mongo.ObjectId(wallet);
         const trades = new Trades({amount, price, money, type, user: uid });
         const walletData =await  WalletsSchema.findByIdAndUpdate({_id: walletId}, { $set: { usd: money, BTC: amount }});
         console.log(walletData);
         await trades.save()

        res.json({message: 'Made register'});
        if( !user ) {
            return res.status(401).json({
                msg: 'This token has expired'
            })
        } 

        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }
}

const getTrades = async (req, res= response, next) => {
    const token = req.header('x-api-token-jwt');
    try {
        const {uid} = jwt.verify( token, process.env.SECRET_OR_PRIVATE_KEY );
        console.log(uid);
        const id = new mongo.ObjectId(uid);
        console.log(id);
        const trades = await Trades.find({user: id});
        console.log(trades);

        if( !trades ) {
            return res.status(401).json({
                msg: 'This token has expired'
            })
        } 
        res.json(trades);

        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Invalid Token'
        })
    }
}

module.exports = {
    validateJWT,
    getDataUser,
    putDataUser,
    getTrades

}