/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {verify, sign} from 'jsonwebtoken';


export const signToken = async (data: any) =>{
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
