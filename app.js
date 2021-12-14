require('dotenv').config();
const express = require('express');
const useRouter = require('./routes/userRouter');
const mongoose = require('mongoose');
const adminRouter = require('./routes/adminRouter')
const path = require('path')

const app = express();

mongoose.connect(process.env.MONGO_CONNECTION_URL,
    (error) =>{
        if(error)
    console.log(error)
    else console.log('db connected')
})

app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');



app.use('/user', express.urlencoded(), useRouter,);

app.use('/admin', express.json(), adminRouter)
app.use(express.static('public'))
app.listen(process.env.PORT, ()=>{console.log('server running')})


