import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import User from '@/models/User';
import connect from '@/lib/mongodb/index';

export const POST = async (request: NextRequest) => {
  const { firstName, lastName, email, password, phone } = await request.json();

  await connect();

  const exsistUser = await User.findOne({ email });

  if (exsistUser) {
    return new NextResponse('Email is already in use', { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    phone,
  });

  try {
    await newUser.save();
    return new NextResponse('User has been created', { status: 201 });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ status: 'Error', message: error.message }),
      { status: 500 }
    );
  }
};
