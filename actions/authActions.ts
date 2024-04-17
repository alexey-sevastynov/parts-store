'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import { generateToken, verifyToken } from '@/utils/authorization';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { IInputs } from '@/types/authorization';
import sendEmail from '@/utils/sendEmail';

const BASE_URL = process.env.NEXTAUTH_URL;

export async function updateUser({
  firstName,
  lastName,
  phone,
}: {
  firstName: string;
  lastName: string;
  phone: string;
}) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) throw new Error('Unauthoriztion!');
    const user = await User.findByIdAndUpdate(
      session?.user?._id,
      {
        firstName,
        lastName,
        phone,
      },
      { new: true }
    ).select('-password');

    if (!user) throw new Error('Email does not exsist!');

    return { msg: 'Update Profile Successfully!', status: 'success' };
  } catch (error: any) {
    redirect(`/errors?error=${error.message}`);
  }
}

export async function deleteUser({ id }: { id: string }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error('Unauthoriztion!');

    const user = await User.findByIdAndDelete(id);

    if (!user) throw new Error('Email does not exsist!');

    return { msg: 'Delete Profile Successfully!', status: 201 };
  } catch (error: any) {
    redirect(`/errors?error=${error.message}`);
  }
}

export async function signUpWithCredentials({
  firstName,
  lastName,
  email,
  password,
  phone,
}: IInputs) {
  try {
    const user = await User.findOne({ email });

    if (user) {
      return { msg: 'Email already exsist', status: 401 };
    } // DO NOT change the msg !!! The text of msg bind with '@/puplic/transltion.json'

    if (password) {
      password = await bcrypt.hash(password, 12);
    }

    const token = generateToken({
      user: { firstName, lastName, email, phone, password },
    });

    await sendEmail({
      to: email,
      url: `${BASE_URL}/verify?token=${token}`,
      text: 'Підтвердити електронну пошту',
    });

    return {
      msg: 'Sign Up Success! Check your email to complete the registartion!',
      status: 201,
    }; // DO NOT change the msg !!! The text of msg bind with '@/puplic/transltion.json'
  } catch (error: any) {
    // redirect(`/errors?error=${error.message}`);
    console.log(error);
  }
}

export async function verifyWithCredentials(token: string) {
  try {
    const { user } = verifyToken(token);

    const exsistUser = await User.findOne({ email: user.email });
    if (exsistUser) return { msg: 'Exsist User' };

    const newUser = new User(user);

    await newUser.save();

    return { msg: 'Verify Success!' };
  } catch (error: any) {
    redirect(`/errors?error=${error.message}`);
  }
}

export async function changePasswordWithCredentials({
  passwordOld,
  passwordNew,
}: {
  passwordOld: string;
  passwordNew: string;
}) {
  try {
    const session = await getServerSession(authOptions);
    const providersName = session?.user?.provider;

    if (!session) throw new Error('Unauthorization!');

    if (providersName !== 'credentials') {
      throw new Error(
        `This account is signed in with ${providersName}. You can not use this function!`
      );
    }

    const user = await User.findById(session?.user?._id);

    if (!user) throw new Error('User does not exist!');

    const compare = await bcrypt.compare(passwordOld, user.password);

    if (!compare) {
      return {
        msg: 'Old password does not match!',
        status: 401,
      };
    }

    const newPass = await bcrypt.hash(passwordNew, 12);

    await User.findByIdAndUpdate(user._id, { password: newPass });

    return { msg: 'Changed Password Succussefully!', status: 201 };
  } catch (error: any) {
    // redirect(`/errors?error=${error.message}`);
    console.log(error);
  }
}

export async function forgotPasswordWithCredentials({
  email,
}: {
  email: string;
}) {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return { msg: 'Email does not exist', status: 401 };
      // DO NOT change the msg !!! The text of msg bind with '@/puplic/transltion.json'
    }

    if (user?.provider !== 'credentials') {
      throw new Error(
        `This account is signed in with ${user?.provider}. You can not use this function!`
      );
    }

    const token = generateToken({ userId: user._id });

    await sendEmail({
      to: email,
      url: `${BASE_URL}/reset_password?token=${token}`,
      text: 'СКИДАННЯ ПАРОЛЯ',
    });

    return {
      msg: 'A confirmation has been sent to the specified email address, please confirm it.',
      status: 201,
      // DO NOT change the msg !!! The text of msg bind with '@/puplic/transltion.json'
    };
  } catch (error: any) {
    redirect(`/errors?error=${error.message}`);
  }
}

export async function resetPasswordWithCredentials({
  token,
  password,
}: {
  token: string;
  password: string;
}) {
  try {
    const { userId } = verifyToken(token);

    const newPassword = await bcrypt.hash(password, 12);

    await User.findByIdAndUpdate(userId, { password: newPassword });

    return {
      msg: 'Success! Your password has been changed.',
      status: 201,
      // DO NOT change the msg !!! The text of msg bind with '@/puplic/transltion.json'
    };
  } catch (error: any) {
    console.log(error);
  }
}
