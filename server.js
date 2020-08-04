const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const images = require('./controllers/images');
const profile=require('./controllers/profile');


const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const db = knex({
    client: 'pg',
    connection: {
        connestionString: process.env.DATABASE_URL,
        ssl: true
    }
});

db.select('*').from('users').then(data => {
    console.log(data);
})

app.get('/', (req, res) => {
    res.status(200).json('Everything is working fine');
})

app.post('/signin', (req, res) => {signin.HandleSignin(req,res, db, bcrypt)} );


app.post('/register', (req, res)=>{ register.HandleRegister(req, res, db, bcrypt) });


app.get('/profile/:id', (req, res) =>{profile.HandleProfile(req, res, db)});


app.put('/images', (req, res) =>{images.HandleEntery(req, res, db) });
app.post('/images', (req, res) =>{images.HandleApiCall(req, res) });


app.listen(process.env.PORT || 3000, () => {
    console.log("Every thing is working fine");
})
