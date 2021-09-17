const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const postRoute = require('./routes/post.route');
const userRoute = require('./routes/user.route');
const cors = require('cors');
const {userCheck, auth} = require('./middleware/auth.middleware')

require('./config/db');
require('dotenv').config({path: './config/.env'});
const port =  process.env.PORT;
const cookieParser = require('cookie-parser')
const fileUpload =require('express-fileupload')


const hostname= "192.168.0.166"

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser())


app.get('*', userCheck)
app.get('/jwtid', auth, (req, res) => {
    res.status(200).send(res.locals.user._id)
})

//routes
app.use('/api/post', postRoute);
app.use('/api/user', userRoute);


app.listen(port, hostname,  () => {
    console.log(`Server running or port ${port}`);
});
