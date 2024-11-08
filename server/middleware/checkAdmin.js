const jwt = require('jsonwebtoken');

const checkAdmin = (req, res, next) => {
    // Bypass check in development mode
    if (process.env.NODE_ENV === 'development nodemon index.js') {
        req.user = { id: 'devUserId', role: 'admin' }; // Mock admin user for development
        return next();
    }

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = checkAdmin;
