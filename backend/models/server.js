const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../database/config.js');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.api = "/api";

        this.connectDB();
        this.middlewares();
        
        this.routes();

    }
    async connectDB() {
        await dbConnection();
    }
    middlewares() {
        //cors
        this.app.use(cors());
        // can use json
        this.app.use(express.json());

    }
    routes(){
        this.app.use(this.api, require('../routes/users.routes.js'));
        this.app.use(this.api, require('../routes/auth.routes.js'));
        this.app.use(this.api, require('../routes/verifytoken.routes.js'));
        this.app.use(this.api, require('../routes/assets.routes.js'));
        this.app.use(this.api, require('../routes/trade.routes.js'));

    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`SERVER RUNNING ON PORT: ${this.port}`);
        });
    };
}

module.exports = Server;