const HandleProfile = (req, res, db) => {
    const { id } = req.params;

    db.select('*').from('users').where({ id })
        .then(user => {
            if (user.length) {
                res.json(user[0])
            } else {
                res.status(400).json("Not found")
            }
        })
        .catch(err => res.status(404).json('Not Found'))

}

module.exports ={
    HandleProfile:HandleProfile
}