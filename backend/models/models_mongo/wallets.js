const { Schema, model } = require('mongoose');

const walletSchema = Schema({
    usd: {
        type: Number,
        default: 10000
    },
    BTC: {
        type: Number,
        default: 0
    }
});




module.exports = model( 'wallets', walletSchema );
