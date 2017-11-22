const express =require('express')
const mongoose=require('mongoose')
const bodyParser  =require('body-parser')
const cors=require('cors')
const path=require('path')
const config =require('./config/database')
const passport =require('passport')

//connect to database
mongoose.connect(config.database, { useMongoClient: true })

// alert for successfully connected to DB
mongoose.connection.on('connected',() => {
    console.log(('Database is sucessfully connected in port'+config.database))
})

// alert for FAiled to connected to DB
mongoose.connection.on('error',(err) => {
    console.log(('Database connection Failed'+err))
})

const app = express();
const users =require('./routes/users')
// middle ware for invalid url
app.use(cors())
// Port Number
// const port =3010
const port =process.env.PORT || 8080
// Set static Folder to connect with index.html
app.use(express.static(path.join(__dirname,'public')))

//middleware for upcoming request and grab that data
app.use(bodyParser.json())


// passport jwt middleware

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport)

const routes =express.Router()

app.use('/users',users)







app.get('/',(req,res)=>{
    res.send("Hello from app.js :)")
})


app.listen(port ,function(){
    console.log('Server is running in: '+ port)
})