 const HandleSignin =  (req, res, db, bcrypt) => {
    db.select('email', 'hash').from('login')
    .where('email', '=', req.body.email)
    .then(data =>{
        const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
        if(isValid){
            return db.select('*').from('users')
            .where('email', '=', data[0].email)
            .then(user =>{
                res.status(200).json(user[0])
            })
            .catch(err => res.status(400).json('Something is worng'))
        } else{
            res.status(400).json('Wrong Credentials');
        }
    })
    .catch(err => res.status(404).json('bad request'));
 }

 module.exports = {
     HandleSignin:HandleSignin
 }