import 'dotenv/config';
import app from './app';
import {sequelize} from './config/db';
import { setupSocket } from './socket/socket';
// const io = require("socket.io");
const PORT = process.env.PORT;

sequelize.sync().then(() => {
    const server = app.listen(PORT, () => {
        console.log(`App lancée sur le port ${PORT}`);
    })

    setupSocket(server);
})
    


