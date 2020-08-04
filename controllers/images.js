const Clarifai =  require('clarifai');

const app = new Clarifai.App({
    apiKey: '215fca2eb78c4944b6c340f16a817c42'
});

const HandleApiCall = (req, res)=>{

app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
.then(data =>{
    res.json(data)
})
}

const HandleEntery = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entery', 1)
        .returning('entery')
        .then(resp => {
            res.json(resp[0])
        })
        .catch(err => res.status(400).json('cannot get enteries'))
}

module.exports = {
    HandleEntery: HandleEntery,
    HandleApiCall
}