const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const postRoute = require('./routes/post.route');
const userRoute = require('./routes/user.route');
const cors = require('cors');
const path = require('path');


// socket.io
const { Server } = require('socket.io');
const { createServer } = require('http')
const httpServer = createServer(app)
const io = new Server(httpServer, { /* options */ });


const { userCheck, auth } = require('./middleware/auth.middleware')

require('./config/db');
require('dotenv').config({ path: './config/.env' });
const port = process.env.PORT;
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload');
const dir = path.join(__dirname, 'clients/public/uploads/posts')
const dir2 = path.join(__dirname, 'clients/public/uploads/profil')

app.use(express.static(dir))
app.use(express.static(dir2))


const hostname= "192.168.0.166"
const hostname2= "192.168.43.15"
const hostname3= "192.168.88.41"
const hostname4 = "192.168.43.248"

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())


app.get('*', userCheck)
app.get('/jwtid', auth, (req, res) => {
    res.status(200).send(res.locals.user._id)
})

//routes
app.use('/api/post', postRoute);
app.use('/api/user', userRoute);

io.on("connection", (socket) => {
   console.log(`${socket}`)
})



 app.listen(port, hostname2, () => {
   console.log(`Server running or port ${port}`);
}); 


