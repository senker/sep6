import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const userId = parseInt(request.headers.get('userId') || '', 10);
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
    const favouriteMovies = user.favourites;

    const response = {
      status: 'success',
      data: favouriteMovies,
    };

    return new NextResponse(JSON.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
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
