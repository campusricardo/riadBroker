
const User = require('../models/models_mongo/users.js');

 const existEmail = async( email = '' ) => {
    const Email = await User.findOne({email});
    if(Email){
        throw new Error(`The email: ${ email }, is already registeres`);
    }
 }
 const existUsername = async(username = '') => {
    const Username = await User.findOne({username});
    if(Username){
        throw new Error(`The username: ${ username }, is already registeres`);
    }
 }
 const userExistsById = async( id ) => {

    const userExists = await User.findById(id);
    if ( !userExists ) {
        throw new Error(`This id: ${ id } doesn't exists`);
    }
}


module.exports = {
    existEmail,
    userExistsById,
    existUsername

}