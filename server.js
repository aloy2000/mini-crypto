const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const postRoute = require('./routes/post.route');
const userRoute = require('./routes/user.route');


require('./config/db');
require('dotenv').config({path: './config/.env'});
const port =  process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//routes
app.use('/api/post', postRoute);
app.use('/api/user', userRoute);


app.listen(port, () => {
    console.log(`Server running or port ${port}`);
});
