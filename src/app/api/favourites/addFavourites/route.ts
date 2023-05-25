import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { userId, movieIdToAdd } = await request.json();

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return (
        new NextResponse('User not found'),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const existingFavourites = user.favourites;

    const updatedFavourites = [...existingFavourites, movieIdToAdd];

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(userId) },
      data: { favourites: updatedFavourites },
    });

    let json_response = {
      status: 'success',
      data: {
        favourites: updatedUser,
      },
    };

    return new NextResponse(JSON.stringify(json_response), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    if (error.code === 'P2002') {
      let error_response = {
        status: 'fail',
        message: 'Feedback with title already exists',
      };
      return new NextResponse(JSON.stringify(error_response), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let error_response = {
      status: 'error',
      message: error.message,
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
