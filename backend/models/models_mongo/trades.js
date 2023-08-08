const { Schema, model, SchemaType } = require('mongoose');

const tradeSchema = Schema({
    amount: {
        type: Number,
        required: [true, "?"]
    },
    price: {
        type: Number,
        required: [true, '1']
    },
    money: {
        type: Number,
        required: [true, "??"]
    },
    type: {
        type: Boolean,
        required: [true, '???']
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: [true, 'You must first log in']
    }
    
},{timestamps: true});




module.exports = model( 'trades', tradeSchema );
