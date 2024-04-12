const jwt = require("jsonwebtoken");

function authorize(role) {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Missing token" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden: Invalid token" });
      }

      // console.log("Decoded Token:", decoded);
      req.userRole = decoded.role;
      req.user = decoded;
      req.userId = decoded.userId;
      if (role && decoded.role !== role) {
        return res
          .status(403)
          .json({ message: "Forbidden: Insufficient permissions" });
      }

      next();
    });
  };
}

module.exports = { authorize };
