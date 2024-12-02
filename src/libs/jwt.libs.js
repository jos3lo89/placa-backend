import jwt from "jsonwebtoken";

export const createToken = (Payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      Payload,
      process.env.JWT_SECRET,
      { expiresIn: "1d", noTimestamp: true },
      (err, token) => {
        if (err) return reject(err);
        resolve(token);
      }
    );
  });
};

export const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded);
    });
  });
};
