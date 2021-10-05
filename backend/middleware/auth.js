const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];
    
    if (!token) {
        return res.status(401).json({ message: 'No token provided!' });ž
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(400).json({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
};