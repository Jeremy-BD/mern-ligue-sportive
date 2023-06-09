import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      firstname: user.firstname,
      email: user.mail,
      phone_number: user.phone_number,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(403).send({ message: "Invalid Token" });
      }
      req.user = decode;
      next();
      return;
    });
  } else {
    return res.status(401).send({ message: "Token is not found" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
    return;
  }
  return res.status(401).send({ message: "Admin Token is not valid" });
};

export const isCustomer = (req, res, next) => {
  if (req.user && req.user.role === "customer") {
    next();
    return;
  }
  return res.status(401).send({ message: "Coach Token is not valid" });
};

export const isMerchant = (req, res, next) => {
  if (req.user && req.user.role === "merchant") {
    next();
    return;
  }
  return res.status(401).send({ message: "Merchant Token is not valid" });
};
