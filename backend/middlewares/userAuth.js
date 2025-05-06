import jwt from 'jsonwebtoken';

const userAuth = (req, res, next) => {
  const userToken = req.headers.authorization;
  if (!userToken) {
    return res.status(401).json({ sucess: false, message: "No Token Provided UnAuthorized" });
  }
  const token = userToken.split(" ")[1];
  if (token) {
    const decondedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decondedToken; // const {id, isAdmin} = req.user
    next();
  } else {
    return res.status(403).json({ success: false, message: "You Are Not Allowed To Access This Resources, Forbidden." });
  }

};

export default userAuth;