import bcrypt from "bcryptjs";

export const encrypt = async (pwd) => {
  return await bcrypt.hash(pwd, 10);
};

export const compare = async (pwd, pwdHash) => {
  return await bcrypt.compare(pwd, pwdHash);
};
