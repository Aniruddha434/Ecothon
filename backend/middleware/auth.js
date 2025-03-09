const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    try {
      // First try to verify as a JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = {
        id: decoded.userId,
        role: decoded.role,
        restaurantId: decoded.restaurantId
      };
      next();
    } catch (jwtError) {
      // If JWT verification fails, try to decode as a restaurant owner token
      try {
        const decoded = JSON.parse(atob(token));
        
        // Check if token is expired
        if (decoded.exp < Date.now()) {
          return res.status(403).json({ message: 'Token expired' });
        }
        
        // Verify it's a restaurant owner token
        if (decoded.role !== 'restaurant_owner') {
          return res.status(403).json({ message: 'Invalid token' });
        }
        
        req.user = {
          id: decoded.userId,
          role: decoded.role,
          restaurantId: decoded.restaurantId
        };
        next();
      } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'Error authenticating user' });
  }
};

module.exports = auth; 