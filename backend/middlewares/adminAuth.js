import jwt from 'jsonwebtoken';
import "dotenv/config";

const adminAuth = async (req, res, next) => {
  const adminToken = req.headers.authorization;
  if (!adminToken) {
    return res.status(401).json({ success: false, message: "No Token Provided Access Denied, UnAuthorizaed." });
  } else {
    const token = adminToken.split(" ")[1];
    if (token) {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.admin = decodedToken; //  {id:userId, isAmin} = req.user
      next();
    } else {
      return res.status(403).json({ success: false, message: "You Are Not Allowed To Access The Resources, ForBidden." });
    }

  }
};

export default adminAuth;