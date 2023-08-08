const { Schema, model } = require('mongoose');

const userSchema = Schema({
    username: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        
    },
    wallet: {
        type: Schema.Types.ObjectId,
        ref: 'wallets',
        required: true
    }
});




module.exports = model( 'users', userSchema );
