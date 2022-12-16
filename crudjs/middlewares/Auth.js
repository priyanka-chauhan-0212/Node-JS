


const verifyToken = (req, res, next) => {
    //     let token = req.headers.authentication;
    //     if (token) {
    //         token = token.split(" ")[1];
    //         let user = jwt.verify(token, SECRET_KEY);
    //     }
    //     else {
    //         res.status(401).json({ message: "UnAuthorized Token" });
    //     }
    //     next();

    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {

        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;

        next();
    } else {
        res.sendStatus(403);
    }
}

module.exports = { verifyToken }