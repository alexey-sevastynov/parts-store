import jwt from 'jsonwebtoken';

import { NextAuthOptions } from 'next-auth';

import GoogleProvider from 'next-auth/providers/google';

export const nameValidationRules = (
  message: string,
  messageMinLength: string,
  messageMaxLength: string,
  requireMessage?: string,
  messageDoesNotMatch?: string
) => ({
  ...(requireMessage && { required: requireMessage }),
  pattern: {
    value: /^[а-яА-Яa-zA-ZёЁґҐєЄіІїЇҐґєЄіІїЇ]*$/,
    message,
  },

  minLength: { value: 2, message: messageMinLength },
  maxLength: { value: 15, message: messageMaxLength },
});

export const phoneValidationRules = (
  requireMessage: string,
  message: string
) => ({
  ...(requireMessage && { required: requireMessage }),
  pattern: {
    value: /^(\+?3?8?0)\d{9}$/,
    message,
  },
  minLength: { value: 13, message: message },
  maxLength: { value: 13, message: message },
});

export const emailValidationRules = (
  message: string,
  requireMessage?: string
) => ({
  ...(requireMessage && { required: requireMessage }),
  pattern: {
    value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
    message,
  },
});

export const passwordValidationRules = (
  messageMinLength: string,
  messageMaxLength: string,
  requireMessage?: string
) => ({
  ...(requireMessage && { required: requireMessage }),
  minLength: { value: 4, message: messageMinLength },
  maxLength: { value: 20, message: messageMaxLength },
});

// Function for token generation
export const generateToken = (payload: any) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET as string, {
    expiresIn: '1d',
  });
};

// Function for token verification
export const verifyToken = (token: any): any => {
  return jwt.verify(token, process.env.TOKEN_SECRET as string);
};
