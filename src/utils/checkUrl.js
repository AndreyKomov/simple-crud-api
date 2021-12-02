const checkUrl = (req, res) => {
    if(!req.pathname) {
        res.statusCode = 404;
        res.send({message: 'bad url, dude'});
    }
}

module.exports = checkUrl;
