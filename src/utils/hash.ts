import {verify, sign} from 'jsonwebtoken';
import { hashSync, compareSync, genSaltSync } from 'bcrypt';
const saltRounds = 10;

type hashDataProps = {
  id: string;
  email: string;
}

export const signToken = async (data: hashDataProps) =>{
  try {
    const token = await sign(data, `${process.env.JWT_SECRET}`, {expiresIn: '1h'});
    return token;
  } catch (error) {
    console.log(error);
  }
};

export const verifyToken = async (token: string) =>{
  try {
    const user = await verify(token, `${process.env.JWT_SECRET}`);
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const hashData = (data: string) => {
  const salt = genSaltSync(saltRounds);
  const hashed = hashSync(data, salt);
  if (hashed && salt) {
    return hashed;
  }
  return false;
};

export const compareData = (data: string, hashed: string) => {
  const isValid = compareSync(data, hashed);
  return !!isValid;
};
