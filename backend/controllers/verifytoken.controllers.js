
const verifyToken = async(req, res) => {
    try{
        res.json({
            message: 'log'
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: 'xd'
        });
    }
}

module.exports = {
    verifyToken
}