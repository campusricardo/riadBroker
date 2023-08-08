const User = require('../models/models_mongo/users.js');
const Wallet = require('../models/models_mongo/wallets.js');
const bcryptjs = require ('bcryptjs');

const postUsers = async (req, res)=>{

    const {username, email, password} = req.body;
    const userWallet = new Wallet();

    const user = new User({username, email, password, wallet: userWallet._id});

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    
    await user.save();
    await userWallet.save();
    res.json({
        "message":"Successfully Registered ",
        user
    })
}

module.exports = {
    postUsers

}